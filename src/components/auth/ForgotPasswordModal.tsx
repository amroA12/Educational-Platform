import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, Mail } from 'lucide-react'
import { delay } from '@/lib/async'
import { forgotPasswordSchema, type ForgotPasswordValues } from '@/lib/schemas'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Modal } from '@/components/common/Modal'

interface ForgotPasswordModalProps {
  open: boolean
  onClose: () => void
}

/** UI-only password reset: simulates sending an email. */
export function ForgotPasswordModal({ open, onClose }: ForgotPasswordModalProps) {
  const [sentTo, setSentTo] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({ resolver: zodResolver(forgotPasswordSchema) })

  const close = () => {
    onClose()
    setSentTo(null)
    reset()
  }

  const onSubmit = async ({ email }: ForgotPasswordValues) => {
    await delay(800)
    setSentTo(email)
  }

  return (
    <Modal
      open={open}
      onClose={close}
      title="Reset your password"
      description="We'll send you a link to choose a new one."
      size="sm"
    >
      {sentTo ? (
        <div className="space-y-4 text-center" role="status">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-success-ink">
            <CheckCircle2 className="size-7" aria-hidden="true" />
          </span>
          <p className="text-fg-muted">
            If an account exists for <strong className="text-fg">{sentTo}</strong>, a reset link is on its way.
            <span className="mt-2 block text-xs text-fg-subtle">(Demo only: no email is actually sent.)</span>
          </p>
          <Button fullWidth onClick={close}>
            Back to login
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            leftIcon={<Mail className="size-4" />}
            error={errors.email?.message}
            {...register('email')}
          />
          <Button type="submit" fullWidth loading={isSubmitting}>
            Send reset link
          </Button>
        </form>
      )}
    </Modal>
  )
}
