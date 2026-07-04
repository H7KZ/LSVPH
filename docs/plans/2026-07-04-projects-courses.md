# Projects Courses Section — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat "project" subject in /presentations with a standalone /projects section where each game is a self-contained course with focused lessons, time estimates, and a localStorage-backed checklist.

**Architecture:** New `src/data/projects.ts` holds all game/lesson/checklist data plus localStorage helpers. Two new pages (`Projects.tsx`, `Project.tsx`) handle the grid and course detail views. Existing `/presentation/:slug` route is reused unchanged to open slide decks. Nav, Home, subjects.ts, and presentations.ts are updated to wire everything together.

**Tech Stack:** React 19, TypeScript (strict), React Router v7, TailwindCSS v4, Vitest + jsdom for tests.

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/data/projects.ts` | Types, game data, localStorage helpers |
| Create | `src/data/projects.test.ts` | Unit tests for data helpers |
| Create | `src/pages/Projects.tsx` | Game cards grid — `/projects` |
| Create | `src/pages/Project.tsx` | Course detail + checklists — `/projects/:slug` |
| Modify | `src/App.tsx` | Add new routes |
| Modify | `src/components/Nav.tsx` | Add "Projekty" nav link |
| Modify | `src/pages/Home.tsx` | Add "Projekty" CTA button |
| Modify | `src/data/subjects.ts` | Remove `project` subject |
| Modify | `src/data/presentations.ts` | Remove 6 project entries |
| Replace | `public/slides/unity-flappy-1.md` | Lesson 1: Projekt a scéna |
| Replace | `public/slides/unity-flappy-2.md` | Lesson 2: Ptáček a fyzika |
| Create | `public/slides/unity-flappy-3.md` | Lesson 3: Skok a ovládání |
| Create | `public/slides/unity-flappy-4.md` | Lesson 4: Překážky a kolize |
| Create | `public/slides/unity-flappy-5.md` | Lesson 5: Skóre a konec hry |
| Replace | `public/slides/unity-dinosaur-1.md` | Lesson 1: Scéna a dino |
| Replace | `public/slides/unity-dinosaur-2.md` | Lesson 2: Skok a scrolling |
| Create | `public/slides/unity-dinosaur-3.md` | Lesson 3: Překážky a kolize |
| Create | `public/slides/unity-dinosaur-4.md` | Lesson 4: Skóre a obtížnost |
| Replace | `public/slides/unity-jumpking-1.md` | Lesson 1: Scéna a postava |
| Replace | `public/slides/unity-jumpking-2.md` | Lesson 2: Nabíjený skok |
| Create | `public/slides/unity-jumpking-3.md` | Lesson 3: Platformy a level design |
| Create | `public/slides/unity-jumpking-4.md` | Lesson 4: Kamera a scrolling |
| Create | `public/slides/unity-jumpking-5.md` | Lesson 5: Cíl a polish |

---

## Task 1: Data model and localStorage helpers

**Files:**
- Create: `client/src/data/projects.ts`
- Create: `client/src/data/projects.test.ts`

- [ ] **Step 1: Write the test file**

Create `client/src/data/projects.test.ts`:

```ts
import { beforeEach, describe, expect, it } from 'vitest'
import {
  clearProjectProgress,
  findProjectBySlug,
  isItemChecked,
  lessonProgress,
  projectCompletedCount,
  projects,
  setItemChecked,
} from './projects'

beforeEach(() => {
  localStorage.clear()
})

describe('findProjectBySlug', () => {
  it('finds an existing project', () => {
    expect(findProjectBySlug('flappy')?.title).toBe('Flappy Bird')
  })
  it('returns undefined for unknown slug', () => {
    expect(findProjectBySlug('unknown')).toBeUndefined()
  })
})

describe('checklist localStorage helpers', () => {
  it('isItemChecked returns false when unset', () => {
    expect(isItemChecked('unity-flappy-1', 'project-created')).toBe(false)
  })
  it('setItemChecked + isItemChecked round-trip', () => {
    setItemChecked('unity-flappy-1', 'project-created', true)
    expect(isItemChecked('unity-flappy-1', 'project-created')).toBe(true)
  })
  it('setItemChecked false removes the key', () => {
    setItemChecked('unity-flappy-1', 'project-created', true)
    setItemChecked('unity-flappy-1', 'project-created', false)
    expect(isItemChecked('unity-flappy-1', 'project-created')).toBe(false)
  })
})

describe('lessonProgress', () => {
  const lesson = projects[0].lessons[0] // flappy lesson 1

  it('not-started when nothing checked', () => {
    expect(lessonProgress(lesson)).toBe('not-started')
  })
  it('in-progress when some items checked', () => {
    setItemChecked(lesson.slug, lesson.checklist[0].id, true)
    expect(lessonProgress(lesson)).toBe('in-progress')
  })
  it('completed when all items checked', () => {
    for (const item of lesson.checklist) setItemChecked(lesson.slug, item.id, true)
    expect(lessonProgress(lesson)).toBe('completed')
  })
})

describe('projectCompletedCount', () => {
  it('returns 0 when nothing checked', () => {
    expect(projectCompletedCount(projects[0])).toBe(0)
  })
  it('returns 1 when first lesson fully completed', () => {
    const lesson = projects[0].lessons[0]
    for (const item of lesson.checklist) setItemChecked(lesson.slug, item.id, true)
    expect(projectCompletedCount(projects[0])).toBe(1)
  })
})

describe('clearProjectProgress', () => {
  it('removes all checked items for a project', () => {
    const project = projects[0]
    const lesson = project.lessons[0]
    for (const item of lesson.checklist) setItemChecked(lesson.slug, item.id, true)
    clearProjectProgress(project)
    expect(lessonProgress(lesson)).toBe('not-started')
  })
})
```

- [ ] **Step 2: Run the tests — verify they fail**

```bash
cd client && npm test
```

Expected: FAIL — `Cannot find module './projects'`

- [ ] **Step 3: Create `client/src/data/projects.ts`**

```ts
export type ChecklistItem = {
	id: string
	label: string
}

export type Lesson = {
	slug: string
	title: string
	description: string
	duration: string
	checklist: ChecklistItem[]
}

export type Project = {
	slug: string
	title: string
	emoji: string
	accent: string
	description: string
	lessons: Lesson[]
}

