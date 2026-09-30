import { Check, Monitor, Moon, Sun } from 'lucide-react'
import { useThemeStore, type ThemeMode } from '@/store/themeStore'
import { Menu } from './Menu'

const options: { mode: ThemeMode; label: string; icon: typeof Sun }[] = [
  { mode: 'light', label: 'Light', icon: Sun },
  { mode: 'dark', label: 'Dark', icon: Moon },
  { mode: 'system', label: 'System', icon: Monitor },
]

export function ThemeToggle() {
  const mode = useThemeStore((state) => state.mode)
  const setMode = useThemeStore((state) => state.setMode)
  const Current = options.find((option) => option.mode === mode)?.icon ?? Sun

  return (
    <Menu
      button={(props) => (
        <button
          type="button"
          aria-label={`Theme: ${mode}. Change theme`}
          className="flex size-10 items-center justify-center rounded-xl text-fg-muted transition hover:bg-surface-muted hover:text-fg"
          {...props}
        >
          <Current className="size-5" />
        </button>
      )}
      items={options.map(({ mode: value, label, icon: Icon }) => ({
        label: value === mode ? `${label} (active)` : label,
        icon: value === mode ? <Check className="size-4 text-primary-ink" /> : <Icon className="size-4" />,
        onSelect: () => setMode(value),
      }))}
    />
  )
}
