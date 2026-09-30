import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  message: string
  action?: ReactNode
  compact?: boolean
  className?: string
}

export function EmptyState({ icon: Icon, title, message, action, compact, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-line-strong bg-surface/60 px-6 text-center',
        compact ? 'py-10' : 'py-16',
        className,
      )}
    >
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary-soft text-primary-ink">
        <Icon className="size-7" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold text-fg">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-fg-muted">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
