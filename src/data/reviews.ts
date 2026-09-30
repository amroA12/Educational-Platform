import type { Review, Tone } from '@/types'
import { courses } from './courses'

interface ReviewTemplate {
  author: string
  rating: number
  comment: string
  daysAgo: number
  tone: Tone
}

const templates: ReviewTemplate[] = [
  { author: 'Jordan Ellis', rating: 5, comment: 'Clear, well paced, and full of practical examples. I finished the final project feeling genuinely confident about applying this at work.', daysAgo: 6, tone: 'violet' },
  { author: 'Fatima Al-Sayed', rating: 5, comment: 'The instructor explains difficult ideas without talking down to you. The exercises were the best part for me.', daysAgo: 14, tone: 'pink' },
  { author: 'Tom Nguyen', rating: 4, comment: 'Great structure and high production quality. I would have liked a few more advanced exercises near the end, but overall very worthwhile.', daysAgo: 23, tone: 'blue' },
  { author: 'Clara Jensen', rating: 5, comment: 'I had tried to learn this before and gave up. The step-by-step approach here finally made it click.', daysAgo: 31, tone: 'teal' },
  { author: 'Ravi Patel', rating: 4, comment: 'Solid content and realistic projects. Some lessons moved quickly, but rewatching them helped a lot.', daysAgo: 45, tone: 'amber' },
  { author: 'Sofia Martinez', rating: 5, comment: 'Excellent value. The downloadable resources and quizzes made it easy to check that I actually understood each section.', daysAgo: 58, tone: 'rose' },
  { author: 'Ben Carter', rating: 3, comment: 'Good overview, though I already knew much of the first module. The later sections are where the course really picks up.', daysAgo: 72, tone: 'slate' },
  { author: 'Aisha Khan', rating: 5, comment: 'Well organised and motivating. The progress tracking kept me coming back every day until I finished.', daysAgo: 88, tone: 'emerald' },
  { author: 'Liam O’Brien', rating: 4, comment: 'Practical and to the point. I used what I learned in my job the very next week.', daysAgo: 104, tone: 'orange' },
  { author: 'Yuki Tanaka', rating: 5, comment: 'One of the best online courses I have taken. Every lesson has a clear purpose and nothing feels like filler.', daysAgo: 121, tone: 'violet' },
  { author: 'Hannah Schmidt', rating: 4, comment: 'Friendly teaching style and useful real-world context. The capstone project was challenging in a good way.', daysAgo: 140, tone: 'pink' },
  { author: 'Carlos Mendes', rating: 2, comment: 'Content is fine but I expected more depth on the later topics. Hoping for an updated version.', daysAgo: 162, tone: 'blue' },
]

const today = new Date('2026-10-01T09:00:00Z')

const dateDaysAgo = (daysAgo: number) => {
  const date = new Date(today)
  date.setUTCDate(date.getUTCDate() - daysAgo)
  return date.toISOString()
}

/** Deterministic mock reviews: each course gets a rotated selection of the templates. */
export const reviews: Review[] = courses.flatMap((course, courseIndex) =>
  Array.from({ length: 8 }, (_, reviewIndex) => {
    const template = templates[(courseIndex * 3 + reviewIndex) % templates.length]
    return {
      id: `${course.id}-r${reviewIndex + 1}`,
      courseId: course.id,
      author: template.author,
      rating: template.rating,
      comment: template.comment,
      date: dateDaysAgo(template.daysAgo + reviewIndex * 3),
      tone: template.tone,
    }
  }),
)

export const getReviewsForCourse = (courseId: string) =>
  reviews.filter((review) => review.courseId === courseId)
