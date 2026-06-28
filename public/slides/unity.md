## Vývoj v Unity

TBD

---

## Co je Unity?

- Herní engine pro 2D i 3D hry
- Používá C# jako skriptovací jazyk
- Zdarma pro osobní a vzdělávací projekty

---

## GameObjects a komponenty

```
GameObject
  ├── Transform (pozice, rotace, velikost)
  ├── MeshRenderer (jak vypadá)
  ├── Rigidbody (fyzika)
  └── MyScript (vlastní logika)
```

Vše v Unity je GameObject + komponenty.

---

## První skript

```csharp
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public float speed = 5f;

    void Update()
    {
        float x = Input.GetAxis("Horizontal");
        float z = Input.GetAxis("Vertical");
        transform.Translate(x * speed * Time.deltaTime, 0, z * speed * Time.deltaTime);
    }
}
```

---

## Fyzika

- **Rigidbody** — objekt podléhá fyzice (gravitace, kolize)
- **Collider** — tvar pro detekci kolizí
- `AddForce()` — aplikovat sílu na Rigidbody

Notes:
Živá ukázka: přidat Rigidbody na krychli a nechat ji spadnout.
