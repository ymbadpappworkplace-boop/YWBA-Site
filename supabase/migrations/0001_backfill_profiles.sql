-- ============================================================================
-- Backfill profiles for auth users created before 0000_ywba_core_schema.sql
--
-- Supabase Auth stores the account itself (email + password hash) in
-- auth.users. That table belongs to Supabase and already contains every
-- signup. public.profiles / user_roles / membership_records are only created
-- by the on_auth_user_created trigger, which fires on INSERT — so accounts
-- made before the trigger existed have no rows there.
--
-- Run this ONCE in the SQL Editor, after 0000_ywba_core_schema.sql.
-- It is safe to run repeatedly: every statement skips existing rows.
-- ============================================================================

-- 1. Profiles
insert into public.profiles (id, member_id, full_name, email, phone)
select
  u.id,
  public.generate_member_id(),
  left(
    coalesce(
      nullif(u.raw_user_meta_data->>'full_name', ''),
      nullif(u.raw_user_meta_data->>'name', ''),
      split_part(coalesce(u.email, ''), '@', 1)
    ),
    120
  ),
  coalesce(u.email, ''),
  left(nullif(u.raw_user_meta_data->>'phone', ''), 40)
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null;

-- 2. Member role
insert into public.user_roles (user_id, role)
select p.id, 'member'::public.app_role
from public.profiles p
where not exists (
  select 1 from public.user_roles r
  where r.user_id = p.id and r.role = 'member'::public.app_role
);

-- 3. Registration history
insert into public.membership_records (user_id, member_id, event, status)
select p.id, p.member_id, 'registered', 'pending'::public.membership_status
from public.profiles p
where not exists (
  select 1 from public.membership_records m
  where m.user_id = p.id and m.event = 'registered'
);

-- Verification: should list one row per registered account.
select p.member_id, p.full_name, p.email, p.membership_status, p.created_at
from public.profiles p
order by p.created_at desc;
