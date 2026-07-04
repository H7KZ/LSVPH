## Jump King — Lekce 3: Platformy a level design

Letní škola vývoje her 2026

---

## Co postavíme dnes

Tilemap Collider, komposite collider a layout platformové úrovně.

**Výsledek:** postava stojí na platformách, pádí při překročení okraje

Notes:
Bez kolizí byl dosud level jen vizuální. Teď ho oživíme. Level design je kreativní část — nechat studenty navrhovat
vlastní layout.

---

## Tilemap Collider 2D

1. Vyber `Ground` Tilemap v Hierarchy
2. **Add Component → Tilemap Collider 2D**
3. **Add Component → Composite Collider 2D**
    - Unity automaticky přidá Rigidbody2D → nastav **Body Type: Static**
4. V Tilemap Collider 2D zaškrtni **Used By Composite**

Notes:
Composite Collider = slije všechny malé tile collidery do jednoho. Lépe výkonné a méně bugů s kolizemi.

---

## Tag "Ground" na Tilemap

1. Vyber `Ground` v Hierarchy
2. Inspector → **Tag → Add Tag** → `Ground`
3. Nastav Tag na `Ground`

Teď `OnCollisionEnter2D` v PlayerController detekuje dopad ✓

Notes:
Teď otestovat skok — postava by měla stát na Tilemapě. Pokud propadá: zkontrolovat Composite Collider 2D nastavení.

---

## Level design — principy

```
Dobrý Jump King level:
✓ Platformy různých výšek → výzva
✓ Mírně přesahující platformy → "skok na okraj"
✓ Slepé uličky → hráč musí přemýšlet
✓ Viditelný cíl nahoře → motivace
```

Notes:
Nechat studenty 10 minut kreslit vlastní level ve Tile Palette. Ukázat jak smazat dlaždice (Shift+klik).

---

## Přidání dalšího Tilemaps pro platformy

1. Klikni pravým na `Grid` → **2D Object → Tilemap**
2. Pojmenuj `Platforms`
3. Přidej **Tilemap Collider 2D** + **Composite Collider 2D** (Body Type: Static)
4. Nastav Tag: `Ground`
5. Kresli platformy v různých výškách

Notes:
Dvě Tilapy (Ground + Platforms) = podlaha je oddělena od platforem. Snadnější editace a přehled.

---

## Pád z platformy

Pokud postava při pádu z platformy přechází skrz:

1. Zkontroluj že Composite Collider 2D je nastaven
2. V Rigidbody2D postavy: **Collision Detection → Continuous**
3. Zvyš **Fixed Timestep** (Edit → Project Settings → Time → Fixed Timestep: 0.01)

Notes:
Continuous Collision Detection = Unity počítá kolize i mezi snímky. Důležité pro rychle pohybující se objekty.

---

## Shrnutí lekce 3

- ✅ Tilemap Collider 2D + Composite Collider
- ✅ Alespoň 3 platformy na různých výškách
- ✅ isGrounded funguje při dopadu

**Další lekce:** Cinemachine kamera sledující postavu

Notes:
Ověřit: postava stojí, skáče a přistává na platformách. Level design je osobní — povzbudit studenty kreativitu.
