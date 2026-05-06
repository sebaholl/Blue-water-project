# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev        # start dev server (Vite HMR)
npm run build      # production build
npm run preview    # preview production build locally
npm run lint       # run oxlint then eslint (both with --fix)
```

Linting runs oxlint first (`lint:oxlint`), then eslint (`lint:eslint`), chained via `npm-run-all2`. No test suite is configured yet.

Node requirement: `^20.19.0 || >=22.12.0`

## Architecture

Vue 3 (Composition API with `<script setup>`) + Vue Router 5 + Vite 8.

**Entry point:** `src/main.js` creates the Vue app, registers the router, and mounts to `#app` in `index.html`.

**Routing:** `src/router/index.js` uses `createWebHistory`. The About route is lazy-loaded (code-split). Add new routes here and their corresponding view components under `src/views/`.

**Path alias:** `@` resolves to `src/` (configured in `vite.config.js`).

**Linting:** Two-layer setup — oxlint (fast Rust linter, configured in `.oxlintrc.json`) runs first with `correctness: error` rules for eslint/unicorn/oxc/vue plugins; ESLint runs second using `eslint-plugin-oxlint` to avoid duplicate rule conflicts. When adding ESLint rules, check whether oxlint already covers them to avoid duplication.

**Vue DevTools:** `vite-plugin-vue-devtools` is active in dev mode only.
