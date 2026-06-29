## Lekce 5: Metody a funkce

- Proč metody? Znovupoužitelnost kódu
- Syntaxe: návratový typ, název, parametry
- void metody vs. metody s návratovou hodnotou
- Více parametrů

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

Metoda = pojmenovaný blok kódu, který lze volat opakovaně.

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

- `static` — metoda patří třídě, ne objektu (teď to stačí)
- `void` — nic nevrací
- `VypisCaru` — název (PascalCase)
- `()` — parametry (zatím prázdné)

Notes:
Konvence pojmenování metod v C#: PascalCase (první písmeno velké). Metody dělají jednu věc — název by měl říkat co.

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

Parametr `jmeno` je lokální proměnná — existuje jen uvnitř metody.

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
```

- Návratový typ nahradí `void`
- `return` předá hodnotu volajícímu a ukončí metodu

---

## Více parametrů

```csharp
static double Prumer(double a, double b, double c)
{
    return (a + b + c) / 3.0;
}

Console.WriteLine(Prumer(1, 4, 7));   // 4
```

Parametry jsou odděleny čárkami, každý má svůj typ.

---

## Cvičení: Zarovnaný výpis

Napiš metodu `VypisProdukty(string nazev, double cena)`, která vypíše:

```text
Minecraft          249.00 Kč
Fortnite             0.00 Kč
```

Tak, aby název byl vždy 20 znaků a cena 10 znaků (použij `PadRight` / `PadLeft`).

Notes:
Řešení:
```csharp
static void VypisProdukty(string nazev, double cena)
{
    Console.WriteLine($"{nazev.PadRight(20)}{cena.ToString("F2").PadLeft(10)} Kč");
}

VypisProdukty("Minecraft", 249);
VypisProdukty("Fortnite", 0);
```
string.PadRight(n) doplní mezerami zprava na n znaků. PadLeft(n) zarovná zleva.
