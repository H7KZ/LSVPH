# LŠVPH Portal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a Vite + React + TypeScript portal for LŠVPH with bold/editorial styling, Reveal.js markdown presentations, and a CLAUDE.md for the AI-assisted lecturer workflow.

**Architecture:** Single-page React app with React Router v7. All pages share a `Layout` with `Nav`. The `Presentation` page breaks out of the layout and renders a full-screen Reveal.js deck loaded from a static markdown file in `public/slides/`. Subject metadata in `src/data/subjects.ts` is the single source of truth — lecturers add one entry there and create one `.md` file to register a subject.

**Tech Stack:** Vite, React 19, TypeScript (strict), TailwindCSS v4 (`@tailwindcss/vite`), React Router v7, `@revealjs/react`, ESLint (`typescript-eslint`), Prettier (`prettier-plugin-tailwindcss`), npm, Vitest

---

## File Map

```
L-VPH/
├── public/
│   ├── slides/
│   │   ├── csharp.md        template — C# programming
│   │   ├── 2d.md            template — 2D graphics / Figma
│   │   ├── 3d.md            template — 3D graphics / Blender
│   │   ├── gamedesign.md    template — game design
│   │   └── unity.md         template — Unity
│   └── _redirects           /* /index.html 200
├── src/
│   ├── data/
│   │   ├── subjects.ts      Subject type + subjects array + findSubjectBySlug()
│   │   ├── subjects.test.ts data integrity tests
│   │   ├── timetable.ts     TimeSlot + DaySchedule types + placeholder data
│   │   └── lunch.ts         LunchDay type + placeholder data
│   ├── components/
│   │   ├── Nav.tsx          site-wide nav bar
│   │   ├── Layout.tsx       Nav + <Outlet /> wrapper
│   │   └── SubjectCard.tsx  reusable subject card with accent strip
│   ├── pages/
│   │   ├── Home.tsx         hero + 3 nav cards + subject grid
│   │   ├── Timetable.tsx    days-as-rows × times-as-columns grid
│   │   ├── Lunch.tsx        weekly menu cards
│   │   ├── Subjects.tsx     full subject grid
│   │   ├── Presentation.tsx full-screen Reveal.js deck
│   │   └── NotFound.tsx     404 page
│   ├── App.tsx              BrowserRouter + Routes
│   ├── main.tsx             ReactDOM entry
│   └── index.css            Tailwind v4 @import + Google Fonts + @theme vars
├── .claude/
│   └── CLAUDE.md            AI agent instructions for lecturers
├── index.html
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json
├── eslint.config.js
├── .prettierrc.json         (already exists — update)
├── .prettierignore          (already exists — update)
└── package.json
```

---

## Task 1: Scaffold Vite React TypeScript project

**Files:**
- Create: all Vite template files in project root
- Modify: `index.html`

- [ ] **Step 1: Scaffold in current directory**

Run from `C:/Users/honzi/Documents/GitHub/L-VPH/`:

```bash
npm create vite@latest . -- --template react-ts
```

If prompted about non-empty directory, confirm with `y`. Existing files (`.prettierrc.json`, `README.md`, `.editorconfig`) are preserved.

- [ ] **Step 2: Remove default boilerplate**

```bash
rm src/App.css src/assets/react.svg public/vite.svg
```

- [ ] **Step 3: Update index.html**

```html
<!doctype html>
<html lang="cs">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LŠVPH 2026</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Verify scaffold runs**

```bash
npm install && npm run dev
```

Expected: dev server starts at `http://localhost:5173`, default Vite+React page loads.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite React TypeScript project"
```

---

## Task 2: Install all dependencies

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install production dependencies**

```bash
npm install react-router-dom @revealjs/react reveal.js
```

- [ ] **Step 2: Install dev dependencies**

```bash
npm install -D @tailwindcss/vite tailwindcss prettier prettier-plugin-tailwindcss eslint typescript-eslint @eslint/js globals vitest jsdom
```

- [ ] **Step 3: Add format and test scripts to package.json**

Open `package.json`. The Vite template already includes `dev`, `build`, `lint`, `preview`. Add the missing two to the `scripts` section:

```json
"format": "prettier --write .",
"test": "vitest run"
```

Final scripts block:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "format": "prettier --write .",
    "test": "vitest run"
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install all project dependencies"
```

---

## Task 3: Configure Vite + TailwindCSS v4 + Vitest

