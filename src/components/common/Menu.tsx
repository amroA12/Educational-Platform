import type { KeyboardEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { Popover, type TriggerProps } from './Popover'

export interface MenuItem {
  label: string
  icon?: ReactNode
  to?: string
  onSelect?: () => void
  danger?: boolean
}

interface MenuProps {
  button: (props: TriggerProps, state: { open: boolean }) => ReactNode
  items: MenuItem[]
  header?: ReactNode
  align?: 'start' | 'end'
}

const itemClasses = (danger?: boolean) =>
  cn(
    'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition',
    'focus-visible:bg-surface-muted focus-visible:outline-none',
    danger ? 'text-danger-ink hover:bg-rose-500/10' : 'text-fg hover:bg-surface-muted',
  )

/** Dropdown action menu with arrow-key navigation. */
export function Menu({ button, items, header, align = 'end' }: MenuProps) {
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const nodes = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]'),
    )
    const index = nodes.indexOf(document.activeElement as HTMLElement)
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      nodes[(index + 1) % nodes.length]?.focus()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      nodes[(index - 1 + nodes.length) % nodes.length]?.focus()
    }
  }

  return (
    <Popover
      haspopup="menu"
      align={align}
      trigger={button}
      panelClassName="w-60 p-1.5"
    >
      {({ close }) => (
        <div role="menu" onKeyDown={onKeyDown}>
          {header && <div className="border-b border-line px-3 pb-2.5 pt-1.5 mb-1.5">{header}</div>}
          {items.map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                role="menuitem"
                className={itemClasses(item.danger)}
                onClick={close}
              >
                {item.icon}
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                className={itemClasses(item.danger)}
                onClick={() => {
                  close()
                  item.onSelect?.()
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ),
          )}
        </div>
      )}
    </Popover>
  )
}
