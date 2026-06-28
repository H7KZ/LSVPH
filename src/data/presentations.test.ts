import { describe, expect, it } from 'vitest'
import { findPresentationBySlug, presentations, presentationsForSubject } from './presentations'
import { subjects } from './subjects'

describe('presentations', () => {
	it('every presentation has a non-empty slug, subjectSlug and title', () => {
		for (const p of presentations) {
			expect(p.slug).toBeTruthy()
			expect(p.subjectSlug).toBeTruthy()
			expect(p.title).toBeTruthy()
		}
	})

	it('slugs are unique', () => {
		const slugs = presentations.map((p) => p.slug)
		expect(new Set(slugs).size).toBe(slugs.length)
	})

	it('every presentation references a known subject', () => {
		const subjectSlugs = new Set(subjects.map((s) => s.slug))
		for (const p of presentations) {
			expect(subjectSlugs.has(p.subjectSlug)).toBe(true)
		}
	})

	it('every presentation has a matching slide file in public/slides', () => {
		const files = import.meta.glob('../../public/slides/*.md')
		const slugs = new Set(
			Object.keys(files).map((path) => path.replace(/^.*\/(.+)\.md$/, '$1'))
		)
		for (const p of presentations) {
			expect(slugs.has(p.slug), `missing slides for ${p.slug}`).toBe(true)
		}
	})

	it('findPresentationBySlug returns the right presentation', () => {
		expect(findPresentationBySlug('csharp-uvod')?.subjectSlug).toBe('csharp')
		expect(findPresentationBySlug('nope')).toBeUndefined()
	})

	it('presentationsForSubject groups by subject', () => {
		const found = presentationsForSubject('csharp')
		expect(found.length).toBeGreaterThan(0)
		expect(found.every((p) => p.subjectSlug === 'csharp')).toBe(true)
	})
})