export const projects: Project[] = [
	{
		slug: 'flappy',
		title: 'Flappy Bird',
		emoji: '🐦',
		accent: '#facc15',
		description: 'Fyzika, kolize a skóre. Postav klon Flappy Bird v Unity 2D od základu.',
		lessons: [
			{
				slug: 'unity-flappy-1',
				title: 'Projekt a scéna',
				description: 'Nový 2D projekt, importování assetů, hlavní scéna',
				duration: '15 min',
				checklist: [
					{ id: 'project-created', label: 'Unity projekt vytvořen' },
					{ id: 'folders-ready', label: 'Složky Graphics, Scripts, Prefabs vytvořeny' },
					{ id: 'scene-open', label: 'Hlavní scéna otevřena v Unity' },
				],
			},
			{
				slug: 'unity-flappy-2',
				title: 'Ptáček a fyzika',
				description: 'Sprite, Rigidbody2D, gravitace, první skript',
				duration: '20 min',
				checklist: [
					{ id: 'sprite-placed', label: 'Sprite ptáčka na scéně' },
					{ id: 'rigidbody-added', label: 'Rigidbody2D přidán a nakonfigurován' },
					{ id: 'bird-falls', label: 'Ptáček v Play Mode padá dolů' },
				],
			},
			{
				slug: 'unity-flappy-3',
				title: 'Skok a ovládání',
				description: 'AddForce, Input.GetKeyDown, BoxCollider2D',
				duration: '20 min',
				checklist: [
					{ id: 'script-created', label: 'PlayerMovement.cs skript vytvořen' },
					{ id: 'jump-works', label: 'Skok funguje na mezerník' },
					{ id: 'collider-added', label: 'BoxCollider2D (Is Trigger) přidán na ptáčka' },
				],
			},
			{
				slug: 'unity-flappy-4',
				title: 'Překážky a kolize',
				description: 'Prefab roury, spawner, pohyb, OnTriggerEnter',
				duration: '25 min',
				checklist: [
					{ id: 'pipe-prefab', label: 'Prefab roury vytvořen' },
					{ id: 'spawner-works', label: 'Spawner generuje roury' },
					{ id: 'collision-works', label: 'Kolize s rourou restartuje scénu' },
				],
			},
			{
				slug: 'unity-flappy-5',
				title: 'Skóre a konec hry',
				description: 'UI Text, počítadlo bodů, Game Over obrazovka',
				duration: '20 min',
				checklist: [
					{ id: 'score-ui', label: 'UI skóre zobrazeno na scéně' },
					{ id: 'score-increments', label: 'Skóre roste při průletu rourou' },
					{ id: 'gameover-screen', label: 'Game Over obrazovka funguje' },
				],
			},
		],
	},
	{
		slug: 'dinosaur',
		title: 'Dinosaur Runner',
		emoji: '🦕',
		accent: '#c7dfff',
		description: 'Scrolling, generování překážek a obtížnost. Postav runner hru s dinosaurem.',
		lessons: [
			{
				slug: 'unity-dinosaur-1',
				title: 'Scéna a dino',
				description: 'Projekt, pozadí, postava, animátor',
				duration: '20 min',
				checklist: [
					{ id: 'project-created', label: 'Unity projekt vytvořen' },
					{ id: 'dino-placed', label: 'Dinosaurus na scéně se spritem' },
					{ id: 'animator-ready', label: 'Animator Controller nastaven' },
				],
			},
			{
				slug: 'unity-dinosaur-2',
				title: 'Skok a scrolling',
				description: 'Skok dina, scrollující pozadí, iluze pohybu',
				duration: '25 min',
				checklist: [
					{ id: 'jump-works', label: 'Dino skáče při stisku klávesy' },
					{ id: 'background-scrolls', label: 'Pozadí se scrolluje doleva' },
					{ id: 'loop-works', label: 'Pozadí se opakuje bez přechodu' },
				],
			},
			{
				slug: 'unity-dinosaur-3',
				title: 'Překážky a kolize',
				description: 'Spawner kaktusů, náhodná generace, smrt',
				duration: '20 min',
				checklist: [
					{ id: 'cactus-prefab', label: 'Prefab kaktusu vytvořen' },
					{ id: 'spawner-works', label: 'Kaktusy se náhodně generují' },
					{ id: 'collision-works', label: 'Kolize zastaví hru' },
				],
			},
			{
				slug: 'unity-dinosaur-4',
				title: 'Skóre a obtížnost',
				description: 'Počítadlo, zrychlení hry, high score',
				duration: '20 min',
				checklist: [
					{ id: 'score-displayed', label: 'Skóre zobrazeno na obrazovce' },
					{ id: 'speed-increases', label: 'Hra se postupně zrychluje' },
					{ id: 'highscore-saved', label: 'High score uložen v PlayerPrefs' },
				],
			},
		],
	},
	{
		slug: 'jumpking',
		title: 'Jump King',
		emoji: '👑',
		accent: '#d4ffe3',
		description: 'Nabíjený skok, platformy a Cinemachine kamera. Postav platformer s precizní fyzikou.',
		lessons: [
			{
				slug: 'unity-jumpking-1',
				title: 'Scéna a postava',
				description: 'Projekt, tile mapa, základní pohyb',
				duration: '15 min',
				checklist: [
					{ id: 'project-created', label: 'Unity projekt vytvořen' },
					{ id: 'tilemap-ready', label: 'Tilemap s podlahou na scéně' },
					{ id: 'player-moves', label: 'Postava se pohybuje doleva a doprava' },
				],
			},
			{
				slug: 'unity-jumpking-2',
				title: 'Nabíjený skok',
				description: 'Držení klávesy, síla skoku, vizuální feedback',
				duration: '25 min',
				checklist: [
					{ id: 'charge-works', label: 'Držení mezerníku nabíjí skok' },
					{ id: 'jump-force-varies', label: 'Síla skoku závisí na době nabití' },
					{ id: 'visual-feedback', label: 'Vizuální feedback ukazuje sílu nabití' },
				],
			},
			{
				slug: 'unity-jumpking-3',
				title: 'Platformy a level design',
				description: 'Tilemap kolize, layout úrovně, pád dolů',
				duration: '20 min',
				checklist: [
					{ id: 'tilemap-collision', label: 'Tilemap Collider 2D nastaven' },
					{ id: 'level-built', label: 'Alespoň 3 platformy v různých výškách' },
					{ id: 'fall-works', label: 'Pád z platformy funguje správně' },
				],
			},
			{
				slug: 'unity-jumpking-4',
				title: 'Kamera a scrolling',
				description: 'Cinemachine, follow kamera, hranice mapy',
				duration: '20 min',
				checklist: [
					{ id: 'cinemachine-added', label: 'Cinemachine Virtual Camera přidána' },
					{ id: 'camera-follows', label: 'Kamera sleduje postavu' },
					{ id: 'camera-bounded', label: 'Kamera nepřejíždí za hranice mapy' },
				],
			},
			{
				slug: 'unity-jumpking-5',
				title: 'Cíl a polish',
				description: 'Cílová zóna, vítězná obrazovka, zvuky',
				duration: '20 min',
				checklist: [
					{ id: 'goal-zone', label: 'Cílová zóna nahoře mapy' },
					{ id: 'win-screen', label: 'Vítězná obrazovka při dosažení cíle' },
					{ id: 'sounds-added', label: 'Alespoň 1 zvukový efekt přidán' },
				],
			},
		],
	},
]

export function findProjectBySlug(slug: string): Project | undefined {
	return projects.find(p => p.slug === slug)
}

const lsKey = (lessonSlug: string, itemId: string) => `lsvph:check:${lessonSlug}:${itemId}`

export function isItemChecked(lessonSlug: string, itemId: string): boolean {
	return localStorage.getItem(lsKey(lessonSlug, itemId)) === 'true'
}

export function setItemChecked(lessonSlug: string, itemId: string, checked: boolean): void {
	if (checked) localStorage.setItem(lsKey(lessonSlug, itemId), 'true')
	else localStorage.removeItem(lsKey(lessonSlug, itemId))
}

export function clearProjectProgress(project: Project): void {
	for (const lesson of project.lessons)
		for (const item of lesson.checklist)
			localStorage.removeItem(lsKey(lesson.slug, item.id))
}

export function lessonProgress(lesson: Lesson): 'not-started' | 'in-progress' | 'completed' {
	const checked = lesson.checklist.filter(item => isItemChecked(lesson.slug, item.id)).length
	if (checked === 0) return 'not-started'
	if (checked === lesson.checklist.length) return 'completed'
	return 'in-progress'
}

export function projectCompletedCount(project: Project): number {
	return project.lessons.filter(l => lessonProgress(l) === 'completed').length
}
```

- [ ] **Step 4: Run tests — verify they all pass**

```bash
cd client && npm test
```

Expected: all 10 tests PASS

- [ ] **Step 5: Commit**

```bash
cd client && git add src/data/projects.ts src/data/projects.test.ts
git commit -m "feat: add projects data model and localStorage helpers"
```

---

## Task 2: Wiring — routes, nav, home, cleanup

**Files:**
- Modify: `client/src/App.tsx`
- Modify: `client/src/components/Nav.tsx`
- Modify: `client/src/pages/Home.tsx`
- Modify: `client/src/data/subjects.ts`
- Modify: `client/src/data/presentations.ts`

- [ ] **Step 1: Update `client/src/App.tsx`**

Replace the entire file:

```tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Lunch from './pages/Lunch'
import NotFound from './pages/NotFound'
import Presentation from './pages/Presentation'
import Presentations from './pages/Presentations'
import Project from './pages/Project'
import Projects from './pages/Projects'
import Timetable from './pages/Timetable'

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/timetable" element={<Timetable />} />
					<Route path="/lunch" element={<Lunch />} />
					<Route path="/presentations" element={<Presentations />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/projects/:slug" element={<Project />} />
					<Route path="*" element={<NotFound />} />
				</Route>
				<Route path="/presentation/:slug" element={<Presentation />} />
			</Routes>
		</BrowserRouter>
	)
}
```

- [ ] **Step 2: Update `client/src/components/Nav.tsx`**

Replace the `links` array only — add Projekty:

```tsx
const links = [
	{ to: '/timetable', label: 'Rozvrh' },
	{ to: '/lunch', label: 'Obědy' },
	{ to: '/presentations', label: 'Prezentace' },
	{ to: '/projects', label: 'Projekty' },
]
```

- [ ] **Step 3: Update `client/src/pages/Home.tsx`**

Add the Projekty button after the existing Prezentace button (inside the `flex flex-wrap gap-3` div):

```tsx
<Link
  to="/projects"
  className="border-ink hover:bg-ink hover:text-bg inline-block border-2 px-5 py-2 text-sm font-bold tracking-widest uppercase transition-colors"
>
  Projekty
