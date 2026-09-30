import { lazy, Suspense, type ComponentType } from 'react'
import { PageFallback } from '@/components/common/PageFallback'

/** Code-splits a page and gives it a Suspense fallback, so every route loads on demand. */
export const lazyPage = (loader: () => Promise<{ default: ComponentType }>) => {
  const Page = lazy(loader)
  return (
    <Suspense fallback={<PageFallback />}>
      <Page />
    </Suspense>
  )
}
