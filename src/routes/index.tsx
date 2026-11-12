import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Megaphone, Pin } from "lucide-react";
import heroImage from "@/assets/hero-temple.jpg";
import { homeQuery } from "@/lib/queries";
import { ArticleCard } from "@/components/content/article-card";
import { ThoughtCard } from "@/components/content/thought-card";
import { EmptyState, SectionHeading } from "@/components/content/common";
import { Button } from "@/components/ui/button";
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
        content: "One community. Many voices. Articles, reflections and membership for young Buddhist women.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(homeQuery()),
  component: HomePage,
});

const PILLARS = [
  { title: "Wisdom", text: "Study and practise the Dhamma together, and bring its insight into everyday life." },
  { title: "Unity", text: "Connect with young women across every district in one welcoming community." },
  { title: "Voice", text: "Write, reflect and publish — your experiences are part of our shared story." },
];

function HomePage() {
  const { data } = useSuspenseQuery(homeQuery());
  const [lead, ...restFeatured] = data.featured;
  const latest = data.latest.filter((a) => a.id !== lead?.id).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container-page grid items-center gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
          <div className="lg:col-span-6">
            <p className="eyebrow !text-primary">Young Women's Buddhist Association</p>
            <h1 className="mt-6 font-serif text-[2.75rem] leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-[4.4rem]">
              {data.hero.title}
            </h1>
            <div className="rule-gold mt-8 w-16" />
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">{data.hero.body}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/auth" search={{ mode: "register" }}>
                  Become a member
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/articles">Read the articles</Link>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative">
              <img
                src={heroImage}
                alt="A young woman seated in quiet reflection on the steps of an ancient temple at sunrise"
                width={1600}
                height={1104}
                className="aspect-[4/3] w-full object-cover lg:aspect-[5/6]"
              />
              <div className="absolute -bottom-6 left-6 hidden bg-background px-6 py-5 shadow-soft md:block">
                <p className="font-serif text-3xl text-primary">{data.publishedCount}</p>
                <p className="eyebrow mt-1 !text-[0.62rem]">Articles published</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">Who we are</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight">A living tradition, gathered in one place.</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            For generations, YWBA has brought young women together to learn the Dhamma, serve their communities and grow
            into confident leaders. This platform carries that tradition forward — a home for our members' knowledge,
            creativity and voices.
          </p>
          <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
            About the Association <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7 lg:pl-8">
          {PILLARS.map((p, i) => (
            <div key={p.title} className="border-t border-foreground/80 pt-5">
              <span className="font-serif text-sm text-gold">0{i + 1}</span>
              <h3 className="mt-2 font-serif text-2xl">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container-page pb-20">
        <SectionHeading
          eyebrow="Featured"
          title="From the editors"
          action={
            <Link to="/articles" className="hidden items-center gap-2 text-sm font-semibold text-primary sm:inline-flex">
              All articles <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        {lead ? (
          <div className="mt-10 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <ArticleCard article={lead} variant="feature" />
            </div>
            <div className="divide-y divide-border lg:col-span-4 lg:border-l lg:border-border lg:pl-10">
              {restFeatured.length > 0 ? (
                restFeatured.map((a) => <ArticleCard key={a.id} article={a} variant="row" />)
              ) : (
                <p className="py-5 text-sm text-muted-foreground">More featured writing coming soon.</p>
              )}
            </div>
          </div>
        ) : (
          <EmptyState title="No featured articles yet" className="mt-10">
            Featured writing chosen by the editorial team will appear here.
          </EmptyState>
        )}
      </section>

      {/* Latest */}
      <section className="container-page pb-24">
        <SectionHeading eyebrow="Latest" title="Recently published" />
        {latest.length > 0 ? (
          <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {latest.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        ) : (
          <EmptyState title="Nothing published yet" className="mt-10" />
        )}
      </section>

      {/* Voices */}
      <section className="bg-secondary">
        <div className="container-page py-20 md:py-24">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="eyebrow">Community contributions</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">Voices of YWBA</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                Short reflections, experiences and ideas shared by our members — on the Dhamma, education, leadership,
                culture and the lives of young women today.
              </p>
            </div>
            <div className="flex gap-3 md:col-span-5 md:justify-end">
              <Button asChild variant="outline">
                <Link to="/voices">Read all voices</Link>
              </Button>
              <Button asChild>
                <Link to="/dashboard/voices/new">Share your voice</Link>
              </Button>
            </div>
          </div>
          {data.thoughts.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {data.thoughts.map((t) => (
                <ThoughtCard key={t.id} thought={t} />
              ))}
            </div>
          ) : (
            <EmptyState title="Be the first voice" className="mt-12">
              Members' reflections will appear here once reviewed.
            </EmptyState>
          )}
        </div>
      </section>

      {/* Announcements */}
      <section className="container-page grid gap-10 py-20 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">Notices</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight">Announcements</h2>
          <p className="mt-4 text-muted-foreground">News, programmes and calls for contributions from the Association.</p>
        </div>
        <div className="lg:col-span-8">
          {data.announcements.length > 0 ? (
            <ul className="divide-y divide-border border-y border-border">
              {data.announcements.map((a) => (
                <li key={a.id} className="grid gap-2 py-7 sm:grid-cols-[9rem_1fr] sm:gap-8">
                  <time dateTime={a.created_at} className="flex items-start gap-2 text-sm text-muted-foreground">
                    {a.is_pinned ? <Pin className="mt-0.5 h-3.5 w-3.5 text-gold" aria-label="Pinned" /> : null}
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
            <div className="flex items-center gap-3 border-y border-border py-8 text-muted-foreground">
              <Megaphone className="h-5 w-5" /> No announcements right now.
            </div>
          )}
        </div>
      </section>

      {/* Membership CTA */}
      <section className="container-page">
        <div className="relative overflow-hidden bg-primary px-8 py-16 text-primary-foreground md:px-16 md:py-20">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-gold/30" aria-hidden />
          <div className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full border border-gold/20" aria-hidden />
          <div className="relative max-w-2xl">
            <p className="eyebrow !text-gold">Membership</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Your voice has a place here.</h2>
            <p className="mt-5 text-lg leading-relaxed text-primary-foreground/80">
              Join YWBA to receive your membership ID, share your reflections, submit articles for publication and stay
              close to the Association's programmes.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="light">
                <Link to="/auth" search={{ mode: "register" }}>
                  Register as a member
                </Link>
              </Button>
              <Button asChild size="lg" variant="lightOutline">
                <Link to="/about">Learn about YWBA</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