</Link>
```

- [ ] **Step 4: Update `client/src/data/subjects.ts`**

Remove the `project` entry. The array should be:

```ts
export const subjects: Subject[] = [
	{
		slug: 'csharp',
		title: 'Základy programování v C#',
		lecturer: 'Matyáš, Eliška, Honza, Ondřej, Šimon, Adam',
		description: 'Proměnné, podmínky, cykly, třídy a základy OOP.',
		accent: '#c7dfff'
	},
	{
		slug: '2d',
		title: 'Základy 2D grafiky',
		lecturer: 'Honza, Šimon',
		description: 'Vektorová vs. rastrová grafika. Práce ve Figmě.',
		accent: '#fcd7ec'
	},
	{
		slug: '3d',
		title: 'Základy 3D grafiky',
		lecturer: 'David, Eliška',
		description: 'Blender pro herní vývojáře. Tvorba a export herních assetů.',
		accent: '#d4ffe3'
	},
	{
		slug: 'gamedesign',
		title: 'Základy gamedesignu',
		lecturer: 'Matyáš, Ondřej',
		description: 'Co dělá hru zábavnou. Herní mechaniky, smyčky, balance.',
		accent: '#ffeed9'
	},
	{
		slug: 'unity',
		title: 'Základy Unity',
		lecturer: 'Matyáš, Honza, Ondřej, Adam, Tobiáš',
		description: 'GameObjects, komponenty, fyzika a tvorba první 3D hry.',
		accent: '#f5c6c4'
	}
]
```

- [ ] **Step 5: Update `client/src/data/presentations.ts`**

Remove the 6 entries with `subjectSlug: 'project'`. The file should end after the Jump King entries are removed. Final `presentations` array:

```ts
export const presentations: Presentation[] = [
	{ slug: 'csharp-uvod', subjectSlug: 'csharp', title: 'Úvod do předmětu' },
	{ slug: 'csharp-1-promenne', subjectSlug: 'csharp', title: 'Lekce 1: Proměnné a datové typy' },
	{ slug: 'csharp-2-konverze-podminky', subjectSlug: 'csharp', title: 'Lekce 2: Konverze a podmínky' },
	{ slug: 'csharp-3-cykly', subjectSlug: 'csharp', title: 'Lekce 3: Cykly' },
	{ slug: 'csharp-4-pole-seznamy', subjectSlug: 'csharp', title: 'Lekce 4: Pole a seznamy' },
	{ slug: 'csharp-5-metody', subjectSlug: 'csharp', title: 'Lekce 5: Metody a funkce' },
	{ slug: 'csharp-6-tridy-oop', subjectSlug: 'csharp', title: 'Lekce 6: Třídy a OOP' },
	{ slug: 'csharp-7-opakovani', subjectSlug: 'csharp', title: 'Lekce 7: Opakování a cvičení' },
	{ slug: '2d-uvod', subjectSlug: '2d', title: 'Rastr vs. Vektor' },
	{ slug: '2d-figma', subjectSlug: '2d', title: 'Figma: Tvoříme jako profíci' },
	{ slug: '3d-uvod', subjectSlug: '3d', title: 'Úvod do předmětu' },
	{ slug: '3d-blender-zaklady', subjectSlug: '3d', title: 'Blender: 3D Prostor' },
	{ slug: '3d-blender-edit-mode', subjectSlug: '3d', title: 'Blender: Modelování' },
	{ slug: '3d-blender-tvorba-assetu', subjectSlug: '3d', title: 'Blender: Tvorba assetu a export' },
	{ slug: 'gamedesign-uvod', subjectSlug: 'gamedesign', title: 'Úvod do předmětu' },
	{ slug: 'unity-uvod', subjectSlug: 'unity', title: 'Úvod do předmětu' },
]
```

- [ ] **Step 6: Run the dev server and verify no TypeScript errors**

```bash
cd client && npm run dev
```

Expected: server starts on localhost:5173 with no errors. The /presentations page should no longer show a "Projektová práce" section. Nav shows 4 links.

- [ ] **Step 7: Commit**

```bash
cd client
git add src/App.tsx src/components/Nav.tsx src/pages/Home.tsx src/data/subjects.ts src/data/presentations.ts
git commit -m "feat: add projects routes, nav link, remove project from presentations"
```

---

## Task 3: Projects landing page

**Files:**
- Create: `client/src/pages/Projects.tsx`

- [ ] **Step 1: Create `client/src/pages/Projects.tsx`**

```tsx
import { Link } from 'react-router-dom'
import { projectCompletedCount, projects } from '../data/projects'

export default function Projects() {
	return (
		<div className="mx-auto max-w-4xl">
			<h1 className="font-display mb-2 text-4xl font-extrabold">Projekty</h1>
			<p className="text-muted mb-10 max-w-prose">
				Vyber hru a postupuj lekci po lekci. Každá lekce má prezentaci a checklist — odškrtni splněné kroky a jdi dál.
			</p>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{projects.map(project => {
					const completed = projectCompletedCount(project)
					return (
						<Link
							key={project.slug}
							to={`/projects/${project.slug}`}
							className="border-ink block border-2 transition-shadow hover:shadow-[4px_4px_0_#000]"
						>
							<div
								className="border-ink border-b-2 p-6 text-center"
								style={{ backgroundColor: project.accent }}
							>
								<div className="mb-2 text-4xl">{project.emoji}</div>
								<h2 className="font-display font-bold">{project.title}</h2>
							</div>
							<div className="bg-bg p-4">
								<p className="text-muted mb-3 text-sm">{project.description}</p>
								<div className="mb-4 flex flex-wrap gap-2">
									<span className="border-ink border px-2 py-0.5 text-xs">
										{project.lessons.length} lekcí
									</span>
									<span className="border-ink border px-2 py-0.5 text-xs">
										{project.lessons.reduce((sum, l) => sum + parseInt(l.duration), 0)} min
									</span>
									{completed > 0 && (
										<span className="border-ink border bg-[#d4ffe3] px-2 py-0.5 text-xs">
											{completed} / {project.lessons.length} ✓
										</span>
									)}
								</div>
								<div className="bg-ink text-accent py-2 text-center text-xs font-bold tracking-widest uppercase">
									{completed > 0 ? 'POKRAČOVAT →' : 'ZAČÍT →'}
								</div>
							</div>
						</Link>
					)
				})}
			</div>
		</div>
	)
}
```

- [ ] **Step 2: Open http://localhost:5173/projects in browser**

Expected: three game cards (Flappy Bird, Dinosaur Runner, Jump King) in a grid. Each card shows emoji, title, description, lesson count, time, and a "ZAČÍT →" button. Clicking a card navigates to `/projects/:slug` (404 until Task 4).

- [ ] **Step 3: Commit**

```bash
cd client
git add src/pages/Projects.tsx
git commit -m "feat: add Projects landing page with game cards grid"
```

---

## Task 4: Project detail page

**Files:**
- Create: `client/src/pages/Project.tsx`

- [ ] **Step 1: Create `client/src/pages/Project.tsx`**

```tsx
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
	clearProjectProgress,
	findProjectBySlug,
	isItemChecked,
	lessonProgress,
	projectCompletedCount,
	setItemChecked,
	type Lesson,
} from '../data/projects'

export default function Project() {
	const { slug } = useParams<{ slug: string }>()
	const project = slug ? findProjectBySlug(slug) : undefined
	const [, setTick] = useState(0)

	if (!project) return <Navigate to="/projects" replace />

	const rerender = () => setTick(t => t + 1)

	function handleCheck(lessonSlug: string, itemId: string, checked: boolean) {
		setItemChecked(lessonSlug, itemId, checked)
		rerender()
	}

	function handleReset() {
		clearProjectProgress(project!)
		rerender()
	}

	const completed = projectCompletedCount(project)

	return (
		<div className="mx-auto max-w-2xl">
			<p className="text-muted mb-4 text-sm">
				<Link to="/projects" className="hover:underline">
					← Projekty
				</Link>{' '}
				/ {project.title}
			</p>

			<div className="border-ink mb-8 flex items-start gap-4 border-b-2 pb-6">
				<div
					className="border-ink flex h-14 w-14 shrink-0 items-center justify-center border-2 text-3xl"
					style={{ backgroundColor: project.accent }}
				>
					{project.emoji}
				</div>
				<div>
					<h1 className="font-display text-3xl font-extrabold">{project.title}</h1>
					<p className="text-muted mt-1 text-sm">{project.description}</p>
					<div className="mt-2 flex flex-wrap gap-2">
						<span className="border-ink border px-2 py-0.5 text-xs">{project.lessons.length} lekcí</span>
						<span className="border-ink border bg-[#d4ffe3] px-2 py-0.5 text-xs">
							{completed} / {project.lessons.length} dokončeno
						</span>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-3">
				{project.lessons.map((lesson, i) => (
					<LessonCard key={lesson.slug} lesson={lesson} index={i + 1} onCheck={handleCheck} />
				))}
			</div>

			<div className="mt-6 text-right">
				<button onClick={handleReset} className="text-muted text-xs underline hover:no-underline">
					Resetovat postup
				</button>
			</div>
		</div>
	)
}

function LessonCard({
	lesson,
	index,
	onCheck,
}: {
	lesson: Lesson
	index: number
	onCheck: (lessonSlug: string, itemId: string, checked: boolean) => void
}) {
	const progress = lessonProgress(lesson)

	const headerBg =
		progress === 'completed' ? '#d4ffe3' : progress === 'in-progress' ? '#facc15' : undefined

	return (
		<div className={`border-ink border-2 ${progress === 'not-started' ? 'opacity-60' : ''}`}>
			<div
				className="border-ink flex items-center gap-3 border-b-2 px-4 py-3"
				style={{ backgroundColor: headerBg }}
			>
				<div
					className={`flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold ${
						progress === 'not-started' ? 'border-ink border-2 text-muted' : 'bg-ink text-accent'
					}`}
				>
					{progress === 'completed' ? '✓' : index}
				</div>
				<div className="flex-1">
					<p className="font-body font-bold">{lesson.title}</p>
					<p className="text-muted text-xs">{lesson.description}</p>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-muted text-xs">{lesson.duration}</span>
					<a
						href={`/presentation/${lesson.slug}`}
						target="_blank"
						rel="noopener noreferrer"
						className="bg-ink text-accent font-body px-3 py-1 text-xs font-bold"
					>
						▶ Prezentace ↗
					</a>
				</div>
			</div>
			<div className="px-4 py-3">
				<p className="text-muted mb-2 text-xs font-bold uppercase tracking-widest">Checklist</p>
				<div className="flex flex-col gap-2">
					{lesson.checklist.map(item => (
						<label key={item.id} className="flex cursor-pointer items-center gap-2 text-sm">
							<input
								type="checkbox"
								checked={isItemChecked(lesson.slug, item.id)}
								onChange={e => onCheck(lesson.slug, item.id, e.target.checked)}
								className="h-4 w-4"
							/>
							{item.label}
						</label>
					))}
				</div>
			</div>
		</div>
	)
}
```

- [ ] **Step 2: Verify in browser — open http://localhost:5173/projects/flappy**

Expected:
- Header with 🐦, "Flappy Bird", description, "5 lekcí", "0 / 5 dokončeno"
- 5 lesson cards, all opacity-60 (not started), each with grey number badge, checklist, and "▶ Prezentace ↗" button
- Clicking a checkbox: lesson header turns yellow (in-progress), badge turns black
- Checking all 3 boxes on lesson 1: header turns green, badge shows ✓, count becomes "1 / 5 dokončeno"
- "Resetovat postup" clears all checkboxes
- Refreshing the page: checked state persists

- [ ] **Step 3: Verify /projects/unknown redirects to /projects**

Navigate to http://localhost:5173/projects/nonexistent — should redirect to /projects.

- [ ] **Step 4: Commit**

```bash
cd client
git add src/pages/Project.tsx
git commit -m "feat: add Project course detail page with localStorage checklist"
```

---

## Task 5: Slide decks — Flappy Bird

**Files:**
- Replace: `client/public/slides/unity-flappy-1.md`
- Replace: `client/public/slides/unity-flappy-2.md`
- Create: `client/public/slides/unity-flappy-3.md`
- Create: `client/public/slides/unity-flappy-4.md`
- Create: `client/public/slides/unity-flappy-5.md`

- [ ] **Step 1: Replace `client/public/slides/unity-flappy-1.md`**

```markdown
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
```

- [ ] **Step 2: Replace `client/public/slides/unity-flappy-2.md`**

```markdown
## Flappy Bird — Lekce 2: Ptáček a fyzika