**Files:**
- Modify: `vite.config.ts`

- [ ] **Step 1: Replace vite.config.ts**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
  },
})
```

Note: no `globals: true` — tests will use explicit imports from `'vitest'`.

- [ ] **Step 2: Verify TypeScript config**

Open `tsconfig.app.json` (or `tsconfig.json` if that's the only one). Ensure these are present under `compilerOptions`:

```json
"strict": true,
"jsx": "react-jsx"
```

The Vite react-ts template sets both correctly — just verify, don't change unless missing.

- [ ] **Step 3: Commit**

```bash
git add vite.config.ts
git commit -m "chore: configure Vite with TailwindCSS v4 plugin and Vitest"
```

---

## Task 4: Base styles, fonts, ESLint, Prettier

**Files:**
- Modify: `src/index.css`
- Modify: `src/main.tsx`
- Modify: `.prettierrc.json`
- Modify: `.prettierignore`
- Create: `eslint.config.js`

- [ ] **Step 1: Replace src/index.css**

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');
@import "tailwindcss";

@theme {
  --color-accent: #facc15;
  --color-ink: #000000;
  --color-muted: #555555;
  --color-bg: #fafaf5;
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'DM Sans', sans-serif;
}

html,
body,
#root {
  height: 100%;
}

body {
  background-color: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-body);
}
```

The `@import url(...)` must precede `@import "tailwindcss"` — CSS requires `@import` statements to come in order before all other rules.

- [ ] **Step 2: Replace src/main.tsx**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 3: Replace .prettierrc.json**

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

- [ ] **Step 4: Replace .prettierignore**

```
dist/
node_modules/
.claude/
public/slides/
.superpowers/
```

- [ ] **Step 5: Create eslint.config.js**

```js
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
)
```

- [ ] **Step 6: Run format and lint**

```bash
npm run format && npm run lint
```

Expected: Prettier reformats files. ESLint reports no errors (the default `App.tsx` from the template may need a quick fix if it imports the deleted `App.css` — delete that import if present).

- [ ] **Step 7: Commit**

```bash
git add src/index.css src/main.tsx .prettierrc.json .prettierignore eslint.config.js
git commit -m "chore: configure styles, fonts, Prettier, and ESLint"
```

---

## Task 5: Data layer

**Files:**
- Create: `src/data/subjects.ts`
- Create: `src/data/subjects.test.ts`
- Create: `src/data/timetable.ts`
- Create: `src/data/lunch.ts`

- [ ] **Step 1: Write failing test**

Create `src/data/subjects.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { subjects, findSubjectBySlug } from './subjects'

describe('subjects', () => {
  it('every subject has all required fields', () => {
    for (const s of subjects) {
      expect(typeof s.slug).toBe('string')
      expect(s.slug.length).toBeGreaterThan(0)
      expect(typeof s.title).toBe('string')
      expect(typeof s.lecturer).toBe('string')
      expect(typeof s.description).toBe('string')
      expect(s.accent).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })

  it('findSubjectBySlug finds existing subject', () => {
    const result = findSubjectBySlug('csharp')
    expect(result?.slug).toBe('csharp')
  })

  it('findSubjectBySlug returns undefined for unknown slug', () => {
    expect(findSubjectBySlug('nonexistent')).toBeUndefined()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npm test
```

Expected: FAIL — `Cannot find module './subjects'`

- [ ] **Step 3: Create src/data/subjects.ts**

```ts
export type Subject = {
  slug: string
  title: string
  lecturer: string
  description: string
  accent: string // hex color, applied via style={{ backgroundColor: subject.accent }}
}

export const subjects: Subject[] = [
  {
    slug: 'csharp',
    title: 'Základy programování v C#',
    lecturer: 'Jan Komínek',
    description: 'Proměnné, podmínky, cykly, třídy a základy OOP.',
    accent: '#dbeafe',
  },
  {
    slug: '2d',
    title: 'Základy 2D grafiky',
    lecturer: 'Jan Komínek',
    description: 'Vektorová vs. rastrová grafika. Práce ve Figmě.',
    accent: '#fce7f3',
  },
  {
    slug: '3d',
    title: 'Základy 3D grafiky',
    lecturer: 'TBD',
    description: 'Blender pro herní vývojáře. Tvorba a export herních assetů.',
    accent: '#dcfce7',
  },
  {
    slug: 'gamedesign',
    title: 'Úvod do Game Designu',
    lecturer: 'TBD',
    description: 'Co dělá hru zábavnou. Herní mechaniky, smyčky, balance.',
    accent: '#fff7ed',
  },
  {
    slug: 'unity',
    title: 'Vývoj v Unity',
    lecturer: 'TBD',
    description: 'GameObjects, komponenty, fyzika a tvorba první 3D hry.',
    accent: '#f0fdf4',
  },
]

export function findSubjectBySlug(slug: string): Subject | undefined {
  return subjects.find((s) => s.slug === slug)
}
```

