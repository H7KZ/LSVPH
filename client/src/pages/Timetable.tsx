import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TimetableTable } from '../components/TimetableTable'
import { findLecturerByName, lecturers } from '../data/lecturers'
import { groups } from '../data/timetable'

export default function Timetable() {
	const [activeGroup, setActiveGroup] = useState(0)
	const group = groups[activeGroup]

	const rows = group.days.map(day => ({
		day: day.day,
		date: day.date,
		cells: day.slots.map(slot => ({
			slot,
			isLunch: slot === null,
			content: slot && (
				<>
					<span className="block font-medium">{slot.label}</span>
					{slot.room && <span className="text-muted block text-xs">Učebna {slot.room}</span>}
					<span className="text-muted block text-xs">
						{slot.lecturers.map((name, i) => {
							const lecturer = findLecturerByName(name)
							return (
								<span key={name}>
									{i > 0 && ', '}
									{lecturer ? (
										<Link to={`/timetable/lektor/${lecturer.slug}`} className="hover:text-ink hover:underline">
											{name}
										</Link>
									) : (
										name
									)}
								</span>
							)
						})}
					</span>
				</>
			)
		}))
	}))

	return (
		<div className="mx-auto max-w-5xl">
			<p className="text-muted mb-4 text-sm">
				<Link to="/" className="hover:underline">
					← Domů
				</Link>{' '}
				/ Rozvrh
			</p>

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
			<div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
				<span className="text-muted text-xs font-bold tracking-widest uppercase">Lektoři:</span>
				{lecturers.map((lecturer, i) => (
					<span key={lecturer.slug} className="text-sm">
						{i > 0 && <span className="text-muted">, </span>}
						<Link to={`/timetable/lektor/${lecturer.slug}`} className="hover:text-accent hover:underline">
							{lecturer.name}
						</Link>
					</span>
				))}
			</div>
			<TimetableTable rows={rows} />
		</div>
	)
}
