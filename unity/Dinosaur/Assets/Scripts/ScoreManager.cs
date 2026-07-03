using TMPro;
using UnityEngine;

// ScoreManager počítá skóre a zobrazuje ho na obrazovce.
// Skóre roste s rychlostí hry — čím rychleji běžíš, tím víc bodů.
// Přiřazen na GameManager GameObject (spolu s GameManager skriptem).
//
// NASTAVENÍ VE SCÉNĚ:
//   1. Na Canvas vytvoř TextMeshProUGUI "ScoreText" (vlevo nahoře)
//   2. Na Canvas vytvoř TextMeshProUGUI "HighScoreText" (vpravo nahoře)
//   3. Přiřaď oba texty do polí v Inspektoru
public class ScoreManager : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI scoreText;
    [SerializeField] private TextMeshProUGUI highScoreText;

    private const string HighScoreKey = "DinoHighScore";

    private float score;
    private int highScore;

    void Start()
    {
        // Načti rekord z předchozích her (PlayerPrefs = trvalé uložiště)
        highScore = PlayerPrefs.GetInt(HighScoreKey, 0);
        UpdateHighScoreDisplay();
    }

    void Update()
    {
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        // Skóre roste rychlostí hry — čím rychleji, tím více bodů za sekundu
        score += GameManager.Instance.GameSpeed * Time.deltaTime;

        // D5 = formátuj jako číslo s alespoň 5 ciframi (00042)
        scoreText.text = Mathf.FloorToInt(score).ToString("D5");

        // Průběžně aktualizuj rekord
        int currentScore = Mathf.FloorToInt(score);
        if (currentScore > highScore)
        {
            highScore = currentScore;
            PlayerPrefs.SetInt(HighScoreKey, highScore);
            UpdateHighScoreDisplay();
        }
    }

    private void UpdateHighScoreDisplay()
    {
        highScoreText.text = "HI " + highScore.ToString("D5");
    }
}
