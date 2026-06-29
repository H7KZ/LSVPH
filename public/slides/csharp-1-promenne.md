## Lekce 1: Proměnné a datové typy

- Struktura C# souboru
- Výstup na konzoli
- Datové typy — čísla, text, pravda/lež
- Proměnné a operátory
- Interpolace řetězců

---

## Co je C#

- Objektově orientovaný jazyk od Microsoftu (od roku 2000)
- Podobný Javě a jiným moderním jazykům
- Použití: hry (Unity), webové aplikace, desktopové aplikace
- **Silně typovaný** — každá proměnná má pevný typ

---

## Struktura souboru

```csharp
using System;           // importujeme knihovny

class Program           // třída (zatím ignoruj)
{
    static void Main()  // tady začíná program
    {
        // sem píšeme kód
    }
}
```

Notes:
Pro začátek stačí vědět: kód píšeme do Main(). `using System` je potřeba pro Console. Třídy a namespace vysvětlíme v lekci 6. Komentáře začínají // a kompilátor je ignoruje.

---

## Výstup na konzoli

```csharp
Console.WriteLine("Ahoj, světe!");  // vypíše text + odřádkuje
Console.Write("Bez odřádkování");   // vypíše, zůstane na řádku
```

- `Console.WriteLine` — nejpoužívanější, přidá nový řádek za textem
- `Console.Write` — hodí se pro výpis více hodnot na jeden řádek

---

## Datové typy

| Typ | Co ukládá | Příklad |
|-----|-----------|---------|
| `string` | text | `"Ahoj"` |
| `int` | celé číslo (32-bit) | `42` |
| `long` | velké celé číslo (64-bit) | `9999999999L` |
| `double` | desetinné číslo | `3.14` |
| `float` | desetinné (méně přesné) | `3.14f` |
| `bool` | pravda / lež | `true` |
| `char` | jeden znak | `'A'` |

Notes:
Pro hry nejčastěji: int, float, bool. decimal (přesnost na 28 číslic, suffix m) se používá pro peníze. float vs double: float je rychlejší ale méně přesný — Unity ho používá hodně. char se píše do jednoduchých uvozovek.

---

## Proměnné

```csharp
string jmeno = "Adam";
int vek = 15;
bool hrac = true;
double skore = 9.5;

// změna hodnoty
vek = 16;
jmeno = "Eva";
```

Proměnná = pojmenované místo v paměti. Typ se uvádí jednou při deklaraci.

---

## Aritmetické operátory

```csharp
int x = 10;

x += 5;   // x = 10 + 5 = 15
x -= 3;   // x = 15 - 3 = 12
x *= 2;   // x = 12 * 2 = 24
x /= 4;   // x = 24 / 4 =  6

x++;      // x = 6 + 1  =  7
x--;      // x = 7 - 1  =  6
```

Notes:
Pozor na celočíselné dělení: 7 / 2 = 3 (ne 3.5!). Pro desetinný výsledek: (double)x / y nebo použij double proměnné.

---

## Interpolace řetězců

```csharp
string jmeno = "Adam";
int vek = 15;

Console.WriteLine($"Jmenuji se {jmeno} a je mi {vek} let.");
// Vypíše: Jmenuji se Adam a je mi 15 let.
```

- Před uvozovkami musí být `$`
- Výraz v `{}` se automaticky převede na text

---

## Cvičení

Napiš program, který:

1. Uloží do proměnných své jméno, věk a oblíbenou hru
2. Vypíše: `Jmenuji se [jméno], je mi [věk] let a hraju [hra].`

Notes:
Řešení:
```csharp
string jmeno = "Adam";
int vek = 15;
string hra = "Minecraft";
Console.WriteLine($"Jmenuji se {jmeno}, je mi {vek} let a hraju {hra}.");
```
