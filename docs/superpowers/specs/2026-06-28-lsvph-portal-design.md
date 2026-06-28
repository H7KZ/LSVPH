# LŠVPH Portal — Design Spec

**Date:** 2026-06-28  
**Project:** Letní Škola Vývoje Počítačových Her — student web portal  
**Scope:** Initial scaffold (v1) — simple, replaceable next year

---

## Overview

A single-page React application hosted on Cloudflare Pages. Students visit one URL and find all school materials: timetable, lunch menu, and subject presentations. Each subject presentation is a Reveal.js deck loaded from a markdown file that the responsible lecturer writes and owns.

---

## Tech Stack

| Tool | Version | Notes |
|---|---|---|
| Vite | latest | build tool |
| React | latest | UI framework |
| TypeScript | latest | strict mode |
| TailwindCSS | v4 | via `@tailwindcss/vite`, no PostCSS config |
| React Router | v7 | `BrowserRouter`, client-side routing |
| `@revealjs/react` | latest | `<Deck>`, `<Markdown src="..." />` |
| ESLint | latest | `typescript-eslint` |
| Prettier | latest | `prettier-plugin-tailwindcss` |
| Package manager | npm | |
| Deployment | Cloudflare Pages | `public/_redirects` for SPA fallback |

---

## Visual Design

### Palette

| Token | Value | Usage |
|---|---|---|
| `bg` | `#fafaf5` | Page background |
| `accent` | `#facc15` | Highlights, nav bar, badges, hover states |
| `ink` | `#000000` | Text, borders, headings |
| `muted` | `#555555` | Body copy, descriptions |
| `border` | `#000000` | 2px solid borders on cards and table |

### Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / headings | Space Grotesk | 700, 800 | Loaded from Google Fonts |
| Body / descriptions | DM Sans | 400, 500 | Loaded from Google Fonts |
| Code blocks in slides | monospace (browser default) | 400 | Inside Reveal.js only |

Google Fonts import (in `index.css`):
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');
```

### Style rules

- Heavy black borders (2px solid `#000`) on cards, table cells, nav divider
- Yellow (`#facc15`) as the single accent — used sparingly for emphasis, never as background for body text
- All-caps, wide letter-spacing for labels and section names (`tracking-widest text-xs font-bold`)
- No rounded corners except `rounded-sm` (2px) on small badges — keep the editorial sharpness
- Hover states: `bg-accent` fill or black border thickening — no shadows, no blur

---

## Routes

| Path | Page | Data source |
|---|---|---|
| `/` | Home | hardcoded + `subjects.ts` for subject card preview |
| `/timetable` | Timetable | `src/data/timetable.ts` |
| `/lunch` | Lunch | `src/data/lunch.ts` |
| `/subjects` | Subjects listing | `src/data/subjects.ts` |
| `/subject/:slug` | Presentation | `public/slides/:slug.md` via `@revealjs/react` |
| `*` | 404 | inline component |

---

## File Structure

```
L-VPH/
├── public/
│   ├── slides/              ← lecturers write here
│   │   ├── csharp.md
│   │   ├── 2d.md
│   │   ├── 3d.md
│   │   ├── gamedesign.md
│   │   └── unity.md
│   └── _redirects           ← /* /index.html 200
├── src/
│   ├── data/
│   │   ├── subjects.ts      ← single source of truth for subject metadata
│   │   ├── timetable.ts     ← week schedule (days × time slots)
│   │   └── lunch.ts         ← daily menus per day
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Timetable.tsx
│   │   ├── Lunch.tsx
│   │   ├── Subjects.tsx
│   │   ├── Presentation.tsx
│   │   └── NotFound.tsx
│   ├── components/
│   │   ├── Nav.tsx
│   │   └── SubjectCard.tsx
│   ├── App.tsx              ← router setup
│   ├── main.tsx
│   └── index.css            ← Tailwind v4 @import, Google Fonts @import
├── .claude/
│   └── CLAUDE.md            ← AI agent instructions for lecturers
├── index.html
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── .prettierrc.json
├── .prettierignore
└── package.json
```

