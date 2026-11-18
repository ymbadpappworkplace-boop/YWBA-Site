import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import type { AuthError, Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

type AuthState = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  profile: Profile | null;
  profileLoading: boolean;
  isAdmin: boolean;
  authError: string | null;
  clearAuthError: () => void;
  refreshProfile: () => Promise<unknown>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

/** Turn a failed PKCE/OAuth callback into something a member can act on. */
function describeCallbackError(error: AuthError): string {
  const detail = `${error.code ?? ""} ${error.message ?? ""}`;
  if (/flow_state_not_found|flow_state_already_used|flow state|already used/i.test(detail)) {
    return "That sign-in attempt expired or was already used. Please press “Continue with Google” again.";
  }
  if (/code verifier|pkce|code_challenge/i.test(detail)) {
    return "Your browser couldn't complete the secure sign-in step. Allow cookies for this site, then try again.";
  }
  return error.message || "Please try again.";
}

/** Drop single-use OAuth params so a refresh cannot retry a spent code. */
function stripCallbackParams() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  for (const param of ["code", "error", "error_code", "error_description", "sb_flow_id"]) {
    url.searchParams.delete(param);
  }
  const search = url.searchParams.toString();
  window.history.replaceState(
    window.history.state,
    "",
    `${url.pathname}${search ? `?${search}` : ""}${url.hash}`,
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Read before supabase-js redeems the code and removes it from the URL, so a
  // successful callback that lands on a page other than /auth still ends on the
  // dashboard.
  const pendingCallback = useRef(
    typeof window !== "undefined" && new URLSearchParams(window.location.search).has("code"),
  );

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, next) => {
      setSession(next);
      setLoading(false);
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      void router.invalidate();
      if (event !== "SIGNED_OUT") {
        setAuthError(null);
        void queryClient.invalidateQueries();
      }
    });

    // `initialize()` is what exchanges the `?code=` an OAuth (or email link)
    // callback returns with. Awaiting it lets us show a real message when the
    // exchange fails; `getSession()` alone resolves to null and looks like a
    // user who simply never signed in.
    void (async () => {
      const { error: callbackError } = await supabase.auth.initialize();
      if (callbackError) {
        setAuthError(describeCallbackError(callbackError));
        stripCallbackParams();
        // The error is rendered on /auth. If Supabase dropped the callback on
        // another page, send the member there so they see what happened.
        if (typeof window !== "undefined" && window.location.pathname !== "/auth") {
          await router.navigate({ to: "/auth", search: { mode: "signin" }, replace: true });
        }
      }
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
      if (!callbackError && data.session && pendingCallback.current) {
        pendingCallback.current = false;
        await router.navigate({ to: "/dashboard", replace: true });
      }
    })();

    return () => sub.subscription.unsubscribe();
  }, [router, queryClient]);

  const userId = session?.user.id;

  const profileQuery = useQuery({
    queryKey: ["me", "profile", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const rolesQuery = useQuery({
    queryKey: ["me", "roles", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId!);
      if (error) throw error;
      return (data ?? []).map((r) => r.role);
    },
  });

  const value: AuthState = {
    session,
    user: session?.user ?? null,
    loading,
    profile: profileQuery.data ?? null,
    profileLoading: !!userId && profileQuery.isLoading,
    isAdmin: (rolesQuery.data ?? []).includes("admin"),
    authError,
    clearAuthError: () => setAuthError(null),
    refreshProfile: () => profileQuery.refetch(),
    signOut: async () => {
      await queryClient.cancelQueries();
      queryClient.clear();
      await supabase.auth.signOut();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

/** Sign out and leave protected pages without keeping them in history. */
export function useSignOut() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  return async () => {
    await signOut();
    void navigate({ to: "/", replace: true });
  };
}
