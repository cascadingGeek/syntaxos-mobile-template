/**
 * Query keys in one place so invalidation is a lookup, not a guess. A
 * mutation that invalidates `queryKeys.notes.all` cannot typo its way into
 * silently refreshing nothing.
 */
export const queryKeys = {
  notes: {
    all: ["notes"] as const,
    detail: (id: string) => ["notes", id] as const,
  },
} as const;
