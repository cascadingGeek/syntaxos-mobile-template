# Project Structure Contract — Generated Native Apps

Every generated Expo/React Native app follows this structure exactly. It is baked into the canonical starter template, and the **QA gate asserts it** — generated code that violates it fails before preview. Strict separation of concerns: each directory has one job, and the boundaries below are invariants, not suggestions.

> Two changes from the reference structure: `api/` → `data/` (to keep the client data layer unambiguously separate from `+api.ts` server routes — a secret-leak boundary), and an added `server/` + `app/**/+api.ts` server edge (used only when an app needs secrets/webhooks/third-party; absent for RLS-only apps).

## Directory tree

```
src/
├── app/                      Routes — expo-router maps files to URLs.
│   ├── _layout.tsx           Providers, AppState wiring, root ErrorBoundary
│   ├── auth-callback.tsx     Email-confirmation deep link → session
│   ├── reset-password.tsx    Recovery deep link → new password
│   ├── (auth)/               Signed-out group; redirects out if a session exists
│   ├── (app)/                Signed-in group; redirects to /login if none
│   └── **/+api.ts            SERVER EDGE — secrets, webhooks, privileged, third-party.
│                             Thin: validate (schemas/) + delegate to server/. Runs on Cloudflare Workers.
│
├── server/                   Server-only logic imported by +api.ts. Holds secrets / third-party
│                             clients / webhook handlers. NEVER imported by client code. (Omit if no +api.ts.)
│
├── data/                     The only CLIENT code that speaks to Supabase (queries, paging,
│                             filters, sorts, row types, PostgREST error mapping). RLS-protected, client-safe.
│
├── hooks/                    React bindings over data/ (and calls to +api.ts). One concern each:
│                             read hooks, mutation hooks, small utility hooks. No Supabase import here.
│
├── features/                 Feature-owned UI and logic.
│   └── <feature>/            e.g. todos/components, notifications/{content,plan,scheduler,...}
│
├── components/               Shared, feature-agnostic UI.
│   └── ui/                   gluestack-ui generated — baked once at template build. DO NOT hand-edit.
│
├── lib/                      Platform and client wiring: supabase client, query-client,
│                             query-keys, cache patching, online-manager, fetch-with-timeout,
│                             session-storage (+ .web/.native platform splits).
│
├── store/                    Zustand — CLIENT STATE ONLY. No server data mirrored here.
│
├── schemas/                  Zod (zod/mini) — the single source of validation, shared client + server.
│
├── core/                     Cross-cutting primitives. DEPENDS ON NOTHING in the app.
│                             config/env (fails fast, names what's missing), app-error, reporting, theme tokens.
│
├── utils/                    Pure functions (dates, Result<T>, filters). No side effects.
│
└── types/
    ├── database.ts           Generated from the Supabase schema. DO NOT hand-edit.
    └── <domain>.ts           Friendly aliases over the generated types.
```

## Invariants (QA asserts these)

1. **Only `data/` and `server/` import `supabase-js`.** Screens, components, hooks, and stores never touch Supabase directly — `data/` for client/RLS access, `server/` for privileged access.
2. **Secrets and server-only env live only in `server/` and `+api.ts`.** Never in `data/`, `app/` screens, `components/`, or anything shipped in the client bundle. `core/config.ts` exposes only client-safe (`EXPO_PUBLIC_*`) values to the client; `serverEnv()` (secret-bearing) is importable only from `server/` / `+api.ts`.
3. **`+api.ts` handlers are thin** — validate with `schemas/`, then delegate to `server/`. No business logic in the route file.
4. **`server/` is never imported by client code** (`app/` screens, `components/`, `features/`, `hooks/`, `store/`, `data/`).
5. **`store/` holds client state only.** Server data lives in the TanStack Query cache and is never mirrored into Zustand.
6. **`schemas/` is the single validation source**, shared by client and `+api.ts` (the server validates with the same schema the client does).
7. **`core/` depends on nothing** in the app; anything may depend on `core/`. No dependency cycles.
8. **`components/ui/` is generated (gluestack) and never hand-edited.** It is produced once at template-build time.
9. **`types/database.ts` is generated** from the Supabase schema and never hand-edited.
10. **Reads are query hooks; writes are mutation hooks** — all in `hooks/`, layered over `data/`. Platform-specific code uses `.native.ts` / `.web.ts` splits.

## Dependency direction (no upward imports)

```
app/  →  features/  →  hooks/  →  data/  →  lib/  →  core/
                                   +api.ts  →  server/  →  lib/ / core/
leaf modules (imported widely, import little):  schemas/  ·  utils/  ·  types/  ·  core/
```

QA asserts no upward imports (e.g. `data/` must not import from `app/`, `hooks/`, or `features/`; `core/` must not import from anything but itself).

## Notes

- **Root is `src/`** (Expo Router supports `src/app`). Keep everything under `src/`.
- **The server edge is conditional.** RLS-only apps (client + `data/` + Supabase) have no `server/` or `+api.ts`, exactly like a simple todo app. They appear the moment an app needs a secret, a webhook receiver, or a server-to-server third-party call.
- This contract is law for the generator: the Mobile Builder generates _into_ these directories, and may not invent new top-level directories without a contract change.
