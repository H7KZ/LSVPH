# Jak dělat prezentace

Návod pro přednášející LŠVPH. Prezentace na portálu nepíšeš v PowerPointu,
ale jako jednoduchý **textový soubor** (Markdown). Z něj se automaticky složí
hezká prezentace, kterou pustíš přímo v prohlížeči.

Nemusíš umět programovat — stačí psát text a oddělovat slajdy.

---

## Jak to funguje

Každý předmět může mít **více prezentací**. Každá prezentace je jeden soubor
`public/slides/<slug>.md`, kde `<slug>` je krátký unikátní název bez diakritiky
(např. `csharp-uvod`, `csharp-promenne`).

Seznam prezentací je v souboru `src/data/presentations.ts`. Prezentace je pak
dostupná na adrese `/presentation/<slug>` a objeví se v sekci **Prezentace**
zařazená pod svým předmětem. O vzhled se nestaráš — všechny prezentace sdílejí
stejný styl LŠVPH automaticky.

### Přidání nové prezentace

1. Vytvoř soubor `public/slides/<slug>.md` (formát viz níže).
2. Přidej záznam do `src/data/presentations.ts`:

    ```ts
    { slug: 'csharp-promenne', subjectSlug: 'csharp', title: 'Proměnné a typy' }
    ```

    `subjectSlug` musí odpovídat předmětu z `src/data/subjects.ts`.

3. Hotovo — prezentace se objeví na `/presentation/csharp-promenne`.

> Chceš úplně nový předmět (ne jen prezentaci)? Postup je v souboru
> `.claude/CLAUDE.md` v sekci „Jak přidat předmět".

---

## Základní stavba souboru

```markdown
## Název přednášky

---

## První slajd

Obsah slajdu.

- Odrážka jedna
- Odrážka dva

---

## Druhý slajd

Další text.
```

**Pravidlo číslo jedna:** jednotlivé slajdy oddělíš třemi pomlčkami `---`,
které mají **prázdný řádek před i za sebou**.

---

## Oddělovače slajdů

| Zápis    | Co udělá                                  |
| -------- | ----------------------------------------- |
| `---`    | nový slajd (vedle sebe, šipka doprava)    |
| `--`     | vnořený slajd (pod aktuálním, šipka dolů) |
| `Notes:` | poznámky přednášejícího (jen pro tebe)    |

Vnořené slajdy (`--`) se hodí, když chceš k jednomu tématu přidat detail,
ke kterému se dostaneš šipkou dolů — ale v hlavním proudu prezentace nepřekáží.

```markdown
## Hlavní téma

Krátké shrnutí.

--

## Detail k hlavnímu tématu

Sem napíšeš podrobnosti.
```

---

## Poznámky přednášejícího

Cokoliv za řádkem `Notes:` na konci slajdu uvidíš jen ty v režimu přednášejícího.
Publikum to nevidí.

```markdown
## Můj slajd

Obsah pro publikum.

Notes:
Tady si připomenu, na co nezapomenout, nebo příklad k ukázce.
```

Režim přednášejícího (s poznámkami, časem a náhledem dalšího slajdu) zapneš
během prezentace klávesou **S**.

---

## Formátování textu

```markdown
**tučně** a _kurzívou_

- odrážka
- další odrážka

1. číslovaný seznam
2. druhý bod

> Citace nebo zvýrazněná myšlenka.
```

Tučný text se na slajdech navíc podbarví žlutě — hodí se na zvýraznění
klíčového pojmu.

---

## Kódové bloky

Kód napíšeš mezi tři zpětné apostrofy (` ``` `) a za první trojici doplníš
jazyk — pak se obarví syntaxe.

````markdown
```csharp
class Player
{
    public int Health = 100;
}
```
````

Funguje to pro `csharp`, `python`, `javascript`, `html` a další běžné jazyky.

### Číslování a zvýraznění řádků (volitelné)

Když chceš ukázat kód po krocích, můžeš zvýraznit konkrétní řádky:

````markdown
```csharp [1|3-4]
int score = 0;
// ...
if (score > 100)
    Console.WriteLine("Výborně!");
```
````

Zápis `[1|3-4]` znamená: nejdřív se zvýrazní řádek 1, po stisku šipky pak
řádky 3 až 4. Hodí se na postupné vysvětlování.

---

## Obrázky

Obrázek nahraj do složky `public/slides/` (klidně do podsložky) a vlož ho takto:

```markdown
![Popis obrázku](/slides/muj-obrazek.png)
```

Cesta začíná `/slides/`, protože odtud se obrázky načítají.

---

## Jak si prezentaci vyzkoušet

1. V terminálu spusť vývojový server:

    ```bash
    npm run dev
    ```

2. Otevři v prohlížeči `http://localhost:5173/presentation/<slug>`
   (např. `http://localhost:5173/presentation/csharp-uvod`).

3. Uprav `.md` soubor, ulož — stránka se obnoví sama.

**Ovládání prezentace:**

- šipky `←` `→` — další / předchozí slajd
- `S` — režim přednášejícího s poznámkami
- `F` — celá obrazovka
- `Esc` — přehled všech slajdů
- `B` — ztlumit obrazovku načerno (pauza)

---

## Pár tipů na závěr

- **Méně textu je víc.** Slajd není dokument — píš hesla, mluv k nim.
- Cílem je **8.–9. třída ZŠ.** Vyhýbej se zbytečnému žargonu, nebo ho hned vysvětli.
- Drž stejnou stavbu jako ostatní úvodní prezentace: _Co se naučíš_ →
  _Proč to stojí za to_ → ukázka → _Nástroje_ → výzva na závěr.
- Když si nejsi jistý zápisem, mrkni na hotové prezentace v `public/slides/`.
