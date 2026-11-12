import { t as cn } from "./utils-C_uf36nf.mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logo-DBWTjrHb.js
var import_jsx_runtime = require_jsx_runtime();
function LotusMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 40 40",
		"aria-hidden": "true",
		className: cn("text-gold", className),
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M20 8c3.2 4 4.8 8 4.8 12S23.2 28 20 31c-3.2-3-4.8-7-4.8-11S16.8 12 20 8Z",
				stroke: "currentColor",
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M20 31c-4-.6-8.4-3-10.6-7.6 3.4-1 7 .2 9.6 2.6M20 31c4-.6 8.4-3 10.6-7.6-3.4-1-7 .2-9.6 2.6",
				stroke: "currentColor",
				strokeWidth: "1.4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M20 31c-5.4.2-10.6-1.8-14-6.4M20 31c5.4.2 10.6-1.8 14-6.4",
				stroke: "currentColor",
				strokeWidth: "1.4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M11 34h18",
				stroke: "currentColor",
				strokeWidth: "1.4",
				strokeLinecap: "round"
			})
		]
	});
}
function Logo({ tone = "dark" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "group flex items-center gap-3",
		"aria-label": "YWBA home",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotusMark, { className: "h-9 w-9 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex flex-col leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("font-serif text-[1.35rem] font-medium tracking-[0.08em]", tone === "dark" ? "text-primary" : "text-primary-foreground"),
				children: "YWBA"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("mt-1 hidden text-[0.62rem] font-medium uppercase tracking-[0.18em] sm:block", tone === "dark" ? "text-muted-foreground" : "text-primary-foreground/70"),
				children: "Young Women's Buddhist Association"
			})]
		})]
	});
}
//#endregion
export { LotusMark as n, Logo as t };
