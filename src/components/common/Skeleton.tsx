import { cn } from '@/utils/cn'

interface SkeletonProps {
  className?: string
}

/** Placeholder block shown while mock data "loads". Decorative, hidden from assistive tech. */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-shimmer rounded-lg bg-line/80', className)}
    />
  )
}

export function CourseCardSkeleton() {
  return (
    <div className="card overflow-hidden" aria-hidden="true">
      <Skeleton className="aspect-[16/10] rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-40" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
    </div>
  )
}

export function CourseGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label="Loading courses"
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: count }, (_, index) => (
        <CourseCardSkeleton key={index} />
      ))}
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div role="status" aria-label="Loading dashboard" className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-28 rounded-2xl" />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Skeleton className="h-80 rounded-2xl xl:col-span-2" />
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    </div>
  )
}

export function CourseDetailsSkeleton() {
  return (
    <div role="status" aria-label="Loading course" className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-72 rounded-2xl" />
      </div>
      <Skeleton className="h-64 rounded-2xl" />
    </div>
  )
}

export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div role="status" aria-label="Loading" className="space-y-3">
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} className="h-24 rounded-2xl" />
      ))}
    </div>
  )
}
