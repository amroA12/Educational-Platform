import { create } from 'zustand'

export type ToastKind = 'success' | 'error' | 'info'

export interface Toast {
  id: number
  kind: ToastKind
  title: string
  description?: string
}

interface ToastState {
  toasts: Toast[]
  push: (toast: Omit<Toast, 'id'>) => void
  dismiss: (id: number) => void
}

let nextId = 1
const AUTO_DISMISS_MS = 4500

export const useToastStore = create<ToastState>()((set, get) => ({
  toasts: [],
  push: (toast) => {
    const id = nextId++
    set((state) => ({ toasts: [...state.toasts.slice(-3), { ...toast, id }] }))
    window.setTimeout(() => get().dismiss(id), AUTO_DISMISS_MS)
  },
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}))

/** Imperative helper so non-component code (stores, handlers) can show toasts. */
export const toast = {
  success: (title: string, description?: string) =>
    useToastStore.getState().push({ kind: 'success', title, description }),
  error: (title: string, description?: string) =>
    useToastStore.getState().push({ kind: 'error', title, description }),
  info: (title: string, description?: string) =>
    useToastStore.getState().push({ kind: 'info', title, description }),
}
