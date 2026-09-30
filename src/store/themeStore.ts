import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { persistJson } from '@/lib/storage'

export type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeState {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
}

const systemQuery = () => window.matchMedia('(prefers-color-scheme: dark)')

const applyTheme = (mode: ThemeMode) => {
  const dark = mode === 'dark' || (mode === 'system' && systemQuery().matches)
  document.documentElement.classList.toggle('dark', dark)
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'system',
      setMode: (mode) => set({ mode }),
    }),
    {
      name: 'theme',
      storage: persistJson,
      partialize: (state) => ({ mode: state.mode }),
      onRehydrateStorage: () => (state) => applyTheme(state?.mode ?? 'system'),
    },
  ),
)

// Keep the <html> class in sync with the store and with OS-level changes while in "system" mode.
useThemeStore.subscribe((state) => applyTheme(state.mode))
systemQuery().addEventListener('change', () => {
  if (useThemeStore.getState().mode === 'system') applyTheme('system')
})
