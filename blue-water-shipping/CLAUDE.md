# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Blue Water Shipping** — a multi-page marketing/corporate website built in Vue 3.
Designs are provided as Figma screenshots. Reproduce them as accurately as possible in structure, spacing, colors, and typography.

---

## Commands

```sh
npm run dev        # start dev server (Vite HMR)
npm run build      # production build
npm run preview    # preview production build locally
npm run lint       # run oxlint then eslint (both with --fix)
```

Linting runs oxlint first (`lint:oxlint`), then eslint (`lint:eslint`), chained via `npm-run-all2`. No test suite is configured yet.

Node requirement: `^20.19.0 || >=22.12.0`

---

## Architecture

Vue 3 (Composition API with `<script setup>`) + Vue Router 5 + Vite 8 + Tailwind CSS.

**Entry point:** `src/main.js` creates the Vue app, registers the router, mounts i18n, and mounts to `#app` in `index.html`.

**Routing:** `src/router/index.js` uses `createWebHistory`. Lazy-load all views (code-split). Add new routes here and their corresponding view components under `src/views/`.

**Path alias:** `@` resolves to `src/` (configured in `vite.config.js`).

**Linting:** Two-layer — oxlint (Rust, `.oxlintrc.json`) runs first; ESLint runs second via `eslint-plugin-oxlint` to avoid duplicate rule conflicts. Check oxlint coverage before adding ESLint rules.

**Vue DevTools:** `vite-plugin-vue-devtools` active in dev mode only.

---

## Styling — Tailwind CSS

- Use Tailwind utility classes as the primary styling method.
- Extend the Tailwind config (`tailwind.config.js`) with all brand tokens (colors, fonts) so they are available as utilities.
- Avoid inline styles. Avoid arbitrary Tailwind values unless there is no brand token equivalent.
- Use `@apply` in component `<style>` blocks only for complex repeated patterns.

---

## Brand — Colors

All colors must be defined in `tailwind.config.js` under `theme.extend.colors` and used via Tailwind classes.

### Primary palette
| Name              | HEX       | Usage                                      |
|-------------------|-----------|--------------------------------------------|
| `bw-blue`         | `#0000AB` | Primary brand color — headlines, nav, key UI |
| `bw-sky`          | `#0084FF` | CTA buttons, icon backgrounds, accents     |
| `bw-red`          | `#FE3866` | CTA buttons, alerts, accents               |
| `bw-green`        | `#56E5B2` | CTA buttons, success states, accents       |
| `bw-night`        | `#000074` | Deep blue — footers, dark sections         |

### Secondary palette
| Name              | HEX       | Usage                                      |
|-------------------|-----------|--------------------------------------------|
| `bw-granite`      | `#282828` | Primary text color                         |
| `bw-steel`        | `#515151` | Secondary text, captions                   |
| `bw-clay`         | `#A1968A` | Subtle UI elements                         |
| `bw-sand`         | `#EEECED` | Section backgrounds, highlight areas       |
| `bw-white`        | `#FFFFFF` | Backgrounds, card surfaces                 |
| `bw-black`        | `#000000` | High contrast text                         |

---

## Brand — Typography

**Primary typeface: Proxima Nova** — used for ALL website content.
- Load via Adobe Fonts or a self-hosted webfont (do NOT use Google Fonts for Proxima Nova).
- Weights in use: Light (300), Regular (400), Medium (500), Bold (700), Extrabold (800), Black (900).

**Office typeface: Arial** — NOT to be used on the website. Exclusively for internal Office documents.

Add to `tailwind.config.js`:
```js
fontFamily: {
  proxima: ['"Proxima Nova"', 'sans-serif'],
}
```

Set as the default font on `body` in `src/assets/main.css`:
```css
body {
  font-family: 'Proxima Nova', sans-serif;
}
```

---

## Internationalisation (i18n)

- Use **vue-i18n** (v9+, Composition API mode).
- Supported locales: `en` (English) and `da` (Danish).
- All user-facing strings must use `t('key')` — no hardcoded text in templates.
- Translation files: `src/locales/en.json` and `src/locales/da.json`.
- Default locale: `en`. Fallback locale: `en`.
- Language switcher must be present in the global navigation.

---

## Component Structure

- Components are single-file components (`.vue`) using `<script setup>`.
- Shared layout elements (Navbar, Footer) live in `src/components/layout/`.
- Page-specific sections can be sub-components inside `src/components/<PageName>/`.

---

## Figma-to-Code Guidelines

When given a Figma screenshot to implement:
1. Match the layout, spacing, and proportions as closely as possible.
2. Use brand colors and Proxima Nova exclusively — do not introduce colors or fonts not in the brand guide.
3. All text content must be wrapped in `t()` for i18n — add placeholder keys to both `en.json` and `da.json`.
4. Build each section as its own component for maintainability.
5. Ensure the implementation is fully responsive (mobile-first).
6. Do not use external UI component libraries — build components from scratch with Tailwind.