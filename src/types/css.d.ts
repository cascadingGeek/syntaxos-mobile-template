/**
 * CSS type declarations for the type-check gate.
 *
 * Expo writes these into `expo-env.d.ts`, but ONLY when the dev server runs —
 * neither `create-expo-app` nor `expo export` emits it. A fresh clone would
 * therefore fail `tsc --noEmit` on its own `global.css` import, failing
 * Internal QA on generated code that is not at fault.
 */
declare module "*.css";
