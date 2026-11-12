import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PenLine } from "lucide-react";
import { thoughtsQuery } from "@/lib/queries";
import { THOUGHTS_PAGE_SIZE, THOUGHT_CATEGORIES } from "@/lib/constants";
import { ThoughtCard } from "@/components/content/thought-card";
import { EmptyState, Pager, PageIntro } from "@/components/content/common";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type VoicesSearch = { category?: string; page?: number };

export const Route = createFileRoute("/voices")({
  validateSearch: (search: Record<string, unknown>): VoicesSearch => {
    const cat = typeof search.category === "string" ? search.category : undefined;
    const page = Number(search.page);
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
      "whitespace-nowrap border px-3.5 py-1.5 text-sm transition-colors",
      active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground",
    );

  return (
    <>
      <PageIntro eyebrow="Community" title="Voices of YWBA">
        <p>
          A space for our members' thoughts and reflections — on the teachings, on personal experience, and on the
          questions that shape the lives of young women today.
        </p>
        <Button asChild className="mt-7">
          <Link to="/dashboard/voices/new">
            <PenLine /> Share your thoughts
          </Link>
        </Button>
      </PageIntro>

      <div className="container-page py-10">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2" aria-label="Topics">
          <Link to="/voices" search={{}} className={chip(!search.category)}>
            All topics
          </Link>
          {THOUGHT_CATEGORIES.map((c) => (
            <Link key={c} to="/voices" search={{ category: c }} className={chip(search.category === c)}>
              {c}
            </Link>
          ))}
        </div>

        <div className="mt-10">
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
