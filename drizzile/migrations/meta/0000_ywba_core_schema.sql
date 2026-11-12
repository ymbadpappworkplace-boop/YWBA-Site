
-- ===== Enums =====
create type public.app_role as enum ('admin', 'member');
create type public.membership_status as enum ('pending', 'active', 'suspended');
create type public.content_status as enum ('draft', 'pending_review', 'revision_requested', 'approved', 'published', 'rejected');
create type public.review_decision as enum ('approved', 'rejected', 'revision_requested', 'published', 'unpublished', 'edited');

-- ===== Helpers =====
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end $$;

create or replace function public.slugify(_text text)
returns text language sql immutable set search_path = public as $$
  select trim(both '-' from regexp_replace(lower(coalesce(_text, '')), '[^a-z0-9]+', '-', 'g'))
$$;

create or replace function public.safe_date(_text text)
returns date language plpgsql immutable set search_path = public as $$
begin
  if _text is null or _text = '' then return null; end if;
  return _text::date;
exception when others then
  return null;
end $$;

-- ===== Profiles =====
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  member_id text not null unique,
  full_name text not null default '',
  email text not null default '',
  phone text,
  date_of_birth date,
  district text,
  background text,
  bio text,
  avatar_url text,
  membership_status public.membership_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

-- ===== Roles =====
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can read own roles" on public.user_roles
  for select to authenticated using (user_id = auth.uid());
create policy "Admins can read all roles" on public.user_roles
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "Members read own profile" on public.profiles
  for select to authenticated using (id = auth.uid());
create policy "Admins read all profiles" on public.profiles
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Members update own profile" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "Admins update profiles" on public.profiles
  for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Members cannot change protected fields on their own profile
create or replace function public.guard_profile_update()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not public.has_role(auth.uid(), 'admin') then
    new.member_id := old.member_id;
    new.membership_status := old.membership_status;
    new.email := old.email;
  end if;
  new.id := old.id;
  return new;
end $$;
create trigger profiles_guard before update on public.profiles
  for each row execute function public.guard_profile_update();
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- ===== Member ID generation =====
create table public.member_id_counters (
  year int primary key,
  last_value int not null default 0
);
grant all on public.member_id_counters to service_role;
alter table public.member_id_counters enable row level security;

create or replace function public.generate_member_id()
returns text language plpgsql security definer set search_path = public as $$
declare
  _year int := extract(year from now())::int;
  _n int;
begin
  insert into public.member_id_counters as c (year, last_value) values (_year, 1)
  on conflict (year) do update set last_value = c.last_value + 1
  returning last_value into _n;
  return 'YWBA-' || _year || '-' || lpad(_n::text, 4, '0');
end $$;
revoke execute on function public.generate_member_id() from public, anon, authenticated;

-- ===== Membership records =====
create table public.membership_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  member_id text not null,
  event text not null,
  status public.membership_status not null,
  note text,
  created_by uuid,
  created_at timestamptz not null default now()
);
create index membership_records_user_idx on public.membership_records(user_id, created_at desc);
grant select on public.membership_records to authenticated;
grant all on public.membership_records to service_role;
alter table public.membership_records enable row level security;
create policy "Members read own membership records" on public.membership_records
  for select to authenticated using (user_id = auth.uid());
create policy "Admins read membership records" on public.membership_records
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

create or replace function public.log_membership_change()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.membership_status is distinct from old.membership_status then
    insert into public.membership_records (user_id, member_id, event, status, created_by)
    values (new.id, new.member_id, 'status_changed', new.membership_status, auth.uid());
  end if;
  return new;
end $$;
create trigger profiles_membership_log after update on public.profiles
  for each row execute function public.log_membership_change();

