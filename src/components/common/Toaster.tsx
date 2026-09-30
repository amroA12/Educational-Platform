import { CircleCheck, Info, OctagonAlert, X } from 'lucide-react'
import { useToastStore, type ToastKind } from '@/store/toastStore'

const icons: Record<ToastKind, { icon: typeof Info; className: string }> = {
  success: { icon: CircleCheck, className: 'text-emerald-500' },
  error: { icon: OctagonAlert, className: 'text-rose-500' },
  info: { icon: Info, className: 'text-brand-500' },
}

/** Live region that announces toasts to screen readers. */
export function Toaster() {
  const toasts = useToastStore((state) => state.toasts)
  const dismiss = useToastStore((state) => state.dismiss)

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-20 z-[100] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:items-end lg:bottom-6"
    >
      {toasts.map((toast) => {
        const { icon: Icon, className } = icons[toast.kind]
        return (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex w-full max-w-sm animate-slide-up items-start gap-3 rounded-2xl border border-line bg-surface p-4 shadow-pop"
          >
            <Icon className={`mt-0.5 size-5 shrink-0 ${className}`} aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-fg">{toast.title}</p>
              {toast.description && <p className="mt-0.5 text-sm text-fg-muted">{toast.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
              className="-mr-1 -mt-1 flex size-7 items-center justify-center rounded-lg text-fg-subtle hover:bg-surface-muted hover:text-fg"
            >
              <X className="size-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
