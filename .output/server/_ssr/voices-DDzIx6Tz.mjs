import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as thoughtsQuery } from "./queries-CfWi0d_Q.mjs";
import { t as THOUGHT_CATEGORIES } from "./format-DM6Xt5HZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/voices-DDzIx6Tz.js
var $$splitComponentImporter = () => import("./voices-DNHVaMJK.mjs");
var Route = createFileRoute("/voices")({
	validateSearch: (search) => {
		const cat = typeof search.category === "string" ? search.category : void 0;
		const page = Number(search.page);
		return {
			category: cat && THOUGHT_CATEGORIES.includes(cat) ? cat : void 0,
			page: Number.isInteger(page) && page > 1 ? Math.min(page, 500) : void 0
		};
	},
	loaderDeps: ({ search }) => search,
	loader: ({ context, deps }) => context.queryClient.ensureQueryData(thoughtsQuery(deps)),
	head: () => ({ meta: [
		{ title: "Voices of YWBA — Reflections from our members" },
		{
			name: "description",
			content: "Thoughts, reflections and experiences shared by young women of the YWBA community on Buddhist values, education, leadership and society."
		},
		{
			property: "og:title",
			content: "Voices of YWBA"
		},
		{
			property: "og:description",
			content: "Reflections and ideas shared by YWBA members."
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
