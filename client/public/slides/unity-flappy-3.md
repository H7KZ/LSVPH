## Flappy Bird — Lekce 3: Skok a ovládání

Letní škola vývoje her 2026

---

## Co postavíme dnes

Napíšeme skript, který ptáčkovi umožní skákat při stisku mezerníku.

**Výsledek:** ptáček reaguje na vstup hráče a skáče nahoru

Notes:
První C# skript! Dej si čas — studenti potřebují vidět kde skript vytvořit, jak ho přiřadit, a jak Debug.Log funguje.

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
MonoBehaviour = základ Unity skriptingu. Dědění od MonoBehaviour znamená, že Unity skript "ví" o herní smyčce.

---

## Vytvoření skriptu

1. V **Project** okně: pravý klik na `Scripts/` → **Create → C# Script**
2. Název: `PlayerMovement` (bez mezer, s velkými písmeny)
3. Dvakrát klikni → otevře se VS Code nebo Rider
4. Smaž obsah `Start()` a `Update()` — budeme psát od začátku

Notes:
Název souboru musí odpovídat názvu třídy! Unity to vyžaduje. Pokud se liší, skript nepůjde přiřadit.

---

## PlayerMovement.cs — píšeme spolu

```csharp
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    [SerializeField] private float jumpForce = 5f;
    [SerializeField] private Rigidbody2D rb;

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
            rb.linearVelocity = Vector2.up * jumpForce;
    }
}
```

Notes:
Pište řádek po řádku. Vysvětlete každou část. `rb.linearVelocity = Vector2.up * jumpForce` = okamžitě nastavíme rychlost
nahoru (ne AddForce — to by se kumulovalo).

---

## GetKeyDown vs. GetKey

```csharp
Input.GetKeyDown(KeyCode.Space) // TRUE jen první snímek stisku ✓
Input.GetKey(KeyCode.Space)     // TRUE každý snímek při držení  ✗
```

Vyzkoušej: změň na `GetKey` → ptáček letí dokud držíš mezerník

Notes:
Nechte studenty skutečně vyzkoušet obě varianty. Rozdíl je okamžitě viditelný a zapamatovatelný.

---

## SerializeField — propojení v Inspektoru

```csharp
[SerializeField] private float jumpForce = 5f; // číslo nastavitelné v Inspektoru
[SerializeField] private Rigidbody2D rb;       // přetáhneme z Hierarchy
```

**Proč ne `public`?**  
`public` = jakýkoliv skript může hodnotu změnit = chaos  
`[SerializeField] private` = jen Inspector vidí pole, ale kód je chráněný ✓

Notes:
Toto je best practice Unity vývoje. `public` funguje, ale je to špatný zvyk.

---

## Přiřazení skriptu a propojení

1. Přetáhni skript `PlayerMovement` na `Bird` v Hierarchy (nebo Add Component)
2. V Inspektoru skriptu:
    - **Jump Force:** nech na 5
    - **Rb:** přetáhni komponentu `Rigidbody 2D` z ptáčkova Inspektoru

**Spusť Play Mode (▶)** → mezerník = skok ✓

Notes:
Bez reference na Rb Unity vyhodí NullReferenceException. Ukázat chybu v Console a jak ji opravit — cenná lekce.

---

## Shrnutí lekce 3

- ✅ C# skript `PlayerMovement.cs` vytvořen
- ✅ Skok na mezerník s okamžitým nastavením rychlosti
- ✅ `[SerializeField]` pro nastavení v Inspektoru

**Další lekce:** Roury, spawner a detekce kolize

Notes:
Ověřit: všichni mají funkční skok. Tipovat: jumpForce mezi 4–7 závisí na Gravity Scale. Nechte 5 minut na
experimentování.
