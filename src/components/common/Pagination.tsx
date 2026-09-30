import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

interface PaginationProps {
  page: number
  pageCount: number
  onChange: (page: number) => void
}

const controlClass =
  'flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-40'

export function Pagination({ page, pageCount, onChange }: PaginationProps) {
  if (pageCount <= 1) return null
  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
      <button
        type="button"
        className={cn(controlClass, 'border-line bg-surface text-fg hover:bg-surface-muted')}
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
      </button>
      {Array.from({ length: pageCount }, (_, index) => {
        const number = index + 1
        const current = number === page
        return (
          <button
            key={number}
            type="button"
            onClick={() => onChange(number)}
            aria-label={`Page ${number}`}
            aria-current={current ? 'page' : undefined}
            className={cn(
              controlClass,
              current
                ? 'border-primary bg-primary text-white'
                : 'border-line bg-surface text-fg hover:bg-surface-muted',
            )}
          >
            {number}
          </button>
        )
      })}
      <button
        type="button"
        className={cn(controlClass, 'border-line bg-surface text-fg hover:bg-surface-muted')}
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
        aria-label="Next page"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}
