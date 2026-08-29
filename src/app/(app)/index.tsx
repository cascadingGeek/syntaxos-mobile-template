/**
 * The stack-conformance screen: exercises every convention the Mobile Builder
 * must follow, so drift is visible on sight.
 *
 *   server state → TanStack Query via hooks/ (never useEffect + useState)
 *   data access  → data/ (never Supabase in a screen)
 *   lists        → FlashList (never FlatList for unbounded data)
 *   icons        → lucide-react-native
 *   styling      → NativeWind classes + the baked components/ui primitives
 */
import { FlashList } from "@shopify/flash-list";
import { NotebookPen } from "lucide-react-native";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EmptyState } from "@/components/empty-state";
import { Text } from "@/components/ui/text";
import { NoteRow } from "@/features/notes/components/note-row";
import { useNotes } from "@/hooks/use-notes";

export default function NotesScreen() {
  const { data, isPending, error } = useNotes();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {isPending ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text variant="destructive" className="text-center">
            {error.message}
          </Text>
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
