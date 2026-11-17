import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock } from "lucide-react";

import { articleQuery } from "@/lib/queries";
import { Markdown } from "@/components/content/markdown";
import { ArticleCard } from "@/components/content/article-card";
import { ReadingProgress } from "@/components/content/reading-progress";
import { SectionHeading } from "@/components/content/common";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LotusMark } from "@/components/site/logo";
import { formatDate, initials, readingTime } from "@/lib/format";

export const Route = createFileRoute("/articles/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(articleQuery(params.slug));
    if (!data.article) throw notFound();
    return {
      title: data.article.title,
      excerpt: data.article.excerpt,
      cover: data.article.cover_image_url,
      author: data.article.author_name,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article unavailable — YWBA" }, { name: "robots", content: "noindex" }],
      };
    }
    const meta = [
      { title: `${loaderData.title} — YWBA` },
      { name: "description", content: loaderData.excerpt },
      { name: "author", content: loaderData.author },
      { property: "og:title", content: loaderData.title },
      { property: "og:description", content: loaderData.excerpt },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ];
    if (loaderData.cover?.startsWith("https://")) {
      meta.push(
        { property: "og:image", content: loaderData.cover },
        { name: "twitter:image", content: loaderData.cover },
      );
    }
    return { meta };
  },
  notFoundComponent: () => (
    <div className="container-page py-28 text-center">
      <LotusMark className="mx-auto h-12 w-12" />
      <h1 className="mt-6 font-serif text-4xl">This article isn't available</h1>
      <p className="mt-3 text-muted-foreground">
        It may have been moved or is no longer published.
      </p>
      <Button asChild className="mt-8">
        <Link to="/articles">Browse articles</Link>
      </Button>
    </div>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(articleQuery(slug));
  const article = data.article!;

  return (
    <article>
      <ReadingProgress />

      <header className="container-page max-w-4xl pt-10 md:pt-14">
        <Link
          to="/articles"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>

        <div className="mt-10 text-center">
          {article.category ? (
            <Link
              to="/articles"
              search={{ category: article.category.slug }}
              className="inline-flex items-center rounded-full border border-gold/40 bg-gold-soft/70 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:border-gold"
            >
              {article.category.name}
            </Link>
          ) : null}
          <h1 className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-[1.06] md:text-[3.5rem]">
            {article.title}
          </h1>
          {article.excerpt ? (
            <p className="mx-auto mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>
          ) : null}

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 border border-border">
                {article.author_avatar_url ? (
                  <AvatarImage src={article.author_avatar_url} alt="" />
                ) : null}
                <AvatarFallback className="bg-gold-soft font-serif text-primary">
                  {initials(article.author_name)}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="font-medium">{article.author_name}</div>
                <div className="text-muted-foreground">
                  {article.published_at ? (
                    <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
                  ) : null}
                </div>
              </div>
            </div>
            <span className="hidden h-8 w-px bg-border sm:block" aria-hidden />
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4" /> {readingTime(article.content)} min read
            </span>
          </div>
        </div>
      </header>

      {article.cover_image_url ? (
        <figure className="container-page mt-12 max-w-5xl">
          <img
            src={article.cover_image_url}
            alt=""
            className="aspect-[16/9] w-full rounded-2xl border border-border object-cover shadow-lift"
          />
        </figure>
      ) : (
        <div className="container-page mt-12 max-w-3xl">
          <div className="rule-gold mx-auto w-24" />
        </div>
      )}

      <div className="container-page mt-14 max-w-[42rem]">
        <Markdown>{article.content}</Markdown>

        <div className="mt-16 rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14 border border-border">
              {article.author_avatar_url ? (
                <AvatarImage src={article.author_avatar_url} alt="" />
              ) : null}
              <AvatarFallback className="bg-gold-soft font-serif text-lg text-primary">
                {initials(article.author_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="eyebrow !text-primary">Written by</p>
              <p className="mt-1 font-serif text-2xl">{article.author_name}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {article.author_bio ||
                  (article.is_official
                    ? "Official publication of the Young Women's Buddhist Association."
                    : "Member of the Young Women's Buddhist Association.")}
              </p>
              {!article.is_official ? (
                <Link
                  to="/articles"
                  search={{ author: article.author_name }}
                  className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  More by this author
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {data.related.length > 0 ? (
        <section className="container-page mt-24">
          <SectionHeading eyebrow="Continue reading" title="Related articles" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {data.related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
