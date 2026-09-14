# SyntaxOS Mobile Template Agent Guide

This repository is the canonical source cloned for every generated native app.
Changes here multiply across all future builds. Prefer a small, proven primitive
over a clever abstraction or a new dependency.

## Read first

1. Read `PROJECT_STRUCTURE.md`; its boundaries are enforced by backend QA.
2. Read `package.json`, `app.json`, and `eas.json` before changing platform code.
3. Inspect the exact component or layer being extended. Do not guess exports.
4. Never read or modify `.env` files. Public configuration is documented by the
   repository; secrets are provisioned by the platform.

## Runtime and build contract

- Expo SDK 57, React Native 0.86, React 19, Expo Router, TypeScript strict mode.
- Styling uses NativeWind v4 with Tailwind v3 and tokens from `src/global.css`.
- Use `expo-image` for images, `lucide-react-native` through `Icon` for icons,
  and `FlashList` for unbounded lists.
- The starter must remain compatible with Expo Go. Use React Native core,
  Expo SDK modules supported by SDK 57, pure JavaScript packages, or the
  third-party native packages listed in Expo's SDK 57 Expo Go catalogue.
- Do not add a package merely because generated code might use it. If a new
  native dependency is unavoidable, document why Expo Go can load it and run
  Expo Doctor plus Android and iOS export checks.
- Never commit a real `extra.eas.projectId` or Expo `owner` to this template.
  The authenticated release stage creates and links one EAS project per app.

## Where code belongs

- `src/app/`: routes and layouts only. Compose features; do not place reusable
  product UI, data access, or business logic here.
- `src/components/ui/`: baked, feature-neutral primitives with stable typed
  APIs. These may use only React Native, Expo-safe visual packages, `cn`, and
  other primitives from this folder.
- `src/components/`: shared composed states and application chrome.
- `src/features/<feature>/`: reusable product-specific presentation and logic.
- `src/hooks/`: React Query bindings and focused client hooks.
- `src/data/`: client-safe Supabase access protected by RLS.
- `src/server/` and `src/app/**/+api.ts`: secrets and privileged integrations.
- `src/store/`: local UI/client state only; never mirror server records here.
- `src/schemas/`: shared Zod validation contracts.

Do not create new top-level source directories without updating
`PROJECT_STRUCTURE.md` and the backend structure gate together.

## Primitive catalogue

Import primitives from their direct module (for example,
`@/components/ui/dialog`) or from `@/components/ui` when several are needed.

- Layout: `Screen`, `ScreenHeader`, `Card`, `Separator`
- Typography and status: `Text`, `Badge`, `Progress`, `Skeleton`
- Identity and imagery: `Avatar`, `Icon`
- Actions: `Button`, `IconButton`, `ListItem`, `SwitchRow`
- Inputs: `Input`, `SearchField`, `FormField`, `SegmentedControl`
- Overlays: `Dialog`, `BottomSheet`
- Full-page states: `LoadingState`, `EmptyState`, `ErrorState`

Prefer these primitives over rebuilding cards, headers, modal backdrops,
search fields, empty states, or settings rows inside every route. Feature-level
components should wrap them rather than fork their implementation.

## UI quality rules

- Use semantic tokens (`bg-background`, `bg-card`, `text-foreground`,
  `text-muted-foreground`, `border-border`, `bg-primary`). Do not introduce
  hard-coded product colours inside primitives or generated screens.
- Every interactive control needs an accessibility label or visible label,
  correct accessibility role/state, a disabled state, and a minimum 44-point
  touch target.
- Every data screen provides loading, empty, and error states.
- Keep route files small. Extract repeated product UI into `features/`.
- Images require a meaningful accessibility label unless decorative.
- Avoid nested vertical `ScrollView`s. Use `FlashList` for dynamic collections.
- Respect safe areas and keyboard behavior through `Screen` or an equivalent
  route-specific container.

## Navigation

- Expo Router paths are the navigation contract.
- `(auth)` is signed out; `(app)` is signed in. Never place a protected screen
  outside `(app)`.
- Root and group `_layout.tsx` files own providers, guards, stacks, and tabs.
- Detail routes use stack navigation; primary destinations may use tabs.
- Navigate with typed `router.push`, `router.replace`, or `Link`. Do not invent
  paths that do not have a corresponding route file.

## Data and forms

- Screens never import `@supabase/supabase-js` or call `fetch` directly.
- Reads use query hooks; writes use mutation hooks.
- Forms may use `react-hook-form` with Zod resolvers. The Zod schema remains the
  source of truth; do not duplicate validation rules in a screen.
- Never expose server credentials through `EXPO_PUBLIC_*` variables.

## Required verification

Run all of these before considering a template change complete:

```bash
npm ci
npx expo install --check
npx tsc --noEmit
npm run lint
npx expo-doctor
npx expo export --platform android --platform ios --output-dir /tmp/syntaxos-export
```

For changes to app configuration or native dependencies, also verify prebuild
generation in a disposable directory. Never commit generated `android/` or
`ios/` directories to this managed template.
