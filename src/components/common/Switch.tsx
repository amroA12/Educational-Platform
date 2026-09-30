import { cn } from '@/utils/cn'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
  id: string
}

/** Accessible toggle: a real switch role with a visible label and optional description. */
export function Switch({ checked, onChange, label, description, id }: SwitchProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0">
        <label htmlFor={id} className="block cursor-pointer text-sm font-semibold text-fg">
          {label}
        </label>
        {description && <p className="mt-0.5 text-sm text-fg-muted">{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors duration-200',
          checked ? 'bg-primary' : 'bg-line-strong',
        )}
      >
        <span
          className={cn(
            'absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200',
            checked && 'translate-x-5',
          )}
        />
        <span className="sr-only">{checked ? 'On' : 'Off'}</span>
      </button>
    </div>
  )
}
