import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import type { ArticleCardData } from "@/lib/public.functions";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { LotusMark } from "@/components/site/logo";

function Cover({ src, alt, className }: { src: string | null; alt: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="img-hover h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gold-soft/50">
          <LotusMark className="h-12 w-12 opacity-70" />
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
    </div>
  );
}

function Category({ article, className }: { article: ArticleCardData; className?: string }) {
  if (!article.category) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-gold/40 bg-gold-soft/70 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary",
        className,
      )}
    >
      {article.category.name}
    </span>
  );
}

function Meta({ article, className }: { article: ArticleCardData; className?: string }) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground", className)}
    >
      <span className="font-medium text-foreground/80">{article.author_name}</span>
      {article.published_at ? (
        <>
          <span aria-hidden>·</span>
          <time dateTime={article.published_at}>
            {formatDate(article.published_at, "d MMM yyyy")}
          </time>
        </>
      ) : null}
    </div>
  );
}

export function ArticleCard({
  article,
  variant = "default",
}: {
  article: ArticleCardData;
  variant?: "default" | "feature" | "row";
}) {
  if (!article.slug) return null;

  if (variant === "feature") {
    return (
      <Link
        to="/articles/$slug"
        params={{ slug: article.slug }}
        className="group grid items-center gap-6 md:grid-cols-12 md:gap-10"
      >
        <Cover
          src={article.cover_image_url}
          alt=""
          className="aspect-[4/3] rounded-xl border border-border md:col-span-7"
        />
        <div className="md:col-span-5">
          <Category article={article} />
          <h3 className="mt-4 font-serif text-3xl leading-[1.12] text-foreground transition-colors group-hover:text-primary md:text-[2.5rem]">
            {article.title}
          </h3>
          <p className="mt-4 line-clamp-3 text-[0.98rem] leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-4">
            <Meta article={article} />
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Read
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "row") {
    return (
      <Link to="/articles/$slug" params={{ slug: article.slug }} className="group flex gap-4 py-5">
        <Cover
          src={article.cover_image_url}
          alt=""
          className="aspect-square w-20 shrink-0 rounded-lg border border-border sm:w-24"
        />
        <div className="min-w-0">
          {article.category ? (
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary">
              {article.category.name}
            </span>
          ) : null}
          <h3 className="mt-1.5 font-serif text-lg leading-snug transition-colors group-hover:text-primary">
            {article.title}
          </h3>
          <Meta article={article} className="mt-2" />
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/articles/$slug"
      params={{ slug: article.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card lift"
    >
      <div className="relative">
        <Cover src={article.cover_image_url} alt="" className="aspect-[16/10]" />
        <Category article={article} className="absolute left-4 top-4 bg-card/95 backdrop-blur" />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-serif text-[1.45rem] leading-snug transition-colors group-hover:text-primary">
          {article.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 text-[0.94rem] leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5">
          <Meta article={article} />
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
      </div>
    </Link>
  );
}
