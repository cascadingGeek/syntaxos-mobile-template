/**
 * Signed-out group. A session here means the user has no business on a login
 * screen — send them into the app.
 */
import { Redirect, Stack } from "expo-router";

import { useSession } from "@/hooks/use-session";

export default function AuthLayout() {
  const { session, isLoading } = useSession();

  if (!isLoading && session) {
    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
