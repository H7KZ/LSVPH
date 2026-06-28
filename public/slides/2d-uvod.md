## Dva světy grafiky 🖼️

**Rastr vs. Vektor** — co je rozdíl a proč na tom záleží

_Základy 2D grafiky · LŠVPH 2026_

Notes:
Úvodní slide. Zeptat se: "Kdo z vás někdy tvořil nějakou grafiku?" Nechat ruce. Pak: "Kdo ví, co je vektor?"

---

## ❓ Záhada na úvod

Proč toto logo vypadá skvěle na triku **i** na billboardu…

…ale fotka z mobilu při přiblížení "rozpixeluje"?

🎯 Odpověď leží ve **formátu souboru**

Notes:
Ukázat na projektoru: vzít PNG logo (třeba Steam nebo Spotify) a přiblížit na max zoom. Pak udělat to samé s JPEG
fotkou — studenti uvidí pixely. Nechat je hádat proč.

---

## Vše co vidíš = pixely

Každá obrazovka je mřížka malých barevných bodů — **pixelů**

- 📱 iPhone 15: **2 556 × 1 179** pixelů → skoro 3 miliony bodů
- Každý pixel má přesnou barvu (**R**ed, **G**reen, **B**lue · hodnoty 0–255)
- Čím více pixelů, tím ostřejší obraz

🔍 **Zkus si:** Přiblíž libovolný obrázek na max zoom v prohlížeči

Notes:
Ukázat jak vypadá pixel grid v editoru (např. Photopea nebo Windows Photos při max přiblížení). Toto je základ pro
pochopení obou formátů.

---

## 🖼️ Rastrová grafika (Bitmapa)

Obrázek uložený jako **mřížka pixelů**

| ✅ Výhody               | ❌ Nevýhody             |
| ----------------------- | ----------------------- |
| Fotorealistické obrázky | Pixelizace při zvětšení |
| Přechody a stíny        | Velké soubory           |
| Jednoduché sdílení      | Pevná velikost          |

**Formáty:** `.jpg` `.png` `.gif` `.webp`

--

## 🖼️ Rastr v praxi

Kde ho potkáváš každý den:

- 📸 Fotky z mobilu
- 🌄 Textury prostředí ve hrách (tráva, cihly, kámen)
- 🎨 Digitální malby a concept art
- 📺 Screenshoty

🤔 Co by se stalo, kdybychom logo hry uložili jako JPG a pak ho chtěli na billboard?

Notes:
Nechat studenty odpovědět sami. Cílem je, aby sami přišli na to, že by to vypadalo pixelovaně a hrozně.

---

## 📐 Vektorová grafika

Obrázek uložený jako **matematické instrukce**

Místo "pixel na pozici [100,200] je modrý" si počítač pamatuje:

> _"Nakresli kruh se středem [100, 200], poloměr 50, barva #FFD700"_

- Lze zvětšit na **libovolnou velikost** bez ztráty kvality
- Menší soubory (pro jednodušší grafiku)
- Ideální pro loga, ikony a herní UI

**Formáty:** `.svg` `.ai` `.pdf`

--

## 📐 Vektor = supervelmoc škálování

Stejný soubor, jakákoliv velikost — vždy dokonale ostrý:

```
Ikona v aplikaci:    16 × 16 px   ✅ Ostrá
Ikona na webu:      128 × 128 px  ✅ Ostrá
Logo na triku:        10 × 10 cm  ✅ Ostrá
Billboard u dálnice:   6 × 3 m   ✅ STÁLE OSTRÁ
```

🎮 Proto jsou všechna loga her vektorová!

Notes:
Ukázat live: otevřít SVG logo ve Figmě nebo v prohlížeči a přiblížit na maximum. Perfektní ostrost. Srovnat s JPEG logem
při stejném přiblížení.

---

## Rastr vs. Vektor — Přehled

| Vlastnost         | 🖼️ Rastr         | 📐 Vektor              |
| ----------------- | ---------------- | ---------------------- |
| Základní jednotka | Pixel            | Matematický objekt     |
| Škálovatelnost    | ❌ Pixelizuje se | ✅ Dokonalá            |
| Ideální pro       | Fotky, textury   | Loga, ikony, UI        |
| Velikost souboru  | Větší            | Menší                  |
| Nástroje          | Photoshop, GIMP  | **Figma**, Illustrator |

Notes:
Projít tabulku řádek po řádku, u každého bodu dát příklad z reálného světa. Klíčový slide — ujistit se, že ho všichni
chápou, než pokračujeme.

---

## 🎮 Grafika ve hrách

Hry používají **obojí** — každý formát na správném místě!

**Vektorová grafika:**

- ❤️ HP bar, mana bar, ikony skilů
- 🗺️ Minimapy a UI prvky
- 🔤 Herní fonty a loga

**Rastrová grafika:**

- 🌿 Textury prostředí (tráva, kámen, voda)
- 🧙 Detailní postavy a animace
- 🌅 Skybox a pozadí

📱 Mobilní hry (Clash of Clans, Among Us) = hlavně vektory — menší soubory!

Notes:
Ukázat screenshot z nějaké populární hry a nechat studenty hádat, co je rastr a co vektor. Např. v Celeste: pixelová
grafika (rastr) vs. UI prvky (vektor).

---

## 🤔 Hádej — Rastr nebo Vektor?

1. 📸 Fotka z dovolené
2. 🎮 Logo Steamu
3. 🌲 Textura lesa v open-world hře
4. ❤️ Ikonka HP v herním UI
5. 🗣️ Herní font (písmo)
6. 🎨 Concept art postavy

_(Zapiš si odpovědi, pak zkontrolujeme)_

Notes:
Dát studentům 30 sekund na zapsání odpovědí, pak projít každou položku.
Odpovědi: Rastr · Vektor · Rastr · Vektor · Vektor · Rastr

---

## 🕹️ Blooket čas!

Otestuj co víš — zapoj se do kvízu!

**Připoj se na:**

`dashboard.blooket.com/set/66826e4c559ac110b3c6feac`

Notes:
Spustit Blooket hru jako host. Studenti se připojí na svých telefonech nebo laptopech. Hrát cca 5–7 minut.

---

## ✅ Co jsme se naučili

- 🖼️ **Rastr** = mřížka pixelů · fotorealistický · pixelizuje se při zvětšení
- 📐 **Vektor** = matematika · škálovatelný · ideální pro loga a UI
- 🎮 Hry používají **obojí** — každý formát na správném místě
- 🛠️ **Figma** je náš nástroj pro tvorbu vektorové grafiky

➡️ Příště: **Tvoříme ve Figmě!** — loga, ikony, herní UI

Notes:
Zeptat se studentů, jestli mají dotazy. Připomenout, že příště budou sami tvořit v prohlížeči — nic instalovat nemusí.
