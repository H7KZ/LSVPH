## Flappy Bird — Lekce 5: Skóre a konec hry

Letní škola vývoje her 2026 · Honza

---

## Co postavíme dnes

Score zóna pro počítání bodů a UI text zobrazující skóre.

**Výsledek:** kompletní Flappy Bird — skóre roste při průletu rourou

Notes:
Poslední lekce! Studenti jsou motivovaní. GameManager + UI = základ každé hry.

---

## Canvas — UI systém Unity

1. **GameObject → UI → Canvas**
2. Inspector → **Canvas Scaler → UI Scale Mode:** `Scale With Screen Size`
3. **Reference Resolution:** `1920 × 1080`

Notes:
Canvas = průhledná fólie přes celou scénu. Všechny UI prvky jsou uvnitř Canvasu.

---

> 📸 **Ukázka:** Hierarchy — Canvas s EventSystem, Inspector — Canvas Scaler nastaven

Notes:
Ukázat vytvořený Canvas, EventSystem a nastavení Canvas Scaler v Inspektoru.

---

## Text Mesh Pro — skóre

1. Pravý klik na Canvas → **UI → Text - TextMeshPro**
2. Pojmenuj ho `ScoreText`
3. Nastav pozici: horní střed obrazovky
4. Velikost písma: 48, barva: bílá nebo černá
5. Výchozí text: `0`

Notes:
TextMeshPro je moderní alternativa k starému UI Text. Unity nabídne instalaci TMP pokud chybí.

---

## GameManager.cs

```csharp
using TMPro;
using UnityEngine;

// Uchovává skóre a aktualizuje UI text.
// Přiřazen prázdnému GameObjectu ve scéně.
public class GameManager : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI scoreText;

    private int score;

    // Voláno z PlayerMovement.OnTriggerEnter2D při průchodu Score zónou.
    public void AddPoints(int points)
    {
        score += points;
        scoreText.text = score.ToString();
    }
}
```

Notes:
GameManager drží skóre centrálně — jedna instance, všechny skripty ji mohou volat přes SerializeField referenci.

---

## Přiřazení GameManager

1. Vytvoř prázdný GameObject → pojmenuj `GameManager`
2. Přiřaď skript `GameManager.cs`
3. Inspector → **Score Text:** přetáhni `ScoreText` z Hierarchy

Notes:
GameManager je prázdný GO — jen drží data a logiku, nevykresluje nic samo.

---

## Score zóna — bod za průlet

1. Otevři **Pipe prefab** (dvakrát klikni v Project okně)
2. Pravý klik na Pipe → **Create Empty** → pojmenuj `ScoreZone`
3. Přidej **Box Collider 2D** → ✓ **Is Trigger**
4. Nastav **Tag:** `Score` (Add Tag → přidej nový tag)
5. Umísti do středu mezery mezi rourami

ScoreZone je child prefabu → pohybuje se s rourou automaticky ✓

Notes:
ScoreZone jako child objekt znamená, že stačí nastavit jednou v prefabu — platí pro všechny instance.

---

> 📸 **Ukázka:** Pipe prefab — ScoreZone jako child objekt, Box Collider 2D s Is Trigger

Notes:
Ukázat ScoreZone v hierarchii prefab editoru a jeho Collider v Inspektoru.

---

## Kompletní PlayerMovement.cs

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class PlayerMovement : MonoBehaviour
{
    [SerializeField] private float jumpForce = 4f;
    [SerializeField] private Rigidbody2D rb;
    [SerializeField] private GameManager gameManager;

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
            rb.linearVelocity = Vector2.up * jumpForce;
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Pipe"))
            SceneManager.LoadScene(SceneManager.GetActiveScene().name);

        if (collision.CompareTag("Score"))
            gameManager.AddPoints(1);
    }
}
```

Propoj **Game Manager** v Inspektoru ptáčka → přetáhni GameObject `GameManager`.

Notes:
Přidat SerializeField GameManager a propojit v Inspektoru. Bez toho AddPoints vyhodí NullReferenceException.

---

## Finální test hry

Spusť Play Mode a zkontroluj:

- ✅ Skóre roste při průletu rourou
- ✅ Kolize s rourou restartuje hru (skóre se resetuje)
- ✅ Roury se generují na náhodných výškách

**Gratulace — Flappy Bird je hotový!** 🎉

Notes:
Nech studenty 5–10 minut hrát navzájem. Soutěž o nejvyšší skóre.

---

## Volitelná rozšíření

Hotov dřív? Zkus:

- **Restart tlačítko** — `Button` v UI, `OnClick` → `SceneManager.LoadScene`
- **Animace ptáčka** — `Animator` component, přepínání sprite
- **Zvuky** — `AudioSource`, `AudioClip`, `audioSource.Play()`
- **Best score** — `PlayerPrefs.SetInt("best", score)` + zobrazení
- **Dvě roury** — horní a dolní s mezerou, `ScoreZone` uprostřed

Notes:
Tato rozšíření jsou nad rámec kurzu — pro rychlé a motivované studenty.
