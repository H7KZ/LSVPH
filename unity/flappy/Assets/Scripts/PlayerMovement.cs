using UnityEngine;
using UnityEngine.SceneManagement;

// PlayerMovement ovládá ptáčka - zpracovává vstup hráče a detekuje kolize.
// Přiřazen na GameObject ptáčka, který musí mít Rigidbody2D a BoxCollider2D.
public class PlayerMovement : MonoBehaviour
{
    [SerializeField] private float jumpForce = 4f;       // síla skoku (nastav v Inspectoru)
    [SerializeField] private Rigidbody2D rb;             // reference na fyzikální komponentu
    [SerializeField] private GameManager gameManager;    // reference na správce skóre

    // Update se volá každý snímek (frame).
    // Zde kontrolujeme vstup hráče - zmáčknutí mezerníku = skok.
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            // linearVelocity nastaví okamžitou rychlost ptáčka nahoru.
            // Gravitace Rigidbody2D pak velocity postupně snižuje -> parabolický oblouk.
            rb.linearVelocity = Vector2.up * jumpForce;
        }
    }

    // OnTriggerEnter2D se volá když se náš BoxCollider2D (IsTrigger=true)
    // dotkne jiného kolideru. Rozlišujeme co jsme trefili pomocí tagů.
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Pipe"))
        {
            // Trefili jsme rouru - restartujeme scénu (= reset celé hry)
            SceneManager.LoadScene(SceneManager.GetActiveScene().name);
        }

        if (collision.CompareTag("Score"))
        {
            // Prošli jsme mezerou v rouře - přidáme bod
            gameManager.AddPoints(1);
        }
    }
}
