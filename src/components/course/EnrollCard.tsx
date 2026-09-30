import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Award, Bookmark, CheckCircle2, Infinity as InfinityIcon, PlayCircle, Smartphone, FileText } from 'lucide-react'
import { delay } from '@/lib/async'
import { useContinuePath } from '@/lib/resume'
import { useAuthStore } from '@/store/authStore'
import { useCourseStore, useIsEnrolled, useIsFavorite } from '@/store/courseStore'
import { useCourseProgress } from '@/store/progressStore'
import { toast } from '@/store/toastStore'
import type { Course } from '@/types'
import { cn } from '@/utils/cn'
import { formatPrice } from '@/utils/format'
import { Button, ButtonLink } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { ProgressBar } from '@/components/learning/ProgressBar'
import { CourseThumbnail } from './CourseThumbnail'

const includes = [
  { icon: PlayCircle, label: 'On-demand video lessons' },
  { icon: FileText, label: 'Downloadable resources' },
  { icon: Award, label: 'Certificate of completion' },
  { icon: Smartphone, label: 'Learn on any device' },
  { icon: InfinityIcon, label: 'Lifetime access' },
]

export function EnrollCard({ course }: { course: Course }) {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const isEnrolled = useIsEnrolled(course.id)
  const isFavorite = useIsFavorite(course.id)
  const enroll = useCourseStore((state) => state.enroll)
  const toggleFavorite = useCourseStore((state) => state.toggleFavorite)
  const percent = useCourseProgress(course.id)
  const continuePath = useContinuePath(course.id)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [enrolling, setEnrolling] = useState(false)

  const isFree = course.price === 0
  const discount = course.originalPrice ? Math.round((1 - course.price / course.originalPrice) * 100) : 0

  const startEnrollment = () => {
    if (!user) {
      toast.info('Sign in to enroll', 'Create a free account or use the demo account.')
      navigate('/login', { state: { from: location.pathname } })
      return
    }
    if (isFree) void completeEnrollment()
    else setConfirmOpen(true)
  }

  const completeEnrollment = async () => {
    setEnrolling(true)
    await delay(700)
    enroll(course.id)
    setEnrolling(false)
    setConfirmOpen(false)
    toast.success('You are enrolled!', course.title)
  }

  const onToggleFavorite = () => {
    const now = toggleFavorite(course.id)
    toast.success(now ? 'Saved to your wishlist' : 'Removed from your wishlist', course.title)
  }

  return (
    <aside aria-label="Enrollment" className="card overflow-hidden shadow-card-hover">
      <CourseThumbnail course={course} size="hero" className="aspect-video" />
      <div className="space-y-5 p-5 sm:p-6">
        {isEnrolled ? (
          <>
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-success-ink">
                <CheckCircle2 className="size-4.5" aria-hidden="true" />
                You&apos;re enrolled
              </div>
              <p className="mb-2 text-sm font-semibold text-fg-muted">Course Progress: {percent}%</p>
              <ProgressBar value={percent} label="Course progress" showValue={false} size="md" />
            </div>
            <ButtonLink to={continuePath} size="lg" fullWidth leftIcon={<PlayCircle className="size-5" />}>
              {percent === 0 ? 'Start learning' : percent === 100 ? 'Review course' : 'Continue learning'}
            </ButtonLink>
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl font-extrabold">{formatPrice(course.price)}</span>
              {course.originalPrice && (
                <>
                  <span className="text-lg text-fg-subtle line-through">
                    <span className="sr-only">Original price </span>
                    {formatPrice(course.originalPrice)}
                  </span>
                  <span className="rounded-full bg-emerald-700 px-2.5 py-0.5 text-xs font-bold text-white">
                    {discount}% off
                  </span>
                </>
              )}
            </div>
            <Button size="lg" fullWidth onClick={startEnrollment} loading={enrolling && isFree}>
              {isFree ? 'Enroll for free' : 'Enroll now'}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          fullWidth
          onClick={onToggleFavorite}
          aria-pressed={isFavorite}
          leftIcon={<Bookmark className={cn('size-4', isFavorite && 'fill-current text-primary-ink')} />}
        >
          {isFavorite ? 'Saved to wishlist' : 'Save for later'}
        </Button>

        <div className="border-t border-line pt-5">
          <h2 className="mb-3 text-sm font-bold">This course includes</h2>
          <ul className="space-y-2.5 text-sm text-fg-muted">
            {includes.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5">
                <Icon className="size-4 text-fg-subtle" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Modal
        open={confirmOpen}
        onClose={() => !enrolling && setConfirmOpen(false)}
        title="Confirm enrollment"
        description="This is a demo checkout. No payment is taken."
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)} disabled={enrolling}>
              Cancel
            </Button>
            <Button onClick={() => void completeEnrollment()} loading={enrolling}>
              Complete enrollment
            </Button>
          </>
        }
      >
        <div className="flex items-center gap-4">
          <CourseThumbnail course={course} className="size-16 shrink-0 rounded-xl" />
          <div className="min-w-0">
            <p className="font-bold leading-snug">{course.title}</p>
            <p className="mt-1 text-lg font-extrabold">{formatPrice(course.price)}</p>
          </div>
        </div>
      </Modal>
    </aside>
  )
}
