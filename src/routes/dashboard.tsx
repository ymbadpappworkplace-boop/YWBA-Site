import { useEffect } from "react";
import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, LoaderCircle, LogOut, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Member dashboard — YWBA" },
      { name: "description", content: "Your YWBA member account." },
    ],
  }),
  component: DashboardLayout,
});

const TABS = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/profile", label: "My profile", icon: UserRound },
] as const;

function DashboardLayout() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    if (!loading && !user) {
      void navigate({ to: "/auth", search: { mode: "signin" }, replace: true });
    }
  }, [loading, navigate, user]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center" role="status">
        <LoaderCircle className="size-6 animate-spin text-primary" />
        <span className="sr-only">Loading your account</span>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    await navigate({ to: "/", replace: true });
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 lg:py-16">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow !text-primary">Member portal</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl">Member dashboard</h1>
        </div>
        <Button type="button" variant="outline" onClick={() => void handleSignOut()}>
          <LogOut className="size-4" />
          Sign out
        </Button>
      </div>

      <nav aria-label="Dashboard" className="mt-8 flex gap-1 border-b border-border">
        {TABS.map((tab) => {
          const active = pathname === tab.to;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={cn(
                "relative flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={active ? "page" : undefined}
            >
              <tab.icon className="size-4" />
              {tab.label}
              {active ? <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" /> : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10">
        <Outlet />
      </div>
    </main>
  );
}
