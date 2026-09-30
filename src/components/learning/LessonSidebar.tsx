import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookText, CheckCircle2, ChevronDown, Circle, ClipboardCheck, PlayCircle, Wrench } from 'lucide-react'
import { getCurriculum } from '@/data/lessons'
import { getQuizByCourse } from '@/data/quizzes'
import { useCourseProgress, useProgressStore } from '@/store/progressStore'
import type { LessonType } from '@/types'
import { cn } from '@/utils/cn'
import { formatMinutes } from '@/utils/format'
import { ButtonLink } from '@/components/common/Button'
import { ProgressBar } from './ProgressBar'

const typeIcons: Record<LessonType, typeof PlayCircle> = {
  video: PlayCircle,
  reading: BookText,
  exercise: Wrench,
}

const EMPTY: string[] = []

interface LessonSidebarProps {
  courseId: string
  currentLessonId: string
  onNavigate?: () => void
}

/** Curriculum navigator shown as a fixed column on desktop and inside a drawer on mobile. */
export function LessonSidebar({ courseId, currentLessonId, onNavigate }: LessonSidebarProps) {
  const modules = getCurriculum(courseId)
  const completed = useProgressStore((state) => state.completedLessons[courseId] ?? EMPTY)
  const percent = useCourseProgress(courseId)
  const quiz = getQuizByCourse(courseId)
  const [collapsed, setCollapsed] = useState<string[]>([])

  const toggle = (id: string) =>
    setCollapsed((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-line p-4">
        <p className="text-sm font-bold">Course Progress: {percent}%</p>
        <ProgressBar value={percent} showValue={false} label="Course progress" className="mt-2" />
        <p className="mt-2 text-xs text-fg-muted">
          {completed.length} of {modules.reduce((sum, module) => sum + module.lessons.length, 0)} lessons completed
        </p>
      </div>

      <nav aria-label="Course curriculum" className="scrollbar-thin min-h-0 flex-1 overflow-y-auto">
        {modules.map((module, index) => {
          const isOpen = !collapsed.includes(module.id)
          const done = module.lessons.filter((lesson) => completed.includes(lesson.id)).length
          return (
            <section key={module.id} className="border-b border-line">
              <h2>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(module.id)}
                  className="flex w-full items-start gap-3 bg-surface-muted/50 px-4 py-3 text-left transition hover:bg-surface-muted"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold">
                      {String(index + 1).padStart(2, '0')} — {module.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-fg-subtle">
                      {done}/{module.lessons.length} completed
                    </span>
                  </span>
                  <ChevronDown className={cn('mt-0.5 size-4 shrink-0 text-fg-subtle transition-transform', isOpen && 'rotate-180')} aria-hidden="true" />
                </button>
              </h2>
              {isOpen && (
                <ul>
                  {module.lessons.map((lesson) => {
                    const current = lesson.id === currentLessonId
                    const isDone = completed.includes(lesson.id)
                    const TypeIcon = typeIcons[lesson.type]
                    return (
                      <li key={lesson.id}>
                        <Link
                          to={`/learn/${courseId}/${lesson.id}`}
                          onClick={onNavigate}
                          aria-current={current ? 'page' : undefined}
                          className={cn(
                            'flex items-start gap-3 border-l-4 px-4 py-3 text-sm transition',
                            current
                              ? 'border-primary bg-primary-soft'
                              : 'border-transparent hover:bg-surface-muted',
                          )}
                        >
                          {isDone ? (
                            <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-emerald-500" aria-hidden="true" />
                          ) : (
                            <Circle className="mt-0.5 size-4.5 shrink-0 text-line-strong" aria-hidden="true" />
                          )}
                          <span className="min-w-0 flex-1">
                            <span className={cn('block leading-snug', current ? 'font-bold text-primary-ink' : 'font-medium')}>
                              {lesson.order}. {lesson.title}
                            </span>
                            <span className="mt-1 flex items-center gap-1.5 text-xs text-fg-subtle">
                              <TypeIcon className="size-3.5" aria-hidden="true" />
                              {formatMinutes(lesson.durationMinutes)}
                              <span className="sr-only">{isDone ? ', completed' : ', not completed'}</span>
                            </span>
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          )
        })}
      </nav>

      {quiz && (
        <div className="border-t border-line p-4">
          <ButtonLink to={`/quiz/${courseId}`} variant="outline" fullWidth onClick={onNavigate} leftIcon={<ClipboardCheck className="size-4" />}>
            Take the course quiz
          </ButtonLink>
        </div>
      )}
    </div>
  )
}
