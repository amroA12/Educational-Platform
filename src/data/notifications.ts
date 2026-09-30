import type { NotificationItem } from '@/types'
import { isoDaysAgo } from '@/utils/date'

/** Mock notifications seeded for a new session. */
export const buildSeedNotifications = (): NotificationItem[] => [
  {
    id: 'n-progress-react',
    title: 'Course progress reached 50%',
    message: 'You are halfway through Complete React Developer. Keep the momentum going!',
    kind: 'progress',
    createdAt: isoDaysAgo(0.1),
    read: false,
  },
  {
    id: 'n-quiz-upcoming',
    title: 'Upcoming quiz',
    message: 'The React Fundamentals quiz is ready whenever you want to test your knowledge.',
    kind: 'quiz',
    createdAt: isoDaysAgo(0.6),
    read: false,
  },
  {
    id: 'n-new-lesson',
    title: 'A new lesson is available',
    message: 'Complete React Developer has a new lesson: "Testing components".',
    kind: 'lesson',
    createdAt: isoDaysAgo(2),
    read: false,
  },
  {
    id: 'n-achievement-course',
    title: 'You completed a new achievement',
    message: 'Course Completed — you earned a certificate for Photography Masterclass.',
    kind: 'achievement',
    createdAt: isoDaysAgo(24),
    read: true,
  },
  {
    id: 'n-welcome',
    title: 'Welcome to Learnify',
    message: 'Explore the course catalogue and set a weekly learning goal in Settings.',
    kind: 'system',
    createdAt: isoDaysAgo(80),
    read: true,
  },
]
