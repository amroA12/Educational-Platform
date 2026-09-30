import { CheckCircle2, Lock } from 'lucide-react'
import { achievementIcons } from '@/lib/icons'
import type { Achievement } from '@/types'
import { cn } from '@/utils/cn'
import { formatDate } from '@/utils/format'
import { ProgressBar } from '@/components/learning/ProgressBar'

interface AchievementCardProps {
  achievement: Achievement
  unlockedAt?: string
  current: number
  compact?: boolean
}

export function AchievementCard({ achievement, unlockedAt, current, compact }: AchievementCardProps) {
  const Icon = achievementIcons[achievement.icon]
  const unlocked = !!unlockedAt
  const value = Math.min(current, achievement.target)
  const percent = Math.round((value / achievement.target) * 100)

  return (
    <article
      className={cn(
        'card flex gap-4 p-4 transition',
        compact ? 'items-center' : 'p-5',
        !unlocked && 'bg-surface/60',
      )}
    >
      <span
        className={cn(
          'flex shrink-0 items-center justify-center rounded-2xl',
          compact ? 'size-12' : 'size-14',
          unlocked
            ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md'
            : 'bg-surface-muted text-fg-subtle',
        )}
      >
        {unlocked ? <Icon className="size-6" aria-hidden="true" /> : <Lock className="size-5" aria-hidden="true" />}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className={cn('font-bold', !unlocked && 'text-fg-muted')}>{achievement.name}</h3>
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold',
              unlocked ? 'bg-emerald-500/15 text-success-ink' : 'bg-surface-muted text-fg-subtle',
            )}
          >
            {unlocked ? <CheckCircle2 className="size-3" aria-hidden="true" /> : <Lock className="size-3" aria-hidden="true" />}
            {unlocked ? 'Unlocked' : 'Locked'}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-fg-muted">{achievement.description}</p>
        {unlocked ? (
          <p className="mt-2 text-xs text-fg-subtle">Earned {formatDate(unlockedAt)}</p>
        ) : (
          !compact && (
            <div className="mt-3">
              <ProgressBar value={percent} label={`${achievement.name} progress`} showValue={false} />
              <p className="mt-1.5 text-xs font-semibold text-fg-subtle">
                {value} / {achievement.target}
              </p>
            </div>
          )
        )}
      </div>
    </article>
  )
}
