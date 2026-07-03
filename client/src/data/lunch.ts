export type FoodItem = {
	name: string
	label: string
	allergens: number[]
}

export type LunchDay = {
	day: string
	date: string
	items: FoodItem[]
	note?: string
}

export const lunchMenu: LunchDay[] = [
	{
		day: 'Pondělí',
		date: '6. 7.',
		items: [
			{ label: 'PhÕlévka', name: 'Rajská s 10 koulemi', allergens: [1, 7] },
			{ label: 'Hlavní (nádraží)', name: 'Svíčková se šesti', allergens: [1, 3, 7] },
			{ label: 'Vegetariánské kuře', name: 'Rizoto s 20 šufánky', allergens: [6] }
		]
	},
	{ day: 'Úterý', date: '7. 7.', items: [] },
	{ day: 'Středa', date: '8. 7.', items: [] },
	{ day: 'Čtvrtek', date: '9. 7.', items: [] },
	{ day: 'Pátek', date: '10. 7.', items: [] }
]
