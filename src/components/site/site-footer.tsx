import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Logo } from "./logo";
import { contactQuery } from "@/lib/queries";

export function SiteFooter() {
  const { data: contact } = useQuery(contactQuery());
  const socials = [
    { href: contact?.facebook, label: "Facebook", Icon: Facebook },
    { href: contact?.instagram, label: "Instagram", Icon: Instagram },
    { href: contact?.youtube, label: "YouTube", Icon: Youtube },
  ].filter((s) => !!s.href);

  return (
    <footer className="mt-24 bg-primary-deep text-primary-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm font-serif text-lg leading-relaxed text-primary-foreground/80">
            A shared home for young women walking the path of wisdom, compassion and service.
          </p>
          {socials.length > 0 ? (
            <div className="mt-6 flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/25 text-primary-foreground/80 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <h2 className="eyebrow !text-gold">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
            <li><Link to="/articles" className="hover:text-primary-foreground">Articles</Link></li>
            <li><Link to="/voices" className="hover:text-primary-foreground">Voices of YWBA</Link></li>
            <li><Link to="/about" className="hover:text-primary-foreground">About YWBA</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="eyebrow !text-gold">Members</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
            <li><Link to="/auth" search={{ mode: "register" }} className="hover:text-primary-foreground">Become a member</Link></li>
            <li><Link to="/auth" search={{ mode: "signin" }} className="hover:text-primary-foreground">Sign in</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary-foreground">Member dashboard</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="eyebrow !text-gold">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            {contact?.address ? (
              <li className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{contact.address}</li>
            ) : null}
            {contact?.email ? (
              <li className="flex gap-2.5"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={`mailto:${contact.email}`} className="hover:text-primary-foreground">{contact.email}</a></li>
            ) : null}
            {contact?.phone ? (
              <li className="flex gap-2.5"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-primary-foreground">{contact.phone}</a></li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Young Women's Buddhist Association. All rights reserved.</p>
          <p className="font-serif italic">“Sabbe sattā bhavantu sukhitattā” — May all beings be happy.</p>
        </div>
      </div>
    </footer>
  );
}
