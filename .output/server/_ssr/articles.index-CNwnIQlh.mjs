import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as articlesQuery } from "./queries-CfWi0d_Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/articles.index-CNwnIQlh.js
var $$splitComponentImporter = () => import("./articles.index-CeCWjmq4.mjs");
var Route = createFileRoute("/articles/")({
	validateSearch: (search) => {
		const str = (v, max) => typeof v === "string" && v.trim() ? v.trim().slice(0, max) : void 0;
		const page = Number(search.page);
		return {
			q: str(search.q, 100),
			category: str(search.category, 80),
			author: str(search.author, 120),
			page: Number.isInteger(page) && page > 1 ? Math.min(page, 500) : void 0
		};
	},
	loaderDeps: ({ search }) => search,
	loader: ({ context, deps }) => context.queryClient.ensureQueryData(articlesQuery(deps)),
	head: () => ({ meta: [
		{ title: "Articles — YWBA" },
		{
			name: "description",
			content: "Articles on Buddhist philosophy, women's empowerment, education, leadership and culture, written by members of the Young Women's Buddhist Association."
		},
		{
			property: "og:title",
			content: "Articles — Young Women's Buddhist Association"
		},
		{
			property: "og:description",
			content: "Read the latest writing from YWBA members and editors."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
