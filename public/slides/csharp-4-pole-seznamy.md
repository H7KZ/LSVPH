## Lekce 4: Pole a seznamy

- Pole — pevná kolekce hodnot
- Přístup přes index, iterace pomocí foreach
- `List<T>` — dynamická kolekce
- Kdy použít pole a kdy List

---

## Pole

```csharp
int[] znamky = new int[5];      // pole 5 čísel, zatím nuly
znamky[0] = 1;
znamky[1] = 3;

string[] hry = { "Minecraft", "Fortnite", "CS2" };  // přímá inicializace

Console.WriteLine(hry[0]);       // Minecraft
Console.WriteLine(hry.Length);   // 3
```

- Index začíná od **0**
- Velikost je pevná — pole nelze zvětšit

---

## Vícerozměrná pole

```csharp
int[,] mapa = new int[3, 3];   // mřížka 3×3

mapa[0, 0] = 1;
mapa[1, 2] = 5;

Console.WriteLine(mapa[1, 2]);  // 5
```

Hodí se pro herní mapy, šachovnice, 2D gridy.

Notes:
int[,,] pro 3D pole. V praxi se vícerozměrná pole nebo jagged arrays (int[][]) používají pro 2D struktury — Unity například používá pole[] pro dlaždice.

---

## foreach cyklus

```csharp
string[] hry = { "Minecraft", "Fortnite", "CS2" };

foreach (string hra in hry)
{
    Console.WriteLine(hra);
}
```

- Prochází všechny prvky od začátku do konce
- Neznáš index — jen aktuální hodnotu
- Nelze měnit prvky kolekce uvnitř foreach

---

## List&lt;T&gt;

```csharp
List<string> hry = new List<string>();

hry.Add("Minecraft");
hry.Add("Fortnite");
hry.Remove("Fortnite");

Console.WriteLine(hry.Count);   // 1
Console.WriteLine(hry[0]);      // Minecraft
```

- Dynamická velikost — `Add()` a `Remove()` mění seznam za běhu
- `.Count` místo `.Length`
- Indexování funguje stejně jako u pole

Notes:
List<T> je v praxi mnohem běžnější než pole, protože nevíte předem kolik prvků budete mít. Pole je výkonnější, ale méně flexibilní.

---

## Pole vs. List

| | Pole `T[]` | List `List<T>` |
|--|------------|----------------|
| Velikost | pevná | dynamická |
| Výkon | rychlejší | mírně pomalejší |
| Přidávání | ❌ | ✅ `.Add()` |
| Odebírání | ❌ | ✅ `.Remove()` |
| Kdy použít | pevný počet | neznámý počet |

---

## Cvičení: Průměr známek

Napiš program, který:

1. Vytvoří `List<int>` a naplní ho 5 známkami (1–5) načtenými od uživatele
2. Vypočítá a vypíše průměr

Notes:
Řešení:
```csharp
List<int> znamky = new List<int>();

for (int i = 1; i <= 5; i++)
{
    Console.Write($"Zadej {i}. známku: ");
    znamky.Add(int.Parse(Console.ReadLine()));
}

int soucet = 0;
foreach (int z in znamky)
    soucet += z;

Console.WriteLine($"Průměr: {(double)soucet / znamky.Count:F1}");
```
