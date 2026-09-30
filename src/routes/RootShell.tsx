import { Outlet, ScrollRestoration, useRouteError } from 'react-router-dom'
import { Home } from 'lucide-react'
import { ButtonLink } from '@/components/common/Button'
import { ErrorState } from '@/components/common/ErrorState'
import { Seo } from '@/components/common/Seo'
import { Toaster } from '@/components/common/Toaster'

/** Top of the route tree: global toasts, scroll restoration, and the router-level error boundary. */
export function RootShell() {
  return (
    <>
      <Outlet />
      <Toaster />
      <ScrollRestoration />
    </>
  )
}

export function RouteError() {
  const error = useRouteError()
  if (import.meta.env.DEV) console.error(error)
  return (
    <div className="container-page flex min-h-dvh flex-col items-center justify-center gap-6 py-16">
      <Seo title="Something went wrong" />
      <div className="w-full max-w-lg">
        <ErrorState onRetry={() => window.location.reload()} />
      </div>
      <ButtonLink to="/" variant="ghost" leftIcon={<Home className="size-4" />}>
        Back to home
      </ButtonLink>
    </div>
  )
}
