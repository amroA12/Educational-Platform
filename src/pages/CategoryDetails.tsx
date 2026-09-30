import { Link, useParams } from 'react-router-dom'
import { ChevronRight, LayoutGrid } from 'lucide-react'
import { getCategory } from '@/data/categories'
import { getCoursesByCategory } from '@/data/courses'
import { categoryIcons } from '@/lib/icons'
import { toneBackground } from '@/lib/tones'
import { pluralize } from '@/utils/format'
import { ButtonLink } from '@/components/common/Button'
import { EmptyState } from '@/components/common/EmptyState'
import { Seo } from '@/components/common/Seo'
import { CourseGrid } from '@/components/course/CourseGrid'

export default function CategoryDetails() {
  const { categoryId = '' } = useParams()
  const category = getCategory(categoryId)

  if (!category) {
    return (
      <div className="container-page py-16">
        <Seo title="Category not found" />
        <EmptyState
          icon={LayoutGrid}
          title="Category not found"
          message="We couldn't find that category. Browse all categories instead."
          action={<ButtonLink to="/categories">View categories</ButtonLink>}
        />
      </div>
    )
  }

  const Icon = categoryIcons[category.icon]
  const categoryCourses = getCoursesByCategory(category.id)

  return (
    <div className="container-page py-10 sm:py-14">
      <Seo title={`${category.name} Courses`} description={category.description} />
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-fg-muted">
        <Link to="/categories" className="hover:text-primary-ink">Categories</Link>
        <ChevronRight className="size-4" aria-hidden="true" />
        <span aria-current="page" className="font-semibold text-fg">{category.name}</span>
      </nav>

      <header className="mb-10 flex items-start gap-5">
        <span
          className="flex size-16 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
          style={{ background: toneBackground(category.tone) }}
        >
          <Icon className="size-8" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">{category.name}</h1>
          <p className="mt-2 max-w-2xl text-lg text-fg-muted">{category.description}</p>
          <p className="mt-2 text-sm font-semibold text-fg-subtle">{pluralize(categoryCourses.length, 'course')}</p>
        </div>
      </header>

      <CourseGrid
        courses={categoryCourses}
        emptyTitle="No courses here yet"
        emptyMessage="New courses in this category are coming soon."
        emptyAction={<ButtonLink to="/courses">Browse all courses</ButtonLink>}
      />
    </div>
  )
}
