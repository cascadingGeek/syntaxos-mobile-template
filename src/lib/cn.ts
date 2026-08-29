/**
 * Class-name composition for NativeWind.
 *
 * `twMerge` exists so a caller's className genuinely overrides a component's
 * default rather than both landing in the string and the winner being decided
 * by Tailwind's internal ordering — the classic "why is my override ignored"
 * bug, which on native is much harder to debug than in a browser.
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
