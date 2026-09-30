import type { Course, Level } from '@/types'
import { courseMatches } from './search'

export type SortKey = 'popular' | 'rating' | 'newest' | 'price-asc' | 'price-desc'
export type DurationFilter = 'any' | 'short' | 'medium' | 'long'
export type PriceFilter = 'any' | 'free' | 'under-50' | '50-plus'

export interface CourseFilters {
  query: string
  category: string
  levels: Level[]
  minRating: number
  duration: DurationFilter
  price: PriceFilter
  sort: SortKey
}

export const defaultFilters: CourseFilters = {
  query: '',
  category: 'all',
  levels: [],
  minRating: 0,
  duration: 'any',
  price: 'any',
  sort: 'popular',
}

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export const levelOptions: Level[] = ['Beginner', 'Intermediate', 'Advanced']

export const ratingOptions = [
  { value: 0, label: 'Any rating' },
  { value: 4.5, label: '4.5 & up' },
  { value: 4, label: '4.0 & up' },
  { value: 3.5, label: '3.5 & up' },
]

export const durationOptions: { value: DurationFilter; label: string }[] = [
  { value: 'any', label: 'Any length' },
  { value: 'short', label: 'Under 3 hours' },
  { value: 'medium', label: '3 – 4 hours' },
  { value: 'long', label: '4+ hours' },
]

export const priceOptions: { value: PriceFilter; label: string }[] = [
  { value: 'any', label: 'Any price' },
  { value: 'free', label: 'Free' },
  { value: 'under-50', label: 'Under $50' },
  { value: '50-plus', label: '$50 and over' },
]

const matchesDuration = (minutes: number, duration: DurationFilter) => {
  switch (duration) {
    case 'short':
      return minutes < 180
    case 'medium':
      return minutes >= 180 && minutes < 240
    case 'long':
      return minutes >= 240
    default:
      return true
  }
}

const matchesPrice = (price: number, filter: PriceFilter) => {
  switch (filter) {
    case 'free':
      return price === 0
    case 'under-50':
      return price > 0 && price < 50
    case '50-plus':
      return price >= 50
    default:
      return true
  }
}

const comparators: Record<SortKey, (a: Course, b: Course) => number> = {
  popular: (a, b) => b.students - a.students,
  rating: (a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount,
  newest: (a, b) => b.publishedAt.localeCompare(a.publishedAt),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
}

export const filterCourses = (courses: Course[], filters: CourseFilters): Course[] =>
  courses
    .filter(
      (course) =>
        courseMatches(course, filters.query) &&
        (filters.category === 'all' || course.categoryId === filters.category) &&
        (filters.levels.length === 0 || filters.levels.includes(course.level)) &&
        course.rating >= filters.minRating &&
        matchesDuration(course.durationMinutes, filters.duration) &&
        matchesPrice(course.price, filters.price),
    )
    .sort(comparators[filters.sort])

/** Number of sidebar filters that differ from the defaults (search, category and sort are shown separately). */
export const countActiveFilters = (filters: CourseFilters) =>
  filters.levels.length +
  (filters.minRating > 0 ? 1 : 0) +
  (filters.duration !== 'any' ? 1 : 0) +
  (filters.price !== 'any' ? 1 : 0)
