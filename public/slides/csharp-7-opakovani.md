## Lekce 7: Opakování a cvičení

Co jsme za týden prošli:

- Proměnné, typy, podmínky, cykly
- Pole, List, metody
- Třídy a základy OOP

Dnes: praktická cvičení, která to spojují dohromady.

---

## Cvičení 1: Nákupní košík

Vytvoř třídu `Produkt` s vlastnostmi `Nazev` (string) a `Cena` (double).

Pak:
1. Vytvoř `List<Produkt>` se třemi produkty
2. Vypiš všechny produkty (jméno + cena)
3. Vypočítej a vypiš průměrnou cenu

Notes:
Řešení:
```csharp
class Produkt
{
    public string Nazev;
    public double Cena;
    public Produkt(string nazev, double cena) { Nazev = nazev; Cena = cena; }
}

List<Produkt> kosik = new List<Produkt>
{
    new Produkt("Minecraft", 649),
    new Produkt("Fortnite", 0),
    new Produkt("CS2", 399)
};

double soucet = 0;
foreach (Produkt p in kosik)
{
    Console.WriteLine($"{p.Nazev}: {p.Cena} Kč");
    soucet += p.Cena;
}
Console.WriteLine($"Průměr: {soucet / kosik.Count:F2} Kč");
```

---

## Cvičení 2: Nejcennější drahokam

Vytvoř třídu `Drahokam` s vlastnostmi:
- `Nazev` (string)
- `Hmotnost` (double, v gramech)
- `CenaZaGram` (double)
- `Cistota` (double, 0.0 – 1.0)

Přidej metodu `Hodnota()` → `Hmotnost * CenaZaGram * Cistota`.

Najdi a vypiš drahokam s nejvyšší hodnotou z `List<Drahokam>`.

Notes:
Řešení:
```csharp
class Drahokam
{
    public string Nazev;
    public double Hmotnost;
    public double CenaZaGram;
    public double Cistota;

    public Drahokam(string nazev, double hmotnost, double cenaZaGram, double cistota)
    {
        Nazev = nazev; Hmotnost = hmotnost;
        CenaZaGram = cenaZaGram; Cistota = cistota;
    }

    public double Hodnota() => Hmotnost * CenaZaGram * Cistota;
}

List<Drahokam> kameny = new List<Drahokam>
{
    new Drahokam("Rubín",    5.0, 300, 0.9),
    new Drahokam("Smaragd",  8.0, 250, 0.7),
    new Drahokam("Diamant",  3.0, 800, 0.95)
};

Drahokam nejlepsi = kameny[0];
foreach (Drahokam d in kameny)
    if (d.Hodnota() > nejlepsi.Hodnota())
        nejlepsi = d;

Console.WriteLine($"Nejcennější: {nejlepsi.Nazev} ({nejlepsi.Hodnota():F0} Kč)");
```

---

## Co dál?

- **Unity** — C# v praxi: GameObjects, fyzika, scripting
- **Algoritmy** — řazení, vyhledávání, rekurze
- **Pokročilé OOP** — dědičnost, rozhraní, zapouzdření
- **LINQ** — elegantní práce s kolekcemi (`.Where()`, `.Select()`, `.Sum()`)

Notes:
Povzbudit studenty — za týden se naučili základy, které se používají v reálném vývoji. Unity bude navazovat přesně na třídy a metody, které probírali.

---

## Skvělá práce!

Za týden jste prošli od `Console.WriteLine("Ahoj")` po objekty a kolekce.

To je základ, na kterém stojí každá hra.

Notes:
Závěrečné povzbuzení. Zmínit, kde mohou pokračovat sami: learn.microsoft.com/cs-cz/dotnet/csharp/, Brackeys na YouTube (anglicky).
