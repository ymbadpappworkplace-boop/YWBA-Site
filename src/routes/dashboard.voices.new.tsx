import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, LoaderCircle, PenLine, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { STATUS_HELP, STATUS_LABELS, THOUGHT_CATEGORIES } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/voices/new")({
  head: () => ({
    meta: [
      { title: "Share a reflection — YWBA" },
      { name: "description", content: "Submit a reflection to the YWBA community feed." },
    ],
  }),
  component: NewThoughtPage,
});

const MIN_CONTENT = 40;
const MAX_CONTENT = 4000;

const STATUS_STYLES: Record<string, string> = {
  draft: "border-border bg-muted text-foreground",
  pending_review: "border-gold/60 bg-gold-soft/50 text-primary",
  revision_requested: "border-warning/40 bg-warning-soft text-warning",
  approved: "border-info/30 bg-info-soft text-info",
  published: "border-success/30 bg-success-soft text-success",
  rejected: "border-destructive/40 bg-destructive/10 text-destructive",
};

function NewThoughtPage() {
  const { user, profile } = useAuth();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>(THOUGHT_CATEGORIES[0]);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const mine = useQuery({
    queryKey: ["me", "thoughts", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("thoughts")
        .select("id, title, category, status, created_at")
        .eq("author_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(12);
      if (error) return [];
      return data ?? [];
    },
  });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    if (!title.trim()) {
      toast.error("Please give your reflection a title.");
      return;
    }
    if (content.trim().length < MIN_CONTENT) {
      toast.error(`Please write at least ${MIN_CONTENT} characters.`);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("thoughts").insert({
        author_id: user.id,
        title: title.trim(),
        content: content.trim(),
        category,
        status: "pending_review",
        submitted_at: new Date().toISOString(),
      });
      if (error) throw error;

      toast.success("Submitted — the editorial team will review your reflection.");
      setTitle("");
      setContent("");
      setCategory(THOUGHT_CATEGORIES[0]);
      await mine.refetch();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "We couldn't submit your reflection. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <Link
          to="/voices"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Back to Voices
        </Link>
        <h1 className="mt-4 flex items-center gap-2 font-serif text-3xl sm:text-4xl">
          <PenLine className="size-6 text-primary" />
          Share a reflection
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Write a short reflection for the community. The editorial team reviews every submission
          before it appears on the Voices page.
        </p>
      </header>

      <form
        onSubmit={submit}
        className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-card sm:p-8"
      >
        <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_14rem]">
          <div className="space-y-2">
            <Label htmlFor="thought-title">Title</Label>
            <Input
              id="thought-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="A short, clear title"
              maxLength={120}
              required
              disabled={!profile}
              className="h-12 bg-background shadow-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thought-category">Topic</Label>
            <Select value={category} onValueChange={setCategory} disabled={!profile}>
              <SelectTrigger id="thought-category" className="h-12 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {THOUGHT_CATEGORIES.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="thought-content">Reflection</Label>
          <Textarea
            id="thought-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Share your experience, insight or question…"
            maxLength={MAX_CONTENT}
            required
            disabled={!profile}
            className="min-h-48 bg-background shadow-none"
          />
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>Markdown is not required — plain paragraphs work best.</span>
            <span>
              {content.length}/{MAX_CONTENT}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
          <Button type="submit" disabled={submitting || !profile}>
            {submitting ? <LoaderCircle className="animate-spin" /> : <Send className="size-4" />}
            {submitting ? "Submitting…" : "Submit for review"}
          </Button>
          <p className="text-xs text-muted-foreground">
            You can keep editing while it is a draft or after a revision request.
          </p>
        </div>

        {!profile ? (
          <p className="rounded-md border border-gold/50 bg-gold-soft/35 p-4 text-sm leading-relaxed text-muted-foreground">
            Your membership profile hasn&apos;t been created yet, so submissions are disabled. Ask
            an administrator to run the profile backfill script, then reload this page.
          </p>
        ) : null}
      </form>

      <section aria-labelledby="my-thoughts-heading">
        <h2 id="my-thoughts-heading" className="font-serif text-2xl">
          Your submissions
        </h2>
        {mine.isLoading ? (
          <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
        ) : (mine.data ?? []).length === 0 ? (
          <p className="mt-3 rounded-xl border border-dashed border-border bg-card/60 px-5 py-8 text-sm text-muted-foreground">
            You haven&apos;t submitted a reflection yet.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {(mine.data ?? []).map((thought) => (
              <li
                key={thought.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-5 py-4 shadow-card"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{thought.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {thought.category} · {formatDate(thought.created_at, "d MMM yyyy")}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                    STATUS_STYLES[thought.status] ?? STATUS_STYLES["draft"],
                  )}
                  title={STATUS_HELP[thought.status]}
                >
                  {STATUS_LABELS[thought.status]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
