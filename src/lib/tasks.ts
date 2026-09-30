import { addDays } from 'date-fns'
import { courses } from '@/data/courses'
import { getLessons } from '@/data/lessons'
import { getQuizByCourse } from '@/data/quizzes'
import type { QuizResult } from '@/types'
import { getCourseProgressInfo } from './stats'

export interface UpcomingTask {
  id: string
  kind: 'Quiz' | 'Assignment' | 'Milestone'
  title: string
  courseTitle: string
  dueAt: Date
  to: string
}

interface TaskInput {
  enrolledIds: string[]
  completedLessons: Record<string, string[]>
  attempts: Record<string, QuizResult[]>
  today?: Date
}

/** Derives a short, realistic to-do list from the learner's in-progress courses. */
export const buildUpcomingTasks = ({
  enrolledIds,
  completedLessons,
  attempts,
  today = new Date(),
}: TaskInput): UpcomingTask[] => {
  const tasks: Omit<UpcomingTask, 'dueAt'>[] = []

  enrolledIds.forEach((courseId) => {
    const course = courses.find((item) => item.id === courseId)
    if (!course) return
    const done = completedLessons[courseId] ?? []
    const { percent } = getCourseProgressInfo(courseId, done)
    if (percent >= 100) return

    const quiz = getQuizByCourse(courseId)
    if (quiz && !attempts[courseId]?.length) {
      tasks.push({ id: `quiz-${courseId}`, kind: 'Quiz', title: quiz.title, courseTitle: course.title, to: `/quiz/${courseId}` })
    }

    const nextExercise = getLessons(courseId).find((lesson) => lesson.type === 'exercise' && !done.includes(lesson.id))
    if (nextExercise) {
      tasks.push({
        id: `assignment-${nextExercise.id}`,
        kind: 'Assignment',
        title: nextExercise.title,
        courseTitle: course.title,
        to: `/learn/${courseId}/${nextExercise.id}`,
      })
    }

    const nextMark = [25, 50, 75, 100].find((mark) => mark > percent)
    if (nextMark && percent > 0) {
      tasks.push({
        id: `milestone-${courseId}`,
        kind: 'Milestone',
        title: `Reach ${nextMark}% progress`,
        courseTitle: course.title,
        to: `/my-courses`,
      })
    }
  })

  return tasks.slice(0, 4).map((task, index) => ({ ...task, dueAt: addDays(today, index * 2 + 1) }))
}
