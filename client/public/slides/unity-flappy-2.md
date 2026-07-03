## Flappy Bird — Část 2: Roury a skóre

Letní škola vývoje her 2026

---

## Co máme, co přidáme

Máme:
- ✅ Ptáček s fyzikou a skokem
- ✅ `PlayerMovement.cs` s detekcí kolizí

Přidáme:
- ❌ Roury (Pipe prefab, pohyb, spawn, destroy)
- ❌ Skóre a UI text
- ❌ Kompletní restart po smrti

Notes:
Krátké opakování. Ověřte že ptáček skáče a Console je bez červených chyb.

---

## Prefab — znovupoužitelná šablona

<img src="/images/flappy/pipe.png" alt="Pipe sprite" style="height:200px">

**Prefab** = šablona GameObject uložená v Assets

```
Instantiate(pipePrefab) → vytvoří kopii v scéně za běhu
```

Potřebujeme vytvářet desítky rour → prefab je řešení

Notes:
Analogie: cookie cutter (vykrajovátko). Jedna šablona, nekonečně kopií. Každá kopie je nezávislá.

---

## Pipe prefab — hierarchie objektů

```
Pipe  (kořenový GO — skript Pipe.cs zde)
├── PipeDown        SpriteRenderer + BoxCollider2D   tag: Pipe
├── PipeHeaderDown  SpriteRenderer
├── PipeHeaderUp    SpriteRenderer
├── PipeUp          SpriteRenderer + BoxCollider2D   tag: Pipe
└── ScoreTrigger    BoxCollider2D (IsTrigger)        tag: Score
```

![Pipe prefab — hierarchie v Hierarchy okně](/images/flappy/placeholder-pipe-prefab.svg)

Notes:
Každá část roury = vlastní GO = vlastní collider. ScoreTrigger je uprostřed mezery mezi rourami.

---

## Pipe prefab — sestavení krok za krokem

1. Hierarchy → pravý klik → **Create Empty** → přejmenuj na `Pipe`
2. Uvnitř Pipe vytvoř 5 dětí: `PipeDown`, `PipeHeaderDown`, `PipeHeaderUp`, `PipeUp`, `ScoreTrigger`
3. Na `PipeDown` + `PipeUp`: Add Component → `Sprite Renderer` (Sprite: Pipe.png) + `Box Collider 2D`
4. Na rourách nastav **Tag: Pipe** (Inspector → Tag dropdown → Add Tag)
5. Na `ScoreTrigger`: `Box Collider 2D` + **Is Trigger** ✓ + **Tag: Score**

![Pipe komponenty v Inspektoru (tag: Pipe)](/images/flappy/placeholder-pipe-inspector.svg)

Notes:
Tohle zabere čas — pomáhejte studentům s hierarchií. Tag musíte nejdřív vytvořit v Tag Manageru.

---

## Pipe prefab — uložení do Assets

6. Přetáhni `Pipe` z Hierarchy do `Assets/Prefabs/` v Project okně
7. Objekt v Hierarchy zezelená (je to instance prefabu)
8. Smaž instanci z Hierarchy — prefab zůstane v Assets

```
Assets/Prefabs/Pipe.prefab ← tohle je náš prefab
```

Notes:
Prefab = soubor na disku. Hierarchy = co je aktuálně ve scéně. Prefab může existovat bez instance ve scéně.

---

## Pipe.cs — pohyb doleva

```csharp
using UnityEngine;

public class Pipe : MonoBehaviour
{
    [SerializeField] private float speed = 5f;

    void Update()
    {
        transform.position += Vector3.left * speed * Time.deltaTime;
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("PipeDestroy"))
            Destroy(gameObject);
    }
}
```

Přiřaď skript na **kořenový** `Pipe` GameObject (ne na dítě)

Notes:
Destroy(gameObject) = zničí celý Pipe včetně všech dětí. PipeDestroy tag přidáme v dalším kroku.

---

## Time.deltaTime — snímkově nezávislý pohyb

```
60 FPS:  deltaTime ≈ 0.017 s    pohyb = 5 × 0.017 = 0.083 /snímek
30 FPS:  deltaTime ≈ 0.033 s    pohyb = 5 × 0.033 = 0.167 /snímek

→ výsledek: 5 unity units za sekundu na obou zařízeních ✓
```

Bez `Time.deltaTime`: rychlost závisí na FPS počítače

**Pravidlo:** vždy `rychlost × Time.deltaTime` pro pohyb v `Update()`

Notes:
Demonstrace: zakomentujte Time.deltaTime, spusťte. Na rychlém a pomalém PC je vidět rozdíl.

---

## PipeDestroy — čistění paměti

Roury opustí obrazovku ale **stále existují v paměti** → memory leak

1. Hierarchy → **Create Empty** → `PipeDestroy`
2. Umísti vlevo od kamery: **Transform X ≈ -15**
3. Add Component → `Box Collider 2D` + **Is Trigger** ✓
4. Nastav výšku Collideru: velká (aby zachytil každou rouru)
5. Tag: `PipeDestroy` (vytvoř v Tag Manageru)

![PipeDestroy objekt vlevo od kamery ve Scene](/images/flappy/placeholder-pipedestroy.svg)

Notes:
Bez Destroy se roury hromadí → po minutě hra zpomalí. PipeDestroy trigger = automatické čistění.

---

## PipeSpawner.cs — vytváření rour

