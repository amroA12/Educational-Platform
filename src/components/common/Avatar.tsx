import type { Tone } from '@/types'
import { toneBackground } from '@/lib/tones'
import { cn } from '@/utils/cn'

const sizes = {
  xs: 'size-6 text-[10px]',
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-14 text-lg',
  xl: 'size-24 text-3xl',
} as const

interface AvatarProps {
  name: string
  tone?: Tone
  size?: keyof typeof sizes
  className?: string
}

const initialsOf = (name: string) =>
  name
    .replace(/^(Dr|Mr|Ms|Mrs)\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

/** Initials avatar. Generated, so the project has no external image dependency. */
export function Avatar({ name, tone = 'violet', size = 'md', className }: AvatarProps) {
  return (
    <span
      role="img"
      aria-label={name}
      className={cn(
        'inline-flex shrink-0 select-none items-center justify-center rounded-full font-bold text-white ring-2 ring-surface',
        sizes[size],
        className,
      )}
      style={{ background: toneBackground(tone) }}
    >
      <span aria-hidden="true">{initialsOf(name)}</span>
    </span>
  )
}
