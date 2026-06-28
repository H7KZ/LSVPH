export type Presentation = {
	slug: string // URL-friendly, unikátní napříč všemi prezentacemi
	subjectSlug: string // odkaz na Subject.slug (ke kterému předmětu patří)
	title: string // název prezentace zobrazený v seznamu
}

// Každý předmět může mít více prezentací. Slajdy se načítají z
// `public/slides/<slug>.md`. Nové prezentace přidávej sem (a vytvoř .md soubor).
export const presentations: Presentation[] = [
	{ slug: 'csharp-uvod', subjectSlug: 'csharp', title: 'Úvod do předmětu' },
	{ slug: '2d-uvod', subjectSlug: '2d', title: 'Rastr vs. Vektor' },
	{ slug: '2d-figma', subjectSlug: '2d', title: 'Figma: Tvoříme jako profíci' },
	{ slug: '3d-uvod', subjectSlug: '3d', title: 'Úvod do předmětu' },
	{ slug: 'gamedesign-uvod', subjectSlug: 'gamedesign', title: 'Úvod do předmětu' },
	{ slug: 'unity-uvod', subjectSlug: 'unity', title: 'Úvod do předmětu' }
]

export function findPresentationBySlug(slug: string): Presentation | undefined {
	return presentations.find(p => p.slug === slug)
}

export function presentationsForSubject(subjectSlug: string): Presentation[] {
	return presentations.filter(p => p.subjectSlug === subjectSlug)
}
