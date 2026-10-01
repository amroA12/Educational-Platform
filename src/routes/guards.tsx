import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

/** Redirects signed-out visitors to the login page, remembering where they wanted to go. */
export function RequireAuth() {
  const user = useAuthStore((state) => state.user)
  const justSignedOut = useAuthStore((state) => state.justSignedOut)
  const location = useLocation()
  if (!user && justSignedOut) return <Navigate to="/" replace />
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />
  return <Outlet />
}

/** Keeps signed-in users away from login / register. */
export function GuestOnly() {
  const user = useAuthStore((state) => state.user)
  const from = (useLocation().state as { from?: string } | null)?.from
  if (user) return <Navigate to={from ?? '/dashboard'} replace />
  return <Outlet />
}
