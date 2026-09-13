/**
 * The stack-conformance screen: exercises every convention the Mobile Builder
 * must follow, so drift is visible on sight.
 *
 *   server state → TanStack Query via hooks/ (never useEffect + useState)
 *   data access  → data/ (never Supabase in a screen)
 *   lists        → FlashList (never FlatList for unbounded data)
 *   icons        → lucide-react-native
 *   styling      → NativeWind classes + the baked components/ui primitives
 *   colour       → design tokens only (bg-primary, text-muted-foreground…);
 *                  never a hex/rgb literal, icons included (<Icon className>)
 *   states       → LoadingState / ErrorState / EmptyState, never ad-hoc
 */
import { FlashList } from "@shopify/flash-list";
import { NotebookPen } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { NoteRow } from "@/features/notes/components/note-row";
import { useNotes } from "@/hooks/use-notes";

export default function NotesScreen() {
  const { data, isPending, error, refetch } = useNotes();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {isPending ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} onRetry={() => void refetch()} />
      ) : data.length === 0 ? (
        <EmptyState
          icon={NotebookPen}
          title="No notes yet"
          description="Notes you write will show up here."
        />
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
