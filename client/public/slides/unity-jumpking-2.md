## Jump King — Lekce 2: Nabíjený skok

Letní škola vývoje her 2026

---

## Co postavíme dnes

Nabíjený skok — čím déle držíš mezerník, tím výš vyskočíš.

**Výsledek:** skok se nabíjí při držení klávesy, vizuální feedback ukazuje sílu

Notes:
Toto je HLAVNÍ mechanika Jump King. Dejte hodně času. Studenti budou chtít tuto část experimentovat.

---

## Jak nabíjený skok funguje

```
Hráč drží mezerník:
  → chargeTime roste (0 → maxCharge)

Hráč pustí mezerník:
  → jumpForce = chargeTime / maxCharge × maxJumpForce
  → rb.linearVelocity = Vector2.up * jumpForce
  → chargeTime = 0
```

Notes:
Lineární škálování síly. Jump King originál má specifickou fyziku, ale náš model je dostatečně zábavný.

---

## PlayerController.cs — nabíjení

Přidej do existujícího skriptu:

```csharp
[SerializeField] private float maxJumpForce = 15f;
[SerializeField] private float maxChargeTime = 1f;
private float chargeTime;
private bool isGrounded;

void Update()
{
    float x = Input.GetAxisRaw("Horizontal");
    rb.linearVelocity = new Vector2(x * moveSpeed, rb.linearVelocity.y);

    if (Input.GetKey(KeyCode.Space) && isGrounded)
        chargeTime = Mathf.Min(chargeTime + Time.deltaTime, maxChargeTime);

    if (Input.GetKeyUp(KeyCode.Space) && isGrounded)
    {
        float force = (chargeTime / maxChargeTime) * maxJumpForce;
        rb.linearVelocity = new Vector2(rb.linearVelocity.x, force);
        chargeTime = 0f;
    }
}
```

Notes:
`Mathf.Min` = chargeTime nikdy nepřekročí maxChargeTime. `GetKey` (ne GetKeyDown) = registruje držení.

---

## isGrounded — detekce země

Přidej do `PlayerController.cs`:

```csharp
void OnCollisionEnter2D(Collision2D col)
{
    if (col.gameObject.CompareTag("Ground"))
        isGrounded = true;
}

void OnCollisionExit2D(Collision2D col)
{
    if (col.gameObject.CompareTag("Ground"))
        isGrounded = false;
}
```

Notes:
Tag "Ground" musí být nastaven na Tilemap objektu (přidáme v lekci 3 s Tilemap Colliderem).

---

## Vizuální feedback — charge bar

1. **GameObject → UI → Canvas**
2. Přidej **Image** → pojmenuj `ChargeBar`
3. Nastav **Image Type:** `Filled`, **Fill Method:** `Horizontal`
4. Umísti nad postavu nebo do rohu obrazovky

Do `Update()` v PlayerController přidej:

```csharp
[SerializeField] private UnityEngine.UI.Image chargeBar;

// na konci Update():
if (chargeBar != null)
    chargeBar.fillAmount = chargeTime / maxChargeTime;
```

Notes:
`fillAmount` 0–1 = jak moc je bar zaplněný. Propojit `chargeBar` referenci v Inspektoru.

---

## Test nabíjecího skoku

Spusť Play Mode a vyzkoušej:

- Krátké kliknutí → malý skok
- Dlouhé držení → vysoký skok
- Charge bar roste při držení

Notes:
Postava zatím propadá skrz Tilemap — normální. Tilemap Collider přidáme v lekci 3. Pro testování skoku dočasně přidej Box Collider na prázdný Ground objekt.

---

## Shrnutí lekce 2

- ✅ Nabíjení skoku při držení mezerníku
- ✅ Síla skoku závisí na době nabití
- ✅ Vizuální charge bar

**Další lekce:** Tilemap kolize a level design

Notes:
Ověřit: nabíjení funguje logicky. Nejčastější bug: chargeTime neresetuje → zkontrolovat že `chargeTime = 0f` je v sekci GetKeyUp.
