import { Link, useParams } from 'react-router-dom'
import { BookOpen, ChevronRight, UserX, Users } from 'lucide-react'
import { getCoursesByInstructor } from '@/data/courses'
import { getInstructor } from '@/data/instructors'
import { formatNumber } from '@/utils/format'
import { Avatar } from '@/components/common/Avatar'
import { Badge } from '@/components/common/Badge'
import { ButtonLink } from '@/components/common/Button'
import { EmptyState } from '@/components/common/EmptyState'
import { Rating } from '@/components/common/Rating'
import { Seo } from '@/components/common/Seo'
import { CourseGrid } from '@/components/course/CourseGrid'

export default function InstructorDetails() {
  const { instructorId = '' } = useParams()
  const instructor = getInstructor(instructorId)

  if (!instructor) {
    return (
      <div className="container-page py-16">
        <Seo title="Instructor not found" />
        <EmptyState
          icon={UserX}
          title="Instructor not found"
          message="We couldn't find that instructor profile."
          action={<ButtonLink to="/instructors">View all instructors</ButtonLink>}
        />
      </div>
    )
  }

  const instructorCourses = getCoursesByInstructor(instructor.id)

  return (
    <div className="container-page py-10 sm:py-14">
      <Seo title={instructor.name} description={`${instructor.name}, ${instructor.title}. ${instructor.bio.slice(0, 110)}…`} />
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-fg-muted">
        <Link to="/instructors" className="hover:text-primary-ink">Instructors</Link>
        <ChevronRight className="size-4" aria-hidden="true" />
        <span aria-current="page" className="font-semibold text-fg">{instructor.name}</span>
      </nav>

      <header className="card flex flex-col gap-6 p-6 sm:flex-row sm:items-start sm:p-8">
        <Avatar name={instructor.name} tone={instructor.tone} size="xl" className="ring-4" />
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-extrabold">{instructor.name}</h1>
          <p className="mt-1 text-lg text-fg-muted">{instructor.title}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <Rating value={instructor.rating} size="md" />
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <Users className="size-4 text-fg-subtle" aria-hidden="true" />
              {formatNumber(instructor.students)} students
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <BookOpen className="size-4 text-fg-subtle" aria-hidden="true" />
              {instructorCourses.length} {instructorCourses.length === 1 ? 'course' : 'courses'}
            </span>
          </div>
          <p className="mt-5 max-w-3xl leading-relaxed text-fg-muted">{instructor.bio}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Areas of expertise">
            {instructor.expertise.map((item) => (
              <li key={item}>
                <Badge tone="brand">{item}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section className="mt-12" aria-labelledby="instructor-courses">
        <h2 id="instructor-courses" className="mb-6 text-2xl font-extrabold">
          Courses by {instructor.name}
        </h2>
        <CourseGrid courses={instructorCourses} />
      </section>
    </div>
  )
}
