import { useEffect } from "react";
import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, LoaderCircle, LogOut, PenLine, UserRound } from "lucide-react";

import { MembershipBadge } from "@/components/member/membership-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { initials } from "@/lib/format";
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
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/profile", label: "My profile", icon: UserRound, exact: true },
  { to: "/dashboard/voices/new", label: "Share a voice", icon: PenLine, exact: true },
] as const;

const tabClass = cn(
  "flex shrink-0 items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm font-medium text-muted-foreground transition-colors",
  "hover:bg-secondary/70 hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-primary",
);

function DashboardLayout() {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();

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

  const name = profile?.full_name || user.email || "";

  const handleSignOut = async () => {
    await signOut();
    await navigate({ to: "/", replace: true });
  };

  return (
    <div className="container-page py-8 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10">
        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-3">
              <Avatar className="size-12 border border-border">
                {profile?.avatar_url ? <AvatarImage src={profile.avatar_url} alt="" /> : null}
                <AvatarFallback className="bg-gold-soft font-serif text-base text-primary">
                  {initials(name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate font-medium">{name || "YWBA member"}</p>
                <p className="truncate font-mono text-xs text-muted-foreground">
                  {profile?.member_id ?? "No member ID"}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-4">
              <MembershipBadge status={profile?.membership_status} />
              <Link
                to="/dashboard/profile"
                className="text-xs font-semibold text-primary underline-offset-4 hover:underline"
              >
                Edit
              </Link>
            </div>
          </div>

          <nav
            aria-label="Dashboard"
            className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-2 shadow-card lg:flex-col lg:overflow-visible"
          >
            {TABS.map((tab) => (
              <Link
                key={tab.to}
                to={tab.to}
                activeOptions={{ exact: tab.exact }}
                className={tabClass}
              >
                <tab.icon className="size-4" />
                {tab.label}
              </Link>
            ))}
          </nav>

          <Button
            type="button"
            variant="ghost"
            className="w-full justify-start"
            onClick={() => void handleSignOut()}
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </aside>

        <section className="min-w-0">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
