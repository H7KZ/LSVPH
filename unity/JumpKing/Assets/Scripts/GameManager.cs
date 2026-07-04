using UnityEngine;
using UnityEngine.SceneManagement;

// Řídí stav celé hry a přechody mezi stavy.
//
// SINGLETON VZOR — jeden GameManager existuje v celé hře.
// Ostatní skripty k němu přistupují přes: GameManager.Instance
//
// STAVOVÝ STROJ:
//   WaitingToStart → Playing (Space na start obrazovce)
//   Playing        → Win     (CameraController zavolá TriggerWin)
//   Win            → restart scény (Space na win obrazovce)
//
// Pozor: pád není GameOver — hráč spadne o patro níž, hra pokračuje.
//
// NASTAVENÍ VE SCÉNĚ:
//   1. Prázdný GameObject pojmenuj "GameManager"
//   2. Přiřaď GameManager + UIManager skripty
//   3. Propoj UIManager v Inspektoru
[RequireComponent(typeof(UIManager))]
public class GameManager : MonoBehaviour
{
    // Singleton — jeden globální přístupový bod
    public static GameManager Instance { get; private set; }

    // Tři stavy hry (pád = součást hry, ne smrt → žádný GameOver stav)
    public enum GameState { WaitingToStart, Playing, Win }
    public GameState CurrentState { get; private set; } = GameState.WaitingToStart;

    [SerializeField] private UIManager uiManager;

    void Awake()
    {
        // Pokud Instance už existuje, zničíme duplikát
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

    // Volá CameraController, když hráč dosáhne vrcholu levelu
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
