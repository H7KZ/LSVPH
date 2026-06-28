## Figma: Tvoříme jako profíci 🚀

Vektorová grafika v prohlížeči · zdarma · bez instalace

_Základy 2D grafiky · LŠVPH 2026_

Notes:
Úvodní slide. Zeptat se: "Kdo někdy slyšel o Figmě?" a "Kdo si myslí, že návrh grafiky je těžký?" — cílem je zbořit
strach.

---

## Co je Figma?

**Figma** je profesionální designový nástroj, který běží přímo v prohlížeči

- 🆓 Zdarma pro studenty a začátečníky
- 🌐 Windows · Mac · Linux — stačí Chrome nebo Edge
- 👥 Spolupráce v reálném čase (jako Google Docs, ale pro grafiku)
- 🏢 Používají ho týmy v Googlu, Microsoftu, Airbnb, Netflixu…

🎮 A taky herní studia při návrhu herního UI!

Notes:
Ukázat Figmu otevřenou v prohlížeči. Zmínit, že herní UI designéři, kteří navrhují inventáře, mapy a HUD, pracují přesně
v takových nástrojích.

---

## 🚀 Začínáme — 3 kroky

1. Jdi na **figma.com**
2. Klikni **"Get started for free"** → registrace Google účtem
3. V dashboardu klikni **"+ New design file"**

A jsme uvnitř! 🎉

_(Dej mi vědět, jakmile máš otevřený prázdný soubor)_

Notes:
Dát studentům 3–4 minuty na registraci. Projít třídou a pomoci těm, kdo mají problémy. Počkat, než jsou všichni uvnitř,
pak pokračovat.

---

## 🗺️ Rozhraní Figmy — 4 části

```
┌─────────────────────────────────────────┐
│ [Nástroje]       Figma       [Uložení]  │  ← Toolbar
├────────────┬───────────────┬────────────┤
│            │               │            │
│  Vrstvy    │    Canvas     │ Vlastnosti │
│  (vlevo)   │  (uprostřed)  │  (vpravo)  │
│            │               │            │
└────────────┴───────────────┴────────────┘
```

**Canvas** = nekonečná kreslicí plocha · pohybuj se Mezerník + táhnutí

Notes:
Projít každou část živě na projektoru. Zmínit, že Inspector (pravý panel) se mění podle toho, co je vybrané. To bude
důležité při nastavování barev a velikostí.

--

## 🗺️ Layers (Vrstvy) — levý panel

Vrstvy jsou jako **štos papírů** — vrstva nahoře je „vpředu"

- 👁️ = skrytí vrstvy
- 🔒 = zamknutí (nejde omylem pohnout)
- Přetažením vrstev změníš jejich pořadí

💡 **Pojmenuj vrstvy!** "Vrstva 1" je chaos, "HP bar — pozadí" je přehledné

Notes:
Ukázat na konkrétním příkladu — mít nachystaný soubor se 3–4 vrstvami, pojmenovanými i nepojmenovanými. Ukázat chaos vs.
pořádek.

---

## 🛠️ Základní nástroje

| Klávesa | Nástroj   | K čemu             |
| ------- | --------- | ------------------ |
| **V**   | Move      | Výběr a posouvání  |
| **R**   | Rectangle | Obdélník / čtverec |
| **O**   | Ellipse   | Elipsa / kruh      |
| **L**   | Line      | Čára               |
| **T**   | Text      | Přidání textu      |
| **F**   | Frame     | Pracovní plocha    |

💡 **Tip:** Drž **Shift** při kreslení → dokonalý čtverec nebo kruh

Notes:
Projít každý nástroj live, vždy stisknout klávesu a ukázat cursor change. Nechat studenty zkusit každý nástroj.

---

## ▭ Tvary — ZKUS TO!

**Obdélník:**

1. Stiskni **R**
2. Klikni a táhni na canvas
3. Drž **Shift** → dokonalý čtverec

**Kruh:**

4. Stiskni **O**
5. Klikni, táhni, drž **Shift**

