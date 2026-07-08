## Česká klávesnice pro programátory

Letní škola vývoje her 2026 · Honza

**AltGr** = pravý Alt &nbsp;·&nbsp; nebo Ctrl + levý Alt

---

## Závorky

<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.5rem;text-align:left;font-size:0.85em">
<div>

### Kulaté `( )`

| Znak | Klávesa                         |
|------|---------------------------------|
| `)`  | vlastní klávesa vlevo od Enteru |
| `(`  | `Shift` + `)`                   |

```csharp
if (zdravi > 0)
Console.WriteLine("Hi")
```

</div>
<div>

### Hranaté `[ ]`

| Znak | Klávesa       |
|------|---------------|
| `[`  | `AltGr` + `F` |
| `]`  | `AltGr` + `G` |

```csharp
int[] pole = new int[5];
pole[0] = 42;
```

</div>
<div>

### Složené `{ }`

| Znak | Klávesa       |
|------|---------------|
| `{`  | `AltGr` + `B` |
| `}`  | `AltGr` + `N` |

```csharp
void Metoda()
{
    // kód zde
}
```

</div>
</div>

---

## Uvozovky, lomítka a porovnávání

<div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;text-align:left;font-size:0.85em">
<div>

### Uvozovky a apostrof

| Znak | Klávesa                          | Použití        |
|------|----------------------------------|----------------|
| `"`  | `Shift` + `ů`                    | string literál |
| `'`  | `Shift` + `\|` (vlevo od Enteru) | char literál   |

```csharp
string jmeno = "Honza";
char pismeno = 'A';
```

### Lomítka

| Znak | Klávesa       | Použití                |
|------|---------------|------------------------|
| `/`  | `Shift` + `ú` | dělení, komentář `//`  |
| `\`  | `AltGr` + `Q` | cesty, escape sekvence |

```csharp
// toto je komentář
string cesta = @"C:\hry\hra.exe";
```

</div>
<div>

### Porovnávání a rovnost

| Znak | Klávesa                         | Použití      |
|------|---------------------------------|--------------|
| `=`  | vlastní klávesa (vpravo od `0`) | přiřazení    |
| `<`  | `AltGr` + `,`                   | menší než    |
| `>`  | `AltGr` + `.`                   | větší než    |
| `!`  | vlastní klávesa                 | negace, `!=` |

```csharp
int x = 10;
if (x > 5 && x != 7)
    Console.WriteLine("ok");
```

### Aritmetika

| Znak | Klávesa                                    |
|------|--------------------------------------------|
| `+`  | vlastní klávesa (úplně vlevo, první řádek) |
| `-`  | vlastní klávesa (vedle pravého Shiftu)     |
| `*`  | `AltGr` + `-` (vedle pravého Shiftu)       |
| `_`  | `Shift` + `-` (vedle pravého Shiftu)       |

</div>
</div>

---

## Ostatní znaky pro programování

<div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;text-align:left;font-size:0.85em">
<div>

### Logické operátory

| Znak | Klávesa       | Použití           |
|------|---------------|-------------------|
| `&`  | `AltGr` + `C` | `&&` logické AND  |
| `\|` | `AltGr` + `W` | `\|\|` logické OR |

```csharp
if (a > 0 && b > 0) { }
if (a > 0 || b > 0) { }
```

### Speciální znaky

| Znak | Klávesa       | Použití                      |
|------|---------------|------------------------------|
| `@`  | `AltGr` + `V` | verbatim string, atributy    |
| `#`  | `AltGr` + `X` | direktivy (`#region`, `#if`) |
| `$`  | `AltGr` + `ů` | interpolovaný string         |

```csharp
string cesta = @"C:\Users\Honza";
Console.WriteLine($"Zdraví: {hp}");
```

</div>
<div>

### Méně časté, ale užitečné

| Znak | Klávesa                  | Použití                |
|------|--------------------------|------------------------|
| `~`  | `AltGr` + `1`            | bitové NOT, destruktor |
| `^`  | `AltGr` + `3` + mezerník | XOR, index od konce    |

```csharp
int posledni = pole[^1]; // C# 8+
int negace = ~0b1010;
```

### Tip: přepnout na EN layout

`Win` + `Mezerník` přepíná jazyk klávesnice.

Na **EN layoutu** jsou všechny znaky přesně  
tam, kde je vidíš na klávese — žádné AltGr.

Spousta programátorů píše kód vždy v **EN**.

</div>
</div>

---

## Rychlý tahák — vytiskni si ho

```
═══════════════════════════════════════════════════════════════
  ZÁVORKY               UVOZOVKY & LOMÍTKA    LOGIKA & OSTATNÍ
  )  vlastní (u Enteru)  "  Shift + ů          &  AltGr + C
  (  Shift + )           '  Shift + | (Enter)  |  AltGr + W
  [  AltGr + F           /  Shift + ú           @  AltGr + V
  ]  AltGr + G           \  AltGr + Q           #  AltGr + X
  {  AltGr + B                                  $  AltGr + ů
  }  AltGr + N          POROVNÁVÁNÍ             ~  AltGr + 1
                         =  vlastní (za 0)      ^  AltGr + 3 + mezerník
  ARITMETIKA             <  AltGr + ,
  +  vlastní (1. řádek)  >  AltGr + .
  -  vlastní (u Shiftu)  !  vlastní klávesa
  *  AltGr + -
  _  Shift + -
═══════════════════════════════════════════════════════════════
  💡 Nejjednodušší: Win + Mezerník → přepnout na EN layout
═══════════════════════════════════════════════════════════════
```

Notes:
Vytisknout a dát každému studentovi. Zdůraznit že přepnutí na EN layout je nejsnazší řešení — na EN klávesnici jsou
všechny znaky přesně tam kde jsou nakreslené na klávesách.
