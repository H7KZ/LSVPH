import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { clearProjectProgress, findProjectBySlug, isItemChecked, lessonProgress, projectCompletedCount, setItemChecked, type Lesson } from '../data/projects'

export default function Project() {
	const { slug } = useParams<{ slug: string }>()
	const project = slug ? findProjectBySlug(slug) : undefined
	const [, setTick] = useState(0)

	if (!project) return <Navigate to="/projects" replace />

	const rerender = () => setTick(t => t + 1)

	function handleCheck(lessonSlug: string, itemId: string, checked: boolean) {
		setItemChecked(lessonSlug, itemId, checked)
		rerender()
	}

	function handleReset() {
		clearProjectProgress(project!)
		rerender()
	}

	const completed = projectCompletedCount(project)

	return (
		<div className="mx-auto max-w-2xl">
			<p className="text-muted mb-4 text-sm">
				<Link to="/projects" className="hover:underline">
					← Projekty
				</Link>{' '}
				/ {project.title}
			</p>

			<div className="border-ink mb-8 flex items-start gap-4 border-b-2 pb-6">
				<div className="border-ink flex h-14 w-14 shrink-0 items-center justify-center border-2 text-3xl" style={{ backgroundColor: project.accent }}>
					{project.emoji}
				</div>
				<div>
					<h1 className="font-display text-3xl font-extrabold">{project.title}</h1>
					<p className="text-muted mt-1 text-sm">{project.description}</p>
					<div className="mt-2 flex flex-wrap gap-2">
						<span className="border-ink border px-2 py-0.5 text-xs">{project.lessons.length} lekcí</span>
						<span className="border-ink border bg-[#d4ffe3] px-2 py-0.5 text-xs">
							{completed} / {project.lessons.length} dokončeno
						</span>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-3">
				{project.lessons.map((lesson, i) => (
					<LessonCard key={lesson.slug} lesson={lesson} index={i + 1} onCheck={handleCheck} />
				))}
			</div>

			<div className="mt-6 text-right">
				<button onClick={handleReset} className="text-muted text-xs underline hover:no-underline">
					Resetovat postup
				</button>
			</div>
		</div>
	)
}

function LessonCard({ lesson, index, onCheck }: { lesson: Lesson; index: number; onCheck: (lessonSlug: string, itemId: string, checked: boolean) => void }) {
	const progress = lessonProgress(lesson)

	const headerBg = progress === 'completed' ? '#d4ffe3' : progress === 'in-progress' ? '#facc15' : undefined

	return (
		<div className={`border-ink border-2 ${progress === 'not-started' ? 'opacity-60' : ''}`}>
			<div className="border-ink flex items-center gap-3 border-b-2 px-4 py-3" style={{ backgroundColor: headerBg }}>
				<div
					className={`flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold ${
						progress === 'not-started' ? 'border-ink text-muted border-2' : 'bg-ink text-accent'
					}`}
				>
					{progress === 'completed' ? '✓' : index}
				</div>
				<div className="flex-1">
					<p className="font-body font-bold">{lesson.title}</p>
					<p className="text-muted text-xs">{lesson.description}</p>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-muted text-xs">{lesson.duration} min</span>
					<a
						href={`/presentation/${lesson.slug}`}
						target="_blank"
						rel="noopener noreferrer"
						className="bg-ink text-accent font-body px-3 py-1 text-xs font-bold"
					>
						▶ Prezentace ↗
					</a>
				</div>
			</div>
			<div className="px-4 py-3">
				<p className="text-muted mb-2 text-xs font-bold tracking-widest uppercase">Checklist</p>
				<div className="flex flex-col gap-2">
					{lesson.checklist.map(item => (
						<label key={item.id} className="flex cursor-pointer items-center gap-2 text-sm">
							<input
								type="checkbox"
								checked={isItemChecked(lesson.slug, item.id)}
								onChange={e => onCheck(lesson.slug, item.id, e.target.checked)}
								className="h-4 w-4"
							/>
							{item.label}
						</label>
					))}
				</div>
			</div>
		</div>
	)
}
