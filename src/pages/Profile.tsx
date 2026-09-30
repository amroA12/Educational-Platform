import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Award, BookOpenCheck, CalendarDays, Clock, Flame, GraduationCap, ListChecks, Mail, MapPin, Pencil, Trophy } from 'lucide-react'
import { achievements } from '@/data/achievements'
import { buildCertificate } from '@/data/certificates'
import { getCourse } from '@/data/courses'
import { achievementIcons } from '@/lib/icons'
import { useLearnerCourses } from '@/lib/learner'
import { useLearnerStats } from '@/lib/stats'
import { useAchievementStore } from '@/store/achievementStore'
import { selectFullName, useAuthStore } from '@/store/authStore'
import { useProgressStore } from '@/store/progressStore'
import { formatDate, formatMinutes } from '@/utils/format'
import { Avatar } from '@/components/common/Avatar'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Seo } from '@/components/common/Seo'
import { StatCard } from '@/components/dashboard/StatCard'
import { ProfileEditModal } from '@/components/profile/ProfileEditModal'

function Section({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="card p-5 sm:p-6" aria-label={title}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-extrabold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

export default function Profile() {
  const user = useAuthStore((state) => state.user)
  const completedAt = useProgressStore((state) => state.completedAt)
  const unlocked = useAchievementStore((state) => state.unlocked)
  const stats = useLearnerStats()
  const { enrolled, completed } = useLearnerCourses()
  const [editing, setEditing] = useState(false)

  if (!user) return null
  const name = selectFullName(user)
  const certificates = Object.entries(completedAt).map(([courseId, issuedAt]) => buildCertificate(courseId, issuedAt, name))
  const unlockedAchievements = achievements.filter((item) => unlocked[item.id])

  return (
    <div className="space-y-6">
      <Seo title="Profile" description="Your Learnify profile, learning statistics, skills, certificates, and achievements." />

      <header className="card overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-brand-600 via-brand-700 to-accent-600 sm:h-36" aria-hidden="true" />
        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
            <Avatar name={name} size="xl" className="size-24 shrink-0 text-3xl ring-4 sm:size-28" />
            <Button variant="outline" onClick={() => setEditing(true)} leftIcon={<Pencil className="size-4" />} className="self-start sm:self-auto">
              Edit profile
            </Button>
          </div>
          <h1 className="mt-4 text-2xl font-extrabold sm:text-3xl">{name}</h1>
          {user.headline && <p className="mt-1 text-fg-muted">{user.headline}</p>}
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-muted">
            <li className="inline-flex items-center gap-1.5">
              <Mail className="size-4 text-fg-subtle" aria-hidden="true" />
              {user.email}
            </li>
            {user.location && (
              <li className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-fg-subtle" aria-hidden="true" />
                {user.location}
              </li>
            )}
            <li className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4 text-fg-subtle" aria-hidden="true" />
              Joined {formatDate(user.joinedAt, 'MMMM yyyy')}
            </li>
          </ul>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Courses enrolled" value={String(enrolled.length)} icon={BookOpenCheck} />
        <StatCard label="Lessons completed" value={String(stats.lessonsCompleted)} icon={ListChecks} tone="emerald" />
        <StatCard label="Learning time" value={formatMinutes(Math.round(stats.learningHours * 60))} icon={Clock} tone="amber" />
        <StatCard label="Current streak" value={`${stats.streakDays} ${stats.streakDays === 1 ? 'day' : 'days'}`} icon={Flame} tone="orange" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Section title="About">
            {user.bio ? (
              <p className="leading-relaxed text-fg-muted">{user.bio}</p>
            ) : (
              <p className="text-fg-muted">
                You haven&apos;t written a bio yet.{' '}
                <button type="button" onClick={() => setEditing(true)} className="font-semibold text-primary-ink hover:underline">
                  Add one
                </button>
              </p>
            )}
          </Section>

          <Section title="Skills">
            {user.skills.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <li key={skill}>
                    <Badge tone="brand" className="px-3 py-1 text-sm">
                      {skill}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-fg-muted">Add skills to show what you are learning.</p>
            )}
          </Section>

          <Section
            title="Certificates"
            action={
              <Link to="/certificates" className="text-sm font-semibold text-primary-ink hover:underline">
                View all
              </Link>
            }
          >
            {certificates.length === 0 ? (
              <p className="text-fg-muted">Complete a course to earn your first certificate.</p>
            ) : (
              <ul className="divide-y divide-line">
                {certificates.map((certificate) => (
                  <li key={certificate.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-warning-ink">
                      <Award className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-bold">{getCourse(certificate.courseId)?.title}</span>
                      <span className="block text-xs text-fg-subtle">Issued {formatDate(certificate.issuedAt)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </div>

        <div className="space-y-6">
          <Section
            title="Achievements"
            action={
              <Link to="/achievements" className="text-sm font-semibold text-primary-ink hover:underline">
                View all
              </Link>
            }
          >
            {unlockedAchievements.length === 0 ? (
              <p className="text-fg-muted">No achievements unlocked yet.</p>
            ) : (
              <ul className="grid grid-cols-3 gap-3">
                {unlockedAchievements.map((achievement) => {
                  const Icon = achievementIcons[achievement.icon]
                  return (
                    <li key={achievement.id} className="flex flex-col items-center gap-2 text-center">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <span className="text-xs font-semibold leading-tight">{achievement.name}</span>
                    </li>
                  )
                })}
              </ul>
            )}
          </Section>

          <Section title="Learning summary">
            <dl className="space-y-3 text-sm">
              {[
                { label: 'Courses completed', value: completed.length, icon: GraduationCap },
                { label: 'Quizzes taken', value: stats.quizzesTaken, icon: ListChecks },
                { label: 'Achievements', value: `${unlockedAchievements.length} / ${achievements.length}`, icon: Trophy },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-2 text-fg-muted">
                    <Icon className="size-4 text-fg-subtle" aria-hidden="true" />
                    {label}
                  </dt>
                  <dd className="font-bold">{value}</dd>
                </div>
              ))}
            </dl>
          </Section>
        </div>
      </div>

      <ProfileEditModal user={user} open={editing} onClose={() => setEditing(false)} />
    </div>
  )
}
