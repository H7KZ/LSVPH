## Vývoj v Unity

Letní škola vývoje her 2026 · Ondřej

---

## Co se naučíš

- Jak funguje herní engine **Unity**
- Co jsou **GameObjects** a **komponenty**
- Jak rozhýbat objekt vlastním **C# skriptem**

---

## Proč to stojí za to

Unity spojuje **vše ostatní dohromady** — grafiku, 3D modely, kód i design.
Je to místo, kde z jednotlivých kousků vznikne **hra, kterou půjde zahrát**.

---

## Malá ochutnávka

```csharp
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public float speed = 5f;

    void Update()
    {
        float x = Input.GetAxis("Horizontal");
        transform.Translate(x * speed * Time.deltaTime, 0, 0);
    }
}
```

Tenhle skript rozpohybuje hráče doleva a doprava.

---

## Nástroje, které použijeme

- **Unity** — herní engine (zdarma pro studenty)
- **C#** — jazyk z prvního předmětu, teď ho využiješ naplno

---

## Pojďme stavět hru!

Na konci školy budeš mít vlastní hratelnou hru. Tady ji složíme dohromady.

Notes:
Živá ukázka: přidat Rigidbody na krychli a nechat ji spadnout, pak ji rozpohybovat skriptem.