- [ ] **Step 4: Run test — verify it passes**

```bash
npm test
```

Expected: PASS — 3 tests passing.

- [ ] **Step 5: Create src/data/timetable.ts**

```ts
export type TimeSlot = {
  time: string
  isLunch?: true
}

export type DaySchedule = {
  day: string
  date: string
  slots: (string | null)[] // parallel to timeSlots; string = subject slug, null = free slot
}

export const timeSlots: TimeSlot[] = [
  { time: '9:00–10:30' },
  { time: '10:45–12:15' },
  { time: '12:15–13:00', isLunch: true },
  { time: '13:00–14:30' },
  { time: '14:45–16:00' },
]

// ponytail: placeholder schedule — replace with actual timetable before school starts
export const schedule: DaySchedule[] = [
  { day: 'Pondělí', date: '30. 6.', slots: ['csharp', 'csharp', null, 'unity', 'unity'] },
  { day: 'Úterý', date: '1. 7.', slots: ['2d', '2d', null, '3d', '3d'] },
  { day: 'Středa', date: '2. 7.', slots: ['gamedesign', 'gamedesign', null, 'csharp', 'csharp'] },
  { day: 'Čtvrtek', date: '3. 7.', slots: ['unity', '2d', null, 'gamedesign', '3d'] },
  { day: 'Pátek', date: '4. 7.', slots: ['3d', 'unity', null, 'gamedesign', 'csharp'] },
]
```

- [ ] **Step 6: Create src/data/lunch.ts**

```ts
export type LunchDay = {
  day: string
  date: string
  soup: string
  main: string
  note?: string
}

// ponytail: placeholder menu — replace with actual menu before school starts
export const lunchMenu: LunchDay[] = [
  {
    day: 'Pondělí',
    date: '30. 6.',
    soup: 'Hovězí vývar s nudlemi',
    main: 'Svíčková na smetaně, houskový knedlík',
  },
  {
    day: 'Úterý',
    date: '1. 7.',
    soup: 'Rajská polévka',
    main: 'Smažený řízek, bramborový salát',
  },
  {
    day: 'Středa',
    date: '2. 7.',
    soup: 'Česnečka',
    main: 'Kuřecí na paprice, rýže',
  },
  {
    day: 'Čtvrtek',
    date: '3. 7.',
    soup: 'Zeleninová polévka',
    main: 'Vepřová pečeně, bramborové knedlíky, zelí',
  },
  {
    day: 'Pátek',
    date: '4. 7.',
    soup: 'Gulášová polévka',
    main: 'Párek v rohlíku (výlet / volný program)',
    note: 'Páteční oběd závisí na programu dne.',
  },
]
```

- [ ] **Step 7: Commit**

```bash
git add src/data/
git commit -m "feat: add data layer — subjects, timetable, lunch"
```

---

## Task 6: Nav and Layout components

**Files:**
- Create: `src/components/Nav.tsx`
- Create: `src/components/Layout.tsx`

- [ ] **Step 1: Create src/components/Nav.tsx**

