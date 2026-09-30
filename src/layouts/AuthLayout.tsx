import { Outlet } from 'react-router-dom'
import { CheckCircle2, Quote } from 'lucide-react'
import { brand } from '@/data/site'
import { Logo } from '@/components/common/Logo'
import { ThemeToggle } from '@/components/common/ThemeToggle'

const highlights = [
  'Structured courses from expert instructors',
  'Quizzes, streaks, and certificates to keep you going',
  'Your progress saved automatically',
]

export function AuthLayout() {
  return (
    <div className="grid grid-cols-1 min-h-dvh lg:grid-cols-[1fr_1.05fr]">
      <div className="flex flex-col px-5 py-6 sm:px-10">
        <header className="flex items-center justify-between">
          <Logo />
          <ThemeToggle />
        </header>
        <main id="main" className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <Outlet />
        </main>
        <footer className="text-center text-xs text-fg-subtle">
          Demo app — no real account is created and no data leaves your browser.
        </footer>
      </div>

      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 size-96 rounded-full bg-accent-400/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-16 size-96 rounded-full bg-brand-400/30 blur-3xl"
        />
        <div className="relative">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-200">{brand.name}</p>
          <h2 className="mt-4 max-w-md text-4xl font-extrabold leading-tight">{brand.tagline}</h2>
          <ul className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-brand-100">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent-400" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <figure className="relative rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
          <Quote className="mb-3 size-6 text-accent-400" aria-hidden="true" />
          <blockquote className="text-lg leading-relaxed text-white">
            I went from copying tutorials to building my own React apps in two months. The projects and
            quizzes made the difference.
          </blockquote>
          <figcaption className="mt-4 text-sm text-brand-200">
            Nadia Farouk · Junior Front-End Developer
          </figcaption>
        </figure>
      </aside>
    </div>
  )
}
