import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Mail, PenLine, ShieldCheck, UserRound } from "lucide-react";

import { MembershipBadge } from "@/components/member/membership-badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { formatDate, initials } from "@/lib/format";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardOverview,
});

const QUICK_LINKS = [
  {
    to: "/dashboard/profile",
    icon: UserRound,
    title: "Edit your profile",
    text: "Photo, contact details and a short bio.",
  },
  {
    to: "/dashboard/voices/new",
    icon: PenLine,
    title: "Share a reflection",
    text: "Submit a thought for the community feed.",
  },
  {
    to: "/articles",
    icon: ArrowUpRight,
    title: "Read the journal",
    text: "Articles and writing from members and editors.",
  },
] as const;

function DashboardOverview() {
  const { user, profile } = useAuth();
  const name = profile?.full_name || user?.user_metadata?.["full_name"] || user?.email || "";

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow flex items-center gap-2 !text-primary">
            <span className="h-px w-6 bg-gold" aria-hidden />
            Overview
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
            Welcome{name ? `, ${name}` : ""}.
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            You are signed in to your YWBA account. Keep your details up to date so the Association
            can reach you about programmes and membership.
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/profile">
            Edit profile <ArrowRight className="size-4" />
          </Link>
        </Button>
      </header>

      <section
        className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card sm:p-8"
        aria-labelledby="account-heading"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div className="min-w-0 flex-1">
            <h2 id="account-heading" className="flex items-center gap-2 font-serif text-2xl">
              <ShieldCheck className="size-5 text-primary" />
              Account details
            </h2>

            <dl className="mt-6 grid gap-x-10 gap-y-5 text-sm sm:grid-cols-2">
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
        <p className="rounded-lg border border-gold/50 bg-gold-soft/35 p-4 text-sm leading-relaxed text-muted-foreground">
          We couldn&apos;t find a membership profile for this account yet. If you registered before
          the member database was set up, ask an administrator to run the profile backfill, then
          reload this page.
        </p>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Quick actions">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-card lift"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-gold-soft/70">
              <link.icon className="size-4 text-primary" />
            </span>
            <span className="mt-4 flex items-center justify-between gap-2 font-serif text-xl">
              {link.title}
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </span>
            <span className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {link.text}
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
