/**
 * The stack-conformance screen: exercises every convention the Mobile Builder
 * must follow, so drift is visible on sight.
 *
 *   server state → TanStack Query via hooks/ (never useEffect + useState)
 *   data access  → data/ (never Supabase in a screen)
 *   lists        → FlashList (never FlatList for unbounded data)
 *   icons        → lucide-react-native
 */
import { FlashList } from "@shopify/flash-list";
import { NotebookPen } from "lucide-react-native";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EmptyState } from "@/components/empty-state";
import { tokens } from "@/core/theme";
import { NoteRow } from "@/features/notes/components/note-row";
import { useNotes } from "@/hooks/use-notes";

export default function NotesScreen() {
  const { data, isPending, error } = useNotes();

  return (
    <SafeAreaView style={styles.screen}>
      {isPending ? (
        <View style={styles.centered}>
          <ActivityIndicator />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.error}>{error.message}</Text>
        </View>
      ) : data.length === 0 ? (
        <EmptyState icon={NotebookPen} title="No notes yet" />
      ) : (
        <FlashList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NoteRow note={item} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: tokens.color.background, flex: 1 },
  centered: { alignItems: "center", flex: 1, justifyContent: "center" },
  error: {
    color: tokens.color.danger,
    fontSize: tokens.fontSize.md,
    paddingHorizontal: tokens.space.lg,
    textAlign: "center",
  },
});
