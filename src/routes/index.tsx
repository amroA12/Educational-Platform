import { createBrowserRouter } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout'
import { lazyPage } from './lazyPage'
import { RootShell, RouteError } from './RootShell'

export const router = createBrowserRouter([
  {
    element: <RootShell />,
    errorElement: <RouteError />,
    children: [
      {
        element: <PublicLayout />,
        children: [{ path: '*', element: lazyPage(() => import('@/pages/NotFound')) }],
      },
    ],
  },
])
