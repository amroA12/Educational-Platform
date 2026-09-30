import { categories } from '@/data/categories'
import { courses, getCourse } from '@/data/courses'
import { getInstructor, instructors } from '@/data/instructors'
import { getCategory } from '@/data/categories'
import type { Category, Course, Instructor } from '@/types'

export interface SearchResults {
  courses: Course[]
  instructors: Instructor[]
  categories: Category[]
}

const normalize = (value: string) => value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')

/** Lower is better: prefix matches beat substring matches. */
const rank = (haystack: string, needle: string) => {
  const text = normalize(haystack)
  if (text.startsWith(needle)) return 0
  if (text.split(/\s+/).some((word) => word.startsWith(needle))) return 1
  return text.includes(needle) ? 2 : Infinity
}

const sortByRank = <T,>(items: T[], score: (item: T) => number) =>
  items
    .map((item) => ({ item, score: score(item) }))
    .filter(({ score: value }) => Number.isFinite(value))
    .sort((a, b) => a.score - b.score)
    .map(({ item }) => item)

/** True when a course matches the query by title, instructor name, or category name. */
export const courseMatches = (course: Course, rawQuery: string) => {
  const query = normalize(rawQuery.trim())
  if (!query) return true
  const haystacks = [
    course.title,
    getInstructor(course.instructorId)?.name ?? '',
    getCategory(course.categoryId)?.name ?? '',
  ]
  return haystacks.some((text) => normalize(text).includes(query))
}

export const searchCatalog = (rawQuery: string, limit = 4): SearchResults => {
  const query = normalize(rawQuery.trim())
  if (!query) return { courses: [], instructors: [], categories: [] }

  return {
    courses: sortByRank(courses, (course) =>
      Math.min(
        rank(course.title, query),
        rank(getInstructor(course.instructorId)?.name ?? '', query) + 0.5,
        rank(getCategory(course.categoryId)?.name ?? '', query) + 1,
      ),
    ).slice(0, limit),
    instructors: sortByRank(instructors, (instructor) => rank(instructor.name, query)).slice(0, 3),
    categories: sortByRank(categories, (category) => rank(category.name, query)).slice(0, 3),
  }
}

export const popularCourses = () => ['complete-react-developer', 'modern-javascript-mastery', 'python-for-data-analysis']
  .map((id) => getCourse(id))
  .filter((course): course is Course => !!course)
