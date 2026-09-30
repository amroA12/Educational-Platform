import { useCallback, useId, useRef, useState, type ReactNode } from 'react'
import { useDismiss } from '@/hooks/useDismiss'
import { cn } from '@/utils/cn'

export interface TriggerProps {
  onClick: () => void
  'aria-expanded': boolean
  'aria-haspopup': 'dialog' | 'menu'
  'aria-controls': string
}

interface PopoverProps {
  trigger: (props: TriggerProps, state: { open: boolean }) => ReactNode
  children: (helpers: { close: () => void }) => ReactNode
  align?: 'start' | 'end'
  side?: 'top' | 'bottom'
  haspopup?: 'dialog' | 'menu'
  className?: string
  panelClassName?: string
}

/** Anchored floating panel with outside-click and Escape dismissal. */
export function Popover({
  trigger,
  children,
  align = 'end',
  side = 'bottom',
  haspopup = 'dialog',
  className,
  panelClassName,
}: PopoverProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const close = useCallback(() => setOpen(false), [])
  useDismiss(ref, open, close)

  return (
    <div ref={ref} className={cn('relative', className)}>
      {trigger(
        {
          onClick: () => setOpen((value) => !value),
          'aria-expanded': open,
          'aria-haspopup': haspopup,
          'aria-controls': panelId,
        },
        { open },
      )}
      {open && (
        <div
          id={panelId}
          className={cn(
            'absolute z-50 animate-pop-in rounded-2xl border border-line bg-surface shadow-pop',
            side === 'bottom' ? 'top-full mt-2 origin-top' : 'bottom-full mb-2 origin-bottom',
            align === 'end' ? 'right-0' : 'left-0',
            panelClassName,
          )}
        >
          {children({ close })}
        </div>
      )}
    </div>
  )
}
