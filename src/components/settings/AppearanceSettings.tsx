import { Monitor, Moon, Sun } from 'lucide-react'
import { useThemeStore, type ThemeMode } from '@/store/themeStore'
import { cn } from '@/utils/cn'

const options: { mode: ThemeMode; label: string; description: string; icon: typeof Sun }[] = [
  { mode: 'light', label: 'Light', description: 'Bright and clean', icon: Sun },
  { mode: 'dark', label: 'Dark', description: 'Easy on the eyes', icon: Moon },
  { mode: 'system', label: 'System', description: 'Match your device', icon: Monitor },
]

export function AppearanceSettings() {
  const mode = useThemeStore((state) => state.mode)
  const setMode = useThemeStore((state) => state.setMode)

  return (
    <section className="card p-5 sm:p-6">
      <h2 className="text-lg font-extrabold">Theme</h2>
      <p className="mt-1 text-sm text-fg-muted">Choose how Learnify looks. Your choice is saved in this browser.</p>
      <fieldset className="mt-5">
        <legend className="sr-only">Theme</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {options.map(({ mode: value, label, description, icon: Icon }) => {
            const selected = mode === value
            return (
              <label
                key={value}
                className={cn(
                  'flex cursor-pointer flex-col gap-3 rounded-2xl border-2 p-4 transition',
                  'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500',
                  selected ? 'border-primary bg-primary-soft' : 'border-line hover:border-line-strong',
                )}
              >
                <input type="radio" name="theme" value={value} checked={selected} onChange={() => setMode(value)} className="sr-only" />
                <span className="flex items-center justify-between">
                  <span className={cn('flex size-10 items-center justify-center rounded-xl', selected ? 'bg-primary text-white' : 'bg-surface-muted text-fg-muted')}>
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  {selected && <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold text-white">Active</span>}
                </span>
                <span>
                  <span className="block font-bold">{label}</span>
                  <span className="block text-sm text-fg-muted">{description}</span>
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>
    </section>
  )
}
