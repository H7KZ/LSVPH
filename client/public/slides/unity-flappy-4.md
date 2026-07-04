## Flappy Bird — Lekce 4: Překážky a kolize

Letní škola vývoje her 2026

---

## Co postavíme dnes

Roury, které se pohybují zleva doprava a restartují hru při kolizi.

**Výsledek:** funkční překážky s detekcí kolize

Notes:
Tato lekce zavádí Prefaby — jeden z nejdůležitějších konceptů Unity. Věnuj čas vysvětlení co je prefab a proč ho chceme.

---

## Prefab — šablona objektu

**Prefab** = šablona, ze které vytváříme kopie (instance).

```
Prefab roury → Spawner vytvoří 10 instancí roury
               Změna prefabu = změna VŠECH instancí najednou
```

Proč prefab místo kopírování?  
→ Oprava chyby na jednom místě, ne na 10 místech ✓

Notes:
Analogie: Prefab = razítko. Každá instance = výtisk razítka. Změníš razítko → všechny budoucí výtisky jsou jiné.

---

## Vytvoření prefabu roury

1. Přetáhni `Pipe.png` do scény → GameObject `Pipe`
2. Přidej **Box Collider 2D** (bez Is Trigger)
3. Nastav **Tag** na `Pipe` (Inspector → Tag → Add Tag → `Pipe`)
4. Přetáhni `Pipe` z Hierarchy do `Prefabs/` v Project okně
5. Smaž originál ze scény

Notes:
Tag "Pipe" budeme potřebovat v kolizním callbacku. Unity tagy jsou case-sensitive!

---

## PipeSpawner.cs

```csharp
using UnityEngine;

public class PipeSpawner : MonoBehaviour
{
    [SerializeField] private GameObject pipePrefab;
    [SerializeField] private float spawnInterval = 2f;
    [SerializeField] private float pipeSpeed = 3f;

    private float timer;

    void Update()
    {
        timer += Time.deltaTime;
        if (timer >= spawnInterval)
        {
            timer = 0f;
            SpawnPipe();
        }
    }

    void SpawnPipe()
    {
        float y = Random.Range(-2f, 2f);
        GameObject pipe = Instantiate(pipePrefab, new Vector3(8f, y, 0), Quaternion.identity);
        pipe.GetComponent<Rigidbody2D>().linearVelocity = Vector2.left * pipeSpeed;
        Destroy(pipe, 10f);
    }
}
```

Notes:
Přidej Rigidbody2D na Pipe prefab (Gravity Scale 0, Is Kinematic zapnuto nebo ne — závisí na přístupu).

---

## Přiřazení spawneru

1. Vytvoř prázdný GameObject → pojmenuj `PipeSpawner`
2. Přiřaď skript `PipeSpawner.cs`
3. V Inspektoru:
    - **Pipe Prefab:** přetáhni Prefab z `Prefabs/`
    - **Spawn Interval:** 2
    - **Pipe Speed:** 3

**Play Mode (▶)** → roury se generují zleva ✓

Notes:
Pokud roury padají dolů: Pipe prefab potřebuje Rigidbody2D s Gravity Scale 0 nebo Is Kinematic. Ukázat v Inspektoru.

---

## Detekce kolize — GameOver

Přidej do `PlayerMovement.cs`:

```csharp
void OnTriggerEnter2D(Collider2D collision)
{
    if (collision.CompareTag("Pipe"))
        UnityEngine.SceneManagement.SceneManager.LoadScene(
            UnityEngine.SceneManagement.SceneManager.GetActiveScene().name);
}
```

Nezapomeň přidat using na začátek:

```csharp
using UnityEngine.SceneManagement;
```

Notes:
CompareTag je efektivnější než `collision.tag == "Pipe"`. SceneManager.LoadScene(jméno scény) = restart. Jednoduché a
funkční.

---

## Shrnutí lekce 4

- ✅ Pipe prefab s tagem a colliderem
- ✅ PipeSpawner generuje roury s náhodnou výškou
- ✅ Kolize s rourou restartuje scénu

**Další lekce:** Skóre, UI Text a Game Over obrazovka

Notes:
Ověřit: ptáček umírá při kontaktu s rourou a hra se restartuje. Doladění obtížnosti (spawnInterval, pipeSpeed) jako
bonus pro rychlejší studenty.
