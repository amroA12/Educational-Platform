import { ArrowLeft, ArrowRight, Send } from 'lucide-react'
import { Button } from '@/components/common/Button'

interface QuizNavigationProps {
  isFirst: boolean
  isLast: boolean
  remaining: number
  submitting: boolean
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => void
  onJumpToUnanswered: () => void
}

export function QuizNavigation({
  isFirst,
  isLast,
  remaining,
  submitting,
  onPrevious,
  onNext,
  onSubmit,
  onJumpToUnanswered,
}: QuizNavigationProps) {
  return (
    <div className="mt-8 border-t border-line pt-6">
      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" onClick={onPrevious} disabled={isFirst} leftIcon={<ArrowLeft className="size-4" />}>
          Previous
        </Button>
        {isLast ? (
          <Button
            onClick={onSubmit}
            disabled={remaining > 0}
            loading={submitting}
            aria-describedby={remaining > 0 ? 'quiz-submit-hint' : undefined}
            leftIcon={<Send className="size-4" />}
          >
            Submit quiz
          </Button>
        ) : (
          <Button onClick={onNext} rightIcon={<ArrowRight className="size-4" />}>
            Next
          </Button>
        )}
      </div>
      {remaining > 0 && (isLast || remaining < 3) && (
        <p id="quiz-submit-hint" className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-amber-500/10 px-4 py-3 text-sm text-warning-ink">
          <span>
            {remaining} {remaining === 1 ? 'question is' : 'questions are'} still unanswered. Answer every question to submit.
          </span>
          <button type="button" onClick={onJumpToUnanswered} className="font-bold underline">
            Go to next unanswered
          </button>
        </p>
      )}
    </div>
  )
}
