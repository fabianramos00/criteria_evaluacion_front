# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview

**Criteria** is a React SPA for evaluating institutional repositories against 8 standardized criteria categories. The UI is entirely in **Spanish**. Users submit a repository URL, receive a token-based evaluation session, step through 8 category forms, and get a final score with quality breakdown.

The evaluation flows against an external backend API (the Django/Django REST backend is a separate repository). The frontend only calls that API.

> **Note:** `CONTEXT.md` in the repo root (if present) is outdated — it references CRA, React 17, and react-router-dom 5. The project now uses Vite + React 18 + react-router-dom 6. `CLAUDE.md` also exists but is Claude-specific; `AGENTS.md` is the canonical cross-tool context.

## Build & Dev Commands

```bash
pnpm run dev      # Vite dev server on http://localhost:3000 (auto-opens browser)
pnpm run build    # Production build to dist/
pnpm run preview  # Preview production build
```

- **No test runner is configured.** No lint or typecheck scripts exist.
- Package manager is **pnpm** (project was migrated from CRA + yarn, then npm → pnpm).

## Tech Stack

- **React 18** with **Vite 6**, **react-router-dom 6**
- **Styling**: Tailwind CSS 4 (`@tailwindcss/vite` plugin) + SCSS via `sass-embedded`. Design tokens in `src/styles/tokens.css`, legacy SCSS variables in `src/variables.scss`. SCSS compiled with `api: 'modern-compiler'`.
- **Forms**: react-hook-form + @hookform/resolvers + Yup
- **PDF export**: @react-pdf/renderer, jspdf (deps present; current Summary component has the PDF button disabled/commented out)
- **Other**: react-modal, react-spinners, react-tooltip
- **Fonts**: DM Sans, Fraunces, Material Icons (via Google Fonts CDN in `index.html`)

## Environment

- `.env` contains `VITE_SERVER_URL` — backend API base URL, read via `import.meta.env.VITE_SERVER_URL`.
- Dev proxy: Vite proxies `/api` → `VITE_SERVER_URL` and strips the `/api` prefix. In dev, `BASE_URL` in `src/config/client.http.js` is `/api`; in production it is `SERVER_ENDPOINT`.
- Path alias: `src` → `/src` (configured in `vite.config.js`).
- `.env` is gitignored.

## Architecture

### Routing & Pages

`/` redirects to `/home`. Two main page-level routes:
- `/home` — Repository URL form + paginated evaluation list (History)
- `/eval/:token` — Evaluation wizard with dark sidebar navigation

Within `/eval/:token`, nested routes (in order):
- (index) — Visibilidad
- `policy` — Políticas
- `legal_aspects` — Aspectos Legales
- `metadata` — Metadatos
- `interoperability` — Interoperabilidad
- `security` — Seguridad
- `stats` — Estadísticas
- `services` — Servicios de valor añadido
- `summary` — Score results & category breakdown

Route builders live in `src/const/routes.js` (e.g. `visibilityRoute(token)`, `getRouteBySection` maps section names → builders).

### Evaluation Categories

1. Visibilidad, 2. Políticas, 3. Aspectos Legales, 4. Metadatos, 5. Interoperabilidad, 6. Seguridad, 7. Estadísticas, 8. Servicios de valor añadido, 9. Resumen.

### Key Patterns

- **ItemTemplate** (`src/components/evaluation/itemTemplate/ItemTemplate.jsx`): shared wrapper for all 8 category forms. Handles form init via `getItemEvaluation(item, token)`, submission via a category-specific `evalFunc`, prev/next navigation, section score pill + total badge, and loading overlay. It hydrates the form from server data: for each key it calls `setValue(key, value === 1)` (booleans), updates `TotalContext` with `accumulative`, stores `repository_name`, and only shows the form when the item is not already answered (`isEmptyObject(data)`).
- **Category components** (`src/components/evaluation/<category>/`): each passes `item`, `title`, `form` (defaultValues + Yup schema), `evalFunc`, `nextRoute`/`prevRoute`, and a `render` function (or children) to `ItemTemplate`. Fields use reusable form components and often render auto-computed results via `Option ... automatic value={data[FIELD]}`.
- **API layer**: `src/config/client.http.js` exports `postData(path, body)` and `getData(path)` using native fetch. Errors are thrown as parsed JSON bodies (backend returns field-keyed error objects; `e.detail === 'Invalid token'` redirects home, `e.is_next`/`e.is_completed` + `e.next_item` drive wizard navigation).
- **Service functions**: `src/services/` call the HTTP wrappers. `home.services.js`: `evaluate()`, `listEvaluations(page, quantity, search)`. `evaluation.services.js`: `getItemEvaluation(item, token)`, `evalVisibility/Politics/LegalAspects/Metadata/Interoperability/Security/Statistics/Services`, `summary(token)`.
- **State**: `TotalContext` (React Context, `src/context/context.jsx`) holds `total` (accumulative score) and `repositoryName`, both set by `ItemTemplate`. Form state is managed by react-hook-form with Yup schemas.
- **Component structure**: each component lives in its own directory with co-located `.jsx` + `.scss`. Reusable form primitives in `src/components/general/`: `Input`, `Option`, `RadioGroup`, `RadioBtn`, `RadioWithUrl`, `ListItemCheck`, `DetailsModal`, `ErrorMessage`, `Menu`.

### Home flow

`src/components/home/form/Form.jsx` validates URL + name (with optional unique alternative name), calls `evaluate()` → receives `{ token }` → navigates to `visibilityRoute(token)`. `EvaluationList` fetches paginated history via `listEvaluations`.

### Summary

`src/components/evaluation/summary/Summary.jsx` calls `summary(token)` and renders repository names, total score / `max_rating`, per-category bars with quality labels (`getQualityInfo`: Alto/Medio/Bajo), share-to-clipboard, and an (currently disabled) PDF export button.

## Constants & Validation

- Route paths generated from `src/const/routes.js`
- Yup field-name constants in `src/schemas/` (one file per category, e.g. `visibility.js` exports snake_case field keys used in both schema and components)
- Error message constants in `src/const/errors.js` (`REQUIRED_FIELD_ERROR`, `INVALID_URL_ERROR`)
- Shared constants in `src/const/common.js` (`URL_PLACEHOLDER`, `YES_NO_OPTIONS`)
- Utilities in `src/utils/common.js`: `getError`, `cleanJSON` (drops empty/falsy non-boolean values), `isEmptyObject`, `formatDate`, `getQualityInfo`

## Conventions & Gotchas

- UI copy and code comments are in Spanish; field names / API keys are English snake_case.
- Boolean Yup defaults are `false`; booleans are submitted as `true`/`false` and restored from server as `=== 1`.
- `cleanJSON` strips falsy values before POST (empty URLs are not sent).
- Forms disable editing once answered (`disabled = !isEmptyObject(data)`).
- Styling: prefer design tokens (`var(--scholarly-900)`, `var(--assessment-400)`, etc.) from `src/styles/tokens.css`; Tailwind utility classes and co-located SCSS are both used.
- When adding a new category, follow the existing pattern: schema constants file + category component wrapping `ItemTemplate` + route in `Evaluation.jsx` + service function.