Letní škola vývoje her 2026

---

## Co postavíme dnes

Ptáček na scéně s fyzikou — padá dolů jako ve skutečné hře.

**Výsledek:** GameObject ptáčka s Rigidbody2D, který padá pod vlivem gravitace

Notes:
Lekce zavádí klíčové pojmy Unity: GameObject, Component, Inspector, Rigidbody2D. Dej si čas na vysvětlení.

---

## GameObject a komponenty

V Unity je vše **GameObject**. Vlastnosti mu dávají **komponenty**.

| Komponenta | Co dělá |
|-----------|---------|
| `Transform` | pozice, rotace, velikost |
| `SpriteRenderer` | kreslí 2D obrázek |
| `Rigidbody2D` | fyzika a gravitace |
| `Collider2D` | detekce kolizí |

Notes:
Analogie: GameObject = herec. Komponenty = kostým, hlas, pohyb. Bez komponent je GameObject prázdná krabice.

---

## Ptáček na scéně

1. V **Project** → `Graphics/` přetáhni `Bird.png` do **Scene**
2. Unity vytvoří GameObject se `SpriteRenderer`
3. Přejmenuj ho na `Bird` (F2 v Hierarchy)
4. Nastav **Position** v Inspektoru: `X: -2, Y: 0, Z: 0`

Notes:
Přejmenování je důležité — až budeme hledat objekt ve skriptu, název nás zachrání.

---

## Rigidbody2D — přidání fyziky

1. Vyber `Bird` v Hierarchy
2. V Inspektoru → **Add Component** → hledej `Rigidbody 2D`
3. Nastav:
   - **Gravity Scale:** `1.5` (trochu rychlejší pád)
   - **Freeze Rotation → Z:** ✓ zaškrtni

**Spusť Play Mode (▶)** → ptáček padá dolů ✓

Notes:
Freeze Rotation Z = ptáček se neobrátí při první kolizi (fyzika by ho jinak roztočila). Experimentujte s Gravity Scale.

---

## Jak funguje gravitace

```
Každý snímek:  velocity.y -= gravitace × deltaTime

Gravity Scale 1.0 → mírný pád (jako na Měsíci)
Gravity Scale 1.5 → přirozený pád
Gravity Scale 3.0 → rychlý pád (těžší hra)
```

Vyzkoušej různé hodnoty v Inspektoru **během Play Mode**

Notes:
V Play Mode lze měnit hodnoty v Inspektoru — ale změny se po ukončení Play Mode neuloží! To je časté překvapení pro začátečníky.

---

## BoxCollider2D — přidání kolizní zóny

1. Vyber `Bird` v Hierarchy
2. **Add Component** → `Box Collider 2D`
3. ✓ Zaškrtni **Is Trigger**
4. Uprav velikost: tlačítko **Edit Collider** → táhni zelené body tak, aby odpovídaly tvaru ptáčka

Notes:
Is Trigger = jiné objekty "proletí" skrz, ale Unity nás upozorní (callback). Bez Is Trigger by fyzika ptáčka odrážela od objektů.

---

## Trigger vs. fyzická kolize

| Typ | Is Trigger | Chování |
|-----|-----------|---------|
| Fyzická kolize | ☐ | Blokuje průchod, odraz |
| Trigger zóna | ✓ | Proletí skrz, jen callback |

```csharp
// fyzická kolize:
void OnCollisionEnter2D(Collision2D col) { }

// trigger zóna:
void OnTriggerEnter2D(Collider2D col)    { }
```

Notes:
Pro Flappy Bird chceme trigger — jinak by se ptáček odrážel od rour divně. My sami rozhodneme, co se při kontaktu stane.

---

## Shrnutí lekce 2

- ✅ Ptáček jako GameObject se SpriteRenderer
- ✅ Rigidbody2D — gravitace, Freeze Rotation Z
- ✅ BoxCollider2D s Is Trigger

**Další lekce:** Skript pro skok při stisku mezerníku

Notes:
Ověřit: všichni mají ptáčka, který padá dolů při Play Mode. Collider nemusí být perfektní — přibližně stačí.
```

- [ ] **Step 3: Create `client/public/slides/unity-flappy-3.md`**

```markdown
## Flappy Bird — Lekce 3: Skok a ovládání

Letní škola vývoje her 2026

---

## Co postavíme dnes

Napíšeme skript, který ptáčkovi umožní skákat při stisku mezerníku.

**Výsledek:** ptáček reaguje na vstup hráče a skáče nahoru

Notes:
První C# skript! Dej si čas — studenti potřebují vidět kde skript vytvořit, jak ho přiřadit, a jak Debug.Log funguje.

---

## MonoBehaviour — kostra každého skriptu

```csharp
public class PlayerMovement : MonoBehaviour
{
    void Start()  { /* jednou na začátku */ }
    void Update() { /* každý snímek (~60× za sekundu) */ }
}
```

| Metoda | Kdy se volá |
|--------|------------|
| `Start` | jednou po aktivaci objektu |
| `Update` | každý snímek hry |

Notes:
MonoBehaviour = základ Unity skriptingu. Dědění od MonoBehaviour znamená, že Unity skript "ví" o herní smyčce.

---

## Vytvoření skriptu

1. V **Project** okně: pravý klik na `Scripts/` → **Create → C# Script**
2. Název: `PlayerMovement` (bez mezer, s velkými písmeny)
3. Dvakrát klikni → otevře se VS Code nebo Rider
4. Smaž obsah `Start()` a `Update()` — budeme psát od začátku

Notes:
Název souboru musí odpovídat názvu třídy! Unity to vyžaduje. Pokud se liší, skript nepůjde přiřadit.

---

## PlayerMovement.cs — píšeme spolu

```csharp
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    [SerializeField] private float jumpForce = 5f;
    [SerializeField] private Rigidbody2D rb;

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
            rb.linearVelocity = Vector2.up * jumpForce;
    }
}
```

Notes:
Pište řádek po řádku. Vysvětlete každou část. `rb.linearVelocity = Vector2.up * jumpForce` = okamžitě nastavíme rychlost nahoru (ne AddForce — to by se kumulovalo).

---

## GetKeyDown vs. GetKey

```csharp
Input.GetKeyDown(KeyCode.Space) // TRUE jen první snímek stisku ✓
Input.GetKey(KeyCode.Space)     // TRUE každý snímek při držení  ✗
```

Vyzkoušej: změň na `GetKey` → ptáček letí dokud držíš mezerník

Notes:
Nechte studenty skutečně vyzkoušet obě varianty. Rozdíl je okamžitě viditelný a zapamatovatelný.

---

## SerializeField — propojení v Inspektoru

```csharp
[SerializeField] private float jumpForce = 5f; // číslo nastavitelné v Inspektoru
[SerializeField] private Rigidbody2D rb;       // přetáhneme z Hierarchy
```

**Proč ne `public`?**  
`public` = jakýkoliv skript může hodnotu změnit = chaos  
`[SerializeField] private` = jen Inspector vidí pole, ale kód je chráněný ✓

Notes:
Toto je best practice Unity vývoje. `public` funguje, ale je to špatný zvyk.

---

## Přiřazení skriptu a propojení

1. Přetáhni skript `PlayerMovement` na `Bird` v Hierarchy (nebo Add Component)
2. V Inspektoru skriptu:
   - **Jump Force:** nech na 5
   - **Rb:** přetáhni komponentu `Rigidbody 2D` z ptáčkova Inspektoru

**Spusť Play Mode (▶)** → mezerník = skok ✓

Notes:
Bez reference na Rb Unity vyhodí NullReferenceException. Ukázat chybu v Console a jak ji opravit — cenná lekce.

---

## Shrnutí lekce 3

- ✅ C# skript `PlayerMovement.cs` vytvořen
- ✅ Skok na mezerník s okamžitým nastavením rychlosti
- ✅ `[SerializeField]` pro nastavení v Inspektoru

**Další lekce:** Roury, spawner a detekce kolize

Notes:
Ověřit: všichni mají funkční skok. Tipovat: jumpForce mezi 4–7 závisí na Gravity Scale. Nechte 5 minut na experimentování.
```

- [ ] **Step 4: Create `client/public/slides/unity-flappy-4.md`**

```markdown
## Flappy Bird — Lekce 4: Překážky a kolize

Letní škola vývoje her 2026

