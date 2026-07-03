## Lekce 5: Metody a funkce

- Proč metody? Znovupoužitelnost kódu
- Syntaxe: návratový typ, název, parametry
- void metody vs. metody s návratovou hodnotou
- Přetěžování metod (overloading)
- Výchozí hodnoty parametrů
- Scope — rozsah platnosti proměnných

---

## Proč metody?

```csharp
// BEZ metody — opakující se kód
Console.WriteLine("==========");
Console.WriteLine("  Výsledek");
Console.WriteLine("==========");

// ... o 50 řádků dál totéž znovu...
Console.WriteLine("==========");
Console.WriteLine("  Výsledek");
Console.WriteLine("==========");
```

Metoda = **pojmenovaný blok kódu**, který lze volat opakovaně.

---

## Syntaxe metody

```csharp
static void VypisCaru()
{
    Console.WriteLine("==========");
}

// volání:
VypisCaru();
VypisCaru();
```

- `static` — metoda patří třídě, ne objektu (zatím stačí)
- `void` — nic nevrací
- `VypisCaru` — název (**PascalCase**)
- `()` — parametry (zatím prázdné)

Notes:
Konvence pojmenování metod v C#: PascalCase (první písmeno velké). Metody dělají jednu věc — název by měl říkat co.
Špatně: DoStuff(). Dobře: VypoctiPrumer(), VypisHrace().

---

## Metoda s parametrem

```csharp
static void Pozdrav(string jmeno)
{
    Console.WriteLine($"Ahoj, {jmeno}!");
}

// volání:
Pozdrav("Adam");   // Ahoj, Adam!
Pozdrav("Eva");    // Ahoj, Eva!
```

Parametr `jmeno` je **lokální proměnná** — existuje jen uvnitř metody.

---

## Metoda s návratovou hodnotou

```csharp
static int Soucet(int a, int b)
{
    return a + b;
}

// volání:
int vysledek = Soucet(3, 7);
Console.WriteLine(vysledek);   // 10
Console.WriteLine(Soucet(5, 5) * 2);   // 20
```

- Návratový typ nahradí `void`
- `return` předá hodnotu volajícímu a **ukončí metodu**

---

## Více parametrů

```csharp
static double Prumer(double a, double b, double c)
{
    return (a + b + c) / 3.0;
}

static bool JeVyherniSkore(int skore, int minimum)
{
    return skore >= minimum;
}

Console.WriteLine(Prumer(1, 4, 7));         // 4
Console.WriteLine(JeVyherniSkore(85, 70));  // True
```

Parametry jsou odděleny čárkami, každý má svůj typ.

---

## Přetěžování metod (overloading)

```csharp
static int Soucet(int a, int b)
{
    return a + b;
}

static double Soucet(double a, double b)
{
    return a + b;
}

static int Soucet(int a, int b, int c)
{
    return a + b + c;
}

Console.WriteLine(Soucet(3, 7));        // int verze
Console.WriteLine(Soucet(3.5, 2.1));   // double verze
Console.WriteLine(Soucet(1, 2, 3));    // tří-parametrová verze
```

Stejný název, různé parametry — kompilátor pozná, kterou zavolat.

Notes:
Přetěžování je běžné v C# — například Console.WriteLine funguje pro string, int, double, bool atd. Všechny jsou různé
verze stejné metody.

---

## Výchozí hodnoty parametrů

```csharp
static void VypisCaru(int delka = 10, char znak = '=')
{
    Console.WriteLine(new string(znak, delka));
}

// volání:
VypisCaru();           // ==========  (10 znaků =)
VypisCaru(5);          // =====
VypisCaru(8, '-');     // --------
```

Parametry s výchozí hodnotou jsou **volitelné** — musí být vždy na konci.

---

## Scope — rozsah platnosti proměnných

```csharp
int x = 10;                    // dostupné celou metodou

if (x > 5)
{
    int y = 20;                // dostupné jen uvnitř if bloku
    Console.WriteLine(x + y); // 30 ✓
}

// Console.WriteLine(y);      // CHYBA — y zde neexistuje
```

Proměnná existuje od deklarace do konce `{}` bloku, ve kterém byla deklarována.

Notes:
Scope platí i pro for cyklus: proměnná `i` z `for (int i = 0; ...)` existuje jen uvnitř cyklu. Metody mají vlastní
scope — metoda nevidí proměnné jiné metody.

---

## Cvičení: Zarovnaný výpis

Napiš metodu `VypisProdukty(string nazev, double cena)`, která vypíše:

```text
Minecraft          249.00 Kč
Fortnite             0.00 Kč
Counter-Strike 2   399.00 Kč
```

Tak, aby název byl vždy 20 znaků a cena 10 znaků (použij `PadRight` / `PadLeft`).

Pak napiš přetíženou verzi s parametrem `mena = "Kč"`.

Notes:
Řešení:

```csharp
static void VypisProdukty(string nazev, double cena, string mena = "Kč")
{
    Console.WriteLine($"{nazev.PadRight(20)}{cena.ToString("F2").PadLeft(10)} {mena}");
}

VypisProdukty("Minecraft", 249);
VypisProdukty("Fortnite", 0);
VypisProdukty("Counter-Strike 2", 399);
VypisProdukty("Minecraft", 10.99, "USD");
```

string.PadRight(n) doplní mezerami zprava na n znaků. PadLeft(n) zarovná zleva.
