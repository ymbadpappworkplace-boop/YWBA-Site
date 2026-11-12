// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// Never set ssr.external or resolve.external: the Worker has no runtime module resolution, so
// the build fails. Never add compression (compressPublicAssets, vite-plugin-compression):
// hosting already compresses at the edge.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readFileSync, existsSync } from "node:fs";
import { parseEnv } from "node:util";
import { loadEnv } from "vite";

// The exported project ships `env` without a dot. Load its server settings
// locally, while letting shell variables and standard .env files override it.
const bundledEnv = new URL("./env", import.meta.url);
const defaults = existsSync(bundledEnv) ? parseEnv(readFileSync(bundledEnv, "utf8")) : {};
const localEnv = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");
for (const [key, value] of Object.entries({ ...defaults, ...localEnv })) {
  if (key.startsWith("SUPABASE_") || key.startsWith("VITE_SUPABASE_")) {
    process.env[key] ??= value;
  }
}

export default defineConfig({
  tanstackStart: {
    vite: {
    define: { "import.meta.env.VITE_YWBA_CLIENT_RENDER": JSON.stringify(process.env.VERCEL === "1") },
  },
    server: { entry: "server" },
  },
});
