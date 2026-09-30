import { useId, type ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/utils/cn'

interface FieldProps {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  className?: string
  children: (ids: { id: string; describedBy?: string; invalid: boolean }) => ReactNode
}

/** Shared label / hint / error chrome for every form control. */
export function Field({ label, hint, error, required, className, children }: FieldProps) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-fg">
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-rose-500">
              *
            </span>
          )}
        </label>
      )}
      {children({ id, describedBy, invalid: !!error })}
      {hint && !error && (
        <p id={hintId} className="text-xs text-fg-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="flex items-center gap-1.5 text-xs font-medium text-danger-ink">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
