import { useState, type InputHTMLAttributes, type ReactNode, type Ref } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Field } from './Field'
import { controlClasses } from './styles'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  hint?: string
  error?: string
  leftIcon?: ReactNode
  ref?: Ref<HTMLInputElement>
}

export function Input({ label, hint, error, leftIcon, className, required, ref, ...props }: InputProps) {
  return (
    <Field label={label} hint={hint} error={error} required={required} className={className}>
      {({ id, describedBy, invalid }) => (
        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-fg-subtle">
              {leftIcon}
            </span>
          )}
          <input
            id={id}
            ref={ref}
            required={required}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={controlClasses(invalid, cn('h-11', !!leftIcon && 'pl-10'))}
            {...props}
          />
        </div>
      )}
    </Field>
  )
}

export function PasswordInput(props: InputProps) {
  const [visible, setVisible] = useState(false)
  const { label, hint, error, className, required, ref, ...rest } = props
  return (
    <Field label={label} hint={hint} error={error} required={required} className={className}>
      {({ id, describedBy, invalid }) => (
        <div className="relative">
          <input
            id={id}
            ref={ref}
            type={visible ? 'text' : 'password'}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={controlClasses(invalid, 'h-11 pr-11')}
            {...rest}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
            className="absolute inset-y-0 right-1.5 my-auto flex size-8 items-center justify-center rounded-lg text-fg-subtle transition hover:bg-surface-muted hover:text-fg"
          >
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      )}
    </Field>
  )
}
