import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Ellipsis, Menu as MenuIcon } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Drawer } from '@/components/common/Drawer'
import { Logo } from '@/components/common/Logo'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { UserMenu } from '@/components/common/UserMenu'
import { NotificationCenter } from '@/components/notifications/NotificationCenter'
import { SearchBox } from '@/components/search/SearchBox'
import { appNav } from './appNav'
import { AppNavList, AppSidebar } from './AppSidebar'

function BottomBar({ onMore }: { onMore: () => void }) {
  const items = appNav.filter((item) => item.primary).slice(0, 4)
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition',
              isActive ? 'text-primary-ink' : 'text-fg-subtle',
            )
          }
        >
          <Icon className="size-5" aria-hidden="true" />
          {label}
        </NavLink>
      ))}
      <button
        type="button"
        onClick={onMore}
        className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-fg-subtle"
      >
        <Ellipsis className="size-5" aria-hidden="true" />
        More
      </button>
    </nav>
  )
}

/** Shell for signed-in pages: fixed sidebar on desktop, top bar + bottom tabs + drawer on mobile. */
export function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="min-h-dvh lg:pl-64">
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-primary px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <AppSidebar />

      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-bg/85 px-4 backdrop-blur-lg sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
          className="flex size-10 items-center justify-center rounded-xl text-fg hover:bg-surface-muted lg:hidden"
        >
          <MenuIcon className="size-6" />
        </button>
        <Logo className="lg:hidden" hideText />
        <div className="hidden max-w-md flex-1 sm:block">
          <SearchBox panelClassName="inset-x-0" />
        </div>
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <NotificationCenter />
          <UserMenu />
        </div>
      </header>

      <main id="main" className="px-4 py-6 pb-28 sm:px-6 lg:px-8 lg:py-8 lg:pb-10">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>

      <BottomBar onMore={() => setDrawerOpen(true)} />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Menu">
        <div className="space-y-5 p-4">
          <div className="sm:hidden">
            <SearchBox onNavigate={() => setDrawerOpen(false)} />
          </div>
          <AppNavList onNavigate={() => setDrawerOpen(false)} />
        </div>
      </Drawer>
    </div>
  )
}
