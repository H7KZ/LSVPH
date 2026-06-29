## Lekce 3: Cykly

- while — opakuj, dokud platí podmínka
- do while — jednou proběhni, pak kontroluj
- for — pevný počet opakování
- Vnořené cykly
- break a continue

---

## while cyklus

```csharp
int i = 0;

while (i < 5)
{
    Console.WriteLine($"Krok {i}");
    i++;
}
// Vypíše: Krok 0, Krok 1, Krok 2, Krok 3, Krok 4
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
do while se hodí pro validaci vstupu — chcete zobrazit výzvu alespoň jednou a pak opakovat dokud uživatel nezadá správný vstup.

---

## for cyklus

```csharp
for (int i = 0; i < 5; i++)
{
    Console.WriteLine($"Krok {i}");
}
```

Tři části: `inicializace; podmínka; krok`

- Hodí se, když víte kolikrát cyklus proběhne
- `i` existuje jen uvnitř cyklu

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
```
[1,1] [1,2] [1,3]
[2,1] [2,2] [2,3]
[3,1] [3,2] [3,3]
```

Notes:
Vnořené cykly se hodí pro práci s 2D mřížkou (herní mapa, šachovnice). Pozor: pokud má každý cyklus N kroků, celkem proběhne N×N kroků.

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

## Cvičení: Hádání čísla

Napiš program, který:

1. Zvolí tajné číslo (např. 42)
2. Opakovaně se ptá uživatele na tip
3. Napovídá „Víc" / „Míň" / „Správně!" a ukončí hru

Notes:
Řešení:
```csharp
int tajne = 42;
int tip;

do
{
    Console.Write("Hádej číslo (1–100): ");
    tip = int.Parse(Console.ReadLine());

    if (tip < tajne) Console.WriteLine("Víc!");
    else if (tip > tajne) Console.WriteLine("Míň!");
} while (tip != tajne);

Console.WriteLine("Správně!");
```
