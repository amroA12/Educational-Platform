import { DEMO_EMAIL } from '@/data/users'
import { useAuthStore, type LoginInput, type RegisterInput } from '@/store/authStore'
import { storage } from './storage'
import { initializeEmptyLearnerData, seedDemoLearnerData } from './seedDemo'

/** Prepares learner data for whoever just signed in. */
const prepareLearnerData = (email: string) => {
  if (email.toLowerCase() === DEMO_EMAIL) seedDemoLearnerData()
  else initializeEmptyLearnerData()
}

export const signIn = async (input: LoginInput) => {
  const user = await useAuthStore.getState().login(input)
  prepareLearnerData(user.email)
  return user
}

export const signInAsDemo = async () => {
  const user = await useAuthStore.getState().loginDemo()
  prepareLearnerData(user.email)
  return user
}

export const signUp = async (input: RegisterInput) => {
  const user = await useAuthStore.getState().register(input)
  prepareLearnerData(user.email)
  return user
}

export const signOut = () => useAuthStore.getState().logout()

/** Wipes every Learnify key from the browser and restarts the app with fresh demo data. */
export const resetAllLocalData = () => {
  storage.clearAll()
  window.location.assign('/')
}
