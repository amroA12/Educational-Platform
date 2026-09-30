import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { demoUser, DEMO_EMAIL } from '@/data/users'
import { delay } from '@/lib/async'
import { sessionAwareJson } from '@/lib/storage'
import type { User } from '@/types'

export interface LoginInput {
  email: string
  password: string
  remember: boolean
}

export interface RegisterInput {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type EditableProfile = Pick<
  User,
  'firstName' | 'lastName' | 'email' | 'headline' | 'bio' | 'location' | 'skills'
>

interface AuthState {
  user: User | null
  remember: boolean
  login: (input: LoginInput) => Promise<User>
  loginDemo: () => Promise<User>
  register: (input: RegisterInput) => Promise<User>
  logout: () => void
  updateProfile: (patch: Partial<EditableProfile>) => void
}

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

/** Builds a plausible profile from an email address for demo sign-ins. */
const userFromEmail = (email: string): User => {
  const local = email.split('@')[0] ?? 'learner'
  const [first = 'Learner', last = ''] = local.split(/[._-]/)
  return {
    id: `user-${local.toLowerCase()}`,
    firstName: capitalize(first),
    lastName: capitalize(last),
    email,
    role: 'Student',
    headline: 'Lifelong learner',
    bio: '',
    location: '',
    skills: [],
    joinedAt: new Date().toISOString(),
  }
}

/**
 * Demo authentication: there is no server. Sign-in is simulated with a short delay
 * and the resulting user is persisted locally (see `sessionAwareStorage` for "Remember me").
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      remember: true,
      login: async ({ email, password, remember }) => {
        await delay(700)
        if (password.length < 6) throw new Error('Incorrect email or password.')
        const existing = get().user
        const isSameUser = existing?.email.toLowerCase() === email.toLowerCase()
        const user = isSameUser
          ? existing
          : email.toLowerCase() === DEMO_EMAIL
            ? demoUser
            : userFromEmail(email)
        set({ user, remember })
        return user
      },
      loginDemo: async () => {
        await delay(500)
        const existing = get().user
        const user = existing?.email === DEMO_EMAIL ? existing : demoUser
        set({ user, remember: true })
        return user
      },
      register: async ({ firstName, lastName, email }) => {
        await delay(900)
        const user: User = { ...userFromEmail(email), firstName, lastName }
        set({ user, remember: true })
        return user
      },
      logout: () => set({ user: null }),
      updateProfile: (patch) =>
        set((state) => (state.user ? { user: { ...state.user, ...patch } } : state)),
    }),
    {
      name: 'auth',
      storage: sessionAwareJson,
      partialize: (state) => ({ user: state.user, remember: state.remember }),
    },
  ),
)

export const selectFullName = (user: User | null) =>
  user ? `${user.firstName} ${user.lastName}`.trim() : ''
