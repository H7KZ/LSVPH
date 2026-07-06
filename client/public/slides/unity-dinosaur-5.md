## Dinosaur Runner — Lekce 5: Skóre a high score

Letní škola vývoje her 2026 · Honza

---

## Co postavíme dnes

Počítadlo skóre a rekord uložený i po zavření hry.

**Výsledek:** skóre narůstá s rychlostí hry, po Game Over se uloží high score

Notes:
Poslední lekce! ScoreManager + TextMeshPro + PlayerPrefs. Studenti uvidí kompletní, hratelnou hru.

---

## TextMeshPro — UI text

1. Klikni pravým na `Canvas` → **UI → Text - TextMeshPro**
2. Pojmenuj `ScoreText` → umísti **vlevo nahoře**
3. Velikost písma: `36`, barva dle designu
4. Výchozí text: `00000`
5. Opakuj pro `HighScoreText` → umísti **vpravo nahoře**
6. Výchozí text: `HI 00000`

Notes:
TextMeshPro (TMP) je moderní alternativa k starému UI Text — lepší vykreslování, škálování, efekty. Pokud TMP není
nainstalován, Unity nabídne instalaci — odsouhlasit.

---

## ScoreManager.cs

```csharp
using TMPro;
using UnityEngine;

// Přiřazen na GameManager GameObject (spolu s GameManager skriptem)
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
        highScoreText.text = "HI " + highScore.ToString("D5");
    }

    void Update()
    {
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        // Skóre roste rychlostí hry — čím rychleji, tím více bodů za sekundu
        score += GameManager.Instance.GameSpeed * Time.deltaTime;
        scoreText.text = Mathf.FloorToInt(score).ToString("D5");

        int current = Mathf.FloorToInt(score);
        if (current > highScore)
        {
            highScore = current;
            PlayerPrefs.SetInt(HighScoreKey, highScore);
            highScoreText.text = "HI " + highScore.ToString("D5");
        }
    }
}
```

Notes:
`D5` = zobrazí číslo vždy s 5 ciframi (00042, 01337). `PlayerPrefs` = klíč-hodnota úložiště Unity, přetrvá mezi hrami i
po zavření.

---

## PlayerPrefs — jak funguje

```csharp
// Uložit hodnotu pod klíčem
PlayerPrefs.SetInt("DinoHighScore", 1337);

// Načíst (0 = výchozí hodnota pokud klíč ještě neexistuje)
int hi = PlayerPrefs.GetInt("DinoHighScore", 0);
```

Data přetrvají i po zavření hry. Na Windows: uloženo v registru.

Notes:
PlayerPrefs je ideální pro jednoduchou hru. Pro větší projekty: JSON soubor nebo cloud save. Klíč je string — pozor na
překlepy!

---

## Propojení ScoreManager

1. Na GameObject `GameManager` přidej komponentu `ScoreManager`
2. V Inspektoru propoj:
	- **Score Text** → přetáhni `ScoreText` z Canvasu
	- **High Score Text** → přetáhni `HighScoreText` z Canvasu

**Play Mode (▶)** → skóre narůstá, rekord se aktualizuje průběžně ✓

Notes:
ScoreManager sedí na stejném GameObjectu jako GameManager — usnadňuje správu "manažer" skriptů.

---

## Finální test hry

Projdi celý průchod hrou:

- ✅ Start obrazovka — čeká na mezerník
- ✅ Hra se spustí, podloží scrolluje, kaktusy přijíždějí
- ✅ Hra se postupně zrychluje
- ✅ Skóre narůstá s rychlostí
- ✅ Kolize → Game Over panel + high score uložen
- ✅ Restart → skóre se resetuje, rekord zůstane

**Gratulace — dokončil jsi Dinosaur Runner!** 🦕

Notes:
Nech studenty 5–10 minut hrát navzájem. Soutěž o nejvyšší skóre. Volitelná rozšíření: animace běhu, zvuk
skoku/game-over, různé velikosti kaktusů, noční cyklus.
