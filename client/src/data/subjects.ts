export type Subject = {
	slug: string
	title: string
	lecturer: string
	accent: string // hex color, applied via style={{ backgroundColor }}
}

export const subjects: Subject[] = [
	{
		slug: 'uvod',
		title: 'Úvod do Letní školy',
		lecturer: 'Eliška, Ondřej, David, Honza, Šimon, Matyáš',
		accent: '#e5e5e5'
	},
	{
		slug: 'csharp',
		title: 'Základy programování v C#',
		lecturer: 'Matyáš, Eliška, Honza, Ondřej, Šimon, Adam',
		accent: '#c7dfff'
	},
	{
		slug: '2d',
		title: 'Základy 2D grafiky',
		lecturer: 'Honza, Šimon',
		accent: '#fcd7ec'
	},
	{
		slug: '3d',
		title: 'Základy 3D grafiky',
		lecturer: 'David, Eliška',
		accent: '#d4ffe3'
	},
	{
		slug: 'gamedesign',
		title: 'Základy gamedesignu',
		lecturer: 'Matyáš, Ondřej',
		accent: '#ffeed9'
	},
	{
		slug: 'unity',
		title: 'Základy Unity',
		lecturer: 'Matyáš, Honza, Ondřej, Adam, Tobiáš, David',
		accent: '#f5c6c4'
	},
	{
		slug: 'project',
		title: 'Projektová práce',
		lecturer: 'Matyáš, Honza, Šimon, Ondřej, David, Adam',
		accent: '#dabef7'
	}
]

export function findSubjectBySlug(slug: string): Subject | undefined {
	return subjects.find(s => s.slug === slug)
}
