/**
 * The ONLY client-side layer that speaks to Supabase (invariant 1).
 *
 * Everything above this — hooks, features, screens, stores — goes through
 * these functions. That is what makes the RLS boundary auditable: if a query
 * exists, it is in this directory.
 *
 * PostgREST errors are mapped to AppError here so callers never branch on
 * Postgres error codes.
 */
import type { PostgrestError } from "@supabase/supabase-js";

import { AppError } from "@/core/app-error";
import { supabase } from "@/lib/supabase";
import type { Note } from "@/types/note";

function toAppError(error: PostgrestError): AppError {
  // PGRST301 = JWT expired / missing; 42501 = RLS denied the row.
  if (error.code === "PGRST301") {
    return new AppError("unauthorized", "Your session has expired.", error);
  }
  if (error.code === "42501") {
    return new AppError("forbidden", "You cannot access this.", error);
  }
  if (error.code === "23505") {
    return new AppError("conflict", "That already exists.", error);
  }
  return new AppError("unknown", error.message, error);
}

export async function listNotes(): Promise<Note[]> {
  // No user_id filter on purpose: RLS applies it server-side. A client-side
  // filter is a suggestion; a policy is a guarantee.
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw toAppError(error);
  return data ?? [];
}

export async function getNote(id: string): Promise<Note | null> {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw toAppError(error);
  return data;
}

export async function deleteNote(id: string): Promise<void> {
  const { error } = await supabase.from("notes").delete().eq("id", id);
  if (error) throw toAppError(error);
}
