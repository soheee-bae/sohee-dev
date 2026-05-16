# sohee-dev

Personal blog & content management system. Long-form posts, TIL micro-logs, an
admin command center for the writing pipeline (Idea → Writing → Review →
Scheduled → Published), Google sign-in for admin access, and Firestore-backed
data with Storage for images.

## Tech stack

- **Framework**: Next.js 16 (App Router, Turbopack) + TypeScript
- **Styling**: Tailwind CSS v4
- **UI primitives**: shadcn/ui (`base-nova` preset on top of Base UI)
- **Theming**: `next-themes` with light / dark / system, configured in [`src/lib/theme.config.ts`](src/lib/theme.config.ts)
- **Backend**: Firebase
  - Auth (Google sign-in)
  - Firestore (posts, comments, ideas)
  - Storage (image uploads)
- **Server-only**: `firebase-admin` via [`src/lib/firebase/admin.ts`](src/lib/firebase/admin.ts)

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill in Firebase project values
pnpm dev
```

Open <http://localhost:3000>.

## Available scripts

| command          | description                              |
| ---------------- | ---------------------------------------- |
| `pnpm dev`       | start the dev server (Turbopack)         |
| `pnpm build`     | production build                         |
| `pnpm start`     | run the production build                 |
| `pnpm lint`      | ESLint                                   |
| `pnpm typecheck` | `tsc --noEmit`                           |

## Environment variables

Browser SDK (must be `NEXT_PUBLIC_*` so they ship to the client):

| name                                       | source                                                  |
| ------------------------------------------ | ------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                     | Public origin used for absolute URLs / OG metadata.     |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | Firebase Console → Project Settings → General → Web app |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | "                                                       |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | "                                                       |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      | "                                                       |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | "                                                       |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | "                                                       |

Admin SDK (server-only, never exposed to the browser):

| name                          | source                                                                    |
| ----------------------------- | ------------------------------------------------------------------------- |
| `FIREBASE_ADMIN_PROJECT_ID`   | Service account JSON `project_id`                                         |
| `FIREBASE_ADMIN_CLIENT_EMAIL` | Service account JSON `client_email`                                       |
| `FIREBASE_ADMIN_PRIVATE_KEY`  | Service account JSON `private_key` (escape newlines as `\n` in `.env.*`)  |

## Folder layout

```
src/
  app/
    layout.tsx                   # ThemeProvider + AuthProvider + Header / Footer / Toaster
    page.tsx                     # Landing
    (marketing)/blog/            # Public reading area
      page.tsx                   #   blog index (placeholder)
      [slug]/page.tsx            #   post detail (placeholder)
    admin/                       # Admin-only command center
      layout.tsx                 #   client-side route guard
      page.tsx                   #   command center placeholder
      login/page.tsx             #   Google sign-in
    api/                         # Route handlers (kept empty for now)
    globals.css                  # Tailwind v4 + shadcn theme tokens
  components/
    ui/                          # shadcn/ui components
    layout/                      # Header, Footer
    theme-provider.tsx
    theme-toggle.tsx
    auth/
      auth-provider.tsx          # onAuthStateChanged → React Context
      google-sign-in-button.tsx
  lib/
    firebase/
      client.ts                  # browser SDK init
      auth.ts                    # signInWithGoogle / signOut helpers
      db.ts                      # Firestore handle
      storage.ts                 # Storage handle
      admin.ts                   # firebase-admin (server-only)
    theme.config.ts              # brand + admin allowlist
    site.config.ts               # site metadata
    utils.ts                     # `cn` helper from shadcn
  types/
    post.ts                      # PostStatus + Post / DraftPost
    comment.ts
    idea.ts
```

## Admin access

The admin email allowlist lives in [`src/lib/theme.config.ts`](src/lib/theme.config.ts)
under `adminEmails`. Add your Google account email there; otherwise sign-in succeeds
but the dashboard stays gated. A Firestore-backed `admins` collection will replace
this allowlist in a later phase.

## Roadmap (next phases, not in this base setup)

- Firestore security rules, composite indexes, Storage rules
- MDX editor with live preview + `next-mdx-remote` rendering
- Comments / likes / idea-bank data layer
- Scheduled publishing via cron / Cloud Scheduler
- SEO live preview (Google + X cards)
- Gemini-powered 3-line summary
- Smart search (title + tags)
