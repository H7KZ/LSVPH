export type ChecklistItem = {
	id: string
	label: string
}

export type Lesson = {
	slug: string
	title: string
	description: string
	duration: number
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
				duration: 15,
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
				duration: 20,
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
				duration: 20,
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
				duration: 25,
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
				duration: 20,
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
				duration: 20,
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
				duration: 25,
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
				duration: 20,
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
				duration: 20,
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
				duration: 15,
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
				duration: 25,
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
				duration: 20,
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
				duration: 20,
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
				duration: 20,
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
