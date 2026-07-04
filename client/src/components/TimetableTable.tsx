import type { ReactNode } from 'react'
import { findSubjectBySlug } from '../data/subjects'
import { timeSlots, type SlotEntry } from '../data/timetable'

type Cell = { slot: SlotEntry | null; content: ReactNode; isLunch?: boolean }
export type TimetableRow = { day: string; date: string; cells: Cell[] }

export function TimetableTable({ rows }: { rows: TimetableRow[] }) {
	return (
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
					{rows.map(row => (
						<tr key={row.date}>
							<td className="border-ink border-2 px-3 py-3 font-bold whitespace-nowrap">
								<span className="block">{row.day}</span>
								<span className="text-muted text-xs font-normal">{row.date}</span>
							</td>
							{row.cells.map((cell, i) => {
								const subject = cell.slot?.subjectSlug ? findSubjectBySlug(cell.slot.subjectSlug) : null
								return (
									<td key={i} className="border-ink border-2 px-3 py-3" style={subject ? { backgroundColor: subject.accent } : undefined}>
										{cell.isLunch ? <span className="text-muted flex items-center justify-center text-center">🍽</span> : cell.content}
									</td>
								)
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
