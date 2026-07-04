import { Deck, Markdown } from '@revealjs/react'
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import RevealHighlight from 'reveal.js/plugin/highlight'
import RevealNotes from 'reveal.js/plugin/notes'
import { presentations } from '../data/presentations'
import { projects } from '../data/projects'
import 'reveal.js/reveal.css'
import 'reveal.js/theme/white.css'
import '../reveal-theme.css'

const validSlugs = new Set([...presentations.map(p => p.slug), ...projects.flatMap(p => p.lessons.map(l => l.slug))])

export default function Presentation() {
	const { slug } = useParams<{ slug: string }>()
	const [markdown, setMarkdown] = useState<string | null>(null)

	useEffect(() => {
		if (!slug) return
		let active = true
		setMarkdown(null)
		fetch(`/slides/${slug}.md`)
			.then(r => r.text())
			.then(text => {
				if (active) setMarkdown(text)
			})
		return () => {
			active = false
		}
	}, [slug])

	if (!slug || !validSlugs.has(slug)) return <Navigate to="/" replace />

	// Mount the Deck only once the markdown is loaded, so Reveal initializes
	// with all slides already present (avoids the async-src sync race that
	// leaves slides without the `.present` class — i.e. a blank deck).
	if (markdown == null) return null

	return (
		<Deck
			key={slug}
			config={{
				hash: true,
				transition: 'concave',
				transitionSpeed: 'fast',
				backgroundTransition: 'concave'
			}}
			plugins={[RevealHighlight, RevealNotes]}
		>
			<Markdown separator="^\n---\n$" verticalSeparator="^\n--\n$">
				{markdown}
			</Markdown>
		</Deck>
	)
}
