import { Link } from 'react-router-dom'
import { projectCompletedCount, projects } from '../data/projects'

export default function Projects() {
	return (
		<div className="mx-auto max-w-4xl">
			<p className="text-muted mb-4 text-sm">
				<Link to="/" className="hover:underline">
					← Domů
				</Link>{' '}
				/ Projekty
			</p>

			<h1 className="font-display mb-2 text-4xl font-extrabold">Projekty</h1>
			<p className="text-muted mb-10 max-w-prose">
				Vyber hru a postupuj lekci po lekci. Každá lekce má prezentaci a checklist — odškrtni splněné kroky a jdi dál.
			</p>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{projects.map(project => {
					const completed = projectCompletedCount(project)
					return (
						<Link
							key={project.slug}
							to={`/projects/${project.slug}`}
							className="border-ink block border-2 transition-shadow hover:shadow-[4px_4px_0_#000]"
						>
							<div className="border-ink border-b-2 p-6 text-center" style={{ backgroundColor: project.accent }}>
								<div className="mb-2 text-4xl">{project.emoji}</div>
								<h2 className="font-display font-bold">{project.title}</h2>
							</div>
							<div className="bg-bg p-4">
								<p className="text-muted mb-3 text-sm">{project.description}</p>
								<div className="mb-4 flex flex-wrap gap-2">
									<span className="border-ink border px-2 py-0.5 text-xs">{project.lessons.length} lekcí</span>
									<span className="border-ink border px-2 py-0.5 text-xs">{project.lessons.reduce((sum, l) => sum + l.duration, 0)} min</span>
									{completed > 0 && (
										<span className="border-ink border bg-[#d4ffe3] px-2 py-0.5 text-xs">
											{completed} / {project.lessons.length} ✓
										</span>
									)}
								</div>
								<div className="bg-ink text-accent py-2 text-center text-xs font-bold tracking-widest uppercase">
									{completed > 0 ? 'POKRAČOVAT →' : 'ZAČÍT →'}
								</div>
							</div>
						</Link>
					)
				})}
			</div>
		</div>
	)
}
