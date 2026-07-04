## Dva světy grafiky

_**Rastr vs. Vektor** — co je rozdíl a proč na tom záleží_

Letní škola vývoje her 2026 · Honza

Notes:
Uvítat studenty. Zeptat se: "Kdo z vás někdy tvořil nějaký obrázek nebo grafiku?" Nechat ruce. Pak: "Kdo ví, co je
vektor?"

---

## Záhada

Proč logo vypadá skvěle na triku i na billboardu,
ale fotka z mobilu při přiblížení se „rozpixeluje"?

**Odpověď leží ve formátu souboru.**

Notes:
Ukázat na projektoru: vzít PNG logo (Steam, Spotify) a přiblížit na max zoom. Pak to samé s JPEG fotkou — studenti uvidí
pixely. Nechat je hádat proč.

---

## Co jsou pixely?

Každá obrazovka je mřížka malých barevných bodů — **pixelů**.

- iPhone 15: **2 556 × 1 179** pixelů → skoro 3 miliony bodů
- Každý pixel má přesnou barvu (**R**ed · **G**reen · **B**lue · hodnoty 0–255)
- Čím více pixelů na stejné ploše, tím ostřejší obraz

Zkus si: přiblíž libovolný obrázek na maximum v prohlížeči.

Notes:
Ukázat pixel grid v editoru — Windows Photos nebo Preview při max přiblížení. Základ pro pochopení obou formátů.

---

## Rastrová grafika

<div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center">
<div style="text-align:left">
<ul>
<li>Obrázek uložený jako <strong>mřížka pixelů</strong></li>
<li>Při zvětšení se <strong>pixelizuje</strong></li>
<li>Ideální pro fotky a realistické textury</li>
<li>Formáty: <code>.jpg</code> <code>.png</code> <code>.gif</code> <code>.webp</code></li>
</ul>
</div>
<img src="/slides/assets/raster_vs_vector.png" style="width:100%;border:2px solid #000">
</div>

Notes:
Projít každý bod. Zdůraznit "pixelizaci" — ukázat fyzicky přiblíženou JPEG fotku. Zdroj:
brandcloud.pro/en/blog/raster-vs-vector-graphics

---

## Rastr ve hrách

<div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center">
<div style="text-align:left">
<p><strong>Kde ho v hrách potkáš:</strong></p>
<ul>
<li>Textury prostředí — tráva, kámen, voda</li>
<li>Detailní postavy a animace</li>
<li>Concept art a splash screeny</li>
<li>Pixel art hry — Stardew Valley, Celeste, Undertale</li>
</ul>
</div>
<img src="/slides/assets/pixel_art_2D_game.webp" style="width:100%;border:2px solid #000">
</div>

Notes:
Pixel art JE rastrová grafika — záměrně nízké rozlišení jako umělecký styl. Stardew Valley, Celeste, Undertale — vše
pixel art.

---

## Vektorová grafika

<div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center">
<div style="text-align:left">
<ul>
<li>Obrázek uložený jako <strong>matematické instrukce</strong></li>
<li>Lze zvětšit na <strong>libovolnou velikost</strong> bez ztráty kvality</li>
<li>Menší soubory pro jednoduchou grafiku</li>
<li>Formáty: <code>.svg</code> <code>.ai</code> <code>.pdf</code></li>
</ul>
<blockquote style="font-size:0.8em;margin-top:1rem">"Nakresli kruh, střed [100,200], poloměr 50, barva #FFD700"</blockquote>
</div>
<img src="/slides/assets/raster_vs_vector_2.png" style="width:100%;border:2px solid #000">
</div>

Notes:
Ukázat live: SVG logo ve Figmě nebo prohlížeči — přiblížit na maximum. Stále dokonale ostré. Srovnat s JPEG logem při
stejném přiblížení.

---

## Vektor ve hrách

<div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center">
<div style="text-align:left">
<p><strong>Kde ho v hrách potkáš:</strong></p>
<ul>
<li>Herní UI — HP bar, mapa, ikony</li>
<li>Loga a titulky her</li>
<li>Herní fonty</li>
<li>Mobilní hry — Clash of Clans, Among Us</li>
</ul>
<p style="margin-top:1rem">Firewatch — celá hra je vektorová!</p>
</div>
<img src="/slides/assets/firewatch_art_2D_game.webp" style="width:100%;border:2px solid #000">
</div>

