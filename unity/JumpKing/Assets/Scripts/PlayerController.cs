using UnityEngine;

// PlayerController ovládá nabíjecí skok — základní mechaniku Jump Kinga.
//
// NABÍJECÍ SKOK:
//   1. Hráč stojí na zemi a drží Space → chargeAmount roste 0→1
//   2. Zároveň A/D nastaví horizontální směr skoku
//   3. Puštění Space → aplikuj rychlost (síla × směr)
//   4. Za letu nelze měnit směr (věrné Jump Kingu)
//
// NASTAVENÍ VE SCÉNĚ:
//   1. Přiřaď na GameObject "Hráč"
//   2. Hráč musí mít Rigidbody2D (Gravity Scale: 3, Freeze Rotation Z)
//   3. Hráč musí mít BoxCollider2D
//   4. Zem a všechny plošiny musí mít Tag: "Ground"
[RequireComponent(typeof(Rigidbody2D))]
public class PlayerController : MonoBehaviour
{
    [SerializeField] private float maxJumpForce = 15f;
    [SerializeField] private float maxHorizontalSpeed = 5f;
    [SerializeField] private float chargeRate = 1.5f; // plné nabití za ~0.67 s

    private Rigidbody2D rb;
    private bool isGrounded;
    private bool isCharging;
    private float chargeAmount;
    private float horizontalDirection;

    void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    void Update()
    {
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        // Začni nabíjení: mezerník stisknut a hráč stojí na zemi
        if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
        {
            isCharging = true;
            chargeAmount = 0f;
        }

        // Nabíjení: mezerník držen → zvyšuj sílu, čti směr z A/D
        if (isCharging && Input.GetKey(KeyCode.Space))
        {
            chargeAmount = Mathf.Min(chargeAmount + chargeRate * Time.deltaTime, 1f);
            horizontalDirection = Input.GetAxisRaw("Horizontal");
        }

        // Skok: puštění mezerníku → aplikuj rychlost
        if (isCharging && Input.GetKeyUp(KeyCode.Space))
        {
            rb.linearVelocity = new Vector2(
                horizontalDirection * chargeAmount * maxHorizontalSpeed,
                chargeAmount * maxJumpForce
            );
            isCharging = false;
            chargeAmount = 0f;
        }
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.CompareTag("Ground")) isGrounded = true;
    }

    void OnCollisionExit2D(Collision2D col)
    {
        if (col.gameObject.CompareTag("Ground")) isGrounded = false;
    }
}
