import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { articlesQuery } from "@/lib/queries";
import { ARTICLES_PAGE_SIZE } from "@/lib/constants";
import { ArticleCard } from "@/components/content/article-card";
import { EmptyState, Pager, PageIntro } from "@/components/content/common";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type ArticlesSearch = { q?: string; category?: string; author?: string; page?: number };

export const Route = createFileRoute("/articles/")({
  validateSearch: (search: Record<string, unknown>): ArticlesSearch => {
    const str = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined);
    const page = Number(search.page);
    return {
      q: str(search.q, 100),
      category: str(search.category, 80),
      author: str(search.author, 120),
      page: Number.isInteger(page) && page > 1 ? Math.min(page, 500) : undefined,
    };
  },
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) => context.queryClient.ensureQueryData(articlesQuery(deps)),
  head: () => ({
    meta: [
      { title: "Articles — YWBA" },
      {
        name: "description",
        content:
          "Articles on Buddhist philosophy, women's empowerment, education, leadership and culture, written by members of the Young Women's Buddhist Association.",
      },
      { property: "og:title", content: "Articles — Young Women's Buddhist Association" },
      { property: "og:description", content: "Read the latest writing from YWBA members and editors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/articles/" });
  const { data } = useSuspenseQuery(articlesQuery(search));
  const [q, setQ] = useState(search.q ?? "");
  useEffect(() => setQ(search.q ?? ""), [search.q]);

  const totalPages = Math.max(1, Math.ceil(data.total / ARTICLES_PAGE_SIZE));
  const page = search.page ?? 1;
  const hasFilters = !!(search.q || search.category || search.author);
  const activeCategory = data.categories.find((c) => c.slug === search.category);
  const [lead, ...rest] = data.items;
  const showLead = !hasFilters && page === 1 && lead;

  const chip = (active: boolean) =>
    cn(
      "whitespace-nowrap border px-3.5 py-1.5 text-sm transition-colors",
      active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground",
    );

  return (
    <>
      <PageIntro eyebrow="The YWBA Journal" title="Articles">
        Writing on the Dhamma, learning, leadership, culture and the lives of young women — by our members and the
        editorial board.
      </PageIntro>

      <div className="container-page py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <form
            role="search"
            className="relative w-full lg:max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
              void navigate({ search: (prev) => ({ ...prev, q: q.trim() || undefined, page: undefined }) });
            }}
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by title or keyword"
              aria-label="Search articles"
              className="h-11 bg-card pl-9 pr-24"
            />
            <Button type="submit" size="sm" className="absolute right-1.5 top-1/2 -translate-y-1/2">
              Search
            </Button>
          </form>
          <div className="flex items-center gap-3">
            <Select
              value={search.author ?? "all"}
              onValueChange={(v) =>
                void navigate({ search: (prev) => ({ ...prev, author: v === "all" ? undefined : v, page: undefined }) })
              }
            >
              <SelectTrigger className="h-11 w-full bg-card lg:w-60" aria-label="Filter by author">
                <SelectValue placeholder="All authors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All authors</SelectItem>
                {data.authors.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="-mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-2" aria-label="Categories">
          <Link to="/articles" search={(prev) => ({ ...prev, category: undefined, page: undefined })} className={chip(!search.category)}>
            All
          </Link>
          {data.categories.map((c) => (
            <Link
              key={c.id}
              to="/articles"
              search={(prev) => ({ ...prev, category: c.slug, page: undefined })}
              className={chip(search.category === c.slug)}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {hasFilters ? (
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>
              {data.total} {data.total === 1 ? "article" : "articles"}
              {search.q ? <> matching “<span className="text-foreground">{search.q}</span>”</> : null}
              {activeCategory ? <> in <span className="text-foreground">{activeCategory.name}</span></> : null}
              {search.author ? <> by <span className="text-foreground">{search.author}</span></> : null}
            </span>
            <Link to="/articles" className="inline-flex items-center gap-1 font-medium text-primary">
              <X className="h-3.5 w-3.5" /> Clear filters
            </Link>
          </div>
        ) : null}

        <div className="mt-10">
          {data.items.length === 0 ? (
            <EmptyState
              title="No articles found"
              action={
                <Button asChild variant="outline">
                  <Link to="/articles">View all articles</Link>
                </Button>
              }
            >
              Try a different keyword or category.
            </EmptyState>
          ) : (
            <>
              {showLead ? (
                <div className="mb-16 border-b border-border pb-16">
                  <ArticleCard article={lead} variant="feature" />
                </div>
              ) : null}
              <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {(showLead ? rest : data.items).map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </>
          )}
        </div>

        <Pager page={page} totalPages={totalPages} to="/articles" search={search} />
      </div>
    </>
  );
}