-- ===== New user handling =====
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  _meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  _member_id text := public.generate_member_id();
begin
  insert into public.profiles (id, member_id, full_name, email, phone, date_of_birth, district, background, bio, avatar_url)
  values (
    new.id,
    _member_id,
    left(coalesce(nullif(_meta->>'full_name', ''), nullif(_meta->>'name', ''), split_part(coalesce(new.email, ''), '@', 1)), 120),
    coalesce(new.email, ''),
    left(nullif(_meta->>'phone', ''), 40),
    public.safe_date(_meta->>'date_of_birth'),
    left(nullif(_meta->>'district', ''), 80),
    left(nullif(_meta->>'background', ''), 300),
    left(nullif(_meta->>'bio', ''), 1000),
    nullif(_meta->>'avatar_url', '')
  );
  insert into public.user_roles (user_id, role) values (new.id, 'member') on conflict do nothing;
  insert into public.membership_records (user_id, member_id, event, status)
  values (new.id, _member_id, 'registered', 'pending');
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ===== Categories =====
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.categories to anon, authenticated;
grant insert, update, delete on public.categories to authenticated;
grant all on public.categories to service_role;
alter table public.categories enable row level security;
create policy "Anyone can read categories" on public.categories for select to anon, authenticated using (true);
create policy "Admins insert categories" on public.categories for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update categories" on public.categories for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete categories" on public.categories for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- ===== Articles =====
create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text not null default '',
  excerpt text not null default '',
  content text not null default '',
  cover_image_url text,
  category_id uuid references public.categories(id) on delete set null,
  author_id uuid references public.profiles(id) on delete set null,
  author_name text not null default '',
  author_avatar_url text,
  author_bio text,
  is_official boolean not null default false,
  is_featured boolean not null default false,
  status public.content_status not null default 'draft',
  review_note text,
  submitted_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index articles_status_published_idx on public.articles(status, published_at desc);
create index articles_author_idx on public.articles(author_id);
create index articles_category_idx on public.articles(category_id);
grant select on public.articles to anon;
grant select, insert, update, delete on public.articles to authenticated;
grant all on public.articles to service_role;
alter table public.articles enable row level security;

create policy "Public reads published articles" on public.articles
  for select to anon, authenticated using (status = 'published');
create policy "Authors read own articles" on public.articles
  for select to authenticated using (author_id = auth.uid());
create policy "Admins read all articles" on public.articles
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Members create own articles" on public.articles
  for insert to authenticated
  with check (author_id = auth.uid() and status in ('draft', 'pending_review'));
create policy "Admins create articles" on public.articles
  for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Authors update editable articles" on public.articles
  for update to authenticated
  using (author_id = auth.uid() and status in ('draft', 'pending_review', 'revision_requested', 'rejected'))
  with check (author_id = auth.uid() and status in ('draft', 'pending_review'));
create policy "Admins update articles" on public.articles
  for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Authors delete own drafts" on public.articles
  for delete to authenticated using (author_id = auth.uid() and status in ('draft', 'rejected'));
create policy "Admins delete articles" on public.articles
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create or replace function public.prepare_article()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  _is_admin boolean := auth.uid() is not null and public.has_role(auth.uid(), 'admin');
  _p record;
begin
  if auth.uid() is not null and not _is_admin then
    if tg_op = 'INSERT' then
      new.author_id := auth.uid();
      new.is_featured := false;
      new.published_at := null;
      new.review_note := null;
    else
      new.author_id := old.author_id;
      new.is_featured := old.is_featured;
      new.published_at := old.published_at;
      new.review_note := old.review_note;
    end if;
    new.is_official := false;
  end if;

  -- Author snapshot (public-safe fields only)
  if new.author_id is not null and not new.is_official then
    select full_name, avatar_url, bio into _p from public.profiles where id = new.author_id;
    if found then
      new.author_name := _p.full_name;
      new.author_avatar_url := _p.avatar_url;
      new.author_bio := _p.bio;
    end if;
  end if;
  if coalesce(new.author_name, '') = '' and new.is_official then
    new.author_name := 'YWBA Editorial Board';
  end if;

  if new.status = 'pending_review' and (tg_op = 'INSERT' or old.status is distinct from 'pending_review') then
    new.submitted_at := now();
  end if;
  if new.status = 'published' and new.published_at is null then
    new.published_at := now();
  end if;

  if tg_op = 'INSERT' then
    new.slug := coalesce(nullif(public.slugify(new.title), ''), 'untitled') || '-' || left(replace(new.id::text, '-', ''), 6);
  elsif old.published_at is null and new.title is distinct from old.title then
    new.slug := coalesce(nullif(public.slugify(new.title), ''), 'untitled') || '-' || left(replace(new.id::text, '-', ''), 6);
  else
    new.slug := old.slug;
  end if;
  return new;
