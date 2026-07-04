## Flappy Bird — Lekce 2: Ptáček a fyzika

Letní škola vývoje her 2026 · Honza

---

## Co postavíme dnes

Ptáček na scéně s fyzikou — padá dolů jako ve skutečné hře.

**Výsledek:** GameObject ptáčka s Rigidbody2D, který padá pod vlivem gravitace

Notes:
Tato lekce zavádí klíčové pojmy Unity: GameObject, Component, Inspector, Rigidbody2D.

---

## GameObject a komponenty

V Unity je vše **GameObject**. Vlastnosti mu dávají **komponenty**.

| Komponenta       | Co dělá                  |
| ---------------- | ------------------------ |
| `Transform`      | pozice, rotace, velikost |
| `SpriteRenderer` | kreslí 2D obrázek        |
| `Rigidbody2D`    | fyzika a gravitace       |
| `Collider2D`     | detekce kolizí           |

Notes:
Analogie: GameObject = herec. Komponenty = kostým, hlas, pohyb. Bez komponent je GO prázdná krabice.

---

## Ptáček na scéně

1. V **Project** → `Graphics/` přetáhni `Bird.png` do **Scene**
2. Unity vytvoří GameObject se `SpriteRenderer`
3. Přejmenuj na `Bird` (F2 v Hierarchy)
4. Inspector → **Position:** `X: -2, Y: 0, Z: 0`

Notes:
Přejmenování je důležité — v skriptu na objekt odkazujeme.

---

> 📸 **Ukázka:** Hierarchy — objekt Bird, Inspector — Transform a komponenta SpriteRenderer

Notes:
Ukázat přejmenovaný Bird objekt a komponentu SpriteRenderer v Inspektoru.

---

## Rigidbody2D — přidání fyziky

1. Vyber `Bird` v Hierarchy
2. Inspector → **Add Component** → `Rigidbody 2D`
3. Nastav:
    - **Gravity Scale:** `1.5`
    - **Constraints → Freeze Rotation Z:** ✓

**Play Mode (▶)** → ptáček padá dolů ✓

Notes:
Freeze Rotation Z = ptáček se neobrátí při první kolizi. Vyzkoušejte různé hodnoty Gravity Scale.

---

> 📸 **Ukázka:** Inspector — Rigidbody2D, Gravity Scale: 1.5, Freeze Rotation Z zaškrtnutý

Notes:
Ukázat všechna nastavení Rigidbody2D v Inspektoru.

---

## Jak funguje gravitace

```
Každý snímek:  velocity.y -= gravitace × deltaTime

Gravity Scale 1.0 → pomalý pád
Gravity Scale 1.5 → přirozený pád  ← použijeme
Gravity Scale 3.0 → rychlý pád (těžší hra)
```

Vyzkoušej různé hodnoty **během Play Mode**

Notes:
Hodnoty v Play Mode se po ukončení NEuloží! Časté překvapení pro začátečníky.

---

## BoxCollider2D — kolizní zóna

1. Vyber `Bird` v Hierarchy
2. **Add Component** → `Box Collider 2D`
3. ✓ Zaškrtni **Is Trigger**
4. **Edit Collider** → přizpůsob tvar ptáčkovi

Notes:
Is Trigger = průlet skrz, ale dostaneme callback. Bez Is Trigger by se ptáček fyzicky odrážel.

---

## Trigger vs. fyzická kolize

| Typ            | Is Trigger | Chování                   |
| -------------- | ---------- | ------------------------- |
| Fyzická kolize | ☐          | Blokuje průchod, odraz    |
| Trigger zóna   | ✓          | Průlet skrz, jen callback |

```csharp
// fyzická kolize:
void OnCollisionEnter2D(Collision2D col) { }

// trigger:
void OnTriggerEnter2D(Collider2D col)   { }
```

Notes:
Pro Flappy Bird chceme trigger — sami rozhodujeme co se při kontaktu stane.

---

## Shrnutí lekce 2

- ✅ Ptáček jako GameObject se SpriteRenderer
- ✅ Rigidbody2D — Gravity Scale 1.5, Freeze Rotation Z
- ✅ BoxCollider2D s Is Trigger

**Příští lekce:** Skript pro skok při stisku mezerníku