🎯 **Výzva:** Nakresli 3 různé tvary — jiná barva každý!

_(Barvu nastavíš v pravém panelu pod „Fill")_

Notes:
Dát studentům 3 minuty na volné experimentování. Procházet třídou a pomáhat. Upozornit na to, jak změna hodnot v pravém
panelu okamžitě mění tvar na canvas.

---

## 🎨 Barvy a výplně

Po kliknutí na tvar → pravý panel → **Fill**:

1. Klikni na **barevný čtverec**
2. Vyber barvu z palety
3. Nebo zadej **hex kód** přímo: `#FF6B6B`

```
Herní palety:
  #E74C3C  →  Červená · HP, nebezpečí
  #2ECC71  →  Zelená  · léčení, mana
  #F39C12  →  Zlatá   · mince, odměna
  #3498DB  →  Modrá   · mana, shield
```

Notes:
Vysvětlit hex kódy — každá barva má přesný šestimístný kód. Ukázat color picker a jak se pohybuje po spektru. Zmínit, že
herní designéři mají pečlivě vybrané palety, aby hráč okamžitě věděl, co barva znamená.

--

## 🎨 Průhlednost a Stroke

**Opacity (průhlednost):**

- V pravém panelu nahoře — číslo **100** = plná barva
- Snižuj na 50, 30, 10 → průhledné překrytí

**Stroke (obrys):**

- V pravém panelu → **Stroke** → klikni **+**
- Nastav barvu a tloušťku (např. 2 nebo 4 px)

🎯 Stroke se hodí pro herní UI tlačítka a rámečky!

Notes:
Ukázat prakticky — nakreslit obdélník, přidat mu tmavý stroke, snížit opacity. Pak ukázat, jak to vypadá jako herní
tlačítko.

---

## ✏️ Text

1. Stiskni **T**
2. Klikni na canvas
3. Napiš cokoliv
4. V pravém panelu:
    - **Font** — zkus `Inter`, `Roboto`, nebo `Press Start 2P` (herní!)
    - **Size** — velikost písma
    - **Color** — barva textu

🎮 **Zkus:** Napiš `GAME OVER` · velká písmena · červená barva · font Press Start 2P

Notes:
Ukázat různé fonty. "Press Start 2P" je Google Font který vypadá jako retro herní text — studenti ho milují. Ukázat kde
ho najít ve Figmě (vyhledat v Font picker).

---

## 🎮 Projekt 1: Herní mince 🪙

Tvoříme zlatou minci z RPG hry!

1. **O** → velký kruh (drž Shift) · barva: `#FFD700`
2. **O** → menší kruh uvnitř · barva: `#FFA500`
3. **T** → text `G` nebo `$` · bílá barva · na střed
4. Vyber vše (**Ctrl+A**) → seskup (**Ctrl+G**)
5. Pojmenuj skupinu: `"Mince"`

⏱️ Čas: **8 minut**

Notes:
Ukázat hotový výsledek jako cíl před tím, než studenti začnou. Projít třídou a pomáhat. Rychlejší studenti mohou přidat
stín: v pravém panelu → Effects → + → Drop Shadow.

--

## 🎮 Projekt 1: Tipy

**Jak vycentrovat text na kruh:**

1. Vyber text a kruh
2. V pravém panelu nahoře → ikony zarovnání
3. Klikni "Align horizontal center" + "Align vertical center"

**Přidat stín (bonus):**

Vyber objekt → pravý panel → **Effects** → **+** → Drop Shadow

Notes:
Tento slide zobrazit jen pokud studenti mají problémy s centrováním nebo se ptají na stín. Jinak ho přeskočit.

---

## 💗 Projekt 2: HP Bar

Klasický ukazatel zdraví ze hry!

1. **F** → Frame **300 × 50 px** · tmavé pozadí `#1A1A2E`
2. **R** → obdélník **230 × 34 px** · barva `#E74C3C` · zarovnej doleva
3. Corner Radius = **8** (zaoblené rohy · v pravém panelu)
4. **T** → text `❤️  80 / 100` · bílá barva
5. Pojmenuj vrstvy: `"HP fill"`, `"HP label"`, `"HP background"`

🎯 **Bonus:** Přidej ještě modrý SHIELD bar pod HP

⏱️ Čas: **10 minut**

Notes:
HP bar je nejklasičtější herní UI element. Ukázat screenshoty z různých her, kde HP bary vypadají různě (Dark Souls,
League of Legends, Stardew Valley). Projít třídou. Corner radius je v pravém panelu — čtverec s kulatými rohy.

--

## 💗 Projekt 2: Hotový výsledek

```
┌──────────────────────────────────┐
│ ❤❤❤   80 / 100                 │   ← Frame
│ ██████████████████████░░░░░░░░░░ │   ← HP fill (červená)
└──────────────────────────────────┘
```

**Variace pro bonus:**

```
┌──────────────────────────────────┐
│ 🛡🛡🛡   50 / 50                  │
│ ████████████████████████████████ │   ← SHIELD fill (modrá)
└──────────────────────────────────┘
```

Notes:
Ukázat jak by vypadal hotový výsledek. Studenti mohou mít různé variace — všechny jsou správné. Pochválit kreativitu.

---

## 🌍 Figma ve světě her

Herní studia používají Figmu na:

- 🗺️ **UI prototypy** — jak bude vypadat inventář nebo menu?
- 🎨 **Ikony a itemy** — meče, lektvary, zbroje, achievementy
- 🖼️ **Splash screeny** — uvítací obrazovky
- 📋 **Design dokumenty** — celý game design doc v jednom souboru
- 🤝 **Spolupráci** — designér + programátor ve stejném souboru live

📁 **Figma Community:** stovky herních UI šablon — zadarmo!

Notes:
Otevřít figma.com/community a vyhledat "game UI". Nechat studenty procházet a najít něco cool. Ukázat konkrétní příklady
herního UI (inventory, skill tree, minimap).

---

## 💾 Export — grafika ven z Figmy

1. Vyber objekt nebo skupinu
2. Pravý panel → sjeď dolů → **Export**
3. Klikni **+**
4. Vyber formát:
    - **PNG** — web, průhledné pozadí ✅
    - **SVG** — vektorový, škálovatelný ✅
    - **JPG** — fotografie a pozadí
5. Klikni **Export [název]**

Notes:
Ukázat export live. Exportovat tu samou minci jako PNG i SVG, ukázat rozdíl velikosti souboru. Zdůraznit, že SVG je
vektorový — může se zvětšovat bez ztráty kvality.

---

## 🔗 Zdroje pro další studium

- 📚 **help.figma.com** — oficiální tutoriály Figmy
- 🎬 **Figma Design for Beginners 2025** — bezplatný kurz od Figmy
- 🌐 **figma.com/community** — tisíce šablon zdarma
- 🎮 Community file: `figma.com/community/file/882673583516057201`

**YouTube tutoriály (CZ titulky):**

- Figma in 100 seconds
- Figma for Beginners — crash course

Notes:
Ukázat komunitu živě. Otevřít zmíněný community file — je to herní UI šablona. Zmínit, že vše je zdarma a studenti mohou
šablony duplikovat a upravovat.

---

## ✅ Co jsme dnes zvládli

- ✅ Registrace a orientace ve Figmě
- ✅ Základní nástroje — tvary, text, barvy
- ✅ Práce s vrstvami a jejich pojmenování
- ✅ Vytvořená herní mince 🪙
- ✅ Vytvořený HP bar 💗
- ✅ Export grafiky jako PNG a SVG

🚀 Teď ovládáš základy nástroje, který používají designéři v herních studiích po celém světě!

🏠 **Dobrovolný domácí projekt:** Navrhni jedno UI okno pro svoji vysněnou hru — hlavní menu, inventory, nebo HUD

Notes:
Pochválit studenty. Ukázat pár pěkných výsledků z jejich práce (s dovolením). Otevřít prostor pro dotazy. Domácí úkol je
dobrovolný — ti, kdo ho udělají, ho příště ukáží.
