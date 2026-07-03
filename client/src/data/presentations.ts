export type Presentation = {
	slug: string // URL-friendly, unikátní napříč všemi prezentacemi
	subjectSlug: string // odkaz na Subject.slug (ke kterému předmětu patří)
	title: string // název prezentace zobrazený v seznamu
}

// Každý předmět může mít více prezentací. Slajdy se načítají z
// `public/slides/<slug>.md`. Nové prezentace přidávej sem (a vytvoř .md soubor).
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
	{ slug: 'unity-flappy-1', subjectSlug: 'project', title: 'Flappy: část 1' },
	{ slug: 'unity-flappy-2', subjectSlug: 'project', title: 'Flappy: část 2' },
	{ slug: 'unity-dinosaur-1', subjectSlug: 'project', title: 'Dinosaur: část 1' },
	{ slug: 'unity-dinosaur-2', subjectSlug: 'project', title: 'Dinosaur: část 2' },
	{ slug: 'unity-jumpking-1', subjectSlug: 'project', title: 'Jump King: část 1' },
	{ slug: 'unity-jumpking-2', subjectSlug: 'project', title: 'Jump King: část 2' },
]

export function findPresentationBySlug(slug: string): Presentation | undefined {
	return presentations.find(p => p.slug === slug)
}

export function presentationsForSubject(subjectSlug: string): Presentation[] {
	return presentations.filter(p => p.subjectSlug === subjectSlug)
}
