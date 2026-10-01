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
  /** Saved profiles by email, so edits survive signing out and back in. */
  profiles: Record<string, User>
  /** True right after an intentional sign-out (not persisted); lets route guards send users home instead of to /login. */
  justSignedOut: boolean
  /** `beforeCommit` runs with the resolved user just before the session starts, so dependent data is ready on first render. */
  login: (input: LoginInput, beforeCommit?: (user: User) => void) => Promise<User>
  loginDemo: (beforeCommit?: (user: User) => void) => Promise<User>
  register: (input: RegisterInput, beforeCommit?: (user: User) => void) => Promise<User>
  logout: () => void
  updateProfile: (patch: Partial<EditableProfile>) => void
}

const profileKey = (email: string) => email.toLowerCase()

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

type SetState = (partial: Partial<AuthState> | ((state: AuthState) => Partial<AuthState>)) => void

const commit = (set: SetState, user: User, remember: boolean) =>
  set((state) => ({
    user,
    remember,
    justSignedOut: false,
    profiles: { ...state.profiles, [profileKey(user.email)]: user },
  }))

/**
 * Demo authentication: there is no server. Sign-in is simulated with a short delay
 * and the resulting user is persisted locally (see `sessionAwareStorage` for "Remember me").
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      remember: true,
      profiles: {},
      justSignedOut: false,
      login: async ({ email, password, remember }, beforeCommit) => {
        await delay(700)
        if (password.length < 6) throw new Error('Incorrect email or password.')
        const user =
          get().profiles[profileKey(email)] ??
          (profileKey(email) === DEMO_EMAIL ? demoUser : userFromEmail(email))
        beforeCommit?.(user)
        commit(set, user, remember)
        return user
      },
      loginDemo: async (beforeCommit) => {
        await delay(500)
        const user = get().profiles[DEMO_EMAIL] ?? demoUser
        beforeCommit?.(user)
        commit(set, user, true)
        return user
      },
      register: async ({ firstName, lastName, email }, beforeCommit) => {
        await delay(900)
        const user: User = { ...userFromEmail(email), firstName, lastName }
        beforeCommit?.(user)
        commit(set, user, true)
        return user
      },
      logout: () => set({ user: null, justSignedOut: true }),
      updateProfile: (patch) =>
        set((state) => {
          if (!state.user) return state
          const user = { ...state.user, ...patch }
          const { [profileKey(state.user.email)]: _previous, ...others } = state.profiles
          return { user, profiles: { ...others, [profileKey(user.email)]: user } }
        }),
    }),
    {
      name: 'auth',
      storage: sessionAwareJson,
      partialize: (state) => ({ user: state.user, remember: state.remember, profiles: state.profiles }),
    },
  ),
)

export const selectFullName = (user: User | null) =>
  user ? `${user.firstName} ${user.lastName}`.trim() : ''
