## Jump King — Lekce 2: Nabíjený skok

Letní škola vývoje her 2026 · Honza

---

## Co postavíme dnes

Nabíjený skok — čím déle držíš mezerník, tím výš a dál vyskočíš.

**Výsledek:** skok reaguje na délku stisku + hráč volí směr při nabíjení

Notes:
Toto je HLAVNÍ mechanika Jump Kinga. Věnuj hodně času. Studenti budou chtít experimentovat — to je správně.

---

## Jak nabíjený skok funguje

```
KROK 1 — Stisk Space (na zemi):
  isCharging = true, chargeAmount = 0

KROK 2 — Držení Space:
  chargeAmount roste: 0 → 1
  A/D nastaví horizontální směr

KROK 3 — Puštění Space:
  rychlost = směr × nabití × maxSíla
  chargeAmount = 0, isCharging = false
```

Za letu nelze měnit směr — záměr, tak to funguje v originále.

Notes:
Lineární škálování nabití. chargeAmount je číslo 0–1 (= procento nabití).

---

## Proměnné pro skok

Přidej do `PlayerController.cs`:

```csharp
[Header("Skok")]
[SerializeField] private float maxJumpForce = 15f;
[SerializeField] private float maxHorizontalSpeed = 5f;
[SerializeField] private float chargeRate = 1.5f; // plné nabití za ~0.67 s

private bool isGrounded;
private bool isCharging;
private float chargeAmount;       // 0 = nenabito, 1 = plně nabito
private float horizontalDirection; // -1, 0, nebo +1
```

Notes:
chargeRate 1.5 → za 0.67 sekundy je nabito na maximum. Hodnotu lze měnit v Inspektoru.

---

## Update() — tři kroky skoku

Nahraď celé `Update()`:

```csharp
void Update()
{
    // KROK 1: Stisk Space na zemi zahájí nabíjení
    if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
    {
        isCharging = true;
        chargeAmount = 0f;
    }

    // KROK 2: Držení Space zvyšuje nabití + hráč volí směr
    if (isCharging && Input.GetKey(KeyCode.Space))
    {
        chargeAmount = Mathf.Min(chargeAmount + chargeRate * Time.deltaTime, 1f);
        horizontalDirection = Input.GetAxisRaw("Horizontal");
    }

    // KROK 3: Puštění Space odpaluje skok
    if (isCharging && Input.GetKeyUp(KeyCode.Space))
    {
        rb.linearVelocity = new Vector2(
            horizontalDirection * chargeAmount * maxHorizontalSpeed,
            chargeAmount * maxJumpForce
        );
        isCharging = false;
        chargeAmount = 0f;
    }
}
```

Notes:
Mathf.Min = chargeAmount nepřekročí 1. GetKey (ne GetKeyDown) = registruje držení klávesy.

---

## isGrounded — detekce dopadu

Přidej metody pod `Update()`:

```csharp
void OnCollisionEnter2D(Collision2D col)
{
    if (col.gameObject.CompareTag("Ground")) isGrounded = true;
}

void OnCollisionExit2D(Collision2D col)
{
    if (col.gameObject.CompareTag("Ground")) isGrounded = false;
}
```

Unity volá tyto metody automaticky při kolizi s jinými objekty.

Notes:
Tag "Ground" musí být nastaven na Ground objektu (lekce 1). CompareTag je efektivnější než == pro string porovnání.

---

## Hotový PlayerController.cs

```csharp
using UnityEngine;

[RequireComponent(typeof(Rigidbody2D))]
public class PlayerController : MonoBehaviour
{
    [Header("Skok")]
    [SerializeField] private float maxJumpForce = 15f;
    [SerializeField] private float maxHorizontalSpeed = 5f;
    [SerializeField] private float chargeRate = 1.5f;

    private Rigidbody2D rb;
    private bool isGrounded;
    private bool isCharging;
    private float chargeAmount;
    private float horizontalDirection;

    void Awake() { rb = GetComponent<Rigidbody2D>(); }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
        { isCharging = true; chargeAmount = 0f; }

        if (isCharging && Input.GetKey(KeyCode.Space))
        { chargeAmount = Mathf.Min(chargeAmount + chargeRate * Time.deltaTime, 1f);
          horizontalDirection = Input.GetAxisRaw("Horizontal"); }

        if (isCharging && Input.GetKeyUp(KeyCode.Space))
        { rb.linearVelocity = new Vector2(
              horizontalDirection * chargeAmount * maxHorizontalSpeed,
              chargeAmount * maxJumpForce);
          isCharging = false; chargeAmount = 0f; }
    }

    void OnCollisionEnter2D(Collision2D col)
    { if (col.gameObject.CompareTag("Ground")) isGrounded = true; }

    void OnCollisionExit2D(Collision2D col)
    { if (col.gameObject.CompareTag("Ground")) isGrounded = false; }
}
```

Notes:
Kompaktní verze pro přehled — do souboru pište klidně s více mezerami a komentáři.

---

## Test nabíjecího skoku

▶ **Play** a vyzkoušej:

- Krátký stisk Space → malý skok
- Dlouhé držení Space → vysoký skok
- A/D při nabíjení → skok vlevo / vpravo

Notes:
Nejčastější bug: postava skáče i ve vzduchu. Příčina: isGrounded zůstane true. Zkontrolovat Tag "Ground" na Ground objektu.

---

## Shrnutí lekce 2

- ✅ chargeAmount roste při držení Space (0 → 1)
- ✅ Síla skoku závisí na nabití
- ✅ Směr se volí při nabíjení, za letu se nezmění
- ✅ isGrounded detekuje dopad přes OnCollision

**Další lekce:** plošiny a level design — 3 patra

Notes:
Pokud skok nefunguje: 1. isGrounded? 2. Tag "Ground" nastaven? 3. Box Collider 2D na Ground?
