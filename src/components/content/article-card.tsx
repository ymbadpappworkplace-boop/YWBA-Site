import { Link } from "@tanstack/react-router";
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
        <div className="flex h-full w-full items-center justify-center bg-gold-soft/60">
          <LotusMark className="h-12 w-12 opacity-70" />
        </div>
      )}
    </div>
  );
}

function Meta({ article, className }: { article: ArticleCardData; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground", className)}>
      <span className="font-medium text-foreground/80">{article.author_name}</span>
      {article.published_at ? (
        <>
          <span aria-hidden>·</span>
          <time dateTime={article.published_at}>{formatDate(article.published_at, "d MMM yyyy")}</time>
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
      <Link to="/articles/$slug" params={{ slug: article.slug }} className="group grid gap-6 md:grid-cols-5 md:gap-10">
        <Cover src={article.cover_image_url} alt="" className="aspect-[4/3] md:col-span-3" />
        <div className="flex flex-col justify-center md:col-span-2">
          {article.category ? <span className="eyebrow !text-primary">{article.category.name}</span> : null}
          <h3 className="mt-3 font-serif text-3xl leading-tight text-foreground transition-colors group-hover:text-primary md:text-[2.4rem]">
            {article.title}
          </h3>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-muted-foreground">{article.excerpt}</p>
          <Meta article={article} className="mt-6" />
        </div>
      </Link>
    );
  }

  if (variant === "row") {
    return (
      <Link to="/articles/$slug" params={{ slug: article.slug }} className="group flex gap-5 py-5">
        <Cover src={article.cover_image_url} alt="" className="aspect-square w-24 shrink-0 sm:w-28" />
        <div className="min-w-0">
          {article.category ? <span className="eyebrow !text-[0.65rem] !text-primary">{article.category.name}</span> : null}
          <h3 className="mt-1.5 font-serif text-xl leading-snug transition-colors group-hover:text-primary">
            {article.title}
          </h3>
          <Meta article={article} className="mt-2" />
        </div>
      </Link>
    );
  }

  return (
    <Link to="/articles/$slug" params={{ slug: article.slug }} className="group flex flex-col">
      <Cover src={article.cover_image_url} alt="" className="aspect-[3/2]" />
      <div className="pt-5">
        {article.category ? <span className="eyebrow !text-primary">{article.category.name}</span> : null}
        <h3 className="mt-2 font-serif text-[1.55rem] leading-snug transition-colors group-hover:text-primary">
          {article.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 text-[0.95rem] leading-relaxed text-muted-foreground">{article.excerpt}</p>
        <Meta article={article} className="mt-4" />
      </div>
    </Link>
  );
}
