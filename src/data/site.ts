import type { Tone } from '@/types'

export const brand = {
  name: 'Learnify',
  tagline: 'Learn smarter. Grow faster.',
} as const

export const platformStats = [
  { value: '50K+', label: 'Students' },
  { value: '500+', label: 'Courses' },
  { value: '120+', label: 'Expert Instructors' },
  { value: '95%', label: 'Completion Satisfaction' },
] as const

export const features = [
  {
    icon: 'clock',
    title: 'Learn at your own pace',
    description: 'Watch on your schedule, pick up where you left off, and revisit any lesson, on any device.',
  },
  {
    icon: 'graduation',
    title: 'Expert instructors',
    description: 'Learn from practitioners who do this work every day and know how to teach it clearly.',
  },
  {
    icon: 'hammer',
    title: 'Practical projects',
    description: 'Every course ends with hands-on projects so you build a portfolio, not just a watch history.',
  },
  {
    icon: 'trending',
    title: 'Track your progress',
    description: 'Quizzes, streaks, achievements, and certificates keep you motivated and show how far you have come.',
  },
] as const

export interface Testimonial {
  id: string
  name: string
  role: string
  rating: number
  review: string
  tone: Tone
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Nadia Farouk',
    role: 'Junior Front-End Developer',
    rating: 5,
    review:
      'I went from copying tutorials to building my own React apps in two months. The projects and quizzes made the difference.',
    tone: 'violet',
  },
  {
    id: 't2',
    name: 'Michael Torres',
    role: 'Marketing Manager',
    rating: 5,
    review:
      'The progress tracking kept me honest. I finished the Digital Marketing course while working full time and got promoted soon after.',
    tone: 'orange',
  },
  {
    id: 't3',
    name: 'Sara Lindholm',
    role: 'Product Designer',
    rating: 4,
    review:
      'Clear, well-structured lessons with real-world examples. I recommend it to every designer on my team.',
    tone: 'pink',
  },
  {
    id: 't4',
    name: 'Kwame Mensah',
    role: 'Data Analyst',
    rating: 5,
    review:
      'The Python course was the first one that really clicked for me. Short lessons, honest explanations, useful datasets.',
    tone: 'emerald',
  },
]

export const navLinks = [
  { to: '/courses', label: 'Courses' },
  { to: '/categories', label: 'Categories' },
  { to: '/instructors', label: 'Instructors' },
  { to: '/about', label: 'About' },
] as const

export const footerColumns = [
  {
    title: 'Learnify',
    links: [
      { to: '/about', label: 'About' },
      { to: '/help', label: 'Help Center' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { to: '/courses', label: 'Courses' },
      { to: '/categories', label: 'Categories' },
      { to: '/instructors', label: 'Instructors' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/privacy', label: 'Privacy' },
      { to: '/terms', label: 'Terms' },
    ],
  },
] as const
