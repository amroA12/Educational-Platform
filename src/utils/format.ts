import { format, formatDistanceToNowStrict, parseISO } from 'date-fns'

export const formatMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = Math.round(totalMinutes % 60)
  if (hours === 0) return `${minutes}m`
  return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`
}

/** Seconds → "m:ss" or "h:mm:ss", used by the video player and quiz timer. */
export const formatClock = (totalSeconds: number) => {
  const safe = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(safe / 3600)
  const minutes = Math.floor((safe % 3600) / 60)
  const seconds = safe % 60
  const mm = hours > 0 ? String(minutes).padStart(2, '0') : String(minutes)
  const ss = String(seconds).padStart(2, '0')
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`
}

const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
export const formatCompact = (value: number) => compact.format(value)

const grouped = new Intl.NumberFormat('en')
export const formatNumber = (value: number) => grouped.format(value)

export const formatPrice = (price: number) => (price === 0 ? 'Free' : `$${price.toFixed(2)}`)

export const formatDate = (iso: string, pattern = 'MMM d, yyyy') => format(parseISO(iso), pattern)

export const formatRelative = (iso: string) =>
  `${formatDistanceToNowStrict(parseISO(iso))} ago`

export const pluralize = (count: number, singular: string, plural = `${singular}s`) =>
  `${formatNumber(count)} ${count === 1 ? singular : plural}`

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export const toPercent = (part: number, total: number) =>
  total === 0 ? 0 : Math.round((part / total) * 100)
