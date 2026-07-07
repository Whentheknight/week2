# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a single-file TODO list web app: `index.html` contains all HTML, CSS, and JavaScript inline. There is no build step, no package manager, no dependencies, and no test suite. The UI text is in Hungarian.

## Running

Open `index.html` directly in a browser, or serve the directory with any static file server (e.g. `python -m http.server`).

## Architecture

- All markup, styles, and logic live in `index.html`. There is no bundler, framework, or module system — just vanilla JS in an inline `<script>` tag.
- State is a single `state` object (`{ todos, filter }`) held in memory and persisted to `localStorage` under the key `opencode_todos` via `save()`.
- Rendering is a full re-render pattern: any mutation (`addTodo`, `toggleTodo`, `destroyTodo`, filter change) calls `save()` then `render()`, which clears and rebuilds `.todo-list` from `state.todos` filtered by `state.filter` (`all` / `active` / `completed`).
- Todo items are plain objects: `{ id: Date.now(), text, completed }`.
- User-provided text is inserted via `escapeHtml()` (uses `div.textContent`/`innerHTML` round-trip) before being placed in the DOM — preserve this when touching rendering to avoid reintroducing XSS.
