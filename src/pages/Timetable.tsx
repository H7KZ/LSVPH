import { useState } from 'react'
import { groups, timeSlots } from '../data/timetable'
import { findSubjectBySlug } from '../data/subjects'

export default function Timetable() {
	const [activeGroup, setActiveGroup] = useState(0)
	const group = groups[activeGroup]

	return (
		<div className="mx-auto max-w-5xl">
			<h1 className="font-display mb-6 text-4xl font-extrabold">Rozvrh</h1>

			<div className="mb-6 flex gap-2">
				{groups.map((g, i) => (
					<button
						key={g.name}
						onClick={() => setActiveGroup(i)}
						className={`border-ink cursor-pointer border-2 px-5 py-2 text-sm font-bold tracking-widest uppercase transition-colors ${
							i === activeGroup ? 'bg-accent' : 'hover:bg-ink hover:text-bg'
						}`}
					>
						Skupina {g.name}
					</button>
				))}
			</div>

			<div className="overflow-x-auto">
				<table className="border-ink w-full border-collapse border-2 text-sm">
					<thead>
						<tr className="bg-ink text-bg">
							<th className="border-ink border-2 px-3 py-3 text-left font-bold tracking-widest whitespace-nowrap uppercase">
								Den
							</th>
							{timeSlots.map((slot) => (
								<th
									key={slot}
									className="border-ink border-2 px-3 py-3 text-left font-bold tracking-widest whitespace-nowrap uppercase"
								>
									{slot}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{group.days.map((day) => (
							<tr key={day.date} className="even:bg-accent/10">
								<td className="border-ink border-2 px-3 py-3 font-bold whitespace-nowrap">
									<span className="block">{day.day}</span>
									<span className="text-muted text-xs font-normal">{day.date}</span>
								</td>
								{day.slots.map((slot, i) => {
									const subject = slot?.subjectSlug ? findSubjectBySlug(slot.subjectSlug) : null
									return (
										<td
											key={i}
											className="border-ink border-2 px-3 py-3"
											style={subject ? { backgroundColor: subject.accent } : undefined}
										>
											{slot === null ? (
												<span className="text-muted">🍽 Oběd</span>
											) : (
												<>
													<span className="block font-medium">{slot.label}</span>
													{slot.room && (
														<span className="text-muted block text-xs">Učebna {slot.room}</span>
													)}
													<span className="text-muted block text-xs">
														{slot.lecturers.join(', ')}
													</span>
												</>
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
