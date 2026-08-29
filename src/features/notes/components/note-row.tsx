/**
 * Feature-owned UI. Presentational: it takes a Note and renders it, so the
 * screen owns layout and the feature owns the row.
 */
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import type { Note } from "@/types/note";

export function NoteRow({ note }: { note: Note }) {
  return (
    <Card className="mx-4 mb-3">
      <Text variant="title">{note.title}</Text>
      {note.body ? (
        <Text variant="muted" numberOfLines={2} className="mt-1">
          {note.body}
        </Text>
      ) : null}
    </Card>
  );
}
