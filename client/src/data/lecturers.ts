export type Lecturer = {
	slug: string
	name: string
}

export const lecturers: Lecturer[] = [
	{ slug: 'matyas', name: 'Matyáš' },
	{ slug: 'eliska', name: 'Eliška' },
	{ slug: 'honza', name: 'Honza' },
	{ slug: 'ondrej', name: 'Ondřej' },
	{ slug: 'simon', name: 'Šimon' },
	{ slug: 'adam', name: 'Adam' },
	{ slug: 'david', name: 'David' },
	{ slug: 'tobias', name: 'Tobiáš' }
]

export function findLecturerBySlug(slug: string): Lecturer | undefined {
	return lecturers.find(l => l.slug === slug)
}

export function findLecturerByName(name: string): Lecturer | undefined {
	return lecturers.find(l => l.name === name)
}
