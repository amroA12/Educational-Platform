import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Clock, ListVideo, Lock, SearchX } from 'lucide-react'
import { getCourse } from '@/data/courses'
import { getCurriculum, getLesson, getLessons } from '@/data/lessons'
import { getQuizByCourse } from '@/data/quizzes'
import { useIsEnrolled } from '@/store/courseStore'
import { useCourseProgress, useProgressStore } from '@/store/progressStore'
import { useSettingsStore } from '@/store/settingsStore'
import { toast } from '@/store/toastStore'
import type { Course, Lesson } from '@/types'
import { cn } from '@/utils/cn'
import { formatMinutes } from '@/utils/format'
import { Badge } from '@/components/common/Badge'
import { Button, ButtonLink } from '@/components/common/Button'
import { Drawer } from '@/components/common/Drawer'
import { EmptyState } from '@/components/common/EmptyState'
import { Logo } from '@/components/common/Logo'
import { Seo } from '@/components/common/Seo'
import { Tabs } from '@/components/common/Tabs'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { LessonArticle } from '@/components/learning/LessonArticle'
import { LessonNavigation } from '@/components/learning/LessonNavigation'
import { LessonNotes } from '@/components/learning/LessonNotes'
import { LessonSidebar } from '@/components/learning/LessonSidebar'
import { ProgressBar } from '@/components/learning/ProgressBar'
import { ResourceList } from '@/components/learning/ResourceList'
import { VideoPlayer } from '@/components/learning/VideoPlayer'

type DetailTab = 'overview' | 'resources' | 'notes'

