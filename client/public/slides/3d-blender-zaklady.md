## Blender: Ovládnutí UI

První krůčky ve světě 3D grafiky, modifikátorů a materiálů.

_Základy 3D grafiky · LŠVPH 2026_

Notes:
Cílem této přednášky je zbavit se strachu ze složitého rozhraní Blenderu, naučit se základy pohybu a transformace celých objektů a ukázat si, jak pomocí modifikátorů a materiálů rychle vytvořit skvěle vypadající scénu bez složitého modelování bod po bodu.

---

## Kde co v Blenderu je? (UI)

<div style="display:grid;grid-template-columns:1fr 1.2fr;gap:2rem;align-items:center">
<div style="text-align:left">
<p>Rozhraní vypadá složitě, ale skládá se ze 4 hlavních částí:</p>
<ul>
<li><strong>3D Viewport</strong> — Velké okno uprostřed. Tady vidíme náš 3D svět a modely.</li>
<li><strong>Outliner</strong> — Vpravo nahoře. Seznam všech objektů ve scéně.</li>
<li><strong>Properties (Vlastnosti)</strong> — Vpravo dole. Nastavení barev, rozměrů, modifikátorů atd.</li>
<li><strong>Timeline</strong> — Dole. Časová osa pro animování (zatím ji nebudeme potřebovat).</li>
</ul>
</div>
<img src="/slides/assets/blender_ui_layout.jpg" style="width:100%;border:2px solid #000">
</div>

Notes:
Ukázat Blender živě na projektoru. Kliknout na jednotlivé panely a vysvětlit, že ve výchozí scéně máme 3 věci: Camera (kamera), Cube (krychle) a Light (světlo).

---

## Jak se pohybovat v Blenderu?

- **Otáčení pohledu**: Drž **střední tlačítko myši (kolečko)** a hýbej myší.
- **Posun pohledu (Pan)**: Drž **Shift** + **střední tlačítko myši** a hýbej myší.
- **Přiblížení / Oddálení (Zoom)**: Toč **kolečkem myši** (nebo drž **Ctrl** + střední tlačítko a tahej).
- **Zaměření na objekt**: Klávesa **Numpad .** (tečka na numerické klávesnici) vycentruje kameru na vybraný objekt. => Hodně užitečné

Notes:
Nechat studenty 2 minuty zkoušet létat kolem výchozí kostky. Pokud někdo nemá numerickou klávesnici, ukázat, že v pravém horním rohu Viewportu je barevné 3D gizmo, kterým se dá otáčet klikáním a tažením.

---

## Zlatá trojice: G, R, S

Všechny objekty v 3D upravujeme pomocí tří základních zkratek:

- **G** (Grab / Move) — Posunout objekt.
- **R** (Rotate) — Otočit objekt.
- **S** (Scale) — Zvětšit / zmenšit objekt.

**Jak to ovládat:**

- **Vybírání**: Klikni **levým tlačítkem** myši, pokud nemáme vybraný objekt, G, R, S nebude fungovat.
- **Zrušení akce**: Klikni **pravým tlačítkem** myši (nebo klávesou **Esc**).
- **Potvrzení akce**: Klikni **levým tlačítkem** myši (nebo klávesou **Enter**).

Notes:
Předvést živě na kostce. Stisknout G, posunout myš (kostka létá), stisknout pravé tlačítko (skočí zpět). Znovu stisknout G, posunout a kliknout levým (potvrdit). Zkusit to samé s R a S.

---

## Zamykání do os (X, Y, Z)

Chceme-li hýbat objektem přesně, zamkneme ho do jedné z os.

Stiskni **G**, **R** nebo **S** a hned poté stiskni klávesu osy:

- **X** (červená osa) — pohyb / rotace / škálování pouze vodorovně (vlevo/vpravo).
- **Y** (zelená osa) — pohyb / rotace / škálování pouze dopředu/dozadu.
- **Z** (modrá osa) — pohyb / rotace / škálování pouze nahoru/dolů.

_Příklad:_ Zápis `G` → `Z` posune kostku přesně kolmo nahoru.

Notes:
Ukázat na projektoru barevné osy procházející středem. Vyzkoušet se studenty: `G` -> `X`, pak `R` -> `Z` (otočení jako na kolotoči), pak `S` -> `Z` (uděláme z kostky vysokou věž).

---

## Co jsou to Modifikátory? (Modifiers)

Automatické efekty, které mění objekt nedestruktivním způsobem.

