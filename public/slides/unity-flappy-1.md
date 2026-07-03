## Flappy Bird — Část 1: Ptáček

Letní škola vývoje her 2026

---

## Co dnes postavíme

Flappy Bird klon od základu:

- Ptáček který padá díky gravitaci
- Skok mezerníkem
- Roury jako překážky
- Skóre a restart

**Cíl dopoledne:** funkční ptáček s fyzikou a kolekcí kolizí

Notes:
Ukažte hotovou hru nejdřív alespoň minutu. Studenti by měli vidět konečný cíl před tím než začneme. Pak otevřete projekt a jdeme na to.

---

## Struktura projektu

Čtyři scripty, každý má jednu zodpovědnost:

| Script           | Co dělá                                   |
| ---------------- | ----------------------------------------- |
| `PlayerMovement` | Vstup hráče, skok, detekce kolizí         |
| `Pipe`           | Pohyb roury doleva, zničení za obrazovkou |
| `PipeSpawner`    | Pravidelné vytváření nových rour          |
| `GameManager`    | Skóre a aktualizace UI                    |

Notes:
Otevřete projekt ve Visual Studio. Ukažte strukturu složek v Unity Project okně. Jeden script = jedna zodpovědnost = jednodušší debugging. Pokud script dělá příliš mnoho věcí, je čas ho rozdělit.

---

## Fyzika ptáčka

`Rigidbody2D` — fyzikální komponenta pro 2D objekty

```
Gravity Scale = 1   →   ptáček padá dolů
linearVelocity = Vector2.up * 4   →   ptáček vyletí nahoru
```

Gravitace pak velocity postupně snižuje → parabolický oblouk

Notes:
Přidejte Rigidbody2D komponentu na ptáčka v Inspectoru (Add Component → Physics 2D → Rigidbody2D). Ukažte co se stane v Play Mode - ptáček padá. Experimentujte s Gravity Scale živě (hodnoty 0.5, 2, 5).

---

## PlayerMovement.cs — skok

```csharp
void Update()
{
    if (Input.GetKeyDown(KeyCode.Space))
    {
        // Nastavíme okamžitou rychlost nahoru
        // Gravitace pak velocity postupně snižuje
        rb.linearVelocity = Vector2.up * jumpForce;
    }
}
```

`Update()` = každý snímek (60× za sekundu)

`GetKeyDown` = pouze v moment zmáčknutí, ne při držení

Notes:
Rozdíl: GetKey (každý snímek při držení), GetKeyDown (jen první snímek), GetKeyUp (při puštění). Pro skok chceme GetKeyDown - jedno zmáčknutí = jeden skok. Ukažte rozdíl živě.

---

## Trigger vs Collider

Dva typy `BoxCollider2D`:

|                | `IsTrigger = false`  | `IsTrigger = true`              |
| -------------- | -------------------- | ------------------------------- |
| Fyzická kolize | ✅ objekty se odrazí | ❌ projdou skrz                 |
| Callback       | `OnCollisionEnter2D` | `OnTriggerEnter2D`              |
| Použití        | Pevné zdi, podlaha   | Neviditelné zóny, sběr předmětů |

Notes:
Ukažte v Inspectoru na ptáčkovi - BoxCollider2D s IsTrigger = true. Fyzická kolize s rourou by způsobila divné odrážení. Trigger nám jen řekne "dotkli jste se" a my rozhodneme co se stane.

---

## OnTriggerEnter2D — tagy

```csharp
private void OnTriggerEnter2D(Collider2D collision)
{
    if (collision.CompareTag("Pipe"))
    {
        // Trefili jsme rouru → restartujeme scénu
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    if (collision.CompareTag("Score"))
    {
        // Prošli jsme mezerou → přidáme bod
        gameManager.AddPoints(1);
    }
}
```

**Tag** = štítek na GameObject (nastavit v Inspectoru → Tag dropdown)

Notes:
Ukažte tagy na rouře v Inspectoru. CompareTag je rychlejší než == "Pipe" (nemusí alokovat string). SceneManager.LoadScene restartuje celou scénu - vše se vrátí do počátečního stavu.

---

## Shrnutí části 1

Naučili jsme se:

- ✅ `Rigidbody2D` — fyzika, gravitace, velocity
- ✅ `Update()` + `GetKeyDown` — vstup hráče
- ✅ `BoxCollider2D` + `IsTrigger` — detekce kontaktu
- ✅ `OnTriggerEnter2D` + tagy — reakce na kolize

Po obědě přidáme:

- 🍽 Roury které se spawnují a pohybují
- 🍽 Skóre a UI
- 🍽 Kompletní herní smyčku

Notes:
Dejte studentům 10 minut na experimentování - změna jumpForce, gravity scale, přidání dalšího klíče. Pak přestávka na oběd.
