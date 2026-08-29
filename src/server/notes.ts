/**
 * Server-side notes logic. The +api.ts route stays thin (invariant 3):
 * it validates and delegates here.
 */
import { AppError } from "@/core/app-error";
import type { CreateNoteInput } from "@/schemas/note";
import { createAdminClient } from "@/server/supabase-admin";
import type { Note } from "@/types/note";

/**
 * Identity comes from the caller's JWT, never from the request body —
 * trusting a user_id in the payload would let anyone write anyone's rows.
 */
export async function resolveUserId(accessToken: string): Promise<string> {
  const admin = createAdminClient();
  const { data, error } = await admin.auth.getUser(accessToken);

  if (error || !data.user) {
    throw new AppError("unauthorized", "Invalid token.", error);
  }
  return data.user.id;
}

export async function createNote(
  userId: string,
  input: CreateNoteInput,
): Promise<Note> {
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("notes")
    .insert({ user_id: userId, title: input.title, body: input.body })
    .select()
    .single();

  if (error) {
    throw new AppError("unknown", error.message, error);
  }
  return data;
}
