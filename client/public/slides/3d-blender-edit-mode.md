## Blender: Edit Mode a Modelování

_Základy 3D grafiky · LŠVPH 2026_

Notes:
V minulé přednášce jsme si ukázali, jak hýbat s celými objekty, barvit je a věšet na ně modifikátory. Dnes se podíváme
dovnitř objektů. Naučíme se, jak z obyčejné kostky vymodelovat v podstatě cokoliv – od hrnku na kafe až po meč či
raketu.

---

## Object Mode vs. Edit Mode

<div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center">
<div style="text-align:left">
<p>Základní rozdíl, který musíte pochopit hned na začátku:</p>
<ul>
<li><strong>Object Mode (Objektový režim)</strong>: Pracujeme s objektem jako s celkem. Krabici posouváme, otáčíme, zvětšujeme (manipulace se zavřenou krabicí na stole).</li>
<li><strong>Edit Mode (Editační režim)</strong>: Otevřeme krabici a měníme její vnitřní strukturu (taháme za body, řežeme, měníme tvar).</li>
<li><strong>Přepínání</strong>: Klávesa <strong>Tab</strong> (Tabulátor) vás okamžitě přepne mezi těmito dvěma světy.</li>
</ul>
</div>
<img src="/slides/assets/blender_modes_compare.jpg" style="width:100%;border:2px solid #000">
</div>

Notes:
Předvést na projektoru. Vytvořit kostku, zmáčknout Tab – kostka zoranžoví a objeví se na ní body. Zmáčknout Tab znovu –
jsme zpátky v Object modu. Zdůraznit, že když v Edit modu posuneme celou síť, středový bod objektu (Origin) zůstane na
místě, což mění chování transformací.

---

## Anatomie 3D sítě (Mesh)

<div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center">
<div style="text-align:left">
<p>Každý 3D objekt se skládá ze tří stavebních prvků:</p>
<ul>
<li><strong>Vertices (Body)</strong> — body v prostoru</li>
<li><strong>Edges (Hrany)</strong> — čáry spojující body</li>
<li><strong>Faces (Plošky)</strong> — plochy ohraničené hranami</li>
</ul>
<p style="margin-top:1rem"><strong>Přepínání na horní klávesnici:</strong></p>
<ul>
<li><strong>1</strong> — výběr Bodů</li>
<li><strong>2</strong> — výběr Hran</li>
<li><strong>3</strong> — výběr Plošek</li>
</ul>
</div>
<img src="/slides/assets/blender_mesh_anatomy.jpg" style="width:100%;border:2px solid #000">
</div>

Notes:
Ukázat studentům ikonky v levém horním rohu Viewportu, které se objeví pouze v Edit modu. Nechat je vyzkoušet mačkat 1,
2, 3 a klikat na kostku, aby viděli, co zrovna označují.

---

## Výběr prvků v Edit Módu

Než s něčím pohneme, musíme to správně vybrat:

- **Základní výběr**: Klikni **levým tlačítkem** na bod/hranu/plošku.
- **Více věcí naráz**: Drž **Shift** a klikej na další prvky.
- **Vybrat všechno**: Klávesa **A** vybere celou síť objektu.
- **Zrušit celý výběr**: Rychlé dvojité stisknutí **A** (nebo **Alt + A**).
- **Loop Select (Výběr smyčky)**: Drž **Alt** a klikni na hranu. Blender vybere celý okruh navazujících hran/plošek.
  Obrovský pomocník!

Notes:
Předvést Loop Select zejména na Subdivision kostce nebo válci – ukázat, jak to ušetří čas oproti klikání na 20 plošek
ručně s Shiftem.

---

## Velká trojice (G, R, S) v Edit Módu

Dobrá zpráva: Zkratky z minulé lekce fungují úplně stejně! Rozdíl je v tom, že deformují jen to, co máte zrovna vybrané.

- **G** (Grab) — Posune vybrané body/hrany/plošky.
- **R** (Rotate) — Otočí vybrané prvky.
- **S** (Scale) — Změní velikost (např. roztáhne horní plošku kostky do šířky).

> **Tip:** Zamykání do os (**X, Y, Z**) zde funguje také. Například `G` → `Z` vytáhne vybraný bod přesně kolmo nahoru.

Notes:
Nechat studenty vybrat jednu horní plošku kostky, zmáčknout S a pohnout myší – vznikne jehlan (stříška). Vybrat jednu
hranu, zmáčknout G a Z a pohnout jí dolů.

---

## Extrude (E) — Král modelování

**Extrude (Vytlačení)** je nejdůležitější nástroj pro tvorbu nové geometrie. Nevytahuje stávající plošku, ale vytvoří
novou a "vypěstuje" z ní nový kus hmoty.

