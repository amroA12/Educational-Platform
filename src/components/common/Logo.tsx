import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={cn('size-9', className)} aria-hidden="true">
      <defs>
        <linearGradient id="logo-gradient" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7a63ff" />
          <stop offset="1" stopColor="#4a2fd6" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#logo-gradient)" />
      <path
        d="M18 22v20.5c0 2.2 1.8 4 4 4h24"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="44" cy="22" r="5" fill="#34d3c4" />
    </svg>
  )
}

interface LogoProps {
  to?: string
  className?: string
  hideText?: boolean
}

export function Logo({ to = '/', className, hideText }: LogoProps) {
  return (
    <Link to={to} className={cn('inline-flex items-center gap-2.5 font-extrabold tracking-tight', className)}>
      <LogoMark />
      <span className={cn('text-xl text-fg', hideText && 'sr-only')}>Learnify</span>
    </Link>
  )
}
