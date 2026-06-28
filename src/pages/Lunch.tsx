import { lunchMenu } from '../data/lunch'

export default function Lunch() {
	return (
		<div className="mx-auto max-w-2xl">
			<h1 className="font-display mb-8 text-4xl font-extrabold">Obědy</h1>
			<div className="flex flex-col gap-4">
				{lunchMenu.map(day => (
					<div key={day.date} className="border-ink border-2 p-5">
						<div className="mb-3 flex items-baseline justify-between">
							<h2 className="font-display text-xl font-bold">{day.day}</h2>
							<span className="text-muted text-xs font-bold tracking-widest uppercase">{day.date}</span>
						</div>
						<p className="text-muted mb-1 text-sm">
							<span className="text-ink font-medium">Polévka:</span> {day.soup}
						</p>
						<p className="text-muted text-sm">
							<span className="text-ink font-medium">Hlavní jídlo:</span> {day.main}
						</p>
						{day.note && <p className="border-ink/20 text-muted mt-3 border-t pt-3 text-xs">{day.note}</p>}
					</div>
				))}
			</div>
		</div>
	)
}
