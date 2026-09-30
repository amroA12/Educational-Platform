import { Link } from 'react-router-dom'
import { BookOpen, Users } from 'lucide-react'
import { getCoursesByInstructor } from '@/data/courses'
import type { Instructor } from '@/types'
import { formatNumber } from '@/utils/format'
import { Avatar } from '@/components/common/Avatar'
import { Rating } from '@/components/common/Rating'

export function CourseInstructor({ instructor }: { instructor: Instructor }) {
  const coursesCount = getCoursesByInstructor(instructor.id).length
  return (
    <div className="card flex flex-col gap-5 p-5 sm:flex-row sm:p-6">
      <Avatar name={instructor.name} tone={instructor.tone} size="xl" className="ring-4" />
      <div className="min-w-0">
        <h3 className="text-xl font-bold">
          <Link to={`/instructors/${instructor.id}`} className="hover:text-primary-ink hover:underline">
            {instructor.name}
          </Link>
        </h3>
        <p className="text-fg-muted">{instructor.title}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <Rating value={instructor.rating} />
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-4 text-fg-subtle" aria-hidden="true" />
            {formatNumber(instructor.students)} students
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="size-4 text-fg-subtle" aria-hidden="true" />
            {coursesCount} {coursesCount === 1 ? 'course' : 'courses'}
          </span>
        </div>
        <p className="mt-4 leading-relaxed text-fg-muted">{instructor.bio}</p>
      </div>
    </div>
  )
}
