import { Award, CheckCircle2, Flame, PlayCircle } from 'lucide-react'
import { ProgressBar } from '@/components/learning/ProgressBar'

const bars = [38, 22, 60, 40, 82, 25, 48]
const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

/** Decorative product preview for the hero. Built from real UI primitives so it stays on-brand in both themes. */
export function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-lg" aria-hidden="true">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-brand-500/25 via-accent-500/15 to-transparent blur-2xl" />

      <div className="card relative overflow-hidden p-5 shadow-pop sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-fg-subtle">Welcome back</p>
            <p className="text-lg font-extrabold">Continue learning</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-warning-ink">
            <Flame className="size-3.5" />6 day streak
          </span>
        </div>

        <div className="mt-5 rounded-2xl border border-line bg-surface-muted/60 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
              <PlayCircle className="size-6" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-bold">Complete React Developer</p>
              <p className="truncate text-xs text-fg-muted">Next: useEffect explained</p>
            </div>
          </div>
          <ProgressBar value={72} className="mt-4" size="md" label="Course progress" />
        </div>

        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between text-xs">
            <span className="font-bold">This week</span>
            <span className="font-semibold text-fg-subtle">15h total</span>
          </div>
          <div className="flex h-24 items-end justify-between gap-2">
            {bars.map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className={`w-full rounded-lg ${index === 4 ? 'bg-gradient-to-t from-brand-600 to-brand-400' : 'bg-brand-200 dark:bg-brand-500/30'}`}
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] font-semibold text-fg-subtle">{days[index]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card absolute -left-3 bottom-10 hidden animate-float items-center gap-3 p-3 pr-5 shadow-pop sm:flex lg:-left-10">
        <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/15 text-success-ink">
          <CheckCircle2 className="size-5" />
        </span>
        <div>
          <p className="text-xs text-fg-subtle">Quiz passed</p>
          <p className="text-sm font-extrabold">92% score</p>
        </div>
      </div>

      <div
        className="card absolute -right-2 -top-5 hidden animate-float items-center gap-3 p-3 pr-5 shadow-pop sm:flex lg:-right-8"
        style={{ animationDelay: '1.5s' }}
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary-ink">
          <Award className="size-5" />
        </span>
        <div>
          <p className="text-xs text-fg-subtle">New certificate</p>
          <p className="text-sm font-extrabold">Python for Data</p>
        </div>
      </div>
    </div>
  )
}
