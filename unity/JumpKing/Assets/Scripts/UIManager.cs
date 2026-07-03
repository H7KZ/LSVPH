using UnityEngine;
using TMPro;

// UIManager zobrazuje panely a aktualizuje HUD (patro + rekord).
//
// NASTAVENÍ VE SCÉNĚ:
//   1. Přiřaď na stejný GameObject jako GameManager
//   2. Propoj StartPanel, WinPanel, ScreenText, BestScreenText v Inspektoru
//   3. Přetáhni Main Camera (s CameraController) do pole CameraController
[RequireComponent(typeof(GameManager))]
public class UIManager : MonoBehaviour
{
    [SerializeField] private GameObject startPanel;
    [SerializeField] private GameObject winPanel;
    [SerializeField] private TextMeshProUGUI screenText;
    [SerializeField] private TextMeshProUGUI bestScreenText;
    [SerializeField] private CameraController cameraController;

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
        screenText.text = $"Patro: {cameraController.CurrentScreen + 1}/3";
    }

    public void ShowGame()
    {
        startPanel.SetActive(false);
    }

    public void ShowWin()
    {
        winPanel.SetActive(true);

        int reached = cameraController.CurrentScreen + 1;
        int best = PlayerPrefs.GetInt(BestScreenKey, 0);
        if (reached > best)
        {
            PlayerPrefs.SetInt(BestScreenKey, reached);
            PlayerPrefs.Save();
        }

        UpdateBestScreenText();
    }

    private void UpdateBestScreenText()
    {
        int best = PlayerPrefs.GetInt(BestScreenKey, 0);
        bestScreenText.text = best > 0 ? $"Nejlepší: {best}/3" : "";
    }
}
