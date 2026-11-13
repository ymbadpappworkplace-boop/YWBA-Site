import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { _ as createFileRoute, b as useNavigate, g as lazyRouteComponent, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as supabase } from "./client-BFwA20uY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Lkcf4ZLD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({ children }) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [session, setSession] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((event, next) => {
			setSession(next);
			setLoading(false);
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
			if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
		});
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setLoading(false);
		});
		return () => sub.subscription.unsubscribe();
	}, [router, queryClient]);
	const userId = session?.user.id;
	const profileQuery = useQuery({
		queryKey: [
			"me",
			"profile",
			userId
		],
		enabled: !!userId,
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const rolesQuery = useQuery({
		queryKey: [
			"me",
			"roles",
			userId
		],
		enabled: !!userId,
		queryFn: async () => {
			const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId);
			if (error) throw error;
			return (data ?? []).map((r) => r.role);
		}
	});
	const value = {
		session,
		user: session?.user ?? null,
		loading,
		profile: profileQuery.data ?? null,
		profileLoading: !!userId && profileQuery.isLoading,
		isAdmin: (rolesQuery.data ?? []).includes("admin"),
		refreshProfile: () => profileQuery.refetch(),
		signOut: async () => {
			await queryClient.cancelQueries();
			queryClient.clear();
			await supabase.auth.signOut();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
}
/** Sign out and leave protected pages without keeping them in history. */
function useSignOut() {
	const { signOut } = useAuth();
	const navigate = useNavigate();
	return async () => {
		await signOut();
		navigate({
			to: "/",
			replace: true
		});
	};
}
var $$splitComponentImporter = () => import("./auth-BUe0xO0g.mjs");
var Route = createFileRoute("/auth")({
	validateSearch: (search) => ({ mode: search.mode === "register" ? "register" : "signin" }),
	head: () => ({ meta: [{ title: "Sign in or join — YWBA" }, {
		name: "description",
		content: "Sign in to your YWBA account or register to become a member of our community."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { useSignOut as i, Route as n, useAuth as r, AuthProvider as t };