```tsx
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/timetable', label: 'Rozvrh' },
  { to: '/lunch', label: 'Oběd' },
  { to: '/subjects', label: 'Předměty' },
]

export default function Nav() {
  return (
    <header className="border-b-2 border-ink">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink
          to="/"
          className="font-display text-lg font-bold tracking-tight text-ink hover:text-muted"
        >
          LŠVPH·26
        </NavLink>
        <ul className="flex gap-6">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `font-display text-xs font-bold uppercase tracking-widest transition-colors ${
                    isActive ? 'text-accent' : 'text-ink hover:text-muted'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Create src/components/Layout.tsx**

```tsx
import { Outlet } from 'react-router-dom'
import Nav from './Nav'

export default function Layout() {
  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx src/components/Layout.tsx
git commit -m "feat: add Nav and Layout components"
```

---

## Task 7: SubjectCard component

**Files:**
- Create: `src/components/SubjectCard.tsx`

- [ ] **Step 1: Create src/components/SubjectCard.tsx**

```tsx
import { Link } from 'react-router-dom'
import type { Subject } from '../data/subjects'

type Props = {
  subject: Subject
}

export default function SubjectCard({ subject }: Props) {
  return (
    <Link
      to={`/subject/${subject.slug}`}
      className="group block border-2 border-ink transition-transform hover:-translate-y-0.5"
    >
      <div className="h-2 w-full" style={{ backgroundColor: subject.accent }} />
      <div className="p-5">
        <p className="mb-1 font-display text-xs font-bold uppercase tracking-widest text-muted">
          {subject.lecturer}
        </p>
        <h3 className="mb-2 font-display text-lg font-bold leading-tight text-ink">
          {subject.title}
        </h3>
        <p className="text-sm text-muted">{subject.description}</p>
        <p className="mt-4 font-display text-xs font-bold uppercase tracking-widest text-ink group-hover:text-accent">
          Otevřít →
        </p>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SubjectCard.tsx
git commit -m "feat: add SubjectCard component"
```

---

## Task 8: Home page

**Files:**
- Create: `src/pages/Home.tsx`

- [ ] **Step 1: Create src/pages/Home.tsx**

```tsx
import { Link } from 'react-router-dom'
import { subjects } from '../data/subjects'
import SubjectCard from '../components/SubjectCard'

const navCards = [
  { to: '/timetable', label: 'Rozvrh', desc: 'Rozvrh hodin na celý týden' },
  { to: '/lunch', label: 'Oběd', desc: 'Jídelníček na každý den' },
  { to: '/subjects', label: 'Předměty', desc: 'Všechny přednášky a materiály' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mb-12 border-b-2 border-ink pb-12">
        <p className="mb-2 font-display text-xs font-bold uppercase tracking-widest text-muted">
          Letní škola · SSPŠ
        </p>
        <h1 className="font-display text-6xl font-extrabold leading-none tracking-tight text-ink md:text-8xl">
          LŠVPH
          <br />
          2026
        </h1>
        <div className="mt-6 inline-block bg-accent px-4 py-2">
          <span className="font-display text-sm font-bold uppercase tracking-widest text-ink">
            Vývoj počítačových her · 30. 6. – 4. 7. · Praha
          </span>
        </div>
      </section>

      {/* Nav cards */}
      <section className="mb-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {navCards.map(({ to, label, desc }) => (
            <Link
              key={to}
              to={to}
              className="group border-2 border-ink p-6 transition-colors hover:bg-accent"
            >
              <h2 className="font-display text-xl font-bold uppercase tracking-widest text-ink">
                {label} →
              </h2>
              <p className="mt-1 text-sm text-muted group-hover:text-ink">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Subject preview */}
      <section>
        <p className="mb-6 font-display text-xs font-bold uppercase tracking-widest text-muted">
          Předměty
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s) => (
            <SubjectCard key={s.slug} subject={s} />
          ))}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat: add Home page"
```

---

## Task 9: Timetable page

**Files:**
- Create: `src/pages/Timetable.tsx`

- [ ] **Step 1: Create src/pages/Timetable.tsx**

```tsx
import { Link } from 'react-router-dom'
import { schedule, timeSlots } from '../data/timetable'
import { findSubjectBySlug } from '../data/subjects'

export default function Timetable() {
  return (
    <div>
      <Link
        to="/"
        className="mb-8 inline-block font-display text-xs font-bold uppercase tracking-widest text-muted hover:text-ink"
      >
        ← Zpět
      </Link>

      <h1 className="mb-2 font-display text-5xl font-extrabold uppercase tracking-tight text-ink">
        Rozvrh
      </h1>
      <div className="mb-8 inline-block bg-accent px-4 py-2">
        <span className="font-display text-xs font-bold uppercase tracking-widest text-ink">
          LŠVPH 2026 · 30. 6. – 4. 7.
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-ink text-accent">
              <th className="border-2 border-ink px-4 py-3 text-left font-display text-xs font-bold uppercase tracking-widest">
                Den
              </th>
              {timeSlots.map((slot) => (
                <th
                  key={slot.time}
                  className={`border-2 border-ink px-4 py-3 font-display text-xs font-bold uppercase tracking-widest ${
                    slot.isLunch ? 'bg-muted' : ''
                  }`}
                >
                  {slot.isLunch ? '🍽 Oběd' : slot.time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule.map((day) => (
              <tr key={day.day}>
                <td className="border-2 border-ink px-4 py-3">
                  <span className="font-display text-sm font-bold text-ink">{day.day}</span>
                  <br />
                  <span className="text-xs text-muted">{day.date}</span>
                </td>
                {timeSlots.map((slot, i) => {
                  if (slot.isLunch) {
                    return (
                      <td
                        key={slot.time}
                        className="border-2 border-ink bg-accent px-4 py-3 text-center"
                      >
                        <span className="font-display text-xs font-bold uppercase tracking-widest text-ink">
                          Oběd
                        </span>
                      </td>
                    )
                  }
                  const slug = day.slots[i]
                  const subject = slug ? findSubjectBySlug(slug) : null
                  return (
                    <td
                      key={slot.time}
                      className="border-2 border-ink px-4 py-3"
                      style={{ backgroundColor: subject?.accent }}
                    >
                      {subject ? (
                        <Link
                          to={`/subject/${subject.slug}`}
                          className="font-display text-xs font-bold text-ink hover:underline"
                        >
                          {subject.title}
                        </Link>
                      ) : (
                        <span className="text-muted">–</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Timetable.tsx
git commit -m "feat: add Timetable page"
```

---

## Task 10: Lunch page

**Files:**
- Create: `src/pages/Lunch.tsx`

- [ ] **Step 1: Create src/pages/Lunch.tsx**

```tsx
import { Link } from 'react-router-dom'
import { lunchMenu } from '../data/lunch'

export default function Lunch() {
  return (
    <div>
      <Link
        to="/"
        className="mb-8 inline-block font-display text-xs font-bold uppercase tracking-widest text-muted hover:text-ink"
      >
        ← Zpět
      </Link>

      <h1 className="mb-2 font-display text-5xl font-extrabold uppercase tracking-tight text-ink">
        Jídelníček
      </h1>
      <div className="mb-8 inline-block bg-accent px-4 py-2">
        <span className="font-display text-xs font-bold uppercase tracking-widest text-ink">
          LŠVPH 2026 · 30. 6. – 4. 7.
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lunchMenu.map((day) => (
          <div key={day.day} className="border-2 border-ink p-5">
            <div className="mb-3 border-b-2 border-ink pb-3">
              <p className="font-display text-xs font-bold uppercase tracking-widest text-muted">
                {day.date}
              </p>
              <h2 className="font-display text-xl font-bold text-ink">{day.day}</h2>
            </div>
            <p className="mb-1 text-xs uppercase tracking-widest text-muted">Polévka</p>
            <p className="mb-3 text-sm text-ink">{day.soup}</p>
            <p className="mb-1 text-xs uppercase tracking-widest text-muted">Hlavní chod</p>
            <p className="text-sm text-ink">{day.main}</p>
            {day.note && (
              <p className="mt-3 border-t border-muted/30 pt-3 text-xs text-muted">{day.note}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Lunch.tsx
git commit -m "feat: add Lunch page"
```

---

## Task 11: Subjects page

**Files:**
- Create: `src/pages/Subjects.tsx`

- [ ] **Step 1: Create src/pages/Subjects.tsx**

```tsx
import { Link } from 'react-router-dom'
import { subjects } from '../data/subjects'
import SubjectCard from '../components/SubjectCard'

export default function Subjects() {
  return (
    <div>
      <Link
        to="/"
        className="mb-8 inline-block font-display text-xs font-bold uppercase tracking-widest text-muted hover:text-ink"
      >
        ← Zpět
      </Link>

      <h1 className="mb-2 font-display text-5xl font-extrabold uppercase tracking-tight text-ink">
        Předměty
      </h1>
      <div className="mb-8 inline-block bg-accent px-4 py-2">
        <span className="font-display text-xs font-bold uppercase tracking-widest text-ink">
          {subjects.length} přednášek · LŠVPH 2026
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s) => (
          <SubjectCard key={s.slug} subject={s} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Subjects.tsx
git commit -m "feat: add Subjects page"
```

---

## Task 12: NotFound page

**Files:**
- Create: `src/pages/NotFound.tsx`

NotFound is created before Presentation because Presentation imports it.

- [ ] **Step 1: Create src/pages/NotFound.tsx**

```tsx
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-start justify-center">
      <p className="mb-2 font-display text-xs font-bold uppercase tracking-widest text-muted">
        404
      </p>
      <h1 className="mb-6 font-display text-5xl font-extrabold text-ink">Stránka nenalezena</h1>
      <Link
        to="/"
        className="border-2 border-ink px-6 py-3 font-display text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-accent"
      >
        ← Zpět domů
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/NotFound.tsx
git commit -m "feat: add NotFound page"
```

---

## Task 13: Presentation page

**Files:**
- Create: `src/pages/Presentation.tsx`

- [ ] **Step 1: Create src/pages/Presentation.tsx**

```tsx
import { useParams, Link } from 'react-router-dom'
import { Deck, Markdown } from '@revealjs/react'
import RevealHighlight from 'reveal.js/plugin/highlight'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/white.css'
import 'reveal.js/plugin/highlight/monokai.css'
import { findSubjectBySlug } from '../data/subjects'
import NotFound from './NotFound'

export default function Presentation() {
  const { slug } = useParams<{ slug: string }>()
  const subject = findSubjectBySlug(slug ?? '')

  if (!subject) return <NotFound />

  return (
    <div className="fixed inset-0 bg-white">
      <div className="absolute left-4 top-4 z-50">
        <Link
          to="/subjects"
          className="font-display text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black"
        >
          ← Zpět
        </Link>
      </div>
      <Deck
        config={{
          hash: true,
          transition: 'slide',
          slideNumber: true,
          width: 1280,
          height: 720,
        }}
        plugins={[RevealHighlight]}
      >
        <Markdown
          src={`/slides/${subject.slug}.md`}
          separator="^\n---\n$"
          verticalSeparator="^\n--\n$"
        />
      </Deck>
    </div>
  )
}
```

`fixed inset-0` takes the deck full-screen, bypassing the Layout wrapper. The Reveal.js `white` theme CSS is scoped to `.reveal *` so it doesn't bleed into the portal.

- [ ] **Step 2: Commit**

```bash
git add src/pages/Presentation.tsx
git commit -m "feat: add Presentation page with Reveal.js markdown integration"
```

---

## Task 14: App router

**Files:**
- Create: `src/App.tsx`

- [ ] **Step 1: Create src/App.tsx**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Timetable from './pages/Timetable'
import Lunch from './pages/Lunch'
import Subjects from './pages/Subjects'
import Presentation from './pages/Presentation'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/lunch" element={<Lunch />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Presentation is outside Layout — it goes full-screen */}
        <Route path="/subject/:slug" element={<Presentation />} />
      </Routes>
    </BrowserRouter>
  )
}
```

- [ ] **Step 2: Run tests and dev server**

```bash
npm test
```

Expected: PASS — 3 tests passing.

```bash
npm run dev
```

Open `http://localhost:5173` and manually verify:
- `/` — hero renders, 3 nav cards, 5 subject cards
- `/timetable` — 5-day table with correct structure
- `/lunch` — 5 lunch cards
- `/subjects` — 5 subject cards
- Click any subject card → `/subject/csharp` — Reveal.js deck loads (slides not yet added)
- `/anything` → 404 page

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: wire up App router with all routes"
```

---

## Task 15: Slide template files

**Files:**
- Create: `public/slides/csharp.md`
- Create: `public/slides/2d.md`
- Create: `public/slides/3d.md`
- Create: `public/slides/gamedesign.md`
- Create: `public/slides/unity.md`

Each file is a working template. Lecturers replace the body slides with their own content.

- [ ] **Step 1: Create public/slides/csharp.md**

````markdown
## Základy programování v C#

Jan Komínek · LŠVPH 2026

---

## Obsah

- Proměnné a datové typy
- Podmínky (`if` / `else`)
- Cykly (`while`, `for`, `foreach`)
- Metody
- Třídy a objekty

---

## Váš první program

```csharp
Console.WriteLine("Ahoj, LŠVPH!");
```

> Spusťte v Visual Studiu nebo Rideru

---

## Nahraďte tyto snímky

Syntaxe:
- `---` na samostatném řádku = další snímek
- `--` na samostatném řádku = vnořený snímek (svisle)
- `Notes:` na konci snímku = poznámky přednášejícího

Notes:
Stiskněte S pro speaker view. Studenti tyto poznámky nevidí.
````

- [ ] **Step 2: Create public/slides/2d.md**

````markdown
## Základy 2D grafiky

Jan Komínek · LŠVPH 2026

---

## Obsah

- Rastrová vs. vektorová grafika
- Seznámení s Figmou
- Praktická cvičení

---

## Rastrová grafika

Složena z **pixelů**.

Příklady: fotografie, PNG, JPG

Při zvětšení dochází k pixelizaci.

---

## Vektorová grafika

Složena z **matematických objektů** — křivek a bodů.

Příklady: SVG, loga, ikony

Nekonečně škálovatelná bez ztráty kvality.

---

## Nahraďte tyto snímky

Doplňte obsah ke svému tématu.
````

- [ ] **Step 3: Create public/slides/3d.md**

```markdown
## Základy 3D grafiky

