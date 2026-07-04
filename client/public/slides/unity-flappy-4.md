## Flappy Bird — Lekce 4: Překážky a kolize

Letní škola vývoje her 2026 · Honza

---

## Co postavíme dnes

Roury, které se pohybují doleva, automaticky mizí a restartují hru při kolizi.

**Výsledek:** pohybující se překážky se spawnerem a detekcí kolize

Notes:
Tato lekce zavádí Prefaby a InvokeRepeating — dva klíčové koncepty Unity.

---

## Prefab — šablona objektu

**Prefab** = šablona, ze které vytváříme kopie (instance).

```
Prefab roury → Spawner vytvoří desítky instancí
               Změna prefabu = změna VŠECH instancí najednou
```

Proč prefab místo kopírování?  
→ Opravíš chybu na jednom místě ✓

Notes:
Analogie: Prefab = razítko. Každá instance = výtisk. Změníš razítko → všechny budoucí výtisky jsou jiné.

---

## Vytvoření prefabu roury

1. Přetáhni `Pipe.png` do scény → GameObject `Pipe`
2. Přidej **Box Collider 2D** (bez Is Trigger)
3. Nastav **Tag** → `Pipe` (Inspector → Tag → Add Tag)
4. Přetáhni `Pipe` z Hierarchy do `Prefabs/` v Project okně
5. Smaž originál ze scény

Notes:
Tag "Pipe" budeme potřebovat v OnTriggerEnter2D. Unity tagy jsou case-sensitive!

---

> 📸 **Ukázka:** Project okno — Pipe.prefab ve složce Prefabs (modrá ikona)

Notes:
Ukázat hotový prefab v Project okně s modrou prefab ikonou.

---

## Pipe.cs — pohyb roury

```csharp
using UnityEngine;

// Rourě se pohybuje doleva a zničí se po průchodu PipeDestroy triggerem.
public class Pipe : MonoBehaviour
{
    [SerializeField] private float speed = 5f;

    void Update()
    {
        // Time.deltaTime = čas od minulého snímku → rychlost nezávisí na FPS
        transform.position += Time.deltaTime * speed * Vector3.left;
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("PipeDestroy"))
            Destroy(gameObject);
    }
}
```

Přiřaď skript `Pipe.cs` na **Pipe prefab** (otevři prefab dvakrát kliknutím).

Notes:
Pipe se pohybuje sama pomocí transform.position. PipeDestroy = čistič rour za okrajem obrazovky.

---

## PipeDestroy — čistič rour

1. Vytvoř prázdný GameObject → pojmenuj `PipeDestroy`
2. Přidej **Box Collider 2D** → ✓ **Is Trigger**
3. Nastav **Tag:** `PipeDestroy` (Add Tag → přidej nový tag)
4. Umísti vlevo za okraj obrazovky (**X: -15**)

Roura se zničí sama, jakmile ho protne ✓

Notes:
Bez mazání by roury zůstávaly v paměti donekonečna — výkonnostní problém.

---

## PipeSpawner.cs — pravidelné spawnování

```csharp
using UnityEngine;
using Random = UnityEngine.Random;

// Pravidelně vytváří nové roury na náhodné výšce.
public class PipeSpawner : MonoBehaviour
{
    [SerializeField] private float spawnInterval = 2.5f;
    [SerializeField] private float heightRange = 5f;
    [SerializeField] private GameObject pipe;

    // InvokeRepeating volá SpawnPipe() ihned (0f) a pak každé spawnInterval sekund.
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
InvokeRepeating = nejjednodušší způsob periodického volání. nameof() = compile-time bezpečný název metody.

---

## Přiřazení spawneru

1. Vytvoř prázdný GameObject → pojmenuj `PipeSpawner`
2. Umísti vpravo za okraj obrazovky (**X: 15**)
3. Přiřaď skript `PipeSpawner.cs`
4. Inspector → propoj:
    - **Pipe:** přetáhni prefab z `Prefabs/`
    - **Spawn Interval:** 2.5
    - **Height Range:** 5

**Play Mode (▶)** → roury se generují a pohybují doleva ✓

Notes:
Pokud roury padají dolů: zkontroluj, že Pipe.cs je přiřazen na prefab, ne na scénu.

---

> 📸 **Ukázka:** Inspector — PipeSpawner s vyplněným Pipe prefabem a hodnotami

Notes:
Ukázat Inspector PipeSpawneru s pipe prefabem a nastaveními Spawn Interval / Height Range.

---

## Detekce kolize — GameOver

V `PlayerMovement.cs` doplň `OnTriggerEnter2D`:

```csharp
using UnityEngine.SceneManagement;

// ...

private void OnTriggerEnter2D(Collider2D collision)
{
    if (collision.CompareTag("Pipe"))
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
}
```

Tref rourou → hra se okamžitě restartuje ✓

Notes:
CompareTag je efektivnější než collision.tag == "Pipe". LoadScene(jméno) restartuje celou scénu — skóre se resetuje.

---

## Shrnutí lekce 4

- ✅ Pipe prefab s tagem, colliderem a `Pipe.cs`
- ✅ PipeDestroy — automatické mazání rour
- ✅ PipeSpawner — InvokeRepeating s náhodnou výškou
- ✅ Kolize s rourou restartuje scénu

**Příští lekce:** Score zóna, UI Text a skóre
