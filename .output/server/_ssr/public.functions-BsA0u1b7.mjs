import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
import { n as createPublicClient, o as sanitizeSearch } from "./format-DM6Xt5HZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public.functions-BsA0u1b7.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var CARD_COLUMNS = "id, slug, title, excerpt, cover_image_url, author_name, author_avatar_url, is_official, is_featured, published_at, category:categories(name, slug)";
function fail(context, error) {
	console.error(`[public] ${context}`, error);
	throw new Error("We couldn't load this content right now. Please try again shortly.");
}
var getHomeData_createServerFn_handler = createServerRpc({
	id: "514c825cd0bfcd882160370a17467d767e38a3a4176769246907d1f2960bad74",
	name: "getHomeData",
	filename: "src/lib/public.functions.ts"
}, (opts) => getHomeData.__executeServer(opts));
var getHomeData = createServerFn({ method: "GET" }).handler(getHomeData_createServerFn_handler, async () => {
	const sb = createPublicClient();
	const [home, featured, latest, thoughts, announcements, stats] = await Promise.all([
		sb.from("site_content").select("title, body").eq("key", "home").maybeSingle(),
		sb.from("articles").select(CARD_COLUMNS).eq("status", "published").eq("is_featured", true).order("published_at", { ascending: false }).limit(3),
		sb.from("articles").select(CARD_COLUMNS).eq("status", "published").order("published_at", { ascending: false }).limit(6),
		sb.from("thoughts").select("id, title, content, category, author_name, author_avatar_url, published_at").eq("status", "published").order("published_at", { ascending: false }).limit(3),
		sb.from("announcements").select("id, title, body, is_pinned, created_at").eq("is_published", true).order("is_pinned", { ascending: false }).order("created_at", { ascending: false }).limit(3),
		sb.from("articles").select("id", {
			count: "exact",
			head: true
		}).eq("status", "published")
	]);
	const err = home.error ?? featured.error ?? latest.error ?? thoughts.error ?? announcements.error;
	if (err) fail("home", err);
	return {
		hero: {
			title: home.data?.title || "One Community. Many Voices. A Shared Journey of Wisdom.",
			body: home.data?.body || "A digital space where young women come together to share knowledge, express ideas, celebrate wisdom, and strengthen our Buddhist community."
		},
		featured: featured.data ?? [],
		latest: latest.data ?? [],
		thoughts: thoughts.data ?? [],
		announcements: announcements.data ?? [],
		publishedCount: stats.count ?? 0
	};
});
var listArticlesInput = objectType({
	q: stringType().max(100).optional(),
	category: stringType().max(80).optional(),
	author: stringType().max(120).optional(),
	page: numberType().int().min(1).max(500).optional()
});
var listArticles_createServerFn_handler = createServerRpc({
	id: "5a3fefe709dfb4e3db03e91c71c801c388432cae7bca122ee2615cbabfac0c8f",
	name: "listArticles",
	filename: "src/lib/public.functions.ts"
}, (opts) => listArticles.__executeServer(opts));
var listArticles = createServerFn({ method: "GET" }).validator((input) => listArticlesInput.parse(input)).handler(listArticles_createServerFn_handler, async ({ data }) => {
	const sb = createPublicClient();
	const page = data.page ?? 1;
	const from = (page - 1) * 9;
	const [cats, authorsRes] = await Promise.all([sb.from("categories").select("id, name, slug, description").order("sort_order"), sb.from("articles").select("author_name").eq("status", "published").limit(1e3)]);
	if (cats.error) fail("categories", cats.error);
	let query = sb.from("articles").select(CARD_COLUMNS, { count: "exact" }).eq("status", "published").order("published_at", { ascending: false }).range(from, from + 9 - 1);
	if (data.category) {
		const cat = cats.data?.find((c) => c.slug === data.category);
		if (!cat) return {
			items: [],
			total: 0,
			page,
			categories: cats.data ?? [],
			authors: []
		};
		query = query.eq("category_id", cat.id);
	}
	if (data.author) query = query.eq("author_name", data.author);
	const q = data.q ? sanitizeSearch(data.q) : "";
	if (q) query = query.or(`title.ilike.%${q}%,excerpt.ilike.%${q}%,content.ilike.%${q}%`);
	const res = await query;
	if (res.error) fail("articles", res.error);
	const authors = Array.from(new Set((authorsRes.data ?? []).map((a) => a.author_name).filter(Boolean))).sort();
	return {
		items: res.data ?? [],
		total: res.count ?? 0,
		page,
		categories: cats.data ?? [],
		authors
	};
});
var getArticle_createServerFn_handler = createServerRpc({
	id: "e40de1b045998e5801c86a796be5af773d3301fc49a5bc8c024a95af17b2cc7d",
	name: "getArticle",
	filename: "src/lib/public.functions.ts"
}, (opts) => getArticle.__executeServer(opts));
var getArticle = createServerFn({ method: "GET" }).validator((input) => objectType({ slug: stringType().min(1).max(200) }).parse(input)).handler(getArticle_createServerFn_handler, async ({ data }) => {
	const sb = createPublicClient();
	const res = await sb.from("articles").select("id, slug, title, excerpt, content, cover_image_url, author_name, author_avatar_url, author_bio, is_official, published_at, category_id, category:categories(name, slug)").eq("slug", data.slug).eq("status", "published").maybeSingle();
	if (res.error) fail("article", res.error);
	if (!res.data) return {
		article: null,
		related: []
	};
	let relatedQuery = sb.from("articles").select(CARD_COLUMNS).eq("status", "published").neq("id", res.data.id).order("published_at", { ascending: false }).limit(3);
	if (res.data.category_id) relatedQuery = relatedQuery.eq("category_id", res.data.category_id);
	let related = (await relatedQuery).data ?? [];
	if (related.length < 3) {
		const more = await sb.from("articles").select(CARD_COLUMNS).eq("status", "published").neq("id", res.data.id).order("published_at", { ascending: false }).limit(6);
		const seen = new Set(related.map((r) => r.id));
		for (const r of more.data ?? []) {
			if (related.length >= 3) break;
			if (!seen.has(r.id)) related.push(r);
		}
		related = related.slice(0, 3);
	}
	return {
		article: res.data,
		related
	};
});
var listThoughts_createServerFn_handler = createServerRpc({
	id: "78ea8035e02beec07856a790b5cb5d1201abaa7b73be29b787becc38fc0a9910",
	name: "listThoughts",
	filename: "src/lib/public.functions.ts"
}, (opts) => listThoughts.__executeServer(opts));
var listThoughts = createServerFn({ method: "GET" }).validator((input) => objectType({
	category: stringType().max(80).optional(),
	page: numberType().int().min(1).max(500).optional()
}).parse(input)).handler(listThoughts_createServerFn_handler, async ({ data }) => {
	const sb = createPublicClient();
	const page = data.page ?? 1;
	const from = (page - 1) * 12;
	let query = sb.from("thoughts").select("id, title, content, category, author_name, author_avatar_url, published_at", { count: "exact" }).eq("status", "published").order("published_at", { ascending: false }).range(from, from + 12 - 1);
	if (data.category) query = query.eq("category", data.category);
	const res = await query;
	if (res.error) fail("thoughts", res.error);
	return {
		items: res.data ?? [],
		total: res.count ?? 0,
		page
	};
});
var getAboutContent_createServerFn_handler = createServerRpc({
	id: "6dd424b065bcaae5f9ea039cb1a7f0cf7941c55af1b6c5cee3635853e52a2d10",
	name: "getAboutContent",
	filename: "src/lib/public.functions.ts"
}, (opts) => getAboutContent.__executeServer(opts));
var getAboutContent = createServerFn({ method: "GET" }).handler(getAboutContent_createServerFn_handler, async () => {
	const res = await createPublicClient().from("site_content").select("title, body, data").eq("key", "about").maybeSingle();
	if (res.error) fail("about", res.error);
	return {
		title: res.data?.title ?? "About YWBA",
		body: res.data?.body ?? "",
		data: res.data?.data ?? {}
	};
});
var getContact_createServerFn_handler = createServerRpc({
	id: "9b02aa627a3c2d613b1232d0cec66f15e2bce2e355be6f0b483fb03b880e0f60",
	name: "getContact",
	filename: "src/lib/public.functions.ts"
}, (opts) => getContact.__executeServer(opts));
var getContact = createServerFn({ method: "GET" }).handler(getContact_createServerFn_handler, async () => {
	const res = await createPublicClient().from("site_content").select("data").eq("key", "contact").maybeSingle();
	if (res.error) {
		console.error("[public] contact", res.error);
		return {};
	}
	return res.data?.data ?? {};
});
//#endregion
export { getAboutContent_createServerFn_handler, getArticle_createServerFn_handler, getContact_createServerFn_handler, getHomeData_createServerFn_handler, listArticles_createServerFn_handler, listThoughts_createServerFn_handler };
