export type LunchDay = {
	day: string
	date: string
	soup: string
	main: string
	note?: string
}

export const lunchMenu: LunchDay[] = [
	{ day: 'Pondělí', date: '6. 7.', soup: '–', main: '–' },
	{ day: 'Úterý', date: '7. 7.', soup: '–', main: '–' },
	{ day: 'Středa', date: '8. 7.', soup: '–', main: '–' },
	{ day: 'Čtvrtek', date: '9. 7.', soup: '–', main: '–' },
	{ day: 'Pátek', date: '10. 7.', soup: '–', main: '–' }
]
