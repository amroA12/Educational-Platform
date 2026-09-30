import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { persistJson } from '@/lib/storage'

const MAX_RECENT = 6

interface SearchState {
  recent: string[]
  addRecent: (term: string) => void
  removeRecent: (term: string) => void
  clearRecent: () => void
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      recent: [],
      addRecent: (term) => {
        const clean = term.trim()
        if (clean.length < 2) return
        set((state) => ({
          recent: [clean, ...state.recent.filter((t) => t.toLowerCase() !== clean.toLowerCase())].slice(
            0,
            MAX_RECENT,
          ),
        }))
      },
      removeRecent: (term) => set((state) => ({ recent: state.recent.filter((t) => t !== term) })),
      clearRecent: () => set({ recent: [] }),
    }),
    { name: 'recent-searches', storage: persistJson },
  ),
)
