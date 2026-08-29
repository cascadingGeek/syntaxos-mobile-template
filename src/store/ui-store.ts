/**
 * Zustand holds CLIENT/UI state ONLY (invariant 5). Server data lives in the
 * TanStack Query cache and is never mirrored here — two copies of the same
 * rows is how generated apps end up rendering stale data next to fresh data.
 */
import { create } from "zustand";

type UiState = {
  hasCompletedOnboarding: boolean;
  noteComposerOpen: boolean;
  completeOnboarding: () => void;
  openNoteComposer: () => void;
  closeNoteComposer: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  hasCompletedOnboarding: false,
  noteComposerOpen: false,
  completeOnboarding: () => set({ hasCompletedOnboarding: true }),
  openNoteComposer: () => set({ noteComposerOpen: true }),
  closeNoteComposer: () => set({ noteComposerOpen: false }),
}));
