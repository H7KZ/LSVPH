import type { Subject } from '../data/subjects'

export default function SubjectCard({ subject }: { subject: Subject }) {
	return (
		<div className="border-ink border-2 p-5" style={{ backgroundColor: subject.accent }}>
			<p className="text-muted mb-1 text-xs font-bold tracking-widest uppercase">{subject.lecturer}</p>
			<h3 className="font-display text-lg leading-tight font-bold">{subject.title}</h3>
		</div>
	)
}
