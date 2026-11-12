import { t as cn } from "./utils-C_uf36nf.mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as formatDate } from "./format-DM6Xt5HZ.mjs";
import { n as LotusMark } from "./logo-DBWTjrHb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/article-card-Z6yKtGIf.js
var import_jsx_runtime = require_jsx_runtime();
function Cover({ src, alt, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative overflow-hidden bg-muted", className),
		children: src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			loading: "lazy",
			className: "img-hover h-full w-full object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-full w-full items-center justify-center bg-gold-soft/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotusMark, { className: "h-12 w-12 opacity-70" })
		})
	});
}
function Meta({ article, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium text-foreground/80",
			children: article.author_name
		}), article.published_at ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			children: "·"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
			dateTime: article.published_at,
			children: formatDate(article.published_at, "d MMM yyyy")
		})] }) : null]
	});
}
function ArticleCard({ article, variant = "default" }) {
	if (!article.slug) return null;
	if (variant === "feature") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/articles/$slug",
		params: { slug: article.slug },
		className: "group grid gap-6 md:grid-cols-5 md:gap-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cover, {
			src: article.cover_image_url,
			alt: "",
			className: "aspect-[4/3] md:col-span-3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col justify-center md:col-span-2",
			children: [
				article.category ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow !text-primary",
					children: article.category.name
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-3 font-serif text-3xl leading-tight text-foreground transition-colors group-hover:text-primary md:text-[2.4rem]",
					children: article.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[0.98rem] leading-relaxed text-muted-foreground",
					children: article.excerpt
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
					article,
					className: "mt-6"
				})
			]
		})]
	});
	if (variant === "row") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/articles/$slug",
		params: { slug: article.slug },
		className: "group flex gap-5 py-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cover, {
			src: article.cover_image_url,
			alt: "",
			className: "aspect-square w-24 shrink-0 sm:w-28"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				article.category ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow !text-[0.65rem] !text-primary",
					children: article.category.name
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1.5 font-serif text-xl leading-snug transition-colors group-hover:text-primary",
					children: article.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
					article,
					className: "mt-2"
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/articles/$slug",
		params: { slug: article.slug },
		className: "group flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cover, {
			src: article.cover_image_url,
			alt: "",
			className: "aspect-[3/2]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pt-5",
			children: [
				article.category ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow !text-primary",
					children: article.category.name
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-2 font-serif text-[1.55rem] leading-snug transition-colors group-hover:text-primary",
					children: article.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2.5 line-clamp-3 text-[0.95rem] leading-relaxed text-muted-foreground",
					children: article.excerpt
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
					article,
					className: "mt-4"
				})
			]
		})]
	});
}
//#endregion
export { ArticleCard as t };
