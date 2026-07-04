## Dinosaur Runner — Lekce 2: Skok a scrolling

Letní škola vývoje her 2026 · Honza

---

## Co postavíme dnes

Dinosaurus skáče a zem se pohybuje doleva — iluze pohybu doprava.

**Výsledek:** dino skáče na mezerník, podloží se plynule scrolluje bez přerušení

Notes:
Skok + scrolling jsou základ každé runner hry. Scrolling pomocí dvou recyklovaných dlaždic — efektivní a jednoduchý
trik.

---

## DinosaurController.cs — skok

```csharp
using UnityEngine;

[RequireComponent(typeof(Rigidbody2D))]
public class DinosaurController : MonoBehaviour
{
    [SerializeField] private float jumpForce = 10f;

    private Rigidbody2D rb;
    private bool isGrounded;

    void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    void Update()
    {
        bool jumpInput = Input.GetKeyDown(KeyCode.Space)
                      || Input.GetKeyDown(KeyCode.UpArrow);

        if (jumpInput && isGrounded)
            Jump();
    }

    private void Jump()
    {
        // ForceMode2D.Impulse = okamžitý impuls → gravitace dělá přirozený oblouk
        rb.AddForce(Vector2.up * jumpForce, ForceMode2D.Impulse);
        isGrounded = false;
    }

    void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("Ground"))
            isGrounded = true;
    }

    void OnCollisionExit2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("Ground"))
            isGrounded = false;
    }
}
```

Notes:
`[RequireComponent]` = Unity automaticky přidá Rigidbody2D pokud chybí. `isGrounded` flag zabraňuje dvojskoku. V lekci 4
přidáme state check GameManageru.

---

## Proč AddForce místo linearVelocity?

```csharp
// linearVelocity = přepíše rychlost → ostrý "sekaný" pohyb
rb.linearVelocity = Vector2.up * jumpForce;

// AddForce + Impulse = přidá impuls → gravitace tvaruje oblouk ✓
rb.AddForce(Vector2.up * jumpForce, ForceMode2D.Impulse);
```

Vyzkoušej obě varianty v Play Mode — rozdíl je cítit!

Notes:
S linearVelocity dinosaurus letí rovně nahoru a pak najednou padá. AddForce dá přirozený parabolický oblouk — fyzika
přidá gravitaci přes čas.

---

## Přiřazení DinosaurController

1. Vyber `Dino` v Hierarchy
2. **Add Component** → najdi `DinosaurController`
3. Nastav **Jump Force:** `10`
4. Nastav tag `Ground` na objektu podlahy (Inspector → Tag)

**Play Mode (▶)** → dino skáče jednou na mezerník nebo šipku nahoru ✓

Notes:
Bez tagu "Ground" bude `isGrounded` vždy `false` → dino může skákat neomezeně. Ukáž tento bug záměrně.

---

## Scrollující podloží — jak funguje

```
Dvě dlaždice vedle sebe:     [ Tile A ][ Tile B ]
Obě se pohybují doleva:   ←  [ Tile A ][ Tile B ]  ←
Tile A vyjela za levý okraj:
  → teleportuj ji ZA Tile B
                              [ Tile B ][ Tile A ]
Výsledek: nekonečná smyčka ✓
```

Notes:
Tato technika se nazývá "seamless tile loop". Funguje pro libovolné opakující se pozadí nebo podloží.

---

## GroundScroller.cs

```csharp
using UnityEngine;

public class GroundScroller : MonoBehaviour
{
    // Šířka dlaždice: 1456 px ÷ 100 PPU = 14.56 Unity jednotek
    [SerializeField] private Transform[] groundTiles;
    [SerializeField] private float tileWidth = 14.56f;
    [SerializeField] private float leftEdge  = -13f;
    [SerializeField] private float speed     = 5f;

    void Update()
    {
        foreach (Transform tile in groundTiles)
        {
            tile.Translate(Vector3.left * speed * Time.deltaTime);

            if (tile.position.x < leftEdge)
                RecycleTile(tile);
        }
    }

    private void RecycleTile(Transform tile)
    {
        float rightmostX = float.NegativeInfinity;
        foreach (Transform t in groundTiles)
            if (t.position.x > rightmostX) rightmostX = t.position.x;

        Vector3 pos = tile.position;
        pos.x = rightmostX + tileWidth;
        tile.position = pos;
    }
}
```

Notes:
`speed` je zatím pevná hodnota — v lekci 4 ji nahradíme `GameManager.Instance.GameSpeed`. `float.NegativeInfinity` =
správná inicializace pro hledání maxima.

---

## Nastavení GroundScroller ve scéně

1. Vytvoř prázdný GameObject → pojmenuj `Ground`
2. Přidej dvě dlaždice jako **child objekty**: `GroundTile_A` a `GroundTile_B`
3. Každá dostane `SpriteRenderer` s Background.png
4. `GroundTile_A`: X = 0, `GroundTile_B`: X = 14.56 (= šířka dlaždice)
5. Na `Ground` přidej skript `GroundScroller`
6. V Inspektoru přiřaď obě dlaždice do pole **Ground Tiles**

Notes:
Skript je na rodiči (`Ground`), ale pohybuje child objekty — proto `Transform[] groundTiles`. Šířku 14.56 uprav dle
skutečné šířky tvého spritu (Pixels Per Unit).

---

## Nastavení GroundScroller — výsledek

Hierarchy by měla vypadat takto:

```
Ground          ← GroundScroller.cs je zde
├── GroundTile_A
└── GroundTile_B
```

**Play Mode (▶)** → podloží se plynule scrolluje bez přerušení ✓

Notes:
📸 Ukáž Hierarchy se strukturou Ground > GroundTile_A + GroundTile_B a Inspector Ground objektu s přiřazeným skriptem.

---

## Shrnutí lekce 2

- ✅ `DinosaurController.cs` — skok pomocí `AddForce`, detekce země
- ✅ `GroundScroller.cs` — dvě recyklované dlaždice, nekonečný scrolling

**Další lekce:** Kaktusy, spawner a detekce kolize

Notes:
Ověřit: dino skáče jednou na mezerník, podloží scrolluje bez přerušení. Viditelný šev mezi dlaždicemi = špatná hodnota
tileWidth.
