using UnityEngine;
using UnityEngine.SceneManagement;

// GameManager řídí stav hry a přechody mezi nimi.
//
// SINGLETON vzor: přistup odkudkoliv přes GameManager.Instance
//
// NASTAVENÍ VE SCÉNĚ:
//   1. Vytvoř prázdný GameObject "GameManager"
//   2. Přiřaď GameManager + UIManager skripty na stejný GameObject
//   3. Propoj UIManager v Inspektoru
[RequireComponent(typeof(UIManager))]
public class GameManager : MonoBehaviour
{
    // SINGLETON
    public static GameManager Instance { get; private set; }

    // STAV HRY
    // Tři stavy: čekání na start, hra běží, výhra.
    // Není GameOver — pád je součást hry, ne smrt.
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

    // Volá CameraController když hráč dosáhne vrcholu.
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
