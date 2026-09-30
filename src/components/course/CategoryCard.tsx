import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { getCoursesByCategory } from '@/data/courses'
import { categoryIcons } from '@/lib/icons'
import { toneBackground } from '@/lib/tones'
import type { Category } from '@/types'
import { pluralize } from '@/utils/format'

export function CategoryCard({ category }: { category: Category }) {
  const Icon = categoryIcons[category.icon]
  const count = getCoursesByCategory(category.id).length
  return (
    <Link
      to={`/categories/${category.id}`}
      className="group card flex items-center gap-4 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card-hover sm:p-5"
    >
      <span
        className="flex size-12 shrink-0 items-center justify-center rounded-xl text-white shadow-md"
        style={{ background: toneBackground(category.tone) }}
      >
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-bold">{category.name}</span>
        <span className="block text-sm text-fg-muted">{pluralize(count, 'course')}</span>
      </span>
      <ArrowUpRight
        className="size-5 shrink-0 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-ink"
        aria-hidden="true"
      />
    </Link>
  )
}
