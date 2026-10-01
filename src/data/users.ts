import type { StudyDay, User } from '@/types'

export const DEMO_EMAIL = 'amr@example.com'

export const demoUser: User = {
  id: 'user-amr',
  firstName: 'Amr',
  lastName: 'Elzaygh',
  email: DEMO_EMAIL,
  role: 'Student',
  headline: 'Aspiring Front-End Developer',
  bio: 'Front-end developer in the making who loves turning designs into fast, accessible interfaces. Currently levelling up on React, TypeScript, and UI design.',
  location: 'Cairo, Egypt',
  skills: ['HTML & CSS', 'JavaScript', 'React', 'Responsive Design', 'Git'],
  joinedAt: '2026-01-12T09:00:00.000Z',
}

/** Progress percentage to seed per course for the demo student. */
export const demoEnrollments: { courseId: string; percent: number; daysAgoEnrolled: number }[] = [
  { courseId: 'complete-react-developer', percent: 72, daysAgoEnrolled: 34 },
  { courseId: 'modern-javascript-mastery', percent: 45, daysAgoEnrolled: 52 },
  { courseId: 'ui-ux-design-fundamentals', percent: 18, daysAgoEnrolled: 12 },
  { courseId: 'advanced-typescript', percent: 30, daysAgoEnrolled: 21 },
  { courseId: 'python-for-data-analysis', percent: 100, daysAgoEnrolled: 140 },
  { courseId: 'digital-marketing-strategy', percent: 100, daysAgoEnrolled: 98 },
  { courseId: 'photography-masterclass', percent: 100, daysAgoEnrolled: 70 },
]

export const demoCompletions: { courseId: string; daysAgo: number }[] = [
  { courseId: 'python-for-data-analysis', daysAgo: 96 },
  { courseId: 'digital-marketing-strategy', daysAgo: 61 },
  { courseId: 'photography-masterclass', daysAgo: 24 },
]

export const demoFavorites = ['generative-ai-for-professionals', 'machine-learning-foundations']

/** Weekly learning pattern (hours) applied per weekday, Sunday → Saturday. */
const demoWeeklyHours = [2, 2, 1, 3, 2, 4, 1]

/** Helper exported for seeding; builds a realistic study log for the last `days` days. */
export const buildDemoStudyLog = (
  days: number,
  dateKeyFor: (daysAgo: number) => string,
  weekdayFor: (daysAgo: number) => number,
): Record<string, StudyDay> => {
  const log: Record<string, StudyDay> = {}
  // Today stays empty so the "7 day streak" can be earned live in the demo, and a gap
  // a week ago keeps the seeded streak at six days.
  for (let daysAgo = 1; daysAgo <= days; daysAgo += 1) {
    if (daysAgo === 7) continue
    const hours = demoWeeklyHours[weekdayFor(daysAgo)]
    log[dateKeyFor(daysAgo)] = { minutes: hours * 60, lessons: Math.max(1, Math.round(hours * 1.5)) }
  }
  return log
}
