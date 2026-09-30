import { getLessons } from '@/data/lessons'
import { useProgressStore } from '@/store/progressStore'

/**
 * The lesson a learner should open next: the one they were on if unfinished, otherwise the next
 * unfinished lesson after it, otherwise the first unfinished lesson (or the start once complete).
 */
export const getResumeLessonId = (
  courseId: string,
  completedIds: string[] = [],
  lastLessonId?: string,
) => {
  const lessons = getLessons(courseId)
  const lastIndex = lessons.findIndex((lesson) => lesson.id === lastLessonId)
  const isPending = (id: string) => !completedIds.includes(id)

  if (lastIndex >= 0 && isPending(lessons[lastIndex].id)) return lessons[lastIndex].id
  const next =
    lessons.slice(lastIndex + 1).find((lesson) => isPending(lesson.id)) ??
    lessons.find((lesson) => isPending(lesson.id))
  return (next ?? lessons[Math.max(lastIndex, 0)])?.id
}

export const learnPath = (courseId: string, lessonId?: string) =>
  lessonId ? `/learn/${courseId}/${lessonId}` : `/courses/${courseId}`

/** Path a "Continue" button should point to for a course. */
export const useContinuePath = (courseId: string) => {
  const completed = useProgressStore((state) => state.completedLessons[courseId])
  const last = useProgressStore((state) => state.lastLesson[courseId]?.lessonId)
  return learnPath(courseId, getResumeLessonId(courseId, completed, last))
}