Přednášející · LŠVPH 2026

---

## Obsah

- Co je Blender a k čemu slouží
- Základní ovládání
- Modelování herního assetu
- Export do Unity

---

## Nahraďte tyto snímky

Doplňte obsah ke svému tématu.
```

- [ ] **Step 4: Create public/slides/gamedesign.md**

```markdown
## Úvod do Game Designu

Přednášející · LŠVPH 2026

---

## Co je Game Design?

Není to programování.

Není to kreslení.

Je to **navrhování zážitků**.

---

## Herní smyčka

Akce → Výsledek → Zpětná vazba → Akce

---

## Nahraďte tyto snímky

Doplňte obsah ke svému tématu.
```

- [ ] **Step 5: Create public/slides/unity.md**

````markdown
## Vývoj v Unity

Přednášející · LŠVPH 2026

---

## Co je Unity?

Herní engine pro 2D a 3D hry.

Použí se pro mobilní hry, PC hry, VR/AR.

---

## GameObjects a Komponenty

**GameObject** = prázdný kontejner

**Komponenta** = chování (fyzika, renderer, skript)

---

## Váš první skript

```csharp
void Update() {
    transform.Translate(Vector3.forward * Time.deltaTime);
}
```

---

## Nahraďte tyto snímky

Doplňte obsah ke svému tématu.
````

- [ ] **Step 6: Test a presentation in the browser**

```bash
npm run dev
```

Navigate to `http://localhost:5173/subject/csharp`. Expected: Reveal.js deck loads, arrow keys navigate between slides, `S` opens speaker view with notes.

