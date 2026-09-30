import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { persistJson } from '@/lib/storage'

export interface NotificationPrefs {
  courseReminders: boolean
  quizReminders: boolean
  achievements: boolean
  marketing: boolean
}

export type Language = 'en' | 'es' | 'fr' | 'de' | 'ar'

interface SettingsState {
  notifications: NotificationPrefs
  language: Language
  /** Daily learning goal in minutes. */
  dailyGoalMinutes: number
  autoplayNext: boolean
  defaultSpeed: number
  setNotification: (key: keyof NotificationPrefs, value: boolean) => void
  update: (patch: Partial<Pick<SettingsState, 'language' | 'dailyGoalMinutes' | 'autoplayNext' | 'defaultSpeed'>>) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notifications: {
        courseReminders: true,
        quizReminders: true,
        achievements: true,
        marketing: false,
      },
      language: 'en',
      dailyGoalMinutes: 60,
      autoplayNext: true,
      defaultSpeed: 1,
      setNotification: (key, value) =>
        set((state) => ({ notifications: { ...state.notifications, [key]: value } })),
      update: (patch) => set(patch),
    }),
    { name: 'settings', storage: persistJson },
  ),
)
