import { CheckCircle2, Clock, Target, XCircle } from 'lucide-react'
import type { Quiz, QuizResult as QuizResultType } from '@/types'
import { cn } from '@/utils/cn'
import { formatClock } from '@/utils/format'

function performanceMessage(percent: number, passing: number) {
  if (percent === 100) return 'Perfect score! You have mastered this material.'
  if (percent >= 90) return 'Outstanding work. You clearly know this topic well.'
  if (percent >= passing) return 'Great job! You passed. Review any missed questions to lock it in.'
  if (percent >= 50) return 'Good effort. Revisit the lessons and try again to improve your score.'
  return 'Keep practising. Rewatch the lessons, then retake the quiz when you are ready.'
}

function ScoreRing({ percent, passed }: { percent: number; passed: boolean }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  return (
    <div className="relative size-40 shrink-0">
      <svg viewBox="0 0 128 128" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="64" cy="64" r={radius} fill="none" strokeWidth="12" className="stroke-line" />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - percent / 100)}
          className={cn('transition-[stroke-dashoffset] duration-1000 ease-out', passed ? 'stroke-emerald-500' : 'stroke-amber-500')}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold">{percent}%</span>
      </div>
    </div>
  )
}

export function QuizResultSummary({ quiz, result }: { quiz: Quiz; result: QuizResultType }) {
  const passed = result.percent >= quiz.passingScore
  const incorrect = result.total - result.correct
  const stats = [
    { label: 'Correct Answers', value: result.correct, icon: CheckCircle2, className: 'text-success-ink bg-emerald-500/15' },
    { label: 'Incorrect Answers', value: incorrect, icon: XCircle, className: 'text-danger-ink bg-rose-500/15' },
    { label: 'Time', value: formatClock(result.durationSeconds), icon: Clock, className: 'text-primary-ink bg-primary-soft' },
    { label: 'Passing score', value: `${quiz.passingScore}%`, icon: Target, className: 'text-warning-ink bg-amber-500/15' },
  ]

  return (
    <section aria-labelledby="quiz-completed" className="card p-6 sm:p-8">
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <ScoreRing percent={result.percent} passed={passed} />
        <div>
          <p
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold',
              passed ? 'bg-emerald-500/15 text-success-ink' : 'bg-amber-500/15 text-warning-ink',
            )}
          >
            {passed ? <CheckCircle2 className="size-4" aria-hidden="true" /> : <XCircle className="size-4" aria-hidden="true" />}
            {passed ? 'Passed' : 'Not passed yet'}
          </p>
          <h1 id="quiz-completed" className="mt-3 text-3xl font-extrabold">
            Quiz Completed
          </h1>
          <p className="mt-2 text-5xl font-extrabold">
            {result.correct} <span className="text-fg-subtle">/ {result.total}</span>
          </p>
          <p className="mt-3 max-w-md text-fg-muted">{performanceMessage(result.percent, quiz.passingScore)}</p>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, className }) => (
          <div key={label} className="rounded-2xl border border-line p-4">
            <span className={cn('flex size-9 items-center justify-center rounded-lg', className)}>
              <Icon className="size-4.5" aria-hidden="true" />
            </span>
            <dd className="mt-3 text-2xl font-extrabold">{value}</dd>
            <dt className="text-sm text-fg-muted">{label}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
