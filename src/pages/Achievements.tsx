import { useState } from 'react'
import { Trophy } from 'lucide-react'
import { achievements } from '@/data/achievements'
import { useLearnerStats } from '@/lib/stats'
import { useAchievementStore } from '@/store/achievementStore'
import { EmptyState } from '@/components/common/EmptyState'
import { Seo } from '@/components/common/Seo'
import { Tabs } from '@/components/common/Tabs'
import { AchievementCard } from '@/components/dashboard/AchievementCard'
import { ProgressBar } from '@/components/learning/ProgressBar'

type Filter = 'all' | 'unlocked' | 'locked'

export default function Achievements() {
  const unlocked = useAchievementStore((state) => state.unlocked)
  const stats = useLearnerStats()
  const [filter, setFilter] = useState<Filter>('all')

  const unlockedList = achievements.filter((item) => unlocked[item.id])
  const lockedList = achievements.filter((item) => !unlocked[item.id])
  const visible = filter === 'all' ? achievements : filter === 'unlocked' ? unlockedList : lockedList

  return (
    <div>
      <Seo title="Achievements" description="Badges you have unlocked and the ones you are working towards." />
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold sm:text-3xl">Achievements</h1>
        <p className="mt-1 text-fg-muted">Earn badges as you learn. Every lesson, quiz, and streak day counts.</p>
      </header>

      <section aria-label="Achievement summary" className="card mb-8 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md">
          <Trophy className="size-7" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-extrabold">
            {unlockedList.length} of {achievements.length} unlocked
          </p>
          <ProgressBar value={(unlockedList.length / achievements.length) * 100} showValue={false} size="md" label="Achievements unlocked" className="mt-2" />
        </div>
      </section>

      <Tabs
        label="Filter achievements"
        idPrefix="achievements"
        value={filter}
        onChange={setFilter}
        tabs={[
          { id: 'all', label: 'All', count: achievements.length },
          { id: 'unlocked', label: 'Unlocked', count: unlockedList.length },
          { id: 'locked', label: 'Locked', count: lockedList.length },
        ]}
      />

      <div id="achievements-panel" role="tabpanel" aria-labelledby={`achievements-${filter}`} className="mt-6">
        <h2 className="sr-only">Your achievements</h2>
        {visible.length === 0 ? (
          <EmptyState
            icon={Trophy}
            title={filter === 'unlocked' ? 'No achievements yet' : 'Everything unlocked'}
            message={
              filter === 'unlocked'
                ? 'Complete lessons and quizzes to unlock your first badge.'
                : 'You have unlocked every achievement. Amazing work!'
            }
          />
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {visible.map((achievement) => (
              <li key={achievement.id}>
                <AchievementCard achievement={achievement} unlockedAt={unlocked[achievement.id]} current={stats[achievement.metric]} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
