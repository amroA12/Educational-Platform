import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Eye, EyeOff, PlayCircle, RotateCcw } from 'lucide-react'
import { getCourse } from '@/data/courses'
import { getQuizByCourse } from '@/data/quizzes'
import { useContinuePath } from '@/lib/resume'
import { useQuizStore } from '@/store/quizStore'
import { Button, ButtonLink } from '@/components/common/Button'
import { Seo } from '@/components/common/Seo'
import { AnswerReview } from '@/components/quiz/AnswerReview'
import { QuizResultSummary } from '@/components/quiz/QuizResult'

export default function QuizResults() {
  const { courseId = '' } = useParams()
  const course = getCourse(courseId)
  const quiz = getQuizByCourse(courseId)
  const result = useQuizStore((state) => state.attempts[courseId]?.at(-1))
  const continuePath = useContinuePath(courseId)
  const [showReview, setShowReview] = useState(false)
  const reviewRef = useRef<HTMLDivElement>(null)

  if (!course || !quiz) return <Navigate to="/courses" replace />
  if (!result) return <Navigate to={`/quiz/${courseId}`} replace />

  const toggleReview = () => {
    setShowReview((value) => !value)
    window.setTimeout(() => reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Seo title={`${quiz.title} results`} description={`Your results for ${quiz.title}.`} />
      <QuizResultSummary quiz={quiz} result={result} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="outline"
          size="lg"
          onClick={toggleReview}
          aria-expanded={showReview}
          leftIcon={showReview ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        >
          {showReview ? 'Hide Answers' : 'Review Answers'}
        </Button>
        <ButtonLink to={continuePath} size="lg" leftIcon={<PlayCircle className="size-5" />}>
          Continue Learning
        </ButtonLink>
        <ButtonLink to={`/quiz/${courseId}`} size="lg" variant="secondary" leftIcon={<RotateCcw className="size-5" />}>
          Retake Quiz
        </ButtonLink>
      </div>

      {showReview && (
        <section ref={reviewRef} aria-label="Answer review" className="scroll-mt-24 pt-2">
          <h2 className="mb-4 text-xl font-extrabold">Review your answers</h2>
          <AnswerReview quiz={quiz} result={result} />
        </section>
      )}
    </div>
  )
}
