## Lekce 3: Cykly

- while — opakuj, dokud platí podmínka
- do while — jednou proběhni, pak kontroluj
- for — pevný počet opakování
- foreach — procházení kolekcí
- Vnořené cykly
- break a continue
- Herní smyčka (game loop)

---

## while cyklus

```csharp
int zdravi = 100;

while (zdravi > 0)
{
    Console.WriteLine($"Zdraví: {zdravi}");
    zdravi -= 20;   // každý průchod ubere 20
}

Console.WriteLine("Hráč padl!");
// Vypíše: Zdraví: 100, 80, 60, 40, 20 — pak Hráč padl!
```

Cyklus se opakuje, dokud je podmínka `true`. Pokud podmínka nikdy není splněna, tělo se neprovede vůbec.

---

## do while cyklus

```csharp
string vstup;

do
{
    Console.Write("Zadej heslo: ");
    vstup = Console.ReadLine();
} while (vstup != "tajne");

Console.WriteLine("Správně!");
```

Tělo se provede **vždy alespoň jednou** — podmínka se kontroluje až po prvním průchodu.

Notes:
do while se hodí pro validaci vstupu — chcete zobrazit výzvu alespoň jednou a pak opakovat dokud uživatel nezadá správný
vstup.

---

## for cyklus

```csharp
for (int i = 0; i < 5; i++)
{
    Console.WriteLine($"Krok {i}");
}
// Vypíše: Krok 0, Krok 1, Krok 2, Krok 3, Krok 4
```

Tři části hlavičky: `inicializace; podmínka; krok`

- `int i = 0` — spustí se jednou před cyklem
- `i < 5` — kontroluje se před každým průchodem
- `i++` — spustí se po každém průchodu

Notes:
Proměnná `i` existuje jen uvnitř for cyklu. Hodí se, když víte kolikrát cyklus proběhne — pak je for přehlednější než
while.

---

## foreach cyklus

```csharp
string[] hry = { "Minecraft", "Fortnite", "CS2" };

foreach (string hra in hry)
{
    Console.WriteLine(hra);
}
```

- Prochází **všechny prvky** kolekce od začátku do konce
- Neznáš index — jen aktuální hodnotu
- Nelze měnit prvky kolekce uvnitř foreach

Funguje s polem, `List<T>` i dalšími kolekcemi.

---

## Vnořené cykly

```csharp
for (int radek = 1; radek <= 3; radek++)
{
    for (int sloupec = 1; sloupec <= 3; sloupec++)
    {
        Console.Write($"[{radek},{sloupec}] ");
    }
    Console.WriteLine();
}
```

Výstup:

```text
[1,1] [1,2] [1,3]
[2,1] [2,2] [2,3]
[3,1] [3,2] [3,3]
```

Notes:
Vnořené cykly se hodí pro práci s 2D mřížkou (herní mapa, šachovnice). Pokud má každý cyklus N kroků, celkem proběhne
N×N kroků — pozor na výkon!

---

## break a continue

```csharp
for (int i = 0; i < 10; i++)
{
    if (i == 3) continue;  // přeskočí číslo 3
    if (i == 7) break;     // zastaví cyklus na 7

    Console.WriteLine(i);
}
// Vypíše: 0, 1, 2, 4, 5, 6
```

- `break` — ukončí cyklus úplně
- `continue` — přeskočí zbytek aktuálního průchodu, pokračuje dalším

---

## Herní smyčka (game loop)

```csharp
bool bezici = true;

while (bezici)
{
    Console.WriteLine("=== Herní kolo ===");
    Console.Write("Akce (u = útok, o = obrana, k = konec): ");
    string akce = Console.ReadLine();

    if (akce == "k")
    {
        bezici = false;         // nebo: break;
        Console.WriteLine("Konec hry.");
    }
    else
    {
        Console.WriteLine($"Provedl jsi: {akce}");
    }
}
```

Notes:
Herní smyčka je základní vzor každé hry — nekonečná smyčka, která čte vstup, aktualizuje stav a vykresluje. Unity ji má
zabudovanou (metody Start a Update). while(true) s break je také validní vzor.

---

## Cvičení: Hádání čísla

Napiš program, který:

1. Zvolí tajné číslo (např. 42)
2. Opakovaně se ptá uživatele na tip
3. Napovídá „Víc!" / „Míň!" / „Správně!"
4. Po správném tipu vypíše, kolik pokusů bylo potřeba

Notes:
Řešení:

```csharp
int tajne = 42;
int pokusy = 0;
int tip;

do
{
    Console.Write("Hádej číslo (1–100): ");
    tip = int.Parse(Console.ReadLine());
    pokusy++;

    if (tip < tajne)      Console.WriteLine("Víc!");
    else if (tip > tajne) Console.WriteLine("Míň!");
} while (tip != tajne);

Console.WriteLine($"Správně! Potřeboval jsi {pokusy} pokusů.");
```
