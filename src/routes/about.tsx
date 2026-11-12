import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { aboutQuery } from "@/lib/queries";
import { Button } from "@/components/ui/button";
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
      { property: "og:description", content: "Our mission, vision, values and the work we do together." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { data } = useSuspenseQuery(aboutQuery());
  const d = data.data;
  const paragraphs = data.body.split(/\n{2,}/).filter(Boolean);

  return (
    <>
      <section className="border-b border-border">
        <div className="container-page grid gap-12 py-14 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow !text-primary">About YWBA</p>
            <h1 className="mt-5 font-serif text-4xl leading-[1.08] md:text-6xl">{data.title}</h1>
            <div className="mt-8 space-y-5 font-serif text-xl leading-relaxed text-foreground/85">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <img src={heroImage} alt="" loading="lazy" width={1600} height={1104} className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
      </section>

      {d.mission || d.vision ? (
        <section className="container-page grid gap-px bg-border py-px md:grid-cols-2">
          {d.mission ? (
            <div className="bg-background py-14 md:pr-12">
              <p className="eyebrow">Our mission</p>
              <p className="mt-4 font-serif text-3xl leading-snug">{d.mission}</p>
            </div>
          ) : null}
          {d.vision ? (
            <div className="bg-background py-14 md:pl-12">
              <p className="eyebrow">Our vision</p>
              <p className="mt-4 font-serif text-3xl leading-snug">{d.vision}</p>
            </div>
          ) : null}
        </section>
      ) : null}

      {d.values?.length ? (
        <section className="bg-secondary">
          <div className="container-page py-20">
            <p className="eyebrow">What guides us</p>
            <h2 className="mt-3 font-serif text-4xl">Core values</h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
              {d.values.map((v, i) => (
                <div key={v.title} className="border-t border-foreground/80 pt-5">
                  <span className="font-serif text-sm text-gold">0{i + 1}</span>
                  <h3 className="mt-2 font-serif text-2xl">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="container-page grid gap-16 py-20 lg:grid-cols-2">
        {d.objectives?.length ? (
          <div>
            <p className="eyebrow">What we work toward</p>
            <h2 className="mt-3 font-serif text-4xl">Objectives</h2>
            <ol className="mt-8 divide-y divide-border border-y border-border">
              {d.objectives.map((o, i) => (
                <li key={i} className="flex gap-5 py-5">
                  <span className="font-serif text-lg text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="leading-relaxed">{o}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
        {d.activities?.length ? (
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="mt-3 font-serif text-4xl">Activities</h2>
            <ul className="mt-8 space-y-7">
              {d.activities.map((a) => (
                <li key={a.title}>
                  <h3 className="font-serif text-2xl">{a.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted-foreground">{a.text}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      {d.impact?.length ? (
        <section className="container-page">
          <div className="bg-primary px-8 py-16 text-primary-foreground md:px-16">
            <p className="eyebrow !text-gold">Community impact</p>
            <div className="mt-8 grid gap-10 sm:grid-cols-3">
              {d.impact.map((m) => (
                <div key={m.label}>
                  <p className="font-serif text-6xl">{m.value}</p>
                  <p className="mt-2 text-primary-foreground/75">{m.label}</p>
                </div>
              ))}
            </div>
            <Button asChild variant="light" size="lg" className="mt-12">
              <Link to="/auth" search={{ mode: "register" }}>
                Join the Association
              </Link>
            </Button>
          </div>
        </section>
      ) : null}
    </>
  );
}
