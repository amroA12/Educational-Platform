import { DEMO_EMAIL } from '@/data/users'
import { useAuthStore, type LoginInput, type RegisterInput } from '@/store/authStore'
import { storage } from './storage'
import type { User } from '@/types'
import { initializeEmptyLearnerData, seedDemoLearnerData } from './seedDemo'

/** Prepares learner data for whoever just signed in. */
const prepareLearnerData = ({ email }: User) => {
  if (email.toLowerCase() === DEMO_EMAIL) seedDemoLearnerData()
  else initializeEmptyLearnerData()
}

export const signIn = (input: LoginInput) => useAuthStore.getState().login(input, prepareLearnerData)

export const signInAsDemo = () => useAuthStore.getState().loginDemo(prepareLearnerData)

export const signUp = (input: RegisterInput) => useAuthStore.getState().register(input, prepareLearnerData)

export const signOut = () => useAuthStore.getState().logout()

/** Wipes every Learnify key from the browser and restarts the app with fresh demo data. */
export const resetAllLocalData = () => {
  storage.clearAll()
  window.location.assign('/')
}
