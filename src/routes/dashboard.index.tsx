import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, PenLine, UserRound } from "lucide-react";

import { MembershipBadge } from "@/components/member/membership-badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { formatDate, initials } from "@/lib/format";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardOverview,
});

function DashboardOverview() {
  const { user, profile } = useAuth();
  const name = profile?.full_name || user?.user_metadata?.["full_name"] || user?.email || "";

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-serif text-3xl">Welcome{name ? `, ${name}` : ""}.</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          You are signed in to your YWBA account. Keep your details up to date so the Association
          can reach you about programmes and membership.
        </p>
      </div>

      <section
        className="border border-border bg-card p-6 sm:p-8"
        aria-labelledby="account-heading"
      >
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div className="min-w-0">
            <h3 id="account-heading" className="flex items-center gap-2 font-serif text-2xl">
              <UserRound className="size-5 text-primary" />
              Account details
            </h3>

            <dl className="mt-5 grid gap-x-10 gap-y-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Email
                </dt>
                <dd className="mt-1 flex items-center gap-2 break-all">
                  <Mail className="size-4 shrink-0 text-muted-foreground" />
                  {user?.email}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Membership ID
                </dt>
                <dd className="mt-1 font-mono">{profile?.member_id ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Status
                </dt>
                <dd className="mt-1">
                  {profile ? <MembershipBadge status={profile.membership_status} /> : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Member since
                </dt>
                <dd className="mt-1">{formatDate(profile?.created_at) || "—"}</dd>
              </div>
            </dl>
          </div>

          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gold-soft font-serif text-xl text-primary">
            {initials(name)}
          </div>
        </div>
      </section>

      {!profile ? (
        <p className="rounded-md border border-gold/50 bg-gold-soft/35 p-4 text-sm leading-relaxed text-muted-foreground">
          We couldn&apos;t find a membership profile for this account yet. If you registered before
          the member database was set up, ask an administrator to run the profile backfill, then
          reload this page.
        </p>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2" aria-label="Quick actions">
        <Link
          to="/dashboard/profile"
          className="group flex items-center justify-between gap-4 border border-border bg-card p-6 transition-colors hover:border-primary/50"
        >
          <span className="flex items-center gap-3">
            <PenLine className="size-5 text-primary" />
            <span>
              <span className="block font-serif text-xl">Edit your profile</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                Photo, contact details and a short bio.
              </span>
            </span>
          </span>
          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </Link>

        <Link
          to="/voices"
          className="group flex items-center justify-between gap-4 border border-border bg-card p-6 transition-colors hover:border-primary/50"
        >
          <span className="flex items-center gap-3">
            <UserRound className="size-5 text-primary" />
            <span>
              <span className="block font-serif text-xl">Read community voices</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                Reflections shared by fellow members.
              </span>
            </span>
          </span>
          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </Link>
      </section>

      <div>
        <Button asChild>
          <Link to="/dashboard/profile">Go to my profile</Link>
        </Button>
      </div>
    </div>
  );
}
