## Flappy Bird — Lekce 2: Ptáček a fyzika

Letní škola vývoje her 2026

---

## Co postavíme dnes

Ptáček na scéně s fyzikou — padá dolů jako ve skutečné hře.

**Výsledek:** GameObject ptáčka s Rigidbody2D, který padá pod vlivem gravitace

Notes:
Lekce zavádí klíčové pojmy Unity: GameObject, Component, Inspector, Rigidbody2D. Dej si čas na vysvětlení.

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
Analogie: GameObject = herec. Komponenty = kostým, hlas, pohyb. Bez komponent je GameObject prázdná krabice.

---

## Ptáček na scéně

1. V **Project** → `Graphics/` přetáhni `Bird.png` do **Scene**
2. Unity vytvoří GameObject se `SpriteRenderer`
3. Přejmenuj ho na `Bird` (F2 v Hierarchy)
4. Nastav **Position** v Inspektoru: `X: -2, Y: 0, Z: 0`

Notes:
Přejmenování je důležité — až budeme hledat objekt ve skriptu, název nás zachrání.

---

## Rigidbody2D — přidání fyziky

1. Vyber `Bird` v Hierarchy
2. V Inspektoru → **Add Component** → hledej `Rigidbody 2D`
3. Nastav:
    - **Gravity Scale:** `1.5` (trochu rychlejší pád)
    - **Freeze Rotation → Z:** ✓ zaškrtni

**Spusť Play Mode (▶)** → ptáček padá dolů ✓

Notes:
Freeze Rotation Z = ptáček se neobrátí při první kolizi (fyzika by ho jinak roztočila). Experimentujte s Gravity Scale.

---

## Jak funguje gravitace

```
Každý snímek:  velocity.y -= gravitace × deltaTime

Gravity Scale 1.0 → mírný pád (jako na Měsíci)
Gravity Scale 1.5 → přirozený pád
Gravity Scale 3.0 → rychlý pád (těžší hra)
```

Vyzkoušej různé hodnoty v Inspektoru **během Play Mode**

Notes:
V Play Mode lze měnit hodnoty v Inspektoru — ale změny se po ukončení Play Mode neuloží! To je časté překvapení pro
začátečníky.

---

## BoxCollider2D — přidání kolizní zóny

1. Vyber `Bird` v Hierarchy
2. **Add Component** → `Box Collider 2D`
3. ✓ Zaškrtni **Is Trigger**
4. Uprav velikost: tlačítko **Edit Collider** → táhni zelené body tak, aby odpovídaly tvaru ptáčka

Notes:
Is Trigger = jiné objekty "proletí" skrz, ale Unity nás upozorní (callback). Bez Is Trigger by fyzika ptáčka odrážela od
objektů.

---

## Trigger vs. fyzická kolize

| Typ            | Is Trigger | Chování                    |
| -------------- | ---------- | -------------------------- |
| Fyzická kolize | ☐          | Blokuje průchod, odraz     |
| Trigger zóna   | ✓          | Proletí skrz, jen callback |

```csharp
// fyzická kolize:
void OnCollisionEnter2D(Collision2D col) { }

// trigger zóna:
void OnTriggerEnter2D(Collider2D col)    { }
```

Notes:
Pro Flappy Bird chceme trigger — jinak by se ptáček odrážel od rour divně. My sami rozhodneme, co se při kontaktu stane.

---

## Shrnutí lekce 2

- ✅ Ptáček jako GameObject se SpriteRenderer
- ✅ Rigidbody2D — gravitace, Freeze Rotation Z
- ✅ BoxCollider2D s Is Trigger

**Další lekce:** Skript pro skok při stisku mezerníku

Notes:
Ověřit: všichni mají ptáčka, který padá dolů při Play Mode. Collider nemusí být perfektní — přibližně stačí.
