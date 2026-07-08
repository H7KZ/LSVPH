## První skripty v Unity

---

## Co se naučíš

- Jak vytvořit **C# skript**
- Jak ho připojit k objektu
- Co znamenají `Start()` a `Update()`
- Jak ovládat objekt pomocí kódu

---

## Co je skript?

Skript říká objektům, **co mají dělat**.

Například:

- pohyb hráče
- otevírání dveří
- sbírání mincí
- střelba
- počítání skóre

Bez skriptů by byla hra jen statická scéna.

---

## Vytvoření skriptu

V okně **Project**:

```
Create
   ↓
MonoBehaviour Script
```

Skript si pojmenuj podle toho, co bude dělat.

Například:

- PlayerMovement
- EnemyAI
- Coin
- Door

Notes:
Ukázat vytvoření skriptu a otevření ve Visual Studiu nebo Rideru.

---

## Připojení skriptu

Skript musí být připojený k objektu.

Možnosti:

- přetáhnout skript na objekt
- Add Component → název skriptu

Od té chvíle Unity skript spouští.

Notes:
Připojit PlayerMovement na Cube.

---

## Jak vypadá nový skript?

```csharp
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    void Start()
    {

    }

    void Update()
    {

    }
}
```

Unity ti tuto kostru vytvoří automaticky.

---

## Start()

```csharp
void Start()
{
    Debug.Log("Hra začala!");
}
```

`Start()` se spustí **jen jednou**.

Používá se například pro:

- nastavení proměnných
- načtení dat
- přípravu objektu

Notes:
Ukázat Console.

---

## Update()

```csharp
void Update()
{

}
```

`Update()` běží **každý snímek**.

Při 60 FPS se zavolá přibližně 60× za sekundu.

Používá se pro:

- pohyb
- ovládání
- animace
- kontrolu vstupu

---

## Debug.Log()

```csharp
Debug.Log("Ahoj světe!");
```

Vypíše zprávu do **Console**.

Hodí se při hledání chyb nebo ověřování, že se něco opravdu děje.

Notes:
Ukázat Console a několik výpisů.

---

## Proměnné

```csharp
public float speed = 5f;
public int health = 100;
public string playerName = "Player";
```

Proměnné uchovávají data.

Pokud jsou označené jako `public`, můžeš je měnit přímo v Inspectoru.

Notes:
Ukázat změnu Speed v Inspectoru.

---

## Pohyb objektu

```csharp
public float speed = 5f;

void Update()
{
    transform.Translate(
        Vector3.forward * speed * Time.deltaTime
    );
}
```

Objekt se začne pohybovat dopředu.

---

## Proč Time.deltaTime?

```csharp
speed * Time.deltaTime
```

Díky tomu je pohyb stejně rychlý na pomalém i rychlém počítači.

Bez `deltaTime` by se hra chovala jinak při různých FPS.

---

## Ovládání klávesnicí

```csharp
void Update()
{
    float x = Input.GetAxis("Horizontal");

    transform.Translate(
        x * speed * Time.deltaTime,
        0,
        0
    );
}
```

`Horizontal` reaguje na:

- A / D
- ← / →

---

## Podmínky

```csharp
if (Input.GetKeyDown(KeyCode.Space))
{
    Debug.Log("Skok!");
}
```

---

## Komponenty z kódu

```csharp
Rigidbody rb;

void Start()
{
    rb = GetComponent<Rigidbody>();
}
```

`GetComponent()` najde komponentu na stejném objektu.

Pak s ní můžeš pracovat z kódu.

Notes:
Ukázat Rigidbody na Cube.

---

## Veřejné reference

```csharp
public GameObject target;
```

Do této proměnné můžeš v Inspectoru přetáhnout jiný objekt.

Skripty tak mohou spolupracovat.

Notes:
Ukázat drag & drop objektu do Inspectoru.

---

## Jak přemýšlet při psaní skriptu?

1. Co má objekt dělat?
2. Kdy se to má stát?
3. Jaké informace potřebuje?
4. Jaký kód to zajistí?

Velké hry jsou jen spousta malých skriptů, které spolu komunikují.

---

## Pojďme si to vyzkoušet!

Vytvoříme skript, který:

- vypisuje zprávu do Console
- pohybuje krychlí
- reaguje na klávesnici

Notes:
Živá ukázka od vytvoření skriptu až po pohyb Cube pomocí A/D.
