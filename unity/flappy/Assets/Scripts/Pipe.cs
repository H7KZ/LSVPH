using UnityEngine;

// Pipe se pohybuje doleva a zničí se jakmile opustí obrazovku.
// Přiřazen na kořenový GameObject každé roury (Pipe prefab).
public class Pipe : MonoBehaviour
{
    [SerializeField] private float speed = 5f; // rychlost pohybu doleva (jednotky/sekunda)

    // Update se volá každý snímek.
    // Time.deltaTime = čas od minulého snímku -> rychlost nezávisí na FPS.
    void Update()
    {
        transform.position += Vector3.left * speed * Time.deltaTime;
    }

    // Když roura přejede přes neviditelný "PipeDestroy" trigger vlevo od kamery,
    // zničíme celý GameObject - uvolníme paměť.
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("PipeDestroy"))
        {
            Destroy(gameObject);
        }
    }
}
