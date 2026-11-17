import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, ArrowUpRight, Bell, Megaphone, Pin, Sparkles } from "lucide-react";

import heroImage from "@/assets/hero-temple.jpg";
import { homeQuery } from "@/lib/queries";
import { ArticleCard } from "@/components/content/article-card";
import { ThoughtCard } from "@/components/content/thought-card";
import { EmptyState, SectionHeading } from "@/components/content/common";
import { Button } from "@/components/ui/button";
import { LotusMark } from "@/components/site/logo";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YWBA — One Community. Many Voices. A Shared Journey of Wisdom." },
      {
        name: "description",
        content:
          "The Young Women's Buddhist Association: a digital home where young women share knowledge, publish articles and strengthen our Buddhist community.",
      },
      { property: "og:title", content: "Young Women's Buddhist Association" },
      {
        property: "og:description",
        content:
          "One community. Many voices. Articles, reflections and membership for young Buddhist women.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(homeQuery()),
  component: HomePage,
});

const PILLARS = [
  {
    title: "Wisdom",
    text: "Study and practise the Dhamma together, and bring its insight into everyday life.",
  },
  {
    title: "Unity",
    text: "Connect with young women across every district in one welcoming community.",
  },
  {
    title: "Voice",
    text: "Write, reflect and publish — your experiences are part of our shared story.",
  },
];

const BENEFITS = [
  "A member ID and profile in the Association register",
  "Publish articles and reflections with editorial support",
  "Invitations to programmes, Poya events and workshops",
];

