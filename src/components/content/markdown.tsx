import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

/** Renders member-written Markdown safely (raw HTML is not allowed). */
export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn("prose-ywba", className)}>
      <ReactMarkdown
        components={{
          a: ({ href, children: c }) => (
            <a href={href} target="_blank" rel="noopener noreferrer nofollow">
              {c}
            </a>
          ),
          img: () => null,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
