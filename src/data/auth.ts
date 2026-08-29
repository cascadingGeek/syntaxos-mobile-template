/**
 * Auth access lives in `data/` for the same reason queries do: hooks and
 * screens must not touch the Supabase client directly (invariant 1). This is
 * the only place client-side auth state is read or changed.
 */
import type { Session } from "@supabase/supabase-js";

import { AppError } from "@/core/app-error";
import { supabase } from "@/lib/supabase";

export async function getSession(): Promise<Session | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new AppError("unknown", error.message, error);
  return data.session;
}

/** The bearer token for calls to our own +api.ts edge. */
export async function getAccessToken(): Promise<string> {
  const session = await getSession();
  if (!session?.access_token) {
    throw new AppError("unauthorized", "You must be signed in.");
  }
  return session.access_token;
}

export function onAuthStateChange(
  handler: (session: Session | null) => void,
): () => void {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    handler(session);
  });
  return () => data.subscription.unsubscribe();
}

export async function signInWithPassword(
  email: string,
  password: string,
): Promise<Session> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new AppError("unauthorized", error.message, error);
  }
  return data.session;
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw new AppError("unknown", error.message, error);
}

/** Deep-link recovery/confirmation: exchange link tokens for a session. */
export async function setSessionFromTokens(
  accessToken: string,
  refreshToken: string,
): Promise<Session> {
  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
  if (error || !data.session) {
    throw new AppError("unauthorized", error?.message ?? "Invalid link.", error);
  }
  return data.session;
}

export async function updatePassword(password: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    throw new AppError("validation", error.message, error);
  }
}
