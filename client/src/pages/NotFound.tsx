import { Link } from 'react-router-dom'

export default function NotFound() {
	return (
		<div className="mx-auto max-w-lg pt-20 text-center">
			<p className="font-display text-accent mb-2 text-8xl font-extrabold">404</p>
			<h1 className="font-display mb-4 text-2xl font-bold">Stránka nenalezena</h1>
			<p className="text-muted mb-8">Tato stránka neexistuje nebo byla přesunuta.</p>
			<Link
				to="/"
				className="border-ink bg-accent hover:bg-ink hover:text-accent inline-block border-2 px-5 py-2 text-sm font-bold tracking-widest uppercase"
			>
				Zpět na úvod
			</Link>
		</div>
	)
}
