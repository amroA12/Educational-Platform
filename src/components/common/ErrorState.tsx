import { RefreshCw, TriangleAlert } from 'lucide-react'
import { Button } from './Button'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong.',
  message = "We couldn't load this content.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/5 px-6 py-16 text-center"
    >
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-rose-500/12 text-danger-ink">
        <TriangleAlert className="size-7" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold text-fg">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-fg-muted">{message}</p>
      {onRetry && (
        <Button className="mt-6" variant="outline" onClick={onRetry} leftIcon={<RefreshCw className="size-4" />}>
          Try Again
        </Button>
      )}
    </div>
  )
}
