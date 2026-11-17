import type { ThoughtData } from "@/lib/public.functions";
import { formatDate, initials } from "@/lib/format";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function ThoughtCard({ thought, clamp = true }: { thought: ThoughtData; clamp?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card lift">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-1 right-4 font-serif text-7xl leading-none text-gold/30"
      >
        ”
      </span>
      <p className="eyebrow relative !text-[0.65rem] !text-primary">{thought.category}</p>
      <h3 className="relative mt-3 max-w-[92%] font-serif text-[1.4rem] leading-snug">
        {thought.title}
      </h3>
      <p
        className={cn(
          "relative mt-3 whitespace-pre-line font-serif text-[1.03rem] leading-relaxed text-foreground/80",
          clamp && "line-clamp-5",
        )}
      >
        {thought.content}
      </p>
      <div className="mt-auto flex items-center gap-3 border-t border-border pt-5">
        <Avatar className="h-9 w-9 border border-border">
          {thought.author_avatar_url ? (
            <AvatarImage src={thought.author_avatar_url} alt="" />
          ) : null}
          <AvatarFallback className="bg-gold-soft font-serif text-xs text-primary">
            {initials(thought.author_name)}
          </AvatarFallback>
        </Avatar>
        <div className="text-xs">
          <div className="font-medium">{thought.author_name}</div>
          <div className="text-muted-foreground">
            {formatDate(thought.published_at, "d MMM yyyy")}
          </div>
        </div>
      </div>
    </article>
  );
}
