import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { persistJson } from '@/lib/storage'
import type { NotificationItem } from '@/types'

interface NotificationState {
  items: NotificationItem[]
  add: (item: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>) => void
  replaceAll: (items: NotificationItem[]) => void
  markRead: (id: string) => void
  markAllRead: () => void
  remove: (id: string) => void
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      items: [],
      add: (item) =>
        set((state) => ({
          items: [
            { ...item, id: crypto.randomUUID(), createdAt: new Date().toISOString(), read: false },
            ...state.items,
          ].slice(0, 30),
        })),
      replaceAll: (items) => set({ items }),
      markRead: (id) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, read: true } : item)),
        })),
      markAllRead: () =>
        set((state) => ({ items: state.items.map((item) => ({ ...item, read: true })) })),
      remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    }),
    { name: 'notifications', storage: persistJson },
  ),
)

export const useUnreadCount = () =>
  useNotificationStore((state) => state.items.filter((item) => !item.read).length)