---

## Co postavíme dnes

Roury, které se pohybují zleva doprava a restartují hru při kolizi.

**Výsledek:** funkční překážky s detekcí kolize

Notes:
Tato lekce zavádí Prefaby — jeden z nejdůležitějších konceptů Unity. Věnuj čas vysvětlení co je prefab a proč ho chceme.

---

## Prefab — šablona objektu

**Prefab** = šablona, ze které vytváříme kopie (instance).

```
Prefab roury → Spawner vytvoří 10 instancí roury
               Změna prefabu = změna VŠECH instancí najednou
```

Proč prefab místo kopírování?  
→ Oprava chyby na jednom místě, ne na 10 místech ✓

Notes:
Analogie: Prefab = razítko. Každá instance = výtisk razítka. Změníš razítko → všechny budoucí výtisky jsou jiné.

---

## Vytvoření prefabu roury

1. Přetáhni `Pipe.png` do scény → GameObject `Pipe`
2. Přidej **Box Collider 2D** (bez Is Trigger)
3. Nastav **Tag** na `Pipe` (Inspector → Tag → Add Tag → `Pipe`)
4. Přetáhni `Pipe` z Hierarchy do `Prefabs/` v Project okně
5. Smaž originál ze scény

Notes:
Tag "Pipe" budeme potřebovat v kolizním callbacku. Unity tagy jsou case-sensitive!

---

## PipeSpawner.cs

```csharp
using UnityEngine;

public class PipeSpawner : MonoBehaviour
{
    [SerializeField] private GameObject pipePrefab;
    [SerializeField] private float spawnInterval = 2f;
    [SerializeField] private float pipeSpeed = 3f;

    private float timer;

    void Update()
    {
        timer += Time.deltaTime;
        if (timer >= spawnInterval)
        {
            timer = 0f;
            SpawnPipe();
        }
    }

    void SpawnPipe()
    {
        float y = Random.Range(-2f, 2f);
        GameObject pipe = Instantiate(pipePrefab, new Vector3(8f, y, 0), Quaternion.identity);
        pipe.GetComponent<Rigidbody2D>().linearVelocity = Vector2.left * pipeSpeed;
        Destroy(pipe, 10f);
    }
}
```

Notes:
Přidej Rigidbody2D na Pipe prefab (Gravity Scale 0, Is Kinematic zapnuto nebo ne — závisí na přístupu).

---

## Přiřazení spawneru

1. Vytvoř prázdný GameObject → pojmenuj `PipeSpawner`
2. Přiřaď skript `PipeSpawner.cs`
3. V Inspektoru:
   - **Pipe Prefab:** přetáhni Prefab z `Prefabs/`
   - **Spawn Interval:** 2
   - **Pipe Speed:** 3

**Play Mode (▶)** → roury se generují zleva ✓

Notes:
Pokud roury padají dolů: Pipe prefab potřebuje Rigidbody2D s Gravity Scale 0 nebo Is Kinematic. Ukázat v Inspektoru.

---

## Detekce kolize — GameOver

Přidej do `PlayerMovement.cs`:

```csharp
void OnTriggerEnter2D(Collider2D collision)
{
    if (collision.CompareTag("Pipe"))
        UnityEngine.SceneManagement.SceneManager.LoadScene(
            UnityEngine.SceneManagement.SceneManager.GetActiveScene().name);
}
```

Nezapomeň přidat using na začátek:
```csharp
using UnityEngine.SceneManagement;
```

Notes:
CompareTag je efektivnější než `collision.tag == "Pipe"`. SceneManager.LoadScene(jméno scény) = restart. Jednoduché a funkční.

---

## Shrnutí lekce 4

- ✅ Pipe prefab s tagem a colliderem
- ✅ PipeSpawner generuje roury s náhodnou výškou
- ✅ Kolize s rourou restartuje scénu

**Další lekce:** Skóre, UI Text a Game Over obrazovka

Notes:
Ověřit: ptáček umírá při kontaktu s rourou a hra se restartuje. Doladění obtížnosti (spawnInterval, pipeSpeed) jako bonus pro rychlejší studenty.
```

- [ ] **Step 5: Create `client/public/slides/unity-flappy-5.md`**

```markdown
## Flappy Bird — Lekce 5: Skóre a konec hry

Letní škola vývoje her 2026

---

## Co postavíme dnes

Počítadlo skóre a Game Over obrazovka.

**Výsledek:** kompletní Flappy Bird — skóre roste, při Game Over vidíš výsledek

Notes:
Poslední lekce! Studenti jsou motivovaní — konec je blízko. Skóre + UI + GameManager = základ každé hry.

---

## Canvas — UI systém Unity

1. **GameObject → UI → Canvas** (Unity vytvoří Canvas + EventSystem)
2. Nastav **Canvas Scaler → UI Scale Mode:** `Scale With Screen Size`
3. Nastav **Reference Resolution:** `1920 × 1080`

Notes:
Canvas = "průhledná fólie" přes celou scénu. Všechny UI prvky jsou uvnitř Canvasu.

---

## Text Mesh Pro — skóre

1. Klikni pravým na Canvas → **UI → Text - TextMeshPro**
2. Pojmenuj ho `ScoreText`
3. Nastav pozici: horní střed obrazovky
4. Nastav velikost písma, barvu (bílá nebo žlutá)
5. Výchozí text: `0`

Notes:
TextMeshPro je moderní alternativa k starému UI Text. Pokud TMP není nainstalován, Unity nabídne instalaci.

---

## GameManager.cs

```csharp
using TMPro;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI scoreText;
    private int score;

    public void AddPoints(int points)
    {
        score += points;
        scoreText.text = score.ToString();
    }

    public void GameOver()
    {
        Time.timeScale = 0f; // zastavíme čas
    }
}
```

Notes:
`Time.timeScale = 0` zmrazí veškerou fyziku a Update smyčky. Jednoduchý ale efektivní způsob zastavení hry.

---

## Score zóna — bod za průlet

1. Vytvoř prázdný GameObject uvnitř Pipe prefabu → pojmenuj `ScoreZone`
2. Přidej **Box Collider 2D** → zaškrtni **Is Trigger**
3. Nastav **Tag:** `Score`
4. Umísti zónu do středu mezery mezi rourami

V `PlayerMovement.cs` doplň do `OnTriggerEnter2D`:

```csharp
if (collision.CompareTag("Score"))
    gameManager.AddPoints(1);
```

Nezapomeň přidat `[SerializeField] private GameManager gameManager;` a propojit v Inspektoru.

Notes:
ScoreZone je child objekt Pipe prefabu → pohybuje se s rourou automaticky.

---

## Game Over — update kolize

Uprav `OnTriggerEnter2D` v `PlayerMovement.cs`:

```csharp
void OnTriggerEnter2D(Collider2D collision)
{
    if (collision.CompareTag("Pipe"))
        gameManager.GameOver();

    if (collision.CompareTag("Score"))
        gameManager.AddPoints(1);
}
```

Smaž původní `SceneManager.LoadScene` — teď zavoláme `GameOver()`.

Notes:
Time.timeScale = 0 zastaví hru, ale nezobrazí žádný panel. Volitelné rozšíření: Game Over panel s textem a tlačítkem Restart.

---

## Finální test hry

Spusť Play Mode a zkontroluj:

- ✅ Skóre roste při průletu rourou
- ✅ Při kolizi s rourou se hra zastaví
- ✅ Skóre zůstane viditelné po Game Over

**Gratulace — dokončil jsi Flappy Bird!** 🎉

Notes:
Nech studenty 5–10 minut hrát navzájem jejich hry. Soutěž o nejvyšší skóre. Volitelná rozšíření: restart tlačítko, animace ptáčka, zvuky.
```

- [ ] **Step 6: Verify in browser — open http://localhost:5173/projects/flappy**

Click "▶ Prezentace ↗" on each lesson — each should open a working slide deck in a new tab with the correct content.

- [ ] **Step 7: Commit**

```bash
cd client
git add public/slides/unity-flappy-1.md public/slides/unity-flappy-2.md \
        public/slides/unity-flappy-3.md public/slides/unity-flappy-4.md \
        public/slides/unity-flappy-5.md
git commit -m "feat: add Flappy Bird lesson slide decks (5 focused lessons)"
```

---

## Task 6: Slide decks — Dinosaur Runner

**Files:**
- Replace: `client/public/slides/unity-dinosaur-1.md`
- Replace: `client/public/slides/unity-dinosaur-2.md`
- Create: `client/public/slides/unity-dinosaur-3.md`
- Create: `client/public/slides/unity-dinosaur-4.md`

- [ ] **Step 1: Replace `client/public/slides/unity-dinosaur-1.md`**

```markdown
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
```

- [ ] **Step 2: Replace `client/public/slides/unity-dinosaur-2.md`**

```markdown
## Dinosaur Runner — Lekce 2: Skok a scrolling

Letní škola vývoje her 2026

---

## Co postavíme dnes

Dinosaurus skáče a pozadí se scrolluje — iluze pohybu doprava.

**Výsledek:** dino skáče při stisku klávesy, pozadí plynule scrolluje

Notes:
Scrolling pozadí je klíčová technika runner her. Budeme recyklovat pozadí (nekonečná smyčka).

---

## DinoController.cs — skok

```csharp
using UnityEngine;

public class DinoController : MonoBehaviour
{
    [SerializeField] private float jumpForce = 10f;
    [SerializeField] private Rigidbody2D rb;
    private bool isGrounded = true;

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
        {
            rb.linearVelocity = Vector2.up * jumpForce;
            isGrounded = false;
        }
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.CompareTag("Ground"))
            isGrounded = true;
    }
}
```

