import { Navigate, useParams } from 'react-router-dom'
import { Deck, Markdown } from '@revealjs/react'
import { findSubjectBySlug } from '../data/subjects'
import 'reveal.js/reveal.css'
import 'reveal.js/theme/black.css'

export default function Presentation() {
	const { slug } = useParams<{ slug: string }>()
	const subject = slug ? findSubjectBySlug(slug) : undefined

	if (!subject) return <Navigate to="/404" replace />

	return (
		<Deck config={{ hash: true, transition: 'slide' }}>
			<Markdown
				src={`/slides/${subject.slug}.md`}
				separator="^\n---\n$"
				verticalSeparator="^\n--\n$"
			/>
		</Deck>
	)
}
