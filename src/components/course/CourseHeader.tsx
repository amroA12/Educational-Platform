import { Link } from 'react-router-dom'
import { BarChart3, Clock, Globe, PlayCircle, RefreshCw, Users } from 'lucide-react'
import { getCategory } from '@/data/categories'
import { getInstructor } from '@/data/instructors'
import type { Course } from '@/types'
import { formatDate, formatNumber } from '@/utils/format'
import { Avatar } from '@/components/common/Avatar'
import { Badge } from '@/components/common/Badge'
import { Rating } from '@/components/common/Rating'

function Meta({ icon: Icon, children }: { icon: typeof Clock; children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5">
      <Icon className="size-4 text-fg-subtle" aria-hidden="true" />
      {children}
    </li>
  )
}

export function CourseHeader({ course }: { course: Course }) {
  const category = getCategory(course.categoryId)
  const instructor = getInstructor(course.instructorId)

  return (
    <header>
      <div className="flex flex-wrap items-center gap-2">
        {category && (
          <Link to={`/categories/${category.id}`}>
            <Badge tone="brand">{category.name}</Badge>
          </Link>
        )}
        {course.bestseller && <Badge tone="warning">Bestseller</Badge>}
      </div>
      <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">{course.title}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-fg-muted">{course.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <span className="inline-flex items-center gap-2">
          <Rating value={course.rating} size="md" />
          <span className="text-fg-subtle">({formatNumber(course.reviewsCount)} reviews)</span>
        </span>
        <span className="inline-flex items-center gap-1.5 font-semibold">
          <Users className="size-4 text-fg-subtle" aria-hidden="true" />
          {formatNumber(course.students)} students
        </span>
      </div>

      {instructor && (
        <p className="mt-4 flex items-center gap-2.5 text-sm text-fg-muted">
          <Avatar name={instructor.name} tone={instructor.tone} size="sm" />
          Created by{' '}
          <Link to={`/instructors/${instructor.id}`} className="font-bold text-primary-ink hover:underline">
            {instructor.name}
          </Link>
        </p>
      )}

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg-muted">
        <Meta icon={Clock}>{course.duration} total</Meta>
        <Meta icon={PlayCircle}>{course.lessonsCount} lessons</Meta>
        <Meta icon={BarChart3}>{course.level}</Meta>
        <Meta icon={Globe}>{course.language}</Meta>
        <Meta icon={RefreshCw}>Updated {formatDate(course.updatedAt, 'MMM yyyy')}</Meta>
      </ul>
    </header>
  )
}