- [ ] **Step 7: Commit**

```bash
git add public/slides/
git commit -m "feat: add slide template files for all subjects"
```

---

## Task 16: Cloudflare Pages config

**Files:**
- Create: `public/_redirects`

- [ ] **Step 1: Create public/_redirects**

```
/* /index.html 200
```

This single line tells Cloudflare Pages to serve `index.html` for every route, letting React Router's `BrowserRouter` handle navigation client-side.

- [ ] **Step 2: Verify it ends up in the build output**

```bash
npm run build
```

Expected:
- `dist/` is created
- `dist/_redirects` exists (Vite copies all files from `public/` to `dist/` automatically)
- `dist/slides/csharp.md` exists (same reason)
- No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add public/_redirects
git commit -m "chore: add Cloudflare Pages SPA redirect rule"
```

---

## Task 17: CLAUDE.md

**Files:**
- Create: `.claude/CLAUDE.md`

- [ ] **Step 1: Create .claude/CLAUDE.md**

```markdown
# LŠVPH Portal — Claude Instructions

This is the web portal for **Letní Škola Vývoje Počítačových Her (LŠVPH)** — a one-week summer school teaching game development fundamentals to 8th and 9th grade students at SSPŠ Prague.

Portal: Vite + React + TypeScript + TailwindCSS v4 + Reveal.js. Deployed on Cloudflare Pages.

