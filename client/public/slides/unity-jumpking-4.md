## Jump King — Lekce 4: Kamera a scrolling

Letní škola vývoje her 2026

---

## Co postavíme dnes

Cinemachine kamera, která sleduje postavu a zůstane v hranicích mapy.

**Výsledek:** kamera plynule sleduje postavu, neopouští hranice levelu

Notes:
Cinemachine je profesionální kamera systém zdarma v Unity. Jde ho nainstalovat přes Package Manager.

---

## Instalace Cinemachine

1. **Window → Package Manager**
2. Vlevo: **Unity Registry**
3. Hledej `Cinemachine` → **Install**

Notes:
Cinemachine je součástí Unity balíčků — zdarma, udržovaný. Starší projekty mohou mít verzi 2.x, novější 3.x — API se
mírně liší.

---

## Cinemachine Virtual Camera

1. **GameObject → Cinemachine → Cinemachine Camera** (nebo Virtual Camera)
2. Unity přidá CinemachineCamera komponentu
3. V Inspektoru:
    - **Follow:** přetáhni `Player` z Hierarchy
    - **Look At:** nechej prázdné (2D)

**Play Mode (▶)** → kamera sleduje postavu ✓

Notes:
Cinemachine Camera = "virtuální" kamera. Skutečná Main Camera čte její pozici. Možno mít více Virtual kamer a mezi nimi
přepínat.

---

## Nastavení pro 2D hru

V CinemachineCamera komponentě:

```
Lens → Orthographic Size: 5  (stejná jako Main Camera)
Body → Transposer nebo Framing Transposer
  → Lookahead Time: 0
  → X/Y Damping: 0.5 (plynulé sledování)
```

Notes:
Damping = zpoždění kamery za postavou. 0 = okamžitě. 0.5 = mírně opožděné (hezčí pocit).

---

## Confiner — hranice kamery

1. Vytvoř prázdný GameObject → pojmenuj `CameraBounds`
2. Přidej **Polygon Collider 2D**
3. Nastav Is Trigger: ✓
4. Edituj body collideru tak, aby ohraničily celý level

V CinemachineCamera:

- **Extensions → Add Extension → Cinemachine Confiner 2D**
- **Bounding Shape 2D:** přetáhni `CameraBounds`

Notes:
Confiner 2D zabraňuje kameře vidět za hrany mapy. Polygon Collider = přesné hranice, nemusí být obdélník.

---

## Shrnutí lekce 4

- ✅ Cinemachine Camera nainstalována a sleduje postavu
- ✅ Cinemachine Confiner 2D s hranicemi mapy

**Další lekce:** Cílová zóna, vítězná obrazovka a zvuky

Notes:
Ověřit: kamera sleduje postavu, nepřejíždí za okraje. Pokud kamera nefunguje: zkontrolovat že Main Camera má Cinemachine
Brain komponentu (přidává se automaticky).
