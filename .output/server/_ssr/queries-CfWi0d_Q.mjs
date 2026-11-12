import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-Cm6-C1-Y.mjs";
import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-CfWi0d_Q.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getHomeData = createServerFn({ method: "GET" }).handler(createSsrRpc("514c825cd0bfcd882160370a17467d767e38a3a4176769246907d1f2960bad74"));
var listArticlesInput = objectType({
	q: stringType().max(100).optional(),
	category: stringType().max(80).optional(),
	author: stringType().max(120).optional(),
	page: numberType().int().min(1).max(500).optional()
});
var listArticles = createServerFn({ method: "GET" }).validator((input) => listArticlesInput.parse(input)).handler(createSsrRpc("5a3fefe709dfb4e3db03e91c71c801c388432cae7bca122ee2615cbabfac0c8f"));
var getArticle = createServerFn({ method: "GET" }).validator((input) => objectType({ slug: stringType().min(1).max(200) }).parse(input)).handler(createSsrRpc("e40de1b045998e5801c86a796be5af773d3301fc49a5bc8c024a95af17b2cc7d"));
var listThoughts = createServerFn({ method: "GET" }).validator((input) => objectType({
	category: stringType().max(80).optional(),
	page: numberType().int().min(1).max(500).optional()
}).parse(input)).handler(createSsrRpc("78ea8035e02beec07856a790b5cb5d1201abaa7b73be29b787becc38fc0a9910"));
var getAboutContent = createServerFn({ method: "GET" }).handler(createSsrRpc("6dd424b065bcaae5f9ea039cb1a7f0cf7941c55af1b6c5cee3635853e52a2d10"));
var getContact = createServerFn({ method: "GET" }).handler(createSsrRpc("9b02aa627a3c2d613b1232d0cec66f15e2bce2e355be6f0b483fb03b880e0f60"));
var homeQuery = () => queryOptions({
	queryKey: ["public", "home"],
	queryFn: () => getHomeData(),
	staleTime: 6e4
});
var articlesQuery = (filters) => queryOptions({
	queryKey: [
		"public",
		"articles",
		filters
	],
	queryFn: () => listArticles({ data: filters }),
	staleTime: 3e4
});
var articleQuery = (slug) => queryOptions({
	queryKey: [
		"public",
		"article",
		slug
	],
	queryFn: () => getArticle({ data: { slug } }),
	staleTime: 6e4
});
var thoughtsQuery = (filters) => queryOptions({
	queryKey: [
		"public",
		"thoughts",
		filters
	],
	queryFn: () => listThoughts({ data: filters }),
	staleTime: 3e4
});
var aboutQuery = () => queryOptions({
	queryKey: ["public", "about"],
	queryFn: () => getAboutContent(),
	staleTime: 6e4
});
var contactQuery = () => queryOptions({
	queryKey: ["public", "contact"],
	queryFn: () => getContact(),
	staleTime: 3e5
});
//#endregion
export { homeQuery as a, contactQuery as i, articleQuery as n, thoughtsQuery as o, articlesQuery as r, aboutQuery as t };
