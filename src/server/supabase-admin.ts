/**
 * The privileged Supabase client. Server-only: this key bypasses RLS.
 *
 * Built PER REQUEST, never at module scope. EAS Hosting runs Cloudflare
 * Workers (V8 isolates) which are recycled and shared, so a module-scope
 * client is state that either vanishes or leaks across users.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { serverEnv } from "@/server/env";
import type { Database } from "@/types/database";

export function createAdminClient(): SupabaseClient<Database> {
  const { supabaseUrl, supabaseServiceRoleKey } = serverEnv();

  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
