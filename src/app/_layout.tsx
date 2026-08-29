/**
 * Root layout: providers, and the error boundary of last resort.
 *
 * AppState/auto-refresh wiring lives in lib/supabase.ts, next to the client
 * it concerns.
 */
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import { createQueryClient } from "@/lib/query-client";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  // Created in state, not at module scope: a module-scope client is shared
  // across requests when the web build renders on the server, leaking one
  // user's cache into another's response.
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
