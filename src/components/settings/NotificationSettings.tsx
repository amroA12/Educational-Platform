import { useSettingsStore, type NotificationPrefs } from '@/store/settingsStore'
import { Switch } from '@/components/common/Switch'

const items: { key: keyof NotificationPrefs; label: string; description: string }[] = [
  { key: 'courseReminders', label: 'Course reminders', description: 'Progress milestones and nudges to keep learning.' },
  { key: 'quizReminders', label: 'Quiz reminders', description: 'A heads-up when a quiz is ready or coming up.' },
  { key: 'achievements', label: 'Achievement notifications', description: 'Celebrate when you unlock a new badge.' },
  { key: 'marketing', label: 'Marketing notifications', description: 'News about new courses and special offers.' },
]

export function NotificationSettings() {
  const prefs = useSettingsStore((state) => state.notifications)
  const setNotification = useSettingsStore((state) => state.setNotification)

  return (
    <section className="card p-5 sm:p-6">
      <h2 className="text-lg font-extrabold">Notifications</h2>
      <p className="mt-1 text-sm text-fg-muted">Choose which in-app notifications you would like to receive.</p>
      <div className="mt-3 divide-y divide-line">
        {items.map((item) => (
          <Switch
            key={item.key}
            id={`notify-${item.key}`}
            label={item.label}
            description={item.description}
            checked={prefs[item.key]}
            onChange={(value) => setNotification(item.key, value)}
          />
        ))}
      </div>
    </section>
  )
}
