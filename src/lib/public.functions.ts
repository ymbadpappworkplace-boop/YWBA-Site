import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createPublicClient } from "./supabase-public.server";
import { ARTICLES_PAGE_SIZE, THOUGHTS_PAGE_SIZE } from "./constants";
import { sanitizeSearch } from "./format";

const CARD_COLUMNS =
  "id, slug, title, excerpt, cover_image_url, author_name, author_avatar_url, is_official, is_featured, published_at, category:categories(name, slug)";

export type ArticleCardData = {
  id: string;
  slug: string | null;
  title: string;
  excerpt: string;
  cover_image_url: string | null;
  author_name: string;
  author_avatar_url: string | null;
  is_official: boolean;
  is_featured: boolean;
  published_at: string | null;
  category: { name: string; slug: string } | null;
};

export type ThoughtData = {
  id: string;
  title: string;
  content: string;
  category: string;
  author_name: string;
  author_avatar_url: string | null;
  published_at: string | null;
};

export type AnnouncementData = {
  id: string;
  title: string;
  body: string;
  is_pinned: boolean;
  created_at: string;
};

export type CategoryData = { id: string; name: string; slug: string; description: string | null };

export type ContactData = {
  address?: string;
  email?: string;
  phone?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
};

function fail(context: string, error: unknown): never {
  console.error(`[public] ${context}`, error);
  throw new Error("We couldn't load this content right now. Please try again shortly.");
}