Notes:
`isGrounded` flag zabraňuje dvojskoku. Přiřadit skript na Dino, propojit Rigidbody. Nastavit tag "Ground" na podlaze.

---

## Tag "Ground" na podlaze

1. Vyber `Ground` v Hierarchy
2. Inspector → **Tag → Add Tag** → přidej `Ground`
3. Znovu vyber `Ground` → nastav Tag na `Ground`

Notes:
Bez tagu "Ground" bude `isGrounded` vždy false a dino bude moci skákat neomezeně.

---

## Scrollující pozadí — jak funguje

```
Dvě kopie pozadí vedle sebe:  [ BG1 ][ BG2 ]
Pohybují se doleva:            → →  [ BG2 ][ BG1 ] →
BG1 vyjedeme za levý okraj → přesuneme ji za BG2:
                              [ BG2 ][ BG1 ]
Výsledek: nekonečné opakování ✓
```

Notes:
Tato technika se nazývá "infinite scrolling" nebo "seamless loop". Funguje pro jakékoliv opakující se pozadí.

---

## BackgroundScroller.cs

```csharp
using UnityEngine;

public class BackgroundScroller : MonoBehaviour
{
    [SerializeField] private float scrollSpeed = 3f;
    [SerializeField] private float resetX = -20f;
    [SerializeField] private float startX = 20f;

    void Update()
    {
        transform.position += Vector3.left * scrollSpeed * Time.deltaTime;
        if (transform.position.x <= resetX)
            transform.position = new Vector3(startX, transform.position.y, transform.position.z);
    }
}
```

Notes:
Přiřadit skript na obě kopie pozadí. `resetX` a `startX` nastavit dle šířky pozadí v Unity jednotkách.

---

## Nastavení scrollujícího pozadí

1. Přetáhni `Background.png` do scény → pojmenuj `BG1`
2. Duplicituj (Ctrl+D) → pojmenuj `BG2`
3. Nastav `BG2` pozici: hned za `BG1` (X + šířka BG1)
4. Přiřaď `BackgroundScroller.cs` na obě

**Play Mode (▶)** → pozadí se plynule scrolluje ✓

Notes:
Šířka pozadí v Unity jednotkách závisí na Pixels Per Unit. Experimentovat s resetX/startX hodnotami.

---

## Shrnutí lekce 2

- ✅ Dino skáče jednou na mezerník (`isGrounded` flag)
- ✅ Dvě kopie pozadí se scrollují a recyklují
- ✅ Iluze pohybu doprava

**Další lekce:** Kaktusy, spawner a kolize

Notes:
Ověřit: dino skáče, pozadí scrolluje bez přerušení. Pokud je viditelný přechod mezi BG1 a BG2: upravit startX.
```

- [ ] **Step 3: Create `client/public/slides/unity-dinosaur-3.md`**

```markdown
## Dinosaur Runner — Lekce 3: Překážky a kolize

Letní škola vývoje her 2026

---

## Co postavíme dnes

Kaktusy, které se generují náhodně a zastaví hru při kolizi.

**Výsledek:** překážky přijíždějí zleva, kolize = Game Over

Notes:
Stejný princip jako u Flappy Bird (Spawner + Prefab), ale tentokrát jednodušší — nepotřebujeme mezeru.

---

## Prefab kaktusu

1. Přetáhni `Cactus.png` do scény → pojmenuj `Cactus`
2. Přidej **Box Collider 2D** (bez Is Trigger)
3. Přidej **Rigidbody2D** → **Is Kinematic: ✓** (pohyb skriptem, ne fyzikou)
4. Nastav **Tag:** `Obstacle`
5. Přetáhni do `Prefabs/` → smaž originál ze scény

Notes:
Is Kinematic = Rigidbody2D ignoruje fyzikální síly, ale stále registruje kolize. Pohybujeme ho přímo přes transform nebo velocity.

---

## CactusSpawner.cs

```csharp
using UnityEngine;

public class CactusSpawner : MonoBehaviour
{
    [SerializeField] private GameObject cactusPrefab;
    [SerializeField] private float minInterval = 1.5f;
    [SerializeField] private float maxInterval = 3f;
    [SerializeField] private float speed = 5f;

    private float timer;
    private float nextSpawn;

    void Start() => nextSpawn = Random.Range(minInterval, maxInterval);

    void Update()
    {
        timer += Time.deltaTime;
        if (timer >= nextSpawn)
        {
            timer = 0f;
            nextSpawn = Random.Range(minInterval, maxInterval);
            SpawnCactus();
        }
    }

    void SpawnCactus()
    {
        GameObject c = Instantiate(cactusPrefab, new Vector3(10f, -2.5f, 0), Quaternion.identity);
        c.GetComponent<Rigidbody2D>().linearVelocity = Vector2.left * speed;
        Destroy(c, 8f);
    }
}
```

Notes:
Náhodný interval (minInterval–maxInterval) místo fixního času = hráč nemůže odhadnout rytmus. Důležitý gameplay prvek.

---

## Přiřazení spawneru

1. Vytvoř prázdný GameObject → pojmenuj `CactusSpawner`
2. Přiřaď skript `CactusSpawner.cs`
3. V Inspektoru propoj **Cactus Prefab**

**Play Mode (▶)** → kaktusy přijíždějí v náhodných intervalech ✓

Notes:
Ověřit: kaktusy přijíždějí, pohybují se doleva a zmizí. Pokud padají dolů: Is Kinematic na Rigidbody2D musí být zapnuto.

---

## Detekce kolize — Game Over

Do `DinoController.cs` přidej:

```csharp
[SerializeField] private GameManager gameManager;

void OnCollisionEnter2D(Collision2D col)
{
    if (col.gameObject.CompareTag("Ground"))
        isGrounded = true;

    if (col.gameObject.CompareTag("Obstacle"))
        gameManager.GameOver();
}
```

Notes:
GameManager.GameOver() napíšeme v příští lekci. Zatím stačí připravit referenci a volání.

---

## Shrnutí lekce 3

- ✅ Prefab kaktusu s Is Kinematic Rigidbody2D
- ✅ CactusSpawner s náhodným intervalem
- ✅ Kolize s kaktusem volá GameOver()

**Další lekce:** Skóre, zrychlení a high score

Notes:
Ověřit: dino narazí do kaktusu → (zatím NullReferenceException, protože GameManager neexistuje). To je v pořádku — opravíme příští lekci.
```

- [ ] **Step 4: Create `client/public/slides/unity-dinosaur-4.md`**

```markdown
## Dinosaur Runner — Lekce 4: Skóre a obtížnost

Letní škola vývoje her 2026

---

## Co postavíme dnes

Počítadlo vzdálenosti, zrychlení hry a uložení high score.

**Výsledek:** kompletní Dinosaur Runner s narůstající obtížností

Notes:
Toto je finální lekce Dinosaur Runneru. Studenti uvidí hotovou hru — motivující!

---

## GameManager.cs

```csharp
using TMPro;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public static GameManager Instance;

    [SerializeField] private TextMeshProUGUI scoreText;
    [SerializeField] private TextMeshProUGUI highScoreText;
    [SerializeField] private float scoreRate = 1f;

    private float score;
    private bool playing = true;

    void Awake() => Instance = this;

    void Update()
    {
        if (!playing) return;
        score += Time.deltaTime * scoreRate;
        scoreText.text = Mathf.FloorToInt(score).ToString();
    }

    public void GameOver()
    {
        playing = false;
        Time.timeScale = 0f;
        int hi = PlayerPrefs.GetInt("HighScore", 0);
        if ((int)score > hi)
        {
            PlayerPrefs.SetInt("HighScore", (int)score);
            PlayerPrefs.Save();
        }
        highScoreText.text = "Best: " + PlayerPrefs.GetInt("HighScore");
    }
}
```

Notes:
Singleton (`Instance`) = kdokoliv může zavolat `GameManager.Instance.GameOver()` bez SerializeField reference. Vhodné pro manager třídy.

---

## UI Canvas — skóre a high score

1. **GameObject → UI → Canvas**
2. Přidej dva **TextMeshPro** prvky:
   - `ScoreText` (nahoře uprostřed) — výchozí text `0`
   - `HighScoreText` (nahoře vpravo) — výchozí text `Best: 0`
3. Propoj oba texty v GameManager Inspektoru

Notes:
High score se ukládá i po zavření hry díky PlayerPrefs. PlayerPrefs je jednoduchý klíč-hodnota storage Unity.

---

## Zrychlení hry

Do `CactusSpawner.cs` přidej zrychlení. Nahraď celý soubor:

```csharp
using UnityEngine;

public class CactusSpawner : MonoBehaviour
{
    [SerializeField] private GameObject cactusPrefab;
    [SerializeField] private float minInterval = 1.5f;
    [SerializeField] private float maxInterval = 3f;
    [SerializeField] private float speed = 5f;
    [SerializeField] private float speedIncrease = 0.5f;

    private float timer;
    private float nextSpawn;
    private float currentSpeed;

    void Start()
    {
        currentSpeed = speed;
        nextSpawn = Random.Range(minInterval, maxInterval);
    }

    void Update()
    {
        if (Time.timeScale == 0f) return;
        timer += Time.deltaTime;
        currentSpeed += speedIncrease * Time.deltaTime;
        if (timer >= nextSpawn)
        {
            timer = 0f;
            nextSpawn = Random.Range(minInterval, maxInterval);
            SpawnCactus();
        }
    }

    void SpawnCactus()
    {
        GameObject c = Instantiate(cactusPrefab, new Vector3(10f, -2.5f, 0), Quaternion.identity);
        c.GetComponent<Rigidbody2D>().linearVelocity = Vector2.left * currentSpeed;
        Destroy(c, 8f);
    }
}
```

