/**
 * Friendly aliases over the generated types. Screens import these, not the
 * nested Database["public"]["Tables"][...] paths, so a schema regeneration
 * doesn't ripple through the UI.
 */
import type { Database } from "@/types/database";

export type Note = Database["public"]["Tables"]["notes"]["Row"];
export type NoteInsert = Database["public"]["Tables"]["notes"]["Insert"];
export type NoteUpdate = Database["public"]["Tables"]["notes"]["Update"];
