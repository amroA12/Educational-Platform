import { cn } from '@/utils/cn'

interface ProgressBarProps {
  value: number
  label?: string
  showValue?: boolean
  size?: 'sm' | 'md'
  className?: string
}

/** Determinate progress bar with an animated fill and a visible numeric value. */
export function ProgressBar({ value, label = 'Progress', showValue = true, size = 'sm', className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        className={cn('w-full overflow-hidden rounded-full bg-line', size === 'sm' ? 'h-1.5' : 'h-2.5')}
      >
        <div
          className={cn(
            'h-full rounded-full transition-[width] duration-700 ease-out',
            clamped === 100
              ? 'bg-emerald-500'
              : 'bg-gradient-to-r from-brand-500 to-accent-500',
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showValue && (
        <span className="w-10 shrink-0 text-right text-xs font-bold tabular-nums text-fg-muted">
          {clamped}%
        </span>
      )}
    </div>
  )
}
