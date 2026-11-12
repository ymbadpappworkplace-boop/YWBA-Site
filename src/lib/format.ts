import { format, formatDistanceToNow } from "date-fns";

export function formatDate(value: string | null | undefined, pattern = "d MMMM yyyy") {
  if (!value) return "";
  try {
    return format(new Date(value), pattern);
  } catch {
    return "";
  }
}

export function timeAgo(value: string | null | undefined) {
  if (!value) return "";
  try {
    return formatDistanceToNow(new Date(value), { addSuffix: true });
  } catch {
    return "";
  }
}

export function initials(name: string | null | undefined) {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "Y";
  return parts
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

export function readingTime(text: string | null | undefined) {
  const words = (text ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Removes characters that would break a PostgREST `or()` filter. */
export function sanitizeSearch(q: string) {
  return q.replace(/[%,()*:\\]/g, " ").trim().slice(0, 80);
}
