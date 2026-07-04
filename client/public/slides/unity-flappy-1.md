## Flappy Bird — Lekce 1: Projekt a scéna

Letní škola vývoje her 2026

---

## Co postavíme dnes

Nastavíme Unity projekt a připravíme scénu pro Flappy Bird.

**Výsledek:** prázdná 2D scéna s připravenými složkami a importovanými assety

Notes:
Tato lekce je čistě přípravná. Rychlá — za 15 minut hotovo. Studenti, kteří jsou rychlejší, mohou prozkoumávat Unity UI.

---

## Nový Unity projekt

1. Otevři **Unity Hub** → klikni **New Project**
2. Vyber šablonu **2D (Core)**
3. Název: `FlappyBird`, zvol složku
4. Klikni **Create project** a počkej (~1 minuta)

Notes:
2D Core = bez nadbytečných balíčků. Během čekání ukažte co je Unity Hub a co je Unity Editor.

---

## Struktura projektu

Vytvoř složky v **Project** okně (pravý klik → Create → Folder):

```
Assets/
├── Graphics/    ← obrázky (Bird.png, Pipe.png, Background.png)
├── Scripts/     ← naše C# skripty
└── Prefabs/     ← prefabrikáty objektů (přidáme later)
```

Notes:
Ukázat Project okno. Drag & drop obrázků do Graphics složky — Unity je importuje automaticky.

---

## Import assetů

1. Stáhni assety ze sdíleného odkazu (učitel pošle do chatu)
2. Přetáhni `Bird.png`, `Pipe.png`, `Background.png` do složky **Graphics**
3. Unity automaticky vytvoří importovaný Sprite

**Ověření:** V Project okně uvidíš náhledy obrázků ✓

Notes:
Pokud nemáte přístup k assetům, použijte libovolné PNG obrázky z internetu nebo nakreslete jednoduché placeholdery.

---

## Nastavení kamery

1. Klikni na **Main Camera** v Hierarchy
2. V Inspektoru nastav:
    - **Projection:** Orthographic
    - **Size:** 5
    - **Background Color:** světle modrá (klikni na barevný čtverec)

Notes:
Orthographic = 2D pohled bez perspektivy. Size 5 = vidíme 10 jednotek Unity výšky scény.

---

## Shrnutí lekce 1

Nastavili jsme základ projektu:

- ✅ Unity 2D projekt vytvořen
- ✅ Složky Graphics, Scripts, Prefabs
- ✅ Assety importovány
- ✅ Kamera nastavena

**Další lekce:** Ptáček, Rigidbody2D a gravitace

Notes:
Zkontrolovat že všichni mají stejnou strukturu projektu. Pomoci těm, kteří se zasekli na importu assetů.
