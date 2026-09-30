import { useMemo, useState } from 'react'
import { MessageSquareOff, Star } from 'lucide-react'
import { getReviewsForCourse } from '@/data/reviews'
import type { Course } from '@/types'
import { cn } from '@/utils/cn'
import { formatDate, formatNumber } from '@/utils/format'
import { Avatar } from '@/components/common/Avatar'
import { EmptyState } from '@/components/common/EmptyState'
import { Rating } from '@/components/common/Rating'

type StarFilter = 'all' | 1 | 2 | 3 | 4 | 5

const STARS = [5, 4, 3, 2, 1] as const

export function CourseReviews({ course }: { course: Course }) {
  const reviews = useMemo(() => getReviewsForCourse(course.id), [course.id])
  const [filter, setFilter] = useState<StarFilter>('all')

  const counts = useMemo(
    () => Object.fromEntries(STARS.map((star) => [star, reviews.filter((review) => review.rating === star).length])),
    [reviews],
  )
  const visible = filter === 'all' ? reviews : reviews.filter((review) => review.rating === filter)

  return (
    <div>
      <div className="card grid grid-cols-1 gap-6 p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 sm:p-6">
        <div className="text-center sm:px-6">
          <p className="text-5xl font-extrabold">{course.rating.toFixed(1)}</p>
          <Rating value={course.rating} showValue={false} size="md" className="mt-2" />
          <p className="mt-1.5 text-sm text-fg-muted">{formatNumber(course.reviewsCount)} ratings</p>
        </div>
        <ul className="space-y-2" aria-label="Rating distribution of featured reviews">
          {STARS.map((star) => {
            const share = reviews.length ? (counts[star] / reviews.length) * 100 : 0
            return (
              <li key={star} className="flex items-center gap-3 text-sm">
                <span className="w-10 shrink-0 font-semibold tabular-nums">{star} star</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${share}%` }} />
                </div>
                <span className="w-8 shrink-0 text-right tabular-nums text-fg-subtle">{counts[star]}</span>
              </li>
            )
          })}
        </ul>
      </div>

      <div role="group" aria-label="Filter reviews by rating" className="mt-6 flex flex-wrap gap-2">
        {(['all', ...STARS] as StarFilter[]).map((value) => {
          const selected = filter === value
          return (
            <button
              key={value}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(value)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition',
                selected
                  ? 'border-primary bg-primary text-white'
                  : 'border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg',
              )}
            >
              {value === 'all' ? (
                `All (${reviews.length})`
              ) : (
                <>
                  {value}
                  <Star className="size-3.5 fill-current" aria-hidden="true" />
                  <span className="sr-only">stars</span>
                  <span className="font-normal opacity-80">({counts[value]})</span>
                </>
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-5" aria-live="polite">
        {visible.length === 0 ? (
          <EmptyState
            compact
            icon={MessageSquareOff}
            title="No reviews for this rating"
            message="Try a different star rating to see more feedback."
          />
        ) : (
          <ul className="space-y-4">
            {visible.map((review) => (
              <li key={review.id} className="card p-5">
                <div className="flex items-start gap-3">
                  <Avatar name={review.author} tone={review.tone} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                      <p className="font-bold">{review.author}</p>
                      <time dateTime={review.date} className="text-xs text-fg-subtle">
                        {formatDate(review.date)}
                      </time>
                    </div>
                    <Rating value={review.rating} showValue={false} className="mt-0.5" />
                    <p className="mt-2.5 leading-relaxed text-fg-muted">{review.comment}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
