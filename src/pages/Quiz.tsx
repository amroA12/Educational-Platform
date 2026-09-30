import { useEffect, useReducer, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ChevronRight, ClipboardList, ClipboardX, Clock, ListChecks, Play, Target } from 'lucide-react'
import { getCourse } from '@/data/courses'
import { getQuizByCourse } from '@/data/quizzes'
import { delay } from '@/lib/async'
import { useIsEnrolled } from '@/store/courseStore'
import { useQuizStore } from '@/store/quizStore'
import { toast } from '@/store/toastStore'
import { formatClock } from '@/utils/format'
import { Button, ButtonLink } from '@/components/common/Button'
import { EmptyState } from '@/components/common/EmptyState'
import { Seo } from '@/components/common/Seo'
import { QuizNavigation } from '@/components/quiz/QuizNavigation'
import { QuizProgress } from '@/components/quiz/QuizProgress'
import { QuizQuestion } from '@/components/quiz/QuizQuestion'
import type { Course, Quiz as QuizType } from '@/types'

interface QuizState {
  started: boolean
  index: number
  answers: Record<string, number>
}

type QuizAction =
  | { type: 'start' }
  | { type: 'answer'; questionId: string; option: number }
  | { type: 'goto'; index: number }

const reducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'start':
      return { started: true, index: 0, answers: {} }
    case 'answer':
      return { ...state, answers: { ...state.answers, [action.questionId]: action.option } }
    case 'goto':
      return { ...state, index: action.index }
  }
}

function QuizRunner({ course, quiz }: { course: Course; quiz: QuizType }) {
  const navigate = useNavigate()
  const saveResult = useQuizStore((state) => state.saveResult)
  const attempts = useQuizStore((state) => state.attempts[course.id])
  const [state, dispatch] = useReducer(reducer, { started: false, index: 0, answers: {} })
  const [elapsed, setElapsed] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const startedAt = useRef(0)

  // Quiz clock: ticks once per second while the quiz is running.
  useEffect(() => {
    if (!state.started || submitting) return
    const timer = window.setInterval(() => setElapsed(Math.floor((Date.now() - startedAt.current) / 1000)), 1000)
    return () => window.clearInterval(timer)
  }, [state.started, submitting])

  const total = quiz.questions.length
  const question = quiz.questions[state.index]
  const answered = quiz.questions.map((item) => item.id in state.answers)
  const remaining = answered.filter((value) => !value).length
  const best = attempts?.reduce((max, attempt) => Math.max(max, attempt.percent), 0)

  const start = () => {
    startedAt.current = Date.now()
    setElapsed(0)
    dispatch({ type: 'start' })
  }

  const jumpToUnanswered = () => {
    const target = answered.findIndex((value, index) => !value && index !== state.index)
    dispatch({ type: 'goto', index: target === -1 ? answered.indexOf(false) : target })
  }

  const submit = async () => {
    if (remaining > 0) return
    setSubmitting(true)
    await delay(600)
    const correct = quiz.questions.filter((item) => state.answers[item.id] === item.correctIndex).length
    saveResult({
      courseId: course.id,
      answers: state.answers,
      correct,
      total,
      percent: Math.round((correct / total) * 100),
      durationSeconds: Math.max(1, Math.floor((Date.now() - startedAt.current) / 1000)),
      submittedAt: new Date().toISOString(),
    })
    toast.success('Quiz submitted', `You scored ${correct} out of ${total}.`)
    navigate(`/quiz/${course.id}/results`)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Seo title={quiz.title} description={quiz.description} />
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-fg-muted">
        <Link to={`/courses/${course.id}`} className="hover:text-primary-ink">{course.title}</Link>
        <ChevronRight className="size-4" aria-hidden="true" />
        <span aria-current="page" className="font-semibold text-fg">Quiz</span>
      </nav>

      {!state.started ? (
        <section className="card p-6 sm:p-10" aria-labelledby="quiz-title">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-primary-soft text-primary-ink">
            <ClipboardList className="size-7" aria-hidden="true" />
          </span>
          <h1 id="quiz-title" className="mt-5 text-3xl font-extrabold">{quiz.title}</h1>
          <p className="mt-2 text-lg text-fg-muted">{quiz.description}</p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: ListChecks, label: `${total} questions` },
              { icon: Clock, label: `${quiz.timeLimitMinutes} min suggested` },
              { icon: Target, label: `${quiz.passingScore}% to pass` },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 rounded-xl border border-line p-3.5 text-sm font-semibold">
                <Icon className="size-5 text-primary-ink" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
          {best !== undefined && (
            <p className="mt-5 rounded-xl bg-surface-muted p-3.5 text-sm text-fg-muted">
              Your best score so far: <strong className="text-fg">{best}%</strong> across {attempts?.length} {attempts?.length === 1 ? 'attempt' : 'attempts'}.
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={start} leftIcon={<Play className="size-5" />}>
              {best !== undefined ? 'Retake quiz' : 'Start quiz'}
            </Button>
            {best !== undefined && (
              <ButtonLink to={`/quiz/${course.id}/results`} size="lg" variant="outline">
                View last result
              </ButtonLink>
            )}
          </div>
        </section>
      ) : (
        <div className="card p-5 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-3 border-b border-line pb-5">
            <h1 className="min-w-0 truncate text-lg font-extrabold">{quiz.title}</h1>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1 text-sm font-bold tabular-nums" role="timer" aria-label={`Elapsed time ${formatClock(elapsed)}`}>
              <Clock className="size-4" aria-hidden="true" />
              {formatClock(elapsed)}
            </span>
          </div>
          <QuizProgress
            total={total}
            current={state.index}
            answered={answered}
            onJump={(index) => dispatch({ type: 'goto', index })}
          />
          <div className="mt-8">
            <QuizQuestion
              key={question.id}
              question={question}
              number={state.index + 1}
              total={total}
              selected={state.answers[question.id]}
              onSelect={(option) => dispatch({ type: 'answer', questionId: question.id, option })}
            />
          </div>
          <QuizNavigation
            isFirst={state.index === 0}
            isLast={state.index === total - 1}
            remaining={remaining}
            submitting={submitting}
            onPrevious={() => dispatch({ type: 'goto', index: state.index - 1 })}
            onNext={() => dispatch({ type: 'goto', index: state.index + 1 })}
            onSubmit={() => void submit()}
            onJumpToUnanswered={jumpToUnanswered}
          />
        </div>
      )}
    </div>
  )
}

export default function Quiz() {
  const { courseId = '' } = useParams()
  const course = getCourse(courseId)
  const quiz = getQuizByCourse(courseId)
  const enrolled = useIsEnrolled(courseId)

  if (!course) return <Navigate to="/courses" replace />
  if (!quiz) {
    return (
      <div className="mx-auto max-w-2xl">
        <Seo title="Quiz unavailable" />
        <EmptyState
          icon={ClipboardX}
          title="No quiz for this course yet"
          message={`"${course.title}" doesn't have a quiz yet. Keep learning: one may be added soon.`}
          action={<ButtonLink to={`/courses/${course.id}`}>Back to course</ButtonLink>}
        />
      </div>
    )
  }
  if (!enrolled) {
    return (
      <div className="mx-auto max-w-2xl">
        <Seo title="Quiz locked" />
        <EmptyState
          icon={ClipboardX}
          title="Enroll to take this quiz"
          message="Quizzes are available to learners enrolled in the course."
          action={<ButtonLink to={`/courses/${course.id}`}>View course</ButtonLink>}
        />
      </div>
    )
  }
  return <QuizRunner course={course} quiz={quiz} />
}
