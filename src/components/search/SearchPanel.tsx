import { Clock, GraduationCap, LayoutGrid, SearchX, X } from 'lucide-react'
import type { Category, Course, Instructor } from '@/types'
import { categoryIcons } from '@/lib/icons'
import { cn } from '@/utils/cn'
import { Avatar } from '@/components/common/Avatar'
import { Skeleton } from '@/components/common/Skeleton'
import { CourseThumbnail } from '@/components/course/CourseThumbnail'

export type SearchOption =
  | { key: string; kind: 'recent'; label: string; to: string }
  | { key: string; kind: 'course'; label: string; to: string; course: Course }
  | { key: string; kind: 'instructor'; label: string; to: string; instructor: Instructor }
  | { key: string; kind: 'category'; label: string; to: string; category: Category }

interface SearchPanelProps {
  id: string
  optionIdPrefix: string
  query: string
  loading: boolean
  options: SearchOption[]
  active: number
  onSelect: (option: SearchOption) => void
  onHover: (index: number) => void
  onRemoveRecent: (term: string) => void
  onClearRecent: () => void
  onViewAll: () => void
  className?: string
}

const groupTitle: Record<SearchOption['kind'], string> = {
  recent: 'Recent searches',
  course: 'Courses',
  instructor: 'Instructors',
  category: 'Categories',
}

function OptionBody({ option }: { option: SearchOption }) {
  switch (option.kind) {
    case 'recent':
      return (
        <>
          <Clock className="size-4 shrink-0 text-fg-subtle" aria-hidden="true" />
          <span className="truncate">{option.label}</span>
        </>
      )
    case 'course':
      return (
        <>
          <CourseThumbnail course={option.course} className="size-10 shrink-0 rounded-lg" />
          <span className="min-w-0">
            <span className="block truncate font-semibold">{option.label}</span>
            <span className="block truncate text-xs text-fg-subtle">{option.course.level} · {option.course.duration}</span>
          </span>
        </>
      )
    case 'instructor':
      return (
        <>
          <Avatar name={option.instructor.name} tone={option.instructor.tone} size="sm" />
          <span className="min-w-0">
            <span className="block truncate font-semibold">{option.label}</span>
            <span className="block truncate text-xs text-fg-subtle">{option.instructor.title}</span>
          </span>
        </>
      )
    case 'category': {
      const Icon = categoryIcons[option.category.icon]
      return (
        <>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-ink">
            <Icon className="size-4" aria-hidden="true" />
          </span>
          <span className="truncate font-semibold">{option.label}</span>
        </>
      )
    }
  }
}

/** Dropdown listing recent searches, loading skeletons, grouped results, or an empty message. */
export function SearchPanel({
  id,
  optionIdPrefix,
  query,
  loading,
  options,
  active,
  onSelect,
  onHover,
  onRemoveRecent,
  onClearRecent,
  onViewAll,
  className,
}: SearchPanelProps) {
  return (
    <div
      className={cn(
        'absolute top-full z-50 mt-2 animate-pop-in overflow-hidden rounded-2xl border border-line bg-surface text-left shadow-pop',
        className ?? 'inset-x-0',
      )}
    >
      <div className="scrollbar-thin max-h-[26rem] overflow-y-auto p-2">
        {loading ? (
          <div role="status" aria-label="Searching" className="space-y-2 p-1">
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex items-center gap-3">
                <Skeleton className="size-10 shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3.5 w-3/4" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : !query && options.length === 0 ? (
          <p className="flex items-center gap-2 px-3 py-6 text-sm text-fg-muted">
            <GraduationCap className="size-4" aria-hidden="true" />
            Start typing to search courses, instructors, and categories.
          </p>
        ) : query && options.length === 0 ? (
          <div className="px-3 py-8 text-center" role="status">
            <SearchX className="mx-auto mb-2 size-6 text-fg-subtle" aria-hidden="true" />
            <p className="font-semibold">No results for “{query}”</p>
            <p className="mt-1 text-sm text-fg-muted">Check the spelling or try a broader term.</p>
          </div>
        ) : (
          <ul id={id} role="listbox" aria-label="Search suggestions">
            {options.map((option, index) => {
              const showHeading = index === 0 || options[index - 1].kind !== option.kind
              return (
                <li key={option.key} role="presentation">
                  {showHeading && (
                    <div className="flex items-center justify-between px-3 pb-1 pt-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-fg-subtle">
                        {groupTitle[option.kind]}
                      </p>
                      {option.kind === 'recent' && (
                        <button
                          type="button"
                          onClick={onClearRecent}
                          className="text-xs font-semibold text-primary-ink hover:underline"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                  )}
                  <div
                    className={cn(
                      'group flex items-center rounded-xl transition',
                      active === index ? 'bg-surface-muted' : 'hover:bg-surface-muted',
                    )}
                    onMouseEnter={() => onHover(index)}
                  >
                    <button
                      type="button"
                      id={`${optionIdPrefix}-${index}`}
                      role="option"
                      aria-selected={active === index}
                      onClick={() => onSelect(option)}
                      className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-2 text-left text-sm"
                    >
                      <OptionBody option={option} />
                    </button>
                    {option.kind === 'recent' && (
                      <button
                        type="button"
                        aria-label={`Remove ${option.label} from recent searches`}
                        onClick={() => onRemoveRecent(option.label)}
                        className="mr-2 flex size-7 items-center justify-center rounded-lg text-fg-subtle hover:bg-line hover:text-fg"
                      >
                        <X className="size-3.5" />
                      </button>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      {query && !loading && options.length > 0 && (
        <button
          type="button"
          onClick={onViewAll}
          className="flex w-full items-center justify-center gap-2 border-t border-line bg-surface-muted/60 px-4 py-3 text-sm font-semibold text-primary-ink transition hover:bg-surface-muted"
        >
          <LayoutGrid className="size-4" aria-hidden="true" />
          See all courses for “{query}”
        </button>
      )}
    </div>
  )
}
