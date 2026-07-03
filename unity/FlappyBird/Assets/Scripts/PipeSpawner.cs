using UnityEngine;

// PipeSpawner pravidelně vytváří nové roury na náhodné výšce.
// Přiřazen na prázdný GameObject vpravo od obrazovky.
public class PipeSpawner : MonoBehaviour
{
    [SerializeField] private float spawnInterval = 2.5f;
    [SerializeField] private float heightRange = 5f;
    [SerializeField] private GameObject pipe;

    // InvokeRepeating volá SpawnPipe() ihned (0f) a pak každé spawnInterval sekund.
    void Start()
    {
        InvokeRepeating(nameof(SpawnPipe), 0f, spawnInterval);
    }

    void SpawnPipe()
    {
        Vector2 position = new Vector2(
            transform.position.x,
            Random.Range(-heightRange, heightRange)
        );
        Instantiate(pipe, position, Quaternion.identity, transform);
    }
}
