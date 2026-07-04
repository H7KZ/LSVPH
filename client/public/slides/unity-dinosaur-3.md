## Dinosaur Runner — Lekce 3: Překážky a kolize

Letní škola vývoje her 2026 · Honza

---

## Co postavíme dnes

Kaktusy se náhodně generují a zastaví dinosaura při kolizi.

**Výsledek:** kaktusy přijíždějí z pravé strany, dino zamrzne při kontaktu

Notes:
Prefab + Instantiate + Trigger kolize. Stejný princip jako u každé překážkové runner hry.

---

## Prefab — připomenutí

**Prefab** = šablona objektu. Ze šablony vytváříme kopie (instance).

```
Prefab kaktusu  →  Spawner vytvoří 10× kaktus
                   Změna prefabu = změna VŠECH instancí najednou
```

Proč prefab? → Oprava na jednom místě, ne na každé kopii zvlášť ✓

Notes:
Analogie: Prefab = razítko. Každá instance = výtisk razítka. Opraviš razítko → všechny budoucí výtisky jsou jiné.

---

## Nastavení prefabu kaktusu

1. Přetáhni `Cactus.png` do scény → přejmenuj na `Cactus`
2. Přidej **Box Collider 2D** → zaškrtni **Is Trigger = ✓**
3. Přidej **Rigidbody2D** → **Body Type: Kinematic**
4. Nastav **Tag:** `Cactus` (Inspector → Tag → Add Tag → `Cactus`)
5. Přetáhni `Cactus` z Hierarchy do složky `Prefabs/`
6. Smaž originál ze scény

Notes:
Is Trigger = kaktus dino "neodrazí", ale zaregistruje průnik (callback). Kinematic Rigidbody = pohyb řízen skriptem, ne
gravitací — a zároveň umožní trigger callbacky.

---

## Trigger vs. fyzická kolize

|                | Is Trigger | Co se stane                |
| -------------- | ---------- | -------------------------- |
| Fyzická kolize | ☐          | Blokuje průchod, odráží    |
| Trigger zóna   | ✓          | Proletí skrz, jen callback |

```csharp
// Fyzická kolize (Is Trigger = ☐):
void OnCollisionEnter2D(Collision2D col) { }

// Trigger zóna (Is Trigger = ✓):
void OnTriggerEnter2D(Collider2D other) { }
```

Notes:
Proč trigger pro kaktus? Chceme sami řídit co se stane při kontaktu (Game Over), ne aby fyzika dina odrazila.

---

## Cactus.cs

```csharp
using UnityEngine;

// Kaktus se pohybuje doleva pevnou rychlostí.
// V lekci 4 nahradíme speed za GameManager.Instance.GameSpeed.
public class Cactus : MonoBehaviour
{
    [SerializeField] private float speed = 5f;
    private const float DestroyX = -20f;

    void Update()
    {
        // Pohyb doleva × čas od posledního snímku = plynulý pohyb
        transform.Translate(Vector3.left * speed * Time.deltaTime);

        // Kaktus vyjel mimo obrazovku — zničíme instanci
        if (transform.position.x < DestroyX)
            Destroy(gameObject);
    }
}
```

Notes:
`transform.Translate` posune objekt v jeho lokálním souřadném systému. Nepotřebujeme Rigidbody pro pohyb — jen pro
trigger callbacky. `DestroyX = -20f` = bezpečně mimo levý okraj obrazovky.

---

## CactusSpawner.cs

```csharp
using UnityEngine;

public class CactusSpawner : MonoBehaviour
{
    [SerializeField] private GameObject cactusPrefab;
    [SerializeField] private float minInterval = 1.5f;
    [SerializeField] private float maxInterval = 3.5f;

    private float timer;
    private float nextSpawnTime;

    void Start()
    {
        nextSpawnTime = Random.Range(minInterval, maxInterval);
    }

    void Update()
    {
        timer += Time.deltaTime;

        if (timer >= nextSpawnTime)
        {
            Instantiate(cactusPrefab, transform.position, Quaternion.identity);
            timer = 0f;
            // Každý interval je jiný — hráč nemůže odhadnout rytmus
            nextSpawnTime = Random.Range(minInterval, maxInterval);
        }
    }
}
```

Notes:
`Random.Range(min, max)` = náhodný interval → hráč nemůže předvídat rytmus. Spawn se odehraje na pozici tohoto
GameObjectu (X ≈ 12, Y = výška kaktusu).

---

## Nastavení CactusSpawner ve scéně

1. Vytvoř prázdný GameObject → pojmenuj `CactusSpawner`
2. Nastav pozici: **X = 12, Y = −3** (mimo obr. vpravo, výška podlahy)
3. Přidej skript `CactusSpawner`
4. V Inspektoru přiřaď **Cactus Prefab** ze složky `Prefabs/`

**Play Mode (▶)** → kaktusy přijíždějí v náhodných intervalech ✓

Notes:
Pokud kaktus padá dolů: Rigidbody2D musí být Kinematic. Pokud přichází příliš rychle / pomalu: uprav minInterval /
maxInterval.

---

## DinosaurController — detekce kolize

Přidej do `DinosaurController.cs` novou metodu:

```csharp
// Trigger kolize s kaktusem (cactus má Is Trigger = ✓)
void OnTriggerEnter2D(Collider2D other)
{
    if (other.CompareTag("Cactus"))
    {
        // Zamrazíme fyziku — dino zůstane na místě
        rb.simulated = false;
        // GameOver obrazovku přidáme v lekci 4
    }
}
```

Notes:
`rb.simulated = false` = vypne Rigidbody2D — dino přestane reagovat na gravitaci i vstup. Bez GameManager zatím hra
jen "zamrzne" místo zobrazení Game Over obrazovky — to opravíme příští lekci.

---

## Shrnutí lekce 3

- ✅ Prefab kaktusu — BoxCollider2D (Trigger), Rigidbody2D (Kinematic), Tag "Cactus"
- ✅ `Cactus.cs` — pohyb doleva přes `transform.Translate`, Destroy mimo obrazovku
- ✅ `CactusSpawner.cs` — náhodný interval, Instantiate prefabu
- ✅ `DinosaurController` — `OnTriggerEnter2D` zastaví dino

**Další lekce:** GameManager — stav hry, zrychlení, Game Over obrazovka

Notes:
Ověřit: kaktusy přijíždějí, dino "zamrzne" při kontaktu. Nic se nestane = tag "Cactus" není nastaven na prefabu nebo v
Tag Manageru.
