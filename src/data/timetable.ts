export type Slot = {
	time: string
	label?: string
}

export type DaySchedule = {
	day: string
	date: string
	slots: (string | null)[]
}

export const timeSlots: Slot[] = [
	{ time: '9:00–10:30' },
	{ time: '10:45–12:15' },
	{ time: '12:15–13:00', label: '🍽 Oběd' },
	{ time: '13:00–14:30' },
	{ time: '14:45–16:15' },
]

export const schedule: DaySchedule[] = [
	{
		day: 'Pondělí',
		date: '30. 6.',
		slots: ['csharp', 'csharp', null, '2d', '2d'],
	},
	{
		day: 'Úterý',
		date: '1. 7.',
		slots: ['csharp', 'csharp', null, 'gamedesign', 'gamedesign'],
	},
	{
		day: 'Středa',
		date: '2. 7.',
		slots: ['unity', 'unity', null, '3d', '3d'],
	},
	{
		day: 'Čtvrtek',
		date: '3. 7.',
		slots: ['unity', 'unity', null, '2d', '2d'],
	},
	{
		day: 'Pátek',
		date: '4. 7.',
		slots: ['3d', 'gamedesign', null, 'unity', null],
	},
]
