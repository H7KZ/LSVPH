import { NavLink } from 'react-router-dom'

const links = [
	{ to: '/timetable', label: 'Rozvrh' },
	{ to: '/lunch', label: 'Obědy' },
	{ to: '/presentations', label: 'Prezentace' },
	{ to: '/projects', label: 'Projekty' }
]

export default function Nav() {
	return (
		<nav className="border-ink bg-ink border-b-2 px-4 py-3 sm:px-6">
			<div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
				<NavLink to="/" className="font-display text-accent text-xl font-bold tracking-tight">
					LŠVPH 2026
				</NavLink>
				<ul className="flex gap-4 sm:gap-6">
					{links.map(({ to, label }) => (
						<li key={to}>
							<NavLink
								to={to}
								className={({ isActive }) =>
									`font-body text-xs font-medium tracking-widest uppercase transition-colors sm:text-sm ${
										isActive ? 'text-accent' : 'text-bg hover:text-accent'
									}`
								}
							>
								{label}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}
