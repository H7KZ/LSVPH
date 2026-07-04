import { beforeEach, describe, expect, it, vi } from 'vitest'

const store: Record<string, string> = {}
vi.stubGlobal('localStorage', {
	getItem: (k: string) => store[k] ?? null,
	setItem: (k: string, v: string) => { store[k] = v },
	removeItem: (k: string) => { delete store[k] },
	clear: () => { for (const k in store) delete store[k] },
})
import { clearProjectProgress, findProjectBySlug, isItemChecked, lessonProgress, projectCompletedCount, projects, setItemChecked } from './projects'

beforeEach(() => {
	localStorage.clear()
})

describe('findProjectBySlug', () => {
	it('finds an existing project', () => {
		expect(findProjectBySlug('flappy')?.title).toBe('Flappy Bird')
	})
	it('returns undefined for unknown slug', () => {
		expect(findProjectBySlug('unknown')).toBeUndefined()
	})
})

describe('checklist localStorage helpers', () => {
	it('isItemChecked returns false when unset', () => {
		expect(isItemChecked('unity-flappy-1', 'project-created')).toBe(false)
	})
	it('setItemChecked + isItemChecked round-trip', () => {
		setItemChecked('unity-flappy-1', 'project-created', true)
		expect(isItemChecked('unity-flappy-1', 'project-created')).toBe(true)
	})
	it('setItemChecked false removes the key', () => {
		setItemChecked('unity-flappy-1', 'project-created', true)
		setItemChecked('unity-flappy-1', 'project-created', false)
		expect(isItemChecked('unity-flappy-1', 'project-created')).toBe(false)
	})
})

describe('lessonProgress', () => {
	const lesson = projects[0].lessons[0] // flappy lesson 1

	it('not-started when nothing checked', () => {
		expect(lessonProgress(lesson)).toBe('not-started')
	})
	it('in-progress when some items checked', () => {
		setItemChecked(lesson.slug, lesson.checklist[0].id, true)
		expect(lessonProgress(lesson)).toBe('in-progress')
	})
	it('completed when all items checked', () => {
		for (const item of lesson.checklist) setItemChecked(lesson.slug, item.id, true)
		expect(lessonProgress(lesson)).toBe('completed')
	})
})

describe('projectCompletedCount', () => {
	it('returns 0 when nothing checked', () => {
		expect(projectCompletedCount(projects[0])).toBe(0)
	})
	it('returns 1 when first lesson fully completed', () => {
		const lesson = projects[0].lessons[0]
		for (const item of lesson.checklist) setItemChecked(lesson.slug, item.id, true)
		expect(projectCompletedCount(projects[0])).toBe(1)
	})
})

describe('clearProjectProgress', () => {
	it('removes all checked items for a project', () => {
		const project = projects[0]
		const lesson = project.lessons[0]
		for (const item of lesson.checklist) setItemChecked(lesson.slug, item.id, true)
		clearProjectProgress(project)
		expect(lessonProgress(lesson)).toBe('not-started')
	})
})
