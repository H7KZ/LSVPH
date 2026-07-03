using UnityEngine;

// CameraController přepíná obrazovku (patro) kdy hráč přejde přes okraj.
//
// LOGIKA:
//   Každá obrazovka = Camera.orthographicSize * 2 Unity jednotek výšky.
//   Kamera se přesune (snap) na středovou Y souřadnici nové obrazovky.
//   Při dosažení vrcholu (currentScreen >= totalScreens) → TriggerWin.
//   Mathf.Max(0, ...) zabraňuje záporné obrazovce — floor collider
//   hráče zachytí, ale guard clause je tam pro jistotu.
//
// NASTAVENÍ VE SCÉNĚ:
//   1. Přiřaď na Main Camera
//   2. Přetáhni GameObject "Hráč" do pole Player
//   3. Total Screens = 3
public class CameraController : MonoBehaviour
{
    [SerializeField] private Transform player;
    [SerializeField] private int totalScreens = 3;

    private int currentScreen;
    private float screenHeight;

    public int CurrentScreen => currentScreen;

    void Awake()
    {
        screenHeight = Camera.main.orthographicSize * 2f;
        SnapCamera();
    }

    void Update()
    {
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        float camY = transform.position.y;
        float halfHeight = screenHeight * 0.5f;

        // Hráč opustil horní okraj → přejdi o patro výš
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

        // Hráč opustil dolní okraj → přejdi o patro níž (min. 0)
        if (player.position.y < camY - halfHeight)
        {
            currentScreen = Mathf.Max(0, currentScreen - 1);
            SnapCamera();
        }
    }

    private void SnapCamera()
    {
        transform.position = new Vector3(0f, screenHeight * (currentScreen + 0.5f), -10f);
    }
}