end $$;
create trigger articles_prepare before insert or update on public.articles
  for each row execute function public.prepare_article();
create trigger articles_updated_at before update on public.articles
  for each row execute function public.set_updated_at();

-- ===== Article reviews =====
create table public.article_reviews (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  reviewer_id uuid references public.profiles(id) on delete set null,
  decision public.review_decision not null,
  note text,
  created_at timestamptz not null default now()
);
create index article_reviews_article_idx on public.article_reviews(article_id, created_at desc);
grant select, insert on public.article_reviews to authenticated;
grant all on public.article_reviews to service_role;
alter table public.article_reviews enable row level security;
create policy "Admins read reviews" on public.article_reviews
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Authors read reviews of own articles" on public.article_reviews
  for select to authenticated using (exists (select 1 from public.articles a where a.id = article_id and a.author_id = auth.uid()));
create policy "Admins write reviews" on public.article_reviews
  for insert to authenticated with check (public.has_role(auth.uid(), 'admin') and reviewer_id = auth.uid());

-- ===== Thoughts (Voices of YWBA) =====
create table public.thoughts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  author_name text not null default '',
  author_avatar_url text,
  title text not null default '',
  content text not null default '',
  category text not null default 'Personal Reflections',
  status public.content_status not null default 'draft',
  review_note text,
  submitted_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index thoughts_status_idx on public.thoughts(status, published_at desc);
create index thoughts_author_idx on public.thoughts(author_id);
grant select on public.thoughts to anon;
grant select, insert, update, delete on public.thoughts to authenticated;
grant all on public.thoughts to service_role;
alter table public.thoughts enable row level security;
create policy "Public reads published thoughts" on public.thoughts
  for select to anon, authenticated using (status = 'published');
create policy "Authors read own thoughts" on public.thoughts
  for select to authenticated using (author_id = auth.uid());
create policy "Admins read all thoughts" on public.thoughts
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Members create own thoughts" on public.thoughts
  for insert to authenticated with check (author_id = auth.uid() and status in ('draft', 'pending_review'));
create policy "Authors update editable thoughts" on public.thoughts
  for update to authenticated
  using (author_id = auth.uid() and status in ('draft', 'pending_review', 'revision_requested', 'rejected'))
  with check (author_id = auth.uid() and status in ('draft', 'pending_review'));
create policy "Admins update thoughts" on public.thoughts
  for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Authors delete own draft thoughts" on public.thoughts
  for delete to authenticated using (author_id = auth.uid() and status in ('draft', 'rejected'));
create policy "Admins delete thoughts" on public.thoughts
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create or replace function public.prepare_thought()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  _is_admin boolean := auth.uid() is not null and public.has_role(auth.uid(), 'admin');
  _p record;
begin
  if auth.uid() is not null and not _is_admin then
    if tg_op = 'INSERT' then
      new.author_id := auth.uid();
      new.published_at := null;
      new.review_note := null;
    else
      new.author_id := old.author_id;
      new.published_at := old.published_at;
      new.review_note := old.review_note;
    end if;
  end if;
  if new.author_id is not null then
    select full_name, avatar_url into _p from public.profiles where id = new.author_id;
    if found then
      new.author_name := _p.full_name;
      new.author_avatar_url := _p.avatar_url;
    end if;
  end if;
  if new.status = 'pending_review' and (tg_op = 'INSERT' or old.status is distinct from 'pending_review') then
    new.submitted_at := now();
  end if;
  if new.status = 'published' and new.published_at is null then
    new.published_at := now();
  end if;
  return new;
