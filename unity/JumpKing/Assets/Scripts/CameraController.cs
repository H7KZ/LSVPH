using UnityEngine;

// Přepíná kameru mezi "patry" (obrazovkami) Jump King stylem.
//
// JAK TO FUNGUJE:
//   Level je rozdělen na patry, každé patro = 1 obrazovka kamery.
//   Výška obrazovky = orthographicSize × 2 (Unity jednotky).
//   Když hráč přejde horní / dolní okraj → kamera "skočí" (snap) na nové patro.
//   Není plynulé sledování — záměrně, tak to funguje v Jump Kingu.
//
//   Dosáhnutí posledního patra → TriggerWin (konec hry).
//   Pád z prvního patra není možný — Mathf.Max(0, ...) drží minimum.
//
// NASTAVENÍ VE SCÉNĚ:
//   1. Přiřaď na Main Camera
//   2. Přetáhni GameObject hráče do pole Player
//   3. Total Screens = počet pater v levelu (výchozí: 3)
public class CameraController : MonoBehaviour
{
    [SerializeField] private Transform player;
    [SerializeField] private int totalScreens = 3;

    private int currentScreen;   // aktuální patro (0 = přízemí)
    private float screenHeight;  // výška jedné obrazovky v Unity jednotkách

    // Ostatní skripty čtou aktuální patro pro zobrazení v HUD
    public int CurrentScreen => currentScreen;

    void Awake()
    {
        // orthographicSize = polovina výšky obrazovky → × 2 = celá výška
        screenHeight = Camera.main.orthographicSize * 2f;
        SnapCamera();
    }

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

            // Poslední patro → výhra
            if (currentScreen >= totalScreens)
            {
                currentScreen = totalScreens - 1;
                SnapCamera();
                GameManager.Instance.TriggerWin();
                return;
            }

            SnapCamera();
        }

        // Hráč přešel dolní okraj → přejdi o patro níž (minimum = přízemí)
        if (player.position.y < camY - halfHeight)
        {
            currentScreen = Mathf.Max(0, currentScreen - 1);
            SnapCamera();
        }
    }

    // Okamžitě přesune kameru na střed aktuálního patra
    private void SnapCamera()
    {
        transform.position = new Vector3(0f, screenHeight * (currentScreen + 0.5f), -10f);
    }
}
