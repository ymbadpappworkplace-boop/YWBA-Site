import { Wt as notFound, _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as articleQuery } from "./queries-CfWi0d_Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/articles._slug-BIDiCakA.js
var $$splitComponentImporter = () => import("./articles._slug-DKU4WOvq.mjs");
var $$splitNotFoundComponentImporter = () => import("./articles._slug-DdWAy6_6.mjs");
var Route = createFileRoute("/articles/$slug")({
	loader: async ({ context, params }) => {
		const data = await context.queryClient.ensureQueryData(articleQuery(params.slug));
		if (!data.article) throw notFound();
		return {
			title: data.article.title,
			excerpt: data.article.excerpt,
			cover: data.article.cover_image_url,
			author: data.article.author_name
		};
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Article unavailable — YWBA" }, {
			name: "robots",
			content: "noindex"
		}] };
		const meta = [
			{ title: `${loaderData.title} — YWBA` },
			{
				name: "description",
				content: loaderData.excerpt
			},
			{
				name: "author",
				content: loaderData.author
			},
			{
				property: "og:title",
				content: loaderData.title
			},
			{
				property: "og:description",
				content: loaderData.excerpt
			},
			{
				property: "og:type",
				content: "article"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		];
		if (loaderData.cover?.startsWith("https://")) meta.push({
			property: "og:image",
			content: loaderData.cover
		}, {
			name: "twitter:image",
			content: loaderData.cover
		});
		return { meta };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
