import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { Spinner } from './Spinner'
import { buttonClasses, type StyleOptions } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, StyleOptions {
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export function Button({
  variant,
  size,
  fullWidth,
  className,
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, fullWidth, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <Spinner className="size-4" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  )
}

interface ButtonLinkProps extends LinkProps, StyleOptions {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

/** A router link that looks like a button, so navigation keeps proper link semantics. */
export function ButtonLink({
  variant,
  size,
  fullWidth,
  className,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, fullWidth, className })} {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </Link>
  )
}
