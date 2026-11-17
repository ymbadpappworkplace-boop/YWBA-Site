import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUp,
  ArrowUpRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

import { Logo } from "./logo";
import { contactQuery } from "@/lib/queries";

export function SiteFooter() {
  // Contact details arrive from an async query; render them only after mount so
  // the server and the hydration pass produce identical markup.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { data } = useQuery(contactQuery());
  const contact = mounted ? data : undefined;
  const socials = [
    { href: contact?.facebook, label: "Facebook", Icon: Facebook },
    { href: contact?.instagram, label: "Instagram", Icon: Instagram },
    { href: contact?.youtube, label: "YouTube", Icon: Youtube },
  ].filter((s) => !!s.href);

  return (
    <footer className="relative mt-24 overflow-hidden mesh-primary text-primary-foreground">
      <div className="hairline-gold absolute inset-x-0 top-0" aria-hidden />
      <div
        className="pointer-events-none absolute -right-32 -top-40 size-[28rem] rounded-full border border-gold/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 size-[24rem] rounded-full border border-primary-foreground/5"
        aria-hidden
      />

      <div className="container-page relative grid gap-12 py-16 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm font-serif text-xl leading-relaxed text-primary-foreground/80">
            A shared home for young women walking the path of wisdom, compassion and service.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/auth"
              search={{ mode: "register" }}
              className="group inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:border-gold hover:bg-gold/20"
            >
              Become a member
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/75 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="eyebrow !text-gold">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/75">
            <li>
              <Link to="/articles" className="transition-colors hover:text-primary-foreground">
                Articles
              </Link>
            </li>
            <li>
              <Link to="/voices" className="transition-colors hover:text-primary-foreground">
                Voices of YWBA
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-primary-foreground">
                About YWBA
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="eyebrow !text-gold">Members</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/75">
            <li>
              <Link
                to="/auth"
                search={{ mode: "register" }}
                className="transition-colors hover:text-primary-foreground"
              >
                Become a member
              </Link>
            </li>
            <li>
              <Link
                to="/auth"
                search={{ mode: "signin" }}
                className="transition-colors hover:text-primary-foreground"
              >
                Sign in
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="transition-colors hover:text-primary-foreground">
                Member dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="eyebrow !text-gold">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            {contact?.address ? (
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {contact.address}
              </li>
            ) : null}
            {contact?.email ? (
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-primary-foreground"
                >
                  {contact.email}
                </a>
              </li>
            ) : null}
            {contact?.phone ? (
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-primary-foreground"
                >
                  {contact.phone}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-primary-foreground/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-primary-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Young Women's Buddhist Association. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <p className="font-serif text-sm italic text-primary-foreground/70">
              “Sabbe sattā bhavantu sukhitattā”
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 px-3 py-1.5 font-medium transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowUp className="size-3.5" /> Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
