import { createFileRoute } from "@tanstack/react-router";
import { createPublicClient } from "@/lib/supabase-public.server";

// Serves member-uploaded images (avatars, article covers) at stable URLs.
// Only the two image buckets are readable here; storage policies enforce the same rule.
const ALLOWED_BUCKETS = new Set(["avatars", "article-covers"]);

export const Route = createFileRoute("/api/public/media/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const splat = (params as { _splat?: string })._splat ?? "";
        const [bucket, ...rest] = splat.split("/");
        const path = rest.join("/");
        if (!bucket || !ALLOWED_BUCKETS.has(bucket) || !path || path.includes("..")) {
          return new Response("Not found", { status: 404 });
        }
        const sb = createPublicClient();
        const { data, error } = await sb.storage.from(bucket).download(path);
        if (error || !data) return new Response("Not found", { status: 404 });
        return new Response(data, {
          headers: {
            "content-type": data.type || "application/octet-stream",
            "cache-control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
