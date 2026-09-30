import { ArrowRight, Clock, GraduationCap, Hammer, Quote, TrendingUp, type LucideIcon } from 'lucide-react'
import { categories } from '@/data/categories'
import { courses } from '@/data/courses'
import { instructors } from '@/data/instructors'
import { features, testimonials } from '@/data/site'
import { Avatar } from '@/components/common/Avatar'
import { ButtonLink } from '@/components/common/Button'
import { Rating } from '@/components/common/Rating'
import { SectionHeading } from '@/components/common/SectionHeading'
import { CategoryCard } from '@/components/course/CategoryCard'
import { CourseGrid } from '@/components/course/CourseGrid'
import { InstructorCard } from '@/components/course/InstructorCard'

const popularCourses = [...courses].sort((a, b) => b.students - a.students).slice(0, 6)
const topInstructors = [...instructors].sort((a, b) => b.students - a.students).slice(0, 4)

const featureIcons: Record<(typeof features)[number]['icon'], LucideIcon> = {
  clock: Clock,
  graduation: GraduationCap,
  hammer: Hammer,
  trending: TrendingUp,
}

export function PopularCourses() {
  return (
    <section aria-labelledby="popular-courses" className="container-page py-16 sm:py-20">
      <SectionHeading
        id="popular-courses"
        eyebrow="Popular right now"
        title="Start with our most popular courses"
        description="Hand-picked by thousands of learners. Begin with a course that fits your goals."
        action={
          <ButtonLink to="/courses" variant="outline" rightIcon={<ArrowRight className="size-4" />}>
            View all courses
          </ButtonLink>
        }
      />
      <CourseGrid courses={popularCourses} />
    </section>
  )
}

export function CategoriesSection() {
  return (
    <section aria-labelledby="categories" className="bg-surface py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          id="categories"
          align="center"
          eyebrow="Browse by topic"
          title="Explore top categories"
          description="From code to creativity, find the skills that move your career forward."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <li key={category.id}>
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function WhyLearnify() {
  return (
    <section aria-labelledby="why-learnify" className="container-page py-16 sm:py-20">
      <SectionHeading
        id="why-learnify"
        align="center"
        eyebrow="Why Learnify?"
        title="Everything you need to actually finish what you start"
        description="We combine great teaching with the tools that keep you consistent."
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = featureIcons[feature.icon]
          return (
            <li key={feature.title} className="card p-6 transition duration-200 hover:-translate-y-1 hover:shadow-card-hover">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary-soft text-primary-ink">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{feature.description}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function TopInstructors() {
  return (
    <section aria-labelledby="top-instructors" className="bg-surface py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          id="top-instructors"
          eyebrow="Learn from the best"
          title="Meet our top instructors"
          description="Industry practitioners who love teaching what they know."
          action={
            <ButtonLink to="/instructors" variant="outline" rightIcon={<ArrowRight className="size-4" />}>
              All instructors
            </ButtonLink>
          }
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topInstructors.map((instructor) => (
            <li key={instructor.id}>
              <InstructorCard instructor={instructor} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials" className="container-page py-16 sm:py-20">
      <SectionHeading
        id="testimonials"
        align="center"
        eyebrow="Loved by learners"
        title="Real stories, real progress"
        description="Illustrative testimonials from our fictional community of learners."
      />
      <ul className="grid gap-5 md:grid-cols-2">
        {testimonials.map((item) => (
          <li key={item.id}>
            <figure className="card flex h-full flex-col p-6 sm:p-7">
              <Quote className="size-7 text-brand-300" aria-hidden="true" />
              <blockquote className="mt-3 flex-1 text-base leading-relaxed">{item.review}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <Avatar name={item.name} tone={item.tone} />
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-fg-muted">{item.role}</p>
                </div>
                <Rating value={item.rating} showValue={false} />
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function CtaSection() {
  return (
    <section aria-labelledby="cta-heading" className="container-page pb-16 sm:pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-6 py-14 text-center text-white sm:px-12 sm:py-16">
        <div aria-hidden="true" className="absolute -right-16 -top-16 size-64 rounded-full bg-accent-400/30 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-20 -left-10 size-64 rounded-full bg-brand-300/30 blur-3xl" />
        <div className="relative">
          <h2 id="cta-heading" className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Start your learning journey today.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
            Pick a course, set a goal, and build a skill you can be proud of. It only takes a few minutes to begin.
          </p>
          <ButtonLink
            to="/courses"
            size="lg"
            className="mt-8 bg-white text-brand-800 shadow-lg hover:bg-brand-50 hover:shadow-lg"
            rightIcon={<ArrowRight className="size-5" />}
          >
            Explore Courses
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
