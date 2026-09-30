import {
  Award,
  BookOpen,
  Compass,
  LayoutDashboard,
  Settings,
  Trophy,
  User,
  type LucideIcon,
} from 'lucide-react'

export interface AppNavItem {
  to: string
  label: string
  icon: LucideIcon
  /** Shown in the mobile bottom bar (the rest live in the drawer). */
  primary?: boolean
}

export const appNav: AppNavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, primary: true },
  { to: '/my-courses', label: 'My Courses', icon: BookOpen, primary: true },
  { to: '/courses', label: 'Explore', icon: Compass, primary: true },
  { to: '/certificates', label: 'Certificates', icon: Award },
  { to: '/achievements', label: 'Achievements', icon: Trophy, primary: true },
  { to: '/profile', label: 'Profile', icon: User, primary: true },
  { to: '/settings', label: 'Settings', icon: Settings },
]
