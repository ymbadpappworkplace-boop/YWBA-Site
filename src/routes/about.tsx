import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight, Compass, Eye, HeartHandshake, Target } from "lucide-react";

import { aboutQuery } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { LotusMark } from "@/components/site/logo";
import heroImage from "@/assets/hero-temple.jpg";

export const Route = createFileRoute("/about")({
  loader: ({ context }) => context.queryClient.ensureQueryData(aboutQuery()),
  head: () => ({
    meta: [
      { title: "About YWBA — Mission, vision and values" },
      {
        name: "description",
        content:
          "Learn about the Young Women's Buddhist Association: our background, mission, vision, core values, objectives, activities and community impact.",
      },
      { property: "og:title", content: "About the Young Women's Buddhist Association" },
      {
        property: "og:description",
        content: "Our mission, vision, values and the work we do together.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const FALLBACK_INTRO = [
  "The Young Women's Buddhist Association brings together young women who seek to live the teachings of the Buddha with wisdom, compassion and purpose.",
  "For generations, the Association has offered a place to learn, to serve and to grow in the company of others walking the same path.",
];

function AboutPage() {
  const { data } = useSuspenseQuery(aboutQuery());
  const d = data.data;
  const paragraphs = data.body.split(/\n{2,}/).filter(Boolean);
  const intro = paragraphs.length > 0 ? paragraphs : FALLBACK_INTRO;

  return (
    <>
      {/* Intro */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute -right-40 -top-48 size-[34rem] rounded-full border border-gold/20"
          aria-hidden
        />
        <div className="container-page relative grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-7">
            <p className="eyebrow flex animate-rise items-center gap-2 !text-primary">
              <span className="h-px w-6 bg-gold" aria-hidden />
              About YWBA
            </p>
            <h1 className="mt-5 animate-rise font-serif text-4xl leading-[1.05] md:text-6xl">
              {data.title}
            </h1>
            <div className="rule-gold mt-8 w-16" />
            <div className="mt-7 space-y-5 font-serif text-xl leading-relaxed text-foreground/85">
              {intro.map((paragraph, index) => (
                <p
                  key={index}
                  className={index === 0 ? "text-[1.35rem] leading-relaxed md:text-[1.45rem]" : ""}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/auth" search={{ mode: "register" }}>
                  Join the Association <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/articles">Read our writing</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative lg:sticky lg:top-6">
              <div className="rounded-2xl bg-gold/15 p-2 shadow-lift ring-1 ring-gold/25">
                <img
                  src={heroImage}
                  alt=""
                  loading="lazy"
                  width={1600}
                  height={1104}
                  className="aspect-[4/5] w-full rounded-xl object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 hidden max-w-[14rem] rounded-xl border border-border bg-card/95 px-5 py-4 shadow-lift backdrop-blur sm:block">
                <p className="flex items-center gap-2 font-serif text-lg text-primary">
                  <LotusMark className="size-5" /> Wisdom · Unity · Voice
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  The three commitments that shape everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      {d.mission || d.vision ? (
        <section className="container-page py-16 md:py-20">
          <div className="grid gap-4 md:grid-cols-2">
            {d.mission ? (
              <div className="relative overflow-hidden rounded-xl border border-border bg-card p-8 shadow-card lift md:p-10">
                <Compass className="size-6 text-gold" />
                <p className="eyebrow mt-5 !text-primary">Our mission</p>
                <p className="mt-3 font-serif text-2xl leading-snug md:text-[1.7rem]">
                  {d.mission}
                </p>
              </div>
            ) : null}
            {d.vision ? (
              <div className="relative overflow-hidden rounded-xl border border-border bg-card p-8 shadow-card lift md:p-10">
                <Eye className="size-6 text-gold" />
                <p className="eyebrow mt-5 !text-primary">Our vision</p>
                <p className="mt-3 font-serif text-2xl leading-snug md:text-[1.7rem]">{d.vision}</p>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Values */}
      {d.values?.length ? (
        <section className="border-y border-border bg-card/50">
          <div className="container-page py-20 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
              <div>
                <p className="eyebrow flex items-center gap-2 !text-primary">
                  <span className="h-px w-6 bg-gold" aria-hidden />
                  What guides us
                </p>
                <h2 className="mt-2 font-serif text-3xl md:text-[2.6rem]">Core values</h2>
              </div>
              <HeartHandshake className="size-6 text-gold" aria-hidden />
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {d.values.map((value, index) => (
                <div
                  key={value.title}
                  className="rounded-xl border border-border bg-card p-5 shadow-card lift"
                >
                  <span className="font-serif text-sm text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-serif text-xl leading-snug">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Objectives & activities */}
      {d.objectives?.length || d.activities?.length ? (
        <section className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          {d.objectives?.length ? (
            <div>
              <p className="eyebrow flex items-center gap-2 !text-primary">
                <span className="h-px w-6 bg-gold" aria-hidden />
                What we work toward
              </p>
              <h2 className="mt-2 font-serif text-3xl md:text-[2.6rem]">Objectives</h2>
              <ol className="mt-8 space-y-3">
                {d.objectives.map((objective, index) => (
                  <li
                    key={index}
                    className="flex gap-4 rounded-xl border border-border bg-card px-5 py-4 shadow-card"
                  >
                    <span className="font-serif text-lg text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed">{objective}</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          {d.activities?.length ? (
            <div>
              <p className="eyebrow flex items-center gap-2 !text-primary">
                <span className="h-px w-6 bg-gold" aria-hidden />
                What we do
              </p>
              <h2 className="mt-2 font-serif text-3xl md:text-[2.6rem]">Activities</h2>
              <ul className="mt-8 space-y-4">
                {d.activities.map((activity) => (
                  <li
                    key={activity.title}
                    className="rounded-xl border border-border bg-card p-5 shadow-card"
                  >
                    <h3 className="flex items-start gap-3 font-serif text-xl">
                      <Target className="mt-1 size-4 shrink-0 text-gold" />
                      {activity.title}
                    </h3>
                    <p className="mt-2 pl-7 text-sm leading-relaxed text-muted-foreground">
                      {activity.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      {/* Impact */}
      {d.impact?.length ? (
        <section className="container-page">
          <div className="relative overflow-hidden rounded-2xl mesh-primary px-8 py-14 text-primary-foreground shadow-lift md:px-14 md:py-16">
            <div
              className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full border border-gold/20"
              aria-hidden
            />
            <p className="eyebrow !text-gold">Community impact</p>
            <div className="relative mt-8 grid gap-10 sm:grid-cols-3">
              {d.impact.map((metric) => (
                <div key={metric.label}>
                  <p className="font-serif text-5xl md:text-6xl">{metric.value}</p>
                  <p className="mt-2 text-sm text-primary-foreground/75">{metric.label}</p>
                </div>
              ))}
            </div>
            <Button asChild variant="light" size="lg" className="relative mt-12">
              <Link to="/auth" search={{ mode: "register" }}>
                Join the Association <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>
      ) : null}
    </>
  );
}
