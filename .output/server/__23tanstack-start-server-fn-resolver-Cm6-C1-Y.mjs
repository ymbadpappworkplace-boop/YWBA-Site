//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-Cm6-C1-Y.js
var manifest = {
	"514c825cd0bfcd882160370a17467d767e38a3a4176769246907d1f2960bad74": {
		functionName: "getHomeData_createServerFn_handler",
		importer: () => import("./_ssr/public.functions-BsA0u1b7.mjs")
	},
	"5a3fefe709dfb4e3db03e91c71c801c388432cae7bca122ee2615cbabfac0c8f": {
		functionName: "listArticles_createServerFn_handler",
		importer: () => import("./_ssr/public.functions-BsA0u1b7.mjs")
	},
	"6dd424b065bcaae5f9ea039cb1a7f0cf7941c55af1b6c5cee3635853e52a2d10": {
		functionName: "getAboutContent_createServerFn_handler",
		importer: () => import("./_ssr/public.functions-BsA0u1b7.mjs")
	},
	"78ea8035e02beec07856a790b5cb5d1201abaa7b73be29b787becc38fc0a9910": {
		functionName: "listThoughts_createServerFn_handler",
		importer: () => import("./_ssr/public.functions-BsA0u1b7.mjs")
	},
	"9b02aa627a3c2d613b1232d0cec66f15e2bce2e355be6f0b483fb03b880e0f60": {
		functionName: "getContact_createServerFn_handler",
		importer: () => import("./_ssr/public.functions-BsA0u1b7.mjs")
	},
	"e40de1b045998e5801c86a796be5af773d3301fc49a5bc8c024a95af17b2cc7d": {
		functionName: "getArticle_createServerFn_handler",
		importer: () => import("./_ssr/public.functions-BsA0u1b7.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ??= await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
