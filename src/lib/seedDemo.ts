import { buildSeedNotifications } from '@/data/notifications'
import { getLessons } from '@/data/lessons'
import { getQuizByCourse } from '@/data/quizzes'
import {
  buildDemoStudyLog,
  demoCompletions,
  demoEnrollments,
  demoFavorites,
} from '@/data/users'
import { useAchievementStore } from '@/store/achievementStore'
import { useCourseStore } from '@/store/courseStore'
import { useNotificationStore } from '@/store/notificationStore'
import { useProgressStore } from '@/store/progressStore'
import { useQuizStore } from '@/store/quizStore'
import { dateKeyDaysAgo, isoDaysAgo } from '@/utils/date'
import { runSilently, syncAchievements } from './achievementSync'
import { getDay } from 'date-fns'

const seedQuizAttempt = (courseId: string, percentCorrect: number, daysAgo: number) => {
  const quiz = getQuizByCourse(courseId)
  if (!quiz) return
  const total = quiz.questions.length
  const correct = Math.round((percentCorrect / 100) * total)
  const answers: Record<string, number> = {}
  quiz.questions.forEach((question, index) => {
    answers[question.id] =
      index < correct ? question.correctIndex : (question.correctIndex + 1) % question.options.length
  })
  useQuizStore.getState().saveResult({
    courseId,
    answers,
    correct,
    total,
    percent: Math.round((correct / total) * 100),
    durationSeconds: 240 + total * 18,
    submittedAt: isoDaysAgo(daysAgo),
  })
}

/**
 * Fills the learner stores with a realistic demo history. Runs once per browser profile,
 * the first time the demo account signs in (see `progressStore.initialized`).
 */
export const seedDemoLearnerData = () => {
  if (useProgressStore.getState().initialized) return
  runSilently(applyDemoSeed)
  syncAchievements({ silent: true })
}

const applyDemoSeed = () => {

  const completedLessons: Record<string, string[]> = {}
  const lastLesson: Record<string, { lessonId: string; at: string }> = {}
  const enrollments: Record<string, string> = {}

  demoEnrollments.forEach(({ courseId, percent, daysAgoEnrolled }, index) => {
    const lessons = getLessons(courseId)
    const doneCount = Math.round((percent / 100) * lessons.length)
    const done = lessons.slice(0, doneCount)
    completedLessons[courseId] = done.map((lesson) => lesson.id)
    enrollments[courseId] = isoDaysAgo(daysAgoEnrolled)
    const next = lessons[Math.min(doneCount, lessons.length - 1)]
    // Most recently touched courses are the in-progress ones, newest first.
    lastLesson[courseId] = { lessonId: next.id, at: isoDaysAgo(index * 0.7 + 0.2) }
  })

  const completedAt: Record<string, string> = {}
  demoCompletions.forEach(({ courseId, daysAgo }) => {
    completedAt[courseId] = isoDaysAgo(daysAgo)
  })

  useProgressStore.setState({
    initialized: true,
    completedLessons,
    lastLesson,
    completedAt,
    studyLog: buildDemoStudyLog(28, dateKeyDaysAgo, (daysAgo) =>
      getDay(new Date(Date.now() - daysAgo * 86_400_000)),
    ),
    notes: {},
  })
  useCourseStore.setState({ enrollments, favorites: [...demoFavorites] })
  useQuizStore.setState({ attempts: {} })
  seedQuizAttempt('python-for-data-analysis', 100, 97)
  seedQuizAttempt('modern-javascript-mastery', 88, 18)
  useNotificationStore.getState().replaceAll(buildSeedNotifications())
  useAchievementStore.setState({ unlocked: {} })
}

/** A brand-new account starts with a clean slate and a single welcome message. */
export const initializeEmptyLearnerData = () => {
  if (useProgressStore.getState().initialized) return
  useProgressStore.setState({ initialized: true })
  useNotificationStore.getState().replaceAll([
    {
      id: 'n-welcome',
      title: 'Welcome to Learnify',
      message: 'Explore the course catalogue and enroll in your first course to get started.',
      kind: 'system',
      createdAt: new Date().toISOString(),
      read: false,
    },
  ])
}
