## Základy programování v C#

Jan Komínek

---

## Co je C#?

- Moderní, objektově orientovaný jazyk
- Vyvíjen Microsoftem od roku 2000
- Používá se v Unity pro herní logiku

---

## Proměnné

```csharp
int score = 0;
string playerName = "Hráč 1";
bool isAlive = true;
float speed = 5.5f;
```

---

## Podmínky

```csharp
if (score > 100)
{
    Console.WriteLine("Výborně!");
}
else
{
    Console.WriteLine("Zkus to znovu.");
}
```

---

## Cykly

```csharp
for (int i = 0; i < 10; i++)
{
    Console.WriteLine($"Kolo {i + 1}");
}
```

---

## Třídy

```csharp
class Player
{
    public string Name;
    public int Health = 100;

    public void TakeDamage(int damage)
    {
        Health -= damage;
    }
}
```

Notes:
Ukázat na příkladu – vytvořit instanci Player a zavolat TakeDamage.
