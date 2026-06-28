import { schedule, timeSlots } from '../data/timetable'
import { findSubjectBySlug } from '../data/subjects'

export default function Timetable() {
	return (
		<div className="mx-auto max-w-5xl">
			<h1 className="font-display mb-8 text-4xl font-extrabold">Rozvrh</h1>
			<div className="overflow-x-auto">
				<table className="border-ink w-full border-collapse border-2 text-sm">
					<thead>
						<tr className="bg-ink text-bg">
							<th className="border-ink border-2 px-4 py-3 text-left font-bold tracking-widest uppercase">
								Den
							</th>
							{timeSlots.map((slot) => (
								<th
									key={slot.time}
									className="border-ink border-2 px-4 py-3 text-left font-bold tracking-widest uppercase"
								>
									{slot.label ?? slot.time}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{schedule.map((day) => (
							<tr key={day.date} className="even:bg-accent/10">
								<td className="border-ink border-2 px-4 py-3 font-bold">
									<span className="block">{day.day}</span>
									<span className="text-muted text-xs font-normal">{day.date}</span>
								</td>
								{day.slots.map((slug, i) => {
									const subject = slug ? findSubjectBySlug(slug) : null
									const isLunch = timeSlots[i]?.label != null
									return (
										<td
											key={i}
											className="border-ink border-2 px-4 py-3"
											style={subject ? { backgroundColor: subject.accent } : undefined}
										>
											{isLunch ? (
												<span className="text-muted">–</span>
											) : subject ? (
												<span className="font-medium">{subject.title}</span>
											) : (
												<span className="text-muted">–</span>
											)}
										</td>
									)
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
