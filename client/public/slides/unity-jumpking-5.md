## Jump King — Lekce 5: GameManager, UI a rekord

Letní škola vývoje her 2026 · Honza

---

## Co postavíme dnes

GameManager (start / hra / výhra), UI panely a ukládání osobního rekordu.

**Výsledek:** kompletní Jump King — start obrazovka, výhra, rekord přetrvá i po restartu

Notes:
Finální lekce! Studenti vidí hotovou hru. Rekord přes PlayerPrefs je "wow moment" — přetrvá po zavření hry.

---

## GameManager — stavový stroj

```
START hry:
  WaitingToStart ──(Space)──► Playing

VÝHRA (dosažení vrcholu):
  Playing ──(CameraController)──► Win

RESTART:
  Win ──(Space)──► načti scénu znovu
```

GameManager je **Singleton** — přistup odkudkoliv: `GameManager.Instance`

Notes:
Singleton vzor: jeden objekt existuje v celé hře, ostatní ho najdou přes statickou vlastnost Instance.

---

## GameManager.cs

Vytvoř skript `Scripts/GameManager.cs`:

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

[RequireComponent(typeof(UIManager))]
public class GameManager : MonoBehaviour
{
    public static GameManager Instance { get; private set; }

    public enum GameState { WaitingToStart, Playing, Win }
    public GameState CurrentState { get; private set; } = GameState.WaitingToStart;

    [SerializeField] private UIManager uiManager;

    void Awake()
    {
        if (Instance != null) { Destroy(gameObject); return; }
        Instance = this;
    }

    void Update()
    {
        if (!Input.GetKeyDown(KeyCode.Space)) return;
        if (CurrentState == GameState.WaitingToStart) StartGame();
        else if (CurrentState == GameState.Win) RestartGame();
    }

    public void StartGame() { CurrentState = GameState.Playing; uiManager.ShowGame(); }

    public void TriggerWin()
    {
        if (CurrentState != GameState.Playing) return;
        CurrentState = GameState.Win;
        uiManager.ShowWin();
    }

    void RestartGame() { SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex); }
}
```

Notes:
RequireComponent = Unity automaticky přidá UIManager spolu s GameManager. Singleton guard: druhý GameManager se zničí.

---

## UI Canvas — struktura

Vytvoř canvas a panely:

```
Canvas
├── StartPanel          ← "Stiskni Space pro start"
│   └── Text (TMP)
├── WinPanel            ← "Vyhrál jsi!"
│   ├── Text (TMP)
│   └── Text "Hrát znovu: Space"
└── HUD
    ├── ScreenText      ← "Patro: 1/3"
    └── BestScreenText  ← "Nejlepší: 3/3"
```

**WinPanel** i **StartPanel** nastav jako **Inactive** v Inspektoru.

Notes:
TMP = TextMeshPro. Pokud chybí balíček, Unity nabídne instalaci při prvním použití TMP komponentu.

---

> 📸 **Ukázka:** Hierarchy — Canvas s StartPanel, WinPanel a HUD; StartPanel a WinPanel jsou šedé (inactive)

Notes:
Šedá ikona = inactive. Studenti si to snadno pletou — ukázat jak vypadá aktivní vs. inactive objekt.

---

## UIManager.cs

Vytvoř skript `Scripts/UIManager.cs`:

```csharp
using UnityEngine;
using TMPro;

[RequireComponent(typeof(GameManager))]
public class UIManager : MonoBehaviour
{
    [Header("Panely")]
    [SerializeField] private GameObject startPanel;
    [SerializeField] private GameObject winPanel;

    [Header("HUD")]
    [SerializeField] private TextMeshProUGUI screenText;
    [SerializeField] private TextMeshProUGUI bestScreenText;
    [SerializeField] private CameraController cameraController;

    private const string BestScreenKey = "JKBestScreen";

    void Start()
    {
        startPanel.SetActive(true);
        winPanel.SetActive(false);
        UpdateBestScreenText();
    }

    void Update()
    {
        if (cameraController == null) return;
        screenText.text = $"Patro: {cameraController.CurrentScreen + 1}/3";
    }
```

Notes:
CurrentScreen je 0-indexované → +1 pro zobrazení "Patro: 1/3". BestScreenKey = klíč pro PlayerPrefs.

---

## UIManager.cs — ShowWin a rekord

```csharp
    public void ShowGame() { startPanel.SetActive(false); }

    public void ShowWin()
    {
        winPanel.SetActive(true);

        // Ulož rekord pokud hráč dosáhl vyššího patra než dřív
        int reached = cameraController.CurrentScreen + 1;
        int best = PlayerPrefs.GetInt(BestScreenKey, 0);
        if (reached > best)
        {
            PlayerPrefs.SetInt(BestScreenKey, reached);
            PlayerPrefs.Save();
        }
        UpdateBestScreenText();
    }

    void UpdateBestScreenText()
    {
        int best = PlayerPrefs.GetInt(BestScreenKey, 0);
        bestScreenText.text = best > 0 ? $"Nejlepší: {best}/3" : "";
    }
}
```

Notes:
PlayerPrefs = Unity vestavěná databáze klíč-hodnota. Přetrvá i po restartu hry i po zavření Unity Editoru.

---

## Propojení ve scéně

1. Vytvoř prázdný GameObject → pojmenuj `GameManager`
2. **Add Component → GameManager** (přidá i UIManager automaticky)
3. Propoj v Inspektoru:
    - UIManager → StartPanel, WinPanel, ScreenText, BestScreenText, CameraController (Main Camera)
    - GameManager → UIManager (Inspector slot)

> 📸 **Ukázka:** Inspector GameManager objektu — zvýrazni propojené reference

Notes:
Nejčastější bug: prázdná reference (None) v Inspektoru → NullReferenceException. Projít každé pole.

---

## PlayerController — blokování vstupu

GameManager řídí kdy hráč může hrát. Přidej guard na začátek `Update()`:

```csharp
void Update()
{
    if (GameManager.Instance == null) return;
    if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

    // ... zbytek kódu ...
}
```

Na start obrazovce a win obrazovce hráč nemůže skákat.

Notes:
Stejný guard patří i do CameraController.Update() — tam už je.

---

## Finální test

▶ **Play** a ověř celý průběh:

- ✅ Start obrazovka se zobrazí
- ✅ Space spustí hru (start panel zmizí)
- ✅ HUD zobrazuje aktuální patro
- ✅ Dosažení vrcholu → Win panel
- ✅ Rekord se uloží a zobrazí
- ✅ Space restartuje hru

Notes:
Volitelná rozšíření: animace postavy (Animator), zvuky (AudioSource.PlayOneShot), parallax pozadí, více skin platforem.

---

## Gratulace — Jump King dokončen! 👑

**4 skripty, které jste napsali:**

- `PlayerController` — nabíjený skok
- `CameraController` — přepínání pater
- `GameManager` — stavový stroj
- `UIManager` — panely + PlayerPrefs rekord

Notes:
Ukázat studentům hotovou hru. Připomenout co se naučili: Rigidbody2D, kolize, singleton, stavový stroj, PlayerPrefs, UI
Canvas.
