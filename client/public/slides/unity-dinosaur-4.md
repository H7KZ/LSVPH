## Dinosaur Runner — Lekce 4: GameManager a herní stav

Letní škola vývoje her 2026 · Honza

---

## Co postavíme dnes

GameManager — mozek hry: spuštění, zrychlování, Game Over obrazovka.

**Výsledek:** hra čeká na mezerník → spustí se → postupně zrychluje → zobrazí Game Over

Notes:
GameManager je nejdůležitější skript projektu. Zavádí Singleton vzor, enum stavů a drží `GameSpeed` — hodnotu, kterou
čtou všechny ostatní skripty.

---

## Singleton vzor

```csharp
// GameManager existuje ve scéně jen JEDNOU.
// Ostatní skripty ho najdou přes: GameManager.Instance
public static GameManager Instance { get; private set; }

void Awake()
{
    if (Instance != null) { Destroy(gameObject); return; }
    Instance = this;
}
```

**Proč Singleton?** `Cactus.cs`, `GroundScroller.cs` i `ScoreManager.cs` potřebují `GameSpeed` bez hledání reference v
Inspektoru.

Notes:
`static` = patří třídě, ne instanci → přístup odkudkoliv jako `GameManager.Instance.GameSpeed`. Guard clause v Awake
zničí duplicit (vznikne při reload scény).

---

## Enum — stav hry

```csharp
// Enum = pojmenovaný výčet — hra je vždy právě v jednom stavu
public enum GameState
{
    WaitingToStart, // čeká na první stisk mezerníku
    Playing,        // hra běží
    GameOver        // dino narazilo do kaktusu
}

public GameState CurrentState { get; private set; } = GameState.WaitingToStart;
```

Notes:
Enum je čitelnější než `bool isPlaying` nebo `int state = 2`. Ostatní skripty zkontrolují `CurrentState != Playing` a "
zamrznou" — nemusí znát detaily stavu.

---

## GameManager.cs

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public static GameManager Instance { get; private set; }

    public enum GameState { WaitingToStart, Playing, GameOver }
    public GameState CurrentState { get; private set; } = GameState.WaitingToStart;

    [SerializeField] private float initialSpeed = 5f;
    [SerializeField] private float speedIncreasePerSecond = 0.5f;
    [SerializeField] private float maxSpeed = 25f;
    public float GameSpeed { get; private set; }

    [SerializeField] private GameObject startPanel;
    [SerializeField] private GameObject gameOverPanel;

    void Awake() { if (Instance != null) { Destroy(gameObject); return; } Instance = this; }

    void Start()
    {
        GameSpeed = initialSpeed;
        startPanel.SetActive(true);
        gameOverPanel.SetActive(false);
    }

    void Update()
    {
        bool input = Input.GetKeyDown(KeyCode.Space) || Input.GetKeyDown(KeyCode.UpArrow);
        if (input && CurrentState == GameState.WaitingToStart) StartGame();
        else if (input && CurrentState == GameState.GameOver)  RestartGame();
        if (CurrentState == GameState.Playing)
            GameSpeed = Mathf.Min(GameSpeed + speedIncreasePerSecond * Time.deltaTime, maxSpeed);
    }

    public void StartGame() { CurrentState = GameState.Playing; startPanel.SetActive(false); }

    public void TriggerGameOver()
    {
        if (CurrentState != GameState.Playing) return; // guard clause — fyzika volá event víckrát
        CurrentState = GameState.GameOver;
        gameOverPanel.SetActive(true);
    }

    private void RestartGame() =>
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
}
```

Notes:
`Mathf.Min` = GameSpeed nikdy nepřekročí maxSpeed. `TriggerGameOver` má guard clause — fyzika může poslat kolizní event
víckrát za snímek.

---

## UI Panely — nastavení

1. **GameObject → UI → Canvas** (Unity vytvoří Canvas + EventSystem)
2. **Canvas Scaler → UI Scale Mode:** `Scale With Screen Size`, rozlišení `1920 × 1080`
3. Vytvoř child `StartPanel` → přidej text "Stiskni mezerník nebo ↑"
4. Vytvoř child `GameOverPanel` → přidej text "Game Over"
5. Vytvoř prázdný GameObject `GameManager` → přiřaď skript `GameManager.cs`
6. V Inspektoru propoj `Start Panel` a `Game Over Panel`

Notes:
Panel = prázdný GameObject s Image komponentou. Průhledné pozadí (nastavit alpha) působí jako overlay. Bez Canvas
Scaleru bude UI jinak velké na různých rozlišeních.

---

## Aktualizace Cactus.cs a GroundScroller.cs

Nahraď pevnou rychlost `speed` za `GameManager.Instance.GameSpeed`:

**Cactus.cs** — odstraň `[SerializeField] private float speed = 5f;` a nahraď `Update()`:

```csharp
void Update()
{
    if (GameManager.Instance == null) return;
    if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

    transform.Translate(Vector3.left * GameManager.Instance.GameSpeed * Time.deltaTime);
    if (transform.position.x < DestroyX) Destroy(gameObject);
}
```

**GroundScroller.cs** — nový `Update()` (odstraň `[SerializeField] private float speed`):

```csharp
void Update()
{
    if (GameManager.Instance == null) return;
    if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;
    float speed = GameManager.Instance.GameSpeed;
    foreach (Transform tile in groundTiles)
    {
        tile.Translate(Vector3.left * speed * Time.deltaTime);
        if (tile.position.x < leftEdge) RecycleTile(tile);
    }
}
```

Notes:
Null check (`GameManager.Instance == null`) chrání před chybou při startu scény — GameManager se inicializuje v `Awake`,
ostatní skripty v `Start`.

---

## Aktualizace DinosaurController.cs

Přidej state check na začátek `Update()` a dokonči `OnTriggerEnter2D`:

```csharp
void Update()
{
    if (GameManager.Instance == null) return;
    if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;
    // ... (zbytek skoku beze změny)
}

void OnTriggerEnter2D(Collider2D other)
{
    if (other.CompareTag("Cactus"))
    {
        rb.simulated = false;
        GameManager.Instance.TriggerGameOver();
    }
}
```

Notes:
State check v `Update` = dino neskáče ani na start screenu, ani po Game Over. `TriggerGameOver` zobrazí panel a přepne
stav.

---

## Shrnutí lekce 4

- ✅ `GameManager.cs` — Singleton, enum stavů, `GameSpeed`, Game Over
- ✅ Start panel → Playing → Game Over panel → Restart
- ✅ `Cactus.cs` a `GroundScroller.cs` používají `GameSpeed`
- ✅ `DinosaurController` volá `TriggerGameOver()`

**Další lekce:** ScoreManager — skóre, high score, PlayerPrefs

Notes:
Ověřit: hra čeká na mezerník, spustí se, postupně zrychluje, Game Over zobrazí panel. Restart = mezerník/šipka po Game
Over.
