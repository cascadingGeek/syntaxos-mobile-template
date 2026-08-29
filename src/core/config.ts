/**
 * Client-safe configuration. `core/` depends on nothing in the app.
 *
 * ONLY EXPO_PUBLIC_* values may appear here — everything in this module is
 * inlined into the client bundle and readable by anyone who unzips the .apk.
 * Secret-bearing config lives in server/env.ts, which client code cannot
 * import (invariant 2).
 *
 * ── Why this doesn't throw on missing values ──────────────────────────────
 * The generation pipeline type-checks and bundles a project BEFORE Supabase
 * has been provisioned for it. A module-scope throw would turn "not yet
 * configured" into "cannot build". So the build stays green, `isConfigured`
 * reports the truth, and Release Compliance refuses to ship a binary still
 * carrying a placeholder.
 */

const PLACEHOLDER_SUPABASE_URL = "https://placeholder.supabase.co";
const PLACEHOLDER_SUPABASE_ANON_KEY = "placeholder-anon-key";

const rawSupabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const rawSupabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
// Where this app's own +api.ts routes are deployed. One repo, two artifacts:
// the binary the user installs and the server it talks to (doc §1). On web
// the origin is implicit, so an empty string is correct there.
const rawApiUrl = process.env.EXPO_PUBLIC_API_URL;

/** Names exactly what is missing, so a failure is actionable, not a mystery. */
export const missingPublicEnv: string[] = [
  ...(rawSupabaseUrl ? [] : ["EXPO_PUBLIC_SUPABASE_URL"]),
  ...(rawSupabaseAnonKey ? [] : ["EXPO_PUBLIC_SUPABASE_ANON_KEY"]),
];

export const isConfigured = missingPublicEnv.length === 0;

/**
 * True when the bundle is still carrying placeholders. Release Compliance
 * asserts this is false before any store binary is built.
 */
export const isPlaceholderConfig = !isConfigured;

if (!isConfigured && process.env.NODE_ENV !== "production") {
  console.warn(
    `[config] Missing ${missingPublicEnv.join(", ")} — using placeholders. ` +
      "Copy .env.example to .env. Supabase requests will fail until this is fixed.",
  );
}

export const config = {
  supabaseUrl: rawSupabaseUrl ?? PLACEHOLDER_SUPABASE_URL,
  supabaseAnonKey: rawSupabaseAnonKey ?? PLACEHOLDER_SUPABASE_ANON_KEY,
  apiUrl: rawApiUrl ?? "",
} as const;
