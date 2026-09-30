import { Link } from 'react-router-dom'
import { BookOpen, PlayCircle } from 'lucide-react'
import { getCourse } from '@/data/courses'
import { getLesson } from '@/data/lessons'
import { useContinuePath } from '@/lib/resume'
import { useCourseProgress, useProgressStore } from '@/store/progressStore'
import { ButtonLink } from '@/components/common/Button'
import { EmptyState } from '@/components/common/EmptyState'
import { CourseThumbnail } from '@/components/course/CourseThumbnail'
import { ProgressBar } from '@/components/learning/ProgressBar'

function ContinueItem({ courseId }: { courseId: string }) {
  const course = getCourse(courseId)
  const percent = useCourseProgress(courseId)
  const path = useContinuePath(courseId)
  const lastLessonId = useProgressStore((state) => state.lastLesson[courseId]?.lessonId)
  if (!course) return null
  const lastLesson = lastLessonId ? getLesson(courseId, lastLessonId) : undefined

  return (
    <li className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center">
      <CourseThumbnail course={course} className="aspect-video w-full shrink-0 rounded-xl sm:aspect-auto sm:size-20" />
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-bold">
          <Link to={`/courses/${course.id}`} className="hover:text-primary-ink">
            {course.title}
          </Link>
        </h3>
        {lastLesson && (
          <p className="mt-0.5 truncate text-sm text-fg-muted">
            Last lesson: <span className="font-medium text-fg">{lastLesson.title}</span>
          </p>
        )}
        <ProgressBar value={percent} label={`${course.title} progress`} className="mt-3" />
      </div>
      <ButtonLink to={path} size="sm" className="sm:shrink-0" leftIcon={<PlayCircle className="size-4" />}>
        Continue
      </ButtonLink>
    </li>
  )
}

export function ContinueLearning({ courseIds }: { courseIds: string[] }) {
  if (courseIds.length === 0) {
    return (
      <EmptyState
        compact
        icon={BookOpen}
        title="Nothing in progress yet"
        message="Enroll in a course to start learning. Your active courses will show up here."
        action={<ButtonLink to="/courses">Explore courses</ButtonLink>}
      />
    )
  }
  return (
    <ul className="divide-y divide-line">
      {courseIds.map((id) => (
        <ContinueItem key={id} courseId={id} />
      ))}
    </ul>
  )
}
