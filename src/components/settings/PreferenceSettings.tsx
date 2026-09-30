import { useSettingsStore, type Language } from '@/store/settingsStore'
import { toast } from '@/store/toastStore'
import { Select } from '@/components/common/Select'
import { Switch } from '@/components/common/Switch'

const languages: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'ar', label: 'العربية' },
]

const goals = [30, 60, 90, 120].map((minutes) => ({
  value: String(minutes),
  label: minutes < 60 ? `${minutes} minutes a day` : `${minutes / 60} ${minutes === 60 ? 'hour' : 'hours'} a day`,
}))

const speeds = [0.75, 1, 1.25, 1.5, 2].map((speed) => ({ value: String(speed), label: `${speed}x${speed === 1 ? ' (Normal)' : ''}` }))

export function PreferenceSettings() {
  const { language, dailyGoalMinutes, autoplayNext, defaultSpeed, update } = useSettingsStore()

  return (
    <div className="space-y-6">
      <section className="card p-5 sm:p-6">
        <h2 className="text-lg font-extrabold">Language</h2>
        <p className="mt-1 text-sm text-fg-muted">Interface translations are a preview in this demo. The choice is saved.</p>
        <Select
          className="mt-5 max-w-xs"
          label="Interface language"
          value={language}
          onChange={(event) => {
            update({ language: event.target.value as Language })
            toast.info('Language saved', 'Translations are not included in this demo.')
          }}
          options={languages}
        />
      </section>

      <section className="card p-5 sm:p-6">
        <h2 className="text-lg font-extrabold">Learning preferences</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Select
            label="Daily learning goal"
            value={String(dailyGoalMinutes)}
            onChange={(event) => update({ dailyGoalMinutes: Number(event.target.value) })}
            options={goals}
          />
          <Select
            label="Default playback speed"
            value={String(defaultSpeed)}
            onChange={(event) => update({ defaultSpeed: Number(event.target.value) })}
            options={speeds}
          />
        </div>
        <div className="mt-2 divide-y divide-line">
          <Switch
            id="pref-autoplay"
            label="Continue to the next lesson automatically"
            description="After you mark a lesson complete, jump straight to the next one."
            checked={autoplayNext}
            onChange={(value) => update({ autoplayNext: value })}
          />
        </div>
      </section>
    </div>
  )
}