```csharp
using UnityEngine;

public class PipeSpawner : MonoBehaviour
{
    [SerializeField] private float spawnInterval = 2.5f;
    [SerializeField] private float heightRange = 5f;
    [SerializeField] private GameObject pipe;

    void Start()
    {
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
}
```

Notes:
InvokeRepeating = zabudovaný timer. nameof() = bezpečnější než string. Ukažte tweaking spawnInterval živě.

---

## InvokeRepeating vs. ruční timer

```csharp
// InvokeRepeating — jednoduché, pevný interval
InvokeRepeating(nameof(SpawnPipe), 0f, 2.5f);

// Ruční timer — více kódu, ale lze měnit interval za běhu
private float timer;
void Update() {
    timer -= Time.deltaTime;
    if (timer <= 0f) { SpawnPipe(); timer = 2.5f; }
}
```

**Flappy:** InvokeRepeating ← interval se nemění  
**Dino Runner:** ruční timer ← interval se zmenšuje jak hra zrychluje

Notes:
Toto je dobrý moment pro diskuzi: kdy které řešení? Studenti pravděpodobně viděli nebo brzy uvidí Dino Runner.

---

## PipeSpawner — umístění a propojení

1. Hierarchy → **Create Empty** → `PipeSpawner`
2. Umísti **vpravo od kamery**: Transform X ≈ +12
3. Přidej skript `PipeSpawner`
4. V Inspektoru:
   - **Spawn Interval:** `2.5`
   - **Height Range:** `5`
   - **Pipe:** přetáhni `Pipe.prefab` z Project okna

![PipeSpawner — pole v Inspektoru + prefab](/images/flappy/placeholder-spawner-inspector.svg)

Notes:
Bez Pipe reference → NullReferenceException. Spawn Interval a Height Range zkuste měnit živě v Play Mode.

---

## Canvas — UI vrstva pro skóre

1. Hierarchy → pravý klik → **UI → Canvas**
2. Na Canvas (Inspector):
   - **Render Mode:** Screen Space - Overlay
   - **UI Scale Mode:** Scale With Screen Size
   - **Reference Resolution:** 1920 × 1080
3. Uvnitř Canvas → pravý klik → **UI → Text - TextMeshPro** → pojmenuj `ScoreText`
4. Nastav: Text `0`, Font Size `64`, Alignment: střed nahoře

![Canvas + ScoreText v Hierarchy](/images/flappy/placeholder-canvas.svg)

Notes:
Při prvním použití TMP Unity nabídne "Import TMP Essentials" → klikni Import. Screen Space Overlay = UI vždy nad hrou.

---

## TextMeshPro vs. starý UI Text

| | TextMeshPro | UI Text (starý) |
|--|-------------|----------------|
| Ostrost | ✓ při jakékoliv velikosti | rozmazaný při velkém fontu |
| API | `TextMeshProUGUI` | `Text` |
| Namespace | `using TMPro;` | `using UnityEngine.UI;` |

Vždy používej **TextMeshPro** v nových projektech

Notes:
UI Text je zastaralý. Unity ho stále podporuje ale TMP je standard pro nové projekty.

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
}
```

1. Hierarchy → **Create Empty** → `GameManager`
2. Přidej skript `GameManager`
3. Přetáhni `ScoreText` do pole **Score Text** v Inspektoru

Notes:
GameManager = prázdný GO, spravuje stav celé hry. Voláno z PlayerMovement.OnTriggerEnter2D při průchodu ScoreTriggerem.

---

## Propojení všeho dohromady

**Bird → PlayerMovement:**
- **Rb:** přetáhni komponentu Rigidbody2D
- **Game Manager:** přetáhni GO `GameManager` z Hierarchy

**GameManager:**

![GameManager — Score Text v Inspektoru](/images/flappy/placeholder-gamemanager-inspector.svg)

- **Score Text:** přetáhni `ScoreText` (TextMeshProUGUI) z Hierarchy

Notes:
SerializeField = drag & drop v Inspektoru. Chybí reference → NullReferenceException v Console. Zkontrolujte Console po spuštění.

---

## Spusť hru a otestuj

**▶ Play Mode** — zkontroluj Console (žádné červené chyby)

![Hotová hra v Play Mode](/images/flappy/placeholder-final-game.svg)

Testovací checklist:
- ✅ Ptáček skáče na mezerník
- ✅ Roury přicházejí zleva
- ✅ Skóre stoupá při průletu mezerou
- ✅ Kolize s rourou = restart

Notes:
Časté chyby: chybí reference v Inspektoru, špatný tag (case-sensitive!), Pipe skript na špatném GO.

---

## Hotovo!

<img src="/images/flappy/bird.png" alt="Ptáček" style="height:120px">

Naše Flappy Bird umí:
- ✅ Fyzika a skok (`Rigidbody2D`, `linearVelocity`)
- ✅ Překážky (`Pipe` prefab, `InvokeRepeating`, `Destroy`)
- ✅ Skóre (`GameManager`, `TextMeshPro`, `AddPoints`)
- ✅ Restart (`SceneManager.LoadScene`)

**Nápady na rozšíření:**
- Zvyšování rychlosti rour (`speed` na `Pipe.cs`)
- Highscore mezi hrami (`PlayerPrefs`)
- Zvuk (`AudioSource.PlayOneShot`)
- Animace ptáčka (`Animator` + sprite sheet)

Notes:
Dejte studentům 20 minut na experimentování. Kdo dokončí, ať zkusí PlayerPrefs highscore nebo zvuk.
