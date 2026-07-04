## Lekce 4: Pole a seznamy

Letní škola vývoje her 2026 · Matyáš

- Pole — pevná kolekce hodnot
- Přístup přes index, řazení pole
- Vícerozměrná pole — herní mřížka
- `List<T>` — dynamická kolekce
- Nejdůležitější metody Listu
- Kdy použít pole a kdy List

---

## Pole

```csharp
int[] znamky = new int[5];       // pole 5 čísel, zatím nuly
znamky[0] = 1;
znamky[1] = 3;

string[] hry = { "Minecraft", "Fortnite", "CS2" };  // přímá inicializace

Console.WriteLine(hry[0]);        // Minecraft
Console.WriteLine(hry.Length);    // 3
```

- Index začíná od **0**
- Velikost je pevná — pole nelze zvětšit

---

## Procházení pole

```csharp
int[] skore = { 85, 42, 97, 61, 78 };

// for — znáš index
for (int i = 0; i < skore.Length; i++)
{
    Console.WriteLine($"Hráč {i + 1}: {skore[i]} bodů");
}

// foreach — jen hodnoty
foreach (int s in skore)
{
    Console.Write($"{s} ");
}
```

---

## Řazení pole

```csharp
int[] skore = { 85, 42, 97, 61, 78 };

Array.Sort(skore);                    // od nejmenšího
Console.WriteLine(skore[0]);          // 42 — nejmenší
Console.WriteLine(skore[skore.Length - 1]); // 97 — největší

Array.Reverse(skore);                 // otočí pořadí
Console.WriteLine(skore[0]);          // 97 — největší
```

Notes:
Array.Sort funguje pro int, double, string. Pro vlastní typy je potřeba implementovat IComparable — to je pokročilé
téma.

---

## Vícerozměrná pole

```csharp
int[,] mapa = new int[3, 3];    // mřížka 3×3

mapa[0, 0] = 1;   // levý horní roh
mapa[1, 2] = 5;   // druhý řádek, třetí sloupec

// výpis celé mřížky
for (int r = 0; r < 3; r++)
{
    for (int s = 0; s < 3; s++)
        Console.Write($"{mapa[r, s]} ");
    Console.WriteLine();
}
```

Hodí se pro herní mapy, šachovnice, 2D gridy.

Notes:
int[,,] pro 3D pole. V Unity se pro 2D gridy používá jednodimenzionální pole s výpočtem indexu (index = r * sirka + s) —
je to výkonnější.

---

## List&lt;T&gt;

```csharp
List<string> hry = new List<string>();

hry.Add("Minecraft");
hry.Add("Fortnite");
hry.Add("CS2");

hry.Remove("Fortnite");           // odebere první výskyt

Console.WriteLine(hry.Count);    // 2
Console.WriteLine(hry[0]);       // Minecraft
```

- Dynamická velikost — `Add()` a `Remove()` mění seznam za běhu
- `.Count` místo `.Length`
- Indexování funguje stejně jako u pole

---

## Užitečné metody Listu

```csharp
List<int> cisla = new List<int> { 5, 2, 8, 1, 9, 3 };

cisla.Sort();                          // seřadí vzestupně
cisla.Reverse();                       // otočí pořadí

bool obsahuje = cisla.Contains(8);     // true
int index = cisla.IndexOf(8);         // pozice prvku (nebo -1)
cisla.Insert(0, 42);                   // vloží 42 na index 0
cisla.RemoveAt(2);                     // odstraní prvek na indexu 2
cisla.Clear();                         // vyprázdní seznam

Console.WriteLine(cisla.Count);        // 0
```

Notes:
List.Sort() funguje pro int, double, string. List<string> seřadí abecedně. IndexOf vrátí -1 pokud prvek není v listu.

---

## Inicializace Listu s hodnotami

```csharp
// Starší zápis
List<string> hry1 = new List<string> { "Minecraft", "CS2" };

// Moderní zápis (C# 12+)
List<string> hry2 = ["Minecraft", "CS2"];

// List z pole
string[] pole = { "Minecraft", "CS2" };
List<string> zPole = new List<string>(pole);
```

---

## Pole vs. List

|            | Pole `T[]`     | List `List<T>`  |
| ---------- | -------------- | --------------- |
| Velikost   | pevná          | dynamická       |
| Výkon      | rychlejší      | mírně pomalejší |
| Přidávání  | ❌             | ✅ `.Add()`     |
| Odebírání  | ❌             | ✅ `.Remove()`  |
| Řazení     | `Array.Sort()` | `.Sort()`       |
| Kdy použít | pevný počet    | neznámý počet   |

Notes:
List<T> je v praxi mnohem běžnější než pole, protože nevíte předem kolik prvků budete mít. Pole je výkonnější a Unity ho
hodně používá interně, ale pro hry studentů je List většinou lepší volbou.

---

## Cvičení: Průměr známek

Napiš program, který:

1. Vytvoří `List<int>` a naplní ho 5 známkami (1–5) načtenými od uživatele
2. Seřadí seznam a vypíše nejlepší a nejhorší známku
3. Vypočítá a vypíše průměr

Notes:
Řešení:

```csharp
List<int> znamky = new List<int>();

for (int i = 1; i <= 5; i++)
{
    Console.Write($"Zadej {i}. známku: ");
    znamky.Add(int.Parse(Console.ReadLine()));
}

znamky.Sort();
Console.WriteLine($"Nejlepší: {znamky[0]}");
Console.WriteLine($"Nejhorší: {znamky[znamky.Count - 1]}");

int soucet = 0;
foreach (int z in znamky)
    soucet += z;

Console.WriteLine($"Průměr: {(double)soucet / znamky.Count:F2}");
```
