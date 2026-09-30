/** Colour identity used to render generated course thumbnails and avatars. */
export type Tone =
  | 'violet'
  | 'blue'
  | 'teal'
  | 'emerald'
  | 'amber'
  | 'orange'
  | 'rose'
  | 'pink'
  | 'slate'

export type Level = 'Beginner' | 'Intermediate' | 'Advanced'

export type CategoryIcon =
  | 'code'
  | 'palette'
  | 'briefcase'
  | 'brain'
  | 'megaphone'
  | 'chart'
  | 'sprout'
  | 'camera'

export interface Category {
  id: string
  name: string
  description: string
  icon: CategoryIcon
  tone: Tone
}

export interface Instructor {
  id: string
  name: string
  title: string
  bio: string
  rating: number
  students: number
  tone: Tone
  expertise: string[]
}

export interface Course {
  id: string
  title: string
  description: string
  categoryId: string
  instructorId: string
  level: Level
  rating: number
  reviewsCount: number
  students: number
  /** Human readable total duration, e.g. "4h 57m". Derived from the curriculum. */
  duration: string
  durationMinutes: number
  lessonsCount: number
  price: number
  originalPrice?: number
  language: string
  thumbnail: Tone
  publishedAt: string
  updatedAt: string
  bestseller?: boolean
  learn: string[]
  requirements: string[]
}

export type LessonType = 'video' | 'reading' | 'exercise'

export interface Lesson {
  id: string
  courseId: string
  moduleId: string
  title: string
  description: string
  durationMinutes: number
  type: LessonType
  /** 1-based position across the whole course. */
  order: number
}

export interface CourseModule {
  id: string
  courseId: string
  title: string
  lessons: Lesson[]
}

export interface Review {
  id: string
  courseId: string
  author: string
  rating: number
  comment: string
  date: string
  tone: Tone
}

export interface QuizQuestion {
  id: string
  text: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface Quiz {
  id: string
  courseId: string
  title: string
  description: string
  /** Suggested time limit in minutes (informational). */
  timeLimitMinutes: number
  passingScore: number
  questions: QuizQuestion[]
}

export interface QuizResult {
  courseId: string
  /** Question id → chosen option index. */
  answers: Record<string, number>
  correct: number
  total: number
  percent: number
  durationSeconds: number
  submittedAt: string
}

export type AchievementMetric =
  | 'enrolledCourses'
  | 'quizzesTaken'
  | 'lessonsCompleted'
  | 'streakDays'
  | 'highScoreQuizzes'
  | 'completedCourses'
  | 'lessonsInOneDay'
  | 'perfectQuizzes'
  | 'learningHours'
  | 'savedCourses'

export type AchievementIcon =
  | 'rocket'
  | 'clipboard'
  | 'book'
  | 'flame'
  | 'crown'
  | 'award'
  | 'zap'
  | 'target'
  | 'clock'
  | 'bookmark'

export interface Achievement {
  id: string
  name: string
  description: string
  icon: AchievementIcon
  metric: AchievementMetric
  target: number
}

export interface Certificate {
  id: string
  courseId: string
  recipient: string
  issuedAt: string
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  kind: 'progress' | 'achievement' | 'lesson' | 'quiz' | 'system'
  createdAt: string
  read: boolean
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'Student'
  headline: string
  bio: string
  location: string
  skills: string[]
  joinedAt: string
}

export interface StudyDay {
  minutes: number
  lessons: number
}
