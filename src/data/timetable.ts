export type SlotEntry = {
	label: string
	subjectSlug?: string
	room: string | null
	lecturers: string[]
}

export type GroupDay = {
	day: string
	date: string
	slots: (SlotEntry | null)[] // null = oběd, 7 slots total
}

export type Group = {
	name: string
	days: GroupDay[]
}

export const timeSlots = ['9:00–10:00', '10:00–11:00', '11:00–12:00', 'Oběd', '13:00–14:00', '14:00–15:00', '15:00–16:00']

const uvod: SlotEntry = { label: 'Úvod', room: '211', lecturers: ['Všichni'] }
const projekt = (room: string, l1: string, l2: string): SlotEntry => ({
	label: 'Projekt',
	room,
	lecturers: [l1, l2]
})

export const groups: Group[] = [
	{
		name: 'A',
		days: [
			{
				day: 'Pondělí',
				date: '6. 7.',
				slots: [
					uvod,
					{
						label: 'Základy programování',
						subjectSlug: 'csharp',
						room: '6',
						lecturers: ['Matyáš', 'Eliška']
					},
					{
						label: 'Základy programování',
						subjectSlug: 'csharp',
						room: '6',
						lecturers: ['Matyáš', 'Eliška']
					},
					null,
					{
						label: 'Základy programování',
						subjectSlug: 'csharp',
						room: '6',
						lecturers: ['Matyáš', 'Eliška']
					},
					{ label: 'Základy 2D', subjectSlug: '2d', room: '6', lecturers: ['Šimon', 'Honza'] },
					{ label: 'Základy 2D', subjectSlug: '2d', room: '6', lecturers: ['Šimon', 'Honza'] }
				]
			},
			{
				day: 'Úterý',
				date: '7. 7.',
				slots: [
					{
						label: 'Základy gamedesignu',
						subjectSlug: 'gamedesign',
						room: '6',
						lecturers: ['Ondřej', 'Matyáš']
					},
					{
						label: 'Základy gamedesignu',
						subjectSlug: 'gamedesign',
						room: '6',
						lecturers: ['Ondřej', 'Matyáš']
					},
					{
						label: 'Základy programování',
						subjectSlug: 'csharp',
						room: '6',
						lecturers: ['Matyáš', 'Eliška']
					},
					null,
					{
						label: 'Základy programování',
						subjectSlug: 'csharp',
						room: '6',
						lecturers: ['Matyáš', 'Eliška']
					},
					{
						label: 'Základy Blenderu',
						subjectSlug: '3d',
						room: '6',
						lecturers: ['David', 'Eliška']
					},
					{
						label: 'Základy Blenderu',
						subjectSlug: '3d',
						room: '6',
						lecturers: ['David', 'Eliška']
					}
				]
			},
			{
				day: 'Středa',
				date: '8. 7.',
				slots: [
					{
						label: 'Základy programování',
						subjectSlug: 'csharp',
						room: '6',
						lecturers: ['Matyáš', 'Eliška']
					},
					{ label: 'Základy Unity', subjectSlug: 'unity', room: '6', lecturers: ['Ondřej', 'TBD'] },
					{ label: 'Základy Unity', subjectSlug: 'unity', room: '6', lecturers: ['Ondřej', 'TBD'] },
					null,
					{ label: 'Základy Unity', subjectSlug: 'unity', room: '6', lecturers: ['Ondřej', 'TBD'] },
					{ label: 'Základy Unity', subjectSlug: 'unity', room: '6', lecturers: ['Ondřej', 'TBD'] },
					{ label: 'Základy Unity', subjectSlug: 'unity', room: '6', lecturers: ['Ondřej', 'TBD'] }
				]
			},
			{
				day: 'Čtvrtek',
				date: '9. 7.',
				slots: [
					projekt('6', 'Matyáš', 'David'),
					projekt('6', 'Matyáš', 'David'),
					projekt('6', 'Matyáš', 'David'),
					null,
					projekt('6', 'Matyáš', 'David'),
					projekt('6', 'Matyáš', 'David'),
					projekt('6', 'Matyáš', 'David')
				]
			},
			{
				day: 'Pátek',
				date: '10. 7.',
				slots: [
					projekt('6', 'Matyáš', 'David'),
					projekt('6', 'Matyáš', 'David'),
					projekt('6', 'Matyáš', 'David'),
					null,
					projekt('6', 'Matyáš', 'David'),
					projekt('6', 'Matyáš', 'David'),
					projekt('6', 'Matyáš', 'David')
				]
			}
		]
	},
	{
		name: 'B',
		days: [
			{
				day: 'Pondělí',
				date: '6. 7.',
				slots: [
					uvod,
					{
						label: 'Základy programování',
						subjectSlug: 'csharp',
						room: '109',
						lecturers: ['Honza', 'Ondřej']
					},
					{
						label: 'Základy programování',
						subjectSlug: 'csharp',
						room: '109',
						lecturers: ['Honza', 'Ondřej']
					},
					null,
					{
						label: 'Základy programování',
						subjectSlug: 'csharp',
						room: '109',
						lecturers: ['Honza', 'Ondřej']
					},
					{
						label: 'Základy Blenderu',
						subjectSlug: '3d',
						room: '109',
						lecturers: ['David', 'Eliška']
					},
					{
						label: 'Základy Blenderu',
						subjectSlug: '3d',
						room: '109',
						lecturers: ['David', 'Eliška']
					}
				]
			},
			{
				day: 'Úterý',
				date: '7. 7.',
				slots: [
					{ label: 'Základy 2D', subjectSlug: '2d', room: '109', lecturers: ['Šimon', 'Honza'] },
					{ label: 'Základy 2D', subjectSlug: '2d', room: '109', lecturers: ['Šimon', 'Honza'] },
					{
						label: 'Základy programování',
						subjectSlug: 'csharp',
						room: '109',
						lecturers: ['Honza', 'Ondřej']
					},
					null,
					{
						label: 'Základy programování',
						subjectSlug: 'csharp',
						room: '109',
						lecturers: ['Honza', 'Ondřej']
					},
					{
						label: 'Základy gamedesignu',
						subjectSlug: 'gamedesign',
						room: '109',
						lecturers: ['Ondřej', 'Matyáš']
					},
					{
						label: 'Základy gamedesignu',
						subjectSlug: 'gamedesign',
						room: '109',
						lecturers: ['Ondřej', 'Matyáš']
					}
				]
			},
			{
				day: 'Středa',
				date: '8. 7.',
				slots: [
					{
						label: 'Základy programování',
						subjectSlug: 'csharp',
						room: '109',
						lecturers: ['Honza', 'Ondřej']
					},
					{
						label: 'Základy Unity',
						subjectSlug: 'unity',
						room: '109',
						lecturers: ['Adam', 'Matyáš']
					},
					{
						label: 'Základy Unity',
						subjectSlug: 'unity',
						room: '109',
						lecturers: ['Adam', 'Matyáš']
					},
					null,
					{
						label: 'Základy Unity',
						subjectSlug: 'unity',
						room: '109',
						lecturers: ['Adam', 'Matyáš']
					},
					{
						label: 'Základy Unity',
						subjectSlug: 'unity',
						room: '109',
						lecturers: ['Adam', 'Matyáš']
					},
					{
						label: 'Základy Unity',
						subjectSlug: 'unity',
						room: '109',
						lecturers: ['Adam', 'Matyáš']
					}
				]
			},
			{
				day: 'Čtvrtek',
				date: '9. 7.',
				slots: [
					projekt('109', 'Honza', 'Šimon'),
					projekt('109', 'Honza', 'Šimon'),
					projekt('109', 'Honza', 'Šimon'),
					null,
					projekt('109', 'Honza', 'Šimon'),
					projekt('109', 'Honza', 'Šimon'),
					projekt('109', 'Honza', 'Šimon')
				]
			},
			{
				day: 'Pátek',
				date: '10. 7.',
				slots: [
					projekt('109', 'Honza', 'Šimon'),
					projekt('109', 'Honza', 'Šimon'),
					projekt('109', 'Honza', 'Šimon'),
					null,
					projekt('109', 'Honza', 'Šimon'),
					projekt('109', 'Honza', 'Šimon'),
					projekt('109', 'Honza', 'Šimon')
				]
			}
		]
	},
	{
		name: 'C',
		days: [
			{
				day: 'Pondělí',
				date: '6. 7.',
				slots: [
					uvod,
					{
						label: 'Základy programování',
						subjectSlug: 'csharp',
						room: '13',
						lecturers: ['Šimon', 'Adam']
					},
					{
						label: 'Základy programování',
						subjectSlug: 'csharp',
						room: '13',
						lecturers: ['Šimon', 'Adam']
					},
					null,
					{
						label: 'Základy programování',
						subjectSlug: 'csharp',
						room: '13',
						lecturers: ['Šimon', 'Adam']
					},
					{
						label: 'Základy gamedesignu',
						subjectSlug: 'gamedesign',
						room: '13',
						lecturers: ['Ondřej', 'Matyáš']
					},
					{
						label: 'Základy gamedesignu',
						subjectSlug: 'gamedesign',
						room: '13',
						lecturers: ['Ondřej', 'Matyáš']
					}
				]
			},
			{
				day: 'Úterý',
				date: '7. 7.',
				slots: [
					{
						label: 'Základy Blenderu',
						subjectSlug: '3d',
						room: '13',
						lecturers: ['David', 'Eliška']
					},
					{
						label: 'Základy Blenderu',
						subjectSlug: '3d',
						room: '13',
						lecturers: ['David', 'Eliška']
					},
					{
						label: 'Základy programování',
						subjectSlug: 'csharp',
						room: '13',
						lecturers: ['Šimon', 'Adam']
					},
					null,
					{
						label: 'Základy programování',
						subjectSlug: 'csharp',
						room: '13',
						lecturers: ['Šimon', 'Adam']
					},
					{ label: 'Základy 2D', subjectSlug: '2d', room: '13', lecturers: ['Honza', 'Šimon'] },
					{ label: 'Základy 2D', subjectSlug: '2d', room: '13', lecturers: ['Honza', 'Šimon'] }
				]
			},
			{
				day: 'Středa',
				date: '8. 7.',
				slots: [
					{
						label: 'Základy programování',
						subjectSlug: 'csharp',
						room: '13',
						lecturers: ['Šimon', 'Adam']
					},
					{
						label: 'Základy Unity',
						subjectSlug: 'unity',
						room: '13',
						lecturers: ['Tobiáš', 'Honza']
					},
					{
						label: 'Základy Unity',
						subjectSlug: 'unity',
						room: '13',
						lecturers: ['Tobiáš', 'Honza']
					},
					null,
					{
						label: 'Základy Unity',
						subjectSlug: 'unity',
						room: '13',
						lecturers: ['Tobiáš', 'Honza']
					},
					{
						label: 'Základy Unity',
						subjectSlug: 'unity',
						room: '13',
						lecturers: ['Tobiáš', 'Honza']
					},
					{
						label: 'Základy Unity',
						subjectSlug: 'unity',
						room: '13',
						lecturers: ['Tobiáš', 'Honza']
					}
				]
			},
			{
				day: 'Čtvrtek',
				date: '9. 7.',
				slots: [
					projekt('13', 'Ondřej', 'Adam'),
					projekt('13', 'Ondřej', 'Adam'),
					projekt('13', 'Ondřej', 'Adam'),
					null,
					projekt('13', 'Ondřej', 'Adam'),
					projekt('13', 'Ondřej', 'Adam'),
					projekt('13', 'Ondřej', 'Adam')
				]
			},
			{
				day: 'Pátek',
				date: '10. 7.',
				slots: [
					projekt('13', 'Ondřej', 'Adam'),
					projekt('13', 'Ondřej', 'Adam'),
					projekt('13', 'Ondřej', 'Adam'),
					null,
					projekt('13', 'Ondřej', 'Adam'),
					projekt('13', 'Ondřej', 'Adam'),
					projekt('13', 'Ondřej', 'Adam')
				]
			}
		]
	}
]
