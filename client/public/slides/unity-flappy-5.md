## Flappy Bird — Lekce 5: Skóre a konec hry

Letní škola vývoje her 2026

---

## Co postavíme dnes

Počítadlo skóre a Game Over obrazovka.

**Výsledek:** kompletní Flappy Bird — skóre roste, při Game Over vidíš výsledek

Notes:
Poslední lekce! Studenti jsou motivovaní — konec je blízko. Skóre + UI + GameManager = základ každé hry.

---

## Canvas — UI systém Unity

1. **GameObject → UI → Canvas** (Unity vytvoří Canvas + EventSystem)
2. Nastav **Canvas Scaler → UI Scale Mode:** `Scale With Screen Size`
3. Nastav **Reference Resolution:** `1920 × 1080`

Notes:
Canvas = "průhledná fólie" přes celou scénu. Všechny UI prvky jsou uvnitř Canvasu.

---

## Text Mesh Pro — skóre

1. Klikni pravým na Canvas → **UI → Text - TextMeshPro**
2. Pojmenuj ho `ScoreText`
3. Nastav pozici: horní střed obrazovky
4. Nastav velikost písma, barvu (bílá nebo žlutá)
5. Výchozí text: `0`

Notes:
TextMeshPro je moderní alternativa k starému UI Text. Pokud TMP není nainstalován, Unity nabídne instalaci.

---

## GameManager.cs

```csharp
using TMPro;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI scoreText;
    private int score;

    public void AddPoints(int points)
    {
        score += points;
        scoreText.text = score.ToString();
    }

    public void GameOver()
    {
        Time.timeScale = 0f; // zastavíme čas
    }
}
```

Notes:
`Time.timeScale = 0` zmrazí veškerou fyziku a Update smyčky. Jednoduchý ale efektivní způsob zastavení hry.

---

## Score zóna — bod za průlet

1. Vytvoř prázdný GameObject uvnitř Pipe prefabu → pojmenuj `ScoreZone`
2. Přidej **Box Collider 2D** → zaškrtni **Is Trigger**
3. Nastav **Tag:** `Score`
4. Umísti zónu do středu mezery mezi rourami

V `PlayerMovement.cs` doplň do `OnTriggerEnter2D`:

```csharp
if (collision.CompareTag("Score"))
    gameManager.AddPoints(1);
```

Nezapomeň přidat `[SerializeField] private GameManager gameManager;` a propojit v Inspektoru.

Notes:
ScoreZone je child objekt Pipe prefabu → pohybuje se s rourou automaticky.

---

## Game Over — update kolize

Uprav `OnTriggerEnter2D` v `PlayerMovement.cs`:

```csharp
void OnTriggerEnter2D(Collider2D collision)
{
    if (collision.CompareTag("Pipe"))
        gameManager.GameOver();

    if (collision.CompareTag("Score"))
        gameManager.AddPoints(1);
}
```

Smaž původní `SceneManager.LoadScene` — teď zavoláme `GameOver()`.

Notes:
Time.timeScale = 0 zastaví hru, ale nezobrazí žádný panel. Volitelné rozšíření: Game Over panel s textem a tlačítkem Restart.

---

## Finální test hry

Spusť Play Mode a zkontroluj:

- ✅ Skóre roste při průletu rourou
- ✅ Při kolizi s rourou se hra zastaví
- ✅ Skóre zůstane viditelné po Game Over

**Gratulace — dokončil jsi Flappy Bird!** 🎉

Notes:
Nech studenty 5–10 minut hrát navzájem jejich hry. Soutěž o nejvyšší skóre. Volitelná rozšíření: restart tlačítko, animace ptáčka, zvuky.
