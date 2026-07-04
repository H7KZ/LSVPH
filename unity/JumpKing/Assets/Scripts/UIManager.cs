using UnityEngine;
using TMPro;

// Spravuje UI panely a HUD (patro + osobní rekord).
//
// PANELY:
//   StartPanel  — zobrazí se při spuštění, skryje se po stisku Space
//   WinPanel    — zobrazí se při výhře
//
// HUD (aktualizován každý snímek):
//   screenText     — "Patro: 2/3"  (aktuální patro hráče)
//   bestScreenText — "Nejlepší: 3/3"  (přes PlayerPrefs = přetrvá i po restartu)
//
// NASTAVENÍ VE SCÉNĚ:
//   1. Přiřaď na stejný GameObject jako GameManager
//   2. Propoj StartPanel, WinPanel, ScreenText, BestScreenText v Inspektoru
//   3. Přetáhni Main Camera (s CameraController) do pole CameraController
[RequireComponent(typeof(GameManager))]
public class UIManager : MonoBehaviour
{
    [Header("Panely")]
    [SerializeField] private GameObject startPanel;
    [SerializeField] private GameObject winPanel;

    [Header("HUD")]
    [SerializeField] private TextMeshProUGUI screenText;
    [SerializeField] private TextMeshProUGUI bestScreenText;
    [SerializeField] private CameraController cameraController;

    // Klíč pro uložení rekordu do PlayerPrefs (přežije restart hry)
    private const string BestScreenKey = "JKBestScreen";

    void Start()
    {
        startPanel.SetActive(true);
        winPanel.SetActive(false);
        UpdateBestScreenText();
    }

    void Update()
    {
        if (cameraController == null) return;
        // CurrentScreen je 0-indexované → +1 pro zobrazení "Patro: 1/3" atd.
        screenText.text = $"Patro: {cameraController.CurrentScreen + 1}/3";
    }

    public void ShowGame()
    {
        startPanel.SetActive(false);
    }

    public void ShowWin()
    {
        winPanel.SetActive(true);

        // Ulož rekord, pokud hráč dosáhl vyššího patra než dřív
        int reached = cameraController.CurrentScreen + 1;
        int best = PlayerPrefs.GetInt(BestScreenKey, 0);
        if (reached > best)
        {
            PlayerPrefs.SetInt(BestScreenKey, reached);
            PlayerPrefs.Save(); // zapíše na disk ihned
        }

        UpdateBestScreenText();
    }

    private void UpdateBestScreenText()
    {
        int best = PlayerPrefs.GetInt(BestScreenKey, 0);
        // Prázdný string pokud ještě žádný rekord neexistuje
        bestScreenText.text = best > 0 ? $"Nejlepší: {best}/3" : "";
    }
}
