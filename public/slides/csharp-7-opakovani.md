## Lekce 7: Opakování a cvičení

Co jsme za týden prošli:

- Proměnné, typy, operátory, Math
- Podmínky, switch, ternární operátor
- Cykly: while, for, foreach
- Pole, List a jejich metody
- Metody, přetěžování, výchozí parametry
- Třídy, konstruktory, properties, zapouzdření

Dnes: praktická cvičení, která to spojují dohromady.

---

## Cvičení 1: Nákupní košík

Vytvoř třídu `Produkt` s vlastnostmi `Nazev` (string) a `Cena` (double).
Přepiš `ToString()`.

Pak:
1. Vytvoř `List<Produkt>` se třemi produkty
2. Seřaď produkty podle ceny a vypiš je
3. Vypočítej a vypiš průměrnou cenu

Notes:
Řešení:
```csharp
class Produkt
{
    public string Nazev { get; }
    public double Cena { get; }

    public Produkt(string nazev, double cena) { Nazev = nazev; Cena = cena; }

    public override string ToString() => $"{Nazev.PadRight(20)} {Cena,8:F2} Kč";
}

List<Produkt> kosik = new List<Produkt>
{
    new Produkt("Minecraft", 649),
    new Produkt("Fortnite", 0),
    new Produkt("CS2", 399)
};

// řazení podle ceny
kosik.Sort((a, b) => a.Cena.CompareTo(b.Cena));

double soucet = 0;
foreach (Produkt p in kosik)
{
    Console.WriteLine(p);
    soucet += p.Cena;
}
Console.WriteLine($"\nPrůměr: {soucet / kosik.Count:F2} Kč");
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
    public string Nazev { get; }
    public double Hmotnost { get; }
    public double CenaZaGram { get; }
    public double Cistota { get; }

    public Drahokam(string nazev, double hmotnost, double cenaZaGram, double cistota)
    {
        Nazev = nazev; Hmotnost = hmotnost;
        CenaZaGram = cenaZaGram; Cistota = cistota;
    }

    public double Hodnota() => Hmotnost * CenaZaGram * Cistota;

    public override string ToString() =>
        $"{Nazev}: {Hodnota():F0} Kč (čistota {Cistota:P0})";
}

List<Drahokam> kameny = new List<Drahokam>
{
    new Drahokam("Rubín",    5.0, 300, 0.9),
    new Drahokam("Smaragd",  8.0, 250, 0.7),
    new Drahokam("Diamant",  3.0, 800, 0.95)
};

Drahokam nejlepsi = kameny[0];
foreach (Drahokam d in kameny)
{
    Console.WriteLine(d);
    if (d.Hodnota() > nejlepsi.Hodnota())
        nejlepsi = d;
}

Console.WriteLine($"\nNejcennější: {nejlepsi.Nazev} ({nejlepsi.Hodnota():F0} Kč)");
```

---

## Cvičení 3: Textová RPG souboj

Vytvoř třídu `Postava` s:
- `Jmeno`, `Zdravi` (private setter, min 0), `Utok`
- Metoda `Utoc(Postava cil)` — odebere `Utok` HP cíli, vypíše co se stalo
- `JeZiva()` → `Zdravi > 0`
- `ToString()` → `"Adam (75/100 HP)"`

Piš souboj: dvě postavy se střídavě útočí, dokud jedna nepadne.

Notes:
Řešení:
```csharp
class Postava
{
    public string Jmeno { get; }
    public int Zdravi { get; private set; }
    public int MaxZdravi { get; }
    public int Utok { get; }

    public Postava(string jmeno, int zdravi, int utok)
    {
        Jmeno = jmeno;
        MaxZdravi = zdravi;
        Zdravi = zdravi;
        Utok = utok;
    }

    public void Utoc(Postava cil)
    {
        cil.Zdravi = Math.Max(cil.Zdravi - Utok, 0);
        Console.WriteLine($"{Jmeno} útočí na {cil.Jmeno} za {Utok} poškození → {cil}");
    }

    public bool JeZiva() => Zdravi > 0;

    public override string ToString() => $"{Jmeno} ({Zdravi}/{MaxZdravi} HP)";
}

Postava hrac = new Postava("Hrdina", 100, 25);
Postava boss  = new Postava("Drak",  150, 18);

Console.WriteLine($"=== SOUBOJ: {hrac.Jmeno} vs {boss.Jmeno} ===\n");

int kolo = 1;
while (hrac.JeZiva() && boss.JeZiva())
{
    Console.WriteLine($"--- Kolo {kolo++} ---");
    hrac.Utoc(boss);
    if (boss.JeZiva())
        boss.Utoc(hrac);
}

Console.WriteLine();
Console.WriteLine(hrac.JeZiva() ? $"{hrac.Jmeno} vyhrál!" : $"{boss.Jmeno} vyhrál!");
```

---

## Co dál?

- **Unity** — C# v praxi: GameObjects, komponenty, fyzika, scripting
- **Dědičnost** — třída `Kouzelnik : Hrac` zdědí vše od rodiče
- **Rozhraní (interface)** — smlouva: co musí třída umět
- **LINQ** — elegantní práce s kolekcemi (`.Where()`, `.Select()`, `.Sum()`)
- **Generika** — vlastní `List<T>` a další generické struktury

---

## Skvělá práce!

Za týden jste prošli od `Console.WriteLine("Ahoj")` po třídy, properties a celé hry.

To je základ, na kterém stojí **každá hra v Unity**.

Notes:
Závěrečné povzbuzení. Zmínit, kde mohou pokračovat sami: learn.microsoft.com/cs-cz/dotnet/csharp/ pro dokumentaci, Brackeys na YouTube pro Unity tutoriály (anglicky). Zdůraznit, že třídy Hrac a Postava z dnešního cvičení jsou přesně to, co budou psát v Unity.
