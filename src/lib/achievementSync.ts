import { achievements } from '@/data/achievements'
import { getCourse } from '@/data/courses'
import { useAchievementStore } from '@/store/achievementStore'
import { useCourseStore } from '@/store/courseStore'
import { useNotificationStore } from '@/store/notificationStore'
import { useProgressStore } from '@/store/progressStore'
import { useQuizStore } from '@/store/quizStore'
import { toast } from '@/store/toastStore'
import { computeLearnerStats, getCourseProgressInfo } from './stats'

const readStats = () =>
  computeLearnerStats({
    enrollments: useCourseStore.getState().enrollments,
    favorites: useCourseStore.getState().favorites,
    completedAt: useProgressStore.getState().completedAt,
    completedLessons: useProgressStore.getState().completedLessons,
    studyLog: useProgressStore.getState().studyLog,
    attempts: useQuizStore.getState().attempts,
  })

/** Unlocks any achievement whose target is now met. `silent` skips toasts and notifications. */
export const syncAchievements = ({ silent = false }: { silent?: boolean } = {}) => {
  const stats = readStats()
  const { unlocked, unlock } = useAchievementStore.getState()
  achievements.forEach((achievement) => {
    if (unlocked[achievement.id] || stats[achievement.metric] < achievement.target) return
    unlock(achievement.id)
    if (silent) return
    toast.success('Achievement unlocked', achievement.name)
    useNotificationStore.getState().add({
      title: 'You completed a new achievement',
      message: `${achievement.name} — ${achievement.description}`,
      kind: 'achievement',
    })
  })
}

const MILESTONES = [25, 50, 75]
const announced = new Set<string>()

/** Adds a notification when a course crosses a progress milestone (25%, 50%, 75%). */
const announceMilestones = (
  previous: Record<string, string[]>,
  next: Record<string, string[]>,
) => {
  Object.keys(next).forEach((courseId) => {
    const before = getCourseProgressInfo(courseId, previous[courseId]).percent
    const after = getCourseProgressInfo(courseId, next[courseId]).percent
    const crossed = MILESTONES.find((mark) => before < mark && after >= mark)
    const key = `${courseId}:${crossed}`
    if (!crossed || announced.has(key)) return
    announced.add(key)
    useNotificationStore.getState().add({
      title: `Course progress reached ${crossed}%`,
      message: `Nice work on ${getCourse(courseId)?.title ?? 'your course'}. Keep going!`,
      kind: 'progress',
    })
  })
}

let started = false
let paused = false

/** Runs a bulk state change (e.g. demo seeding) without producing toasts or notifications. */
export const runSilently = (fn: () => void) => {
  paused = true
  try {
    fn()
  } finally {
    paused = false
  }
}

/** Subscribes once at app start so gamification reacts to any store change, wherever it happens. */
export const startAchievementSync = () => {
  if (started) return
  started = true
  useProgressStore.subscribe((state, prev) => {
    if (paused) return
    if (state.completedLessons !== prev.completedLessons) {
      announceMilestones(prev.completedLessons, state.completedLessons)
    }
    if (state.studyLog !== prev.studyLog || state.completedAt !== prev.completedAt) syncAchievements()
  })
  useQuizStore.subscribe((state, prev) => {
    if (paused) return
    if (state.attempts !== prev.attempts) syncAchievements()
  })
  useCourseStore.subscribe((state, prev) => {
    if (paused) return
    if (state.enrollments !== prev.enrollments || state.favorites !== prev.favorites) syncAchievements()
  })
}
