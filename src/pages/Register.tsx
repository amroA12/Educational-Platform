import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, UserPlus } from 'lucide-react'
import { registerSchema, type RegisterValues } from '@/lib/schemas'
import { signUp } from '@/lib/session'
import { toast } from '@/store/toastStore'
import { Button } from '@/components/common/Button'
import { Input, PasswordInput } from '@/components/common/Input'
import { Seo } from '@/components/common/Seo'
import { GoogleIcon } from '@/components/common/SocialIcons'

export default function Register() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = async (values: RegisterValues) => {
    const user = await signUp(values)
    toast.success(`Welcome to Learnify, ${user.firstName}!`, 'Your account is ready.')
    navigate('/dashboard', { replace: true })
  }

  return (
    <div>
      <Seo title="Create account" description="Create your free Learnify account and start learning today." />
      <h1 className="text-3xl font-extrabold">Create your account</h1>
      <p className="mt-2 text-fg-muted">Start learning in minutes. It&apos;s free to join.</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-7 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="First name"
            autoComplete="given-name"
            placeholder="Amr"
            error={errors.firstName?.message}
            {...register('firstName')}
          />
          <Input
            label="Last name"
            autoComplete="family-name"
            placeholder="Elzaygh"
            error={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>
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
          autoComplete="new-password"
          placeholder="At least 8 characters"
          hint="Use 8+ characters with a letter and a number."
          error={errors.password?.message}
          {...register('password')}
        />
        <PasswordInput
          label="Confirm password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <Button type="submit" size="lg" fullWidth loading={isSubmitting} leftIcon={!isSubmitting && <UserPlus className="size-4" />}>
          Create account
        </Button>
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={() => toast.info('Google sign-up is a UI demo', 'Create an account with email instead.')}
          leftIcon={<GoogleIcon className="size-5" />}
        >
          Continue with Google
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-fg-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-primary-ink hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}
