using UnityEngine;

// PipeSpawner pravidelně vytváří nové roury na náhodné výšce.
// Přiřazen na prázdný GameObject vpravo od obrazovky.
public class PipeSpawner : MonoBehaviour
{
    [SerializeField] private float spawnInterval = 2.5f; // čas mezi rourami (sekundy)
    [SerializeField] private float heightRange = 5f;     // rozsah náhodné výšky (+/-)
    [SerializeField] private GameObject pipe;            // prefab roury (přetáhnout v Inspectoru)

    // Start se volá jednou na začátku hry.
    // InvokeRepeating volá SpawnPipe() ihned (0f) a pak každé spawnInterval sekund.
    // Čistší než ruční časovač v Update().
    void Start()
    {
        InvokeRepeating(nameof(SpawnPipe), 0f, spawnInterval);
    }

    // Vytvoří novou rouru na náhodné výšce.
    // Instantiate zkopíruje prefab a vloží ho do scény jako dítě tohoto GameObjectu.
    void SpawnPipe()
    {
        Vector2 position = new Vector2(
            transform.position.x,
            Random.Range(-heightRange, heightRange)
        );
        Instantiate(pipe, position, Quaternion.identity, transform);
    }
}
