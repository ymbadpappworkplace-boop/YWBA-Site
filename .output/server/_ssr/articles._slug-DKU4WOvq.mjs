import { t as cn } from "./utils-C_uf36nf.mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { n as articleQuery } from "./queries-CfWi0d_Q.mjs";
import { a as readingTime, i as initials, r as formatDate } from "./format-DM6Xt5HZ.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-gunzrkKA.mjs";
import { t as Route } from "./articles._slug-BIDiCakA.mjs";
import { t as ArticleCard } from "./article-card-Z6yKtGIf.mjs";
import { k as ArrowLeft } from "../_libs/lucide-react.mjs";
import { i as SectionHeading } from "./common-FJ6yPft2.mjs";
import { t as Markdown$1 } from "../_libs/react-markdown+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/articles._slug-DKU4WOvq.js
var import_jsx_runtime = require_jsx_runtime();
/** Renders member-written Markdown safely (raw HTML is not allowed). */
function Markdown({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("prose-ywba", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown$1, {
			components: {
				a: ({ href, children: c }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href,
					target: "_blank",
					rel: "noopener noreferrer nofollow",
					children: c
				}),
				img: () => null
			},
			children
		})
	});
}
function ArticlePage() {
	const { slug } = Route.useParams();
	const { data } = useSuspenseQuery(articleQuery(slug));
	const article = data.article;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "container-page max-w-4xl pt-10 md:pt-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/articles",
				className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " All articles"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 text-center",
				children: [
					article.category ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/articles",
						search: { category: article.category.slug },
						className: "eyebrow !text-primary hover:underline",
						children: article.category.name
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mx-auto mt-5 max-w-3xl font-serif text-4xl leading-[1.08] md:text-[3.6rem]",
						children: article.title
					}),
					article.excerpt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-muted-foreground",
						children: article.excerpt
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex items-center justify-center gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							className: "h-10 w-10 border border-border",
							children: [article.author_avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
								src: article.author_avatar_url,
								alt: ""
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
								className: "bg-gold-soft font-serif text-primary",
								children: initials(article.author_name)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: article.author_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-muted-foreground",
								children: [
									article.published_at ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
										dateTime: article.published_at,
										children: formatDate(article.published_at)
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": true,
										children: " · "
									}),
									readingTime(article.content),
									" min read"
								]
							})]
						})]
					})
				]
			})]
		}),
		article.cover_image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
			className: "container-page mt-12 max-w-6xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: article.cover_image_url,
				alt: "",
				className: "aspect-[16/9] w-full object-cover"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-page mt-12 max-w-3xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rule-gold mx-auto w-24" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page mt-14 max-w-[42rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { children: article.content }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16 border-t border-border pt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						className: "h-14 w-14 border border-border",
						children: [article.author_avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
							src: article.author_avatar_url,
							alt: ""
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
							className: "bg-gold-soft font-serif text-lg text-primary",
							children: initials(article.author_name)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Written by"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-serif text-2xl",
							children: article.author_name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: article.author_bio || (article.is_official ? "Official publication of the Young Women's Buddhist Association." : "Member of the Young Women's Buddhist Association.")
						}),
						!article.is_official ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/articles",
							search: { author: article.author_name },
							className: "mt-3 inline-block text-sm font-semibold text-primary hover:underline",
							children: "More by this author"
						}) : null
					] })]
				})
			})]
		}),
		data.related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-page mt-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Continue reading",
				title: "Related articles"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-x-8 gap-y-14 md:grid-cols-3",
				children: data.related.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article: a }, a.id))
			})]
		}) : null
	] });
}
//#endregion
export { ArticlePage as component };
