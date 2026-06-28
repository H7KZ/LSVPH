export type Subject = {
	slug: string
	title: string
	lecturer: string
	description: string
	accent: string // hex color, applied via style={{ backgroundColor }}
}

export const subjects: Subject[] = [
	{
		slug: 'csharp',
		title: 'Základy programování v C#',
		lecturer: 'Jan Komínek',
		description: 'Proměnné, podmínky, cykly, třídy a základy OOP.',
		accent: '#dbeafe'
	},
	{
		slug: '2d',
		title: 'Základy 2D grafiky',
		lecturer: 'Jan Komínek',
		description: 'Vektorová vs. rastrová grafika. Práce ve Figmě.',
		accent: '#fce7f3'
	},
	{
		slug: '3d',
		title: 'Základy 3D grafiky',
		lecturer: 'TBD',
		description: 'Blender pro herní vývojáře. Tvorba a export herních assetů.',
		accent: '#dcfce7'
	},
	{
		slug: 'gamedesign',
		title: 'Úvod do Game Designu',
		lecturer: 'TBD',
		description: 'Co dělá hru zábavnou. Herní mechaniky, smyčky, balance.',
		accent: '#fff7ed'
	},
	{
		slug: 'unity',
		title: 'Vývoj v Unity',
		lecturer: 'TBD',
		description: 'GameObjects, komponenty, fyzika a tvorba první 3D hry.',
		accent: '#f0fdf4'
	}
]

export function findSubjectBySlug(slug: string): Subject | undefined {
	return subjects.find(s => s.slug === slug)
}
