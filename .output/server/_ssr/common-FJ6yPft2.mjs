import { t as cn } from "./utils-C_uf36nf.mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as LotusMark } from "./logo-DBWTjrHb.mjs";
import { b as ChevronLeft, y as ChevronRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/common-FJ6yPft2.js
var import_jsx_runtime = require_jsx_runtime();
function SectionHeading({ eyebrow, title, action, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-end justify-between gap-6 border-b border-border pb-5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "eyebrow",
			children: eyebrow
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-2 font-serif text-3xl leading-tight md:text-4xl",
			children: title
		})] }), action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shrink-0",
			children: action
		}) : null]
	});
}
function PageIntro({ eyebrow, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page py-14 md:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow !text-primary",
					children: eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 max-w-3xl font-serif text-4xl leading-[1.08] md:text-6xl",
					children: title
				}),
				children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground",
					children
				}) : null
			]
		})
	});
}
function EmptyState({ title, children, action, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center border border-dashed border-border px-6 py-14 text-center", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotusMark, { className: "h-10 w-10 opacity-80" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-serif text-2xl",
				children: title
			}),
			children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 max-w-md text-sm leading-relaxed text-muted-foreground",
				children
			}) : null,
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: action
			}) : null
		]
	});
}
/** Previous / next pager that keeps existing search params. */
function Pager({ page, totalPages, to, search }) {
	if (totalPages <= 1) return null;
	const linkCls = "inline-flex h-10 items-center gap-1.5 border border-border px-4 text-sm font-medium transition-colors hover:border-foreground";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": "Pagination",
		className: "mt-14 flex items-center justify-between",
		children: [
			page > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to,
				search: {
					...search,
					page: page - 1
				},
				className: linkCls,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), " Newer"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-sm text-muted-foreground",
				children: [
					"Page ",
					page,
					" of ",
					totalPages
				]
			}),
			page < totalPages ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to,
				search: {
					...search,
					page: page + 1
				},
				className: linkCls,
				children: ["Older ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
		]
	});
}
//#endregion
export { SectionHeading as i, PageIntro as n, Pager as r, EmptyState as t };
