## Blender: Tvorba assetu a export

Od modelování k hotovému modelu ve tvé hře.

_Základy 3D grafiky · LŠVPH 2026_

Notes:
Cílem této přednášky je projít si kompletní postup (pipeline) tvorby 3D assetu: od pokročilejšího modelování s Boolean operacemi, přes rozbalení UV mapy a malování textury, až po export a import do Unity.

---

## Co se tady naučíme

- Jak spojovat a řezat objekty pomocí **Booleans**.
- Jak model "rozbalit" (**UV Unwrap**) pro barvení.
- Jak vytvořit a nanést **texturu**.
- Jak správně exportovat model a nahrát ho do **Unity**.

Notes:
Vysvětlit, že dnes propojíme všechny dosavadní znalosti Blenderu a dotáhneme model do stavu, kdy ho můžeme použít přímo ve hře.

---

## Booleans — Logické operace

<div style="display:grid;grid-template-columns:1fr 1.1fr;gap:2rem;align-items:center">
<div style="text-align:left">
<p>Užitečný nástroj pro spojování a vykrajování objektů do sebe:</p>
<ul>
<li><strong>Difference (Rozdíl)</strong> — Jeden objekt vykrojí díru do druhého (např. klíčová dírka, okno ve stěně).</li>
<li><strong>Union (Sjednocení)</strong> — Spojí dva objekty do jednoho čistého celku bez vnitřních stěn.</li>
<li><strong>Intersect (Průnik)</strong> — Zachová pouze tu část, kde se oba objekty překrývají.</li>
</ul>
</div>
<img src="/slides/assets/blender_booleans.jpg" style="width:100%;border:2px solid #000">
</div>

Notes:
Boolean modifikátor je extrémně silný pro rychlé otvory. Například u hrnku můžeme ucho a tělo sjednotit (Union), nebo válcem vykrojit vnitřek hrnku (Difference).

---

## Jak na Booleans v Blenderu

1. Označ hlavní objekt.
2. V panelu **Properties (🔧)** přidej modifikátor **Boolean**.
3. Pomocí **kapátka (Object)** klikni na druhý objekt, kterým chceš řezat.
4. Skryj řezací objekt (klávesa **H**), abys viděl výsledek.
5. Jakmile jsi spokojený, klikni na šipku u modifikátoru a dej **Apply** (tím se řez zafixuje do sítě).

Notes:
Upozornit studenty, že řezací objekt po kliknutí kapátkem nezmizí — stále překrývá výsledek. Musíme ho skrýt (H) nebo mu nastavit zobrazení jako "Wire" v nastavení objektu, abychom viděli díru.

---

## UV Unwrapping — Rozbalení modelu

<div style="display:grid;grid-template-columns:1fr 1.1fr;gap:2rem;align-items:center">
<div style="text-align:left">
<p>Abys mohl 3D model pomalovat, musíš ho nejprve rozložit na plochou 2D šablonu:</p>
<ul>
<li><strong>Pracovní plocha</strong>: Nahoře v Blenderu klikni na záložku <strong>UV Editing</strong>. Uvidíš UV mapu (vlevo) a 3D model (vpravo).</li>
<li><strong>Výběr</strong>: V Edit módu označ celý model klávesou <strong>A</strong> (vpravo ve 3D Viewportu).</li>
<li><strong>Rozbalení (Smart UV Project)</strong>: Stiskni klávesu <strong>U</strong> a zvol <strong>Smart UV Project</strong> (a potvrď tlačítkem OK). Blender sám chytře rozloží stěny modelu na levou 2D plochu.</li>
</ul>
</div>
<img src="/slides/assets/blender_uv_unwrap.jpg" style="width:100%;border:2px solid #000">
</div>

Notes:
Vysvětlit analogii s čokoládovým Mikulášem nebo globusem, který rozložíme na mapu světa. Pokud nerozbalíme UV mapu, textura se na modelu ošklivě roztáhne nebo nebude vidět vůbec.

---

## Textury: Malujeme na model

- **Texture Paint**: Blender má vestavěný režim pro kreslení. Najdeš ho v záložkách úplně nahoře.
- **Příprava (Zabránění fialové chybě)**: Vpravo v panelu _Active Tool_ (nebo pod záložkou _Material_) klikni na **+ Add Texture** a zvol **Base Color** (vyber barvu a rozlišení, např. 2048x2048).
- **Kreslení**: Můžeš kreslit štětcem přímo na 3D model! Blender barvy automaticky promítá na rozbalenou UV mapu.