Notes:
Alternativně: BackgroundScroller také zrychluje → vizuálně viditelné zrychlení. Nechte studenty experimentovat s hodnotami.

---

## Restart hry

Do GameManager přidej:

```csharp
using UnityEngine.SceneManagement;

public void Restart()
{
    Time.timeScale = 1f;
    SceneManager.LoadScene(SceneManager.GetActiveScene().name);
}
```

Přidej **Button** do Canvasu → OnClick → `GameManager.Restart()`

Notes:
Restart tlačítko zobrazit jen po Game Over — pomocí GameObject.SetActive(). Jednoduchý ale efektivní UI pattern.

---

## Finální test

Zkontroluj:

- ✅ Skóre narůstá s časem
- ✅ Kaktusy se postupně zrychlují
- ✅ High score se uloží po Game Over
- ✅ Restart tlačítko funguje

**Gratulace — dokončil jsi Dinosaur Runner!** 🦕

Notes:
Volitelná rozšíření: animace běhu dina, zvuk skoku, různé typy překážek (velké/malé kaktusy), denní/noční cyklus.
```

- [ ] **Step 5: Verify — open http://localhost:5173/projects/dinosaur**

Click each "▶ Prezentace ↗" — all 4 should open working slide decks.

- [ ] **Step 6: Commit**

```bash
cd client
git add public/slides/unity-dinosaur-1.md public/slides/unity-dinosaur-2.md \
        public/slides/unity-dinosaur-3.md public/slides/unity-dinosaur-4.md
git commit -m "feat: add Dinosaur Runner lesson slide decks (4 focused lessons)"
```

---

## Task 7: Slide decks — Jump King

**Files:**
- Replace: `client/public/slides/unity-jumpking-1.md`
- Replace: `client/public/slides/unity-jumpking-2.md`
- Create: `client/public/slides/unity-jumpking-3.md`
- Create: `client/public/slides/unity-jumpking-4.md`
- Create: `client/public/slides/unity-jumpking-5.md`

- [ ] **Step 1: Replace `client/public/slides/unity-jumpking-1.md`**

```markdown
## Jump King — Lekce 1: Scéna a postava

Letní škola vývoje her 2026

---

## Co postavíme dnes

Unity projekt s Tilemap podlahou a postavou, která se pohybuje.

**Výsledek:** postava chodí doleva a doprava, stojí na podlaze

Notes:
Jump King zavádí Tilemap — mocný nástroj pro 2D platformery. Věnuj čas vysvětlení rozdílu Tilemap vs. běžný Sprite.

---

## Nový Unity projekt

1. **Unity Hub → New Project → 2D (Core)**
2. Název: `JumpKing`
3. Složky: `Graphics/`, `Scripts/`, `Tiles/`

Notes:
Studenti, kteří dělali předchozí hry, to zvládnou rychle. Zaměř se na nové studenty.

---

## Tilemap — co to je?

**Tilemap** = síť dlaždic (tiles) pro stavbu 2D světa.

```
Výhody oproti jednotlivým Sprite objektům:
✓ Efektivní rendering (jedna draw call)
✓ Snadné kreslení úrovní "štětcem"
✓ Automatická kolize přes Tilemap Collider
```

Notes:
Analogie: Tilemap je jako stavění z Lega. Každá dlaždice = jeden blok Lega. Posunovat celou zeď = přestavit jeden blok.

---

## Vytvoření Tilemaps

1. **GameObject → 2D Object → Tilemap → Rectangular**
   - Unity vytvoří `Grid` a `Tilemap`
2. Přejmenuj `Tilemap` na `Ground`
3. Otevři **Tile Palette** (Window → 2D → Tile Palette)
4. Přetáhni `Platform.png` do Tile Palette → vytvoří Tile asset

Notes:
Grid je rodičovský objekt — pohybem Gridu pohybujeme celou mapou najednou.

---

## Kreslení podlahy

1. V Tile Palette vyber dlaždici `Platform`
2. Vyber štětec (klávesa B)
3. Kresli kliknutím do Scene view — vytáhni podlahu na spodku scény

**Tip:** Shift+klik = mazání dlaždic

Notes:
Nechat studenty 2–3 minuty volně kreslit. Zdůraznit: přidáme Collider až příště — teď je to jen vizuální.

---

## Postava

1. Přetáhni `Player.png` do scény → pojmenuj `Player`
2. Nastav pozici nad podlahu: `Y: 0` nebo výš
3. Přidej `Rigidbody2D` → **Gravity Scale: 3**, **Freeze Rotation Z: ✓**
4. Přidej `Box Collider 2D` (přizpůsob velikost)

Notes:
Bez Tilemap Collider (přidáme příště) postava propadne skrz. Nejdřív uvést pohyb, pak kolize.

---

## PlayerController.cs — základní pohyb

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [SerializeField] private float moveSpeed = 4f;
    [SerializeField] private Rigidbody2D rb;

    void Update()
    {
        float x = Input.GetAxisRaw("Horizontal"); // -1, 0, nebo 1
        rb.linearVelocity = new Vector2(x * moveSpeed, rb.linearVelocity.y);
    }
}
```

Notes:
`GetAxisRaw` = okamžitá hodnota bez interpolace (0 nebo ±1). `GetAxis` by dávalo plynulejší pohyb s setrvačností.

---

## Shrnutí lekce 1

- ✅ Tilemap s nakreslenou podlahou
- ✅ Postava s Rigidbody2D
- ✅ Pohyb doleva/doprava

**Další lekce:** Nabíjený skok — hlavní mechanika Jump King

Notes:
Ověřit: postava se pohybuje. Propadá skrz zem? Normální — Tilemap Collider přidáme v lekci 3.
```

- [ ] **Step 2: Replace `client/public/slides/unity-jumpking-2.md`**

```markdown
## Jump King — Lekce 2: Nabíjený skok

Letní škola vývoje her 2026

---

## Co postavíme dnes

Nabíjený skok — čím déle držíš mezerník, tím výš vyskočíš.

**Výsledek:** skok se nabíjí při držení klávesy, vizuální feedback ukazuje sílu

Notes:
Toto je HLAVNÍ mechanika Jump King. Dejte hodně času. Studenti budou chtít tuto část experimentovat.

---

## Jak nabíjený skok funguje

```
Hráč drží mezerník:
  → chargeTime roste (0 → maxCharge)

Hráč pustí mezerník:
  → jumpForce = chargeTime / maxCharge × maxJumpForce
  → rb.linearVelocity = Vector2.up * jumpForce
  → chargeTime = 0
```

Notes:
Lineární škálování síly. Jump King originál má specifickou fyziku, ale náš model je dostatečně zábavný.

---

## PlayerController.cs — nabíjení

Přidej do existujícího skriptu:

```csharp
[SerializeField] private float maxJumpForce = 15f;
[SerializeField] private float maxChargeTime = 1f;
private float chargeTime;
private bool isGrounded;

void Update()
{
    float x = Input.GetAxisRaw("Horizontal");
    rb.linearVelocity = new Vector2(x * moveSpeed, rb.linearVelocity.y);

    if (Input.GetKey(KeyCode.Space) && isGrounded)
        chargeTime = Mathf.Min(chargeTime + Time.deltaTime, maxChargeTime);

    if (Input.GetKeyUp(KeyCode.Space) && isGrounded)
    {
        float force = (chargeTime / maxChargeTime) * maxJumpForce;
        rb.linearVelocity = new Vector2(rb.linearVelocity.x, force);
        chargeTime = 0f;
    }
}
```

Notes:
`Mathf.Min` = chargeTime nikdy nepřekročí maxChargeTime. `GetKey` (ne GetKeyDown) = registruje držení.

---

## isGrounded — detekce země

Přidej do `PlayerController.cs`:

```csharp
void OnCollisionEnter2D(Collision2D col)
{
    if (col.gameObject.CompareTag("Ground"))
        isGrounded = true;
}

void OnCollisionExit2D(Collision2D col)
{
    if (col.gameObject.CompareTag("Ground"))
        isGrounded = false;
}
```

Notes:
Tag "Ground" musí být nastaven na Tilemap objektu (přidáme v lekci 3 s Tilemap Colliderem).

---

## Vizuální feedback — charge bar

1. **GameObject → UI → Canvas**
2. Přidej **Image** → pojmenuj `ChargeBar`
3. Nastav **Image Type:** `Filled`, **Fill Method:** `Horizontal`
4. Umísti nad postavu nebo do rohu obrazovky

Do `Update()` v PlayerController přidej:

```csharp
[SerializeField] private UnityEngine.UI.Image chargeBar;

// na konci Update():
if (chargeBar != null)
    chargeBar.fillAmount = chargeTime / maxChargeTime;
