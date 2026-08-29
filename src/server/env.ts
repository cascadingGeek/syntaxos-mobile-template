/**
 * Server-only environment. This module is importable ONLY from `server/` and
 * `app/**\/+api.ts` (invariant 2) — it names secrets, and anything that
 * imports it drags them toward the client bundle.
 *
 * Unlike core/config.ts, this THROWS. A client bundle has a useful degraded
 * mode without credentials; a server route does not.
 */

export function serverEnv() {
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const missing = [
    ...(supabaseUrl ? [] : ["EXPO_PUBLIC_SUPABASE_URL"]),
    ...(supabaseServiceRoleKey ? [] : ["SUPABASE_SERVICE_ROLE_KEY"]),
  ];

  if (missing.length > 0) {
    throw new Error(
      `Missing server environment: ${missing.join(", ")}. ` +
        "Set these as EAS Hosting environment secrets.",
    );
  }

  return {
    supabaseUrl: supabaseUrl as string,
    supabaseServiceRoleKey: supabaseServiceRoleKey as string,
  };
}
