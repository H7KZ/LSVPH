import { Link } from 'react-router-dom'
import type { Subject } from '../data/subjects'

export default function SubjectCard({ subject }: { subject: Subject }) {
	return (
		<Link
			to={`/presentations#${subject.slug}`}
			className="border-ink block border-2 p-5 transition-shadow hover:shadow-[4px_4px_0_#000]"
			style={{ backgroundColor: subject.accent }}
		>
			<p className="text-muted mb-1 text-xs font-bold tracking-widest uppercase">
				{subject.lecturer}
			</p>
			<h3 className="font-display mb-2 text-lg leading-tight font-bold">{subject.title}</h3>
			<p className="text-muted text-sm">{subject.description}</p>
		</Link>
	)
}
