using UnityEngine;

// CactusSpawner vytváří nové kaktusy v náhodných intervalech.
// Přiřazen prázdnému GameObjectu "CactusSpawner" na pravém okraji obrazovky (X ≈ +12).
//
// NASTAVENÍ VE SCÉNĚ:
//   1. Vytvoř prázdný GameObject "CactusSpawner" na pozici X = 12, Y = -3
//   2. Přidej tento skript
//   3. Přiřaď Cactus.prefab do pole "Cactus Prefab" v Inspektoru
public class CactusSpawner : MonoBehaviour
{
    [SerializeField] private GameObject cactusPrefab;
    [SerializeField] private float minInterval = 1.5f;
    [SerializeField] private float maxInterval = 3.5f;

    private float timer;
    private float nextSpawnTime;

    void Start()
    {
        // První spawn po náhodném intervalu
        nextSpawnTime = Random.Range(minInterval, maxInterval);
    }

    void Update()
    {
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        timer += Time.deltaTime;

        if (timer >= nextSpawnTime)
        {
            SpawnCactus();
            timer = 0f;
            // Každý interval je jiný — hra je nepředvídatelná
            nextSpawnTime = Random.Range(minInterval, maxInterval);
        }
    }

    private void SpawnCactus()
    {
        // Instantiate vytvoří kopii prefabu na pozici tohoto GameObjectu
        Instantiate(cactusPrefab, transform.position, Quaternion.identity);
    }
}
