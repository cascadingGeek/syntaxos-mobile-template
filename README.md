# SyntaxOS Mobile Starter

The canonical Expo / React Native template every generated native app is
scaffolded from. Expo SDK 57, Expo Router, New Architecture, Hermes.

**One repo, two deploy artifacts:** the store binary (`eas build`) and the
hosted server (`eas deploy` → EAS Hosting, Cloudflare Workers). The server is
not on the device; the app has to be told where it lives via
`EXPO_PUBLIC_API_URL`.

## Structure

`PROJECT_STRUCTURE.md` is the contract. It is enforced by the backend's
`StructureGate`, which fails a build before preview if a boundary is crossed —
most importantly, if anything that could reach the client bundle touches a
secret.

## The standard stack

Versions are pinned **here**, never named in a generation prompt.

| Concern | Package |
| --- | --- |
| Data / auth / storage | `@supabase/supabase-js` |
| Server state | `@tanstack/react-query` |
| Client state | `zustand` |
| Validation | `zod/mini` |
| Lists | `@shopify/flash-list` |
| Icons | `lucide-react-native` + `react-native-svg` |
| Images | `expo-image` |
| Animation | `react-native-reanimated` |

## Getting started

```bash
npm install
cp .env.example .env     # fill in a Supabase project
npx expo start
```

The app builds and type-checks without a `.env` — missing public config falls
back to placeholders so an unprovisioned project is a configuration problem,
not a build failure. `isPlaceholderConfig` in `src/core/config.ts` reports the
truth, and release gating refuses to ship a binary still carrying placeholders.

## Verifying a change

```bash
npx tsc --noEmit               # types
npx expo export --platform web # bundles client + API routes
```

## For the generator (not for humans)

`app.json` carries `extra.eas.projectId`, which links **this template** to its
own EAS project so the template itself can be built and deployed in CI.

A generated app MUST NOT inherit it. `eas init` writes a project-scoped id, and
two apps sharing one id share builds, credentials and deployments. The Mobile
Builder runs `eas init` for each generated project and overwrites this value
before the first build.

Note also that `eas.json` pins `cli.version` to `>= 23.0.0`. That constraint is
load-bearing: an older global `eas-cli` fails the command outright rather than
building something subtly different.

## Export compliance — re-derive this per app

`ios.infoPlist.ITSAppUsesNonExemptEncryption` is set to `false` here so builds
do not stall: left unset, EAS warns and App Store Connect blocks TestFlight
until someone answers it by hand.

**That value is a legal declaration and the app owner is responsible for it.**
It must be re-derived per generated app, not inherited. Note that this starter
itself ships `aes-js` (LargeSecureStore encrypts the Supabase session before it
reaches AsyncStorage), so "does this app use non-exempt encryption" is a real
question here, not a formality. Release Compliance confirms it with the owner
before submission rather than assuming the template's answer.
