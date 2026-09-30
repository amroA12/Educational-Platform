import { Link } from 'react-router-dom'
import { BookOpen, Users } from 'lucide-react'
import { getCoursesByInstructor } from '@/data/courses'
import type { Instructor } from '@/types'
import { formatCompact } from '@/utils/format'
import { Avatar } from '@/components/common/Avatar'
import { Rating } from '@/components/common/Rating'

export function InstructorCard({ instructor }: { instructor: Instructor }) {
  const coursesCount = getCoursesByInstructor(instructor.id).length
  return (
    <article className="group card relative flex h-full flex-col items-center p-6 text-center transition duration-200 hover:-translate-y-1 hover:shadow-card-hover">
      <Avatar name={instructor.name} tone={instructor.tone} size="xl" className="ring-4" />
      <h3 className="mt-4 text-lg font-bold">
        <Link
          to={`/instructors/${instructor.id}`}
          className="rounded after:absolute after:inset-0 after:content-['']"
        >
          {instructor.name}
        </Link>
      </h3>
      <p className="mt-0.5 text-sm text-fg-muted">{instructor.title}</p>
      <Rating value={instructor.rating} className="mt-3" />
      <dl className="mt-5 grid w-full grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
        <div>
          <dt className="sr-only">Students</dt>
          <dd className="flex items-center justify-center gap-1.5 font-semibold">
            <Users className="size-4 text-fg-subtle" aria-hidden="true" />
            {formatCompact(instructor.students)}
            <span className="font-normal text-fg-subtle">students</span>
          </dd>
        </div>
        <div>
          <dt className="sr-only">Courses</dt>
          <dd className="flex items-center justify-center gap-1.5 font-semibold">
            <BookOpen className="size-4 text-fg-subtle" aria-hidden="true" />
            {coursesCount}
            <span className="font-normal text-fg-subtle">{coursesCount === 1 ? 'course' : 'courses'}</span>
          </dd>
        </div>
      </dl>
    </article>
  )
}
