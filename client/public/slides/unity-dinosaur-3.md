## Dinosaur Runner — Lekce 3: Překážky a kolize

Letní škola vývoje her 2026

---

## Co postavíme dnes

Kaktusy, které se generují náhodně a zastaví hru při kolizi.

**Výsledek:** překážky přijíždějí zleva, kolize = Game Over

Notes:
Stejný princip jako u Flappy Bird (Spawner + Prefab), ale tentokrát jednodušší — nepotřebujeme mezeru.

---

## Prefab kaktusu

1. Přetáhni `Cactus.png` do scény → pojmenuj `Cactus`
2. Přidej **Box Collider 2D** (bez Is Trigger)
3. Přidej **Rigidbody2D** → **Is Kinematic: ✓** (pohyb skriptem, ne fyzikou)
4. Nastav **Tag:** `Obstacle`
5. Přetáhni do `Prefabs/` → smaž originál ze scény

Notes:
Is Kinematic = Rigidbody2D ignoruje fyzikální síly, ale stále registruje kolize. Pohybujeme ho přímo přes transform nebo velocity.

---

## CactusSpawner.cs

```csharp
using UnityEngine;

public class CactusSpawner : MonoBehaviour
{
    [SerializeField] private GameObject cactusPrefab;
    [SerializeField] private float minInterval = 1.5f;
    [SerializeField] private float maxInterval = 3f;
    [SerializeField] private float speed = 5f;

    private float timer;
    private float nextSpawn;

    void Start() => nextSpawn = Random.Range(minInterval, maxInterval);

    void Update()
    {
        timer += Time.deltaTime;
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
        c.GetComponent<Rigidbody2D>().linearVelocity = Vector2.left * speed;
        Destroy(c, 8f);
    }
}
```

Notes:
Náhodný interval (minInterval–maxInterval) místo fixního času = hráč nemůže odhadnout rytmus. Důležitý gameplay prvek.

---

## Přiřazení spawneru

1. Vytvoř prázdný GameObject → pojmenuj `CactusSpawner`
2. Přiřaď skript `CactusSpawner.cs`
3. V Inspektoru propoj **Cactus Prefab**

**Play Mode (▶)** → kaktusy přijíždějí v náhodných intervalech ✓

Notes:
Ověřit: kaktusy přijíždějí, pohybují se doleva a zmizí. Pokud padají dolů: Is Kinematic na Rigidbody2D musí být zapnuto.

---

## Detekce kolize — Game Over

Do `DinoController.cs` přidej:

```csharp
[SerializeField] private GameManager gameManager;

void OnCollisionEnter2D(Collision2D col)
{
    if (col.gameObject.CompareTag("Ground"))
        isGrounded = true;

    if (col.gameObject.CompareTag("Obstacle"))
        gameManager.GameOver();
}
```

Notes:
GameManager.GameOver() napíšeme v příští lekci. Zatím stačí připravit referenci a volání.

---

## Shrnutí lekce 3

- ✅ Prefab kaktusu s Is Kinematic Rigidbody2D
- ✅ CactusSpawner s náhodným intervalem
- ✅ Kolize s kaktusem volá GameOver()

**Další lekce:** Skóre, zrychlení a high score

Notes:
Ověřit: dino narazí do kaktusu → (zatím NullReferenceException, protože GameManager neexistuje). To je v pořádku — opravíme příští lekci.
