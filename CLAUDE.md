# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a client-only TODO list web app built with React and Vite — no backend, no database. All state lives in the browser and is persisted to `localStorage`. There is no test suite. The UI text is in Hungarian.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the Vite dev server
- `npm run build` — production build (outputs to `dist/`)
- `npm run preview` — serve the production build locally

No lint, typecheck, or test scripts are configured.

Requires Node.js >= 18 (see `engines` in `package.json`).

## Architecture

- Entry point: `index.html` → `src/main.jsx` → `src/App.jsx`. Standard Vite + React setup (`vite.config.js` uses `@vitejs/plugin-react`), plain JS (no TypeScript).
- **State and persistence**: `src/hooks/useTodos.js` is the single source of truth. It loads todos from `localStorage` (key `opencode_todos`) on init and writes back on every change via a `useEffect`. It exposes the mutation functions (`addTodo`, `toggleTodo`, `updateTodo`, `setPriority`, `destroyTodo`, `clearCompleted`) — `App.jsx` owns no todo data itself, only UI state (status filter, priority filter, sort toggle, which todo is being edited).
- **Todo shape**: `{ id: Date.now(), text, completed, priority }`, where `priority` is `0` (None) to `3` (High) — see `src/constants/priority.js` for the level → label/color mapping (`PRIORITY_LEVELS`, `getPriorityMeta`). `loadTodos()` in `useTodos.js` backfills `priority: 0` onto todos persisted before the field existed, so old `localStorage` data keeps working without a migration step.
- **Filtering/sorting** is computed client-side in `App.jsx` via a `useMemo` over the raw todos list: status filter (all/active/completed) → priority filter (multi-select, empty = no filter) → optional sort-by-priority (stable sort, descending 3→0). There is no server, so this fully replaces any notion of API query params.
- **Components** (`src/components/`) are function components, one per file with a co-located CSS file of the same name (e.g. `TodoItem.jsx` + `TodoList.css` — note styles for list items live in `TodoList.css`, not a `TodoItem.css`, since `TodoList` owns the `.todo-item` selectors). Composition: `App` → `TodoInput` (create form), `PriorityToolbar` (filter/sort controls), `TodoList` → `TodoItem`, `Footer` (status filter + clear completed), and conditionally `EditTodoModal`.
- `PrioritySelect` is a single reusable controlled dropdown component (custom-built, not a native `<select>`, so it can show a color dot per option) used in three places: the create form, the edit modal, and — via its `compact` prop — the inline per-row quick-edit control.
- User-provided text is rendered through plain JSX interpolation (`{todo.text}`), which auto-escapes — do not switch to `dangerouslySetInnerHTML` when touching rendering, to avoid reintroducing XSS.
