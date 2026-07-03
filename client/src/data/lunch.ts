export type FoodItem = {
	name: string
	label: string
	allergens: number[]
	allergensUnknown?: boolean
	note?: string
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
			{ label: 'Polévka', name: 'Brokolicová polévka', allergens: [], allergensUnknown: true },
			{ label: 'Hlavní jídlo', name: 'Pečené kuřecí stehno, šťouchaný brambor', allergens: [], allergensUnknown: true }
		]
	},
	{
		day: 'Úterý',
		date: '7. 7.',
		items: [
			{ label: 'Polévka', name: 'Vývar, maso, zelenina, nudle', allergens: [1] },
			{ label: 'Hlavní jídlo', name: 'Kuřecí steak, bramborová kaše', allergens: [7] }
		]
	},
	{
		day: 'Středa',
		date: '8. 7.',
		items: [
			{ label: 'Polévka', name: 'Pórková polévka', allergens: [], allergensUnknown: true },
			{ label: 'Hlavní jídlo', name: 'File na roštu, červená čočka s kukuřicí', allergens: [], allergensUnknown: true }
		]
	},
	{
		day: 'Čtvrtek',
		date: '9. 7.',
		items: [
			{ label: 'Polévka', name: 'Zeleninový krém', allergens: [], allergensUnknown: true, note: 'Bezlepková dieta: rajčata s mozzarellou' },
			{ label: 'Hlavní jídlo', name: 'Těstovinový salát s kuřecím masem', allergens: [1, 3], note: 'Alergie: tofu se zeleninou a bulgur' }
		]
	},
	{
		day: 'Pátek',
		date: '10. 7.',
		items: [
			{ label: 'Polévka', name: 'Čočková polévka', allergens: [], allergensUnknown: true },
			{ label: 'Hlavní jídlo', name: 'Vepřový řízek, vařený brambor', allergens: [1, 3], note: 'Alergie: losos na grilu, vařený brambor' }
		]
	}
]
