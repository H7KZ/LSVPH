# LŠVPH 2026 — AI Agent Guide

Toto je webový portál Letní Školy Vývoje Počítačových Her (5. ročník, 2026).
Studenti (8.–9. třída ZŠ) jej používají pro přístup k rozvrhu, obědovému menu a prezentacím přednášejících.

---

## Stack

- React 19 + TypeScript (strict) + Vite 8
- TailwindCSS v4 (`@tailwindcss/vite`, `@import "tailwindcss"` v CSS)
- React Router v7 (BrowserRouter)
- `@revealjs/react` pro prezentace načítané z markdown souborů

---

## Datový model

- **Předmět** (`src/data/subjects.ts`) — téma školy, má kartu na `/subjects`.
- **Prezentace** (`src/data/presentations.ts`) — jeden slide deck, patří k předmětu
  (`subjectSlug`). Jeden předmět může mít **více prezentací**. Sekce `/presentations`
  je vypisuje seskupené pod jednotlivými předměty.
- Slajdy každé prezentace: `public/slides/<presentation-slug>.md`.
- Deck se renderuje na `/presentation/<presentation-slug>` (`src/pages/Presentation.tsx`).
  Markdown se nejdřív načte přes `fetch` a teprve pak se mountuje `<Deck>` — jinak
  Reveal nastartuje s prázdnými slajdy a deck zůstane bílý.

## Jak přidat předmět

**1. Přidej záznam do `src/data/subjects.ts`:**

```ts
{
  slug: 'muj-predmet',       // URL-friendly, bez diakritiky, lowercase
  title: 'Název předmětu',
  lecturer: 'Jméno Příjmení',
  description: 'Krátký popis (1–2 věty).',
  accent: '#fef9c3',         // hex barva pozadí karty
}
```

**2. Hotovo.** Karta předmětu je na `/subjects`.

## Jak přidat prezentaci

**1. Vytvoř soubor `public/slides/muj-predmet-uvod.md`** (formát níže).

**2. Přidej záznam do `src/data/presentations.ts`:**

```ts
{ slug: 'muj-predmet-uvod', subjectSlug: 'muj-predmet', title: 'Úvod do předmětu' }
```

**3. Hotovo.** Prezentace je na `/presentation/muj-predmet-uvod` a v sekci Prezentace.

> Sdílený vzhled prezentací je v `src/reveal-theme.css` (přepisuje `theme/white.css`).
> Návod pro přednášející: `docs/jak-delat-prezentace.md`.

---

## Formát markdown slajdů

```markdown
## Název přednášky

---

## Slajd 1

Obsah slajdu

- Odrážka 1
- Odrážka 2

---

## Slajd 2

--

## Vertikální slajd (pod Slajdem 2)

Notes:
Toto jsou poznámky přednášejícího. Stiskni S pro speaker view.
```

**Oddělovače:**

- `---` (prázdný řádek před i za) → další horizontální slajd
- `--` (prázdný řádek před i za) → vertikální slajd (vnořený)
- `Notes:` na konci slajdu → poznámky přednášejícího (klávesa `S`)

**Kódové bloky:**

````markdown
```csharp
int x = 42;
```
````

---

## Designové tokeny

| Token            | Hodnota       | Použití                 |
| ---------------- | ------------- | ----------------------- |
| `--color-accent` | `#facc15`     | žlutá — zvýraznění, nav |
| `--color-ink`    | `#000000`     | text, ohraničení        |
| `--color-muted`  | `#555555`     | popis, vedlejší text    |
| `--color-bg`     | `#fafaf5`     | pozadí stránky          |
| `--font-display` | Space Grotesk | nadpisy                 |
| `--font-body`    | DM Sans       | tělo textu              |

---

## Co NEMĚNIT

- `src/components/` — Nav, Layout, SubjectCard
- `src/pages/` (kromě přidávání nových rout)
- `src/App.tsx` — router konfigurace
- `vite.config.ts`, `tsconfig*.json`

---

## Příkazy

```bash
npm run dev      # vývojový server na localhost:5173
npm run build    # produkční build do dist/
npm run lint     # ESLint kontrola
npm run format   # Prettier formátování
npm test         # Vitest testy datové vrstvy
```

---

## Deployment

`git push` na `main` → Cloudflare Pages automaticky nasadí do ~1 minuty.

- Build command: `npm run build`
- Build output: `dist/`
- SPA fallback: `public/_redirects` (`/* /index.html 200`)
