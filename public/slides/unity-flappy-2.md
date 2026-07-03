## Flappy Bird — Část 2: Překážky a skóre

Letní škola vývoje her 2026

---

## Co máme, co chybí

Máme:

- ✅ Ptáček s fyzikou a skokem
- ✅ Smrt při kolizi s rourou

Chybí:

- ❌ Roury které se spawnují
- ❌ Skóre
- ❌ Restart po smrti

---

## Prefab systém

**Prefab** = šablona GameObject uložená v Assets

```
Pipe (prefab)
├── PipeDown         ← dolní roura
├── PipeHeaderDown   ← čepice dolní roury
├── PipeHeaderUp     ← čepice horní roury
├── PipeUp           ← horní roura
└── ScoreTrigger     ← neviditelná zóna pro skóre
```

`Instantiate(prefab)` → vytvoří kopii v scéně za běhu hry

Notes:
Otevřete Pipe prefab v Project okně (dvojklik). Ukažte hierarchii dětí. Proč prefab a ne objekt přímo ve scéně? Potřebujeme vytvářet kopie za běhu - Instantiate() kopíruje celý prefab včetně komponent a dětí.

---

## Pipe.cs — pohyb doleva

```csharp
void Update()
{
    transform.position += Vector3.left * speed * Time.deltaTime;
}
```

**Proč `Time.deltaTime`?**

```
Bez deltaTime: pohyb 5 jednotek za SNÍMEK  → závisí na FPS
S deltaTime:   pohyb 5 jednotek za SEKUNDU → stejné na jakémkoli FPS
```

Notes:
Demonstrace: zakomentujte Time.deltaTime, spusťte hru a změňte Target Frame Rate v Quality Settings. Rychlost se změní! S Time.deltaTime je rychlost fyzicky korektní bez ohledu na výkon počítače.

---

## PipeSpawner.cs — vytváření rour

```csharp
void Start()
{
    // Zavolej SpawnPipe() ihned (0f) a pak každé spawnInterval sekund
    InvokeRepeating(nameof(SpawnPipe), 0f, spawnInterval);
}

void SpawnPipe()
{
    Vector2 position = new Vector2(
        transform.position.x,
        Random.Range(-heightRange, heightRange)
    );
    Instantiate(pipe, position, Quaternion.identity, transform);
}
```

Notes:
InvokeRepeating je čistší než ruční časovač v Update. nameof(SpawnPipe) je bezpečnější než string "SpawnPipe" - přejmenování metody přeruší build, ne jen runtime. Random.Range(-5f, 5f) vrátí náhodný float v daném rozsahu.

---

## Destroy — čistění paměti

Roury opustí obrazovku ale **stále existují v paměti**.

Řešení: `PipeDestroy` trigger vlevo od kamery

```csharp
// V Pipe.cs:
private void OnTriggerEnter2D(Collider2D collision)
{
    if (collision.CompareTag("PipeDestroy"))
    {
        Destroy(gameObject); // zničí celý Pipe GameObject včetně dětí
    }
}
```

Notes:
Ukažte PipeDestroy GameObject ve scéně Hierarchy - prázdný objekt s BoxCollider2D (IsTrigger=true) vlevo od kamery. Bez Destroy by se roury hromadily v paměti → memory leak → hra zpomalí po minutě hry.

---

## GameManager — skóre a UI

```csharp
public class GameManager : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI scoreText;
    private int score;

    public void AddPoints(int points)
    {
        score += points;
        scoreText.text = score.ToString();
    }
}
```

`TextMeshProUGUI` = moderní UI text (lepší než starý `UnityEngine.UI.Text`)

Voláno z `PlayerMovement.OnTriggerEnter2D` při průchodu `ScoreTriggerem`

Notes:
Ukažte Canvas hierarchii ve scéně. GameManager je na prázdném GameObject - ne na ptáčkovi ani rouře, protože spravuje stav celé hry. Přetáhněte TMP text objekt do Score Text slotu v Inspectoru.

---

## SceneManager — restart a herní smyčka

```csharp
// Načte aktivní scénu znovu = kompletní reset
SceneManager.LoadScene(SceneManager.GetActiveScene().name);
```

Co se resetuje:

- ✅ Pozice ptáčka (vrátí se na startovní pozici)
- ✅ Skóre (GameManager se znovu inicializuje)
- ✅ Všechny roury (Destroy při unloadu scény)

```csharp
using UnityEngine.SceneManagement; // nezapomeň na using!
```

Notes:
Alternativa: ručně resetovat každý objekt (složitější a náchylnější na chyby). Pro tuto velikost hry je reload scény nejjednodušší a nejspolehlivější reset.

---

## Hotovo! 🎮

Naše Flappy Bird má:

- ✅ Fyziku a skok (Rigidbody2D)
- ✅ Překážky (Pipe prefab, InvokeRepeating)
- ✅ Skóre (GameManager, TextMeshPro)
- ✅ Restart (SceneManager)

**Nápady na rozšíření:**

- Zvyšování rychlosti rour postupem hry
- Highscore uložený mezi hrami (`PlayerPrefs`)
- Zvukové efekty (`AudioSource.PlayOneShot`)
- Animace ptáčka (`Animator`, sprite sheet)

**Zítra:** Nový projekt, nové mechaniky!

Notes:
Dejte studentům 15-20 minut na experimentování. Připomeňte co jsme se naučili: fyzika, vstup, kolize, prefaby, spawn, UI, herní smyčka. Kdo chce, může zkusit zvýšit obtížnost nebo přidat zvuk.
