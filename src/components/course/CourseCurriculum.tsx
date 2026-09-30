import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookText, CheckCircle2, ChevronDown, Circle, Lock, PlayCircle, Wrench } from 'lucide-react'
import { getCurriculum } from '@/data/lessons'
import { useIsEnrolled } from '@/store/courseStore'
import { useProgressStore } from '@/store/progressStore'
import type { Lesson, LessonType } from '@/types'
import { cn } from '@/utils/cn'
import { formatMinutes } from '@/utils/format'

const typeMeta: Record<LessonType, { icon: typeof PlayCircle; label: string }> = {
  video: { icon: PlayCircle, label: 'Video' },
  reading: { icon: BookText, label: 'Reading' },
  exercise: { icon: Wrench, label: 'Exercise' },
}

const EMPTY: string[] = []

function LessonRow({ lesson, completed, enrolled }: { lesson: Lesson; completed: boolean; enrolled: boolean }) {
  const { icon: TypeIcon, label } = typeMeta[lesson.type]
  const content = (
    <>
      {completed ? (
        <CheckCircle2 className="size-5 shrink-0 text-emerald-500" aria-hidden="true" />
      ) : (
        <Circle className="size-5 shrink-0 text-line-strong" aria-hidden="true" />
      )}
      <span className="w-6 shrink-0 text-xs font-semibold tabular-nums text-fg-subtle">
        {String(lesson.order).padStart(2, '0')}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-medium">{lesson.title}</span>
      <span className="hidden shrink-0 items-center gap-1.5 text-xs text-fg-subtle sm:inline-flex">
        <TypeIcon className="size-3.5" aria-hidden="true" />
        {label}
      </span>
      <span className="w-12 shrink-0 text-right text-xs tabular-nums text-fg-subtle">
        {formatMinutes(lesson.durationMinutes)}
      </span>
      {!enrolled && <Lock className="size-3.5 shrink-0 text-fg-subtle" aria-hidden="true" />}
      <span className="sr-only">
        {label}, {completed ? 'completed' : 'not completed'}
        {!enrolled && ', locked until you enroll'}
      </span>
    </>
  )
  const rowClass = 'flex items-center gap-3 px-4 py-3 sm:px-5'
  return enrolled ? (
    <Link
      to={`/learn/${lesson.courseId}/${lesson.id}`}
      className={cn(rowClass, 'transition hover:bg-surface-muted')}
    >
      {content}
    </Link>
  ) : (
    <div className={rowClass}>{content}</div>
  )
}

export function CourseCurriculum({ courseId }: { courseId: string }) {
  const modules = getCurriculum(courseId)
  const enrolled = useIsEnrolled(courseId)
  const completedIds = useProgressStore((state) => state.completedLessons[courseId] ?? EMPTY)
  const [openIds, setOpenIds] = useState<string[]>(() => modules.slice(0, 1).map((module) => module.id))

  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0)
  const totalMinutes = modules.reduce(
    (sum, module) => sum + module.lessons.reduce((inner, lesson) => inner + lesson.durationMinutes, 0),
    0,
  )
  const allOpen = openIds.length === modules.length

  const toggle = (id: string) =>
    setOpenIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-fg-muted">
          {modules.length} modules · {totalLessons} lessons · {formatMinutes(totalMinutes)} total
        </p>
        <button
          type="button"
          onClick={() => setOpenIds(allOpen ? [] : modules.map((module) => module.id))}
          className="text-sm font-semibold text-primary-ink hover:underline"
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      <div className="card divide-y divide-line overflow-hidden">
        {modules.map((module, index) => {
          const isOpen = openIds.includes(module.id)
          const done = module.lessons.filter((lesson) => completedIds.includes(lesson.id)).length
          const minutes = module.lessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0)
          return (
            <section key={module.id}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${module.id}-panel`}
                  onClick={() => toggle(module.id)}
                  className="flex w-full items-center gap-3 bg-surface-muted/50 px-4 py-4 text-left transition hover:bg-surface-muted sm:px-5"
                >
                  <ChevronDown
                    className={cn('size-5 shrink-0 text-fg-subtle transition-transform', isOpen && 'rotate-180')}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">
                      <span className="text-primary-ink">{String(index + 1).padStart(2, '0')}</span> — {module.title}
                    </span>
                  </span>
                  <span className="hidden shrink-0 text-xs text-fg-subtle sm:block">
                    {enrolled ? `${done}/${module.lessons.length} done · ` : ''}
                    {module.lessons.length} lessons · {formatMinutes(minutes)}
                  </span>
                </button>
              </h3>
              {isOpen && (
                <ul id={`${module.id}-panel`} className="divide-y divide-line">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <LessonRow lesson={lesson} completed={completedIds.includes(lesson.id)} enrolled={enrolled} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
