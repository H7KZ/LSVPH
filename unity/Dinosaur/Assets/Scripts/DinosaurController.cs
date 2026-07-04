using UnityEngine;

// DinosaurController ovládá dinosaura: skok, detekci přistání a smrt.
//
// NASTAVENÍ VE SCÉNĚ:
//   1. Přidej na GameObject "Dinosaurus"
//   2. Rigidbody2D: Gravity Scale = 2, Freeze Rotation Z = ✓
//   3. BoxCollider2D: Is Trigger = ✗
//   4. AudioSource: Play On Awake = ✗
//   5. Tag podlahy nastav na "Ground"
//   6. Kaktus prefab: BoxCollider2D Is Trigger = ✓, Tag = "Cactus"
[RequireComponent(typeof(Rigidbody2D))]
[RequireComponent(typeof(AudioSource))]
public class DinosaurController : MonoBehaviour
{
    [SerializeField] private float jumpForce = 10f;
    [SerializeField] private AudioClip jumpSound;

    private Rigidbody2D rb;
    private AudioSource audioSource;
    private bool isGrounded;

    void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
        audioSource = GetComponent<AudioSource>();
    }

    void Update()
    {
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        bool jumpInput = Input.GetKeyDown(KeyCode.Space)
                      || Input.GetKeyDown(KeyCode.UpArrow);

        if (jumpInput && isGrounded)
            Jump();
    }

    private void Jump()
    {
        // ForceMode2D.Impulse = okamžitý impuls → přirozený oblouk skoku
        rb.AddForce(Vector2.up * jumpForce, ForceMode2D.Impulse);
        isGrounded = false;
        if (audioSource != null && jumpSound != null)
            audioSource.PlayOneShot(jumpSound);
    }

    // Fyzická kolize se zemí (Is Trigger = ✗)
    void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("Ground"))
            isGrounded = true;
    }

    void OnCollisionExit2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("Ground"))
            isGrounded = false;
    }

    // Trigger kolize s kaktusem (Is Trigger = ✓)
    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Cactus"))
        {
            rb.simulated = false; // zamrazíme fyziku — dino zůstane na místě
            GameManager.Instance.TriggerGameOver();
        }
    }
}
