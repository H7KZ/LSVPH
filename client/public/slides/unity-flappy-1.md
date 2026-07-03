## Flappy Bird — Část 1: Ptáček a fyzika

Letní škola vývoje her 2026

---

## Co dnes postavíme

<img src="/images/flappy/bird.png" alt="Ptáček" style="height:180px">

Klon Flappy Bird od základu — za jeden den

**Dopoledne:** ptáček s fyzikou, skok, detekce kolizí

Notes:
Ukažte hotovou hru nejdřív alespoň minutu. Studenti vidí cíl před tím než začneme. Pak otevřete projekt.

---

## Nový Unity projekt

1. Otevři **Unity Hub** → klikni **New Project**
2. Vyber šablonu **2D (Core)**
3. Název: `FlappyBird`, zvol složku
4. Klikni **Create project** a počkej

![Nový 2D projekt v Unity Hub](/images/flappy/placeholder-new-project.svg)

Notes:
2D Core = bez nadbytečných balíčků. Počkejte než se projekt otevře — může trvat minutu. Mezitím ukažte strukturu složek v Exploreru.

---

## Struktura projektu

Vytvoř složky v **Project** okně (pravý klik → Create → Folder):

```
Assets/
├── Graphics/    ← Bird.png, Pipe.png (přetáhni sem)
├── Scripts/     ← naše C# skripty
└── Prefabs/     ← Pipe prefab (odpoledne)
```

Jedno pravidlo: **jeden skript = jedna zodpovědnost**

Notes:
Ukažte Project okno. Drag & drop obrázků do Graphics složky. Unity je importuje automaticky.

---

## MonoBehaviour — kostra každého skriptu

```csharp
public class PlayerMovement : MonoBehaviour
{
    void Start()  { /* jednou na začátku */ }
    void Update() { /* každý snímek (~60× za sekundu) */ }
}
```

| Metoda | Kdy se volá |
|--------|------------|
| `Start` | jednou po aktivaci objektu |
| `Update` | každý snímek hry |

Notes:
Toto je základ Unity programování. Dědí z MonoBehaviour → lze přiřadit na GameObject.

---

## Ptáček — sprite a GameObject

1. V **Project** okně otevři `Graphics/`
2. Přetáhni `Bird.png` do **Scene** nebo **Hierarchy**
3. Unity vytvoří `GameObject` se `SpriteRenderer`
4. Přejmenuj ho na `Bird` (F2 v Hierarchy)

<img src="/images/flappy/bird.png" alt="Bird sprite" style="height:120px">

![Bird sprite v Inspektoru](/images/flappy/placeholder-bird-sprite.svg)

Notes:
SpriteRenderer = komponenta která kreslí 2D obrázek. Inspector ukáže Sprite, Color, atd.

---

## Ptáček — přidání fyziky

1. Vyber `Bird` v Hierarchy
2. V Inspektoru → **Add Component** → hledej `Rigidbody 2D`
3. Nastav v Inspektoru:
   - **Gravity Scale:** `1`
   - **Freeze Rotation → Z:** ✓ zaškrtni

![Rigidbody2D nastavení v Inspektoru](/images/flappy/placeholder-rigidbody.svg)

**Spusť Play Mode (▶)** → ptáček padá dolů ✓

Notes:
Gravity Scale = 1 = normální gravitace. Bez Freeze Rotation se ptáček otočí při první kolizi. Experimentujte s Gravity Scale 0.5 / 2 / 5.

---

## Jak funguje gravitace v Unity

```
Gravity Scale = 1
→ každý snímek: velocity.y -= 9.81 × deltaTime

linearVelocity = Vector2.up * 4
→ okamžitá rychlost nahoru = 4 m/s

gravitace pak velocity.y postupně snižuje → parabolický oblouk
```

Stejný princip jako vrh šikmý ve fyzice na ZŠ

Notes:
Nemusíme gravitaci programovat — Rigidbody2D ji dělá za nás. My jen nastavíme rychlost nahoru a gravitace udělá zbytek.

---

## BoxCollider2D — trigger zóna ptáčka

1. Vyber `Bird` v Hierarchy
2. **Add Component** → `Box Collider 2D`
3. Zaškrtni **Is Trigger** ✓
4. Uprav velikost: tlačítko **Edit Collider** → táhni zelené body

