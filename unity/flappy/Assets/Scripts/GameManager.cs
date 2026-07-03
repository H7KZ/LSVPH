using TMPro;
using UnityEngine;

// GameManager uchovává skóre a aktualizuje UI text.
// Je přiřazen prázdnému GameObjectu ve scéně. Ostatní scripty ho referencují.
public class GameManager : MonoBehaviour
{
    // [SerializeField] umožňuje přiřadit private pole v Unity Inspectoru.
    // Lepší než public - ostatní scripty nemůžou náhodně změnit referenci.
    [SerializeField] private TextMeshProUGUI scoreText;

    private int score;

    // Přidá body ke skóre a aktualizuje zobrazený text.
    // Voláno z PlayerMovement když ptáček projde ScoreTriggerem.
    public void AddPoints(int points)
    {
        score += points;
        scoreText.text = score.ToString();
    }
}
