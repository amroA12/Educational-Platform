import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  as: Heading = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-8 flex flex-wrap items-end justify-between gap-4',
        align === 'center' && 'flex-col items-center text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && (
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-primary-ink">{eyebrow}</p>
        )}
        <Heading className="text-2xl font-extrabold sm:text-3xl">{title}</Heading>
        {description && <p className="mt-2 text-fg-muted sm:text-lg">{description}</p>}
      </div>
      {action}
    </div>
  )
}
