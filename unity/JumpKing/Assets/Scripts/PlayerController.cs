using UnityEngine;

// Ovládá nabíjecí skok — klíčová mechanika Jump Kinga.
//
// JAK SKOK FUNGUJE (3 kroky):
//   1. Hráč stojí na zemi a stiskne Space  →  isCharging = true, chargeAmount = 0
//   2. Hráč drží Space + mačká A/D        →  chargeAmount roste 0→1, nastaví se směr
//   3. Hráč pustí Space                    →  rychlost = směr × nabití × maxSíla
//
// Pozor: za letu nelze měnit směr — to je záměr (věrné originálu Jump King).
//
// NASTAVENÍ VE SCÉNĚ:
//   - Rigidbody2D: Gravity Scale 3, Freeze Rotation Z
//   - BoxCollider2D přizpůsobený tělu postavy
//   - Tag "Ground" na zemi i všech plošinách
[RequireComponent(typeof(Rigidbody2D))]
public class PlayerController : MonoBehaviour
{
    [Header("Skok")]
    [SerializeField] private float maxJumpForce = 15f;
    [SerializeField] private float maxHorizontalSpeed = 5f;
    // chargeRate = kolik nabití přibyde za sekundu; 1.5 → plné nabití za ~0.67 s
    [SerializeField] private float chargeRate = 1.5f;

    private Rigidbody2D rb;
    private bool isGrounded;
    private bool isCharging;
    private float chargeAmount;      // 0 = nenabito, 1 = plně nabito
    private float horizontalDirection; // -1 vlevo, 0 rovně, +1 vpravo

    void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    void Update()
    {
        // Blokuj vstup mimo stav Playing (startovní obrazovka, výhra)
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        // KROK 1: Stisk Space na zemi zahájí nabíjení
        if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
        {
            isCharging = true;
            chargeAmount = 0f;
        }

        // KROK 2: Držení Space zvyšuje nabití + hráč volí směr
        if (isCharging && Input.GetKey(KeyCode.Space))
        {
            chargeAmount = Mathf.Min(chargeAmount + chargeRate * Time.deltaTime, 1f);
            horizontalDirection = Input.GetAxisRaw("Horizontal"); // A/D nebo šipky
        }

        // KROK 3: Puštění Space odpaluje skok — síla odpovídá nabití
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

    // Unity zavolá tuto metodu při dotyku s jiným colliderem
    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.CompareTag("Ground")) isGrounded = true;
    }

    // Unity zavolá tuto metodu když hráč opustí collider (odskočí)
    void OnCollisionExit2D(Collision2D col)
    {
        if (col.gameObject.CompareTag("Ground")) isGrounded = false;
    }
}
