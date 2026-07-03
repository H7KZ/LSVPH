using UnityEngine;
using UnityEngine.SceneManagement;

// PlayerMovement ovládá ptáčka - zpracovává vstup hráče a detekuje kolize.
// Přiřazen na GameObject ptáčka, který musí mít Rigidbody2D a BoxCollider2D (IsTrigger=true).
public class PlayerMovement : MonoBehaviour
{
    [SerializeField] private float jumpForce = 4f;
    [SerializeField] private Rigidbody2D rb;
    [SerializeField] private GameManager gameManager;

    // Update se volá každý snímek (~60×/s).
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            // linearVelocity nastaví okamžitou rychlost nahoru.
            // Gravitace Rigidbody2D pak velocity postupně snižuje → parabolický oblouk.
            rb.linearVelocity = Vector2.up * jumpForce;
        }
    }

    // Rozlišujeme co jsme trefili pomocí tagů GameObject.
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Pipe"))
            SceneManager.LoadScene(SceneManager.GetActiveScene().name);

        if (collision.CompareTag("Score"))
            gameManager.AddPoints(1);
    }
}
