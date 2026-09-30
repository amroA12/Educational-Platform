import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { persistJson } from '@/lib/storage'

interface CourseState {
  /** Course ids the learner has saved to their wishlist. */
  favorites: string[]
  /** Course id → ISO enrollment date. */
  enrollments: Record<string, string>
  toggleFavorite: (courseId: string) => boolean
  enroll: (courseId: string, enrolledAt?: string) => void
  unenroll: (courseId: string) => void
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      favorites: [],
      enrollments: {},
      /** Returns the new favourite state so callers can show matching feedback. */
      toggleFavorite: (courseId) => {
        const isFavorite = get().favorites.includes(courseId)
        set((state) => ({
          favorites: isFavorite
            ? state.favorites.filter((id) => id !== courseId)
            : [...state.favorites, courseId],
        }))
        return !isFavorite
      },
      enroll: (courseId, enrolledAt = new Date().toISOString()) =>
        set((state) =>
          state.enrollments[courseId]
            ? state
            : { enrollments: { ...state.enrollments, [courseId]: enrolledAt } },
        ),
      unenroll: (courseId) =>
        set((state) => {
          const { [courseId]: _removed, ...rest } = state.enrollments
          return { enrollments: rest }
        }),
    }),
    { name: 'courses', storage: persistJson },
  ),
)

export const useIsFavorite = (courseId: string) =>
  useCourseStore((state) => state.favorites.includes(courseId))

export const useIsEnrolled = (courseId: string) =>
  useCourseStore((state) => courseId in state.enrollments)