- **Nedestruktivní?** Původní objekt (např. kostka) zůstává nezměněn. Modifikátor na ni jen "přičaruje" efekt, který můžeme kdykoliv vypnout, změnit nebo smazat.
- **Kde je najdeme**: V panelu **Properties** (vpravo dole) pod ikonou **modrého klíče (🔧)**.
- **Vrstvení**: Můžeme dávat více modifikátorů na sebe (fungují shora dolů).

Notes:
Vysvětlit koncept nedestruktivnosti – je to jako nosit brýle (můžeme je sundat) vs. jít na operaci očí. Ukázat ikonu klíče v panelu vlastností a rozbalovací menu "Add Modifier". :D

---

## Tři modifikátory

<div style="display:grid;grid-template-columns:2fr 1fr;gap:2rem;align-items:center">
<div style="text-align:left">
<p>Pomocí těchto tří nástrojů vytvoříte složité věci za pár vteřin:</p>
<ul>
<li><strong>Subdivision Surface</strong> — Zaoblí a zjemní objekt. Z ostré kostky dokáže udělat dokonale hladkou kuličku nebo polštář (přidává geometrii).</li>
<li><strong>Mirror</strong> — Zrcadlení. Modelujete pouze jednu polovinu objektu (např. auto, postavu) a druhá se automaticky dopočítává podle zvolené osy.</li>
<li><strong>Array</strong> — Pole / Duplikace. Vytvoří řadu, mřížku nebo kruh stejných objektů s přesným rozestupem (ideální na ploty, schody, sloupy).</li>
</ul>
</div>
<img src="/slides/assets/blender_modifiers_subdiv.jpg" style="width:100%;border:2px solid #000">
</div>

Notes:
Předvést na výchozí kostce přidání Subdivision Surface. Ukázat vlastnost "Levels Viewport" – čím vyšší číslo, tím hladší tvar (ale pozor na sekání počítače). Asi můžem ukázat i jiné ale tyto jsou fajn.

---

## Shading: Jak dát objektům život (Materiály)

Bez materiálů je všechno ve 3D světě jen nudná šedá hlína.

- **Kde barvíme**: Panel **Properties** → ikona **červené kuličky (🌐)** (Material Properties).
- **Principled BSDF**: Výchozí materiál v Blenderu, který umí nasimulovat téměř jakýkoliv povrch pomocí tří hlavních hodnot:
- **Base Color** — Základní barva objektu.
- **Metallic** — Jak moc se objekt chová jako kov (0 = plast/dřevo, 1 = zlato/ocel).
- **Roughness** — Drsnost. Nízká (0) = zrcadlový lesk, vysoká (1) = matný povrch jako guma.

Notes:
Kliknout na kostku, jít do Material Properties, kliknout na tlačítko "New". Změnit Base Color na nějakou výraznou barvu. Zmínit studentům, že v základním zobrazení barvu hned neuvidí – k tomu slouží další slide.

---

## Jak scénu vidíme? (Viewport Shading)

V pravém horním rohu 3D Viewportu najdeme 4 ikonky kuliček, které mění režim zobrazení:

1. **Wireframe** (Drátěný model) — Vidíme skrz objekty pouze jejich kostru (sítě).
2. **Solid** (Výchozí šedý) — Rychlé modelování bez barev a stínů, které šetří výkon PC.
3. **Material Preview** (Náhled materiálů) — Vidíme barvy, odlesky a textury v provizorním světle.
4. **Rendered** (Finální vzhled) — Kompletní fotorealistická simulace světla, stínů a odrazů.

_TIP: Zkratka: Podržením klávesy **Z** vyvoláte rychlé kruhové menu pro přepínání těchto režimů._

Notes:
Nechat studenty stisknout klávesu Z a vybrat "Material Preview". Nyní uvidí barvu, kterou nastavili v předchozím kroku. Následně ukázat "Rendered" mód a vysvětlit, že stíny ovlivňuje pozice objektu Light (světlo) ve scéně.

---

## Co jsme se naučili?

- **UI**: Viewport (svět), Outliner (seznam), Properties (nastavení všeho).
- **Pohyb**: Kolečko myši (otáčení), + Shift (posun), Numpad . (zaměření na objekt).
- **G, R, S**: Move (G), Rotate (R), Scale (S) + zamykání do os **X, Y, Z**.
- **Modifikátory 🔧**: Nedestruktivní efekty
- **Materiály 🌐**: Nastavení vzhledu v Principled BSDF (Base color, Metallic, Roughness).
- **Zobrazení (Z)**: Přepínání mezi Solid (modelování) a Material Preview / Rendered (vzhled).

_Další: Vstup do Edit Módu – jak otevřít model a měnit samotný tvar objektů._
