import { createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from '@/layouts/AuthLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { AppLayout } from '@/layouts/AppLayout'
import { GuestOnly, RequireAuth } from './guards'
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
          { path: 'courses/:courseId', element: lazyPage(() => import('@/pages/CourseDetails')) },
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
      {
        element: <GuestOnly />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { path: 'login', element: lazyPage(() => import('@/pages/Login')) },
              { path: 'register', element: lazyPage(() => import('@/pages/Register')) },
            ],
          },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: 'dashboard', element: lazyPage(() => import('@/pages/Dashboard')) },
              { path: 'my-courses', element: lazyPage(() => import('@/pages/MyCourses')) },
              { path: 'certificates', element: lazyPage(() => import('@/pages/Certificates')) },
              { path: 'achievements', element: lazyPage(() => import('@/pages/Achievements')) },
              { path: 'profile', element: lazyPage(() => import('@/pages/Profile')) },
              { path: 'settings', element: lazyPage(() => import('@/pages/Settings')) },
              { path: 'quiz/:courseId', element: lazyPage(() => import('@/pages/Quiz')) },
              { path: 'quiz/:courseId/results', element: lazyPage(() => import('@/pages/QuizResults')) },
            ],
          },
          { path: 'learn/:courseId/:lessonId', element: lazyPage(() => import('@/pages/Learn')) },
        ],
      },
    ],
  },
])
