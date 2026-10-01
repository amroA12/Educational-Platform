import { format, parseISO } from 'date-fns'
import { useMemo } from 'react'
import { getLessons } from '@/data/lessons'
import { useCourseStore } from '@/store/courseStore'
import { useProgressStore } from '@/store/progressStore'
import { useQuizStore } from '@/store/quizStore'
import type { AchievementMetric, QuizResult, StudyDay } from '@/types'
import { dateKey, dateKeyDaysAgo } from '@/utils/date'

export type LearnerStats = Record<AchievementMetric, number>

interface StatsInput {
  enrollments: Record<string, string>
  favorites: string[]
  completedAt: Record<string, string>
  completedLessons: Record<string, string[]>
  studyLog: Record<string, StudyDay>
  attempts: Record<string, QuizResult[]>
}

/** Consecutive active days ending today (or yesterday, so the streak survives until midnight). */
const computeStreak = (studyLog: Record<string, StudyDay>, today: Date = new Date()) => {
  const isActive = (key: string) => {
    const day = studyLog[key]
    return !!day && (day.minutes > 0 || day.lessons > 0)
  }
  let cursor = isActive(dateKey(today)) ? 0 : 1
  let streak = 0
  while (isActive(dateKeyDaysAgo(cursor, today))) {
    streak += 1
    cursor += 1
  }
  return streak
}

export const computeLearnerStats = (input: StatsInput): LearnerStats => {
  const days = Object.values(input.studyLog)
  const latest = Object.values(input.attempts).flatMap((list) => list.at(-1) ?? [])
  const allAttempts = Object.values(input.attempts).flat()
  const totalLessons = Object.values(input.completedLessons).reduce((sum, ids) => sum + ids.length, 0)
  return {
    enrolledCourses: Object.keys(input.enrollments).length,
    quizzesTaken: Object.keys(input.attempts).length,
    lessonsCompleted: totalLessons,
    streakDays: computeStreak(input.studyLog),
    highScoreQuizzes: latest.filter((attempt) => attempt.percent >= 90).length,
    completedCourses: Object.keys(input.completedAt).length,
    lessonsInOneDay: Math.max(0, ...days.map((day) => day.lessons)),
    perfectQuizzes: allAttempts.filter((attempt) => attempt.percent === 100).length,
    learningHours: Math.round((days.reduce((sum, day) => sum + day.minutes, 0) / 60) * 10) / 10,
    savedCourses: input.favorites.length,
  }
}

/** Current learner stats, recomputed only when the underlying slices change. */
export const useLearnerStats = (): LearnerStats => {
  const enrollments = useCourseStore((state) => state.enrollments)
  const favorites = useCourseStore((state) => state.favorites)
  const completedAt = useProgressStore((state) => state.completedAt)
  const completedLessons = useProgressStore((state) => state.completedLessons)
  const studyLog = useProgressStore((state) => state.studyLog)
  const attempts = useQuizStore((state) => state.attempts)

  return useMemo(
    () => computeLearnerStats({ enrollments, favorites, completedAt, completedLessons, studyLog, attempts }),
    [enrollments, favorites, completedAt, completedLessons, studyLog, attempts],
  )
}

/** Per-course progress numbers used across dashboard, lists, and certificates. */
export const getCourseProgressInfo = (courseId: string, completedIds: string[] = []) => {
  const total = getLessons(courseId).length
  const done = completedIds.length
  return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) }
}

export interface WeeklyActivityPoint {
  key: string
  day: string
  hours: number
}

/** Learning hours for each of the last seven days, oldest first. */
export const useWeeklyActivity = (): WeeklyActivityPoint[] => {
  const studyLog = useProgressStore((state) => state.studyLog)
  return useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) => {
        const daysAgo = 6 - index
        const key = dateKeyDaysAgo(daysAgo)
        const minutes = studyLog[key]?.minutes ?? 0
        return {
          key,
          day: format(parseISO(key), 'EEE'),
          hours: Math.round((minutes / 60) * 10) / 10,
        }
      }),
    [studyLog],
  )
}
