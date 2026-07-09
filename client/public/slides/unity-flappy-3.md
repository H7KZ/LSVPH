## Flappy Bird — Lekce 3: Skok a ovládání

Letní škola vývoje her 2026 · Honza

---

## Co postavíme dnes

Napíšeme skript `PlayerMovement.cs`, který ptáčkovi umožní skákat při stisku mezerníku.

**Výsledek:** ptáček reaguje na vstup hráče a skáče nahoru

Notes:
První C# skript! Ukáž kde ho vytvořit, jak přiřadit, jak Debug.Log funguje.

---

## MonoBehaviour — kostra každého skriptu

```csharp
public class PlayerMovement : MonoBehaviour
{
    void Start()  { /* jednou na začátku */ }
    void Update() { /* každý snímek (~60× za sekundu) */ }
}
```

| Metoda   | Kdy se volá                |
| -------- | -------------------------- |
| `Start`  | jednou po aktivaci objektu |
| `Update` | každý snímek hry           |

Notes:
MonoBehaviour = základ Unity skriptingu. Dědění od MonoBehaviour dává skriptu přístup ke herní smyčce.

---

## Vytvoření skriptu

1. **Project** → pravý klik na `Scripts/` → **Create → C# Script**
2. Název: `PlayerMovement` (bez mezer, PascalCase)
3. Dvakrát klikni → otevře se VS Code / Rider
4. Smaž obsah `Start()` — budeme psát od začátku

Notes:
Název souboru musí odpovídat názvu třídy! Unity to vyžaduje.

---

## PlayerMovement.cs — skok

```csharp
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    [SerializeField] private float jumpForce = 4f;
    [SerializeField] private Rigidbody2D rb;

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            // Okamžitě nastaví rychlost nahoru.
            // Gravitace Rigidbody2D ji pak snižuje → parabolický oblouk.
            rb.linearVelocity = Vector2.up * jumpForce;
        }
    }
}
```

Notes:
Pište řádek po řádku. linearVelocity = okamžité nastavení rychlosti, ne AddForce (ta by se kumulovala).

---

## GetKeyDown vs. GetKey

```csharp
Input.GetKeyDown(KeyCode.Space) // TRUE jen první snímek stisku ✓
Input.GetKey(KeyCode.Space)     // TRUE každý snímek při držení  ✗
```

Vyzkoušej: změň na `GetKey` → ptáček letí dokud držíš mezerník

Notes:
Nechte studenty vyzkoušet obě varianty — rozdíl je okamžitě viditelný a zapamatovatelný.

---

## [SerializeField] — propojení v Inspektoru

```csharp
[SerializeField] private float jumpForce = 4f; // číslo nastavitelné v Inspektoru
[SerializeField] private Rigidbody2D rb;       // přetáhneme z Hierarchy
```

**Proč ne `public`?**

`public` → jakýkoliv skript může hodnotu změnit  
`[SerializeField] private` → jen Inspector vidí pole, kód je chráněný ✓

Notes:
Toto je best practice Unity vývoje. public funguje, ale je to špatný zvyk.

---

## Přiřazení skriptu

1. Přetáhni `PlayerMovement` na `Bird` v Hierarchy
2. Inspector → propoj reference:
    - **Jump Force:** 4
    - **Rb:** přetáhni komponentu `Rigidbody 2D` z Inspektoru ptáčka

**Play Mode (▶)** → mezerník = skok ✓

Notes:
Bez reference na Rb Unity vyhodí NullReferenceException. Ukázat chybu v Console — cenná lekce.

---

## Shrnutí lekce 3

- ✅ `PlayerMovement.cs` — skok na mezerník
- ✅ `rb.linearVelocity` — okamžité nastavení rychlosti nahoru
- ✅ `[SerializeField]` — nastavení hodnot v Inspektoru

**Příští lekce:** Roury, spawner a detekce kolize
