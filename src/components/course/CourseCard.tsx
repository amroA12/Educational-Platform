import { memo } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, Bookmark, Clock, PlayCircle, Users } from 'lucide-react'
import { getCategory } from '@/data/categories'
import { getInstructor } from '@/data/instructors'
import { getLesson } from '@/data/lessons'
import { useContinuePath } from '@/lib/resume'
import { useCourseProgress, useProgressStore } from '@/store/progressStore'
import { useCourseStore, useIsEnrolled, useIsFavorite } from '@/store/courseStore'
import { toast } from '@/store/toastStore'
import type { Course } from '@/types'
import { cn } from '@/utils/cn'
import { formatCompact, formatPrice } from '@/utils/format'
import { Badge } from '@/components/common/Badge'
import { ButtonLink } from '@/components/common/Button'
import { Rating } from '@/components/common/Rating'
import { ProgressBar } from '@/components/learning/ProgressBar'
import { CourseThumbnail } from './CourseThumbnail'

interface CourseCardProps {
  course: Course
  /** `learning` adds progress, the last lesson, and a Continue button for enrolled courses. */
  variant?: 'catalog' | 'learning'
}

/**
 * The one course card used everywhere. It reads its own favourite / enrollment / progress state
 * from the stores, so pages only decide *which* courses to show.
 */
function CourseCardBase({ course, variant = 'catalog' }: CourseCardProps) {
  const instructor = getInstructor(course.instructorId)
  const category = getCategory(course.categoryId)
  const isFavorite = useIsFavorite(course.id)
  const isEnrolled = useIsEnrolled(course.id)
  const toggleFavorite = useCourseStore((state) => state.toggleFavorite)
  const percent = useCourseProgress(course.id)
  const continuePath = useContinuePath(course.id)
  const lastLessonId = useProgressStore((state) => state.lastLesson[course.id]?.lessonId)

  const discount = course.originalPrice
    ? Math.round((1 - course.price / course.originalPrice) * 100)
    : 0
  const showProgress = isEnrolled && (variant === 'learning' || percent > 0)
  const lastLesson = lastLessonId ? getLesson(course.id, lastLessonId) : undefined

  const onToggleFavorite = () => {
    const nowFavorite = toggleFavorite(course.id)
    toast.success(nowFavorite ? 'Saved to your wishlist' : 'Removed from your wishlist', course.title)
  }

  return (
    <article
      className={cn(
        'group card relative flex h-full flex-col overflow-hidden transition duration-200',
        'hover:-translate-y-1 hover:border-line-strong hover:shadow-card-hover focus-within:shadow-card-hover',
      )}
    >
      <div className="relative">
        <CourseThumbnail course={course} className="aspect-[16/10]" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {course.bestseller && <Badge tone="overlay">Bestseller</Badge>}
          {discount > 0 && !isEnrolled && <Badge tone="solidSuccess">{discount}% off</Badge>}
          {isEnrolled && <Badge tone="solidBrand">Enrolled</Badge>}
        </div>
        <button
          type="button"
          onClick={onToggleFavorite}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Remove ${course.title} from saved courses` : `Save ${course.title}`}
          className={cn(
            'absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full shadow-md backdrop-blur transition active:scale-90',
            isFavorite
              ? 'bg-primary text-white'
              : 'bg-white/90 text-slate-700 hover:bg-white hover:text-primary dark:bg-slate-900/80 dark:text-slate-200',
          )}
        >
          <Bookmark className={cn('size-4.5', isFavorite && 'fill-current')} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-primary-ink">{category?.name}</p>
        <h3 className="mt-1.5 text-base font-bold leading-snug sm:text-lg">
          <Link
            to={`/courses/${course.id}`}
            className="line-clamp-2 rounded after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-4"
          >
            {course.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-fg-muted">{instructor?.name}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          <Rating value={course.rating} />
          <span className="inline-flex items-center gap-1 text-xs text-fg-subtle">
            <Users className="size-3.5" aria-hidden="true" />
            <span className="sr-only">Students: </span>
            {formatCompact(course.students)}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-fg-subtle">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden="true" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <BarChart3 className="size-3.5" aria-hidden="true" />
            {course.level}
          </span>
        </div>

        <div className="mt-auto pt-4">
          {showProgress ? (
            <div className="space-y-3 border-t border-line pt-4">
              <ProgressBar value={percent} label={`${course.title} progress`} />
              {variant === 'learning' && lastLesson && (
                <p className="truncate text-xs text-fg-muted">
                  Last lesson: <span className="font-semibold text-fg">{lastLesson.title}</span>
                </p>
              )}
              {variant === 'learning' && (
                <ButtonLink
                  to={continuePath}
                  size="sm"
                  fullWidth
                  className="relative z-10"
                  leftIcon={<PlayCircle className="size-4" />}
                >
                  {percent === 100 ? 'Review course' : 'Continue'}
                </ButtonLink>
              )}
            </div>
          ) : (
            <div className="flex items-baseline justify-between border-t border-line pt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-extrabold">{formatPrice(course.price)}</span>
                {course.originalPrice && (
                  <span className="text-sm text-fg-subtle line-through">
                    <span className="sr-only">Original price </span>
                    {formatPrice(course.originalPrice)}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold text-fg-subtle">{course.lessonsCount} lessons</span>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export const CourseCard = memo(CourseCardBase)
