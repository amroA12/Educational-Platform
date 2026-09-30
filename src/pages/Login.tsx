import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Mail, Sparkles, TriangleAlert } from 'lucide-react'
import { DEMO_EMAIL } from '@/data/users'
import { loginSchema, type LoginValues } from '@/lib/schemas'
import { signIn, signInAsDemo } from '@/lib/session'
import { toast } from '@/store/toastStore'
import { ForgotPasswordModal } from '@/components/auth/ForgotPasswordModal'
import { Button } from '@/components/common/Button'
import { Checkbox } from '@/components/common/Checkbox'
import { Input, PasswordInput } from '@/components/common/Input'
import { Seo } from '@/components/common/Seo'
import { GoogleIcon } from '@/components/common/SocialIcons'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const destination = (location.state as { from?: string } | null)?.from ?? '/dashboard'
  const [forgotOpen, setForgotOpen] = useState(false)
  const [demoLoading, setDemoLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: true },
  })

  const onSubmit = async (values: LoginValues) => {
    try {
      const user = await signIn(values)
      toast.success(`Welcome back, ${user.firstName}!`)
      navigate(destination, { replace: true })
    } catch (error) {
      setError('root', { message: error instanceof Error ? error.message : 'Something went wrong.' })
    }
  }

  const onDemo = async () => {
    setDemoLoading(true)
    const user = await signInAsDemo()
    toast.success(`Welcome, ${user.firstName}!`, 'You are exploring the demo account.')
    navigate(destination, { replace: true })
  }

  return (
    <div>
      <Seo title="Login" description="Log in to continue your learning on Learnify." />
      <h1 className="text-3xl font-extrabold">Welcome back</h1>
      <p className="mt-2 text-fg-muted">Log in to pick up right where you left off.</p>

      <Button
        variant="secondary"
        size="lg"
        fullWidth
        className="mt-7"
        onClick={onDemo}
        loading={demoLoading}
        leftIcon={<Sparkles className="size-5" />}
      >
        Use Demo Account
      </Button>
      <p className="mt-2 text-center text-xs text-fg-subtle">
        Explore a pre-filled student profile ({DEMO_EMAIL}). No credentials needed.
      </p>

      <div className="my-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
        <span className="h-px flex-1 bg-line" />
        or log in with email
        <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {errors.root && (
          <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/8 p-3.5 text-sm text-danger-ink">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {errors.root.message}
          </div>
        )}
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          leftIcon={<Mail className="size-4" />}
          error={errors.email?.message}
          {...register('email')}
        />
        <PasswordInput
          label="Password"
          autoComplete="current-password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password')}
        />
        <div className="flex items-center justify-between gap-3">
          <Checkbox label="Remember me" {...register('remember')} />
          <button
            type="button"
            onClick={() => setForgotOpen(true)}
            className="text-sm font-semibold text-primary-ink hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <Button type="submit" size="lg" fullWidth loading={isSubmitting} leftIcon={!isSubmitting && <Lock className="size-4" />}>
          Login
        </Button>
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={() => toast.info('Google sign-in is a UI demo', 'Use the demo account or email to continue.')}
          leftIcon={<GoogleIcon className="size-5" />}
        >
          Continue with Google
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-fg-muted">
        New to Learnify?{' '}
        <Link to="/register" className="font-bold text-primary-ink hover:underline">
          Create an account
        </Link>
      </p>

      <ForgotPasswordModal open={forgotOpen} onClose={() => setForgotOpen(false)} />
    </div>
  )
}
