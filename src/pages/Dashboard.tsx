import { useMemo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import {
  Award,
  BookOpenCheck,
  CalendarClock,
  ClipboardList,
  Clock,
  Flame,
  Flag,
  Hammer,
  Trophy,
} from 'lucide-react'
import { achievements } from '@/data/achievements'
import { useSimulatedLoading } from '@/hooks/useSimulatedLoading'
import { useLearnerCourses } from '@/lib/learner'
import { useLearnerStats, useWeeklyActivity } from '@/lib/stats'
import { buildUpcomingTasks, type UpcomingTask } from '@/lib/tasks'
import { useAchievementStore } from '@/store/achievementStore'
import { useAuthStore } from '@/store/authStore'
import { useCourseStore } from '@/store/courseStore'
import { useProgressStore } from '@/store/progressStore'
import { useQuizStore } from '@/store/quizStore'
import { greetingForNow } from '@/utils/date'
import { formatMinutes } from '@/utils/format'
import { Badge } from '@/components/common/Badge'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { DashboardSkeleton } from '@/components/common/Skeleton'
import { Seo } from '@/components/common/Seo'
import { ActivityChart } from '@/components/dashboard/ActivityChart'
import { AchievementCard } from '@/components/dashboard/AchievementCard'
import { ContinueLearning } from '@/components/dashboard/ContinueLearning'
import { StatCard } from '@/components/dashboard/StatCard'
import { ButtonLink } from '@/components/common/Button'

const taskIcons = { Quiz: ClipboardList, Assignment: Hammer, Milestone: Flag } as const

function Panel({ title, action, children, className }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section aria-label={title} className={`card p-5 sm:p-6 ${className ?? ''}`}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-lg font-extrabold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

function TaskList({ tasks }: { tasks: UpcomingTask[] }) {
  if (tasks.length === 0) {
    return (
      <EmptyState compact icon={CalendarClock} title="You're all caught up" message="New quizzes and assignments will appear here." />
    )
  }
  return (
    <ul className="space-y-3">
      {tasks.map((task) => {
        const Icon = taskIcons[task.kind]
        return (
          <li key={task.id}>
            <Link
              to={task.to}
              className="flex items-start gap-3 rounded-xl border border-line p-3 transition hover:border-line-strong hover:bg-surface-muted"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-ink">
                <Icon className="size-4.5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold">{task.title}</span>
                <span className="block truncate text-xs text-fg-muted">{task.courseTitle}</span>
                <span className="mt-1.5 flex items-center gap-2 text-xs text-fg-subtle">
                  <Badge tone={task.kind === 'Quiz' ? 'warning' : task.kind === 'Assignment' ? 'info' : 'brand'}>{task.kind}</Badge>
                  Due {format(task.dueAt, 'EEE, MMM d')}
                </span>
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default function Dashboard() {
  const user = useAuthStore((state) => state.user)
  const { loading, error, retry } = useSimulatedLoading('dashboard', 550)
  const { inProgress, completed, enrolled } = useLearnerCourses()
  const stats = useLearnerStats()
  const weekly = useWeeklyActivity()
  const unlocked = useAchievementStore((state) => state.unlocked)
  const completedLessons = useProgressStore((state) => state.completedLessons)
  const attempts = useQuizStore((state) => state.attempts)
  const enrollments = useCourseStore((state) => state.enrollments)

  const tasks = useMemo(
    () => buildUpcomingTasks({ enrolledIds: inProgress.map((item) => item.course.id), completedLessons, attempts }),
    [inProgress, completedLessons, attempts],
  )

  const recent = useMemo(
    () =>
      achievements
        .filter((achievement) => unlocked[achievement.id])
        .sort((a, b) => unlocked[b.id].localeCompare(unlocked[a.id]))
        .slice(0, 3),
    [unlocked],
  )

  return (
    <div>
      <Seo title="Dashboard" description="Your learning dashboard: progress, activity, tasks, and achievements." />
      {loading ? (
        <DashboardSkeleton />
      ) : error ? (
        <ErrorState onRetry={retry} />
      ) : (
        <div className="space-y-8">
          <header>
            <h1 className="text-2xl font-extrabold sm:text-3xl">
              {greetingForNow()}, {user?.firstName}
            </h1>
            <p className="mt-1 text-fg-muted">
              {inProgress.length > 0 ? 'Ready to continue learning?' : 'Ready to start learning something new?'}
            </p>
          </header>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            <StatCard label="Courses in Progress" value={String(inProgress.length)} hint={`${Object.keys(enrollments).length} enrolled`} icon={BookOpenCheck} />
            <StatCard label="Completed Courses" value={String(completed.length)} hint={completed.length ? 'Certificates earned' : 'Finish one to earn a certificate'} icon={Award} tone="emerald" />
            <StatCard label="Learning Hours" value={formatMinutes(Math.round(stats.learningHours * 60))} hint="All-time total" icon={Clock} tone="amber" />
            <StatCard label="Current Streak" value={`${stats.streakDays} ${stats.streakDays === 1 ? 'day' : 'days'}`} hint={stats.streakDays >= 7 ? 'Incredible!' : 'Learn today to keep it alive'} icon={Flame} tone="orange" />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="space-y-6 xl:col-span-2">
              <Panel
                title="Continue Learning"
                action={
                  enrolled.length > 0 ? (
                    <ButtonLink to="/my-courses" variant="ghost" size="sm">
                      View all
                    </ButtonLink>
                  ) : undefined
                }
              >
                <ContinueLearning courseIds={inProgress.slice(0, 3).map((item) => item.course.id)} />
              </Panel>
              <Panel title="Learning Activity">
                <ActivityChart data={weekly} />
              </Panel>
            </div>

            <div className="space-y-6">
              <Panel title="Upcoming Tasks">
                <TaskList tasks={tasks} />
              </Panel>
              <Panel
                title="Recent Achievements"
                action={
                  <ButtonLink to="/achievements" variant="ghost" size="sm">
                    View all
                  </ButtonLink>
                }
              >
                {recent.length === 0 ? (
                  <EmptyState compact icon={Trophy} title="No achievements yet" message="Complete lessons and quizzes to unlock your first badge." />
                ) : (
                  <ul className="space-y-3">
                    {recent.map((achievement) => (
                      <li key={achievement.id}>
                        <AchievementCard achievement={achievement} unlockedAt={unlocked[achievement.id]} current={stats[achievement.metric]} compact />
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
