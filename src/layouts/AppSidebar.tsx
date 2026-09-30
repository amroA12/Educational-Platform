import { NavLink } from 'react-router-dom'
import { Flame } from 'lucide-react'
import { useLearnerStats } from '@/lib/stats'
import { cn } from '@/utils/cn'
import { Logo } from '@/components/common/Logo'
import { appNav } from './appNav'

interface AppNavListProps {
  onNavigate?: () => void
}

export function AppNavList({ onNavigate }: AppNavListProps) {
  return (
    <nav aria-label="Application" className="grid gap-1">
      {appNav.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition',
              isActive
                ? 'bg-primary-soft text-primary-ink'
                : 'text-fg-muted hover:bg-surface-muted hover:text-fg',
            )
          }
        >
          <Icon className="size-5" aria-hidden="true" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

function StreakCard() {
  const { streakDays } = useLearnerStats()
  return (
    <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white">
      <div className="flex items-center gap-2 text-sm font-bold">
        <Flame className="size-5 text-amber-300" aria-hidden="true" />
        {streakDays}-day streak
      </div>
      <p className="mt-1.5 text-xs text-brand-100">
        {streakDays >= 7
          ? 'Amazing consistency. Keep it alive!'
          : 'Learn a little every day to keep your streak going.'}
      </p>
    </div>
  )
}

export function AppSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-line bg-surface lg:flex">
      <div className="flex h-16 items-center px-5">
        <Logo to="/dashboard" />
      </div>
      <div className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4">
        <AppNavList />
      </div>
      <div className="p-4">
        <StreakCard />
      </div>
    </aside>
  )
}
