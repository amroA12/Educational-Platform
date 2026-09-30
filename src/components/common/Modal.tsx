import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: ReactNode
  footer?: ReactNode
}

const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' } as const

/**
 * Built on the native <dialog> element, which gives us focus trapping, Escape-to-close,
 * and an inert background for free.
 */
export function Modal({ open, onClose, title, description, size = 'md', children, footer }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    if (!open) return
    const previous = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = previous
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose()
      }}
      aria-labelledby="modal-title"
      className={cn(
        'm-auto max-h-[92dvh] w-[calc(100%-2rem)] overflow-hidden rounded-2xl border border-line bg-surface p-0 text-fg shadow-pop',
        'backdrop:bg-slate-950/55 backdrop:backdrop-blur-sm open:animate-pop-in',
        widths[size],
      )}
    >
      {open && (
        <div className="flex max-h-[92dvh] flex-col">
          <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
            <div>
              <h2 id="modal-title" className="text-lg font-bold">
                {title}
              </h2>
              {description && <p className="mt-0.5 text-sm text-fg-muted">{description}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="-mr-1.5 flex size-9 shrink-0 items-center justify-center rounded-lg text-fg-muted transition hover:bg-surface-muted hover:text-fg"
            >
              <X className="size-5" />
            </button>
          </header>
          <div className="scrollbar-thin overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
          {footer && (
            <footer className="flex flex-wrap justify-end gap-3 border-t border-line bg-surface-muted/50 px-5 py-4 sm:px-6">
              {footer}
            </footer>
          )}
        </div>
      )}
    </dialog>
  )
}