---

## Adding or Updating a Presentation

### Step 1 — Register the subject

Edit `src/data/subjects.ts`. Add an entry to the `subjects` array:

```ts
{
  slug: 'your-slug',          // URL-safe, e.g. 'audio' — must match the .md filename
  title: 'Název předmětu',
  lecturer: 'Vaše Jméno',
  description: 'Krátký popis, 1–2 věty.',
  accent: '#fef9c3',          // hex color for the card accent strip
}
```

### Step 2 — Write your slides

Create `public/slides/your-slug.md`. The filename must match the `slug` from Step 1.

**Slide syntax:**

```
## Název snímku

Obsah snímku — podporuje **tučné**, *kurzívu*, `kód`, odrážky, tabulky.

---

## Další snímek (vodorovně)

--

## Vnořený snímek (svisle pod předchozím)

---

## Snímek s kódem

    ```csharp
    int x = 5;
    Console.WriteLine(x);
    ```

---

## Snímek s fragmenty (postupné zobrazení)

<ul>
  <li class="fragment">Ukáže se první</li>
  <li class="fragment fade-up">Ukáže se druhé</li>
</ul>

Notes:
Poznámky přednášejícího — studenti je nevidí.
Stiskněte S pro speaker view.
```

**Separátory (prázdný řádek před i za):**
- `---` → další snímek (vodorovně)
- `--` → vnořený snímek (svisle)
- `Notes:` na konci snímku → poznámky pro přednášejícího

