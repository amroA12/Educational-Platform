import type { User } from '@/types'
import type { ProfileValues } from './schemas'

export const toProfileValues = (user: User): ProfileValues => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  headline: user.headline,
  location: user.location,
  bio: user.bio,
  skills: user.skills.join(', '),
})

/** Shared by the profile modal and the Settings > Account form. */
export const parseSkills = (value: string) =>
  value
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean)
    .slice(0, 12)
