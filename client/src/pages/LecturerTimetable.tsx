import { Link, useParams } from 'react-router-dom'
import { findLecturerBySlug } from '../data/lecturers'
import { findSubjectBySlug } from '../data/subjects'
import { getLecturerSchedule, timeSlots } from '../data/timetable'
import NotFound from './NotFound'

export default function LecturerTimetable() {
	const { slug } = useParams<{ slug: string }>()
	const lecturer = slug ? findLecturerBySlug(slug) : undefined

	if (!lecturer) return <NotFound />

	const schedule = getLecturerSchedule(lecturer.name)

	return (
		<div className="mx-auto max-w-5xl">
			<Link to="/timetable" className="text-muted mb-6 inline-block text-sm hover:underline">
				← Zpět na rozvrh
			</Link>

			<h1 className="font-display mb-6 text-4xl font-extrabold">Rozvrh — {lecturer.name}</h1>

			<div className="overflow-x-auto">
				<table className="border-ink w-full border-collapse border-2 text-sm">
					<thead>
						<tr className="bg-ink text-bg">
							<th className="border-ink border-2 px-3 py-3 text-left font-bold tracking-widest whitespace-nowrap uppercase">Den</th>
							{timeSlots.map(slot => (
								<th key={slot} className="border-ink border-2 px-3 py-3 text-left font-bold tracking-widest whitespace-nowrap uppercase">
									{slot}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{schedule.map(day => {
							const byTime = new Map(day.entries.map(entry => [entry.time, entry]))
							return (
								<tr key={day.date}>
									<td className="border-ink border-2 px-3 py-3 font-bold whitespace-nowrap">
										<span className="block">{day.day}</span>
										<span className="text-muted text-xs font-normal">{day.date}</span>
									</td>
									{timeSlots.map(time => {
										const entry = byTime.get(time)
										const subject = entry ? findSubjectBySlug(entry.slot.subjectSlug) : null
										return (
											<td key={time} className="border-ink border-2 px-3 py-3" style={subject ? { backgroundColor: subject.accent } : undefined}>
												{entry && (
													<>
														<span className="block font-medium">{entry.slot.label}</span>
														{entry.slot.room && <span className="text-muted block text-xs">Učebna {entry.slot.room}</span>}
														{entry.group && <span className="text-muted block text-xs">Skupina {entry.group}</span>}
													</>
												)}
											</td>
										)
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
