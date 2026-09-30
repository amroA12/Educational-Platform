import type { KeyboardEvent } from 'react'
import { cn } from '@/utils/cn'

interface Tab<T extends string> {
  id: T
  label: string
  count?: number
}

interface TabsProps<T extends string> {
  tabs: Tab<T>[]
  value: T
  onChange: (id: T) => void
  label: string
  idPrefix?: string
}

/** Accessible tab list (roving tabindex + arrow keys). The page renders the matching panel. */
export function Tabs<T extends string>({ tabs, value, onChange, label, idPrefix = 'tab' }: TabsProps<T>) {
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex((tab) => tab.id === value)
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    event.preventDefault()
    const next = tabs[(index + step + tabs.length) % tabs.length]
    onChange(next.id)
    document.getElementById(`${idPrefix}-${next.id}`)?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto border-b border-line px-1"
    >
      {tabs.map((tab) => {
        const selected = tab.id === value
        return (
          <button
            key={tab.id}
            id={`${idPrefix}-${tab.id}`}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative -mb-px flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition',
              selected
                ? 'border-primary text-primary-ink'
                : 'border-transparent text-fg-muted hover:text-fg',
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-xs',
                  selected ? 'bg-primary-soft text-primary-ink' : 'bg-surface-muted text-fg-subtle',
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
