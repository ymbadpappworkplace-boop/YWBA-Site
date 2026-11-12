import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LotusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("text-gold", className)} fill="none">
      <path
        d="M20 8c3.2 4 4.8 8 4.8 12S23.2 28 20 31c-3.2-3-4.8-7-4.8-11S16.8 12 20 8Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M20 31c-4-.6-8.4-3-10.6-7.6 3.4-1 7 .2 9.6 2.6M20 31c4-.6 8.4-3 10.6-7.6-3.4-1-7 .2-9.6 2.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M20 31c-5.4.2-10.6-1.8-14-6.4M20 31c5.4.2 10.6-1.8 14-6.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M11 34h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="YWBA home">
      <LotusMark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[1.35rem] font-medium tracking-[0.08em]",
            tone === "dark" ? "text-primary" : "text-primary-foreground",
          )}
        >
          YWBA
        </span>
        <span
          className={cn(
            "mt-1 hidden text-[0.62rem] font-medium uppercase tracking-[0.18em] sm:block",
            tone === "dark" ? "text-muted-foreground" : "text-primary-foreground/70",
          )}
        >
          Young Women's Buddhist Association
        </span>
      </span>
    </Link>
  );
}
