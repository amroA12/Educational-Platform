import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { categories } from '@/data/categories'
import { courses } from '@/data/courses'
import { useSimulatedLoading } from '@/hooks/useSimulatedLoading'
import {
  countActiveFilters,
  defaultFilters,
  filterCourses,
  sortOptions,
  type CourseFilters,
  type SortKey,
} from '@/lib/courseFilters'
import { cn } from '@/utils/cn'
import { Button } from '@/components/common/Button'
import { Drawer } from '@/components/common/Drawer'
import { ErrorState } from '@/components/common/ErrorState'
import { Input } from '@/components/common/Input'
import { Pagination } from '@/components/common/Pagination'
import { Select } from '@/components/common/Select'
import { CourseGridSkeleton } from '@/components/common/Skeleton'
import { Seo } from '@/components/common/Seo'
import { CourseFilterPanel } from '@/components/course/CourseFilterPanel'
import { CourseGrid } from '@/components/course/CourseGrid'

const PAGE_SIZE = 9

const chipClass = (selected: boolean) =>
  cn(
    'shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition',
    selected
      ? 'border-primary bg-primary text-white'
      : 'border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg',
  )

export default function Courses() {
  const [params] = useSearchParams()
  const [filters, setFilters] = useState<CourseFilters>(() => ({
    ...defaultFilters,
    query: params.get('q') ?? '',
    category: categories.some((c) => c.id === params.get('category')) ? params.get('category')! : 'all',
  }))
  const [page, setPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { loading, error, retry } = useSimulatedLoading('courses')

  // Any filter change returns to the first page.
  const update = (patch: Partial<CourseFilters>) => {
    setFilters((current) => ({ ...current, ...patch }))
    setPage(1)
  }
  const reset = () => update({ levels: [], minRating: 0, duration: 'any', price: 'any' })

  const results = useMemo(() => filterCourses(courses, filters), [filters])
  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visible = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const activeCount = countActiveFilters(filters)

  const changePage = (next: number) => {
    setPage(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <Seo title="Courses" description="Browse Learnify courses in programming, design, business, AI, marketing, data science and more." />

      <header className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Courses</h1>
        <p className="mt-2 text-lg text-fg-muted">
          Find the right course to build your next skill, then learn at your own pace.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]">
        <Input
          type="search"
          aria-label="Search courses"
          placeholder="Search by course, instructor, or category"
          value={filters.query}
          onChange={(event) => update({ query: event.target.value })}
          leftIcon={<Search className="size-4" />}
        />
        <Select
          aria-label="Sort courses"
          value={filters.sort}
          onChange={(event) => update({ sort: event.target.value as SortKey })}
          options={sortOptions}
          className="sm:w-56"
        />
      </div>

      <div
        role="group"
        aria-label="Filter by category"
        className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        <button type="button" onClick={() => update({ category: 'all' })} aria-pressed={filters.category === 'all'} className={chipClass(filters.category === 'all')}>
          All categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => update({ category: category.id })}
            aria-pressed={filters.category === category.id}
            className={chipClass(filters.category === category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[16rem_1fr]">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="card sticky top-24 p-5">
            <h2 className="mb-4 text-base font-extrabold">Filters</h2>
            <CourseFilterPanel filters={filters} onChange={update} onReset={reset} />
          </div>
        </aside>

        <section aria-label="Course results" aria-busy={loading}>
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-fg-muted" role="status" aria-live="polite">
              {loading ? 'Loading courses…' : `Showing ${results.length} ${results.length === 1 ? 'course' : 'courses'}`}
            </p>
            <div className="flex items-center gap-2">
              {(activeCount > 0 || filters.query || filters.category !== 'all') && !loading && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => update({ ...defaultFilters, sort: filters.sort })}
                  leftIcon={<X className="size-4" />}
                >
                  Clear all
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setFiltersOpen(true)}
                leftIcon={<SlidersHorizontal className="size-4" />}
              >
                Filters{activeCount > 0 ? ` (${activeCount})` : ''}
              </Button>
            </div>
          </div>

          {loading ? (
            <CourseGridSkeleton count={PAGE_SIZE} />
          ) : error ? (
            <ErrorState onRetry={retry} />
          ) : (
            <>
              <CourseGrid
                courses={visible}
                emptyAction={
                  <Button variant="outline" onClick={() => update({ ...defaultFilters })}>
                    Clear search and filters
                  </Button>
                }
              />
              <div className="mt-10">
                <Pagination page={currentPage} pageCount={pageCount} onChange={changePage} />
              </div>
            </>
          )}
        </section>
      </div>

      <Drawer open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters">
        <div className="p-5">
          <CourseFilterPanel filters={filters} onChange={update} onReset={reset} />
          <Button fullWidth className="mt-3" onClick={() => setFiltersOpen(false)}>
            Show {results.length} {results.length === 1 ? 'course' : 'courses'}
          </Button>
        </div>
      </Drawer>
    </div>
  )
}
