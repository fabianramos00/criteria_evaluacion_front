# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Criteria** is a React SPA for evaluating institutional repositories against 8 standardized criteria categories. The UI is entirely in **Spanish**. Users submit a repository URL, receive a token-based evaluation session, step through 8 category forms, and get a final score with PDF export.

> **Note:** `CONTEXT.md` in the repo root is outdated — it references CRA, React 17, and react-router-dom 5. The project has been migrated to Vite + React 18 + react-router-dom 6.

## Build & Dev Commands

```bash
npm run dev      # Vite dev server on http://localhost:3000
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

No test runner is currently configured.

## Tech Stack

- **React 18** with Vite 6, react-router-dom 6
- **Styling**: Tailwind CSS 4 + SCSS (sass-embedded). Design tokens in `src/styles/tokens.css`, legacy SCSS variables in `src/variables.scss`
- **Forms**: react-hook-form + @hookform/resolvers + Yup
- **PDF export**: @react-pdf/renderer, jspdf
- **Fonts**: DM Sans, Fraunces, Material Icons (via Google Fonts CDN in `index.html`)

## Environment

- `VITE_SERVER_URL` — Backend API base URL (accessed via `import.meta.env.VITE_SERVER_URL`)
- Vite dev server proxies `/api` to `VITE_SERVER_URL`
- Path alias: `src` → `/src` (configured in `vite.config.js`)

## Architecture

### Routing & Pages

`/` redirects to `/home`. Three page-level routes:
- `/home` — Repository URL form + paginated evaluation list
- `/eval/:token` — 8-step evaluation wizard with sidebar navigation
- `/summary/:token` — Score results; `/summary/:token/pdf` for PDF export

### Evaluation Categories (in order)

1. Visibilidad  2. Políticas  3. Aspectos Legales  4. Metadatos  5. Interoperabilidad  6. Seguridad  7. Estadísticas  8. Servicios de valor añadido

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
