/**
 * Read hook — a React binding over `data/`. No Supabase import here
 * (invariant 1); no business logic either.
 */
import { useQuery } from "@tanstack/react-query";

import { listNotes } from "@/data/notes";
import { queryKeys } from "@/lib/query-keys";

export function useNotes() {
  return useQuery({
    queryKey: queryKeys.notes.all,
    queryFn: listNotes,
  });
}
