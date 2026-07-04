## Lekce 1: Proměnné a datové typy

Letní škola vývoje her 2026 · Matyáš

- Struktura C# souboru
- Výstup na konzoli
- Datové typy — čísla, text, pravda/lež
- Proměnné, operátory a `var`
- Konstanty
- Modulo a třída Math
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

class Program           // třída (vysvětlíme v lekci 6)
{
    static void Main()  // tady začíná program
    {
        // sem píšeme kód
    }
}
```

Notes:
Pro začátek stačí vědět: kód píšeme do Main(). `using System` je potřeba pro Console. Třídy a namespace vysvětlíme v
lekci 6. Komentáře začínají // a kompilátor je ignoruje.

---

## Výstup na konzoli

```csharp
Console.WriteLine("Ahoj, světe!");  // vypíše text + odřádkuje
Console.Write("Bez odřádkování");   // vypíše, zůstane na řádku
Console.WriteLine();                 // jen prázdný řádek
```

- `Console.WriteLine` — nejpoužívanější, přidá nový řádek za textem
- `Console.Write` — hodí se pro výpis více hodnot na jeden řádek

---

## Datové typy

| Typ      | Co ukládá                 | Příklad       |
| -------- | ------------------------- | ------------- |
| `string` | text                      | `"Ahoj"`      |
| `int`    | celé číslo (32-bit)       | `42`          |
| `long`   | velké celé číslo (64-bit) | `9999999999L` |
| `double` | desetinné číslo           | `3.14`        |
| `float`  | desetinné (méně přesné)   | `3.14f`       |
| `bool`   | pravda / lež              | `true`        |
| `char`   | jeden znak                | `'A'`         |

Notes:
Pro hry nejčastěji: int, float, bool. float vs double: float je rychlejší ale méně přesný — Unity ho používá hodně. char
se píše do jednoduchých uvozovek. decimal (suffix m) se používá pro peníze (28 číslic přesnosti).

---

## Proměnné

```csharp
string jmeno = "Adam";
int vek = 15;
bool jeHrac = true;
double skore = 9.5;

// změna hodnoty
vek = 16;
jmeno = "Eva";
```

Proměnná = **pojmenované místo v paměti**. Typ se uvádí jednou při deklaraci.

---

## var — automatické odvození typu

```csharp
var jmeno = "Adam";   // kompilátor ví: string
var vek   = 15;       // kompilátor ví: int
var pi    = 3.14;     // kompilátor ví: double

// typ se stále nedá změnit!
// vek = "patnáct";  // CHYBA
```

`var` je zkratka — typ se odvodí z pravé strany. Kód je kratší, typ stále existuje.

Notes:
var je užitečný pro komplexní typy kde opakování typového jména by bylo zdlouhavé. Pro jednoduché typy (int, string) je
přehlednější psát typ explicitně. Typ proměnné se nemění — C# není dynamický jazyk.

---

## const — konstanty

```csharp
const int MaxZdravi   = 100;
const double GravitacePi = 9.81;
const string HerniNazev  = "SuperHra";

// MaxZdravi = 50;   // CHYBA — nelze měnit
```

Konstanta = hodnota, která se **nikdy nemění**. Kompilátor zaručí, že ji nikdo nezmění omylem.

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

## Modulo (zbytek po dělení)

```csharp
int zbytek = 10 % 3;   // 1  (10 = 3*3 + 1)
int zbytek2 = 7 % 2;   // 1  (7 je liché)
int zbytek3 = 8 % 2;   // 0  (8 je sudé)
```

Jak poznat sudé číslo:

```csharp
if (cislo % 2 == 0)
    Console.WriteLine("Sudé");
else
    Console.WriteLine("Liché");
```

Notes:
Modulo je v hrách hodně užitečné — třeba pro pohyb po mřížce nebo pro střídání hráčů (hrac % 2 == 0 → hráč 1, jinak hráč
2).

---

## Třída Math

```csharp
Math.Abs(-5)       // 5       — absolutní hodnota
Math.Max(3, 7)     // 7       — větší ze dvou čísel
Math.Min(3, 7)     // 3       — menší ze dvou čísel
Math.Pow(2, 8)     // 256.0   — mocnina
Math.Sqrt(16)      // 4.0     — odmocnina
Math.Round(3.7)    // 4       — zaokrouhlení
Math.PI            // 3.14159... — konstanta
```

Notes:
Math.Abs se hodí pro výpočet vzdálenosti (bez záporných hodnot). Math.Clamp(value, min, max) omezí hodnotu do rozsahu —
super pro zdraví hráče.

---

## Interpolace řetězců

```csharp
string jmeno = "Adam";
int vek = 15;
double skore = 9523.5;

Console.WriteLine($"Jmenuji se {jmeno} a je mi {vek} let.");
Console.WriteLine($"Skóre: {skore:F2}");   // 2 desetinná místa
Console.WriteLine($"Skóre: {skore:N0}");   // oddělovač tisíců
// Vypíše: Skóre: 9 523
```

- Před uvozovkami musí být `$`
- Do `{}` lze psát libovolný výraz
- `:F2`, `:N0` jsou formátovací vzory

---

## Cvičení

Napiš program, který:

1. Uloží do proměnných své jméno, věk a oblíbenou hru
2. Vypíše: `Jmenuji se [jméno], je mi [věk] let a hraju [hra].`
3. Vypočítá, kolik ti bude za 10 let a vypíše to
4. Zjistí, jestli je tvůj věk sudý nebo lichý

Notes:
Řešení:

```csharp
string jmeno = "Adam";
int vek = 15;
string hra = "Minecraft";

Console.WriteLine($"Jmenuji se {jmeno}, je mi {vek} let a hraju {hra}.");
Console.WriteLine($"Za 10 let mi bude {vek + 10} let.");

if (vek % 2 == 0)
    Console.WriteLine("Věk je sudý.");
else
    Console.WriteLine("Věk je lichý.");
```
