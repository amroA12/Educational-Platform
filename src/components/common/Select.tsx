import type { Ref, SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { Field } from './Field'
import { controlClasses } from './styles'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  hint?: string
  error?: string
  options: SelectOption[]
  ref?: Ref<HTMLSelectElement>
}

export function Select({ label, hint, error, options, className, ref, ...props }: SelectProps) {
  return (
    <Field label={label} hint={hint} error={error} className={className}>
      {({ id, describedBy, invalid }) => (
        <div className="relative">
          <select
            id={id}
            ref={ref}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={controlClasses(invalid, 'h-11 appearance-none pr-10')}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-fg-subtle"
            aria-hidden="true"
          />
        </div>
      )}
    </Field>
  )
}
