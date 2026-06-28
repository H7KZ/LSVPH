import { describe, it, expect } from 'vitest'
import { subjects, findSubjectBySlug } from './subjects'
import { schedule, timeSlots } from './timetable'

describe('subjects', () => {
	it('every subject has a non-empty slug, title, lecturer, description and hex accent', () => {
		for (const s of subjects) {
			expect(s.slug).toBeTruthy()
			expect(s.title).toBeTruthy()
			expect(s.lecturer).toBeTruthy()
			expect(s.description).toBeTruthy()
			expect(s.accent).toMatch(/^#[0-9a-f]{6}$/i)
		}
	})

	it('slugs are unique', () => {
		const slugs = subjects.map((s) => s.slug)
		expect(new Set(slugs).size).toBe(slugs.length)
	})

	it('findSubjectBySlug returns the right subject', () => {
		const found = findSubjectBySlug('csharp')
		expect(found?.title).toBe('Základy programování v C#')
	})

	it('findSubjectBySlug returns undefined for unknown slug', () => {
		expect(findSubjectBySlug('nope')).toBeUndefined()
	})
})

describe('timetable', () => {
	it('every day schedule has the same number of slots as timeSlots', () => {
		for (const day of schedule) {
			expect(day.slots.length).toBe(timeSlots.length)
		}
	})

	it('every non-null slot references a known subject slug', () => {
		const slugs = new Set(subjects.map((s) => s.slug))
		for (const day of schedule) {
			for (const slot of day.slots) {
				if (slot !== null) {
					expect(slugs.has(slot)).toBe(true)
				}
			}
		}
	})
})
