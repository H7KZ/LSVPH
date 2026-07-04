## Dinosaur Runner — Lekce 2: Skok a scrolling

Letní škola vývoje her 2026

---

## Co postavíme dnes

Dinosaurus skáče a pozadí se scrolluje — iluze pohybu doprava.

**Výsledek:** dino skáče při stisku klávesy, pozadí plynule scrolluje

Notes:
Scrolling pozadí je klíčová technika runner her. Budeme recyklovat pozadí (nekonečná smyčka).

---

## DinoController.cs — skok

```csharp
using UnityEngine;

public class DinoController : MonoBehaviour
{
    [SerializeField] private float jumpForce = 10f;
    [SerializeField] private Rigidbody2D rb;
    private bool isGrounded = true;

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
        {
            rb.linearVelocity = Vector2.up * jumpForce;
            isGrounded = false;
        }
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.CompareTag("Ground"))
            isGrounded = true;
    }
}
```

Notes:
`isGrounded` flag zabraňuje dvojskoku. Přiřadit skript na Dino, propojit Rigidbody. Nastavit tag "Ground" na podlaze.

---

## Tag "Ground" na podlaze

1. Vyber `Ground` v Hierarchy
2. Inspector → **Tag → Add Tag** → přidej `Ground`
3. Znovu vyber `Ground` → nastav Tag na `Ground`

Notes:
Bez tagu "Ground" bude `isGrounded` vždy false a dino bude moci skákat neomezeně.

---

## Scrollující pozadí — jak funguje

```
Dvě kopie pozadí vedle sebe:  [ BG1 ][ BG2 ]
Pohybují se doleva:            → →  [ BG2 ][ BG1 ] →
BG1 vyjedeme za levý okraj → přesuneme ji za BG2:
                              [ BG2 ][ BG1 ]
Výsledek: nekonečné opakování ✓
```

Notes:
Tato technika se nazývá "infinite scrolling" nebo "seamless loop". Funguje pro jakékoliv opakující se pozadí.

---

## BackgroundScroller.cs

```csharp
using UnityEngine;

public class BackgroundScroller : MonoBehaviour
{
    [SerializeField] private float scrollSpeed = 3f;
    [SerializeField] private float resetX = -20f;
    [SerializeField] private float startX = 20f;

    void Update()
    {
        transform.position += Vector3.left * scrollSpeed * Time.deltaTime;
        if (transform.position.x <= resetX)
            transform.position = new Vector3(startX, transform.position.y, transform.position.z);
    }
}
```

Notes:
Přiřadit skript na obě kopie pozadí. `resetX` a `startX` nastavit dle šířky pozadí v Unity jednotkách.

---

## Nastavení scrollujícího pozadí

1. Přetáhni `Background.png` do scény → pojmenuj `BG1`
2. Duplicituj (Ctrl+D) → pojmenuj `BG2`
3. Nastav `BG2` pozici: hned za `BG1` (X + šířka BG1)
4. Přiřaď `BackgroundScroller.cs` na obě

**Play Mode (▶)** → pozadí se plynule scrolluje ✓

Notes:
Šířka pozadí v Unity jednotkách závisí na Pixels Per Unit. Experimentovat s resetX/startX hodnotami.

---

## Shrnutí lekce 2

- ✅ Dino skáče jednou na mezerník (`isGrounded` flag)
- ✅ Dvě kopie pozadí se scrollují a recyklují
- ✅ Iluze pohybu doprava

**Další lekce:** Kaktusy, spawner a kolize

Notes:
Ověřit: dino skáče, pozadí scrolluje bez přerušení. Pokud je viditelný přechod mezi BG1 a BG2: upravit startX.
