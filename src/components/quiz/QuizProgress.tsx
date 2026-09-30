import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'
import { ProgressBar } from '@/components/learning/ProgressBar'

interface QuizProgressProps {
  total: number
  current: number
  answered: boolean[]
  onJump: (index: number) => void
}

/** Progress bar plus a numbered navigator. Answered questions show a check, never colour alone. */
export function QuizProgress({ total, current, answered, onJump }: QuizProgressProps) {
  const answeredCount = answered.filter(Boolean).length
  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm font-semibold text-fg-muted">
        <span>
          Question {current + 1} of {total}
        </span>
        <span>
          {answeredCount} of {total} answered
        </span>
      </div>
      <ProgressBar value={(answeredCount / total) * 100} showValue={false} label="Quiz progress" size="md" />
      <ol className="mt-4 flex flex-wrap gap-2" aria-label="Question navigator">
        {answered.map((isAnswered, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => onJump(index)}
              aria-current={index === current ? 'step' : undefined}
              aria-label={`Question ${index + 1}, ${isAnswered ? 'answered' : 'not answered'}`}
              className={cn(
                'relative flex size-9 items-center justify-center rounded-xl border-2 text-sm font-bold transition',
                index === current
                  ? 'border-primary bg-primary text-white'
                  : isAnswered
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-success-ink'
                    : 'border-line bg-surface text-fg-muted hover:border-line-strong',
              )}
            >
              {index + 1}
              {isAnswered && index !== current && (
                <Check className="absolute -right-1 -top-1 size-3.5 rounded-full bg-emerald-500 p-0.5 text-white" strokeWidth={3} aria-hidden="true" />
              )}
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
