import { Award, Bell, BellOff, BookOpen, CheckCheck, ClipboardList, Info, Trash2, TrendingUp } from 'lucide-react'
import { formatRelative } from '@/utils/format'
import { useNotificationStore, useUnreadCount } from '@/store/notificationStore'
import type { NotificationItem } from '@/types'
import { cn } from '@/utils/cn'
import { EmptyState } from '@/components/common/EmptyState'
import { Popover } from '@/components/common/Popover'

const kindIcons: Record<NotificationItem['kind'], typeof Bell> = {
  progress: TrendingUp,
  achievement: Award,
  lesson: BookOpen,
  quiz: ClipboardList,
  system: Info,
}

export function NotificationCenter() {
  const items = useNotificationStore((state) => state.items)
  const markRead = useNotificationStore((state) => state.markRead)
  const markAllRead = useNotificationStore((state) => state.markAllRead)
  const remove = useNotificationStore((state) => state.remove)
  const unread = useUnreadCount()

  return (
    <Popover
      panelClassName="w-[min(24rem,calc(100vw-2rem))] -mr-12 sm:mr-0"
      trigger={(props) => (
        <button
          type="button"
          aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'}
          className="relative flex size-10 items-center justify-center rounded-xl text-fg-muted transition hover:bg-surface-muted hover:text-fg"
          {...props}
        >
          <Bell className="size-5" />
          {unread > 0 && (
            <span
              aria-hidden="true"
              className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-surface"
            >
              {unread}
            </span>
          )}
        </button>
      )}
    >
      {() => (
        <section aria-label="Notifications">
          <header className="flex items-center justify-between border-b border-line px-4 py-3">
            <h2 className="text-sm font-bold">Notifications</h2>
            <button
              type="button"
              onClick={markAllRead}
              disabled={unread === 0}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-ink hover:underline disabled:pointer-events-none disabled:opacity-40"
            >
              <CheckCheck className="size-3.5" aria-hidden="true" />
              Mark all as read
            </button>
          </header>
          {items.length === 0 ? (
            <EmptyState
              compact
              icon={BellOff}
              title="No notifications"
              message="You are all caught up. New activity will show up here."
              className="m-3 border-0"
            />
          ) : (
            <ul className="scrollbar-thin max-h-96 divide-y divide-line overflow-y-auto">
              {items.map((item) => {
                const Icon = kindIcons[item.kind]
                return (
                  <li key={item.id} className={cn('group flex gap-3 px-4 py-3', !item.read && 'bg-primary-soft/60')}>
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-primary-ink">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2 text-sm font-semibold">
                        {item.title}
                        {!item.read && (
                          <span className="rounded-full bg-primary px-1.5 py-px text-[10px] font-bold uppercase text-white">
                            New
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 text-sm text-fg-muted">{item.message}</p>
                      <div className="mt-1.5 flex items-center gap-3 text-xs">
                        <span className="text-fg-subtle">{formatRelative(item.createdAt)}</span>
                        {!item.read && (
                          <button
                            type="button"
                            onClick={() => markRead(item.id)}
                            className="font-semibold text-primary-ink hover:underline"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(item.id)}
                      aria-label={`Delete notification: ${item.title}`}
                      className="flex size-8 shrink-0 items-center justify-center rounded-lg text-fg-subtle opacity-70 transition hover:bg-rose-500/10 hover:text-danger-ink group-hover:opacity-100 focus-visible:opacity-100"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      )}
    </Popover>
  )
}
