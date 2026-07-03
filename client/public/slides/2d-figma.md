## Figma: Tvoříme jako profíci

Vektorová grafika v prohlížeči — zdarma, bez instalace.

_Základy 2D grafiky · LŠVPH 2026_

Notes:
Zeptat se: "Kdo už někdy slyšel o Figmě?" Cílem je zbořit strach — dnes vytvoříme grafiku, kterou herní studia platí
designérům tisíce dolarů za kus.

---

## Vytvoř si účet

Figma je zdarma — stačí e-mail nebo Google účet.

1. Jdi na [figma.com](https://www.figma.com/)
2. Klikni **"Get started for free"**
3. Přihlas se Google účtem (nejrychlejší) nebo zadej e-mail
4. Při dotazu na roli zvol **Student**
5. Klikni **"+ New design file"** — a jsme uvnitř!

Studentský plán zdarma: [figma.com/education](https://www.figma.com/education/)

Notes:
Počkat, než jsou všichni přihlášeni — cca 3 minuty. Pomoci těm, kdo nemají Google účet (mohou použít školní e-mail).
Dokumentace: help.figma.com/hc/en-us/articles/360039811114

---

## Co je Figma?

**Figma** je profesionální designový nástroj v prohlížeči.

- Funguje na Windows, Mac, Linux — stačí Chrome nebo Edge
- Spolupráce v reálném čase (jako Google Docs, ale pro grafiku)
- Používají ho Google, Microsoft, Airbnb, Netflix
- Herní studia navrhují UI — inventáře, HUD, menu

Přejdi na **figma.com** a klikni **"+ New design file"**.

Notes:
Ukázat Figmu otevřenou v prohlížeči. Zmínit, že herní UI designéři, kteří navrhují inventáře a HUD, pracují přesně v
takovém nástroji.

---

## Rozhraní Figmy

<img src="/slides/assets/figma_ui.png" style="width:90%;border:2px solid #000;margin:0 auto;display:block">

Notes:
Ukázat na projektoru živě. Projet každou část — toolbar nahoře, vrstvy vlevo, canvas uprostřed, vlastnosti vpravo.

---

## Toolbar — nástrojová lišta

<div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center">
<div style="text-align:left">
<table>
<tr><th>Klávesa</th><th>Nástroj</th></tr>
<tr><td><strong>V</strong></td><td>Move — výběr a posouvání</td></tr>
<tr><td><strong>R</strong></td><td>Rectangle — obdélník</td></tr>
<tr><td><strong>O</strong></td><td>Ellipse — kruh / elipsa</td></tr>
<tr><td><strong>L</strong></td><td>Line — čára</td></tr>
<tr><td><strong>T</strong></td><td>Text — přidání textu</td></tr>
<tr><td><strong>F</strong></td><td>Frame — pracovní plocha</td></tr>
</table>
<p style="margin-top:1rem">Tip: drž <strong>Shift</strong> při kreslení → dokonalý čtverec nebo kruh.</p>
</div>
<img src="https://help.figma.com/hc/article_attachments/33673944882583" style="width:100%;border:2px solid #000">
</div>

Notes:
Projít každý nástroj živě — stisknout klávesu a ukázat cursor change. Dokumentace:
help.figma.com/hc/en-us/articles/360041064174

---

## Levý panel — Vrstvy a stránky

<div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center">
<div style="text-align:left">
<ul>
<li>Seznam všech objektů ve scéně</li>
<li>Vrstvy jsou jako <strong>štos papírů</strong> — vrstva nahoře je "vpředu"</li>
<li>Klikni na vrstvu → vybereš ji</li>
<li>👁 = skrytí &nbsp;·&nbsp; 🔒 = zamknutí</li>
</ul>
<p style="margin-top:1rem"><strong>Pojmenuj vrstvy!</strong> „Vrstva 1" je chaos, „HP bar pozadí" je přehledné.</p>
</div>
<img src="https://help.figma.com/hc/article_attachments/37506155851799" style="width:100%;border:2px solid #000">
</div>

Notes:
Ukázat live — soubor se špatně pojmenovanými vrstvami vs. dobře pojmenovanými. Chaos vs. pořádek.

---

## Pravý panel — Vlastnosti

<div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center">
<div style="text-align:left">
<ul>
<li>Mění se podle toho, co je vybrané</li>
<li><strong>Fill</strong> — barva výplně</li>
<li><strong>Stroke</strong> — obrys / rámeček</li>
<li><strong>Corner radius</strong> — zaoblení rohů</li>
<li><strong>Opacity</strong> — průhlednost (0–100 %)</li>
<li><strong>Effects</strong> — stín, blur</li>
</ul>
</div>
<img src="https://help.figma.com/hc/article_attachments/31937313497879" style="width:100%;border:2px solid #000">
</div>

Notes:
Ukázat každou vlastnost živě — vybrat obdélník a procházet pravý panel. Zdůraznit, že panel je kontextový.

---

## Základní zkratky

| Zkratka              | Akce                     |
| -------------------- | ------------------------ |
| `Ctrl + Z`           | Zpět                     |
| `Ctrl + G`           | Seskupit vybrané objekty |
| `Ctrl + A`           | Vybrat vše               |
| `Ctrl + D`           | Duplikovat               |
| `Shift` + kreslení   | Dokonalý čtverec / kruh  |
| `Mezerník` + táhnutí | Posun pohledu na canvas  |
| `Ctrl + kolečko`     | Zoom                     |

Plný přehled: [help.figma.com/hc/en-us/articles/360040328653](https://help.figma.com/hc/en-us/articles/360040328653)

Notes:
Projít zkratky živě. Zkratky jsou klíč k rychlé práci. Dát minutu na vyzkoušení.

---

## Tvorba tvarů

<div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center">
<div style="text-align:left">
<ol>
<li>Stiskni <strong>R</strong> → klikni a táhni (drž Shift → čtverec)</li>
<li>Stiskni <strong>O</strong> → klikni a táhni (drž Shift → kruh)</li>
<li>Vyber tvar → pravý panel → změň <strong>Fill</strong></li>
<li>Přetahuj v Layer panelu pro změnu pořadí</li>
</ol>
<p style="margin-top:1rem">Výzva: nakresli 3 tvary, každý jinou barvou.</p>
</div>
<img src="/slides/assets/figma_ui_selected_polygon.png" style="width:100%;border:2px solid #000">
</div>

Notes:
Dát studentům 3 minuty na volné experimentování. Procházet třídou a pomáhat.

---

## Barvy a výplně

Vyber tvar → pravý panel → **Fill** → klikni na barevný čtverec.

Herní paleta — každá barva má svůj význam:

| Hex kód   | Barva   | Herní použití |
| --------- | ------- | ------------- |
| `#E74C3C` | Červená | HP, nebezpečí |
| `#2ECC71` | Zelená  | Léčení, mana  |
| `#F39C12` | Zlatá   | Mince, odměna |
| `#3498DB` | Modrá   | Mana, shield  |
| `#1A1A2E` | Tmavá   | Pozadí UI     |

Notes:
Vysvětlit hex kódy — 6místný kód přesně určuje barvu. Herní designéři mají pečlivě vybrané palety, aby hráč okamžitě
věděl, co barva znamená.

---

## Text a skupiny

**Text:**

- Klávesa `T` → klikni na canvas → piš
- V pravém panelu: font, velikost, barva
- Zkus font `Press Start 2P` — retro herní písmo

**Skupiny:**

- Vyber více objektů (`Ctrl + klik`) → `Ctrl + G` → seskup
- Skupina se pohybuje a škáluje jako celek
- Pojmenuj ji v Layer panelu

Notes:
Ukázat Press Start 2P — Google Font přímo ve Figmě. Studenti ho milují. Ukázat jak se skupina chová jinak než jednotlivé
objekty.

---

## Projekt 1: Herní mince

Tvoříme zlatou minci z RPG hry.

1. **O** → velký kruh (drž Shift) &nbsp;·&nbsp; barva: `#FFD700`
2. **O** → menší kruh uvnitř &nbsp;·&nbsp; barva: `#FFA500`
3. **T** → text `G` nebo `$` &nbsp;·&nbsp; bílá barva &nbsp;·&nbsp; nastav na střed
4. Vyber vše (`Ctrl + A`) → seskup (`Ctrl + G`)
5. Pojmenuj skupinu: `Mince`

Bonus: pravý panel → **Effects** → **+** → Drop Shadow

Čas: **8 minut**

Notes:
Ukázat hotový výsledek jako cíl před začátkem. Projít třídou a pomáhat. Rychlejší studenti přidají stín nebo zkusí
stříbrnou minci.

---

## Projekt 2: HP Bar

Klasický ukazatel zdraví ze hry.

1. **F** → Frame **300 × 50 px** &nbsp;·&nbsp; barva pozadí: `#1A1A2E`
2. **R** → obdélník **230 × 34 px** &nbsp;·&nbsp; barva: `#E74C3C` &nbsp;·&nbsp; zarovnej doleva
3. Pravý panel → Corner Radius = `8`
4. **T** → text `80 / 100` &nbsp;·&nbsp; bílá barva
5. Pojmenuj vrstvy: `HP fill` · `HP label` · `HP background`

Bonus: přidej modrý SHIELD bar pod HP (`#3498DB`)

Čas: **10 minut**

Notes:
HP bar je nejklasičtější herní UI element. Ukázat screenshoty z různých her. Projít třídou. Frame ořezává obsah —
důležitý koncept.

---

## Export

Co s hotovým designem?

1. Vyber objekt nebo skupinu
2. Pravý panel → sjeď dolů → **Export** → klikni **+**
3. Zvol formát:

| Formát  | Kdy použít                           |
| ------- | ------------------------------------ |
| **PNG** | Web, průhledné pozadí, ikony         |
| **SVG** | Vektorový — škálovatelný, pro web    |
| **JPG** | Fotografie a pozadí bez průhlednosti |

4. Klikni **Export [název]**

Dokumentace: [help.figma.com/hc/en-us/articles/360040028114](https://help.figma.com/hc/en-us/articles/360040028114)

Notes:
Exportovat živě — ukázat PNG a SVG ze stejné mince. Ukázat rozdíl velikosti souboru. SVG je vektorový.

---

## Zdroje a co dál

**Figma:**

- [Figma pro začátečníky](https://help.figma.com/hc/en-us/articles/30848209492887)
- [Figma Community — herní UI šablony](https://www.figma.com/community)
- [Klávesové zkratky](https://help.figma.com/hc/en-us/articles/360040328653)

**Pixel Art:**

- [pixilart.com](https://www.pixilart.com/) — kreslení online zdarma
- [Pixel Art tutoriál (YouTube)](https://www.youtube.com/watch?v=LFclLgUQ1zE)

Dobrovolný projekt: navrhni UI obrazovku pro svoji vysněnou hru.

Notes:
Otevřít Figma Community živě a vyhledat "game UI". Ukázat pár příkladů. Domácí úkol je dobrovolný.

Blooket kvíz (jen Figma): https://dashboard.blooket.com/set/6a443d351f805cdd61824a36
Blooket kvíz (2D + Figma + Pixel Art): https://dashboard.blooket.com/set/6a443d5bf2d740c1a8c16d28
