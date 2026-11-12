import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-oFxiYaZx.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as LotusMark } from "./logo-DBWTjrHb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/articles._slug-DdWAy6_6.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "container-page py-28 text-center",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotusMark, { className: "mx-auto h-12 w-12" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-6 font-serif text-4xl",
			children: "This article isn't available"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted-foreground",
			children: "It may have been moved or is no longer published."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/articles",
				children: "Browse articles"
			})
		})
	]
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
