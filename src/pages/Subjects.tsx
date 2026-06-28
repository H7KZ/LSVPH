import SubjectCard from '../components/SubjectCard'
import { subjects } from '../data/subjects'

export default function Subjects() {
	return (
		<div className="mx-auto max-w-4xl">
			<h1 className="font-display mb-8 text-4xl font-extrabold">Předměty</h1>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{subjects.map((s) => (
					<SubjectCard key={s.slug} subject={s} />
				))}
			</div>
		</div>
	)
}
