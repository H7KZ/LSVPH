using UnityEngine;
using UnityEngine.SceneManagement;

// GameManager řídí stav hry, rychlost a audio.
//
// SINGLETON vzor: ve scéně existuje jen jeden GameManager.
// Ostatní skripty ho používají přes: GameManager.Instance.GameSpeed
//
// NASTAVENÍ VE SCÉNĚ:
//   1. Vytvoř prázdný GameObject "GameManager"
//   2. Přiřaď tento skript + ScoreManager skript
//   3. Přetáhni StartPanel a GameOverPanel z Canvasu
public class GameManager : MonoBehaviour
{
    // SINGLETON
    // 'static' = patří třídě, ne instanci. Přístup odkudkoliv: GameManager.Instance
    public static GameManager Instance { get; private set; }

    // STAV HRY
    // Enum = pojmenovaný výčet — hra je vždy v právě jednom stavu.
    public enum GameState
    {
        WaitingToStart, // Hráč ještě nestiskl mezerník
        Playing,        // Hra běží normálně
        GameOver        // Dino narazilo do kaktusu
    }

    public GameState CurrentState { get; private set; } = GameState.WaitingToStart;

    // RYCHLOST — čtou ji GroundScroller, Cactus, ScoreManager
    [SerializeField] private float initialSpeed = 5f;
    [SerializeField] private float speedIncreasePerSecond = 0.5f;
    [SerializeField] private float maxSpeed = 25f;

    public float GameSpeed { get; private set; }

    // UI PANELY
    [SerializeField] private GameObject startPanel;
    [SerializeField] private GameObject gameOverPanel;

    // AUDIO (volitelné)
    [SerializeField] private AudioSource backgroundMusic;
    [SerializeField] private AudioSource sfxSource;
    [SerializeField] private AudioClip gameOverClip;

    void Awake()
    {
        // Singleton: pokud Instance už existuje, zničíme duplikát.
        if (Instance != null)
        {
            Destroy(gameObject);
            return;
        }
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
        bool inputPressed = Input.GetKeyDown(KeyCode.Space)
                         || Input.GetKeyDown(KeyCode.UpArrow);

        if (inputPressed && CurrentState == GameState.WaitingToStart)
            StartGame();
        else if (inputPressed && CurrentState == GameState.GameOver)
            RestartGame();

        if (CurrentState == GameState.Playing)
            GameSpeed = Mathf.Min(GameSpeed + speedIncreasePerSecond * Time.deltaTime, maxSpeed);
    }

    public void StartGame()
    {
        CurrentState = GameState.Playing;
        startPanel.SetActive(false);
        if (backgroundMusic != null) backgroundMusic.Play();
    }

    // Volá DinosaurController při kolizi s kaktusem.
    public void TriggerGameOver()
    {
        // Guard clause: fyzika může event spustit víckrát za snímek
        if (CurrentState != GameState.Playing) return;

        CurrentState = GameState.GameOver;
        gameOverPanel.SetActive(true);

        if (backgroundMusic != null) backgroundMusic.Stop();
        if (sfxSource != null && gameOverClip != null)
            sfxSource.PlayOneShot(gameOverClip);
    }

    private void RestartGame()
    {
        // Reload scény = nejjednodušší reset všech objektů do počátečního stavu.
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }
}
