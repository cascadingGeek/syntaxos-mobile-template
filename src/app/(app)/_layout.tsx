/**
 * Signed-in group. No session → out to the auth group. The guard lives in the
 * layout so every screen underneath inherits it and no individual screen has
 * to remember.
 */
import { Redirect, Stack } from "expo-router";

import { LoadingState } from "@/components/loading-state";
import { useSession } from "@/hooks/use-session";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <LoadingState />;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
