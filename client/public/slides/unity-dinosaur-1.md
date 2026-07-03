## Dinosaur — Část 1: Hráč a svět

Letní škola vývoje her 2026

---

## Co dnes postavíme

<img src="/images/dinosaur/background.png" style="max-height:280px; image-rendering:pixelated; width:100%">

Klon Chrome dinosaura:

- Dinosaurus který skáče přes kaktusy
- Scrollující pozadí — iluze pohybu
- Fyzikální skok a detekce přistání
- Smrt kolizí s kaktusem

**Cíl dopoledne:** skákající dino se scrollujícím pozadím

Notes:
Ukažte hotovou hru 1–2 minuty před začátkem. Studenti musí vědět co staví. Hru najdete v unity/Dinosaur/. Pak otevřete
Unity a jdeme na to.

---

## Přehled skriptů

| Skript               | Co dělá                                    |
| -------------------- | ------------------------------------------ |
| `DinosaurController` | Skok, přistání na zemi, smrt kaktusem      |
| `GroundScroller`     | 2 dlaždice Background.png scrollují doleva |
| `ObstacleSpawner`    | Náhodné generování kaktusů                 |
| `Obstacle`           | Pohyb kaktusu doleva + Destroy             |
| `ScoreManager`       | Skóre a rekord (PlayerPrefs)               |
| `GameManager`        | Stav hry, rychlost, restart                |

Notes:
Skripty závisí na sobě — GameManager je středobod, čtou ho všechny ostatní. DinosaurController → volá
GameManager.TriggerGameOver(). GameManager → aktivuje GameOverPanel. Vždy budeme psát GameManager jako první.

---

## [RequireComponent] a SerializeField

```csharp
[RequireComponent(typeof(Rigidbody2D))]
public class DinosaurController : MonoBehaviour
{
    [SerializeField] private float jumpForce = 10f;
    [SerializeField] private AudioClip jumpSound;

    private Rigidbody2D rb;

    void Awake()
    {
        rb = GetComponent<Rigidbody2D>(); // cache jednou v Awake, ne každý snímek
    }
}
```

`[RequireComponent]` → Unity nedovolí smazat Rigidbody2D  
`[SerializeField] private` → pole viditelné v Inspektoru, nepřístupné zvenku

Notes:
Proč cache v Awake? GetComponent() volaný každý snímek (60×/s) hledá komponentu v celém GameObjectu — je pomalý. Uložíme
referenci jednou, pak ji používáme. Proč SerializeField místo public? Public odkrývá pole celé codebase — každý skript
ho může přepsat. SerializeField dává kontrolu.

---

## Krok 1 — Složky Scripts a Prefabs

**Akce v Unity:**

1. **Project** okno → pravý klik na `Assets`
2. `Create → Folder` → **`Scripts`**
3. Zopakuj pro **`Prefabs`**

<img src="/images/dinosaur/placeholder-new-project.svg" style="max-height:350px; width:100%">

Notes:
Složky neovlivňují hru, ale udržují projekt přehledný. Profesionální projekty mají desítky složek. Studenti mají Unity
projekt otevřený z Unity Hub.

---

## Krok 2 — Import nastavení spritů

**Pro každý PNG (Dinosaur, Cactus, Background):**

1. Klikni na sprite v **Project** okně
2. V **Inspektoru** nastav:
    - Texture Type: **`Sprite (2D and UI)`**
    - Pixels Per Unit: **`100`**
    - Filter Mode: **`Point (no filter)`** ← zachová ostré pixely!
3. Klikni **Apply**

<img src="/images/dinosaur/placeholder-import-sprite.svg" style="max-height:350px; width:100%">

Notes:
Point filter = pixely zůstanou ostré čtverce. Bilinear (výchozí) by pixel art rozmázal. Pixels Per Unit 100:
Background.png je 1456×816 px → v Unity bude 14.56 × 8.16 jednotek. Toto číslo budeme potřebovat pro GroundScroller.

---

## Krok 3 — Dinosaurus GameObject

**Vytvoř dino ve scéně:**

1. **Hierarchy** → pravý klik → `2D Object → Sprite`
2. Pojmenuj `Dinosaurus`
3. **SpriteRenderer** → Sprite: přetáhni `Dinosaur.png`
4. **Transform** → Position: `(-4, -1, 0)`