function LearnView({ course, lesson }: { course: Course; lesson: Lesson }) {
  const navigate = useNavigate()
  const lessons = getLessons(course.id)
  const index = lessons.findIndex((item) => item.id === lesson.id)
  const previous = lessons[index - 1]
  const next = lessons[index + 1]
  const moduleTitle = getCurriculum(course.id).find((item) => item.id === lesson.moduleId)?.title ?? ''

  const percent = useCourseProgress(course.id)
  const isComplete = useProgressStore((state) => state.completedLessons[course.id]?.includes(lesson.id) ?? false)
  const toggleComplete = useProgressStore((state) => state.toggleLessonComplete)
  const setLastLesson = useProgressStore((state) => state.setLastLesson)
  const autoplayNext = useSettingsStore((state) => state.autoplayNext)
  const [tab, setTab] = useState<DetailTab>('overview')
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Remember where the learner is so "Continue" resumes here.
  useEffect(() => {
    setLastLesson(course.id, lesson.id)
  }, [course.id, lesson.id, setLastLesson])

  const onToggleComplete = () => {
    const nowComplete = toggleComplete(course.id, lesson.id, lesson.durationMinutes)
    if (!nowComplete) return
    const doneCount = useProgressStore.getState().completedLessons[course.id]?.length ?? 0
    if (doneCount === lessons.length) {
      toast.success('Course completed!', 'Your certificate is ready.')
    } else {
      toast.success('Lesson completed', lesson.title)
      if (autoplayNext && next) window.setTimeout(() => navigate(`/learn/${course.id}/${next.id}`), 900)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col lg:h-dvh lg:overflow-hidden">
      <Seo title={`${lesson.title} · ${course.title}`} description={lesson.description} />

      <header className="z-20 flex h-14 shrink-0 items-center gap-2 border-b border-line bg-surface px-3 sm:px-4">
        <Link
          to="/my-courses"
          aria-label="Back to My Courses"
          className="flex size-9 shrink-0 items-center justify-center rounded-lg text-fg-muted hover:bg-surface-muted hover:text-fg"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <Logo hideText className="hidden sm:inline-flex" />
        <div className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden="true" />
        <Link to={`/courses/${course.id}`} className="min-w-0 flex-1 truncate text-sm font-bold hover:text-primary-ink sm:text-base">
          {course.title}
        </Link>
        <div className="hidden w-56 shrink-0 md:block">
          <p className="mb-1 text-xs font-semibold text-fg-muted">Course Progress: {percent}%</p>
          <ProgressBar value={percent} showValue={false} label="Course progress" />
        </div>
        <ThemeToggle />
        <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setDrawerOpen(true)} leftIcon={<ListVideo className="size-4" />}>
          Lessons
        </Button>
      </header>

      <div className="min-h-0 flex-1 lg:grid lg:grid-cols-[22rem_minmax(0,1fr)]">
        <aside className="hidden min-h-0 border-r border-line bg-surface lg:block" aria-label="Course curriculum">
          <LessonSidebar courseId={course.id} currentLessonId={lesson.id} />
        </aside>

        <main id="main" className="min-h-0 lg:overflow-y-auto">
          <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
            {lesson.type === 'video' ? (
              <VideoPlayer
                key={lesson.id}
                title={lesson.title}
                subtitle={moduleTitle}
                durationSeconds={lesson.durationMinutes * 60}
                tone={course.thumbnail}
              />
            ) : (
              <LessonArticle lesson={lesson} />
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-fg-muted">
                  Lesson {lesson.order} of {lessons.length} · {moduleTitle}
                </p>
                <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">{lesson.title}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge tone="neutral" icon={<Clock className="size-3" />}>
                    {formatMinutes(lesson.durationMinutes)}
                  </Badge>
                  <Badge tone={isComplete ? 'success' : 'neutral'}>{isComplete ? 'Completed' : 'Not completed'}</Badge>
                </div>
              </div>
              <Button
                size="lg"
                variant={isComplete ? 'outline' : 'primary'}
                onClick={onToggleComplete}
                aria-pressed={isComplete}
                className={cn('shrink-0', isComplete && 'border-emerald-500/50 text-success-ink')}
                leftIcon={<CheckCircle2 className="size-5" />}
              >
                {isComplete ? 'Completed' : 'Mark as Complete'}
              </Button>
            </div>

            <LessonNavigation courseId={course.id} previous={previous} next={next} hasQuiz={!!getQuizByCourse(course.id)} />

            <div>
              <Tabs
                label="Lesson details"
                idPrefix="lesson"
                value={tab}
                onChange={setTab}
                tabs={[
                  { id: 'overview', label: 'Overview' },
                  { id: 'resources', label: 'Resources' },
                  { id: 'notes', label: 'Notes' },
                ]}
              />
              <div id="lesson-panel" role="tabpanel" aria-labelledby={`lesson-${tab}`} className="pt-6">
                {tab === 'overview' && (
                  <p className="max-w-3xl leading-relaxed text-fg-muted">{lesson.description}</p>
                )}
                {tab === 'resources' && <ResourceList lesson={lesson} />}
                {tab === 'notes' && <LessonNotes lessonId={lesson.id} />}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Course curriculum">
        <LessonSidebar courseId={course.id} currentLessonId={lesson.id} onNavigate={() => setDrawerOpen(false)} />
      </Drawer>
    </div>
  )
}

export default function Learn() {
  const { courseId = '', lessonId = '' } = useParams()
  const course = getCourse(courseId)
  const lesson = course ? getLesson(course.id, lessonId) : undefined
  const enrolled = useIsEnrolled(courseId)

  if (!course) {
    return (
      <div className="container-page py-20">
        <Seo title="Lesson not found" />
        <EmptyState
          icon={SearchX}
          title="Lesson not found"
          message="We couldn't find that course or lesson."
          action={<ButtonLink to="/courses">Browse courses</ButtonLink>}
        />
      </div>
    )
  }

  if (!lesson) {
    const first = getLessons(course.id)[0]
    return <Navigate to={first ? `/learn/${course.id}/${first.id}` : `/courses/${course.id}`} replace />
  }

  if (!enrolled) {
    return (
      <div className="container-page py-20">
        <Seo title={`Enroll in ${course.title}`} />
        <EmptyState
          icon={Lock}
          title="Enroll to start learning"
          message={`You need to enroll in "${course.title}" before you can open its lessons.`}
          action={<ButtonLink to={`/courses/${course.id}`}>View course</ButtonLink>}
        />
      </div>
    )
  }

  return <LearnView course={course} lesson={lesson} />
}
