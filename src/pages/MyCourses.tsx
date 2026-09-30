import { useState, type ReactNode } from 'react'
import { Bookmark, BookOpen, CheckCheck, GraduationCap } from 'lucide-react'
import { useSimulatedLoading } from '@/hooks/useSimulatedLoading'
import { useLearnerCourses } from '@/lib/learner'
import { ButtonLink } from '@/components/common/Button'
import { ErrorState } from '@/components/common/ErrorState'
import { CourseGridSkeleton } from '@/components/common/Skeleton'
import { Seo } from '@/components/common/Seo'
import { Tabs } from '@/components/common/Tabs'
import { CourseGrid } from '@/components/course/CourseGrid'

type TabId = 'all' | 'in-progress' | 'completed' | 'saved'

export default function MyCourses() {
  const [tab, setTab] = useState<TabId>('all')
  const { enrolled, inProgress, completed, saved } = useLearnerCourses()
  const { loading, error, retry } = useSimulatedLoading('my-courses', 450)

  const explore = <ButtonLink to="/courses">Explore courses</ButtonLink>
  const panels: Record<TabId, ReactNode> = {
    all: (
      <CourseGrid
        variant="learning"
        courses={enrolled.map((item) => item.course)}
        emptyIcon={GraduationCap}
        emptyTitle="No courses yet"
        emptyMessage="Enroll in a course to start learning. It will show up here with your progress."
        emptyAction={explore}
      />
    ),
    'in-progress': (
      <CourseGrid
        variant="learning"
        courses={inProgress.map((item) => item.course)}
        emptyIcon={BookOpen}
        emptyTitle="Nothing in progress"
        emptyMessage="Courses you have started but not finished will appear here."
        emptyAction={explore}
      />
    ),
    completed: (
      <CourseGrid
        variant="learning"
        courses={completed.map((item) => item.course)}
        emptyIcon={CheckCheck}
        emptyTitle="No completed courses yet"
        emptyMessage="Finish every lesson in a course to complete it and earn a certificate."
      />
    ),
    saved: (
      <CourseGrid
        courses={saved}
        emptyIcon={Bookmark}
        emptyTitle="No saved courses"
        emptyMessage="Tap the bookmark on any course to save it for later."
        emptyAction={explore}
      />
    ),
  }

  return (
    <div>
      <Seo title="My Courses" description="Your enrolled, in-progress, completed, and saved courses." />
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold sm:text-3xl">My Courses</h1>
        <p className="mt-1 text-fg-muted">Pick up where you left off, or revisit what you have finished.</p>
      </header>

      <Tabs
        label="My courses"
        idPrefix="my-courses"
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'all', label: 'All', count: enrolled.length },
          { id: 'in-progress', label: 'In Progress', count: inProgress.length },
          { id: 'completed', label: 'Completed', count: completed.length },
          { id: 'saved', label: 'Saved', count: saved.length },
        ]}
      />

      <div id="my-courses-panel" role="tabpanel" aria-labelledby={`my-courses-${tab}`} className="mt-6">
        <h2 className="sr-only">Your courses</h2>
        {loading ? <CourseGridSkeleton count={6} /> : error ? <ErrorState onRetry={retry} /> : panels[tab]}
      </div>
    </div>
  )
}
