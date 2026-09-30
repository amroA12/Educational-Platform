import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getLessons } from '@/data/lessons'
import { persistJson } from '@/lib/storage'
import { dateKey } from '@/utils/date'
import type { StudyDay } from '@/types'

interface ProgressState {
  /** True once demo data has been seeded (or the device was used by a fresh account). */
  initialized: boolean
  /** Course id → ids of completed lessons. */
  completedLessons: Record<string, string[]>
  /** Course id → last lesson the learner opened. */
  lastLesson: Record<string, { lessonId: string; at: string }>
  /** Course id → ISO date the final lesson was completed. */
  completedAt: Record<string, string>
  /** yyyy-MM-dd → study activity for that day. */
  studyLog: Record<string, StudyDay>
  /** Lesson id → personal note. */
  notes: Record<string, string>

  toggleLessonComplete: (courseId: string, lessonId: string, minutes: number) => boolean
  setLastLesson: (courseId: string, lessonId: string) => void
  setNote: (lessonId: string, text: string) => void
  logStudyTime: (minutes: number) => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      initialized: false,
      completedLessons: {},
      lastLesson: {},
      completedAt: {},
      studyLog: {},
      notes: {},

      /** Toggles a lesson and returns whether it is now complete. */
      toggleLessonComplete: (courseId, lessonId, minutes) => {
        const current = get().completedLessons[courseId] ?? []
        const wasComplete = current.includes(lessonId)
        const next = wasComplete ? current.filter((id) => id !== lessonId) : [...current, lessonId]
        const totalLessons = getLessons(courseId).length
        const isCourseComplete = next.length >= totalLessons && totalLessons > 0

        set((state) => {
          const { [courseId]: _previous, ...otherCompletions } = state.completedAt
          const today = dateKey()
          const day = state.studyLog[today] ?? { minutes: 0, lessons: 0 }
          return {
            completedLessons: { ...state.completedLessons, [courseId]: next },
            completedAt: isCourseComplete
              ? { ...otherCompletions, [courseId]: state.completedAt[courseId] ?? new Date().toISOString() }
              : otherCompletions,
            studyLog: wasComplete
              ? state.studyLog
              : {
                  ...state.studyLog,
                  [today]: { minutes: day.minutes + minutes, lessons: day.lessons + 1 },
                },
          }
        })
        return !wasComplete
      },

      setLastLesson: (courseId, lessonId) =>
        set((state) =>
          state.lastLesson[courseId]?.lessonId === lessonId
            ? state
            : {
                lastLesson: {
                  ...state.lastLesson,
                  [courseId]: { lessonId, at: new Date().toISOString() },
                },
              },
        ),

      setNote: (lessonId, text) => set((state) => ({ notes: { ...state.notes, [lessonId]: text } })),

      logStudyTime: (minutes) =>
        set((state) => {
          const today = dateKey()
          const day = state.studyLog[today] ?? { minutes: 0, lessons: 0 }
          return { studyLog: { ...state.studyLog, [today]: { ...day, minutes: day.minutes + minutes } } }
        }),
    }),
    { name: 'progress', storage: persistJson },
  ),
)

/** Course progress as a whole-number percentage (primitive selector → no extra renders). */
export const useCourseProgress = (courseId: string) =>
  useProgressStore((state) => {
    const total = getLessons(courseId).length
    const done = state.completedLessons[courseId]?.length ?? 0
    return total === 0 ? 0 : Math.round((done / total) * 100)
  })
