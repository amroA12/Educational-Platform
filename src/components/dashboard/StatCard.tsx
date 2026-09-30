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
    <div className="card flex flex-col items-start gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
      <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-xl sm:size-12', tones[tone])}>
        <Icon className="size-5 sm:size-6" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-tight text-fg-muted">{label}</p>
        <p className="text-2xl font-extrabold leading-tight">{value}</p>
        {hint && <p className="mt-0.5 text-xs text-fg-subtle">{hint}</p>}
      </div>
    </div>
  )
}