export const getHomeData = createServerFn({ method: "GET" }).handler(async () => {
  const sb = createPublicClient();
  const [home, featured, latest, thoughts, announcements, stats] = await Promise.all([
    sb.from("site_content").select("title, body").eq("key", "home").maybeSingle(),
    sb
      .from("articles")
      .select(CARD_COLUMNS)
      .eq("status", "published")
      .eq("is_featured", true)
      .order("published_at", { ascending: false })
      .limit(3),
    sb
      .from("articles")
      .select(CARD_COLUMNS)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(6),
    sb
      .from("thoughts")
      .select("id, title, content, category, author_name, author_avatar_url, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(3),
    sb
      .from("announcements")
      .select("id, title, body, is_pinned, created_at")
      .eq("is_published", true)
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(3),
    sb.from("articles").select("id", { count: "exact", head: true }).eq("status", "published"),
  ]);
  const err = home.error ?? featured.error ?? latest.error ?? thoughts.error ?? announcements.error;
  if (err) fail("home", err);
  return {
    hero: {
      title: home.data?.title || "One Community. Many Voices. A Shared Journey of Wisdom.",
      body:
        home.data?.body ||
        "A digital space where young women come together to share knowledge, express ideas, celebrate wisdom, and strengthen our Buddhist community.",
    },
    featured: (featured.data ?? []) as ArticleCardData[],
    latest: (latest.data ?? []) as ArticleCardData[],
    thoughts: (thoughts.data ?? []) as ThoughtData[],
    announcements: (announcements.data ?? []) as AnnouncementData[],
    publishedCount: stats.count ?? 0,
  };
});

const listArticlesInput = z.object({
  q: z.string().max(100).optional(),
  category: z.string().max(80).optional(),
  author: z.string().max(120).optional(),
  page: z.number().int().min(1).max(500).optional(),
});

export const listArticles = createServerFn({ method: "GET" })
  .validator((input: unknown) => listArticlesInput.parse(input))
  .handler(async ({ data }) => {
    const sb = createPublicClient();
    const page = data.page ?? 1;
    const from = (page - 1) * ARTICLES_PAGE_SIZE;

    const [cats, authorsRes] = await Promise.all([
      sb.from("categories").select("id, name, slug, description").order("sort_order"),
      sb.from("articles").select("author_name").eq("status", "published").limit(1000),
    ]);
    if (cats.error) fail("categories", cats.error);

    let query = sb
      .from("articles")
      .select(CARD_COLUMNS, { count: "exact" })
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(from, from + ARTICLES_PAGE_SIZE - 1);

    if (data.category) {
      const cat = cats.data?.find((c) => c.slug === data.category);
      if (!cat) return { items: [], total: 0, page, categories: cats.data ?? [], authors: [] as string[] };
      query = query.eq("category_id", cat.id);
    }
    if (data.author) query = query.eq("author_name", data.author);
    const q = data.q ? sanitizeSearch(data.q) : "";
    if (q) query = query.or(`title.ilike.%${q}%,excerpt.ilike.%${q}%,content.ilike.%${q}%`);

    const res = await query;
    if (res.error) fail("articles", res.error);
    const authors = Array.from(
      new Set((authorsRes.data ?? []).map((a) => a.author_name).filter(Boolean)),
    ).sort();
    return {
      items: (res.data ?? []) as ArticleCardData[],
      total: res.count ?? 0,
      page,
      categories: (cats.data ?? []) as CategoryData[],
      authors,
    };
  });

export const getArticle = createServerFn({ method: "GET" })
  .validator((input: unknown) => z.object({ slug: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }) => {
    const sb = createPublicClient();
    const res = await sb
      .from("articles")
      .select(
        "id, slug, title, excerpt, content, cover_image_url, author_name, author_avatar_url, author_bio, is_official, published_at, category_id, category:categories(name, slug)",
      )
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();
    if (res.error) fail("article", res.error);
    if (!res.data) return { article: null, related: [] as ArticleCardData[] };

    let relatedQuery = sb
      .from("articles")
      .select(CARD_COLUMNS)
      .eq("status", "published")
      .neq("id", res.data.id)
      .order("published_at", { ascending: false })
      .limit(3);
    if (res.data.category_id) relatedQuery = relatedQuery.eq("category_id", res.data.category_id);
    let related = ((await relatedQuery).data ?? []) as ArticleCardData[];
    if (related.length < 3) {
      const more = await sb
        .from("articles")
        .select(CARD_COLUMNS)
        .eq("status", "published")
        .neq("id", res.data.id)
        .order("published_at", { ascending: false })
        .limit(6);
      const seen = new Set(related.map((r) => r.id));
      for (const r of (more.data ?? []) as ArticleCardData[]) {
        if (related.length >= 3) break;
        if (!seen.has(r.id)) related.push(r);
      }
      related = related.slice(0, 3);
    }
    return {
      article: res.data as typeof res.data & { category: { name: string; slug: string } | null },
      related,
    };
  });

export const listThoughts = createServerFn({ method: "GET" })
  .validator((input: unknown) =>
    z
      .object({ category: z.string().max(80).optional(), page: z.number().int().min(1).max(500).optional() })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const sb = createPublicClient();
    const page = data.page ?? 1;
    const from = (page - 1) * THOUGHTS_PAGE_SIZE;
    let query = sb
      .from("thoughts")
      .select("id, title, content, category, author_name, author_avatar_url, published_at", { count: "exact" })
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(from, from + THOUGHTS_PAGE_SIZE - 1);
    if (data.category) query = query.eq("category", data.category);
    const res = await query;
    if (res.error) fail("thoughts", res.error);
    return { items: (res.data ?? []) as ThoughtData[], total: res.count ?? 0, page };
  });

export const getAboutContent = createServerFn({ method: "GET" }).handler(async () => {
  const sb = createPublicClient();
  const res = await sb.from("site_content").select("title, body, data").eq("key", "about").maybeSingle();
  if (res.error) fail("about", res.error);
  return {
    title: res.data?.title ?? "About YWBA",
    body: res.data?.body ?? "",
    data: (res.data?.data ?? {}) as AboutData,
  };
});

export type AboutData = {
  mission?: string;
  vision?: string;
  values?: { title: string; text: string }[];
  objectives?: string[];
  activities?: { title: string; text: string }[];
  impact?: { value: string; label: string }[];
};

export const getContact = createServerFn({ method: "GET" }).handler(async () => {
  const sb = createPublicClient();
  const res = await sb.from("site_content").select("data").eq("key", "contact").maybeSingle();
  if (res.error) {
    console.error("[public] contact", res.error);
    return {} as ContactData;
  }
  return (res.data?.data ?? {}) as ContactData;
});
