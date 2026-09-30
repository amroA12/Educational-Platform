import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}

/** Slide-in side panel for mobile navigation and the lesson curriculum. Native <dialog> under the hood. */
export function Drawer({ open, onClose, title, children, className }: DrawerProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose()
      }}
      aria-label={title}
      className={cn(
        'fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-[min(22rem,88vw)] max-w-none border-r border-line bg-surface p-0 text-fg shadow-pop',
        'backdrop:bg-slate-950/55 backdrop:backdrop-blur-sm open:animate-slide-in-left',
        className,
      )}
    >
      {open && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <h2 className="text-base font-bold">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close panel"
              className="flex size-9 items-center justify-center rounded-lg text-fg-muted hover:bg-surface-muted hover:text-fg"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto">{children}</div>
        </div>
      )}
    </dialog>
  )
}
