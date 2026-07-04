using UnityEngine;

// Kaktus se pohybuje doleva rychlostí hry a zničí se, když vyjede z obrazovky.
// Přiřazen na prefab "Cactus.prefab".
//
// NASTAVENÍ PREFABU:
//   1. Vytvoř GameObject, přidej SpriteRenderer s Cactus.png
//   2. Přidej BoxCollider2D → Is Trigger = ✓ (trigger, ne fyzická kolize)
//   3. Přidej Rigidbody2D → Body Type = Kinematic
//   4. Nastav Tag na "Cactus"
//   5. Přidej tento skript
//   6. Ulož jako Prefab do Assets/Prefabs/Cactus.prefab
public class Cactus : MonoBehaviour
{
    // Když kaktus vyjede za tuto hranici vlevo, zničíme ho (mimo obrazovku)
    private const float DestroyX = -20f;

    void Update()
    {
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        // Pohyb doleva: rychlost hry × čas od posledního snímku
        transform.Translate(Vector3.left * GameManager.Instance.GameSpeed * Time.deltaTime);

        // Pokud kaktus vyjel z obrazovky, zničíme instanci
        if (transform.position.x < DestroyX)
            Destroy(gameObject);
    }
}
