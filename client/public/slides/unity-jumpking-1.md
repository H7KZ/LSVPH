## Jump King — Část 1: Hráč a kamera

Letní škola vývoje her 2026

---

## Co dnes postavíme

<img src="/images/jumpking/player.png" style="max-height:200px; image-rendering:pixelated">

Klon Jump Kinga:

- Hráč který skáče nabíjecím skokem
- Přechod mezi obrazovkami při výstupu z patra
- Fyzika pádů a přistání na plošinách

**Cíl dopoledne:** fungující nabíjecí skok + přepínání obrazovek

Notes:
Ukažte hotovou hru 1–2 minuty před začátkem. Studenti musí vědět co staví. Hru najdete v unity/JumpKing/. Pak otevřete Unity a jdeme na to.

---

## Přehled skriptů

| Skript | Co dělá |
|---|---|
| `PlayerController` | Nabíjení skoku, detekce přistání |
| `CameraController` | Přepínání obrazovek |
| `GameManager` | Stav hry (WaitingToStart / Playing / Win) |
| `UIManager` | Panely a zobrazení patra |

Notes:
Ukažte tuto tabulku jako „mapu" celého projektu. Dopoledne uděláte PlayerController a CameraController.

---

## Hráč — vytvoř GameObject

![Hráč v Inspektoru](/images/jumpking/placeholder-player-inspector.svg)

1. Hierarchy → **Create Empty** → pojmenuj **"Hráč"**
2. Inspector → **Add Component** → **Sprite Renderer**
3. Přetáhni `Player.png` z Project okna do pole **Sprite**
4. **Add Component** → **Rigidbody2D**
   - Gravity Scale: **3**
   - Constraints → Freeze Rotation **Z** ✓
5. **Add Component** → **Box Collider 2D**

Notes:
Gravity Scale 3 = hráč padá rychle, jako v reálném Jump Kingu. Freeze Rotation zabraňuje převrácení postavy.

---

## Rigidbody2D nastavení

![Rigidbody2D nastavení](/images/jumpking/placeholder-rigidbody.svg)

Zkontroluj v Inspektoru:

| Vlastnost | Hodnota |
|---|---|
| Gravity Scale | 3 |
| Collision Detection | Continuous |
| Freeze Rotation Z | ✓ |

Notes:
Continuous collision detection zabraňuje "protunelování" přes tenké plošiny při vysoké rychlosti pádů.

---

## PlayerController — kostra + detekce země

V `Assets/Scripts/` vytvoř **PlayerController.cs**:

```csharp
using UnityEngine;

[RequireComponent(typeof(Rigidbody2D))]
public class PlayerController : MonoBehaviour
{
    [SerializeField] private float maxJumpForce = 15f;
    [SerializeField] private float maxHorizontalSpeed = 5f;
    [SerializeField] private float chargeRate = 1.5f;

    private Rigidbody2D rb;
    private bool isGrounded;
    private bool isCharging;
    private float chargeAmount;
    private float horizontalDirection;

    void Awake() { rb = GetComponent<Rigidbody2D>(); }

    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.CompareTag("Ground")) isGrounded = true;
    }

    void OnCollisionExit2D(Collision2D col)
    {
        if (col.gameObject.CompareTag("Ground")) isGrounded = false;
    }
}
```

Notes:
[RequireComponent] zaručí, že Rigidbody2D je vždy přítomen. CompareTag je rychlejší než == "Ground" a bezpečnější vůči překlepům.

---

## Detekce přistání — proč Tag?

![OnCollisionEnter2D — detekce země](/images/jumpking/placeholder-grounded.svg)

`CompareTag("Ground")` místo `gameObject.name == "Zem"`:

- **Jeden tag, víc objektů** — zem i všechny plošiny mají stejný tag
- **Rychlejší** — Unity nekopíruje string, porovnává ID
- **Překlep → chyba kompilátoru**, ne tichý bug za běhu

Jak nastavit tag:
1. Vyber GameObject "Zem" nebo "Plošina"
2. Inspector → **Tag** → **Add Tag...** → vytvoř **"Ground"**
3. Přiřaď tag v Inspector → Tag dropdown

Notes:
Studenti teď nemají zem ani plošiny. To nevadí — isGrounded zatím nejde otestovat. Pokračujeme nabíjením.

---

## Nabíjecí skok — Update()

Přidej `Update()` do `PlayerController.cs`:

```csharp
void Update()
{
    if (GameManager.Instance == null) return;
    if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

    // Začni nabíjení: mezerník stisknut a hráč stojí na zemi
    if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
    {
        isCharging = true;
        chargeAmount = 0f;
    }

    // Nabíjení: drž Space → zvyšuj sílu, čti A/D směr
    if (isCharging && Input.GetKey(KeyCode.Space))
    {
        chargeAmount = Mathf.Min(chargeAmount + chargeRate * Time.deltaTime, 1f);
        horizontalDirection = Input.GetAxisRaw("Horizontal");
    }

    // Skok: puštění Space → aplikuj rychlost
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
chargeRate = 1.5 → plné nabití za 0.67 s. Mathf.Min zabraňuje přetečení přes 1. linearVelocity = Unity 6 API (ne velocity).

---

## Nabíjecí skok — proč linearVelocity?

![Nabíjení skoku — vizualizace](/images/jumpking/placeholder-charge-demo.svg)

`rb.linearVelocity = ...` místo `rb.AddForce(...)`:

| | linearVelocity | AddForce |
|---|---|---|
| Výsledek | Přesně `chargeAmount × maxJumpForce` | Závisí na hmotnosti |
| Předvídatelnost | ✅ Vždy stejný | ❌ Může překvapit |
| Vhodné pro | Přesné platformery | Fyzikální simulace |

Notes:
Jump King je o preciznosti — hráč musí vidět přímou vazbu mezi délkou nabití a výškou skoku. AddForce by přidával k existující rychlosti.

---

## Zem — statický floor collider

1. Hierarchy → **Create Empty** → pojmenuj **"Zem"**
2. Position: X=0, Y=**-0.1**, Z=0
3. **Add Component** → **Box Collider 2D**
   - Size: X=**50**, Y=**0.2**
4. Tag → **"Ground"**

Přiřaď **PlayerController** na GameObject "Hráč".

Otestuj: Spusť hru → hráč přistane na zemi. Drž Space → pusť → hráč skočí!

Notes:
Tenký statický collider jako neviditelná podlaha. Tag "Ground" spouští isGrounded = true v PlayerController. Studenti uvidí první fungující mechaniku.

---

## CameraController — kostra

Vytvoř `Assets/Scripts/CameraController.cs`:

```csharp
using UnityEngine;

public class CameraController : MonoBehaviour
{
    [SerializeField] private Transform player;
    [SerializeField] private int totalScreens = 3;

    private int currentScreen;
    private float screenHeight;

    public int CurrentScreen => currentScreen;

    void Awake()
    {
        // orthographicSize = polovina výšky kamery v Unity jednotkách
        screenHeight = Camera.main.orthographicSize * 2f;
        SnapCamera();
    }

    private void SnapCamera()
    {
        // Střed obrazovky N je na výšce: screenHeight × (N + 0.5)
        transform.position = new Vector3(0f, screenHeight * (currentScreen + 0.5f), -10f);
    }
}
```

Přiřaď skript na **Main Camera** v Inspektoru.

Notes:
orthographicSize = 4.5 → screenHeight = 9 Unity jednotek. SnapCamera centruje kameru na aktuální obrazovku.

---

## CameraController — logika přechodu

Přidej `Update()` do `CameraController.cs`:

```csharp
void Update()
{
    if (GameManager.Instance == null) return;
    if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

    float camY = transform.position.y;
    float halfHeight = screenHeight * 0.5f;

    if (player.position.y > camY + halfHeight)
    {
        currentScreen++;
        if (currentScreen >= totalScreens)
        {
            currentScreen = totalScreens - 1;
            SnapCamera();
            GameManager.Instance.TriggerWin();
            return;
        }
        SnapCamera();
    }

    if (player.position.y < camY - halfHeight)
    {
        currentScreen = Mathf.Max(0, currentScreen - 1);
        SnapCamera();
    }
}
```

![Přechod obrazovky](/images/jumpking/placeholder-screen-switch.svg)

Notes:
Mathf.Max(0, ...) zabrání záporné obrazovce — floor collider hráče zachytí, ale guard clause je tam pro jistotu. TriggerWin() v GameManager ještě neexistuje — přidáme odpoledne.

---

## Hierarchie scény — shrnutí dopoledne

![CameraController nastavení](/images/jumpking/placeholder-camera-setup.svg)

```
Main Camera          ← CameraController (Player = Hráč, Total Screens = 3)
Hráč                 ← SpriteRenderer, Rigidbody2D, BoxCollider2D, PlayerController
Zem                  ← BoxCollider2D (Size 50×0.2, Tag: Ground, Y = -0.1)
```

Otestuj: Skoč hodně vysoko → kamera by měla přeskočit na patro 2!

Notes:
GameManager ještě neexistuje → guard clause v Update() se vrátí hned (Instance == null). Hráč ale skáče volně. CameraController.TriggerWin() zatím způsobí NullReferenceException. To odpoledne opravíme.

---

## Shrnutí části 1

Co jsme postavili:

✅ Hráč se SpriteRenderer, Rigidbody2D, BoxCollider2D
✅ Nabíjecí skok (drž Space + A/D → pusť)
✅ Detekce přistání přes Tag "Ground"
✅ Kamera přepínající obrazovky

**Odpolední cíl:** plošiny, GameManager, UIManager, výherní podmínka

Notes:
Krátká pauza. Studenti by měli mít fungující skok + kamera se pohybuje při opuštění okraje. Pokud skok nefunguje, zkontrolujte Tag "Ground" na Zem.