> **Pozor:** Kreslená textura se **NEUKLÁDÁ** do `.blend` souboru! V okně _Image Editoru_ (vlevo) musíš jít do **Image → Save As** (nebo zmáčknout **Alt + S**) a uložit obrázek jako `.png` na disk. Pokud to neuděláš, po zavření Blenderu o celou práci přijdeš.

Notes:
Zdůraznit nutnost uložení obrázku. Studenti na to velmi často zapomínají a pak se diví, proč se jim textura po restartu Blenderu smazala.

---

## Export do Unity: Příprava v Blenderu

<div style="display:grid;grid-template-columns:1fr 1.1fr;gap:2rem;align-items:center">
<div style="text-align:left">
<p>Než model vyexportujeme, musíme ho uklidit:</p>
<ul>
<li><strong>Apply Transform (Ctrl + A)</strong> → Vyber <strong>All Transforms</strong>. Vynuluje to pozici a nastaví měřítko (Scale) na 1. Bez toho může být model v Unity obří nebo otočený!</li>
<li><strong>Origin (Střed)</strong>: Ujisti se, že oranžová tečka (střed) je na spodku modelu na zemi (viz podrobný návod na dalším slajdu).</li>
<li><strong>Export</strong>: Jdi do File → Export → <strong>FBX (.fbx)</strong>.</li>
</ul>
</div>
<img src="/slides/assets/blender_to_unity.jpg" style="width:100%;border:2px solid #000">
</div>

---

## Jak nastavit Origin (Střed) na spodek?

Pokud má tvůj model oranžový středový bod (Origin) uprostřed, bude se v Unity propadat pod zem.

**Jednoduchý trik, jak ho posunout na zem:**

1. Přepni se do **Edit Módu (Tab)** a označ celý model (**A**).
2. Posuň model nahoru (**G → Z**) tak, aby jeho spodní hrana ležela přesně na šedé souřadnicové mřížce (na 3D Cursoru).
3. Přepni se zpět do **Object Módu (Tab)**. Oranžová tečka (střed) zůstane na mřížce pod modelem.
4. Stiskni **Ctrl + A** a zvol **All Transforms**, aby se vše vynulovalo a potvrdilo.

Notes:
Tímto způsobem zajistíme, že v Unity bude model po přetažení do scény stát rovně na zemi a bude se otáčet kolem své základny, nikoli kolem svého středu. Nebo vysvětlit Object mode, tool, affect only origins.

---

## Import a Nastavení v Unity

1. Přetáhni vyexportovaný soubor `.fbx` a uloženou texturu (`.png`) do složky **Assets** v Unity.
2. Přetáhni model z Assets přímo do tvé 3D scény.
3. **Přiřazení textury (Správný postup)**:
    - Unity má materiály uvnitř `.fbx` zamčené. Vytvoříme si proto vlastní:
    - Klikni pravým tlačítkem v Assets → **Create → Material** (pojmenuj ho).
    - Přetáhni naši texturu do políčka **Albedo** (nebo _Base Map_) u nového materiálu.
    - Přetáhni tento nový materiál myší přímo na model ve scéně.
4. **Tvorba Prefabu**: Nastavený model ze scény přetáhni zpět do složky Assets. Vznikne **Prefab** (šablona), kterou pak můžeš ve hře používat opakovaně.

Notes:
Ukázat studentům živě v Unity. Jakmile vytvoří Prefab, mohou ho nakopírovat 50x do scény a všechny kopie budou sdílet stejné nastavení a materiály.

---

## Zadání

- **1. Modelování**: Vytvoř jednoduchý herní model (např. truhlu, meč, barel nebo auto).
- **2. Detaily**: Zkus použít nějaký modifier pro extra detaily - nedestruktivní modelování.
- **3. UV Mapa**: Rozbal model.
- **4. Barvení**: Vybarvi model v režimu **Texture Paint** a nezapomeň texturu uložit jako obrázek.
- **5. Hra**: Vyčisti transform (**Ctrl + A**), exportuj do **FBX** a naimportuj model i s texturou do **Unity**.

Notes:
Chodit u zadání kolem, ať si každý něco zkouší.
