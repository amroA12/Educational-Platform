import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'overlay' | 'solidSuccess' | 'solidBrand'

const tones: Record<BadgeTone, string> = {
  neutral: 'bg-surface-muted text-fg-muted',
  brand: 'bg-primary-soft text-primary-ink',
  success: 'bg-emerald-500/12 text-success-ink',
  warning: 'bg-amber-500/15 text-warning-ink',
  danger: 'bg-rose-500/12 text-danger-ink',
  info: 'bg-sky-500/12 text-sky-700 dark:text-sky-300',
  // Opaque variants for badges that sit on top of imagery, where tinted backgrounds lose contrast.
  overlay: 'bg-white text-slate-900 shadow-sm',
  solidSuccess: 'bg-emerald-600 text-white shadow-sm',
  solidBrand: 'bg-primary text-white shadow-sm',
}

interface BadgeProps {
  tone?: BadgeTone
  icon?: ReactNode
  className?: string
  children: ReactNode
}

export function Badge({ tone = 'neutral', icon, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
