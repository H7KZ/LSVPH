## Lekce 6: Třídy a OOP

Letní škola vývoje her 2026 · Matyáš

- Co je třída a objekt
- Vytvoření objektu pomocí `new`
- Konstruktor
- `private` a zapouzdření
- Vlastnosti (Properties) — get a set
- Metody třídy a `this`
- `static` vs. instanční člen
- Přepsání `ToString()`

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

Třída popisuje **co objekt má** (pole/vlastnosti) a **co umí** (metody).

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

    public Hrac(string jmeno, int zdravi = 100)
    {
        Jmeno = jmeno;
        Zdravi = zdravi;
    }
}

Hrac h1 = new Hrac("Adam");       // Zdravi = 100
Hrac h2 = new Hrac("Eva", 80);    // Zdravi = 80
```

Konstruktor se zavolá automaticky při `new`. Má stejný název jako třída, žádný návratový typ.

Notes:
Pokud konstruktor nedefinujete, C# vytvoří prázdný automaticky. Jakmile vlastní konstruktor definujete, prázdný přestane
existovat (pokud ho nenapíšete také).

---

## private — zapouzdření

```csharp
class Hrac
{
    private int zdravi = 100;   // přístupné jen uvnitř třídy

    public void VezmiZasah(int poskozeni)
    {
        zdravi -= poskozeni;
        if (zdravi < 0) zdravi = 0;   // nikdy záporné!
    }

    public bool JeZivy()
    {
        return zdravi > 0;
    }
}
```

`private` = nikdo zvenčí nemůže změnit `zdravi` na -999. Třída **chrání svá data**.

Notes:
Zapouzdření (encapsulation) je jeden ze základů OOP. Skrýváme implementaci a vystavujeme jen to, co je potřeba. public =
dostupné odkudkoli. private = jen uvnitř třídy.

---

## Vlastnosti (Properties)

```csharp
class Hrac
{
    private int zdravi = 100;

    public int Zdravi
    {
        get { return zdravi; }
        set
        {
            if (value >= 0) zdravi = value;   // validace při nastavení
        }
    }
}

Hrac h = new Hrac();
Console.WriteLine(h.Zdravi);   // 100 (get)
h.Zdravi = 80;                 // (set)
h.Zdravi = -50;                // ignoruje se — je < 0
Console.WriteLine(h.Zdravi);   // 80
```

Notes:
Properties jsou v C# preferovaný způsob přístupu k datům třídy. Vypadají jako pole, ale mají logiku. Auto-property:
`public int Zdravi { get; set; }` — pokud validaci nepotřebujete.

---

## Auto-vlastnosti

```csharp
class Hrac
{
    public string Jmeno { get; set; }    // čtení i zápis
    public int Level { get; private set; }  // zápis jen uvnitř třídy

    public Hrac(string jmeno)
    {
        Jmeno = jmeno;
        Level = 1;
    }

    public void LevelUp()
    {
        Level++;
    }
}
```

Kratší zápis pro properties bez vlastní logiky.

---

## Klíčové slovo `this`

```csharp
class Hrac
{
    public string Jmeno;
    public int Zdravi;

    public Hrac(string Jmeno, int Zdravi)
    {
        this.Jmeno = Jmeno;   // this.Jmeno = pole objektu
        this.Zdravi = Zdravi; // Jmeno = parametr konstruktoru
    }
}
```

`this` odkazuje na **aktuální objekt**. Hodí se, když má parametr stejný název jako pole.

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
        if (Zdravi < 0) Zdravi = 0;
        Console.WriteLine($"{Jmeno} má {Zdravi} HP.");
    }

    public bool JeZivy() => Zdravi > 0;
}

Hrac h = new Hrac { Jmeno = "Adam" };
h.VezmiZasah(30);   // Adam má 70 HP.
```

---

## Přepsání ToString()

```csharp
class Hrac
{
    public string Jmeno;
    public int Zdravi = 100;

    public override string ToString()
    {
        return $"Hráč {Jmeno} ({Zdravi} HP)";
    }
}

Hrac h = new Hrac { Jmeno = "Adam" };
Console.WriteLine(h);   // Hráč Adam (100 HP)
```

`ToString()` se volá automaticky při `Console.WriteLine` nebo interpolaci `$"{objekt}"`.

---

## static vs. instance

```csharp
class Hra
{
    public static int PocetHracu = 0;   // sdílené pro všechny objekty
    public string Nazev;                 // každý objekt má vlastní

    public Hra(string nazev)
    {
        Nazev = nazev;
        PocetHracu++;                    // počítá všechny vytvořené hry
    }
}

new Hra("Minecraft");
new Hra("CS2");
Console.WriteLine(Hra.PocetHracu);      // 2 (přes název třídy)
```

Notes:
static = sdílené pro všechny objekty, přistupujeme přes název třídy. Instance člen = každý objekt má vlastní kopii.
Math.PI, Console.WriteLine jsou také static.

---

## Cvičení

Vytvoř třídu `Auto` s vlastnostmi `Znacka` (string) a `Rychlost` (int, private setter).

- Konstruktor nastaví značku, rychlost = 0
- Metoda `Zrychleni(int o)` zvýší rychlost, max 200 km/h
- Metoda `Brzdi(int o)` sníží rychlost, min 0 km/h
- Přepiš `ToString()` → `"Škoda: 120 km/h"`

Vytvoř dvě auta a zrychluj/brzdi je.

Notes:
Řešení:

```csharp
class Auto
{
    public string Znacka { get; }
    public int Rychlost { get; private set; } = 0;

    public Auto(string znacka) { Znacka = znacka; }

    public void Zrychleni(int o)
    {
        Rychlost = Math.Min(Rychlost + o, 200);
        Console.WriteLine(this);
    }

    public void Brzdi(int o)
    {
        Rychlost = Math.Max(Rychlost - o, 0);
        Console.WriteLine(this);
    }

    public override string ToString() => $"{Znacka}: {Rychlost} km/h";
}

Auto a1 = new Auto("Škoda");
Auto a2 = new Auto("BMW");
a1.Zrychleni(80);
a2.Zrychleni(120);
a1.Zrychleni(150);   // zastaví na 200
a2.Brzdi(50);
```
