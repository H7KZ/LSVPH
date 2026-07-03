using UnityEngine;

// Pipe se pohybuje doleva a zničí se jakmile opustí obrazovku.
// Přiřazen na kořenový GameObject prefabu Pipe.
public class Pipe : MonoBehaviour
{
    [SerializeField] private float speed = 5f;

    // Time.deltaTime = čas od minulého snímku → rychlost nezávisí na FPS.
    void Update()
    {
        transform.position += Vector3.left * speed * Time.deltaTime;
    }

    // PipeDestroy je prázdný GO s Trigger Colliderem vlevo od kamery.
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("PipeDestroy"))
            Destroy(gameObject);
    }
}
