globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/about-DD6bfFso.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106b-R+RtZjQJiNtrLoyEBbWXqtiaexo\"",
		"mtime": "2026-11-13T03:42:26.914Z",
		"size": 4203,
		"path": "../public/assets/about-DD6bfFso.js"
	},
	"/assets/article-card-CoSqHACy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b23-CkGnac76OrldHf4dhYcdEVZY2Zg\"",
		"mtime": "2026-11-13T03:42:26.917Z",
		"size": 2851,
		"path": "../public/assets/article-card-CoSqHACy.js"
	},
	"/assets/articles.index-A0ojRQG5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"698d-SgOmh3GrHBB/vtifOJWMTURYExU\"",
		"mtime": "2026-11-13T03:42:26.921Z",
		"size": 27021,
		"path": "../public/assets/articles.index-A0ojRQG5.js"
	},
	"/assets/auth-CFSUqu6W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e31-mQXuN4nFcoOsZlxaVNYstVDIS7U\"",
		"mtime": "2026-11-13T03:42:26.924Z",
		"size": 15921,
		"path": "../public/assets/auth-CFSUqu6W.js"
	},
	"/assets/common-n1lpDQDU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e2-rqw9mGcXqbobY5Coy9rAfp4JZeU\"",
		"mtime": "2026-11-13T03:42:26.926Z",
		"size": 2274,
		"path": "../public/assets/common-n1lpDQDU.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-11-10T03:45:34.242Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/articles._slug-BoW8jyoA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dba3-8KToAA1/nDTjUbjIvNz87y6D4aA\"",
		"mtime": "2026-11-13T03:42:26.919Z",
		"size": 121763,
		"path": "../public/assets/articles._slug-BoW8jyoA.js"
	},
	"/assets/articles._slug-D23wvTHW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"246-2jvpjxZfNPcNRa/NKnDa8kgZFKI\"",
		"mtime": "2026-11-13T03:42:26.921Z",
		"size": 582,
		"path": "../public/assets/articles._slug-D23wvTHW.js"
	},
	"/assets/hero-temple-DQtVkPGE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38-CtFonXMHTeiplAweJm1Z8vYtkvU\"",
		"mtime": "2026-11-13T03:42:26.930Z",
		"size": 56,
		"path": "../public/assets/hero-temple-DQtVkPGE.js"
	},
	"/assets/dist-B7cUZcFr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c6a-ihkcEeIAzbK1ApDaH6EvVjFk13g\"",
		"mtime": "2026-11-13T03:42:26.926Z",
		"size": 7274,
		"path": "../public/assets/dist-B7cUZcFr.js"
	},
	"/assets/dist-DoSB8fOo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c78e-tcYI5qmbwKbRvPfmdHlVEuTcdh8\"",
		"mtime": "2026-11-13T03:42:26.926Z",
		"size": 51086,
		"path": "../public/assets/dist-DoSB8fOo.js"
	},
	"/assets/input-CCs2Iqug.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"245-7RMWO5k2pKcTFpTRCMe/zxLIqso\"",
		"mtime": "2026-11-13T03:42:26.932Z",
		"size": 581,
		"path": "../public/assets/input-CCs2Iqug.js"
	},
	"/assets/hero-temple-cTVAbqxl.jpg": {
		"type": "image/jpeg",
		"etag": "\"35e50-h1T/e+9Fs1P74JHYIhuxiqyonDI\"",
		"mtime": "2026-11-13T03:42:26.940Z",
		"size": 220752,
		"path": "../public/assets/hero-temple-cTVAbqxl.jpg"
	},
	"/assets/routes-C0Vc_mVz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"258d-I+8ROa8fs6XGIMxauOPI/wB6Q+I\"",
		"mtime": "2026-11-13T03:42:26.935Z",
		"size": 9613,
		"path": "../public/assets/routes-C0Vc_mVz.js"
	},
	"/assets/useSuspenseQuery-C3v6rZ_z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-hrsnWeO1cZ/Be2e0xejtopEGLKw\"",
		"mtime": "2026-11-13T03:42:26.940Z",
		"size": 174,
		"path": "../public/assets/useSuspenseQuery-C3v6rZ_z.js"
	},
	"/assets/useBaseQuery-CFhhk1P7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b64-UbT0SRLXM86ScGuteD0B6WC2FTQ\"",
		"mtime": "2026-11-13T03:42:26.940Z",
		"size": 23396,
		"path": "../public/assets/useBaseQuery-CFhhk1P7.js"
	},
	"/assets/queries-CBbCRdgP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a81-/ZiiXbALc8Uc9GDrwPDJOn46bxg\"",
		"mtime": "2026-11-13T03:42:26.932Z",
		"size": 39553,
		"path": "../public/assets/queries-CBbCRdgP.js"
	},
	"/assets/thought-card-C9u9aOwZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4aa-WArfumN5YspEeUBKYIwP9DrXYWo\"",
		"mtime": "2026-11-13T03:42:26.935Z",
		"size": 1194,
		"path": "../public/assets/thought-card-C9u9aOwZ.js"
	},
	"/assets/styles-BAVI5XIb.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"16fb8-CN2rlfwwUcJ0o/B4SSCKJGtMYwI\"",
		"mtime": "2026-11-13T03:42:26.945Z",
		"size": 94136,
		"path": "../public/assets/styles-BAVI5XIb.css"
	},
	"/assets/voices-CslOtqvc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"861-8LFt6hJpyiRZN0kbQIFi4pKgNp8\"",
		"mtime": "2026-11-13T03:42:26.940Z",
		"size": 2145,
		"path": "../public/assets/voices-CslOtqvc.js"
	},
	"/images/cover-education.jpg": {
		"type": "image/jpeg",
		"etag": "\"28a4b-+CaROQ8eyMXnkgSbL33QKfZiNR0\"",
		"mtime": "2026-11-10T03:45:40.711Z",
		"size": 166475,
		"path": "../public/images/cover-education.jpg"
	},
	"/images/cover-leadership.jpg": {
		"type": "image/jpeg",
		"etag": "\"2769f-FURTbVjehhGqgmOXZ23o8YUNTxo\"",
		"mtime": "2026-11-10T03:45:49.708Z",
		"size": 161439,
		"path": "../public/images/cover-leadership.jpg"
	},
	"/images/cover-heritage.jpg": {
		"type": "image/jpeg",
		"etag": "\"2333e-ZTK8Aa7L9ap90yEjGajIw+NUkmA\"",
		"mtime": "2026-11-10T03:45:43.506Z",
		"size": 144190,
		"path": "../public/images/cover-heritage.jpg"
	},
	"/images/cover-mindfulness.jpg": {
		"type": "image/jpeg",
		"etag": "\"153ea-mMt0Paubbhys/23jsWG4vsHhT0U\"",
		"mtime": "2026-11-10T03:45:53.508Z",
		"size": 87018,
		"path": "../public/images/cover-mindfulness.jpg"
	},
	"/assets/index-Lg5gI4IJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8ba3-9uZ120XFLyGTKpU3P+WpJ6AaFEE\"",
		"mtime": "2026-11-13T03:42:26.914Z",
		"size": 691107,
		"path": "../public/assets/index-Lg5gI4IJ.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_0Jz0eN = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_0Jz0eN
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
