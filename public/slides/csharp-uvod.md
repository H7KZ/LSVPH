## Základy programování v C#

---

## Co se naučíš

- Jak **myslet jako programátor** a rozložit problém na kroky
- Proměnné, podmínky a cykly — stavební kameny každé hry
- Metody — pojmenované bloky kódu, které volá opakovaně
- Třídy a základy objektového programování (OOP)

---

## Proč zrovna C#?

- Jazyk, který pohání **Unity** — nejpoužívanější herní engine na světě
- Vytváří hry jako **Hollow Knight**, **Cuphead**, **Among Us**
- Moderní, čitelný, silně typovaný
- Velká komunita a skvělá dokumentace (learn.microsoft.com)

---

## Proč to stojí za to

Každá hra je uvnitř jen **kód**. Když mu rozumíš, přestáváš být jen hráč
a stáváš se tím, kdo hry **tvoří**.

C# je jazyk, kterým se programuje v **Unity** — takže ho využiješ
hned v dalším předmětu.

---

## Co zvládneš za týden

```text
Pondělí   Proměnné a datové typy
Úterý     Podmínky a konverze typů
Středa    Cykly
Čtvrtek   Pole, seznamy a metody
Pátek     Třídy a OOP — vlastní herní objekty
```

---

## Malá ochutnávka

```csharp
class Hrac
{
    public string Jmeno;
    public int Zdravi = 100;

    public void VezmiZasah(int poskozeni)
    {
        Zdravi -= poskozeni;
        if (Zdravi <= 0)
            Console.WriteLine($"{Jmeno} padl!");
    }
}
```

Tohle je hráč. Má jméno, životy a umí dostat zásah.

---

## Nástroje, které použijeme

- **Visual Studio** nebo **Rider** — psaní a spouštění kódu
- **.NET** — prostředí, ve kterém kód běží

Nic instalovat předem nemusíš, projdeme to společně.

---

## Jak funguje programování

1. Napíšeš kód (instrukce)
2. Kompilátor ho přeloží do jazyka počítače
3. Program běží

Chyby jsou **normální** — i profíci hledají chyby každý den.
Říká se jim **bugy** a jejich hledání je **debugging**.

---

## Pojďme na to!

Žádné zkušenosti s programováním nepotřebuješ. Stačí chuť zkoušet.

Notes:
Uvítat studenty, zeptat se, kdo už někdy něco programoval. Zdůraznit, že chyby jsou normální součást učení — i profesionálové tráví velkou část času debuggováním. Ukázat Visual Studio a .NET prostředí.
