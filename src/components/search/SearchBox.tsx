import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { useDismiss } from '@/hooks/useDismiss'
import { searchCatalog } from '@/lib/search'
import { useSearchStore } from '@/store/searchStore'
import { cn } from '@/utils/cn'
import { SearchPanel, type SearchOption } from './SearchPanel'

const SIMULATED_LATENCY_MS = 350

interface SearchBoxProps {
  variant?: 'nav' | 'hero'
  placeholder?: string
  autoFocus?: boolean
  className?: string
  panelClassName?: string
  /** Called after the user navigates, e.g. to close a mobile menu. */
  onNavigate?: () => void
}

export function SearchBox({
  variant = 'nav',
  placeholder = 'Search courses, instructors…',
  autoFocus,
  className,
  panelClassName,
  onNavigate,
}: SearchBoxProps) {
  const navigate = useNavigate()
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const [settled, setSettled] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const { recent, addRecent, removeRecent, clearRecent } = useSearchStore()

  useDismiss(rootRef, open, () => setOpen(false))

  // Debounce + simulated network latency before results are shown.
  useEffect(() => {
    const timer = window.setTimeout(() => setSettled(query), SIMULATED_LATENCY_MS)
    return () => window.clearTimeout(timer)
  }, [query])

  const trimmed = query.trim()
  const loading = trimmed.length > 0 && settled !== query
  const results = useMemo(() => searchCatalog(settled), [settled])

  const options: SearchOption[] = useMemo(() => {
    if (!trimmed) return recent.map((term) => ({ key: `recent-${term}`, kind: 'recent', label: term, to: `/courses?q=${encodeURIComponent(term)}` }))
    if (loading) return []
    return [
      ...results.courses.map((course) => ({ key: `c-${course.id}`, kind: 'course' as const, label: course.title, to: `/courses/${course.id}`, course })),
      ...results.instructors.map((instructor) => ({ key: `i-${instructor.id}`, kind: 'instructor' as const, label: instructor.name, to: `/instructors/${instructor.id}`, instructor })),
      ...results.categories.map((category) => ({ key: `g-${category.id}`, kind: 'category' as const, label: category.name, to: `/categories/${category.id}`, category })),
    ]
  }, [trimmed, loading, recent, results])

  const go = (to: string, term?: string) => {
    if (term) addRecent(term)
    setOpen(false)
    setActive(-1)
    navigate(to)
    onNavigate?.()
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const option = options[active]
    if (option) return go(option.to, option.kind === 'recent' ? option.label : trimmed)
    if (trimmed) go(`/courses?q=${encodeURIComponent(trimmed)}`, trimmed)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
      if (options.length === 0) return
      const step = event.key === 'ArrowDown' ? 1 : -1
      setActive((current) => (current + step + options.length) % options.length)
    }
  }

  const isHero = variant === 'hero'

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <form role="search" onSubmit={onSubmit}>
        <label htmlFor={`${listId}-input`} className="sr-only">
          Search Learnify
        </label>
        <div
          className={cn(
            'flex items-center gap-2 border bg-surface transition focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/15',
            isHero ? 'h-14 rounded-2xl pl-5 pr-2 shadow-card-hover' : 'h-10 rounded-xl pl-3.5 pr-2',
            'border-line hover:border-line-strong',
          )}
        >
          <Search className={cn('shrink-0 text-fg-subtle', isHero ? 'size-5' : 'size-4')} aria-hidden="true" />
          <input
            id={`${listId}-input`}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={`${listId}-list`}
            aria-activedescendant={active >= 0 ? `${listId}-opt-${active}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            autoFocus={autoFocus}
            value={query}
            placeholder={placeholder}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            onChange={(event) => {
              setQuery(event.target.value)
              setActive(-1)
              setOpen(true)
            }}
            className="min-w-0 flex-1 bg-transparent text-sm text-fg placeholder:text-fg-subtle focus:outline-none sm:text-base"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery('')
                setSettled('')
              }}
              className="flex size-7 items-center justify-center rounded-lg text-fg-subtle hover:bg-surface-muted hover:text-fg"
            >
              <X className="size-4" />
            </button>
          )}
          {isHero && (
            <button
              type="submit"
              className="h-10 rounded-xl bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Search
            </button>
          )}
        </div>
      </form>

      {open && (
        <SearchPanel
          id={`${listId}-list`}
          optionIdPrefix={`${listId}-opt`}
          query={trimmed}
          loading={loading}
          options={options}
          active={active}
          className={panelClassName}
          onSelect={(option) => go(option.to, option.kind === 'recent' ? option.label : trimmed)}
          onHover={setActive}
          onRemoveRecent={removeRecent}
          onClearRecent={clearRecent}
          onViewAll={() => go(`/courses?q=${encodeURIComponent(trimmed)}`, trimmed)}
        />
      )}
    </div>
  )
}
