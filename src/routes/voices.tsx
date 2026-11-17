import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight, PenLine } from "lucide-react";

import { thoughtsQuery } from "@/lib/queries";
import { THOUGHTS_PAGE_SIZE, THOUGHT_CATEGORIES } from "@/lib/constants";
import { ThoughtCard } from "@/components/content/thought-card";
import { EmptyState, Pager, PageIntro } from "@/components/content/common";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type VoicesSearch = { category?: string | undefined; page?: number | undefined };

export const Route = createFileRoute("/voices")({
  validateSearch: (search: Record<string, unknown>): VoicesSearch => {
    const cat = typeof search["category"] === "string" ? search["category"] : undefined;
    const page = Number(search["page"]);
    return {
      category: cat && (THOUGHT_CATEGORIES as readonly string[]).includes(cat) ? cat : undefined,
      page: Number.isInteger(page) && page > 1 ? Math.min(page, 500) : undefined,
    };
  },
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) => context.queryClient.ensureQueryData(thoughtsQuery(deps)),
  head: () => ({
    meta: [
      { title: "Voices of YWBA — Reflections from our members" },
      {
        name: "description",
        content:
          "Thoughts, reflections and experiences shared by young women of the YWBA community on Buddhist values, education, leadership and society.",
      },
      { property: "og:title", content: "Voices of YWBA" },
      { property: "og:description", content: "Reflections and ideas shared by YWBA members." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VoicesPage,
});

function VoicesPage() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(thoughtsQuery(search));
  const totalPages = Math.max(1, Math.ceil(data.total / THOUGHTS_PAGE_SIZE));

  const chip = (active: boolean) =>
    cn(
      "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm transition-all",
      active
        ? "border-primary bg-primary text-primary-foreground shadow-soft"
        : "border-border bg-card text-foreground/75 hover:border-primary/40 hover:text-foreground",
    );

  return (
    <>
      <PageIntro eyebrow="Community" title="Voices of YWBA">
        <p>
          A space for our members' thoughts and reflections — on the teachings, on personal
          experience, and on the questions that shape the lives of young women today.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button asChild>
            <Link to="/dashboard/voices/new">
              <PenLine /> Share your thoughts
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            Submissions are reviewed by the editorial team before publication.
          </p>
        </div>
      </PageIntro>

      <section className="border-b border-border bg-card/50">
        <div className="container-page py-20 md:py-24">
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="font-serif text-2xl italic leading-relaxed text-foreground/85 md:text-[2rem]">
              “When one woman finds her voice, she makes room for the voices of many.”
            </p>
            <footer className="mt-5 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <span className="h-px w-8 bg-gold" aria-hidden />
              YWBA community
              <span className="h-px w-8 bg-gold" aria-hidden />
            </footer>
          </blockquote>
        </div>
      </section>

      <div className="container-page py-10 md:py-12">
        <div className="sticky top-[4.5rem] z-20 -mx-2 rounded-xl border border-border bg-card/90 p-3 shadow-card backdrop-blur-md lg:top-4">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 pt-1" aria-label="Topics">
            <Link to="/voices" search={{}} className={chip(!search.category)}>
              All topics
            </Link>
            {THOUGHT_CATEGORIES.map((c) => (
              <Link
                key={c}
                to="/voices"
                search={{ category: c }}
                className={chip(search.category === c)}
              >
                {c}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>
            <span className="font-medium text-foreground">{data.total}</span>{" "}
            {data.total === 1 ? "reflection" : "reflections"}
            {search.category ? (
              <>
                {" "}
                in <span className="text-foreground">{search.category}</span>
              </>
            ) : null}
          </span>
          <Link
            to="/dashboard/voices/new"
            className="inline-flex items-center gap-1.5 font-semibold text-primary"
          >
            Write your own <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8">
          {data.items.length === 0 ? (
            <EmptyState
              title="No reflections here yet"
              action={
                <Button asChild>
                  <Link to="/dashboard/voices/new">Write the first one</Link>
                </Button>
              }
            >
              Reflections appear once they've been reviewed by the YWBA team.
            </EmptyState>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.items.map((t) => (
                <ThoughtCard key={t.id} thought={t} clamp={false} />
              ))}
            </div>
          )}
        </div>

        <Pager page={search.page ?? 1} totalPages={totalPages} to="/voices" search={search} />
      </div>
    </>
  );
}
