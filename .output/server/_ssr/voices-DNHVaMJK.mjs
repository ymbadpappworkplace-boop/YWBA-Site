import { t as cn } from "./utils-C_uf36nf.mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-oFxiYaZx.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { o as thoughtsQuery } from "./queries-CfWi0d_Q.mjs";
import { t as THOUGHT_CATEGORIES } from "./format-DM6Xt5HZ.mjs";
import { c as PenLine } from "../_libs/lucide-react.mjs";
import { n as PageIntro, r as Pager, t as EmptyState } from "./common-FJ6yPft2.mjs";
import { t as Route } from "./voices-DDzIx6Tz.mjs";
import { t as ThoughtCard } from "./thought-card-BpnvV_-n.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/voices-DNHVaMJK.js
var import_jsx_runtime = require_jsx_runtime();
function VoicesPage() {
	const search = Route.useSearch();
	const { data } = useSuspenseQuery(thoughtsQuery(search));
	const totalPages = Math.max(1, Math.ceil(data.total / 12));
	const chip = (active) => cn("whitespace-nowrap border px-3.5 py-1.5 text-sm transition-colors", active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageIntro, {
		eyebrow: "Community",
		title: "Voices of YWBA",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A space for our members' thoughts and reflections — on the teachings, on personal experience, and on the questions that shape the lives of young women today." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/dashboard/voices/new",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, {}), " Share your thoughts"]
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "-mx-1 flex gap-2 overflow-x-auto px-1 pb-2",
				"aria-label": "Topics",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/voices",
					search: {},
					className: chip(!search.category),
					children: "All topics"
				}), THOUGHT_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/voices",
					search: { category: c },
					className: chip(search.category === c),
					children: c
				}, c))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: data.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No reflections here yet",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard/voices/new",
							children: "Write the first one"
						})
					}),
					children: "Reflections appear once they've been reviewed by the YWBA team."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: data.items.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThoughtCard, {
						thought: t,
						clamp: false
					}, t.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pager, {
				page: search.page ?? 1,
				totalPages,
				to: "/voices",
				search
			})
		]
	})] });
}
//#endregion
export { VoicesPage as component };
