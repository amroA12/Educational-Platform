import type { Ref, TextareaHTMLAttributes } from 'react'
import { Field } from './Field'
import { controlClasses } from './styles'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
  ref?: Ref<HTMLTextAreaElement>
}

export function Textarea({ label, hint, error, className, required, ref, ...props }: TextareaProps) {
  return (
    <Field label={label} hint={hint} error={error} required={required} className={className}>
      {({ id, describedBy, invalid }) => (
        <textarea
          id={id}
          ref={ref}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={controlClasses(invalid, 'min-h-28 resize-y py-3')}
          {...props}
        />
      )}
    </Field>
  )
}
