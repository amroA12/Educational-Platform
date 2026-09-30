import type { ReactNode } from 'react'
import { SearchX } from 'lucide-react'
import type { Course } from '@/types'
import { cn } from '@/utils/cn'
import { EmptyState } from '@/components/common/EmptyState'
import { CourseCard } from './CourseCard'

interface CourseGridProps {
  courses: Course[]
  variant?: 'catalog' | 'learning'
  columns?: 3 | 4
  emptyTitle?: string
  emptyMessage?: string
  emptyAction?: ReactNode
  emptyIcon?: typeof SearchX
}

export function CourseGrid({
  courses,
  variant = 'catalog',
  columns = 3,
  emptyTitle = 'No courses found',
  emptyMessage = 'Try adjusting your search or filters to find what you are looking for.',
  emptyAction,
  emptyIcon = SearchX,
}: CourseGridProps) {
  if (courses.length === 0) {
    return <EmptyState icon={emptyIcon} title={emptyTitle} message={emptyMessage} action={emptyAction} />
  }
  return (
    <ul
      className={cn(
        'grid gap-5 sm:grid-cols-2',
        columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-3 2xl:grid-cols-4',
      )}
    >
      {courses.map((course) => (
        <li key={course.id}>
          <CourseCard course={course} variant={variant} />
        </li>
      ))}
    </ul>
  )
}
