import { RouterProvider } from 'react-router-dom'
import { startAchievementSync } from '@/lib/achievementSync'
import { router } from '@/routes'
import '@/store/themeStore'

startAchievementSync()

export default function App() {
  return <RouterProvider router={router} />
}
