# Criteria — Design System

Design reference for the **Criteria** app (React SPA for evaluating institutional repositories). The UI is entirely in Spanish. This file documents the design language, tokens, component patterns, and motion so any developer or AI agent can build consistent UI.

**Source of truth for tokens:** `src/styles/tokens.css` (CSS custom properties). Legacy SCSS variables mapping onto tokens live in `src/variables.scss`.

---

## 1. Design language

**Domain:** Academic evaluation & institutional repositories.
**Feel:** Scholarly, authoritative, clean, precise — calm authority, not playful. Think a peer-review desk, not a startup landing page.
**Intent everywhere:** Navy = authority/navigation/structure. Teal = score, action, brand. Neutral grays = layout, surfaces, text hierarchy. Color carries meaning; it is never decorative.

The product is a **wizard**: an evaluator walks through 8 category forms, watches a cumulative score grow in a teal circle, and lands on a summary with quality verdict. All UI decisions should serve that flow.

---

## 2. Color

### Brand & semantic tokens

| Token | Value | Usage |
|---|---|---|
| `--scholarly-900` | `#1a202c` | Headings, dark text, primary ink |
| `--scholarly-800` | `#2d3748` | Sidebar deep surface, secondary dark |
| `--scholarly-700` | `#4a5568` | Medium-dark surfaces, hover on buttons |
| `--scholarly-600` | `#718096` | Muted text / tertiary |
| `--scholarly-100` | `#f7fafc` | Light tint |
| `--assessment-500` | `#00796b` | Teal dark (hover/pressed) |
| `--assessment-400` | `#009688` | **Brand teal** — primary action, links, scores |
| `--assessment-300` | `#4db6ac` | Input focus border |
| `--assessment-100` | `#e0f2f1` | Teal light tint |

Aliases: `--brand-teal: #009688`, `--brand-teal-light: #e0f2f1`, `--brand-teal-dark: #00796b`.

### Surfaces

| Token | Value | Usage |
|---|---|---|
| `--manuscript-paper` | `#ffffff` | Cards, page background (light) |
| `--manuscript-cream` | `#f4f7f6` | App background (body) |
| `--manuscript-overlay` | `rgba(255,255,255,0.05)` | Overlays on dark |

### Ink (text)

| Token | Value | Usage |
|---|---|---|
| `--ink-900` | `#1a202c` | Primary text |
| `--ink-700` | `#4a5568` | Secondary text |
| `--ink-500` | `#a0aec0` | Muted text, disabled buttons |
| `--ink-on-dark` | `#ffffff` | Text on dark surfaces |

### Semantic

| Token | Value | Usage |
|---|---|---|
| `--success` / `--info` | `#009688` | Success, info, links |
| `--warning` | `#f59e0b` | Warnings |
| `--error` | `#ef4444` | Field errors, destructive |

### Borders

| Token | Value |
|---|---|
| `--border-subtle` | `#e2e8f0` |
| `--border-light` | `rgba(0,0,0,0.05)` |

**Border philosophy:** low-opacity / soft gray borders. Edges define structure quietly; they are not the first thing you see.

---

## 3. Typography

- **Display / headings:** DM Sans (loaded via Google Fonts in `index.html`), weight 700, tight tracking (`-0.02em` to `-0.01em`).
- **Body / UI:** DM Sans; system fallback stack in `src/index.scss`.
- **Icons:** Material Icons + Material Icons Outlined (single icon set — use one consistently).

| Token | Value | Typical use |
|---|---|---|
| `--text-xs` | 0.75rem | Field errors, tags |
| `--text-sm` | 0.875rem | Labels, secondary text |
| `--text-base` | 1rem | Body, option titles |
| `--text-lg` | 1.125rem | Scores |
| `--text-xl` | 1.25rem | Sub-titles |
| `--text-2xl` | 1.5rem | Loading header |
| `--text-3xl` | 1.875rem | `.main-title`, big score values |
| `--text-4xl` | 2.25rem | Section titles (wizard pages) |

Headings use `var(--font-display)`, bold 700, color `--scholarly-900`. UI copy is always Spanish.

---

## 4. Spacing, radius, shadows, motion

### Spacing scale (multiples of 4px)

`--space-1: 0.25rem` · `--space-2: 0.5rem` · `--space-3: 0.75rem` · `--space-4: 1rem` · `--space-6: 1.5rem` · `--space-8: 2rem` · `--space-12: 3rem` · `--space-16: 4rem`.

Rule: multiples of the base unit only. Random values signal no system.

### Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 6px | Tags, small chips |
| `--radius-md` | 10px | Buttons |
| `--radius-lg` | 14px | Cards, inputs |
| `--radius-xl` | 18px | Large containers |
| `--radius-full` | 9999px | Circles, pills, score circle |

Sharper = technical; rounder = friendly. Keep the scale consistent per element type.

### Shadows

| Token | Value |
|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)` |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)` |

Teal-tinted shadows on primary actions: `0 4px 12px rgba(0,150,136,0.2)` (rest) → `0 6px 20px rgba(0,150,136,0.35)` (hover).

### Motion

| Token | Value |
|---|---|
| `--ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` — micro-interactions |
| `--ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` — standard |
| `--duration-fast` | 150ms |
| `--duration-normal` | 300ms |

