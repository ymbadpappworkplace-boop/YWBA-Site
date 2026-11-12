import { cn } from "@/lib/utils";
import { MEMBERSHIP_LABELS, STATUS_LABELS, type ContentStatus, type MembershipStatus } from "@/lib/constants";

const STATUS_STYLES: Record<ContentStatus, string> = {
  draft: "bg-muted text-muted-foreground border-border",
  pending_review: "bg-warning-soft text-warning border-warning/25",
  revision_requested: "bg-info-soft text-info border-info/25",
  approved: "bg-success-soft text-success border-success/25",
  published: "bg-primary text-primary-foreground border-primary",
  rejected: "bg-destructive/10 text-destructive border-destructive/25",
};

const base =
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[0.72rem] font-semibold tracking-wide";

export function StatusBadge({ status, className }: { status: ContentStatus; className?: string }) {
  return (
    <span className={cn(base, STATUS_STYLES[status], className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" aria-hidden />
      {STATUS_LABELS[status]}
    </span>
  );
}

const MEMBERSHIP_STYLES: Record<MembershipStatus, string> = {
  pending: "bg-warning-soft text-warning border-warning/25",
  active: "bg-success-soft text-success border-success/25",
  suspended: "bg-destructive/10 text-destructive border-destructive/25",
};

export function MembershipBadge({ status, className }: { status: MembershipStatus; className?: string }) {
  return <span className={cn(base, MEMBERSHIP_STYLES[status], className)}>{MEMBERSHIP_LABELS[status]}</span>;
}
