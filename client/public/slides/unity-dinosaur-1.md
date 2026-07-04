## Dinosaur Runner — Lekce 1: Scéna a dino

Letní škola vývoje her 2026

---

## Co postavíme dnes

Základ projektu a dinosaurus připravený na scéně.

**Výsledek:** dinosaurus stojí na scéně, Animator Controller nastaven

Notes:
Runner hry jsou skvělé pro výuku scrollingu a spawnerů. Dinosaur Runner = Chrome offline hra.

---

## Nový Unity projekt

1. **Unity Hub → New Project → 2D (Core)**
2. Název: `DinosaurRunner`
3. Vytvoř složky: `Graphics/`, `Scripts/`, `Prefabs/`, `Animations/`

Notes:
Stejný postup jako u Flappy Bird. Studenti, kteří dělali Flappy, to zvládnou rychle.

---

## Dinosaurus na scéně

1. Přetáhni `Dino.png` (nebo sprite sheet) do `Graphics/`
2. Přetáhni sprite do scény → pojmenuj `Dino`
3. Nastav pozici: `X: -4, Y: -2, Z: 0` (vlevo dole)
4. Přidej `Rigidbody2D` → **Gravity Scale: 3**, **Freeze Rotation Z: ✓**
5. Přidej `Box Collider 2D` (bez Is Trigger)

Notes:
Gravity Scale 3 = rychlý pád = těžší skok = větší výzva. Přizpůsobit obtížnosti.

---

## Animator Controller

1. V `Animations/`: **Create → Animator Controller** → pojmenuj `DinoAnimator`
2. Přetáhni `DinoAnimator` na `Dino` v Inspektoru (pole Animator → Controller)
3. Otevři Animator okno (Window → Animation → Animator)
4. Zatím necháme prázdný — animace přidáme jako bonus

Notes:
Animator Controller je nutné přiřadit teď, jinak skript vyhodí error. Animace jsou volitelné rozšíření.

---

## Podlaha

1. Vytvoř prázdný GameObject → pojmenuj `Ground`
2. Přidej **Box Collider 2D** (větší — přes celou šířku scény)
3. Nastav pozici: `Y: -3` (pod dinosaurem)

**Play Mode (▶)** → dino stojí na zemi ✓

Notes:
Podlaha jako collider bez Rigidbody = statický objekt. Dino má Rigidbody → padá a zastaví se na Ground collideru.

---

## Shrnutí lekce 1

- ✅ Projekt s složkami vytvořen
- ✅ Dinosaurus na scéně s Rigidbody2D a Colliderem
- ✅ Animator Controller přiřazen
- ✅ Podlaha jako statický collider

**Další lekce:** Skok dinosaura a scrollující pozadí

Notes:
Ověřit: dino padá na zem a zůstane stát. Pokud padá skrz: zkontrolovat že Ground má Collider a je ve správné Y pozici.
