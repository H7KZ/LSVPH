## Dinosaur — Část 2: Překážky, skóre a GameManager

Letní škola vývoje her 2026

---

## Co máme, co chybí

Máme:

- ✅ Dinosaurus se skokem a fyzikou
- ✅ Scrollující pozadí (GroundScroller)
- ✅ Detekce přistání a smrt kolizí

Chybí:

- ❌ Kaktusy které se spawnují a pohybují
- ❌ Skóre a rekord
- ❌ GameManager — správa stavu, zrychlování, restart

Notes:
Krátké opakování dopoledne. Pusťte Play — dino skáče, pozadí scrolluje. Připomeňte každý skript. Dnes napíšeme zbytek a hra bude kompletní.

---

## Krok 7 — Kaktus Prefab

**Vytvoř kaktus a ulož jako prefab:**

1. `2D Object → Sprite` → `Kaktus`
   - Sprite: `Cactus.png`, Position: `(12, -2.8, 0)`
2. `Add Component` → **`BoxCollider2D`**
   - Is Trigger: **`✓`** ← trigger, ne fyzická kolize!
3. Tag: **`Obstacle`** (vytvoř tag pokud neexistuje)
4. **Přetáhni `Kaktus` z Hierarchy do `Assets/Prefabs/`** → vznikne prefab
5. Smaž `Kaktus` z Hierarchy (spawner ho vytvoří za běhu)

<img src="/images/dinosaur/placeholder-cactus-prefab.svg" style="max-height:280px; width:100%">

<img src="/images/dinosaur/cactus.png" style="max-height:100px; image-rendering:pixelated">

Notes:
Is Trigger = dino proletí fyzicky bez odrazu, ale OnTriggerEnter2D v DinosaurController se spustí. Modré ohraničení v Scene view = trigger. Zelené = fyzický collider. Prefab = šablona objektu ze které spawner vytváří kopie.

---

## Obstacle.cs — pohyb doleva

Otevři `Kaktus.prefab` (dvojklik v Project), přidej `Assets/Scripts/Obstacle.cs`:

```csharp
public class Obstacle : MonoBehaviour
{
    private const float DestroyXThreshold = -20f;

    void Update()
    {
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        // Pohyb závisí na rychlosti hry — kaktusy zrychlují spolu se hrou
        transform.Translate(Vector3.left * GameManager.Instance.GameSpeed * Time.deltaTime);

        // Destroy uvolní paměť — bez tohoto by se kaktusy hromadily mimo obrazovku
        if (transform.position.x < DestroyXThreshold)
            Destroy(gameObject);
    }
}
```

Notes:
-20 je bezpečně za kamerou (kamera vidí X: -8 až +8). Bez Destroy = memory leak — paměť narůstá s každým kaktusem donekonečna. Každý Instantiate vytvoří kaktus v paměti; Destroy ho odstraní.

---

## Krok 8 — ObstacleSpawner ve scéně

**Přidej spawner:**

1. `Create Empty` → `ObstacleSpawner`
2. Position: `(12, -2.8, 0)` ← vpravo za okrajem kamery, Y = výška kaktusu
3. `Add Component` → `ObstacleSpawner` (skript píšeme hned)
4. **Obstacle Prefab:** přetáhni `Kaktus.prefab`

<img src="/images/dinosaur/placeholder-cactus-prefab.svg" style="max-height:350px; width:100%">

Notes:
X = +12 je vpravo za okrajem kamery (kamera vidí cca ±8). Kaktusy se spawnou a rovnou pohybují doleva — student neuvidí "teleportaci" kaktusu na scénu.

---

## ObstacleSpawner.cs — náhodný spawn

Vytvoř `Assets/Scripts/ObstacleSpawner.cs`:

```csharp
public class ObstacleSpawner : MonoBehaviour
{
    [SerializeField] private GameObject obstaclePrefab;
    [SerializeField] private float minInterval = 1.5f;
    [SerializeField] private float maxInterval = 3.5f;

    private float timer;
    private float nextSpawnTime;

    void Start()
    {
        nextSpawnTime = Random.Range(minInterval, maxInterval);
    }

    void Update()
    {
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        timer += Time.deltaTime;

        if (timer >= nextSpawnTime)
        {
            Instantiate(obstaclePrefab, transform.position, Quaternion.identity);
            timer = 0f;
            nextSpawnTime = Random.Range(minInterval, maxInterval);
        }
    }
}
```

Notes:
Proč ruční timer místo InvokeRepeating? Ruční timer umožní v budoucnu zmenšovat interval jak hra zrychluje. Random.Range vrátí náhodné float mezi min a max — každý kaktus přijde v jiném čase.

---

## Krok 9 — Canvas a UI panely

