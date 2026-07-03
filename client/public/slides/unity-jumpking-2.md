## Jump King — Část 2: Plošiny a cíl

Letní škola vývoje her 2026

---

## Co máme / co chybí

✅ Hráč a nabíjecí skok
✅ Přepínání obrazovek

❌ Plošiny (Prefab)
❌ Rozmístění 3 obrazovek
❌ GameManager (stav hry)
❌ UIManager (HUD + panely)
❌ Win podmínka

Notes:
Projdi checklist se studenty. Ukaž hotovou hru znovu — připomeň co zbývá. Odpoledne je o „zabalení" herní smyčky.

---

## Plošina Prefab

![Plošina Prefab nastavení](/images/jumpking/placeholder-platform-prefab.svg)

1. Hierarchy → **Create Empty** → pojmenuj **"Plošina"**
2. **Add Component** → **Sprite Renderer** → přetáhni `Platform.png`
3. **Add Component** → **Box Collider 2D**
4. Inspector → Tag → **"Ground"**
5. Project okno → přetáhni **"Plošina"** do složky `Assets/Prefabs/`
6. Smaž originál ze scény (v Hierarchy)

Notes:
Prefab = šablona objektu. Každá kopie v Hierarchy je instance. Změna prefabu ovlivní všechny instance najednou.

---

## Rozmístění plošin

![Rozmístění plošin ve scéně](/images/jumpking/placeholder-platform-placement.svg)

Každá obrazovka = **9 Unity jednotek** výšky:

| Obrazovka       | Y rozsah plošin |
| --------------- | --------------- |
| 0 — přízemí     | 1.5 — 8.0       |
| 1 — první patro | 10.5 — 17.0     |
| 2 — druhé patro | 19.5 — 26.0     |

Přetáhni **6–8 kopií** prefabu `Plošina` do každé obrazovky.
Střídej levou a pravou stranu — plošiny musí být dosažitelné plným skokem.

Notes:
Studenti mají tvůrčí svobodu v rozmístění. Doporučte testovat každou obrazovku průběžně. Plošiny mimo Y rozsah =
studenti to sami uvidí při testování.

---

## GameManager.cs

Vytvoř `Assets/Scripts/GameManager.cs`:

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

    public void StartGame()
    {
        CurrentState = GameState.Playing;
        uiManager.ShowGame();
    }

    public void TriggerWin()
    {
        if (CurrentState != GameState.Playing) return;
        CurrentState = GameState.Win;
        uiManager.ShowWin();
    }

    private void RestartGame()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }
}
```

Notes:
Stejný singleton vzor jako v Dinosaur workshopu. Tři stavy místo čtyř — není GameOver. Pád je součást hry.

---

## UIManager.cs

Vytvoř `Assets/Scripts/UIManager.cs`:

```csharp
using UnityEngine;
using TMPro;

[RequireComponent(typeof(GameManager))]
public class UIManager : MonoBehaviour
{
    [SerializeField] private GameObject startPanel;
    [SerializeField] private GameObject winPanel;
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

    public void ShowGame()   { startPanel.SetActive(false); }

    public void ShowWin()
    {
        winPanel.SetActive(true);
        int reached = cameraController.CurrentScreen + 1;
        int best = PlayerPrefs.GetInt(BestScreenKey, 0);
        if (reached > best) { PlayerPrefs.SetInt(BestScreenKey, reached); PlayerPrefs.Save(); }
        UpdateBestScreenText();
    }

