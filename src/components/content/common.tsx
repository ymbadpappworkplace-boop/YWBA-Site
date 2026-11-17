import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

import { LotusMark } from "@/components/site/logo";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-b border-border pb-5",
        className,
      )}
    >
      <div>
        {eyebrow ? (
          <p className="eyebrow flex items-center gap-2 !text-primary">
            <span className="h-px w-6 bg-gold" aria-hidden />
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 font-serif text-3xl leading-tight md:text-[2.6rem]">{title}</h2>
      </div>
      {action ? <div className="shrink-0 pb-1">{action}</div> : null}
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full border border-gold/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-6 -top-10 size-44 rounded-full border border-gold/10"
        aria-hidden
      />
      <div className="container-page relative py-14 md:py-20">
        <p className="eyebrow animate-rise !text-primary">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl animate-rise font-serif text-4xl leading-[1.05] md:text-6xl">
          {title}
        </h1>
        {children ? (
          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function EmptyState({
  title,
  children,
  action,
  className,
}: {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center overflow-hidden rounded-xl border border-dashed border-border bg-card/60 px-6 py-16 text-center",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <span className="flex size-14 items-center justify-center rounded-full bg-gold-soft/70">
        <LotusMark className="h-8 w-8" />
      </span>
      <h3 className="mt-5 font-serif text-2xl">{title}</h3>
      {children ? (
        <div className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function LoadingBlock({
  label = "Loading…",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground",
        className,
      )}
      role="status"
    >
      <Loader2 className="h-4 w-4 animate-spin" /> {label}
    </div>
  );
}

export function ErrorBlock({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div
      className="rounded-lg border border-destructive/30 bg-destructive/5 px-5 py-4 text-sm text-destructive"
      role="alert"
    >
      {message}{" "}
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="ml-1 font-semibold underline underline-offset-2"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}

/** Previous / next pager that keeps existing search params. */
export function Pager({
  page,
  totalPages,
  to,
  search,
}: {
  page: number;
  totalPages: number;
  to: "/articles" | "/voices";
  search: Record<string, string | number | undefined>;
}) {
  if (totalPages <= 1) return null;
  const linkCls =
    "inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-card px-4 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary";
  return (
    <nav
      aria-label="Pagination"
      className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6"
    >
      {page > 1 ? (
        <Link to={to} search={{ ...search, page: page - 1 }} className={linkCls}>
          <ChevronLeft className="h-4 w-4" /> Newer
        </Link>
      ) : (
        <span />
      )}
      <span className="text-sm text-muted-foreground">
        Page <span className="font-medium text-foreground">{page}</span> of {totalPages}
      </span>
      {page < totalPages ? (
        <Link to={to} search={{ ...search, page: page + 1 }} className={linkCls}>
          Older <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
