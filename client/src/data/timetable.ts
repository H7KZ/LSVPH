export type SlotEntry = {
	label: string
	subjectSlug: string
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

export type LecturerDaySchedule = {
	day: string
	date: string
	entries: { time: string; group: string; slot: SlotEntry }[]
}

export const timeSlots = ['9:00–10:00', '10:00–11:00', '11:00–12:00', 'Oběd', '13:00–14:00', '14:00–15:00', '15:00–16:00']

const uvod: SlotEntry = { label: 'Úvod', room: '211', lecturers: ['Všichni'], subjectSlug: 'entry' }
const projekt = (room: string, l1: string, l2: string): SlotEntry => ({
	label: 'Projektová práce',
	subjectSlug: 'project',
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
					{ label: 'Základy Unity', subjectSlug: 'unity', room: '6', lecturers: ['Honza', 'Matyáš'] },
					{ label: 'Základy Unity', subjectSlug: 'unity', room: '6', lecturers: ['Honza', 'Matyáš'] },
					null,
					{ label: 'Základy Unity', subjectSlug: 'unity', room: '6', lecturers: ['Honza', 'Matyáš'] },
					{ label: 'Základy Unity', subjectSlug: 'unity', room: '6', lecturers: ['Honza', 'Matyáš'] },
					{ label: 'Základy Unity', subjectSlug: 'unity', room: '6', lecturers: ['Honza', 'Matyáš'] }
				]
			},
			{
				day: 'Čtvrtek',
				date: '9. 7.',
				slots: [
					projekt('6', 'Adam', 'Matyáš'),
					projekt('6', 'Adam', 'Matyáš'),
					projekt('6', 'Adam', 'Matyáš'),
					null,
					projekt('6', 'Adam', 'Matyáš'),
					projekt('6', 'Adam', 'Matyáš'),
					projekt('6', 'Adam', 'Matyáš')
				]
			},
			{
				day: 'Pátek',
				date: '10. 7.',
				slots: [
					projekt('6', 'Adam', 'Matyáš'),
					projekt('6', 'Adam', 'Matyáš'),
					projekt('6', 'Adam', 'Matyáš'),
					null,
					projekt('6', 'Adam', 'Matyáš'),
					projekt('6', 'Adam', 'Matyáš'),
					projekt('6', 'Adam', 'Matyáš')
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
						lecturers: ['Ondřej', 'David']
					},
					{
						label: 'Základy Unity',
						subjectSlug: 'unity',
						room: '109',
						lecturers: ['Ondřej', 'David']
					},
					null,
					{
						label: 'Základy Unity',
						subjectSlug: 'unity',
						room: '109',
						lecturers: ['Ondřej', 'David']
					},
					{
						label: 'Základy Unity',
						subjectSlug: 'unity',
						room: '109',
						lecturers: ['Ondřej', 'David']
					},
					{
						label: 'Základy Unity',
						subjectSlug: 'unity',
						room: '109',
						lecturers: ['Ondřej', 'David']
					}
				]
			},
			{
				day: 'Čtvrtek',
				date: '9. 7.',
				slots: [
					projekt('109', 'Ondřej', 'David'),
					projekt('109', 'Ondřej', 'David'),
					projekt('109', 'Ondřej', 'David'),
					null,
					projekt('109', 'Ondřej', 'David'),
					projekt('109', 'Ondřej', 'David'),
					projekt('109', 'Ondřej', 'David')
				]
			},
			{
				day: 'Pátek',
				date: '10. 7.',
				slots: [
					projekt('109', 'Ondřej', '-'),
					projekt('109', 'Ondřej', '-'),
					projekt('109', 'Ondřej', '-'),
					null,
					projekt('109', 'Ondřej', '-'),
					projekt('109', 'Ondřej', '-'),
					projekt('109', 'Ondřej', '-')
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
						lecturers: ['Tobiáš', 'Adam']
					},
					{
						label: 'Základy Unity',
						subjectSlug: 'unity',
						room: '13',
						lecturers: ['Tobiáš', 'Adam']
					},
					null,
					{
						label: 'Základy Unity',
						subjectSlug: 'unity',
						room: '13',
						lecturers: ['Tobiáš', 'Adam']
					},
					{
						label: 'Základy Unity',
						subjectSlug: 'unity',
						room: '13',
						lecturers: ['Tobiáš', 'Adam']
					},
					{
						label: 'Základy Unity',
						subjectSlug: 'unity',
						room: '13',
						lecturers: ['Tobiáš', 'Adam']
					}
				]
			},
			{
				day: 'Čtvrtek',
				date: '9. 7.',
				slots: [
					projekt('13', 'Šimon', 'Honza'),
					projekt('13', 'Šimon', 'Honza'),
					projekt('13', 'Šimon', 'Honza'),
					null,
					projekt('13', 'Šimon', 'Honza'),
					projekt('13', 'Šimon', 'Honza'),
					projekt('13', 'Šimon', 'Honza')
				]
			},
			{
				day: 'Pátek',
				date: '10. 7.',
				slots: [
					projekt('13', 'Šimon', 'Honza'),
					projekt('13', 'Šimon', 'Honza'),
					projekt('13', 'Šimon', 'Honza'),
					null,
					projekt('13', 'Šimon', 'Honza'),
					projekt('13', 'Šimon', 'Honza'),
					projekt('13', 'Šimon', 'Honza')
				]
			}
		]
	}
]

const obedSlot: SlotEntry = { label: 'Oběd', subjectSlug: '', room: null, lecturers: [] }

export function getLecturerSchedule(name: string): LecturerDaySchedule[] {
	return groups[0].days.map((day, dayIndex) => {
		const entries: { time: string; group: string; slot: SlotEntry }[] = []
		timeSlots.forEach((time, slotIndex) => {
			for (const group of groups) {
				const slot = group.days[dayIndex].slots[slotIndex]
				if (slot && slot.lecturers.includes(name)) {
					entries.push({ time, group: group.name, slot })
				}
			}
		})
		const teachesRightAfterUvod = entries.some(e => e.time === timeSlots[1])
		const uvodSlot = groups[0].days[dayIndex].slots[0]
		if (teachesRightAfterUvod && uvodSlot && uvodSlot.subjectSlug === 'entry') {
			entries.unshift({ time: timeSlots[0], group: '', slot: uvodSlot })
		}
		const morningTimes = new Set(timeSlots.slice(0, timeSlots.indexOf('Oběd')))
		const beforeLunchIndex = entries.reduce((last, e, i) => (morningTimes.has(e.time) ? i : last), -1)
		if (beforeLunchIndex !== -1) {
			entries.splice(beforeLunchIndex + 1, 0, { time: 'Oběd', group: '', slot: obedSlot })
		}
		return { day: day.day, date: day.date, entries }
	})
}
