import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export interface StyleOptions {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white shadow-sm hover:bg-primary-hover hover:shadow-glow',
  secondary: 'bg-primary-soft text-primary-ink hover:brightness-95 dark:hover:brightness-125',
  outline: 'border border-line-strong bg-surface text-fg hover:bg-surface-muted',
  ghost: 'text-fg-muted hover:bg-surface-muted hover:text-fg',
  danger: 'bg-rose-600 text-white hover:bg-rose-700',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'h-10 w-10',
}

export const buttonClasses = ({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
}: StyleOptions = {}) =>
  cn(
    'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  )


/** Shared input / select / textarea styling. */
export const controlClasses = (invalid: boolean, extra?: string) =>
  cn(
    'w-full rounded-xl border bg-surface px-3.5 text-sm text-fg placeholder:text-fg-subtle transition',
    'hover:border-line-strong focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15',
    'disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-70',
    invalid ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/15' : 'border-line',
    extra,
  )