---

## Data Shapes

### `src/data/subjects.ts`

```ts
export type Subject = {
  slug: string;       // matches public/slides/:slug.md
  title: string;      // display name
  lecturer: string;   // shown on card and presentation header
  description: string;
  accent: string;     // hex color, applied via style={{ backgroundColor: subject.accent }}
};

export const subjects: Subject[] = [
  {
    slug: 'csharp',
    title: 'Základy programování v C#',
    lecturer: 'Jan Komínek',
    description: 'Proměnné, podmínky, cykly, třídy.',
    accent: '#dbeafe', // blue-100 equivalent
  },
  // ...
];
```

### `src/data/timetable.ts`

```ts
export type Slot = {
  time: string;    // e.g. '9:00–10:30'
  label?: string;  // optional override label e.g. '🍽 Oběd'
};

export type DaySchedule = {
  day: string;     // 'Pondělí', 'Úterý', ...
  date: string;    // '30. 6.'
  slots: (string | null)[];  // subject slug or null for lunch/break
};

export const timeSlots: Slot[] = [ /* ... */ ];
export const schedule: DaySchedule[] = [ /* ... */ ];
```

### `src/data/lunch.ts`

```ts
export type LunchDay = {
  day: string;
  date: string;
  soup: string;
  main: string;
  note?: string;
};

export const lunchMenu: LunchDay[] = [ /* ... */ ];
```

---

## Presentation Page

`Presentation.tsx` reads `:slug` from the URL, finds the subject in `subjects.ts` (404 if not found), then renders:

```tsx
<Deck config={{ hash: true, transition: 'slide' }}>
  <Markdown src={`/slides/${slug}.md`} separator="^\n---\n$" verticalSeparator="^\n--\n$" />
</Deck>
```

The `.md` file lives in `public/slides/` so Vite serves it as a static asset — no bundling, no imports, just a URL fetch at runtime.

---

## Markdown Slide Format (for lecturers)

```markdown
## Název přednášky

Jméno přednášejícího

---

## Snímek 1

Obsah snímku

- Odrážka 1
- Odrážka 2

---

## Snímek 2

--

## Vertikální snímek (pod Snímkem 2)

Notes:
Toto jsou poznámky přednášejícího (S pro speaker view).
```

Separators:
- `---` (blank line before and after) → next horizontal slide
- `--` (blank line before and after) → vertical slide (nested)
- `Notes:` at end of slide → speaker notes

---

## CLAUDE.md Contents

The `.claude/CLAUDE.md` file instructs an AI agent helping a lecturer. It covers:

1. **Project context** — what LŠVPH is, who the users are (8th/9th grade students)
2. **How to add a subject** — edit `src/data/subjects.ts`, create `public/slides/:slug.md`
3. **Markdown slide syntax** — full cheatsheet with separators, fragments, code blocks, speaker notes
4. **Design tokens** — palette and font names to use when suggesting slide styles
5. **What NOT to touch** — `src/components/`, `src/pages/` (except adding a new subject entry), routing config
6. **Run commands** — `npm run dev`, `npm run build`, `npm run lint`, `npm run format`
7. **Deployment** — `git push` to main triggers Cloudflare Pages build automatically

---

## Cloudflare Pages Setup

- Build command: `npm run build`
- Build output: `dist/`
- `public/_redirects`:
  ```
  /* /index.html 200
  ```
- No `wrangler.toml` needed for a static SPA

---

## Out of Scope (v1)

- Search across presentations
- Authentication / admin panel  
- CMS or database
- i18n (content is Czech-only)
- Dark mode
- PDF export of slides (Reveal.js supports it via `?print-pdf` — available for free, no work needed)

---

## Lecturer Workflow Summary

1. Open `src/data/subjects.ts` — add your subject entry (slug, title, your name, description, accent color)
2. Create `public/slides/your-slug.md` — write slides using `---` between them
3. `npm run dev` — preview locally at `localhost:5173`
4. `git push` — Cloudflare Pages deploys automatically within ~1 minute
