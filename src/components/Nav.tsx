import { NavLink } from 'react-router-dom'

const links = [
	{ to: '/timetable', label: 'Rozvrh' },
	{ to: '/lunch', label: 'Obědy' },
	{ to: '/subjects', label: 'Předměty' },
]

export default function Nav() {
	return (
		<nav className="border-ink bg-ink flex items-center justify-between border-b-2 px-6 py-4">
			<NavLink to="/" className="font-display text-accent text-xl font-bold tracking-tight">
				LŠVPH 2026
			</NavLink>
			<ul className="flex gap-6">
				{links.map(({ to, label }) => (
					<li key={to}>
						<NavLink
							to={to}
							className={({ isActive }) =>
								`font-body text-sm font-medium tracking-widest uppercase transition-colors ${
									isActive ? 'text-accent' : 'text-bg hover:text-accent'
								}`
							}
						>
							{label}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	)
}
