using TMPro;
using UnityEngine;

// GameManager uchovává skóre a aktualizuje UI text.
// Přiřazen prázdnému GameObjectu ve scéně.
public class GameManager : MonoBehaviour
{
	[SerializeField] private TextMeshProUGUI scoreText;

	private int score;

	// Voláno z PlayerMovement.OnTriggerEnter2D při průchodu ScoreTriggerem.
	public void AddPoints(int points)
	{
		score += points;
		scoreText.text = score.ToString();
	}
}
