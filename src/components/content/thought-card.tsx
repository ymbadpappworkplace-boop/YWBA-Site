import type { ThoughtData } from "@/lib/public.functions";
import { formatDate, initials } from "@/lib/format";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ThoughtCard({ thought, clamp = true }: { thought: ThoughtData; clamp?: boolean }) {
  return (
    <article className="flex h-full flex-col border-t-2 border-gold bg-card px-6 pb-6 pt-5">
      <p className="eyebrow !text-[0.65rem]">{thought.category}</p>
      <h3 className="mt-3 font-serif text-[1.45rem] leading-snug">{thought.title}</h3>
      <p
        className={
          clamp
            ? "mt-3 line-clamp-5 whitespace-pre-line font-serif text-[1.05rem] leading-relaxed text-foreground/80"
            : "mt-3 whitespace-pre-line font-serif text-[1.05rem] leading-relaxed text-foreground/80"
        }
      >
        {thought.content}
      </p>
      <div className="mt-auto flex items-center gap-3 pt-6">
        <Avatar className="h-8 w-8">
          {thought.author_avatar_url ? <AvatarImage src={thought.author_avatar_url} alt="" /> : null}
          <AvatarFallback className="bg-gold-soft font-serif text-xs text-primary">
            {initials(thought.author_name)}
          </AvatarFallback>
        </Avatar>
        <div className="text-xs">
          <div className="font-medium">{thought.author_name}</div>
          <div className="text-muted-foreground">{formatDate(thought.published_at, "d MMM yyyy")}</div>
        </div>
      </div>
    </article>
  );
}
