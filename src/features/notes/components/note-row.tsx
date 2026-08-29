/**
 * Feature-owned UI. Presentational: it takes a Note and renders it, so the
 * screen owns layout and the feature owns the row.
 */
import { StyleSheet, Text, View } from "react-native";

import { tokens } from "@/core/theme";
import type { Note } from "@/types/note";

export function NoteRow({ note }: { note: Note }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{note.title}</Text>
      {note.body ? (
        <Text numberOfLines={2} style={styles.body}>
          {note.body}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    borderBottomColor: tokens.color.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: tokens.space.xs,
    padding: tokens.space.md,
  },
  title: {
    color: tokens.color.text,
    fontSize: tokens.fontSize.lg,
    fontWeight: "600",
  },
  body: { color: tokens.color.textMuted, fontSize: tokens.fontSize.md },
});
