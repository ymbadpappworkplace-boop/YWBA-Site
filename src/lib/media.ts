import { supabase } from "@/integrations/supabase/client";

export type MediaBucket = "avatars" | "article-covers";

const MAX_BYTES: Record<MediaBucket, number> = {
  avatars: 5 * 1024 * 1024,
  "article-covers": 10 * 1024 * 1024,
};

/** Uploads an image into the member's own folder and returns its public app URL. */
export async function uploadImage(bucket: MediaBucket, userId: string, file: File) {
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file (JPG, PNG or WebP).");
  if (file.size > MAX_BYTES[bucket]) {
    throw new Error(`Image is too large. The limit is ${MAX_BYTES[bucket] / 1024 / 1024} MB.`);
  }
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `${userId}/${name}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    upsert: false,
    cacheControl: "31536000",
  });
  if (error) throw new Error("Upload failed. Please try again.");
  return `/api/public/media/${bucket}/${path}`;
}
