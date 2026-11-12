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
    <div className={cn("flex items-end justify-between gap-6 border-b border-border pb-5", className)}>
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="mt-2 font-serif text-3xl leading-tight md:text-4xl">{title}</h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
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
    <section className="border-b border-border">
      <div className="container-page py-14 md:py-20">
        <p className="eyebrow !text-primary">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.08] md:text-6xl">{title}</h1>
        {children ? <div className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</div> : null}
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
    <div className={cn("flex flex-col items-center border border-dashed border-border px-6 py-14 text-center", className)}>
      <LotusMark className="h-10 w-10 opacity-80" />
      <h3 className="mt-4 font-serif text-2xl">{title}</h3>
      {children ? <div className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{children}</div> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function LoadingBlock({ label = "Loading…", className }: { label?: string; className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground", className)} role="status">
      <Loader2 className="h-4 w-4 animate-spin" /> {label}
    </div>
  );
}

export function ErrorBlock({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="border border-destructive/30 bg-destructive/5 px-5 py-4 text-sm text-destructive" role="alert">
      {message}{" "}
      {onRetry ? (
        <button type="button" onClick={onRetry} className="ml-1 font-semibold underline underline-offset-2">
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
    "inline-flex h-10 items-center gap-1.5 border border-border px-4 text-sm font-medium transition-colors hover:border-foreground";
  return (
    <nav aria-label="Pagination" className="mt-14 flex items-center justify-between">
      {page > 1 ? (
        <Link to={to} search={{ ...search, page: page - 1 }} className={linkCls}>
          <ChevronLeft className="h-4 w-4" /> Newer
        </Link>
      ) : (
        <span />
      )}
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
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
