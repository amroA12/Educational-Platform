import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu as MenuIcon, X } from 'lucide-react'
import { navLinks } from '@/data/site'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/utils/cn'
import { ButtonLink } from '@/components/common/Button'
import { Logo } from '@/components/common/Logo'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { UserMenu } from '@/components/common/UserMenu'
import { NotificationCenter } from '@/components/notifications/NotificationCenter'
import { SearchBox } from '@/components/search/SearchBox'

const desktopLink = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-lg px-3 py-2 text-sm font-semibold transition',
    isActive ? 'text-primary-ink' : 'text-fg-muted hover:text-fg',
  )

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const isAuthenticated = useAuthStore((state) => !!state.user)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-lg">
      <div className="container-page flex h-16 items-center gap-4 lg:gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={desktopLink}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden w-44 lg:block xl:w-72">
          <SearchBox panelClassName="right-0 w-[26rem]" />
        </div>

        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <NotificationCenter />
              <UserMenu />
              <div className="ml-1 hidden xl:block">
                <ButtonLink to="/dashboard" size="sm">
                  Dashboard
                </ButtonLink>
              </div>
            </>
          ) : (
            <div className="hidden items-center gap-2 lg:flex">
              <ButtonLink to="/login" variant="ghost" size="sm">
                Login
              </ButtonLink>
              <ButtonLink to="/register" size="sm">
                Get Started
              </ButtonLink>
            </div>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex size-10 items-center justify-center rounded-xl text-fg transition hover:bg-surface-muted lg:hidden"
          >
            {menuOpen ? <X className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] animate-slide-up overflow-y-auto border-b border-line bg-bg shadow-pop lg:hidden"
        >
          <div className="container-page space-y-5 py-5">
            <SearchBox onNavigate={closeMenu} />
            <nav aria-label="Mobile" className="grid gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    cn(
                      'rounded-xl px-4 py-3 text-base font-semibold transition',
                      isActive ? 'bg-primary-soft text-primary-ink' : 'text-fg hover:bg-surface-muted',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            {isAuthenticated ? (
              <ButtonLink to="/dashboard" fullWidth size="lg" onClick={closeMenu}>
                Go to Dashboard
              </ButtonLink>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <ButtonLink to="/login" variant="outline" size="lg" onClick={closeMenu}>
                  Login
                </ButtonLink>
                <ButtonLink to="/register" size="lg" onClick={closeMenu}>
                  Get Started
                </ButtonLink>
              </div>
            )}
            <p className="text-center text-xs text-fg-subtle">
              <Link to="/help" onClick={closeMenu} className="hover:underline">
                Need help?
              </Link>
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