Notes:
Firewatch je slavný příklad hry s čistě vektorovou grafikou — krásná, stylizovaná. Ukázat jak se loga her zvětšují bez
ztráty kvality.

---

## Rastr vs. Vektor — srovnání

| Vlastnost         | Rastrová grafika          | Vektorová grafika      |
| ----------------- | ------------------------- | ---------------------- |
| Základní jednotka | Pixel                     | Matematický objekt     |
| Škálovatelnost    | Pixelizuje se             | Dokonalá               |
| Ideální pro       | Fotky, textury, pixel art | Loga, ikony, UI        |
| Formáty           | JPG, PNG, GIF             | SVG, AI, PDF           |
| Nástroje          | Photoshop, Krita          | **Figma**, Illustrator |

Notes:
Projít tabulku řádek po řádku. Zdůraznit, že hry používají obojí — záleží na tom, k čemu grafika slouží.

---

## Hry používají obojí

<div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center">
<div style="text-align:left">
<p><strong>Vektorová grafika:</strong></p>
<ul>
<li>HP bar, mana bar, ikony skilů</li>
<li>Minimapy a HUD</li>
<li>Herní fonty a loga</li>
</ul>
<p><strong>Rastrová grafika:</strong></p>
<ul>
<li>Textury prostředí</li>
<li>Animace postav</li>
<li>Pozadí a skybox</li>
</ul>
</div>
<img src="/slides/assets/health_bars.gif" style="width:100%;border:2px solid #000">
</div>

Notes:
HP bary a HUD jsou typicky vektorové — musí být ostré na jakémkoliv rozlišení. Textury jsou rastrové. Ukázat screenshot
z populární hry a nechat studenty hádat co je co.

---

## Pixel Art

<div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center">
<div style="text-align:left">
<ul>
<li>Rastrová grafika se <strong>záměrně nízkým rozlišením</strong></li>
<li>Umělecký styl — retro estetika videoher</li>
<li>Každý pixel je záměrný a viditelný</li>
<li>Oblíbený styl indie her</li>
</ul>
<p style="margin-top:1rem">Stardew Valley · Celeste · Undertale · Terraria</p>
</div>
<img src="/slides/assets/2D_game_character.jpg" style="width:100%;border:2px solid #000">
</div>

Notes:
Pixel art je záměrné omezení — jako malování na čtvercové plátno. Každý bod má váhu. Ukázat rozdíl mezi náhodně "
pixelovaným" obrázkem a záměrným pixel artem.

---

## Zkus Pixel Art sám!

Nakresli vlastní sprite nebo ikonu přímo v prohlížeči.

- Otevři: [pixilart.com/draw](https://www.pixilart.com/draw?ref=home-page)
- Nápověda: [pixilart.com/help](https://www.pixilart.com/help)
- Tutoriál: [youtube.com/watch?v=LFclLgUQ1zE](https://www.youtube.com/watch?v=LFclLgUQ1zE)

Nápady: herní postava · mince · srdíčko · meč · strom · NPC

Čas: **10 minut**

Notes:
Dát studentům 10 minut na volné kreslení. Projít třídou a povzbudit. Pixilart.com funguje přímo v prohlížeči. Na konci
ukázat pár výsledků.

---

## Rastr nebo Vektor?

Hádej pro každou položku:

1. Fotka z dovolené
2. Logo Steamu
3. Textura kamene v Minecraftu
4. HP bar v League of Legends
5. Postavička ve Stardew Valley
6. Herní font v menu

_Zapiš si odpovědi, pak zkontrolujeme._

Notes:
30 sekund na zápis, pak projít každou položku.
Odpovědi: Rastr · Vektor · Rastr · Vektor · Rastr · Vektor

---

## Shrnutí

- **Rastr** = mřížka pixelů · pixelizuje se · fotky, textury, pixel art
- **Vektor** = matematika · škálovatelný · loga, ikony, UI
- Hry používají **obojí** — každý formát na správném místě

Notes:
Spustit Blooket hru. Studenti se připojí na telefonech nebo laptopech. Cca 5–7 minut.

Blooket kvíz: https://dashboard.blooket.com/set/6a443d10ef3edfdcbb37f0a5
