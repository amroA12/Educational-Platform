import { useId, type InputHTMLAttributes, type ReactNode, type Ref } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode
  ref?: Ref<HTMLInputElement>
}

export function Checkbox({ label, className, ref, ...props }: CheckboxProps) {
  const id = useId()
  return (
    <label htmlFor={id} className={cn('group flex w-fit cursor-pointer items-center gap-2.5 text-sm', className)}>
      <span className="relative flex size-5 shrink-0 items-center justify-center">
        <input
          id={id}
          ref={ref}
          type="checkbox"
          className="peer absolute inset-0 size-full cursor-pointer appearance-none rounded-md border border-line-strong bg-surface transition checked:border-primary checked:bg-primary hover:border-brand-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          {...props}
        />
        <Check
          className="pointer-events-none relative size-3.5 text-white opacity-0 transition peer-checked:opacity-100"
          strokeWidth={3}
          aria-hidden="true"
        />
      </span>
      <span className="text-fg-muted group-hover:text-fg">{label}</span>
    </label>
  )
}