<img src="/images/dinosaur/placeholder-dinosaur-inspector.svg" style="max-height:280px; width:100%">

<img src="/images/dinosaur/dinosaur.png" style="max-height:80px; image-rendering:pixelated">

Notes:
Y pozice -1 je orientační — nastavíme přesně po přidání GroundCollider. Studenti zatím vidí sprite uprostřed šedé
obrazovky.

---

## Krok 4 — Rigidbody2D, BoxCollider2D, AudioSource

**Přidej na Dinosaurus:**

1. `Add Component` → **`Rigidbody2D`**
    - Gravity Scale: **`2`** ← přirozenější skok
    - Freeze Rotation Z: **`✓`** ← dino se nepřekotí
2. `Add Component` → **`BoxCollider2D`**
    - Is Trigger: **`✗`** ← fyzická kolize se zemí
3. `Add Component` → **`Audio Source`**
    - Play On Awake: **`✗`**

<img src="/images/dinosaur/placeholder-rigidbody.svg" style="max-height:350px; width:100%">

Notes:
Gravity Scale 2 = dvakrát silnější gravitace = přirozenější pocit skoku. Bez Freeze Rotation Z by se dino při kolizi
fyzicky přetočilo. BoxCollider2D se automaticky ořízne na velikost spritu.

---

## DinosaurController — skok

Vytvoř `Assets/Scripts/DinosaurController.cs`:

```csharp
[RequireComponent(typeof(Rigidbody2D))]
[RequireComponent(typeof(AudioSource))]
public class DinosaurController : MonoBehaviour
{
    [SerializeField] private float jumpForce = 10f;
    [SerializeField] private AudioClip jumpSound;

    private Rigidbody2D rb;
    private AudioSource audioSource;
    private bool isGrounded;

    void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
        audioSource = GetComponent<AudioSource>();
    }

    void Update()
    {
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        bool jumpInput = Input.GetKeyDown(KeyCode.Space)
                      || Input.GetKeyDown(KeyCode.UpArrow);

        if (jumpInput && isGrounded)
            Jump();
    }

    private void Jump()
    {
        rb.AddForce(Vector2.up * jumpForce, ForceMode2D.Impulse);
        isGrounded = false;
        if (audioSource != null && jumpSound != null)
            audioSource.PlayOneShot(jumpSound);
    }
}
```

Notes:
ForceMode2D.Impulse = okamžitý impuls. Proč ne `rb.linearVelocity = up * force`? AddForce je fyzikálně správnější —
nezruší existující pohyb, přidá impuls nahoru. Výsledek: přirozenější oblouk.

---

## DinosaurController — detekce kolizí

Přidej do třídy DinosaurController:

```csharp
// Fyzická kolize se zemí (Is Trigger = ✗)
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

// Trigger kolize s kaktusem (Is Trigger = ✓)
void OnTriggerEnter2D(Collider2D other)
{
    if (other.CompareTag("Obstacle"))
    {
        rb.simulated = false; // zamrazíme fyziku — dino zůstane na místě
        GameManager.Instance.TriggerGameOver();
    }
}
```

Notes:
Zem = fyzická kolize (blokuje průchod). Kaktus = trigger (dino proletí fyzicky, ale event se vyvolá).
`rb.simulated = false` vypne fyziku aniž skryje sprite — dino "zmrazí" na místě.

---

## Krok 5 — GroundCollider

**Neviditelná statická zem:**

1. **Hierarchy** → `Create Empty` → `GroundCollider`
2. Position: `(0, -3.8, 0)` ← zarovnej s čárou v Background.png
3. `Add Component` → **`BoxCollider2D`**
    - Size X: `40`, Size Y: `0.3`
    - Is Trigger: **`✗`**
4. **Tag** → `Add Tag...` → přidej `Ground`
5. Nastav Tag na `GroundCollider` → **`Ground`**

<img src="/images/dinosaur/placeholder-ground.svg" style="max-height:350px; width:100%">