function HomePage() {
  const { data } = useSuspenseQuery(homeQuery());
  const [lead, ...restFeatured] = data.featured;
  const latest = data.latest.filter((a) => a.id !== lead?.id).slice(0, 3);

  return (
    <>
      {/* Hero — ClickUp-style workspace shell */}
      <section className="container-page py-8 md:py-12">
        <div className="animate-fade relative overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
          <div className="hairline-gold absolute inset-x-0 top-0 z-10" aria-hidden />

          {/* Workspace main panel */}
          <div className="relative p-5 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3 border-b border-border pb-4">
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-destructive/40" />
                <span className="size-2.5 rounded-full bg-gold/60" />
                <span className="size-2.5 rounded-full bg-success/50" />
              </div>
              <div className="hidden items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[0.68rem] text-muted-foreground sm:flex">
                <span className="size-1.5 rounded-full bg-success" aria-hidden />
                ywba.org
              </div>
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold-soft/50 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-primary">
                <Bell className="size-3" /> Live
              </span>
            </div>

            <div className="mt-7 grid grid-cols-1 items-center gap-10 lg:mt-9 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-primary shadow-soft">
                  <LotusMark className="size-3.5" />
                  Young Women's Buddhist Association
                </span>

                <h1 className="mt-5 font-serif text-[2.5rem] leading-[1.04] tracking-tight text-foreground sm:text-5xl xl:text-[3.5rem]">
                  {data.hero.title}
                </h1>
                <div className="rule-gold mt-7 w-14" />
                <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground">
                  {data.hero.body}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link to="/auth" search={{ mode: "register" }}>
                      Become a member <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/articles">Read the articles</Link>
                  </Button>
                </div>

                <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
                  <div>
                    <dd className="font-serif text-3xl text-primary">{data.publishedCount}</dd>
                    <dt className="eyebrow mt-1 !text-[0.58rem]">Articles</dt>
                  </div>
                  <div>
                    <dd className="font-serif text-3xl text-primary">{data.featured.length}</dd>
                    <dt className="eyebrow mt-1 !text-[0.58rem]">Editor's picks</dt>
                  </div>
                  <div>
                    <dd className="font-serif text-3xl text-primary">{data.thoughts.length}</dd>
                    <dt className="eyebrow mt-1 !text-[0.58rem]">Member voices</dt>
                  </div>
                </dl>
              </div>

              <div className="relative mx-auto min-w-0 w-full lg:max-w-none">
                <div className="rounded-2xl bg-gold/15 p-2 shadow-lift ring-1 ring-gold/25">
                  <img
                    src={heroImage}
                    alt="A young woman seated in quiet reflection on the steps of an ancient temple at sunrise"
                    width={1600}
                    height={1104}
                    className="aspect-[4/3] w-full rounded-xl object-cover lg:aspect-[4/5]"
                  />
                </div>

                <div className="absolute -bottom-5 left-4 hidden max-w-[11rem] rounded-xl border border-border bg-card/95 px-5 py-4 shadow-lift backdrop-blur sm:block">
                  <p className="font-serif text-2xl text-primary">{data.publishedCount}</p>
                  <p className="eyebrow mt-1 !text-[0.55rem]">Articles published</p>
                </div>

                <blockquote className="absolute -right-2 top-5 hidden max-w-[10rem] rounded-xl border border-gold/30 bg-primary-deep/95 px-4 py-3 text-primary-foreground shadow-lift backdrop-blur xl:block">
                  <p className="font-serif text-base leading-snug">“Many voices, one community.”</p>
                  <footer className="mt-1.5 text-[0.6rem] uppercase tracking-[0.14em] text-gold">
                    YWBA
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-2 !text-primary">
            <span className="h-px w-6 bg-gold" aria-hidden />
            Who we are
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
            A living tradition, gathered in one place.
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            For generations, YWBA has brought young women together to learn the Dhamma, serve their
            communities and grow into confident leaders. This platform carries that tradition
            forward — a home for our members' knowledge, creativity and voices.
          </p>
          <Link
            to="/about"
            className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            About the Association
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <blockquote className="mt-10 border-l-2 border-gold pl-5 font-serif text-xl italic leading-relaxed text-foreground/80">
            “Wisdom grows where women are heard, and community grows where wisdom is shared.”
          </blockquote>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7 lg:content-center">
          {PILLARS.map((pillar, index) => (
            <div
              key={pillar.title}
              className="rounded-xl border border-border bg-card p-6 shadow-card lift"
            >
              <span className="font-serif text-sm text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-2xl">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="border-y border-border bg-card/50">
        <div className="container-page py-20 md:py-24">
          <SectionHeading
            eyebrow="Featured"
            title="From the editors"
            action={
              <Link
                to="/articles"
                className="hidden items-center gap-2 text-sm font-semibold text-primary sm:inline-flex"
              >
                All articles <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />

          {lead ? (
            <div className="mt-10 grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <ArticleCard article={lead} variant="feature" />
              </div>
              <div className="divide-y divide-border rounded-xl border border-border bg-card px-6 shadow-card lg:col-span-4">
                {restFeatured.length > 0 ? (
                  restFeatured.map((a) => <ArticleCard key={a.id} article={a} variant="row" />)
                ) : (
                  <p className="py-8 text-sm text-muted-foreground">
                    More featured writing coming soon.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <EmptyState title="No featured articles yet" className="mt-10">
              Featured writing chosen by the editorial team will appear here.
            </EmptyState>
          )}
        </div>
      </section>

      {/* Latest */}
      <section className="container-page py-20 md:py-24">
        <SectionHeading
          eyebrow="Latest"
          title="Recently published"
          action={
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Browse the journal <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        {latest.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {latest.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        ) : (
          <EmptyState title="Nothing published yet" className="mt-10" />
        )}
      </section>

      {/* Voices */}
      <section className="relative overflow-hidden mesh-primary text-primary-foreground">
        <div
          className="pointer-events-none absolute -left-32 -top-32 size-[26rem] rounded-full border border-gold/15"
          aria-hidden
        />
        <div className="container-page relative py-20 md:py-24">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="eyebrow !text-gold">Community contributions</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">Voices of YWBA</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-primary-foreground/75">
                Short reflections, experiences and ideas shared by our members — on the Dhamma,
                education, leadership, culture and the lives of young women today.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
              <Button asChild variant="lightOutline">
                <Link to="/voices">Read all voices</Link>
              </Button>
              <Button asChild variant="light">
                <Link to="/dashboard/voices/new">
                  Share your voice <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {data.thoughts.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {data.thoughts.map((thought) => (
                <ThoughtCard key={thought.id} thought={thought} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-6 py-14 text-center">
              <Sparkles className="mx-auto size-6 text-gold" />
              <h3 className="mt-4 font-serif text-2xl">Be the first voice</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-primary-foreground/70">
                Members' reflections will appear here once reviewed by the editorial team.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Announcements */}
      <section className="container-page grid gap-10 py-20 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow flex items-center gap-2 !text-primary">
            <span className="h-px w-6 bg-gold" aria-hidden />
            Notices
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight">Announcements</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            News, programmes and calls for contributions from the Association.
          </p>
        </div>
        <div className="lg:col-span-8">
          {data.announcements.length > 0 ? (
            <ul className="border-t border-border">
              {data.announcements.map((a) => (
                <li
                  key={a.id}
                  className="group grid gap-2 border-b border-border py-7 transition-colors hover:bg-card/60 sm:grid-cols-[8.5rem_1fr] sm:gap-8"
                >
                  <time
                    dateTime={a.created_at}
                    className="flex items-start gap-2 pt-1 text-sm text-muted-foreground"
                  >
                    {a.is_pinned ? (
                      <Pin className="mt-0.5 h-3.5 w-3.5 text-gold" aria-label="Pinned" />
                    ) : null}
                    {formatDate(a.created_at, "d MMM yyyy")}
                  </time>
                  <div>
                    <h3 className="font-serif text-2xl leading-snug">{a.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{a.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-8 text-muted-foreground">
              <Megaphone className="h-5 w-5 text-gold" /> No announcements right now.
            </div>
          )}
        </div>
      </section>

      {/* Membership CTA */}
      <section className="container-page pb-4">
        <div className="relative overflow-hidden rounded-2xl mesh-primary px-8 py-16 text-primary-foreground shadow-lift md:px-16 md:py-20">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-gold/25"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full border border-gold/15"
            aria-hidden
          />
          <div className="relative grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow !text-gold">Membership</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
                Your voice has a place here.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
                Join YWBA to receive your membership ID, share your reflections, submit articles for
                publication and stay close to the Association's programmes.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="light">
                  <Link to="/auth" search={{ mode: "register" }}>
                    Register as a member <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="lightOutline">
                  <Link to="/about">Learn about YWBA</Link>
                </Button>
              </div>
            </div>
            <ul className="space-y-4 border-t border-primary-foreground/15 pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              {BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="flex gap-3 text-sm leading-relaxed text-primary-foreground/80"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