**Vytvoř UI:**

1. `UI → Canvas` (Render Mode: Screen Space - Overlay)
2. Pod Canvas → `Create Empty` → `StartPanel`
   - Child: `UI → Text - TextMeshPro` → `"Stiskni mezerník nebo ↑"`
   - StartPanel nastav jako **neaktivní** v Inspektoru
3. Pod Canvas → `Create Empty` → `GameOverPanel`
   - Child TextMeshPro: `"KONEC HRY"`
   - Druhý Child: `"Stiskni mezerník pro restart"`
   - GameOverPanel nastav jako **neaktivní**
4. Pod Canvas (přímo): `UI → Text - TextMeshPro` → `ScoreText` → `"00000"`
5. Pod Canvas (přímo): `UI → Text - TextMeshPro` → `HighScoreText` → `"HI 00000"`

<img src="/images/dinosaur/placeholder-canvas.svg" style="max-height:350px; width:100%">

Notes:
StartPanel = aktivní na začátku, GameManager.Start() ho aktivuje, StartGame() deaktivuje. GameOverPanel = neaktivní, TriggerGameOver() ho aktivuje. Oba panely nastavte jako neaktivní v Inspektoru — odškrtněte checkbox vlevo od názvu v Hierarchy.

---

## ScoreManager.cs — skóre a rekord

Vytvoř `Assets/Scripts/ScoreManager.cs`:

```csharp
using TMPro;
using UnityEngine;

public class ScoreManager : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI scoreText;
    [SerializeField] private TextMeshProUGUI highScoreText;

    private const string HighScoreKey = "DinosaurHighScore";
    private float score;
    private int highScore;

    void Start()
    {
        highScore = PlayerPrefs.GetInt(HighScoreKey, 0);
        highScoreText.text = "HI " + highScore.ToString("D5");
        scoreText.text = "00000";
    }

    void Update()
    {
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        score += GameManager.Instance.GameSpeed * Time.deltaTime;
        int displayScore = Mathf.FloorToInt(score);
        scoreText.text = displayScore.ToString("D5");

        if (displayScore > highScore)
        {
            highScore = displayScore;
            highScoreText.text = "HI " + highScore.ToString("D5");
            PlayerPrefs.SetInt(HighScoreKey, highScore);
        }
    }
}
```

Notes:
Skóre = rychlost × čas = ujetá vzdálenost. "D5" = vždy 5 číslic: "00042". PlayerPrefs uloží do registru Windows — rekord přežije zavření Unity i restart počítače.

---

## GameManager — singleton a stavový automat

Vytvoř `Assets/Scripts/GameManager.cs`:

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public static GameManager Instance { get; private set; }

    public enum GameState { WaitingToStart, Playing, GameOver }
    public GameState CurrentState { get; private set; } = GameState.WaitingToStart;

    public float GameSpeed { get; private set; }
    [SerializeField] private float initialSpeed = 5f;
    [SerializeField] private float speedIncreasePerSecond = 0.5f;
    [SerializeField] private float maxSpeed = 25f;

    [SerializeField] private GameObject startPanel;
    [SerializeField] private GameObject gameOverPanel;
    [SerializeField] private AudioSource backgroundMusic;
    [SerializeField] private AudioSource sfxSource;
    [SerializeField] private AudioClip gameOverClip;

    void Awake()
    {
        if (Instance != null) { Destroy(gameObject); return; }
        Instance = this;
    }

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
```

Notes:
Singleton = jen jedna instance. Enum GameState = jasné pojmenované stavy místo "if isStarted && !isDead" spaghetti. `{ get; private set; }` = čitelné zvenku, zapisovatelné jen uvnitř třídy.

---

## GameManager — TriggerGameOver a restart

Přidej metody (dokončení třídy GameManager):

```csharp
    public void StartGame()
    {
        CurrentState = GameState.Playing;
        startPanel.SetActive(false);
        if (backgroundMusic != null) backgroundMusic.Play();
    }

    public void TriggerGameOver()
    {
        if (CurrentState != GameState.Playing) return; // guard: zabrání dvojitému volání

        CurrentState = GameState.GameOver;
        gameOverPanel.SetActive(true);

        if (backgroundMusic != null) backgroundMusic.Stop();
        if (sfxSource != null && gameOverClip != null)
            sfxSource.PlayOneShot(gameOverClip);
    }

    private void RestartGame()
    {
        // Reload scény = kompletní reset všech objektů do Start() stavu
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }
}
```

Notes:
Guard v TriggerGameOver: DinosaurController může zavolat TriggerGameOver vícekrát za snímek (kaktusy se překrývají). Guard zajistí GameOver jen jednou. SceneManager.LoadScene = vše se inicializuje znovu od nuly.

---

## Krok 10 — GameManager ve scéně a propojení

**Vytvoř GameManager GameObject a napoj vše:**

1. `Create Empty` → `GameManager`
2. Přidej skript **`GameManager`**
3. Přidej skript **`ScoreManager`**
4. V Inspektoru propoj:
   - **Start Panel** → přetáhni `StartPanel`
   - **Game Over Panel** → přetáhni `GameOverPanel`
   - **Score Text** → přetáhni `ScoreText`
   - **High Score Text** → přetáhni `HighScoreText`

<img src="/images/dinosaur/placeholder-gameover.svg" style="max-height:350px; width:100%">

Notes:
Audio pole (Background Music, Sfx Source, Game Over Clip) jsou volitelná. Bez zvuku hra funguje normálně. GameManager a ScoreManager sdílejí jeden GameObject — oba řídí "správu hry".

---

## Kompletní Hierarchy

```
├── Main Camera
├── GroundCollider          BoxCollider2D, Tag: Ground, Y: -3.8
├── Ground (+ GroundScroller)
│   ├── BackgroundTile_A   Background.png, Order: -1
│   └── BackgroundTile_B   Background.png, Order: -1
├── Dinosaurus
│   ├── SpriteRenderer     [Dinosaur.png]
│   ├── Rigidbody2D        Gravity: 2, Freeze Z: ✓
│   ├── BoxCollider2D      Is Trigger: ✗
│   ├── AudioSource        Play On Awake: ✗
│   └── DinosaurController jumpForce: 10
├── ObstacleSpawner        Pos (12, -2.8, 0), Prefab: Kaktus
├── Canvas
│   ├── StartPanel         aktivní → deaktivuje StartGame()
│   ├── GameOverPanel      neaktivní → aktivuje TriggerGameOver()
│   ├── ScoreText          TextMeshProUGUI
│   └── HighScoreText      TextMeshProUGUI
└── GameManager
    ├── GameManager script  + StartPanel, GameOverPanel napojeny
    └── ScoreManager script + ScoreText, HighScoreText napojeny
