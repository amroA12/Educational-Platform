import { BookText, Check, Clock, Wrench } from 'lucide-react'
import type { Lesson } from '@/types'
import { formatMinutes } from '@/utils/format'

const content = {
  reading: {
    icon: BookText,
    label: 'Reading',
    heading: 'Key takeaways',
    items: [
      'Read through the guide once without stopping to get the big picture.',
      'Highlight anything unfamiliar and jot it down in your notes.',
      'Revisit the examples and try them in your own words.',
    ],
  },
  exercise: {
    icon: Wrench,
    label: 'Hands-on exercise',
    heading: 'What you will do',
    items: [
      'Download the starter files and read the project brief.',
      'Build your solution step by step, committing as you go.',
      'Compare with the reference solution and note what you would improve.',
    ],
  },
} as const

/** Stand-in for non-video lessons (readings and exercises). */
export function LessonArticle({ lesson }: { lesson: Lesson }) {
  const details = content[lesson.type === 'exercise' ? 'exercise' : 'reading']
  const Icon = details.icon
  return (
    <div className="card p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-primary-ink">
        <span className="flex size-11 items-center justify-center rounded-xl bg-primary-soft">
          <Icon className="size-5.5" aria-hidden="true" />
        </span>
        {details.label}
        <span className="inline-flex items-center gap-1.5 font-medium text-fg-subtle">
          <Clock className="size-4" aria-hidden="true" />
          {formatMinutes(lesson.durationMinutes)}
        </span>
      </div>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">{lesson.description}</p>
      <h3 className="mt-6 text-base font-bold">{details.heading}</h3>
      <ul className="mt-3 space-y-3">
        {details.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-fg-muted">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-success-ink">
              <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
