# Zenvita — Local Development

Lightweight local build of the Zenith health tracking UI used for development and testing.

## Overview
This workspace contains a React + Vite app (TanStack starter) for tracking workouts, nutrition and sleep. A small mock database is provided in `src/lib/supabase.ts` (localStorage backed) so you can run the app without a live Supabase instance.

## Prerequisites
- Node 18+ (or compatible)
- npm

Optional (for a real Supabase backend): set these environment variables in a `.env` file at the project root:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

If those are not provided the app uses the local mock DB saved in `localStorage`.

## Quick start
1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

3. Open http://localhost:5173 (or the port Vite prints).

4. Sign in (mock auth):
   - Email: `alex@zenvita.ai`
   - Password: `password123`

If you signed out or no session exists, use the login screen to sign in with those credentials.

## How to log Sleep (UI)
- Navigate to the Sleep page: `Sleep` in the left nav.
- Click the large orange `+` button in the Last Night card (top-right of the card) to open the "Log Sleep Session" modal.
- Fill `Date`, `Bedtime`, `Wake Time`, `Sleep Quality (0-100)` and `Resting Heart Rate` and press **Log Session**.
- The app saves the log to the local mock DB (or to your Supabase instance if configured) and shows a small success message.

Notes about the UI
- The global header `+` button was removed and the page-level `+` on the Sleep card is used for logging (this is intentional to match the design).
- If you cannot open the modal by clicking the `+`, try a hard refresh (Ctrl+F5) and check the browser console for errors.

## Important files
- `src/routes/sleep.tsx` — Sleep page UI and the log modal logic.
- `src/components/AppShell.tsx` — Top-level layout, header, sidebar and previously-global `+` area.
- `src/lib/supabase.ts` — Mock DB and API helpers (localStorage). Contains `db.addSleepLog`, `db.getSleepLogs` and mock authentication.

## Troubleshooting
- Dev server fails: run `npm install` then `npm run dev` again.
- No session / redirected to login: sign in via the Login page with the mock credentials above.
- Modal not opening when clicking `+`: confirm the button is visible and try refreshing. If still not working, open DevTools → Console and paste any error messages into an issue.

## Tests / Local checks
- To verify sleep logs persist: log a session, then open the browser devtools → Application → Local Storage → `zenvita_sleeps` to inspect saved entries.

## Next steps (optional)
- Reintroduce a page-level contextual quick-add menu (anchor to the button) instead of a centered modal.
- Add an undo toast after logging to allow quick removal of accidental entries.

---

If you want, I can: add an anchored popover for the `+` (instead of a modal), or add an "Undo" toast after logging. Which would you like next?
