## Lekce 6: Třídy a OOP

- Co je třída a objekt
- Vytvoření objektu pomocí `new`
- Konstruktor
- Vlastnosti a metody třídy
- `static` vs. instanční člen

---

## Co je třída?

Třída = **šablona** (blueprint) pro vytváření objektů.

```csharp
class Hrac
{
    public string Jmeno;
    public int Zdravi = 100;
}
```

Třída popisuje **co objekt má** (vlastnosti) a **co umí** (metody).

---

## Vytvoření objektu

```csharp
Hrac h1 = new Hrac();
h1.Jmeno = "Adam";
h1.Zdravi = 80;

Hrac h2 = new Hrac();
h2.Jmeno = "Eva";

Console.WriteLine(h1.Jmeno);   // Adam
Console.WriteLine(h2.Jmeno);   // Eva
```

`h1` a `h2` jsou dva **nezávislé** objekty vytvořené ze stejné šablony.

---

## Konstruktor

```csharp
class Hrac
{
    public string Jmeno;
    public int Zdravi;

    public Hrac(string jmeno, int zdravi)
    {
        Jmeno = jmeno;
        Zdravi = zdravi;
    }
}

// vytvoření:
Hrac h = new Hrac("Adam", 100);
```

Konstruktor se zavolá automaticky při `new`. Má stejný název jako třída, žádný návratový typ.

Notes:
Pokud konstruktor nedefinujete, C# vytvoří prázdný automaticky. Jakmile vlastní konstruktor definujete, prázdný přestane existovat (pokud ho nenapíšete také).

---

## Metody třídy

```csharp
class Hrac
{
    public string Jmeno;
    public int Zdravi = 100;

    public void VezmiZasah(int poskozeni)
    {
        Zdravi -= poskozeni;
        Console.WriteLine($"{Jmeno} má {Zdravi} HP.");
    }
}

Hrac h = new Hrac();
h.Jmeno = "Adam";
h.VezmiZasah(30);   // Adam má 70 HP.
```

---

## static vs. instance

```csharp
class MathHelper
{
    public static double Pi = 3.14159;       // patří třídě

    public int Hodnota;                       // patří objektu
    public void Vypis() { ... }               // patří objektu
}

// použití:
Console.WriteLine(MathHelper.Pi);            // přes název třídy
MathHelper m = new MathHelper();
m.Hodnota = 5;                               // přes instanci
```

Notes:
static = sdílené pro všechny objekty, přistupujeme přes název třídy. Instance člen = každý objekt má vlastní kopii.

---

## Příklad: třída Clovek

```csharp
class Clovek
{
    public string Jmeno;
    public int Vek;

    public Clovek(string jmeno, int vek)
    {
        Jmeno = jmeno;
        Vek = vek;
    }

    public void Predstav()
    {
        Console.WriteLine($"Jsem {Jmeno}, je mi {Vek} let.");
    }
}

Clovek c = new Clovek("Adam", 15);
c.Predstav();
```

---

## Cvičení

Vytvoř třídu `Auto` s vlastnostmi `Znacka` (string) a `Rychlost` (int). Přidej metodu `Zrychleni(int o)`, která zvýší rychlost a vypíše aktuální hodnotu. Vytvoř dvě auta a zrychluj je.

Notes:
Řešení:
```csharp
class Auto
{
    public string Znacka;
    public int Rychlost = 0;

    public Auto(string znacka) { Znacka = znacka; }

    public void Zrychleni(int o)
    {
        Rychlost += o;
        Console.WriteLine($"{Znacka}: {Rychlost} km/h");
    }
}

Auto a1 = new Auto("Škoda");
Auto a2 = new Auto("BMW");
a1.Zrychleni(30);
a2.Zrychleni(50);
a1.Zrychleni(20);
```
