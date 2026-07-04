## Jump King — Lekce 1: Scéna a postava

Letní škola vývoje her 2026

---

## Co postavíme dnes

Unity projekt s Tilemap podlahou a postavou, která se pohybuje.

**Výsledek:** postava chodí doleva a doprava, stojí na podlaze

Notes:
Jump King zavádí Tilemap — mocný nástroj pro 2D platformery. Věnuj čas vysvětlení rozdílu Tilemap vs. běžný Sprite.

---

## Nový Unity projekt

1. **Unity Hub → New Project → 2D (Core)**
2. Název: `JumpKing`
3. Složky: `Graphics/`, `Scripts/`, `Tiles/`

Notes:
Studenti, kteří dělali předchozí hry, to zvládnou rychle. Zaměř se na nové studenty.

---

## Tilemap — co to je?

**Tilemap** = síť dlaždic (tiles) pro stavbu 2D světa.

```
Výhody oproti jednotlivým Sprite objektům:
✓ Efektivní rendering (jedna draw call)
✓ Snadné kreslení úrovní "štětcem"
✓ Automatická kolize přes Tilemap Collider
```

Notes:
Analogie: Tilemap je jako stavění z Lega. Každá dlaždice = jeden blok Lega. Posunovat celou zeď = přestavit jeden blok.

---

## Vytvoření Tilemaps

1. **GameObject → 2D Object → Tilemap → Rectangular**
   - Unity vytvoří `Grid` a `Tilemap`
2. Přejmenuj `Tilemap` na `Ground`
3. Otevři **Tile Palette** (Window → 2D → Tile Palette)
4. Přetáhni `Platform.png` do Tile Palette → vytvoří Tile asset

Notes:
Grid je rodičovský objekt — pohybem Gridu pohybujeme celou mapou najednou.

---

## Kreslení podlahy

1. V Tile Palette vyber dlaždici `Platform`
2. Vyber štětec (klávesa B)
3. Kresli kliknutím do Scene view — vytáhni podlahu na spodku scény

**Tip:** Shift+klik = mazání dlaždic

Notes:
Nechat studenty 2–3 minuty volně kreslit. Zdůraznit: přidáme Collider až příště — teď je to jen vizuální.

---

## Postava

1. Přetáhni `Player.png` do scény → pojmenuj `Player`
2. Nastav pozici nad podlahu: `Y: 0` nebo výš
3. Přidej `Rigidbody2D` → **Gravity Scale: 3**, **Freeze Rotation Z: ✓**
4. Přidej `Box Collider 2D` (přizpůsob velikost)

Notes:
Bez Tilemap Collider (přidáme příště) postava propadne skrz. Nejdřív uvést pohyb, pak kolize.

---

## PlayerController.cs — základní pohyb

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [SerializeField] private float moveSpeed = 4f;
    [SerializeField] private Rigidbody2D rb;

    void Update()
    {
        float x = Input.GetAxisRaw("Horizontal"); // -1, 0, nebo 1
        rb.linearVelocity = new Vector2(x * moveSpeed, rb.linearVelocity.y);
    }
}
```

Notes:
`GetAxisRaw` = okamžitá hodnota bez interpolace (0 nebo ±1). `GetAxis` by dávalo plynulejší pohyb s setrvačností.

---

## Shrnutí lekce 1

- ✅ Tilemap s nakreslenou podlahou
- ✅ Postava s Rigidbody2D
- ✅ Pohyb doleva/doprava

**Další lekce:** Nabíjený skok — hlavní mechanika Jump King

Notes:
Ověřit: postava se pohybuje. Propadá skrz zem? Normální — Tilemap Collider přidáme v lekci 3.
