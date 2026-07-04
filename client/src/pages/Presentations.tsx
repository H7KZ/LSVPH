import { Link } from 'react-router-dom'
import { presentationsForSubject } from '../data/presentations'
import { subjects } from '../data/subjects'

export default function Presentations() {
	return (
		<div className="mx-auto max-w-4xl">
			<p className="text-muted mb-4 text-sm">
				<Link to="/" className="hover:underline">
					← Domů
				</Link>{' '}
				/ Prezentace
			</p>

			<h1 className="font-display mb-2 text-4xl font-extrabold">Prezentace</h1>
			<p className="text-muted mb-10 max-w-prose">Prezentace k jednotlivým předmětům. Klikni na některou a spusť ji.</p>

			<div className="space-y-10">
				{subjects.map(subject => {
					const items = presentationsForSubject(subject.slug)
					return (
						<section key={subject.slug} id={subject.slug}>
							<h2 className="font-display border-ink mb-4 border-b-2 pb-2 text-2xl font-bold">{subject.title}</h2>

							{items.length === 0 ? (
								<p className="text-muted text-sm italic">Prezentace se připravují.</p>
							) : (
								<ul className="space-y-2">
									{items.map(p => (
										<li key={p.slug}>
											<Link
												to={`/presentation/${p.slug}`}
												target="_blank"
												rel="noopener noreferrer"
												className="border-ink flex items-center justify-between border-2 px-4 py-3 transition-shadow hover:shadow-[4px_4px_0_#000]"
												style={{ backgroundColor: subject.accent }}
											>
												<span className="font-body font-medium">{p.title}</span>
												<span className="font-body text-sm font-bold">▶ Spustit ↗</span>
											</Link>
										</li>
									))}
								</ul>
							)}
						</section>
					)
				})}
			</div>
		</div>
	)
}
