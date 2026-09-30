import { Spinner } from './Spinner'

/** Shown while a lazily-loaded route chunk downloads. */
export function PageFallback() {
  return (
    <div role="status" className="flex min-h-[50vh] items-center justify-center text-primary-ink">
      <Spinner className="size-8" />
      <span className="sr-only">Loading page</span>
    </div>
  )
}
