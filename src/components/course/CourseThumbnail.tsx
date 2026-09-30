import { categoryIcons } from '@/lib/icons'
import { toneBackground } from '@/lib/tones'
import { getCategory } from '@/data/categories'
import type { Course } from '@/types'
import { cn } from '@/utils/cn'

interface CourseThumbnailProps {
  course: Pick<Course, 'thumbnail' | 'categoryId' | 'title'>
  className?: string
  size?: 'card' | 'hero'
}

/**
 * Generated artwork for a course: tone gradient, soft geometric pattern, and category icon.
 * Keeps the project self-contained (no remote images) while still looking like real course media.
 */
export function CourseThumbnail({ course, className, size = 'card' }: CourseThumbnailProps) {
  const category = getCategory(course.categoryId)
  const Icon = categoryIcons[category?.icon ?? 'code']
  return (
    <div
      role="img"
      aria-label={`${course.title} course artwork`}
      className={cn('relative isolate overflow-hidden', className)}
      style={{ background: toneBackground(course.thumbnail) }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 15%, rgb(255 255 255 / 0.55), transparent 42%), radial-gradient(circle at 90% 90%, rgb(0 0 0 / 0.35), transparent 50%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(255 255 255) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <Icon
        aria-hidden="true"
        className={cn(
          'absolute -bottom-4 -right-3 text-white/20',
          size === 'hero' ? 'size-56' : 'size-32',
        )}
        strokeWidth={1.25}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={cn(
            'flex items-center justify-center rounded-2xl bg-white/20 text-white shadow-lg ring-1 ring-white/30 backdrop-blur-sm',
            size === 'hero' ? 'size-24' : 'size-14',
          )}
        >
          <Icon className={size === 'hero' ? 'size-12' : 'size-7'} aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
