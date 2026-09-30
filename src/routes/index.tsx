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
        children: [
          { index: true, element: lazyPage(() => import('@/pages/Home')) },
          { path: 'courses', element: lazyPage(() => import('@/pages/Courses')) },
          { path: 'categories', element: lazyPage(() => import('@/pages/Categories')) },
          { path: 'categories/:categoryId', element: lazyPage(() => import('@/pages/CategoryDetails')) },
          { path: 'instructors', element: lazyPage(() => import('@/pages/Instructors')) },
          { path: 'instructors/:instructorId', element: lazyPage(() => import('@/pages/InstructorDetails')) },
          ...['about', 'help', 'privacy', 'terms'].map((path) => ({
            path,
            element: lazyPage(() => import('@/pages/InfoPage')),
          })),
          { path: '*', element: lazyPage(() => import('@/pages/NotFound')) },
        ],
      },
    ],
  },
])
