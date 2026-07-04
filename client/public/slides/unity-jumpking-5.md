## Jump King — Lekce 5: Cíl a polish

Letní škola vývoje her 2026

---

## Co postavíme dnes

Cílová zóna nahoře levelu, vítězná obrazovka a alespoň jeden zvukový efekt.

**Výsledek:** kompletní Jump King — dosáhnutím cíle se zobrazí vítězná obrazovka

Notes:
Finální lekce! Studenti vidí hotovou hru. Zvuky přidají velký pocit ze hry za malou práci.

---

## Cílová zóna

1. Přidej dlaždice nebo Sprite nahoře levelu jako vizuální cíl (hvězda, koruna, brána)
2. Vytvoř prázdný GameObject → pojmenuj `GoalZone`
3. Nastav pozici na vrchol levelu
4. Přidej **Box Collider 2D** → **Is Trigger: ✓**
5. Nastav **Tag:** `Goal`

Notes:
Vizuální reprezentace cíle je důležitá — hráč musí vědět kam míří. I jednoduchý žlutý čtverec funguje.

---

## WinScreen — vítězná obrazovka

1. **GameObject → UI → Canvas** (nebo přidej do existujícího)
2. Přidej **Panel** (tmavé pozadí, poloprůhledné)
3. Do Panelu přidej **TextMeshPro:** `Vyhrál jsi! 🎉`
4. Přidej **Button:** `Hrát znovu`
5. Panel nastav jako **inactive** (odškrtni v Inspektoru)

Notes:
Panel začíná neaktivní → zobrazíme ho skriptem při dosažení cíle.

---

## GameManager.cs pro Jump King

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    [SerializeField] private GameObject winPanel;

    public void Win()
    {
        winPanel.SetActive(true);
        Time.timeScale = 0f;
    }

    public void Restart()
    {
        Time.timeScale = 1f;
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
}
```

Přiřaď `Restart()` na tlačítko "Hrát znovu" → OnClick.

Notes:
`winPanel.SetActive(true)` = zobrazit panel. `Time.timeScale = 0` = zastavit hru.

---

## GoalTrigger.cs

```csharp
using UnityEngine;

public class GoalTrigger : MonoBehaviour
{
    [SerializeField] private GameManager gameManager;

    void OnTriggerEnter2D(Collider2D col)
    {
        if (col.CompareTag("Player"))
            gameManager.Win();
    }
}
```

Přiřaď na `GoalZone`. Nastav **Tag:** `Player` na postavě.

Notes:
Propojit GameManager v Inspektoru GoalTrigger skriptu.

---

## Zvukové efekty

1. Stáhni WAV nebo MP3 soubory (skok, vítězství) do `Audio/` složky
2. Přidej `AudioSource` komponentu na `Player`
3. Do `PlayerController.cs` přidej:

```csharp
[SerializeField] private AudioSource audioSource;
[SerializeField] private AudioClip jumpSound;

// v části kde skáčeme:
audioSource.PlayOneShot(jumpSound);
```

Notes:
`PlayOneShot` = přehraje zvuk jednou, nepřeruší ostatní zvuky. Vhodné pro efekty. `audioSource.Play()` by zastavilo předchozí přehrávání.

---

## Finální test

Zkontroluj:

- ✅ Cílová zóna nahoře levelu
- ✅ Vítězná obrazovka při dosažení cíle
- ✅ Tlačítko "Hrát znovu" restartuje hru
- ✅ Zvuk skoku při odpichnutí

**Gratulace — dokončil jsi Jump King!** 👑

Notes:
Volitelná rozšíření: čas od spuštění hry, počítadlo skoků, různé typy platforem (ledové = klouzání), parallax pozadí.
