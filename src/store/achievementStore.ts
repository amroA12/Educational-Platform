import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { persistJson } from '@/lib/storage'

interface AchievementState {
  /** Achievement id → ISO date it was unlocked. */
  unlocked: Record<string, string>
  unlock: (id: string, at?: string) => void
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set) => ({
      unlocked: {},
      unlock: (id, at = new Date().toISOString()) =>
        set((state) => (state.unlocked[id] ? state : { unlocked: { ...state.unlocked, [id]: at } })),
    }),
    { name: 'achievements', storage: persistJson },
  ),
)
