import { Check } from 'lucide-react'
import type { QuizQuestion as QuizQuestionType } from '@/types'
import { cn } from '@/utils/cn'

interface QuizQuestionProps {
  question: QuizQuestionType
  number: number
  total: number
  selected?: number
  onSelect: (optionIndex: number) => void
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

export function QuizQuestion({ question, number, total, selected, onSelect }: QuizQuestionProps) {
  return (
    <fieldset>
      <legend className="w-full">
        <span className="text-sm font-bold uppercase tracking-wider text-primary-ink">
          Question {number} of {total}
        </span>
        <span className="mt-2 block text-xl font-extrabold leading-snug sm:text-2xl">{question.text}</span>
      </legend>
      <div className="mt-6 space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selected === index
          return (
            <label
              key={option}
              className={cn(
                'flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition',
                'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500',
                isSelected
                  ? 'border-primary bg-primary-soft'
                  : 'border-line bg-surface hover:border-line-strong hover:bg-surface-muted',
              )}
            >
              <input
                type="radio"
                name={question.id}
                value={index}
                checked={isSelected}
                onChange={() => onSelect(index)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold transition',
                  isSelected ? 'bg-primary text-white' : 'bg-surface-muted text-fg-muted',
                )}
              >
                {isSelected ? <Check className="size-5" strokeWidth={3} /> : LETTERS[index]}
              </span>
              <span className="flex-1 text-base font-medium">
                <span className="sr-only">Option {LETTERS[index]}: </span>
                {option}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
