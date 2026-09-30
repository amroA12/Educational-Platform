import { useMemo } from 'react'
import { courses } from '@/data/courses'
import { useCourseStore } from '@/store/courseStore'
import { useProgressStore } from '@/store/progressStore'
import type { Course } from '@/types'
import { getCourseProgressInfo } from './stats'

export interface EnrolledCourse {
  course: Course
  percent: number
  lastActivityAt: string
}

/** The learner's courses grouped the way dashboard and My Courses need them. */
export const useLearnerCourses = () => {
  const enrollments = useCourseStore((state) => state.enrollments)
  const favorites = useCourseStore((state) => state.favorites)
  const completedLessons = useProgressStore((state) => state.completedLessons)
  const lastLesson = useProgressStore((state) => state.lastLesson)

  return useMemo(() => {
    const enrolled: EnrolledCourse[] = courses
      .filter((course) => course.id in enrollments)
      .map((course) => ({
        course,
        percent: getCourseProgressInfo(course.id, completedLessons[course.id]).percent,
        lastActivityAt: lastLesson[course.id]?.at ?? enrollments[course.id],
      }))
      .sort((a, b) => b.lastActivityAt.localeCompare(a.lastActivityAt))

    return {
      enrolled,
      inProgress: enrolled.filter((item) => item.percent < 100),
      completed: enrolled.filter((item) => item.percent === 100),
      saved: courses.filter((course) => favorites.includes(course.id)),
    }
  }, [enrollments, favorites, completedLessons, lastLesson])
}