- **Jak na to:** Vyber plošku (nebo hranu/bod) a stiskni **E**.
- **Co se stane:** Pohybem myši vytahuješ novou část objektu.
- Blender automaticky uzamkne pohyb kolmo na vybranou plošku (podle její normály).

Notes:
Předvést živě: Vybrat horní plošku kostky, stisknout E, popotáhnout nahoru, kliknout. Pak stisknout S (zmenšit), pak
znovu E (vytáhnout nahoru). Tímto způsobem ukázat, jak rychle vzniká např. věž nebo hradba.

---

## Inset (I) a Bevel (Ctrl + B)

<div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center">
<div style="text-align:left">
<p><strong>Inset (Vnitřní výplň) — klávesa I</strong></p>
<ul>
<li>Vytvoří uvnitř plošky její menší kopii (např. pro díru do hrnku).</li>
<li>Vyber plošku → <strong>I</strong> → pohni myší dovnitř.</li>
</ul>
<p style="margin-top:1rem"><strong>Bevel (Zaoblení) — Ctrl + B</strong></p>
<ul>
<li>Z ostré hrany udělá zkosenou nebo zaoblenou plochu.</li>
<li>Vyber hranu → <strong>Ctrl + B</strong> → pohni myší (kolečkem přidáš segmenty).</li>
</ul>
</div>
<img src="/slides/assets/blender_modeling_actions.jpg" style="width:100%;border:2px solid #000">
</div>

Notes:
Ukázat kombinaci: Vybrat plošku kostky -> `I` (uděláme menší čtverec uvnitř) -> `E` (zatlačíme ho dovnitř kostky, čímž
vznikne krabička). Pak vybrat vnější horní hrany a pomocí `Ctrl + B` je zaoblit. V reálném světě neexistují dokonale
ostré hrany, Bevel dává modelům realismus.

---

## Loop Cut (Ctrl + R) — Rozřezání sítě

Když potřebujeme přidat detaily doprostřed objektu, musíme ho "přeříznout" a přidat nové body.

- **Jak na to:** Stiskni **Ctrl + R** a najeď myší na objekt.
- **Náhled:** Objeví se žlutá čára naznačující, kudy řez povede.
- **Počet řezů:** Než klikneš, **točením kolečka myši** můžeš přidat víc řezů naráz.
- **Dokončení:** 1. Klikni **levým tlačítkem** (tím potvrdíš řez).

2. Nyní můžeš řezem posouvat po objektu.
3. Klikni **znovu levým** pro uložení na místě, nebo **pravým tlačítkem** pro vycentrování přesně doprostřed.

Notes:
Ukázat na dlouhém kvádru. `Ctrl + R`, vyrobit 5 řezů kolečkem myši, potvrdit. Následně vybrat každý druhý vzniklý okruh
plošek a pomocí `S` je roztáhnout (vznikne harmonika / vlnitá trubka).

---

## Spojování a mazání (F a X)

- **F (Fill / Vyplnit)**: Spojování prvků.
- Vyber dva body a stiskni **F** → Blender mezi nimi natáhne hranu.
- Vyber čtyři hrany (nebo body) a stiskni **F** → Blender mezi nimi vytvoří plochu.

- **X (Delete / Smazat)**: Když stisknete **X** (nebo _Delete_), Blender se zeptá, CO přesně chcete smazat:
- **Vertices (Body)** — Smaže body a vše, co na nich drželo (vnikne velká díra).
- **Faces (Plošky)** — Odstraní jen stěnu, ale drátěná kostra (hrany) zůstane.
- **Dissolve (Rozpustit)** — Kouzelná funkce. Smaže hranu nebo bod, ale neudělá díru – čistě je zahladí do okolních
  ploch. Udržuje síť čistou.

Notes:
Předvést rozdíl mezi "Delete Faces" (zůstane prázdná klec) a "Dissolve Edges" (hrana zmizí a plošky se spojí bez
poškození povrchu).

---

## Shrnutí: Tvůj tahák pro Edit Mode

- **Tab** — Přepínání Object / Edit Mode.
- **1 / 2 / 3** — Přepínání výběru: Body / Hrany / Plošky.
- **E** — Extrude (Vytlačení nové hmoty).
- **I** — Inset (Vytvoření plošky uvnitř plošky).
- **Ctrl + R** — Loop Cut (Rozříznutí sítě, kolečko myši pro víc řezů).
- **Ctrl + B** — Bevel (Zkosení a zaoblení hran).
- **F** — Fill (Vytvoření plošky/hrany mezi vybranými prvky).
- **X** — Mazání (Delete vs. Dissolve).

Notes:
Nechat tento slide svítit na projektoru. Zadání pro studenty na zbytek hodiny: Vyzkoušejte si vyrobit jednoduchý hrnek
na kafe (Válec -> Inset horní plošky -> Extrude dovnitř -> Loop cut zvenku -> Extrude ucha) nebo jednoduchý meč.
Obcházet třídu a pomáhat se zákysy.
