import { ArrowRight, PlayCircle, Star } from 'lucide-react'
import { brand } from '@/data/site'
import { useAuthStore } from '@/store/authStore'
import { Avatar } from '@/components/common/Avatar'
import { ButtonLink } from '@/components/common/Button'
import { SearchBox } from '@/components/search/SearchBox'
import { HeroPreview } from './HeroPreview'

const learners = [
  { name: 'Nadia Farouk', tone: 'violet' },
  { name: 'Michael Torres', tone: 'orange' },
  { name: 'Sara Lindholm', tone: 'pink' },
  { name: 'Kwame Mensah', tone: 'emerald' },
] as const

export function Hero() {
  const isAuthenticated = useAuthStore((state) => !!state.user)
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(circle_at_15%_10%,rgb(109_85_245/0.18),transparent_45%),radial-gradient(circle_at_85%_30%,rgb(20_184_166/0.14),transparent_40%)]"
      />
      <div className="container-page grid grid-cols-1 items-center gap-14 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-24">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-semibold text-fg-muted shadow-sm">
            <span className="size-2 rounded-full bg-accent-500" aria-hidden="true" />
            New: Generative AI for Professionals
          </p>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
            Learn smarter. <span className="text-gradient">Grow faster.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted">
            {brand.name} helps you build practical skills through structured courses, interactive lessons,
            quizzes, and progress tracking, all in one place.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/courses" size="lg" rightIcon={<ArrowRight className="size-5" />}>
              Explore Courses
            </ButtonLink>
            <ButtonLink
              to={isAuthenticated ? '/dashboard' : '/register'}
              size="lg"
              variant="outline"
              leftIcon={<PlayCircle className="size-5" />}
            >
              Start Learning
            </ButtonLink>
          </div>

          <SearchBox variant="hero" placeholder="What do you want to learn today?" className="mt-8" />

          <div className="mt-8 flex items-center gap-4">
            <ul className="flex -space-x-2">
              {learners.map((learner) => (
                <li key={learner.name}>
                  <Avatar name={learner.name} tone={learner.tone} size="sm" />
                </li>
              ))}
            </ul>
            <p className="text-sm text-fg-muted">
              <span className="inline-flex items-center gap-1 font-bold text-fg">
                4.8 <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
              </span>{' '}
              average rating from 50K+ learners
            </p>
          </div>
        </div>

        <HeroPreview />
      </div>
    </section>
  )
}
