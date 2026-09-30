import { CheckCircle2, XCircle } from 'lucide-react'
import type { Quiz, QuizResult } from '@/types'
import { cn } from '@/utils/cn'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

/** Question-by-question review shown after submitting. Marks use icons and text as well as colour. */
export function AnswerReview({ quiz, result }: { quiz: Quiz; result: QuizResult }) {
  return (
    <ol className="space-y-4">
      {quiz.questions.map((question, index) => {
        const chosen = result.answers[question.id]
        const correct = chosen === question.correctIndex
        return (
          <li key={question.id} className="card p-5">
            <div className="flex items-start gap-3">
              {correct ? (
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" aria-hidden="true" />
              ) : (
                <XCircle className="mt-0.5 size-5 shrink-0 text-rose-500" aria-hidden="true" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-fg-subtle">
                  Question {index + 1} · {correct ? 'Correct' : 'Incorrect'}
                </p>
                <p className="mt-1 font-bold">{question.text}</p>
                <ul className="mt-3 space-y-2">
                  {question.options.map((option, optionIndex) => {
                    const isCorrect = optionIndex === question.correctIndex
                    const isChosen = optionIndex === chosen
                    return (
                      <li
                        key={option}
                        className={cn(
                          'flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm',
                          isCorrect
                            ? 'border-emerald-500/50 bg-emerald-500/10'
                            : isChosen
                              ? 'border-rose-500/50 bg-rose-500/10'
                              : 'border-line',
                        )}
                      >
                        <span className="w-5 shrink-0 font-bold text-fg-subtle">{LETTERS[optionIndex]}</span>
                        <span className="flex-1">{option}</span>
                        {isCorrect && <span className="shrink-0 text-xs font-bold text-success-ink">Correct answer</span>}
                        {isChosen && !isCorrect && <span className="shrink-0 text-xs font-bold text-danger-ink">Your answer</span>}
                        {isChosen && isCorrect && <span className="shrink-0 text-xs font-bold text-success-ink">Your answer</span>}
                      </li>
                    )
                  })}
                </ul>
                <p className="mt-3 rounded-xl bg-surface-muted p-3 text-sm text-fg-muted">
                  <span className="font-bold text-fg">Why: </span>
                  {question.explanation}
                </p>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
