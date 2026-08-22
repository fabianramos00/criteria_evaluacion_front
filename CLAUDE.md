# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Criteria** is a React SPA for evaluating institutional repositories against 8 standardized criteria categories. The UI is entirely in **Spanish**. Users submit a repository URL, receive a token-based evaluation session, step through 8 category forms, and get a final score with PDF export.

> **Note:** `AGENTS.md` is the canonical cross-tool context; this file is Claude-specific.

## Build & Dev Commands

```bash
pnpm run dev      # Vite dev server on http://localhost:3000
pnpm run build    # Production build to dist/
pnpm run preview  # Preview production build
```

No test runner is configured.

## Tech Stack

- **React 18** with Vite 6, react-router-dom 6
- **Styling**: Tailwind CSS 4 + SCSS (sass-embedded). Design tokens in `src/styles/tokens.css`, legacy SCSS variables in `src/variables.scss`
- **Forms**: react-hook-form + @hookform/resolvers + Yup
- **PDF export**: html2canvas-pro + jspdf (`Summary.jsx`'s `toPDF()`)
- **Fonts**: DM Sans, Material Icons (via Google Fonts CDN in `index.html`)

## Environment

- `VITE_SERVER_URL` — Backend API base URL (accessed via `import.meta.env.VITE_SERVER_URL`)
- Vite dev server proxies `/api` to `VITE_SERVER_URL`
- Path alias: `src` → `/src` (configured in `vite.config.js`)

## Architecture

### Routing & Pages

`/` redirects to `/home`. Two main page-level routes:
- `/home` — Repository URL form + paginated evaluation list
- `/eval/:token` — Evaluation wizard with sidebar navigation

Within `/eval/:token`, nested routes include:
- (index) — Visibilidad
- `policy` — Políticas
- `legal_aspects` — Aspectos Legales
- `metadata` — Metadatos
- `interoperability` — Interoperabilidad
- `security` — Seguridad
- `stats` — Estadísticas
- `services` — Servicios de valor añadido
- `summary` — Score results & category breakdown

### Evaluation Categories (in order)

1. Visibilidad  2. Políticas  3. Aspectos Legales  4. Metadatos  5. Interoperabilidad  6. Seguridad  7. Estadísticas  8. Servicios de valor añadido  9. Resumen

### Key Patterns

- **ItemTemplate**: Shared wrapper for all evaluation category forms. Handles form init (`getItemEvaluation`), submission via category-specific `evalFunc`, prev/next navigation, and loading/error states.
- **API layer**: `src/config/client.http.js` exports `postData(path, body)` and `getData(path)` using native fetch. Service functions in `src/services/` call these wrappers.
- **State**: `TotalContext` (React Context) holds `total` score and `repositoryName`. Form state managed by react-hook-form with Yup schemas (`src/schemas/`).
- **Component structure**: Each component lives in its own directory with co-located `.jsx` + `.scss` files. Reusable components are in `src/components/general/`.

### Constants & Validation

- Route paths generated from `src/const/routes.js`
- Yup field-name constants in `src/schemas/` (one file per category)
- Error message constants in `src/const/errors.js`
- Utility functions (`getError`, `cleanJSON`, `formatDate`) in `src/utils/common.js`
