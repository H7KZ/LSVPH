import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Deck, Markdown } from '@revealjs/react'
import RevealHighlight from 'reveal.js/plugin/highlight'
import { findPresentationBySlug } from '../data/presentations'
import 'reveal.js/reveal.css'
import 'reveal.js/theme/white.css'
import '../reveal-theme.css'

export default function Presentation() {
	const { slug } = useParams<{ slug: string }>()
	const presentation = slug ? findPresentationBySlug(slug) : undefined
	const [markdown, setMarkdown] = useState<string | null>(null)

	useEffect(() => {
		if (!presentation) return
		let active = true
		setMarkdown(null)
		fetch(`/slides/${presentation.slug}.md`)
			.then((r) => r.text())
			.then((text) => {
				if (active) setMarkdown(text)
			})
		return () => {
			active = false
		}
	}, [presentation])

	if (!presentation) return <Navigate to="/" replace />

	// Mount the Deck only once the markdown is loaded, so Reveal initializes
	// with all slides already present (avoids the async-src sync race that
	// leaves slides without the `.present` class — i.e. a blank deck).
	if (markdown == null) return null

	return (
		<Deck
			key={presentation.slug}
			config={{
				hash: true,
				transition: 'concave',
				transitionSpeed: 'fast',
				backgroundTransition: 'concave',
			}}
			plugins={[RevealHighlight]}
		>
			<Markdown separator="^\n---\n$" verticalSeparator="^\n--\n$">
				{markdown}
			</Markdown>
		</Deck>
	)
}
