/**
 * TanStack Query owns SERVER state (anything from Supabase or an API route).
 * Zustand owns CLIENT state. Keeping that line sharp is what stops generated
 * apps from hand-rolling loading flags in useState.
 */
import { QueryClient } from "@tanstack/react-query";

import { isAppError } from "@/core/app-error";

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        // Retrying an authorization failure just burns battery and rate
        // limit — only transient failures are worth a second attempt.
        retry: (failureCount, error) => {
          if (isAppError(error) && !error.isTransient) return false;
          return failureCount < 2;
        },
      },
      mutations: {
        retry: false,
      },
    },
  });
}
