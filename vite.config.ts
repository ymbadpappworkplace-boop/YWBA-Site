
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readFileSync, existsSync } from "node:fs";
import { parseEnv } from "node:util";
import { loadEnv } from "vite";

// The exported project ships `env` without a dot. Load its server settings
// locally, while letting shell variables and standard .env files override it.
const bundledEnv = new URL("./env", import.meta.url);
const defaults = existsSync(bundledEnv) ? parseEnv(readFileSync(bundledEnv, "utf8")) : {};
const localEnv = loadEnv(process.env["NODE_ENV"] ?? "development", process.cwd(), "");
for (const [key, value] of Object.entries({ ...defaults, ...localEnv })) {
  if (key.startsWith("SUPABASE_") || key.startsWith("VITE_SUPABASE_")) {
    process.env[key] ??= value;
  }
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