Notes:
Proč samostatný collider? Background.png je 14.56 × 8.16 jednotek — jeho BoxCollider2D by blokoval i vzduch nad zemí.
Neviditelný collider dá přesnou výšku přistání. Y = -3.8 odpovídá čáře v Background.png — dolaď pohledem na Scene view.

---

## Krok 6 — Scrollující pozadí (2 dlaždice)

**Dvě kopie Background.png:**

1. `2D Object → Sprite` → `BackgroundTile_A`
    - Sprite: `Background.png`, Position: `(0, 0, 0)`, Order in Layer: **`-1`**
2. **Ctrl+D** → `BackgroundTile_B`, Position: `(14.56, 0, 0)`
3. `Create Empty` → `Ground`
4. Přetáhni obě dlaždice jako children do `Ground`
5. Přidej skript `GroundScroller` na `Ground`
6. Přetáhni `BackgroundTile_A` a `BackgroundTile_B` do pole **Ground Tiles**

<img src="/images/dinosaur/placeholder-ground.svg" style="max-height:350px; width:100%">

Notes:
14.56 = 1456 px ÷ 100 PPU. Obě dlaždice musí navazovat bez mezery. Order in Layer -1 = pozadí bude za dinem (dino je na
vrstvě 0).

---

## GroundScroller — recyklace dlaždic

Vytvoř `Assets/Scripts/GroundScroller.cs`:

```csharp
public class GroundScroller : MonoBehaviour
{
    [SerializeField] private Transform[] groundTiles;
    [SerializeField] private float tileWidth = 14.56f; // 1456 px ÷ 100 PPU
    [SerializeField] private float leftEdge = -13f;

    void Update()
    {
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        float moveAmount = GameManager.Instance.GameSpeed * Time.deltaTime;

        foreach (Transform tile in groundTiles)
        {
            tile.Translate(Vector3.left * moveAmount);

            if (tile.position.x <= leftEdge)
                RecycleTile(tile);
        }
    }

    private void RecycleTile(Transform tile)
    {
        Vector3 pos = tile.position;
        pos.x += tileWidth * groundTiles.Length; // skoč za poslední dlaždici
        tile.position = pos;
    }
}
```

Notes:
Recyklace: A vyjede vlevo (-13) → teleportuje se doprava za B → `[B][A]` → B vypadne → `[A][B]` → atd. Žádné mezery.
Žádné přeskoky. Nekonečný scroll ze dvou objektů.

---

## Hierarchy — shrnutí části 1

```
├── Main Camera              Position (0, 0, -10)
├── GroundCollider           BoxCollider2D, Size (40, 0.3), Tag: Ground, Y: -3.8
├── Ground (+ GroundScroller, tiles: 2)
│   ├── BackgroundTile_A    Background.png, Order: -1, Pos (0,0)
│   └── BackgroundTile_B    Background.png, Order: -1, Pos (14.56,0)
└── Dinosaurus               Position (-4, -1, 0)
    ├── SpriteRenderer       [Dinosaur.png]
    ├── Rigidbody2D          Gravity Scale: 2, Freeze Z: ✓
    ├── BoxCollider2D        Is Trigger: ✗
    ├── AudioSource          Play On Awake: ✗
    └── DinosaurController   jumpForce: 10
```

Notes:
Pusťte Play — dino by mělo padat na zem a skákat na mezerník. Pozadí scrolluje. Pokud dino nesedí na zemi: upravte Y
GroundCollider nebo Y dina. Pokud pozadí scrolluje divně: zkontrolujte tileWidth (musí být 14.56).

---

## Shrnutí části 1

Naučili jsme se:

- `[RequireComponent]` + cache v `Awake` — výkon a bezpečnost
- `AddForce(Impulse)` — fyzikálně přirozený skok
- `OnCollisionEnter2D` — přistání (Tag: Ground)
- `OnTriggerEnter2D` — smrt (Tag: Obstacle)
- `GroundScroller` — recyklace 2 dlaždic, nekonečný scroll

Po obědě přidáme:

- Kaktusy (prefab + náhodný spawn + pohyb + Destroy)
- Canvas, TextMeshPro a skóre
- GameManager se stavovým automatem a restartem

Notes:
10–15 minut na experimentování: jumpForce (zkuste 15, 5), Gravity Scale (3 vs 1), tileWidth. Pak oběd.
