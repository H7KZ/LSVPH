import { Link, useParams } from 'react-router-dom'
import { TimetableTable } from '../components/TimetableTable'
import { findLecturerBySlug } from '../data/lecturers'
import { getLecturerSchedule, timeSlots } from '../data/timetable'
import NotFound from './NotFound'

export default function LecturerTimetable() {
	const { slug } = useParams<{ slug: string }>()
	const lecturer = slug ? findLecturerBySlug(slug) : undefined

	if (!lecturer) return <NotFound />

	const schedule = getLecturerSchedule(lecturer.name)

	const rows = schedule.map(day => {
		const byTime = new Map(day.entries.map(e => [e.time, e]))
		return {
			day: day.day,
			date: day.date,
			cells: timeSlots.map(time => {
				const entry = byTime.get(time)
				const isLunch = entry?.slot.subjectSlug === ''
				return {
					slot: entry?.slot ?? null,
					isLunch,
					lunchPaid: entry?.lunchPaid,
					content: entry && !isLunch && (
						<>
							<span className="block font-medium">{entry.slot.label}</span>
							{entry.slot.room && <span className="text-muted block text-xs">Učebna {entry.slot.room}</span>}
							{entry.group && <span className="text-muted block text-xs">Skupina {entry.group}</span>}
						</>
					)
				}
			})
		}
	})

	return (
		<div className="mx-auto max-w-5xl">
			<p className="text-muted mb-4 text-sm">
				<Link to="/" className="hover:underline">
					← Domů
				</Link>
				{' / '}
				<Link to="/timetable" className="hover:underline">
					Rozvrh
				</Link>{' '}
				/ {lecturer.name}
			</p>
			<h1 className="font-display mb-6 text-4xl font-extrabold">Rozvrh — {lecturer.name}</h1>
			<TimetableTable rows={rows} />
		</div>
	)
}
