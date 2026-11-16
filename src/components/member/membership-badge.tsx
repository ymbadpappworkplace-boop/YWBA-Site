import type { Database } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";

type MembershipStatus = Database["public"]["Tables"]["profiles"]["Row"]["membership_status"];

const LABELS: Record<MembershipStatus, string> = {
  pending: "Pending review",
  active: "Active member",
  suspended: "Suspended",
};

const STYLES: Record<MembershipStatus, string> = {
  pending: "border-gold/60 bg-gold-soft/50 text-primary",
  active: "border-emerald-600/30 bg-emerald-50 text-emerald-800",
  suspended: "border-destructive/40 bg-destructive/10 text-destructive",
};

export function MembershipBadge({
  status,
  className,
}: {
  status: MembershipStatus | null | undefined;
  className?: string;
}) {
  if (!status) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        STYLES[status],
        className,
      )}
    >
      {LABELS[status]}
    </span>
  );
}
