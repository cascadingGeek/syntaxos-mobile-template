/**
 * A design token as a COLOUR VALUE, for the APIs that will not take a class.
 *
 * Almost everything in this app is coloured with `className="bg-primary"` and
 * NativeWind resolves it against the variables in global.css. React Navigation
 * is the exception: `tabBarActiveTintColor`, `tabBarStyle`, `headerTintColor`
 * and friends are PROPS that take a colour string, and a class on them does
 * nothing at all.
 *
 * Without this hook the only way to colour a tab bar is a literal — and a
 * literal is a second palette that the approved design can never restyle. It
 * survives a palette iterate untouched, which is how an app specified in
 * indigo ships with a blue tab bar. `src/components/ui/icon.tsx` solves the
 * same problem for lucide icons with `cssInterop`; navigation options have no
 * element to interop, so they read the variable instead.
 *
 *   const active = useTokenColor("primary");
 *   const surface = useTokenColor("card");
 *
 *   <Tabs screenOptions={{
 *     tabBarActiveTintColor: active,
 *     tabBarInactiveTintColor: useTokenColor("muted-foreground"),
 *     tabBarStyle: { backgroundColor: surface },
 *   }} />
 *
 * global.css stays the single place a colour is decided.
 */
import { useMemo } from "react";
import { Platform } from "react-native";
import { useUnstableNativeVariable } from "nativewind";

/** Every colour token global.css defines. */
export type ColorToken =
  | "background"
  | "foreground"
  | "card"
  | "card-foreground"
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground"
  | "muted"
  | "muted-foreground"
  | "accent"
  | "accent-foreground"
  | "destructive"
  | "destructive-foreground"
  | "border"
  | "input"
  | "ring";

// Fully transparent, so a token that somehow resolves to nothing disappears
// rather than painting an unapproved colour over the design.
const UNRESOLVED = "#00000000";

export function useTokenColor(token: ColorToken): string {
  // Native: NativeWind's own variable store. Typed `unknown` because the
  // package ships a web declaration returning `undefined` and a native one
  // returning `any`; TypeScript resolves the web one and would narrow a
  // string check to `never`.
  const native: unknown = useUnstableNativeVariable(`--${token}`);

  // Web: the same variables really are CSS custom properties on :root, and
  // the native hook returns undefined there. The visual QA pass renders the
  // web export, so a hook that only worked on device would score the app
  // against a tab bar with no colour in it.
  const web = useMemo(() => {
    if (Platform.OS !== "web" || typeof document === "undefined") {
      return undefined;
    }
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(`--${token}`)
      .trim();
    return raw || undefined;
  }, [token]);

  const raw = typeof native === "string" && native.trim() ? native.trim() : web;
  // The variables hold bare HSL components ("218 100% 65%") so that Tailwind
  // can compose them with an alpha; a consumer needs the wrapped form.
  return raw ? `hsl(${raw})` : UNRESOLVED;
}
