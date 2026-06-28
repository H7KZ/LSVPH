export type LunchDay = {
	day: string
	date: string
	soup: string
	main: string
	note?: string
}

export const lunchMenu: LunchDay[] = [
	{
		day: 'Pondělí',
		date: '30. 6.',
		soup: 'Kuřecí vývar s nudlemi',
		main: 'Svíčková na smetaně, houskový knedlík',
	},
	{
		day: 'Úterý',
		date: '1. 7.',
		soup: 'Zeleninová polévka',
		main: 'Smažený řízek, bramborový salát',
	},
	{
		day: 'Středa',
		date: '2. 7.',
		soup: 'Hovězí vývar se zeleninou',
		main: 'Vepřová pečeně, dušené zelí, knedlík',
	},
	{
		day: 'Čtvrtek',
		date: '3. 7.',
		soup: 'Čočková polévka',
		main: 'Grilované kuře, rýže, salát',
	},
	{
		day: 'Pátek',
		date: '4. 7.',
		soup: 'Rajská polévka',
		main: 'Pizza Margherita',
		note: 'Poslední den školy 🎉',
	},
]