```

Notes:
Pusťte Play — hra by měla fungovat kompletně: čekání na mezerník, scrollující pozadí, kaktusy přicházejí, hra zrychluje, kolize = Game Over, restart. Pokud něco nefunguje — Console okno ukáže chybu.

---

## Hotovo!

<img src="/images/dinosaur/placeholder-final-game.svg" style="max-height:250px; width:100%">

Náš Dinosaur umí:

- ✅ Skok s fyzikou (`AddForce Impulse`)
- ✅ Scrollující pozadí (recyklace 2 dlaždic)
- ✅ Kaktusy (Prefab + náhodný spawn + Destroy)
- ✅ Smrt kolizí (Trigger → `TriggerGameOver`)
- ✅ Skóre a rekord (`speed × čas`, PlayerPrefs)
- ✅ Stavový automat (`WaitingToStart → Playing → GameOver`)
- ✅ Restart (`SceneManager.LoadScene`)

Notes:
Gratulujte studentům! Mají kompletní hru s fyzikou, prefaby, spawnem, UI, stavovým automatem a persistentním rekordem. To jsou základy každé profesionální Unity hry.

---

## Nápady na rozšíření

Kdo chce jít dál:

- **Animace dinosaura** — Animator + sprite sheet (běh, skok, smrt)
- **Různé typy kaktusů** — pole prefabů v ObstacleSpawner, náhodný výběr
- **Létající překážky** — ptáci v různých výškách
- **Zvuk skoku** — přetáhni AudioClip do DinosaurController
- **Mobilní ovládání** — `Input.GetMouseButtonDown(0)` pro tap

Notes:
20 minut volného experimentování. Připomeňte koncepty dne: fyzika (Rigidbody, ForceMode), kolize (fyzické vs. trigger), prefaby (Instantiate/Destroy), UI, singleton, stavový automat, PlayerPrefs.

---

## Shrnutí workshopu

| Koncept | Kde jsme ho použili |
|---|---|
| `[RequireComponent]` | DinosaurController |
| Cache v `Awake` | Všechny skripty s komponentami |
| `AddForce(Impulse)` | DinosaurController.Jump() |
| Fyzická vs. Trigger kolize | Zem vs. Kaktus |
| Prefab + Instantiate/Destroy | Kaktus spawn systém |
| Singleton pattern | GameManager.Instance |
| Enum stavový automat | GameManager.GameState |
| PlayerPrefs | ScoreManager rekord |
| `SceneManager.LoadScene` | GameManager restart |

Notes:
Tyto koncepty jsou základy profesionálního Unity vývoje. Studenti je budou používat v každé hře.
