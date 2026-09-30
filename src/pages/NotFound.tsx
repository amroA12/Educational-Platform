import { Compass } from 'lucide-react'
import { ButtonLink } from '@/components/common/Button'
import { Seo } from '@/components/common/Seo'

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Seo title="Page not found" description="The page you are looking for does not exist." />
      <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary-soft text-primary-ink">
        <Compass className="size-8" aria-hidden="true" />
      </div>
      <p className="text-sm font-bold uppercase tracking-widest text-primary-ink">404</p>
      <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">We can&apos;t find that page</h1>
      <p className="mt-3 max-w-md text-fg-muted">
        The link may be broken or the page may have moved. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/">Go home</ButtonLink>
        <ButtonLink to="/courses" variant="outline">
          Browse courses
        </ButtonLink>
      </div>
    </section>
  )
}
