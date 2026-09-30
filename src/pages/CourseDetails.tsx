import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BookX, Check, ChevronRight } from 'lucide-react'
import { getCategory } from '@/data/categories'
import { courses, getCourse } from '@/data/courses'
import { getInstructor } from '@/data/instructors'
import { useSimulatedLoading } from '@/hooks/useSimulatedLoading'
import { ButtonLink } from '@/components/common/Button'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { CourseDetailsSkeleton } from '@/components/common/Skeleton'
import { Seo } from '@/components/common/Seo'
import { CourseCurriculum } from '@/components/course/CourseCurriculum'
import { CourseGrid } from '@/components/course/CourseGrid'
import { CourseHeader } from '@/components/course/CourseHeader'
import { CourseInstructor } from '@/components/course/CourseInstructor'
import { CourseReviews } from '@/components/course/CourseReviews'
import { EnrollCard } from '@/components/course/EnrollCard'

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      <h2 id={id} className="mb-5 text-2xl font-extrabold">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function CourseDetails() {
  const { courseId = '' } = useParams()
  const course = getCourse(courseId)
  const { loading, error, retry } = useSimulatedLoading(`course-${courseId}`, 500)

  if (!course) {
    return (
      <div className="container-page py-16">
        <Seo title="Course not found" />
        <EmptyState
          icon={BookX}
          title="Course not found"
          message="This course doesn't exist or may have been removed."
          action={<ButtonLink to="/courses">Browse courses</ButtonLink>}
        />
      </div>
    )
  }

  const category = getCategory(course.categoryId)
  const instructor = getInstructor(course.instructorId)
  const related = courses
    .filter((item) => item.categoryId === course.categoryId && item.id !== course.id)
    .concat(courses.filter((item) => item.categoryId !== course.categoryId))
    .slice(0, 3)

  return (
    <div className="container-page py-8 sm:py-12">
      <Seo title={course.title} description={course.description.slice(0, 155)} />
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-fg-muted">
        <Link to="/courses" className="hover:text-primary-ink">Courses</Link>
        <ChevronRight className="size-4" aria-hidden="true" />
        {category && (
          <>
            <Link to={`/categories/${category.id}`} className="hover:text-primary-ink">{category.name}</Link>
            <ChevronRight className="size-4" aria-hidden="true" />
          </>
        )}
        <span aria-current="page" className="font-semibold text-fg">{course.title}</span>
      </nav>

      {loading ? (
        <CourseDetailsSkeleton />
      ) : error ? (
        <ErrorState onRetry={retry} />
      ) : (
        <>
          <div className="grid gap-x-10 gap-y-12 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
            <div className="lg:col-start-1 lg:row-start-1">
              <CourseHeader course={course} />
            </div>

            <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start lg:sticky lg:top-24">
              <EnrollCard course={course} />
            </div>

            <div className="min-w-0 space-y-12 lg:col-start-1 lg:row-start-2">

              <Section id="learn" title="What you'll learn">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {course.learn.map((item) => (
                    <li key={item} className="card flex items-start gap-3 p-4">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-success-ink">
                        <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="requirements" title="Course requirements">
                <ul className="list-disc space-y-2 pl-5 text-fg-muted marker:text-primary-ink">
                  {course.requirements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Section>

              <Section id="curriculum" title="Course curriculum">
                <CourseCurriculum courseId={course.id} />
              </Section>

              {instructor && (
                <Section id="instructor" title="Your instructor">
                  <CourseInstructor instructor={instructor} />
                </Section>
              )}

              <Section id="reviews" title="Student reviews">
                <CourseReviews course={course} />
              </Section>
            </div>
          </div>

          <section aria-labelledby="related" className="mt-16 border-t border-line pt-12">
            <h2 id="related" className="mb-6 text-2xl font-extrabold">
              You might also like
            </h2>
            <CourseGrid courses={related} />
          </section>
        </>
      )}
    </div>
  )
}
