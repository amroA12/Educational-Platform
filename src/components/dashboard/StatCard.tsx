import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

interface StatCardProps {
  label: string
  value: string
  hint?: string
  icon: LucideIcon
  tone?: 'brand' | 'emerald' | 'amber' | 'orange'
}

const tones = {
  brand: 'bg-primary-soft text-primary-ink',
  emerald: 'bg-emerald-500/15 text-success-ink',
  amber: 'bg-amber-500/15 text-warning-ink',
  orange: 'bg-orange-500/15 text-orange-600 dark:text-orange-300',
}

export function StatCard({ label, value, hint, icon: Icon, tone = 'brand' }: StatCardProps) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <span className={cn('flex size-12 shrink-0 items-center justify-center rounded-xl', tones[tone])}>
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-fg-muted">{label}</p>
        <p className="text-2xl font-extrabold leading-tight">{value}</p>
        {hint && <p className="truncate text-xs text-fg-subtle">{hint}</p>}
      </div>
    </div>
  )
}
