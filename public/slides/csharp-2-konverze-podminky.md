## Lekce 2: Konverze a podmínky

- Čtení vstupu od uživatele
- Převod typů (string → int a zpět)
- Logické operátory: `&&`, `||`, `!`
- Podmínky: if / else if / else
- Ternární operátor `?:`
- Přepínač: switch a switch expression

---

## Vstup od uživatele

```csharp
Console.Write("Zadej své jméno: ");
string jmeno = Console.ReadLine();

Console.WriteLine($"Ahoj, {jmeno}!");
```

- `Console.ReadLine()` vždy vrátí `string`
- Program **počká**, dokud uživatel nestiskne Enter
- Pro čísla je potřeba převod

---

## Převod typů

```csharp
string vstup = Console.ReadLine();

int cislo   = int.Parse(vstup);          // selže, pokud vstup není číslo
int cislo2  = Convert.ToInt32(vstup);    // totéž, jiný zápis
double d    = double.Parse(vstup);       // pro desetinná čísla
string text = cislo.ToString();          // int → string
```

Notes:
int.Parse vs Convert.ToInt32: chování při null se liší (Convert vrátí 0, Parse hodí výjimku). Pro jednoduchost používejte int.Parse nebo TryParse. Desetinná čísla: pozor na desetinnou čárku vs tečku — záleží na nastavení systému.

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

## Logické operátory

| Operátor | Název | Příklad | Výsledek |
|----------|-------|---------|----------|
| `&&` | A zároveň | `vek >= 13 && vek <= 19` | true, jen pokud obě platí |
| `\|\|` | Nebo | `vek < 5 \|\| vek > 65` | true, pokud aspoň jedna platí |
| `!` | Negace | `!jeHrac` | obrátí true/false |

```csharp
bool vyhra = zdravi > 0 && skore >= 100;
bool konec = zdravi <= 0 || cas <= 0;
bool nizkeZdravi = !(zdravi > 30);   // stejné jako zdravi <= 30
```

Notes:
Zkrácené vyhodnocování (short-circuit): u && — pokud první podmínka je false, druhá se vůbec nevyhodnotí. U || — pokud první je true, druhá se přeskočí.

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
// Pozor — = je přiřazení, == je porovnání!
int x = 5;          // přiřazení
bool b = (x == 5);  // porovnání → true
```

---

## Podmínka if / else

```csharp
int zdravi = 40;

if (zdravi > 70)
{
    Console.WriteLine("Zdraví v pořádku");
}
else if (zdravi > 30)
{
    Console.WriteLine("Pozor — nízké zdraví!");
}
else
{
    Console.WriteLine("Kritický stav!");
}
```

Notes:
Podmínka musí být bool výraz (true/false). Složené závorky {} jsou technicky volitelné pro jednořádkové bloky, ale VŽDY je pište — předejdete chybám.

---

## Ternární operátor `?:`

```csharp
// Klasický if:
string zprava;
if (zdravi > 0)
    zprava = "Naživu";
else
    zprava = "Mrtev";

// Totéž na jeden řádek:
string zprava = zdravi > 0 ? "Naživu" : "Mrtev";
```

`podmínka ? hodnota_pokud_true : hodnota_pokud_false`

Hodí se pro krátká rozhodnutí — kód je čitelnější.

---

## Switch statement

```csharp
string operace = "+";
int a = 10, b = 5;

switch (operace)
{
    case "+":
        Console.WriteLine(a + b);
        break;
    case "-":
        Console.WriteLine(a - b);
        break;
    case "*":
        Console.WriteLine(a * b);
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

## Switch expression (moderní C#)

```csharp
string operace = "+";
int a = 10, b = 5;

int vysledek = operace switch
{
    "+" => a + b,
    "-" => a - b,
    "*" => a * b,
    "/" => a / b,
    _   => 0    // _ = default
};

Console.WriteLine(vysledek);
```

Kratší zápis — výsledek se rovnou přiřadí. `_` zastupuje `default`.

---

## Cvičení: Kalkulačka

Napiš program, který:

1. Načte dvě celá čísla od uživatele
2. Zeptá se na operaci: `+`, `-`, `*`, `/`
3. Vypíše výsledek (ošetři dělení nulou!)
4. Pro `/` ověř, že druhé číslo není 0

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
