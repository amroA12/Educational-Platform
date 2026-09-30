import type { Tone } from '@/types'

/** Gradient stops per tone, shared by generated thumbnails, avatars, and category tiles. */
export const toneGradients: Record<Tone, [string, string]> = {
  violet: ['#7c5cff', '#4527d6'],
  blue: ['#3b82f6', '#1d4ed8'],
  teal: ['#14b8a6', '#0f766e'],
  emerald: ['#10b981', '#047857'],
  amber: ['#f59e0b', '#c2410c'],
  orange: ['#fb923c', '#dc2626'],
  rose: ['#fb7185', '#be123c'],
  pink: ['#ec4899', '#9333ea'],
  slate: ['#64748b', '#1e293b'],
}

export const toneBackground = (tone: Tone) => {
  const [from, to] = toneGradients[tone]
  return `linear-gradient(135deg, ${from}, ${to})`
}