end $$;
create trigger thoughts_prepare before insert or update on public.thoughts
  for each row execute function public.prepare_thought();
create trigger thoughts_updated_at before update on public.thoughts
  for each row execute function public.set_updated_at();

-- Keep author snapshots in sync when a member updates name/avatar/bio
create or replace function public.sync_author_snapshot()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.full_name is distinct from old.full_name or new.avatar_url is distinct from old.avatar_url or new.bio is distinct from old.bio then
    update public.articles set author_name = new.full_name, author_avatar_url = new.avatar_url, author_bio = new.bio
      where author_id = new.id and not is_official;
    update public.thoughts set author_name = new.full_name, author_avatar_url = new.avatar_url
      where author_id = new.id;
  end if;
  return new;
end $$;
create trigger profiles_sync_author after update on public.profiles
  for each row execute function public.sync_author_snapshot();

-- ===== Announcements =====
create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  is_published boolean not null default true,
  is_pinned boolean not null default false,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.announcements to anon;
grant select, insert, update, delete on public.announcements to authenticated;
grant all on public.announcements to service_role;
alter table public.announcements enable row level security;
create policy "Public reads published announcements" on public.announcements
  for select to anon, authenticated using (is_published);
create policy "Admins read all announcements" on public.announcements
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins insert announcements" on public.announcements
  for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update announcements" on public.announcements
  for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete announcements" on public.announcements
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));
create trigger announcements_updated_at before update on public.announcements
  for each row execute function public.set_updated_at();

-- ===== Site content (About page, homepage text) =====
create table public.site_content (
  key text primary key,
  title text not null default '',
  body text not null default '',
  data jsonb not null default '{}'::jsonb,
  updated_by uuid,
  updated_at timestamptz not null default now()
);
grant select on public.site_content to anon;
grant select, insert, update on public.site_content to authenticated;
grant all on public.site_content to service_role;
alter table public.site_content enable row level security;
create policy "Anyone reads site content" on public.site_content for select to anon, authenticated using (true);
create policy "Admins insert site content" on public.site_content for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update site content" on public.site_content for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create trigger site_content_updated_at before update on public.site_content
  for each row execute function public.set_updated_at();

-- ===== Storage policies =====
create policy "Public read ywba images" on storage.objects
  for select to anon, authenticated using (bucket_id in ('avatars', 'article-covers'));
