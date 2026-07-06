## Jump King — Lekce 1: Scéna a postava

Letní škola vývoje her 2026 · Honza

---

## Co postavíme dnes

Nový Unity projekt, podlaha a postava, která stojí na zemi a pohybuje se.

**Výsledek:** postava se pohybuje doleva a doprava, nestojí ve vzduchu

Notes:
Čistě přípravná lekce. Cíl: scéna funguje, postava nestojí ve vzduchu. Skok přijde v lekci 2.

---

## Nový projekt

1. **Unity Hub → New Project → 2D (Core)**
2. Název: `JumpKing`
3. Složky v Assets: **Graphics/**, **Scripts/**

> 📸 **Ukázka:** Unity Hub — záložka Projects, New Project, šablona 2D Core

Notes:
2D Core = žádné nadbytečné balíčky. Tilemap a URP jsou součástí.

---

## Import grafiky

Přetáhni soubory do složky **Graphics/**:

- `Player.png` — sprite postavy
- `Platform.png` — sprite plošiny / podlahy

> 📸 **Ukázka:** Project okno → složka Graphics s oběma PNG soubory

Notes:
Unity importuje automaticky při přetažení. Pixel Per Unit: 100 (výchozí).

---

## Podlaha

1. Přetáhni `Platform.png` do **Scene view** (nebo Hierarchy)
2. Přejmenuj na `Ground`
3. Nastav pozici: `Y: -4` (spodek scény)
4. Nastav **Scale X** na `20` — vytáhni podlahu přes celou scénu
5. **Add Component → Box Collider 2D**

Notes:
Scale X = roztáhnutí spritu. Alternativa: více menších Platform objektů.

---

## Postava

1. Přetáhni `Player.png` do scény
2. Přejmenuj na `Player`
3. Nastav pozici: `Y: -2` (nad podlahou)
4. **Add Component → Rigidbody2D**
	- **Gravity Scale:** `3`
	- **Freeze Rotation Z:** ✓
5. **Add Component → Box Collider 2D** — přizpůsob velikost tělu

> 📸 **Ukázka:** Inspector s Rigidbody2D — zvýrazni Gravity Scale a Freeze Rotation Z

Notes:
Gravity Scale 3 = trojnásobná gravitace. Freeze Rotation = postava se nenakloní. Bez toho by se válela po zemi.

---

## Tag "Ground"

Tag umožní skriptu rozlišit, na čem hráč stojí.

1. Vyber `Ground` v Hierarchy
2. Inspector → klikni na **Tag** → **Add Tag**
3. Přidej tag `Ground`
4. Znovu vyber `Ground` → nastav Tag: **Ground**

Notes:
Tag musíme nastavit hned — PlayerController ho bude potřebovat v lekci 2.

---

## PlayerController.cs

Vytvoř skript `Scripts/PlayerController.cs`:

```csharp
using UnityEngine;

[RequireComponent(typeof(Rigidbody2D))]
public class PlayerController : MonoBehaviour
{
    [SerializeField] private float maxHorizontalSpeed = 5f;

    private Rigidbody2D rb;

    void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    void Update()
    {
        // GetAxisRaw vrátí -1, 0 nebo 1 (bez interpolace)
        float x = Input.GetAxisRaw("Horizontal");
        rb.linearVelocity = new Vector2(x * maxHorizontalSpeed, rb.linearVelocity.y);
    }
}
```

Notes:
linearVelocity.y zachováváme — nechceme přepisovat gravitaci. GetAxisRaw = okamžitá odezva.

---

## Přiřazení skriptu

1. Ulož skript (Ctrl+S)
2. Přetáhni `PlayerController.cs` na GameObject `Player`
3. ▶ **Play** — pohyb funguje?

**Zkouška:** A/D nebo šipky doleva/doprava

Notes:
Nejčastější bug: skript přiřazen na špatný objekt, nebo zapomenuta reference. Rigidbody2D najde sám díky GetComponent.

---

## Shrnutí lekce 1

- ✅ 2D projekt s grafickými assety
- ✅ Podlaha s Box Collider 2D
- ✅ Postava s Rigidbody2D (Gravity Scale 3)
- ✅ Pohyb doleva a doprava

**Další lekce:** nabíjený skok — hlavní mechanika Jump Kinga

Notes:
Ověřit: postava stojí na podlaze a pohybuje se. Propadá? Zkontrolovat Box Collider 2D na Ground i Player.
