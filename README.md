# Independent-Social-Battery-App

Track your social energy. Log activities that drain or recharge your **social battery**
and see your current status at a glance.

Built with [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript.

## Getting started

```bash
npm install     # install dependencies
npm run dev     # start the dev server (http://localhost:5173)
```

## Available scripts

| Script            | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR           |
| `npm run build`   | Type-check and build for production (`dist`) |
| `npm run preview` | Preview the production build locally         |
| `npm run lint`    | Run ESLint over the project                  |
| `npm test`        | Run the unit/component tests once (Vitest)   |
| `npm run test:watch` | Run tests in watch mode                   |

## Project structure

```
src/
  battery.ts        # pure social-battery logic (levels, status, activities)
  battery.test.ts   # unit tests for the logic
  App.tsx           # main UI: battery gauge, activity chips, activity log
  App.test.tsx      # component tests
  main.tsx          # React entry point
```
