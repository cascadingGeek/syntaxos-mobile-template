/**
 * Small utility hook: the current auth session. Route groups use it to decide
 * whether a user belongs in (app) or (auth). Reads through `data/auth`, never
 * the Supabase client itself.
 */
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { getSession, onAuthStateChange } from "@/data/auth";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void getSession()
      .then(setSession)
      .finally(() => setIsLoading(false));

    return onAuthStateChange(setSession);
  }, []);

  return { session, isLoading };
}
