import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { persistJson } from '@/lib/storage'
import type { QuizResult } from '@/types'

interface QuizState {
  /** Course id → every attempt, oldest first. */
  attempts: Record<string, QuizResult[]>
  saveResult: (result: QuizResult) => void
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      attempts: {},
      saveResult: (result) =>
        set((state) => ({
          attempts: {
            ...state.attempts,
            [result.courseId]: [...(state.attempts[result.courseId] ?? []), result],
          },
        })),
    }),
    { name: 'quizzes', storage: persistJson },
  ),
)