### Step 3 — Preview locally

```bash
npm run dev
```

Open `http://localhost:5173/subject/your-slug`.

### Step 4 — Deploy

```bash
git add src/data/subjects.ts public/slides/your-slug.md
git commit -m "feat: add [název předmětu] presentation"
git push
```

Cloudflare Pages deploys automatically within ~1 minute.

---

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| Background | `#fafaf5` | Page background |
| Accent | `#facc15` | Yellow highlights, hover states |
| Ink | `#000000` | Text, borders |
| Muted | `#555555` | Subtitles, labels |
| Heading font | Space Grotesk | Titles, nav, labels |
| Body font | DM Sans | Descriptions, body copy |

---

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at `localhost:5173` |
| `npm run build` | Production build to `dist/` |
| `npm run lint` | ESLint check |
| `npm run format` | Prettier format |
| `npm test` | Vitest tests |

---

## What NOT to Change

Unless you maintain the portal itself, leave these alone:

- `src/components/` — Nav, Layout, SubjectCard
- `src/pages/` — page components (read for reference, don't edit)
- `src/App.tsx` — router
- `src/index.css` — global styles
- `vite.config.ts`, `tsconfig.json`, `eslint.config.js`
- `public/_redirects`

**Only two files per subject:** `src/data/subjects.ts` (one entry) + `public/slides/slug.md`.

---

## Architecture

```
src/data/subjects.ts     ← subject metadata (slug, title, lecturer, color)
src/data/timetable.ts    ← week schedule — update before school starts
src/data/lunch.ts        ← daily menus — update before school starts
src/pages/               ← one component per route
src/components/          ← Nav, Layout, SubjectCard
public/slides/*.md       ← presentation content — lecturers write here
public/_redirects        ← Cloudflare SPA fallback
```

Route `/subject/:slug` renders a full-screen Reveal.js deck by fetching `/slides/:slug.md` as a static file. No build step needed for slide changes — just push the `.md` file.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/CLAUDE.md
git commit -m "docs: add CLAUDE.md for AI-assisted lecturer workflow"
```

---

## Task 18: Final verification

- [ ] **Step 1: Run all checks**

```bash
npm test && npm run lint && npm run build
```

Expected:
- Tests: 3 passing
- Lint: 0 errors
- Build: success, `dist/` created with `_redirects` and all slide `.md` files

- [ ] **Step 2: Smoke-test all routes via preview**

```bash
npm run preview
```

Open `http://localhost:4173` and verify each route:

| Route | Expected |
|---|---|
| `/` | Hero with LŠVPH 2026, 3 nav cards, 5 subject cards |
| `/timetable` | 5-row × 5-col table, lunch column yellow |
| `/lunch` | 5 cards with soup + main + optional note |
| `/subjects` | 5 subject cards with accent color strip |
| `/subject/csharp` | Full-screen Reveal.js deck, arrow key navigation |
| `/subject/nonexistent` | 404 page |
| `/anything` | 404 page |

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: final verification pass"
```

---

## Deployment Checklist (Cloudflare Pages)

After all tasks are done, connect the repo to Cloudflare Pages:

1. Go to Cloudflare Pages → Create a project → Connect to Git → select `L-VPH`
2. Set build command: `npm run build`
3. Set build output directory: `dist`
4. Environment variables: none needed
5. Deploy — `dist/_redirects` handles SPA routing automatically
6. Every `git push` to `main` triggers a new deploy
