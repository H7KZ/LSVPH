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
						{day.items.length === 0 ? (
							<p className="text-muted text-sm">Menu zatím není k dispozici.</p>
						) : (
							<ul className="flex flex-col gap-2">
								{day.items.map((item, i) => (
									<li key={i} className="text-sm">
										<span className="text-muted text-xs font-bold tracking-widest uppercase">{item.label}: </span>
										<span className="font-medium">{item.name}</span>

										{/*{item.allergensUnknown ? (*/}
										{/*	<span className="text-muted ml-2 text-xs">Alergeny: ? <em>(zeptejte se vedoucích)</em></span>*/}
										{/*) : item.allergens.length > 0 ? (*/}
										{/*	<span className="text-muted ml-2 text-xs">Alergeny: {item.allergens.join(', ')}</span>*/}
										{/*) : null}*/}

										{item.note && <p className="text-muted mt-1 text-xs italic">{item.note}</p>}
									</li>
								))}
							</ul>
						)}
						{day.note && <p className="border-ink/20 text-muted mt-3 border-t pt-3 text-xs">{day.note}</p>}
					</div>
				))}
			</div>
		</div>
	)
}
