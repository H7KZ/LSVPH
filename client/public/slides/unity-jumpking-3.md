## Jump King — Lekce 3: Plošiny a level design

Letní škola vývoje her 2026 · Honza

---

## Co postavíme dnes

Přidáme plošiny do 3 pater — hráč musí skákat nahoru od patra k patru.

**Výsledek:** level se 3 patry, postava stojí na plošinách a může na ně skákat

Notes:
Level design je kreativní část — nechat studenty navrhovat vlastní rozmístění plošin. Jen připomenout pravidla.

---

## Jak je level rozdělený

```
PATRO 3 (vrchol) ─── cíl hry
────────────────────────────────
PATRO 2           ─── plošiny
────────────────────────────────
PATRO 1 (přízemí) ─── podlaha + první plošiny
```

Kamera vždy zobrazuje jedno patro — při přechodu "skočí" na další.

Výška každého patra = `Camera.orthographicSize × 2` Unity jednotek.

Notes:
orthographicSize výchozí = 5, tedy 1 patro = 10 jednotek. Plošiny v patře 2 začínají na Y = 10, patro 3 na Y = 20.

---

## Přidání plošiny

1. Přetáhni `Platform.png` do scény
2. Přejmenuj na `Platform_1` (čísluj)
3. Nastav **Scale X** podle šířky plošiny (např. `3`)
4. Nastav **pozici Y** dle patra:
	- Patro 1: `Y: -4` až `4`
	- Patro 2: `Y: 6` až `14`
	- Patro 3: `Y: 16` a výš
5. **Add Component → Box Collider 2D**
6. **Tag: Ground**

Notes:
Každá plošina potřebuje Tag "Ground" — jinak hráč propadne. Opakovat pro každou plošinu.

---

> 📸 **Ukázka:** Scene view se třemi patry a plošinami na různých výškách

Notes:
Ukázat studentům příklad rozmístění — pak jim dát volnost.

---

## Principy dobrého level designu

```
✓ Plošiny různých výšek → různá obtížnost skoku
✓ Plošiny mírně přesahující okraj → "skok na okraj"
✓ Mezery mezi plošinami → napětí při přistání
✓ Vždy viditelná cesta nahoru → hráč ví co dělat
✗ Příliš úzké plošiny → frustrující, ne zábavné
✗ Rovné sloupce → nudné, žádná strategie
```

Notes:
Jump King je o čtení levelu a plánování skoku. Slepé uličky jsou v pořádku — hráč se poučí.

---

## Duplikace plošin (šetří čas)

Místo přidávání jedné po druhé:

1. Vyber plošinu v Hierarchy
2. **Ctrl+D** — duplikuj
3. Přesuň na novou pozici

> 📸 **Ukázka:** Hierarchy s pojmenovanými Platform_1 až Platform_8

Notes:
Studenti mají tendenci přidávat příliš moc plošin. Doporučit: 2–3 plošiny na patro, alespoň 1 mezerou.

---

## Collision Detection — rychlé objekty

Pokud postava při pádu prochází plošinou:

1. Vyber `Player` v Hierarchy
2. Inspector → **Rigidbody2D**
3. **Collision Detection:** `Continuous`

Notes:
Continuous = Unity počítá kolize i mezi snímky. Důležité pro objekty pohybující se rychle (vysoký skok + Gravity Scale
3).

---

## Test level designu

▶ **Play** a ověř:

- Hráč stojí na všech plošinách (ne propadá)
- Na každou plošinu lze doskočit (zkus různé skoky)
- Ze třetího patra je vidět "co bude cíl"

Notes:
Pokud hráč propadá plošinou: 1. Box Collider 2D přidán? 2. Tag "Ground" nastaven? 3. Collision Detection Continuous?

---

## Shrnutí lekce 3

- ✅ Plošiny ve 3 patrech s Box Collider 2D
- ✅ Tag "Ground" na každé plošině
- ✅ Level design: hráč může doskočit na každou plošinu
- ✅ Collision Detection: Continuous

**Další lekce:** kamera, která přepíná patra Jump King stylem

Notes:
Uložit scénu (Ctrl+S). Připomenout: zatím chybí kamera — vidíme jen jedno patro. To opravíme příští lekci.
