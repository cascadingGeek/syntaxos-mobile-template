/**
 * Mutation hook. This write goes through the +api.ts edge rather than
 * straight to Supabase, because the route performs a privileged insert —
 * the client only ever holds its own JWT.
 *
 * Reads are query hooks, writes are mutation hooks (invariant 10).
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getAccessToken } from "@/data/auth";
import { apiFetch } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { CreateNoteInput } from "@/schemas/note";
import type { Note } from "@/types/note";

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateNoteInput): Promise<Note> => {
      const accessToken = await getAccessToken();
      const { note } = await apiFetch<{ note: Note }>("/api/notes", {
        method: "POST",
        accessToken,
        body: JSON.stringify(input),
      });
      return note;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.notes.all });
    },
  });
}
