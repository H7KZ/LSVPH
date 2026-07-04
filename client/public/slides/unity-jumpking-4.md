## Jump King — Lekce 4: Kamera po patrech

Letní škola vývoje her 2026 · Honza

---

## Co postavíme dnes

Kamera, která "skočí" na nové patro, když hráč přejde okraj obrazovky.

**Výsledek:** level se chová jako originální Jump King — kamera nepřejíždí plynule, ale přepíná patra

Notes:
Jump King má specifickou kameru — ne Cinemachine follow, ale snap přepínání obrazovek. To napíšeme sami.

---

## Jak kamera funguje

```
Level = 3 patra, každé patro = 1 výška obrazovky

Hráč přešel HORNÍ okraj → currentScreen++, kamera snapne nahoru
Hráč přešel DOLNÍ okraj → currentScreen--, kamera snapne dolů
currentScreen >= totalScreens → TriggerWin (konec hry)
```

Kamera se nikdy nepohybuje plynule — záměrně, tak to funguje v Jump Kingu.

Notes:
orthographicSize = polovina výšky. Celá výška = orthographicSize × 2. Výchozí orthographicSize = 5 → patro = 10
jednotek.

---

## CameraController.cs

Vytvoř skript `Scripts/CameraController.cs`:

```csharp
using UnityEngine;

public class CameraController : MonoBehaviour
{
    [SerializeField] private Transform player;
    [SerializeField] private int totalScreens = 3;

    private int currentScreen;
    private float screenHeight;

    public int CurrentScreen => currentScreen;

    void Awake()
    {
        // orthographicSize × 2 = celá výška obrazovky
        screenHeight = Camera.main.orthographicSize * 2f;
        SnapCamera();
    }
```

Notes:
CurrentScreen je veřejná vlastnost — UIManager ji čte pro zobrazení "Patro: X/3".

---

## CameraController.cs — Update()

```csharp
    void Update()
    {
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        float camY = transform.position.y;
        float halfHeight = screenHeight * 0.5f;

        // Hráč přešel horní okraj → přejdi o patro výš
        if (player.position.y > camY + halfHeight)
        {
            currentScreen++;
            if (currentScreen >= totalScreens)
            {
                currentScreen = totalScreens - 1;
                SnapCamera();
                GameManager.Instance.TriggerWin();
                return;
            }
            SnapCamera();
        }

        // Hráč přešel dolní okraj → přejdi o patro níž
        if (player.position.y < camY - halfHeight)
        {
            currentScreen = Mathf.Max(0, currentScreen - 1);
            SnapCamera();
        }
    }

    void SnapCamera()
    {
        transform.position = new Vector3(0f, screenHeight * (currentScreen + 0.5f), -10f);
    }
}
```

Notes:
Mathf.Max(0, ...) = hráč nemůže klesnout pod patro 0. Z = -10 = standardní pozice 2D kamery v Unity.

---

## Přiřazení v Inspektoru

1. Vyber **Main Camera** v Hierarchy
2. **Add Component → CameraController**
3. Přetáhni `Player` do pole **Player**
4. **Total Screens:** `3`

▶ **Play** → skoč do horní části scény

> 📸 **Ukázka:** Inspector Main Camera s CameraController — zvýrazni pole Player a Total Screens

Notes:
Pokud kamera neskočí: zkontrolovat, že Player má správnou pozici Y. SnapCamera v Awake nastaví kameru na patro 0 při
startu.

---

## Jak SnapCamera počítá pozici

```
screenHeight = 10  (orthographicSize 5 × 2)

Patro 0 (přízemí): Y = 10 × (0 + 0.5) = 5
Patro 1:           Y = 10 × (1 + 0.5) = 15
Patro 2 (vrchol):  Y = 10 × (2 + 0.5) = 25
```

Kamera je vždy na středu svého patra.

Notes:
Studenti mohou ověřit: v Play Mode sledovat Y souřadnici Main Camera v Inspektoru při přechodu mezi patry.

---

## Test kamery

▶ **Play** a ověř:

- Skoč na horní okraj → kamera přeskočí na patro 2
- Skoč zpět dolů → kamera přeskočí zpět
- Z patra 3 → hra skončí (bude v lekci 5)

Notes:
Pokud kamera neskáče: TriggerWin volá GameManager.Instance — ten musí existovat ve scéně (přidáme v lekci 5). Zatím
ignorovat.

---

## Shrnutí lekce 4

- ✅ CameraController přepíná patra (snap, ne plynulé sledování)
- ✅ Kamera detekuje horní i dolní přechod
- ✅ Dosažení vrcholu připraví volání TriggerWin

**Další lekce:** GameManager, start obrazovka, výhra a rekord

Notes:
Uložit scénu. Bez GameManager kamera hodí NullReference — to je normální, opravíme v lekci 5.