![BoxCollider2D — Is Trigger zaškrtnuté](/images/flappy/placeholder-collider-trigger.svg)

Notes:
IsTrigger = objekt proletí skrz, ale Unity zavolá callback. Bez IsTrigger by fyzika ptáčka odrážela od rour.

---

## Trigger vs. fyzická kolize

| Typ | Is Trigger | Chování |
|-----|-----------|---------|
| Fyzická kolize | ☐ | Blokuje průchod, odraz |
| Trigger zóna | ✓ | Proletí skrz, jen event |

```csharp
// fyzická kolize:
void OnCollisionEnter2D(Collision2D col) { }

// trigger zóna:
void OnTriggerEnter2D(Collider2D col)    { }
```

Notes:
Fyzická kolize = divné odrazy ptáčka. Trigger = my rozhodneme co se stane. Ptáček má trigger, roury mají normální collider.

---

## PlayerMovement.cs — piš s námi

Vytvoř `Assets/Scripts/PlayerMovement.cs` (pravý klik → Create → C# Script):

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class PlayerMovement : MonoBehaviour
{
    [SerializeField] private float jumpForce = 4f;
    [SerializeField] private Rigidbody2D rb;
    [SerializeField] private GameManager gameManager;

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
            rb.linearVelocity = Vector2.up * jumpForce;
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Pipe"))
            SceneManager.LoadScene(SceneManager.GetActiveScene().name);

        if (collision.CompareTag("Score"))
            gameManager.AddPoints(1);
    }
}
```

Notes:
Nechte studenty psát skript sami řádek po řádku. Projděte každou část. Na konci: přiřadit skript na Bird v Hierarchy.

---

## GetKeyDown vs. GetKey

```csharp
Input.GetKeyDown(KeyCode.Space) // TRUE jen PRVNÍ snímek po stisku ✓
Input.GetKey(KeyCode.Space)     // TRUE každý snímek při držení ✗
```

Vyzkoušej: změň `GetKeyDown` na `GetKey` → ptáček letí dokud držíš mezerník

| Metoda | Výsledek ve Flappy |
|--------|------------------|
| `GetKeyDown` | skok jednou na stisk ✓ |
| `GetKey` | ptáček stoupá bez omezení ✗ |

Notes:
Nechte studenty skutečně zkusit obě varianty. Experimentování = nejlepší učení.

---

## SerializeField — propojení v Inspektoru

```csharp
[SerializeField] private float jumpForce = 4f;   // editovatelné v Inspektoru
[SerializeField] private Rigidbody2D rb;          // drag & drop z Hierarchy
[SerializeField] private GameManager gameManager; // drag & drop z Hierarchy
```

**Proč ne `public`?** SerializeField zachovává `private` přístup ale Inspector ho vidí

Notes:
public odkrývá pole celé codebase = jiné skripty mohou náhodně přepsat hodnotu. SerializeField = bezpečnější.

---

## Propojení skriptu v Inspektoru

1. Vyber `Bird` v Hierarchy
2. Přetáhni skript `PlayerMovement` na Bird (nebo Add Component)
3. V poli **Rb:** přetáhni komponentu `Rigidbody 2D` z Inspektoru ptáčka
4. **Game Manager:** zatím prázdné — přidáme odpoledne

![PlayerMovement — pole v Inspektoru](/images/flappy/placeholder-playermove-inspector.svg)

Notes:
Drag & drop Rigidbody2D přímo z panelu komponent do pole Rb. Bez reference → NullReferenceException v Console při spuštění.

---

## Shrnutí dopoledne

Naučili jsme se:

- ✅ `Rigidbody2D` — gravitace, `linearVelocity`, Freeze Rotation
- ✅ `BoxCollider2D` + `Is Trigger` — detekce kontaktu bez fyziky
- ✅ `Update()` + `GetKeyDown` — vstup hráče každý snímek
- ✅ `OnTriggerEnter2D` + tagy — reakce na kolize
- ✅ `[SerializeField]` — propojení komponent v Inspektoru

**Po obědě:** roury, skóre, UI a kompletní herní smyčka

Notes:
Dejte studentům 10 minut na experimentování — jumpForce, Gravity Scale, barva spritu. Pak přestávka na oběd.
