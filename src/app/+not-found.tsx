/**
 * Any route that does not exist lands here — a mistyped deep link, a stale
 * notification, a screen removed in an update. Without it Expo Router shows
 * its own developer page, which a store reviewer reads as a broken app.
 */
import { Stack, useRouter } from "expo-router";
import { Compass } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EmptyState } from "@/components/empty-state";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack.Screen options={{ headerShown: false }} />
      <EmptyState
        icon={Compass}
        title="This page doesn't exist"
        description="The link may be old, or the page was moved."
        action={{ label: "Go home", onPress: () => router.replace("/") }}
      />
    </SafeAreaView>
  );
}
