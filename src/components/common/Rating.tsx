import { Star } from 'lucide-react'
import { cn } from '@/utils/cn'

interface RatingProps {
  value: number
  count?: number
  size?: 'sm' | 'md'
  showValue?: boolean
  className?: string
}

/** Star rating. The numeric value is always shown so meaning never relies on colour alone. */
export function Rating({ value, count, size = 'sm', showValue = true, className }: RatingProps) {
  const star = size === 'sm' ? 'size-3.5' : 'size-4.5'
  return (
    <span
      className={cn('inline-flex items-center gap-1.5', className)}
      role="img"
      aria-label={`Rated ${value.toFixed(1)} out of 5${count ? ` from ${count.toLocaleString()} reviews` : ''}`}
    >
      {showValue && (
        <span aria-hidden="true" className={cn('font-bold text-amber-600 dark:text-amber-400', size === 'sm' ? 'text-sm' : 'text-base')}>
          {value.toFixed(1)}
        </span>
      )}
      <span className="inline-flex" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => {
          const fill = Math.min(1, Math.max(0, value - index))
          return (
            <span key={index} className={cn('relative inline-block', star)}>
              <Star className={cn('absolute inset-0 text-line-strong', star)} />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className={cn('fill-amber-400 text-amber-400', star)} />
              </span>
            </span>
          )
        })}
      </span>
      {count !== undefined && (
        <span aria-hidden="true" className="text-xs text-fg-subtle">
          ({count.toLocaleString()})
        </span>
      )}
    </span>
  )
}
