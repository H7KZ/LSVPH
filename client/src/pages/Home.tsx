import { Link } from 'react-router-dom'
import SubjectCard from '../components/SubjectCard'
import { subjects } from '../data/subjects'

export default function Home() {
	return (
		<div className="mx-auto max-w-4xl">
			<div className="border-ink mb-12 border-b-2 pb-10">
				<p className="text-muted mb-3 text-xs font-bold tracking-widest uppercase">Letní Škola Vývoje Počítačových Her — 5. ročník</p>
				<h1 className="font-display mb-4 text-4xl leading-none font-extrabold tracking-tight sm:text-5xl">LŠVPH 2026</h1>
				<p className="text-muted max-w-xl text-lg">Týden plný programování, grafiky a game designu. Vytvoříš svoji první hru.</p>
				<div className="mt-6 flex flex-wrap gap-3">
					<Link
						to="/timetable"
						className="border-ink bg-accent hover:bg-ink hover:text-accent inline-block border-2 px-5 py-2 text-sm font-bold tracking-widest uppercase transition-colors"
					>
						Rozvrh
					</Link>
					<Link
						to="/lunch"
						className="border-ink hover:bg-ink hover:text-bg inline-block border-2 px-5 py-2 text-sm font-bold tracking-widest uppercase transition-colors"
					>
						Obědy
					</Link>
					<Link
						to="/presentations"
						className="border-ink hover:bg-ink hover:text-bg inline-block border-2 px-5 py-2 text-sm font-bold tracking-widest uppercase transition-colors"
					>
						Prezentace
					</Link>
					<Link
						to="/projects"
						className="border-ink hover:bg-ink hover:text-bg inline-block border-2 px-5 py-2 text-sm font-bold tracking-widest uppercase transition-colors"
					>
						Projekty
					</Link>
				</div>
			</div>

			<h2 className="font-display mb-6 text-2xl font-bold">Co tě čeká</h2>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{subjects.map(s => (
					<SubjectCard key={s.slug} subject={s} />
				))}
			</div>
		</div>
	)
}
