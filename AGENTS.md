# AGENTS.md

## Project overview

Independent Social Battery App — a single-page web app (Vite + React + TypeScript)
for tracking social energy. Core logic lives in `src/battery.ts`; the UI is in
`src/App.tsx`.

## Cursor Cloud specific instructions

- This is a single frontend service. There is no backend, database, or auxiliary
  service to run.
- Commands are defined in `package.json` scripts; see `README.md` for the full table.
  Standard flow: `npm run dev` (dev server on `http://localhost:5173`),
  `npm run lint`, `npm test` (Vitest, runs once), `npm run build`.
- Non-obvious gotcha: `npm run build` runs `tsc -b` first. With the TypeScript
  config's `noUncheckedSideEffectImports`, side-effect CSS imports (`import './App.css'`)
  require the `vite/client` types — these come from `src/vite-env.d.ts`. Do not delete
  that file or the build will fail even though the dev server and tests still work.
