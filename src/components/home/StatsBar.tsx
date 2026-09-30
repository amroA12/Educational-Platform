import { platformStats } from '@/data/site'

export function StatsBar() {
  return (
    <section aria-label="Learnify in numbers" className="border-y border-line bg-surface">
      <div className="container-page py-10">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {platformStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dd className="text-3xl font-extrabold text-gradient sm:text-4xl">{stat.value}</dd>
              <dt className="mt-1 text-sm font-semibold text-fg-muted">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