```

Notes:
`fillAmount` 0–1 = jak moc je bar zaplněný. Propojit `chargeBar` referenci v Inspektoru.

---

## Test nabíjecího skoku

Spusť Play Mode a vyzkoušej:

- Krátké kliknutí → malý skok
- Dlouhé držení → vysoký skok
- Charge bar roste při držení

Notes:
Postava zatím propadá skrz Tilemap — normální. Tilemap Collider přidáme v lekci 3. Pro testování skoku dočasně přidej Box Collider na prázdný Ground objekt.

---

## Shrnutí lekce 2

- ✅ Nabíjení skoku při držení mezerníku
- ✅ Síla skoku závisí na době nabití
- ✅ Vizuální charge bar

**Další lekce:** Tilemap kolize a level design

Notes:
Ověřit: nabíjení funguje logicky. Nejčastější bug: chargeTime neresetuje → zkontrolovat že `chargeTime = 0f` je v sekci GetKeyUp.
```

- [ ] **Step 3: Create `client/public/slides/unity-jumpking-3.md`**

```markdown
## Jump King — Lekce 3: Platformy a level design

Letní škola vývoje her 2026

---

## Co postavíme dnes

Tilemap Collider, komposite collider a layout platformové úrovně.

**Výsledek:** postava stojí na platformách, pádí při překročení okraje

Notes:
Bez kolizí byl dosud level jen vizuální. Teď ho oživíme. Level design je kreativní část — nechat studenty navrhovat vlastní layout.

---

## Tilemap Collider 2D

1. Vyber `Ground` Tilemap v Hierarchy
2. **Add Component → Tilemap Collider 2D**
3. **Add Component → Composite Collider 2D**
   - Unity automaticky přidá Rigidbody2D → nastav **Body Type: Static**
4. V Tilemap Collider 2D zaškrtni **Used By Composite**

Notes:
Composite Collider = slije všechny malé tile collidery do jednoho. Lépe výkonné a méně bugů s kolizemi.

---

## Tag "Ground" na Tilemap

1. Vyber `Ground` v Hierarchy
2. Inspector → **Tag → Add Tag** → `Ground`
3. Nastav Tag na `Ground`

Teď `OnCollisionEnter2D` v PlayerController detekuje dopad ✓

Notes:
Teď otestovat skok — postava by měla stát na Tilemapě. Pokud propadá: zkontrolovat Composite Collider 2D nastavení.

---

## Level design — principy

```
Dobrý Jump King level:
✓ Platformy různých výšek → výzva
✓ Mírně přesahující platformy → "skok na okraj"
✓ Slepé uličky → hráč musí přemýšlet
✓ Viditelný cíl nahoře → motivace
```

Notes:
Nechat studenty 10 minut kreslit vlastní level ve Tile Palette. Ukázat jak smazat dlaždice (Shift+klik).

---

## Přidání dalšího Tilemaps pro platformy

1. Klikni pravým na `Grid` → **2D Object → Tilemap**
2. Pojmenuj `Platforms`
3. Přidej **Tilemap Collider 2D** + **Composite Collider 2D** (Body Type: Static)
4. Nastav Tag: `Ground`
5. Kresli platformy v různých výškách

Notes:
Dvě Tilapy (Ground + Platforms) = podlaha je oddělena od platforem. Snadnější editace a přehled.

---

## Pád z platformy

Pokud postava při pádu z platformy přechází skrz:

1. Zkontroluj že Composite Collider 2D je nastaven
2. V Rigidbody2D postavy: **Collision Detection → Continuous**
3. Zvyš **Fixed Timestep** (Edit → Project Settings → Time → Fixed Timestep: 0.01)

Notes:
Continuous Collision Detection = Unity počítá kolize i mezi snímky. Důležité pro rychle pohybující se objekty.

---

## Shrnutí lekce 3

- ✅ Tilemap Collider 2D + Composite Collider
- ✅ Alespoň 3 platformy na různých výškách
- ✅ isGrounded funguje při dopadu

**Další lekce:** Cinemachine kamera sledující postavu

Notes:
Ověřit: postava stojí, skáče a přistává na platformách. Level design je osobní — povzbudit studenty kreativitu.
```

- [ ] **Step 4: Create `client/public/slides/unity-jumpking-4.md`**

```markdown
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
Cinemachine je součástí Unity balíčků — zdarma, udržovaný. Starší projekty mohou mít verzi 2.x, novější 3.x — API se mírně liší.

---

## Cinemachine Virtual Camera

1. **GameObject → Cinemachine → Cinemachine Camera** (nebo Virtual Camera)
2. Unity přidá CinemachineCamera komponentu
3. V Inspektoru:
   - **Follow:** přetáhni `Player` z Hierarchy
   - **Look At:** nechej prázdné (2D)

**Play Mode (▶)** → kamera sleduje postavu ✓

Notes:
Cinemachine Camera = "virtuální" kamera. Skutečná Main Camera čte její pozici. Možno mít více Virtual kamer a mezi nimi přepínat.

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
Ověřit: kamera sleduje postavu, nepřejíždí za okraje. Pokud kamera nefunguje: zkontrolovat že Main Camera má Cinemachine Brain komponentu (přidává se automaticky).
```

- [ ] **Step 5: Create `client/public/slides/unity-jumpking-5.md`**

```markdown
## Jump King — Lekce 5: Cíl a polish

Letní škola vývoje her 2026

---

## Co postavíme dnes

Cílová zóna nahoře levelu, vítězná obrazovka a alespoň jeden zvukový efekt.

**Výsledek:** kompletní Jump King — dosáhnutím cíle se zobrazí vítězná obrazovka

Notes:
Finální lekce! Studenti vidí hotovou hru. Zvuky přidají velký pocit ze hry za malou práci.

---

## Cílová zóna

1. Přidej dlaždice nebo Sprite nahoře levelu jako vizuální cíl (hvězda, koruna, brána)
2. Vytvoř prázdný GameObject → pojmenuj `GoalZone`
3. Nastav pozici na vrchol levelu
4. Přidej **Box Collider 2D** → **Is Trigger: ✓**
5. Nastav **Tag:** `Goal`

Notes:
Vizuální reprezentace cíle je důležitá — hráč musí vědět kam míří. I jednoduchý žlutý čtverec funguje.

---

## WinScreen — vítězná obrazovka

1. **GameObject → UI → Canvas** (nebo přidej do existujícího)
2. Přidej **Panel** (tmavé pozadí, poloprůhledné)
3. Do Panelu přidej **TextMeshPro:** `Vyhrál jsi! 🎉`
4. Přidej **Button:** `Hrát znovu`
5. Panel nastav jako **inactive** (odškrtni v Inspektoru)

Notes:
Panel začíná neaktivní → zobrazíme ho skriptem při dosažení cíle.

---

## GameManager.cs pro Jump King

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    [SerializeField] private GameObject winPanel;

    public void Win()
    {
        winPanel.SetActive(true);
        Time.timeScale = 0f;
    }

    public void Restart()
    {
        Time.timeScale = 1f;
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
}
```

Přiřaď `Restart()` na tlačítko "Hrát znovu" → OnClick.

Notes:
`winPanel.SetActive(true)` = zobrazit panel. `Time.timeScale = 0` = zastavit hru.

---

## GoalTrigger.cs

```csharp
using UnityEngine;

public class GoalTrigger : MonoBehaviour
{
    [SerializeField] private GameManager gameManager;

    void OnTriggerEnter2D(Collider2D col)
    {
        if (col.CompareTag("Player"))
            gameManager.Win();
    }
}
```

Přiřaď na `GoalZone`. Nastav **Tag:** `Player` na postavě.

Notes:
Propojit GameManager v Inspektoru GoalTrigger skriptu.

---

## Zvukové efekty

1. Stáhni WAV nebo MP3 soubory (skok, vítězství) do `Audio/` složky
2. Přidej `AudioSource` komponentu na `Player`
3. Do `PlayerController.cs` přidej:

```csharp
[SerializeField] private AudioSource audioSource;
[SerializeField] private AudioClip jumpSound;

// v části kde skáčeme:
audioSource.PlayOneShot(jumpSound);
```

Notes:
`PlayOneShot` = přehraje zvuk jednou, nepřeruší ostatní zvuky. Vhodné pro efekty. `audioSource.Play()` by zastavilo předchozí přehrávání.

---

## Finální test

Zkontroluj:

- ✅ Cílová zóna nahoře levelu
- ✅ Vítězná obrazovka při dosažení cíle
- ✅ Tlačítko "Hrát znovu" restartuje hru
- ✅ Zvuk skoku při odpichnutí

**Gratulace — dokončil jsi Jump King!** 👑

Notes:
Volitelná rozšíření: čas od spuštění hry, počítadlo skoků, různé typy platforem (ledové = klouzání), parallax pozadí.
```

- [ ] **Step 6: Verify — open http://localhost:5173/projects/jumpking**

Click each "▶ Prezentace ↗" — all 5 should open working slide decks.

- [ ] **Step 7: Run full test suite**

```bash
cd client && npm test
```

Expected: all 10 data tests PASS.

- [ ] **Step 8: Commit**

```bash
cd client
git add public/slides/unity-jumpking-1.md public/slides/unity-jumpking-2.md \
        public/slides/unity-jumpking-3.md public/slides/unity-jumpking-4.md \
        public/slides/unity-jumpking-5.md
git commit -m "feat: add Jump King lesson slide decks (5 focused lessons)"
```

---

## Done

All tasks complete. Verify the full flow end-to-end:

1. **http://localhost:5173** — Home page has "Projekty" CTA button
2. **http://localhost:5173/projects** — 3 game cards grid
3. **http://localhost:5173/projects/flappy** — 5 lessons, checklists work, localStorage persists on refresh
4. **http://localhost:5173/presentations** — no "Projektová práce" section
5. `/presentation/unity-flappy-3` — opens new Flappy lesson 3 deck in new tab
