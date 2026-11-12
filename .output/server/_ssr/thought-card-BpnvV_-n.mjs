import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { i as initials, r as formatDate } from "./format-DM6Xt5HZ.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-gunzrkKA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/thought-card-BpnvV_-n.js
var import_jsx_runtime = require_jsx_runtime();
function ThoughtCard({ thought, clamp = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex h-full flex-col border-t-2 border-gold bg-card px-6 pb-6 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow !text-[0.65rem]",
				children: thought.category
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 font-serif text-[1.45rem] leading-snug",
				children: thought.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: clamp ? "mt-3 line-clamp-5 whitespace-pre-line font-serif text-[1.05rem] leading-relaxed text-foreground/80" : "mt-3 whitespace-pre-line font-serif text-[1.05rem] leading-relaxed text-foreground/80",
				children: thought.content
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex items-center gap-3 pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
					className: "h-8 w-8",
					children: [thought.author_avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
						src: thought.author_avatar_url,
						alt: ""
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
						className: "bg-gold-soft font-serif text-xs text-primary",
						children: initials(thought.author_name)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium",
						children: thought.author_name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground",
						children: formatDate(thought.published_at, "d MMM yyyy")
					})]
				})]
			})
		]
	});
}
//#endregion
export { ThoughtCard as t };