Established patterns:
- **Wizard entry:** `slide-up` (translateY 20px → 0, fade) 0.6s, staggered 50ms per grid child (see `ItemTemplate.scss`).
- **Hover:** subtle `translateY(-1px)` lift on buttons and option cards; keep it whisper-quiet, no spring in professional flows.
- **Loading:** full-screen `.blocking-loading` overlay with `HashLoader` (`#009688` hex literal, `speedMultiplier={1.25}`) + `.loading-label` "Cargando"; inline variant uses `.loading-container` + `.loading-text`. Fade via `opacity`/`visibility`, theme-aware `color-mix` background + `blur(6px)`.

---

## 5. Dark mode

`[data-theme='dark']` overrides in `tokens.css`:
- `--manuscript-paper: #111b27`, `--manuscript-cream: #0a121e`
- `--ink-900: #f1f5f9`, `--ink-700: #cbd5e1`
- `--border-subtle: rgba(255,255,255,0.1)`

Dark conventions: use borders (not shadows) for separation; keep semantic colors slightly desaturated.

---

## 6. Layout & component patterns

### Global layout

- **App shell:** `.App` = flex column, min-height 100vh. Body background `--manuscript-cream` with a faint SVG noise texture (opacity 0.03).
- **Sidebar menu** (`Menu.scss`): 340px, full height, scrollable. **Dark mode** uses deep slate `#0f172a`, teal logo tile (`#10b981`), active item = teal text + 3px teal right-rail indicator on `rgba(0,150,136,0.1)` background.
- **Page wrapper** (`@mixin page`): padding `--space-6`, scrollable, `--manuscript-paper` background, `--ink-900` text.

### Wizard page (`ItemTemplate`)

Header: section title (`.main-title`, `--text-4xl`, left-aligned) + green "Puntaje de Sección" pill (`#d1fae5` bg / `#059669` text / teal dot) + **score circle** (100px, 5px `--brand-teal` ring, `TOTAL` label + score).

Form grid: Tailwind `grid grid-cols-1 lg:grid-cols-2 gap-8` with staggered slide-up entries.

Actions: `.cta` buttons 48px fixed height, radius 12px. **Primary** (submit/next/summary): teal fill, white text, teal shadow. **Secondary** (Anterior): transparent, slate text `#64748b`, 1px `#e2e8f0` border. Disabled: `--ink-500` fill.

### Option card

White card (`--radius-lg`, 1px `--border-subtle`, subtle shadow). Header: title + optional uppercase teal tag. Footer: status/details trigger + numeric `score-box` (`#f8fafc`, 1px `#e2e8f0`, radius 8px). Hover: lift `-2px`, deeper shadow, border to teal tint.

### Input

Label (`#475569`, weight 600) + optional uppercase `optional-tag`. Field: 1.5px `#edf2f7` border, radius 14px, white fill, slate text `#1e293b`, placeholder `#cbd5e1`, leading icon slot (left 52px padding when `has-icon`). Focus: `--assessment-300` border + `0 0 0 4px rgba(0,150,136,0.08)` ring. Error text: `--error`, `--text-xs`.

### Status pills / badges

- Section score pill: light teal-green pill with dot.
- Summary header status: `ESTADO: COMPLETO` teal pill; `Actualización:` neutral pill.
- Quality levels (`getQualityInfo`): `Alto` ≥80%, `Medio` ≥50%, `Bajo` below — with `high-score`/`medium-score`/`low-score` classes on score blocks and progress bars.

### Summary page

Max-width 900px centered. Header card: repository name/subtitle, URL link, status pills, **score panel** (teal gradient block with `PUNTAJE TOTAL` score/max, progress bar, `Nivel de Calidad` chip), Export (teal) + Share (white, border) buttons. Below: "CATEGORÍAS DE EVALUACIÓN" table — icon tile (40px, gray-100), category name, `total / max_rating`, teal progress bar colored by quality.

---

## 7. Conventions for contributors

- **Prefer tokens** (`var(--assessment-400)`, `var(--scholarly-900)`) and Tailwind utilities; co-located SCSS per component is used too — follow the existing pattern of whichever file you touch.
- Keep one accent color (teal) with intention; never multiple accents or decorative gradients.
- Pick **one depth strategy** and commit (this project: subtle shadows + soft borders, not hard lines).
- Every interactive element needs default / hover / active / focus / disabled states; data needs loading / empty / error.
- Icons clarify, don't decorate; remove icons that carry no meaning.
- Keep all user-facing copy in Spanish.

## 8. Files to reference

| File | What it documents |
|---|---|
| `src/styles/tokens.css` | Design tokens (colors, type, spacing, radius, shadows, motion, dark mode) |
| `src/variables.scss` | Legacy SCSS → token mappings, `@mixin page` |
| `src/App.scss` | Global typography, `.cta`, `.link`, `.state`, `.blocking-loading` |
| `src/components/general/menu/Menu.scss` | Dark sidebar |
| `src/components/evaluation/itemTemplate/ItemTemplate.scss` | Wizard page, score circle, form actions, motion |
| `src/components/general/option/Option.scss` | Option card |
| `src/components/general/input/Input.scss` | Input field |
| `src/components/evaluation/summary/Summary.scss` | Summary/score page |
| `index.html` | Fonts (DM Sans, Fraunces, Material Icons) |