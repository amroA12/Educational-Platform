import { instructors } from '@/data/instructors'
import { Seo } from '@/components/common/Seo'
import { InstructorCard } from '@/components/course/InstructorCard'

export default function Instructors() {
  return (
    <div className="container-page py-10 sm:py-14">
      <Seo title="Instructors" description="Meet the expert instructors teaching on Learnify." />
      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Instructors</h1>
        <p className="mt-2 text-lg text-fg-muted">
          Learn from practitioners who do this work every day and love to teach it.
        </p>
      </header>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {instructors.map((instructor) => (
          <li key={instructor.id}>
            <InstructorCard instructor={instructor} />
          </li>
        ))}
      </ul>
    </div>
  )
}