    private void UpdateBestScreenText()
    {
        int best = PlayerPrefs.GetInt(BestScreenKey, 0);
        bestScreenText.text = best > 0 ? $"Nejlepší: {best}/3" : "";
    }
}
```

Notes:
PlayerPrefs = jednoduchá persistence dat mezi spuštěními hry. Klíč "JKBestScreen" ukládá nejvyšší dosažené patro.

---

## Canvas a UI panely

![Canvas a UI panely](/images/jumpking/placeholder-canvas.svg)

1. Hierarchy → **UI** → **Canvas** (Screen Space - Overlay)
2. Canvas → **UI** → **Panel** → pojmenuj **"StartPanel"**
    - Přidej **Text (TextMeshPro)**: _"Stiskni mezerník pro start"_
3. Canvas → **UI** → **Panel** → pojmenuj **"WinPanel"**
    - Přidej **Text (TextMeshPro)**: _"Vyhrál jsi! Stiskni mezerník"_
    - WinPanel: odškrtni checkbox vedle názvu → panel je neviditelný
4. Canvas → **UI** → **Text (TextMeshPro)** → pojmenuj **"ScreenText"** (vpravo nahoře)
5. Canvas → **UI** → **Text (TextMeshPro)** → pojmenuj **"BestScreenText"** (pod ScreenText)

Notes:
WinPanel musí být deaktivovaný při startu — UIManager.Start() ho nastaví. Deaktivace v Editoru = bezpečná výchozí
hodnota.

---

## Win Panel nastavení

![WinPanel v Inspektoru](/images/jumpking/placeholder-win-panel.svg)

WinPanel doporučené nastavení:

- Barva pozadí: poloprůhledná černá (alpha ≈ 180)
- Text 1: **"Vyhrál jsi!"** (velký font, střed)
- Text 2: **"Stiskni mezerník pro restart"** (menší font)

GameManager restartuje scénu na Space → vše se resetuje. Ale PlayerPrefs přežívá restart scény — **rekord zůstane!**

Notes:
Tato slide je dobrý moment na diskusi o persistenci dat. PlayerPrefs.DeleteKey("JKBestScreen") smaže rekord ručně —
ukažte to v konzoli.

---

## Propojení v Inspektoru

Vytvoř prázdný GameObject **"GameManager"**, přiřaď oba skripty:

**UIManager SerializeFields:**

- Start Panel → přetáhni StartPanel z Hierarchy
- Win Panel → přetáhni WinPanel z Hierarchy
- Screen Text → přetáhni ScreenText
- Best Screen Text → přetáhni BestScreenText
- Camera Controller → přetáhni Main Camera

**CameraController (na Main Camera):**

- Player → přetáhni "Hráč"
- Total Screens → **3**

**GameManager SerializeFields:**

- UIManager → přetáhni komponent

Notes:
Propojení v Inspektoru = nejčastější chyba workshopu. Projděte to se studenty krok za krokem. NullReferenceException při
startu = něco není propojené.

---

## Testování

![Hotová hra spuštěná](/images/jumpking/placeholder-final-game.svg)

Testovací scénář:

1. ▶ Spusť → zobrazí se StartPanel, screenText = "Patro: 1/3"
2. **Space** → hra začne, StartPanel zmizí
3. Skoč na plošinu → Patro 1/3
4. Projdi horní okraj → kamera skočí, Patro 2/3
5. Projdi dolní okraj → kamera jde zpět, Patro 1/3
6. Dojdi na vrchol → WinPanel se zobrazí, BestScreenText se aktualizuje
7. **Space** → restart, rekord zůstal

Notes:
Nejčastější problémy: (1) chybí Tag "Ground" na plošinách, (2) UIManager není propojen, (3) CameraController nemá
Player. Chyba v konzoli = NullReferenceException → hledej nepropojený SerializeField.

---

## Nápady na rozšíření

- 🔊 **Zvuk nabíjení** — přidej AudioSource, `audioSource.Play()` při `isCharging = true`
- 📊 **Counter pádů** — `int fallCount++` v CameraController při `currentScreen--`
- 🎨 **Barva per patro** — `Camera.main.backgroundColor` se mění při `SnapCamera()`
- 🏔️ **Více obrazovek** — `totalScreens = 5`, víc plošin, Y rozsahy +9 za každé patro
- ⏱️ **Časomíra** — `float timer` v GameManager, zobraz v UIManager při výhře

Notes:
Nápady pro rychlé studenty nebo domácí práci. Barva per patro je efektní a jednoduchá — dobrý live coding bonus.

---

## Shrnutí workshopu

Co jsme postavili:

✅ Nabíjecí skok (drž Space + A/D → pusť)
✅ Přepínání obrazovek (kamera snaps)
✅ Plošiny rozmístěné ve 3 patrech
✅ GameManager se stavovým automatem
✅ UIManager s HUD a rekord v PlayerPrefs
✅ Win podmínka

**Gratulujeme — máte vlastní Jump King!**

Notes:
Dejte studentům 10 minut na testování navzájem. Kdo dojde jako první na vrchol? Uložte projekty — připomeňte git commit.
