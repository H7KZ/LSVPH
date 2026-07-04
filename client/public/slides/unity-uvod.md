## Vývoj v Unity

Letní škola vývoje her 2026 · Ondřej

---

## Co se naučíš?

- Jak vypadá prostředí **Unity**
- K čemu slouží jednotlivá okna editoru
- Jak vytvořit první **GameObject**
- Jak se pohybovat ve scéně

---

## K čemu se používá Unity?

Unity je **herní engine**, ve kterém vznikají hry pro:

- 💻 Počítače
- 📱 Mobilní telefony
- 🕶️ VR/AR
- 🌐 Web

Všechno od jednoduchých 2D her až po rozsáhlé 3D projekty.

---

## Hlavní okna editoru

- **Hierarchy** — seznam všech objektů ve scéně
- **Scene** — místo, kde hru stavíš
- **Game** — náhled toho, co uvidí hráč
- **Inspector** — vlastnosti vybraného objektu
- **Project** — všechny soubory projektu

Notes:
Ukázat všechna okna v editoru. Ukázat jak znovu otevřít okno, např. potom co si ho omylem zavřu.

---

## Hierarchy

V **Hierarchy** najdeš všechny objekty ve scéně.

Například:

- Kamera
- Světlo
- Hráč
- Podlaha
- Nepřátelé

Je to podobné jako složky v Průzkumníku Windows.

Notes:
Ukázat vytvoření prázdného objektu a přejmenování.

---

## Scene View

Ve **Scene View** stavíš celý svět.

Můžeš:

- přesouvat objekty
- otáčet je
- měnit jejich velikost
- pohybovat kamerou

Tady vzniká úroveň.

Notes:
Ukázat WASD + pravé tlačítko, kolečko, QWER.

---

## Inspector

Každý objekt má svoje vlastnosti.

V **Inspectoru** můžeš měnit například:

- pozici
- rotaci
- velikost
- komponenty

Vybereš objekt → upravíš jeho nastavení.

Notes:
Kliknout na Cube a změnit Scale nebo Position.

---

## GameObjects

V Unity je skoro všechno **GameObject**.

Například:

- hráč
- strom
- kamera
- světlo
- nepřítel

Samotný GameObject ale nic neumí.

---

## Komponenty

Schopnosti objektu přidávají **komponenty**.

Například:

- Transform
- Mesh Renderer
- Box Collider
- Rigidbody
- Audio Source
- Script

Komponenty můžeš přidávat i odebírat.

Notes:
Přidat Rigidbody na Cube.

---

## Assets a Project

Ve spodní části editoru je **Project**.

Najdeš zde:

- modely
- textury
- skripty
- zvuky
- materiály
- scény

Je to složka tvé hry.

---

## První objekt

Vytvoření krychle:

```
GameObject
    ↓
3D Object
    ↓
Cube
```

A hned máš první objekt ve scéně.

Notes:
Ukázat vytvoření Cube.

---

## Jak hra funguje?

1. Vytvoříš objekt
2. Přidáš komponenty
3. Napíšeš skript
4. Stiskneš ▶ Play

A hra ožije.

---

## Příště...

Teď už víš, kde co najdeš.

Příště objektům přidáme vlastní chování pomocí **C# skriptů**.
