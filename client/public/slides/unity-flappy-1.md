## Flappy Bird — Lekce 1: Projekt a scéna

Letní škola vývoje her 2026 · Honza

---

## Co postavíme dnes

Nastavíme Unity projekt a připravíme scénu pro Flappy Bird.

**Výsledek:** prázdná 2D scéna se složkovou strukturou a importovanými assety

Notes:
Čistě přípravná lekce — cca 15 minut. Rychlejší studenti mohou prozkoumávat Unity UI.

---

## Nový Unity projekt

1. Otevři **Unity Hub** → **New Project**
2. Vyber šablonu **2D (Core)**
3. Název: `FlappyBird`, zvol složku
4. **Create project** — vyčkej ~1 minutu

Notes:
2D Core = bez nadbytečných balíčků.

---

## Struktura projektu

V **Project** okně: pravý klik → **Create → Folder**

```
Assets/
├── Graphics/    ← obrázky (Bird.png, Pipe.png)
├── Scripts/     ← C# skripty
└── Prefabs/     ← hotové herní objekty
```

Notes:
Drag & drop do Graphics složky — Unity importuje automaticky.

---

## Import assetů

1. Stáhni assety ze sdíleného odkazu
2. Přetáhni `Bird.png` a `Pipe.png` do složky **Graphics**
3. Unity vytvoří importovaný Sprite automaticky

**Ověření:** V Project okně vidíš náhledy obrázků ✓

Notes:
Bez assetů: libovolná PNG nebo nakreslený placeholder funguje stejně dobře.

---

## Nastavení kamery

1. Klikni na **Main Camera** v Hierarchy
2. Inspector → nastav:
    - **Projection:** Orthographic
    - **Size:** 5
    - **Background Color:** světle modrá

Notes:
Orthographic = 2D pohled bez perspektivy. Size 5 = 10 Unity jednotek výšky viditelné scény.

---

## Shrnutí lekce 1

- ✅ Unity 2D projekt vytvořen
- ✅ Složky Graphics / Scripts / Prefabs
- ✅ Assety importovány
- ✅ Kamera nastavena

**Příští lekce:** Ptáček, Rigidbody2D a gravitace
