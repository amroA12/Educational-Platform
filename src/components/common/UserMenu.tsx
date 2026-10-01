import { Award, ChevronDown, LayoutDashboard, LogOut, Settings, User as UserIcon } from 'lucide-react'
import { signOut } from '@/lib/session'
import { selectFullName, useAuthStore } from '@/store/authStore'
import { toast } from '@/store/toastStore'
import { Avatar } from './Avatar'
import { Menu } from './Menu'

export function UserMenu() {
  const user = useAuthStore((state) => state.user)
  if (!user) return null
  const name = selectFullName(user)

  return (
    <Menu
      header={
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">{name}</p>
          <p className="truncate text-xs text-fg-muted">{user.email}</p>
        </div>
      }
      button={(props) => (
        <button
          type="button"
          aria-label={`Account menu for ${name}`}
          className="flex items-center gap-2 rounded-xl p-1 pr-2 transition hover:bg-surface-muted"
          {...props}
        >
          <Avatar name={name} size="sm" />
          <ChevronDown className="hidden size-4 text-fg-subtle sm:block" aria-hidden="true" />
        </button>
      )}
      items={[
        { label: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard className="size-4" /> },
        { label: 'Profile', to: '/profile', icon: <UserIcon className="size-4" /> },
        { label: 'Certificates', to: '/certificates', icon: <Award className="size-4" /> },
        { label: 'Settings', to: '/settings', icon: <Settings className="size-4" /> },
        {
          label: 'Sign out',
          icon: <LogOut className="size-4" />,
          danger: true,
          // Protected routes send users home after an intentional sign-out (see RequireAuth).
          onSelect: () => {
            signOut()
            toast.info('Signed out', 'See you soon!')
          },
        },
      ]}
    />
  )
}
