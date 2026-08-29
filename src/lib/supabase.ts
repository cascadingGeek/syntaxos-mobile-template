/**
 * The client-side Supabase instance.
 *
 * RLS is the authorization boundary: this client carries the ANON key plus
 * the signed-in user's JWT, so every query is evaluated against the policies
 * in supabase/migrations. The service-role key must never appear here — it
 * bypasses RLS and would ship inside the .apk.
 *
 * Per the structure contract, application code does not import this directly:
 * `data/` is the only client layer that speaks to Supabase (invariant 1).
 */
import { createClient } from "@supabase/supabase-js";
import { AppState, Platform } from "react-native";

import { config } from "@/core/config";
import { sessionStorage } from "@/lib/session-storage";
import type { Database } from "@/types/database";

export const supabase = createClient<Database>(
  config.supabaseUrl,
  config.supabaseAnonKey,
  {
    auth: {
      storage: sessionStorage,
      autoRefreshToken: true,
      persistSession: true,
      // Native apps receive the OAuth callback through a deep link, not a URL
      // in an address bar. Leaving this on makes supabase-js hunt for a
      // fragment that will never be there.
      detectSessionInUrl: false,
    },
  },
);

/**
 * Supabase refreshes tokens on a timer and a backgrounded app has no timers.
 * Tie the refresh loop to foreground/background so a user returning after
 * hours has a valid session instead of a silent 401.
 */
if (Platform.OS !== "web") {
  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      void supabase.auth.startAutoRefresh();
    } else {
      void supabase.auth.stopAutoRefresh();
    }
  });
}