create policy "Members upload own images" on storage.objects
  for insert to authenticated
  with check (bucket_id in ('avatars', 'article-covers') and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Members update own images" on storage.objects
  for update to authenticated
  using (bucket_id in ('avatars', 'article-covers') and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Members delete own images" on storage.objects
  for delete to authenticated
  using (bucket_id in ('avatars', 'article-covers') and (storage.foldername(name))[1] = auth.uid()::text);

-- ===== Seed content =====
insert into public.categories (name, slug, description, sort_order) values
  ('Buddhist Philosophy', 'buddhist-philosophy', 'Reflections on the Dhamma and its living practice.', 1),
  ('Women''s Empowerment', 'womens-empowerment', 'Voices on courage, equality and opportunity.', 2),
  ('Education', 'education', 'Learning, scholarship and the pursuit of knowledge.', 3),
  ('Leadership', 'leadership', 'Leading with compassion, clarity and integrity.', 4),
  ('Culture & Heritage', 'culture-heritage', 'Traditions, arts and the stories that shape us.', 5),
  ('Community Activities', 'community-activities', 'News and reports from YWBA programmes.', 6),
  ('Personal Reflections', 'personal-reflections', 'Personal journeys, lessons and insights.', 7),
  ('Social Responsibility', 'social-responsibility', 'Service, kindness and our duty to society.', 8);

insert into public.site_content (key, title, body, data) values
('about', 'About the Young Women''s Buddhist Association',
'The Young Women''s Buddhist Association brings together young women who seek to live the teachings of the Buddha with wisdom, compassion and purpose. For generations, the Association has offered a place to learn, to serve and to grow in the company of others walking the same path.

Today, YWBA continues that work in a new form: a shared digital home where members can register, write, reflect and be heard, while the Association preserves and publishes the knowledge and creativity of its community.',
'{
  "mission": "To nurture young women in the Dhamma and empower them to lead lives of wisdom, compassion and service to society.",
  "vision": "A community in which every young woman is grounded in Buddhist values, confident in her voice and committed to the wellbeing of others.",
  "values": [
    {"title": "Wisdom", "text": "Seeking understanding through study, reflection and mindful practice."},
    {"title": "Compassion", "text": "Acting with kindness toward ourselves, one another and all beings."},
    {"title": "Unity", "text": "Standing together across districts, backgrounds and generations."},
    {"title": "Empowerment", "text": "Encouraging every woman to learn, lead and speak with confidence."},
    {"title": "Integrity", "text": "Living honestly, with conduct guided by the Five Precepts."}
  ],
  "objectives": [
    "Promote the study and practice of Buddhist teachings among young women.",
    "Create opportunities for leadership, education and personal development.",
    "Preserve and celebrate Buddhist culture and heritage.",
    "Serve communities through social welfare and outreach programmes.",
    "Give young women a trusted space to share their ideas and experiences."
  ],
  "activities": [
    {"title": "Dhamma study circles", "text": "Regular discussion groups on the teachings and their place in modern life."},
    {"title": "Meditation retreats", "text": "Guided retreats and day programmes for mindfulness practice."},
    {"title": "Leadership programmes", "text": "Workshops on public speaking, organising and community leadership."},
    {"title": "Community service", "text": "Outreach to elders’ homes, schools and families in need."},
    {"title": "Cultural events", "text": "Vesak and Poson celebrations, arts and heritage programmes."}
  ],
  "impact": [
    {"value": "60+", "label": "Years of service"},
    {"value": "25", "label": "Districts represented"},
    {"value": "120+", "label": "Programmes each year"}
  ]
}'::jsonb),
('home', 'One Community. Many Voices. A Shared Journey of Wisdom.',
'A digital space where young women come together to share knowledge, express ideas, celebrate wisdom, and strengthen our Buddhist community.',
'{}'::jsonb),
('contact', 'Contact', '',
'{"address": "Young Women''s Buddhist Association, Colombo, Sri Lanka", "email": "info@ywba.lk", "phone": "+94 11 000 0000", "facebook": "", "instagram": "", "youtube": ""}'::jsonb);

insert into public.announcements (title, body, is_pinned, created_at) values
('Vesak Dhamma Programme — Registrations Open', 'Members are warmly invited to join this year''s Vesak Dhamma programme, including a morning of meditation, a Dhamma talk and an evening lantern workshop. Register through your member dashboard or contact the office.', true, now() - interval '2 days'),
('Call for Articles: “Leading with Compassion”', 'We are collecting articles for a special collection on compassionate leadership. Submit your article from your dashboard before the end of the month. All submissions are reviewed by the editorial team.', false, now() - interval '6 days'),
('Monthly Study Circle', 'The monthly Dhamma study circle meets on the first Saturday of every month. This month we continue our reading of the Mangala Sutta.', false, now() - interval '12 days');

insert into public.articles (title, excerpt, content, cover_image_url, category_id, is_official, is_featured, author_name, status, published_at)
select v.title, v.excerpt, v.content, v.cover, c.id, true, v.featured, 'YWBA Editorial Board', 'published', now() - (v.days || ' days')::interval
from (values
  ('The Quiet Strength of Mindfulness',
   'How a few minutes of mindful attention each day can steady the mind, soften the heart and change the way we meet the world.',
   E'In a world that rarely pauses, mindfulness asks something simple and radical of us: to be present.\n\nThe Buddha taught *sati* — awareness — as one of the foundations of a wise and peaceful life. It is not a technique reserved for monasteries, but a quality we can bring to the bus ride, the classroom and the kitchen table.\n\n## Beginning where you are\n\nStart with the breath. Notice it entering and leaving the body. When the mind wanders — and it will — return to the breath without judgement. This returning *is* the practice.\n\n## Strength, not escape\n\nMindfulness is sometimes misunderstood as withdrawal. In truth it is a form of strength. A mind that can observe anger without being swept away by it is a mind that can choose kindness.\n\n> “Just as a solid rock is not shaken by the storm, even so the wise are not affected by praise or blame.”\n\nAs young women facing exams, careers, families and expectations, this steadiness is a gift we can give ourselves — and, through ourselves, to everyone we meet.',
   '/images/cover-mindfulness.jpg', 'buddhist-philosophy', true, '3'),
  ('Lamps of Learning: Education as a Path of Service',
   'Education has always been at the heart of the Buddhist tradition. For young women today, it is also a powerful path to service.',
   E'Long before modern schools, temples were places of learning. The pursuit of knowledge has always been honoured in the Buddhist tradition, not as an end in itself, but as a lamp that lights the way for others.\n\n## Learning with purpose\n\nWhen we study with the intention of benefiting others, education becomes a form of *dana* — generosity. A nurse, a teacher, an engineer or an artist each carries knowledge into the lives of the people they serve.\n\n## Lifting each other up\n\nYWBA members have long supported one another through study groups, mentoring and scholarship. This tradition continues: every member who learns something valuable is invited to share it here.\n\nLet us be lamps for one another.',
   '/images/cover-education.jpg', 'education', true, '8'),
  ('Leading with Compassion',
   'Leadership grounded in compassion listens first, acts with integrity and measures success by the wellbeing of others.',
   E'What does it mean to lead as a Buddhist woman? The teachings offer a clear answer: lead with *karuna* — compassion.\n\n## Listening first\n\nCompassionate leaders listen before they speak. They seek to understand the needs of the people around them and respond with care.\n\n## Integrity in action\n\nThe Five Precepts are a quiet guide for anyone in a position of responsibility. Honesty, restraint and respect build the trust that every community depends on.\n\n## Small acts, lasting change\n\nLeadership is not only for those with titles. Organising a study circle, supporting a friend through difficulty or speaking up for what is right are all acts of leadership.',
   '/images/cover-leadership.jpg', 'leadership', false, '14'),
  ('Preserving Our Heritage, One Story at a Time',
   'Our traditions live on through the stories we tell. Members share why heritage matters and how we can carry it forward.',
   E'Every lantern lit at Vesak, every stanza chanted at dawn, every recipe passed between generations carries a story.\n\n## Why heritage matters\n\nHeritage connects us to those who came before us and reminds us that we are part of something larger than ourselves.\n\n## Carrying it forward\n\nWe invite members to write about the traditions of their families and villages — the festivals, crafts and teachings that shaped them. Together, these stories form a living archive of our community.',
   '/images/cover-heritage.jpg', 'culture-heritage', true, '20')
) as v(title, excerpt, content, cover, cat, featured, days)
join public.categories c on c.slug = v.cat;

insert into public.thoughts (title, content, category, author_name, status, published_at) values
('Finding calm before exams', 'Last year I started sitting quietly for ten minutes every morning before studying. It did not make the exams easier, but it made me kinder to myself when things were hard. That small change taught me more about the Dhamma than any book.', 'Personal Experiences', 'A YWBA Member', 'published', now() - interval '4 days'),
('Equanimity is not indifference', 'I used to think equanimity meant not caring. Now I understand it means caring deeply without being shaken. It is the calm of a mother who stays steady for her child.', 'Buddhist Values & Teachings', 'A YWBA Member', 'published', now() - interval '9 days'),
('Why I volunteer on Poya days', 'Serving at the dansala with my friends reminds me that generosity is joyful. We do not give because we must; we give because it opens the heart.', 'Society & Service', 'A YWBA Member', 'published', now() - interval '15 days');
