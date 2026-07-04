## Dinosaur Runner — Lekce 4: Skóre a obtížnost

Letní škola vývoje her 2026

---

## Co postavíme dnes

Počítadlo vzdálenosti, zrychlení hry a uložení high score.

**Výsledek:** kompletní Dinosaur Runner s narůstající obtížností

Notes:
Toto je finální lekce Dinosaur Runneru. Studenti uvidí hotovou hru — motivující!

---

## GameManager.cs

```csharp
using TMPro;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public static GameManager Instance;

    [SerializeField] private TextMeshProUGUI scoreText;
    [SerializeField] private TextMeshProUGUI highScoreText;
    [SerializeField] private float scoreRate = 1f;

    private float score;
    private bool playing = true;

    void Awake() => Instance = this;

    void Update()
    {
        if (!playing) return;
        score += Time.deltaTime * scoreRate;
        scoreText.text = Mathf.FloorToInt(score).ToString();
    }

    public void GameOver()
    {
        playing = false;
        Time.timeScale = 0f;
        int hi = PlayerPrefs.GetInt("HighScore", 0);
        if ((int)score > hi)
        {
            PlayerPrefs.SetInt("HighScore", (int)score);
            PlayerPrefs.Save();
        }
        highScoreText.text = "Best: " + PlayerPrefs.GetInt("HighScore");
    }
}
```

Notes:
Singleton (`Instance`) = kdokoliv může zavolat `GameManager.Instance.GameOver()` bez SerializeField reference. Vhodné
pro manager třídy.

---

## UI Canvas — skóre a high score

1. **GameObject → UI → Canvas**
2. Přidej dva **TextMeshPro** prvky:
    - `ScoreText` (nahoře uprostřed) — výchozí text `0`
    - `HighScoreText` (nahoře vpravo) — výchozí text `Best: 0`
3. Propoj oba texty v GameManager Inspektoru

Notes:
High score se ukládá i po zavření hry díky PlayerPrefs. PlayerPrefs je jednoduchý klíč-hodnota storage Unity.

---

## Zrychlení hry

Do `CactusSpawner.cs` přidej zrychlení. Nahraď celý soubor:

```csharp
using UnityEngine;

public class CactusSpawner : MonoBehaviour
{
    [SerializeField] private GameObject cactusPrefab;
    [SerializeField] private float minInterval = 1.5f;
    [SerializeField] private float maxInterval = 3f;
    [SerializeField] private float speed = 5f;
    [SerializeField] private float speedIncrease = 0.5f;

    private float timer;
    private float nextSpawn;
    private float currentSpeed;

    void Start()
    {
        currentSpeed = speed;
        nextSpawn = Random.Range(minInterval, maxInterval);
    }

    void Update()
    {
        if (Time.timeScale == 0f) return;
        timer += Time.deltaTime;
        currentSpeed += speedIncrease * Time.deltaTime;
        if (timer >= nextSpawn)
        {
            timer = 0f;
            nextSpawn = Random.Range(minInterval, maxInterval);
            SpawnCactus();
        }
    }

    void SpawnCactus()
    {
        GameObject c = Instantiate(cactusPrefab, new Vector3(10f, -2.5f, 0), Quaternion.identity);
        c.GetComponent<Rigidbody2D>().linearVelocity = Vector2.left * currentSpeed;
        Destroy(c, 8f);
    }
}
```

Notes:
Alternativně: BackgroundScroller také zrychluje → vizuálně viditelné zrychlení. Nechte studenty experimentovat s
hodnotami.

---

## Restart hry

Do GameManager přidej:

```csharp
using UnityEngine.SceneManagement;

public void Restart()
{
    Time.timeScale = 1f;
    SceneManager.LoadScene(SceneManager.GetActiveScene().name);
}
```

Přidej **Button** do Canvasu → OnClick → `GameManager.Restart()`

Notes:
Restart tlačítko zobrazit jen po Game Over — pomocí GameObject.SetActive(). Jednoduchý ale efektivní UI pattern.

---

## Finální test

Zkontroluj:

- ✅ Skóre narůstá s časem
- ✅ Kaktusy se postupně zrychlují
- ✅ High score se uloží po Game Over
- ✅ Restart tlačítko funguje

**Gratulace — dokončil jsi Dinosaur Runner!** 🦕

Notes:
Volitelná rozšíření: animace běhu dina, zvuk skoku, různé typy překážek (velké/malé kaktusy), denní/noční cyklus.
