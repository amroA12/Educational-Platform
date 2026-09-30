import { format, subDays } from 'date-fns'

/** Local calendar day key, e.g. "2026-10-01". Used to bucket study activity. */
export const dateKey = (date: Date = new Date()) => format(date, 'yyyy-MM-dd')

export const dateKeyDaysAgo = (daysAgo: number, from: Date = new Date()) =>
  dateKey(subDays(from, daysAgo))

export const isoDaysAgo = (daysAgo: number, from: Date = new Date()) =>
  subDays(from, daysAgo).toISOString()

export const greetingForNow = (hour: number = new Date().getHours()) => {
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}
