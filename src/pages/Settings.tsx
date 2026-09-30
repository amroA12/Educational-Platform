import { useState, type ComponentType } from 'react'
import { Seo } from '@/components/common/Seo'
import { Tabs } from '@/components/common/Tabs'
import { AccountSettings } from '@/components/settings/AccountSettings'
import { AppearanceSettings } from '@/components/settings/AppearanceSettings'
import { NotificationSettings } from '@/components/settings/NotificationSettings'
import { PreferenceSettings } from '@/components/settings/PreferenceSettings'

type SettingsTab = 'account' | 'appearance' | 'notifications' | 'preferences'

const panels: Record<SettingsTab, ComponentType> = {
  account: AccountSettings,
  appearance: AppearanceSettings,
  notifications: NotificationSettings,
  preferences: PreferenceSettings,
}

export default function Settings() {
  const [tab, setTab] = useState<SettingsTab>('account')
  const Panel = panels[tab]

  return (
    <div className="mx-auto max-w-3xl">
      <Seo title="Settings" description="Manage your account, appearance, notifications, and learning preferences." />
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold sm:text-3xl">Settings</h1>
        <p className="mt-1 text-fg-muted">Everything is saved automatically in this browser.</p>
      </header>

      <Tabs
        label="Settings sections"
        idPrefix="settings"
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'account', label: 'Account' },
          { id: 'appearance', label: 'Appearance' },
          { id: 'notifications', label: 'Notifications' },
          { id: 'preferences', label: 'Preferences' },
        ]}
      />
      <div id="settings-panel" role="tabpanel" aria-labelledby={`settings-${tab}`} className="mt-6">
        <Panel />
      </div>
    </div>
  )
}
