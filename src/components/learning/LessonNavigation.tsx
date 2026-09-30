import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ClipboardCheck, PartyPopper } from 'lucide-react'
import type { Lesson } from '@/types'
import { ButtonLink } from '@/components/common/Button'

interface LessonNavigationProps {
  courseId: string
  previous?: Lesson
  next?: Lesson
  hasQuiz: boolean
}

const cardClass =
  'group flex min-w-0 items-center gap-3 rounded-2xl border border-line bg-surface p-4 transition hover:border-line-strong hover:shadow-card-hover'

export function LessonNavigation({ courseId, previous, next, hasQuiz }: LessonNavigationProps) {
  return (
    <nav aria-label="Lesson navigation" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {previous ? (
        <Link to={`/learn/${courseId}/${previous.id}`} className={cardClass}>
          <ArrowLeft className="size-5 shrink-0 text-fg-subtle transition group-hover:-translate-x-0.5 group-hover:text-primary-ink" aria-hidden="true" />
          <span className="min-w-0">
            <span className="block text-xs font-semibold text-fg-subtle">Previous</span>
            <span className="block truncate text-sm font-bold">{previous.title}</span>
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <Link to={`/learn/${courseId}/${next.id}`} className={`${cardClass} justify-end text-right`}>
          <span className="min-w-0">
            <span className="block text-xs font-semibold text-fg-subtle">Next</span>
            <span className="block truncate text-sm font-bold">{next.title}</span>
          </span>
          <ArrowRight className="size-5 shrink-0 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-primary-ink" aria-hidden="true" />
        </Link>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-primary-soft p-4">
          <span className="flex items-center gap-2 text-sm font-bold text-primary-ink">
            <PartyPopper className="size-5" aria-hidden="true" />
            You&apos;ve reached the final lesson
          </span>
          {hasQuiz ? (
            <ButtonLink to={`/quiz/${courseId}`} size="sm" leftIcon={<ClipboardCheck className="size-4" />}>
              Take the quiz
            </ButtonLink>
          ) : (
            <ButtonLink to="/certificates" size="sm">
              View certificates
            </ButtonLink>
          )}
        </div>
      )}
    </nav>
  )
}
