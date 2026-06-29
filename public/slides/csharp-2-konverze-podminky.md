## Lekce 2: Konverze a podmínky

- Čtení vstupu od uživatele
- Převod typů (string → int a zpět)
- Podmínky: if / else if / else
- Přepínač: switch

---

## Vstup od uživatele

```csharp
Console.Write("Zadej své jméno: ");
string jmeno = Console.ReadLine();

Console.WriteLine($"Ahoj, {jmeno}!");
```

- `Console.ReadLine()` vždy vrátí `string`
- Pro čísla je potřeba převod

---

## Převod typů

```csharp
string vstup = Console.ReadLine();

int cislo   = int.Parse(vstup);          // selže, pokud vstup není číslo
int cislo2  = Convert.ToInt32(vstup);    // totéž, jiný zápis
string text = cislo.ToString();          // int → string
```

Notes:
int.Parse vs Convert.ToInt32: chování při null se liší (Convert vrátí 0, Parse hodí výjimku). Pro jednoduchost používejte int.Parse nebo TryParse.

---

## Bezpečný převod: TryParse

```csharp
Console.Write("Zadej číslo: ");
string vstup = Console.ReadLine();

if (int.TryParse(vstup, out int cislo))
{
    Console.WriteLine($"Zadal jsi číslo {cislo}.");
}
else
{
    Console.WriteLine("To není číslo!");
}
```

`TryParse` nehodí výjimku — vrátí `true`/`false` a výsledek uloží do `out` proměnné.

---

## Podmínka if / else

```csharp
int vek = 15;

if (vek >= 18)
{
    Console.WriteLine("Dospělý");
}
else if (vek >= 15)
{
    Console.WriteLine("Teenager");
}
else
{
    Console.WriteLine("Dítě");
}
```

Notes:
Podmínka musí být bool výraz (true/false). Složené závorky {} jsou technicky volitelné pro jednořádkové bloky, ale VŽDY je pište — předejdete chybám.

---

## Porovnávací operátory

| Operátor | Význam |
|----------|--------|
| `==` | rovná se |
| `!=` | nerovná se |
| `<` | menší než |
| `<=` | menší nebo rovno |
| `>` | větší než |
| `>=` | větší nebo rovno |

```csharp
bool vyhra = skore >= 100 && zivoty > 0;
```

---

## Switch statement

```csharp
string operace = "+";

switch (operace)
{
    case "+":
        Console.WriteLine(a + b);
        break;
    case "-":
        Console.WriteLine(a - b);
        break;
    default:
        Console.WriteLine("Neznámá operace");
        break;
}
```

`break` ukončí aktuální case — bez něj by program propadl do dalšího case.

Notes:
Switch je přehlednější než dlouhý if/else if, ale funguje jen pro rovnost (==). Pro složitější podmínky používejte if.

---

## Cvičení: Kalkulačka

Napiš program, který:

1. Načte dvě celá čísla od uživatele
2. Zeptá se na operaci: `+`, `-`, `*`, `/`
3. Vypíše výsledek (použij switch)

Notes:
Řešení:
```csharp
Console.Write("První číslo: ");
int a = int.Parse(Console.ReadLine());
Console.Write("Druhé číslo: ");
int b = int.Parse(Console.ReadLine());
Console.Write("Operace (+, -, *, /): ");
string op = Console.ReadLine();

switch (op)
{
    case "+": Console.WriteLine(a + b); break;
    case "-": Console.WriteLine(a - b); break;
    case "*": Console.WriteLine(a * b); break;
    case "/":
        if (b != 0) Console.WriteLine(a / b);
        else Console.WriteLine("Dělení nulou!");
        break;
    default: Console.WriteLine("Neznámá operace"); break;
}
```
