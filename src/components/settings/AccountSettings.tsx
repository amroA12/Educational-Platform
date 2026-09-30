import { useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TriangleAlert } from 'lucide-react'
import { delay } from '@/lib/async'
import { parseSkills, toProfileValues } from '@/lib/profile'
import { changePasswordSchema, profileSchema, type ChangePasswordValues, type ProfileValues } from '@/lib/schemas'
import { resetAllLocalData } from '@/lib/session'
import { useAuthStore } from '@/store/authStore'
import { toast } from '@/store/toastStore'
import type { User } from '@/types'
import { Button } from '@/components/common/Button'
import { Input, PasswordInput } from '@/components/common/Input'
import { Modal } from '@/components/common/Modal'

function NameEmailForm({ user }: { user: User }) {
  const updateProfile = useAuthStore((state) => state.updateProfile)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileValues>({ resolver: zodResolver(profileSchema), values: toProfileValues(user) })

  const onSubmit = async ({ skills, ...values }: ProfileValues) => {
    await delay(400)
    updateProfile({ ...values, skills: parseSkills(skills) })
    toast.success('Account updated')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="First name" autoComplete="given-name" error={errors.firstName?.message} {...register('firstName')} />
        <Input label="Last name" autoComplete="family-name" error={errors.lastName?.message} {...register('lastName')} />
      </div>
      <Input label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
      <Button type="submit" loading={isSubmitting} disabled={!isDirty}>
        Save changes
      </Button>
    </form>
  )
}

function PasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  })

  const onSubmit = async () => {
    await delay(700)
    reset()
    toast.success('Password updated', 'Demo only: no password is stored.')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <PasswordInput label="Current password" autoComplete="current-password" error={errors.currentPassword?.message} {...register('currentPassword')} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PasswordInput
          label="New password"
          autoComplete="new-password"
          hint="8+ characters with a letter and a number."
          error={errors.newPassword?.message}
          {...register('newPassword')}
        />
        <PasswordInput label="Confirm new password" autoComplete="new-password" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
      </div>
      <Button type="submit" variant="outline" loading={isSubmitting}>
        Update password
      </Button>
    </form>
  )
}

function Group({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="text-lg font-extrabold">{title}</h2>
      {description && <p className="mt-1 text-sm text-fg-muted">{description}</p>}
      <div className="mt-5">{children}</div>
    </section>
  )
}

export function AccountSettings() {
  const user = useAuthStore((state) => state.user)
  const [confirmReset, setConfirmReset] = useState(false)
  if (!user) return null

  return (
    <div className="space-y-6">
      <Group title="Personal information" description="This is how your name and email appear across Learnify.">
        <NameEmailForm user={user} />
      </Group>
      <Group title="Password" description="Password change is a UI demo. Nothing is sent or stored.">
        <PasswordForm />
      </Group>
      <Group title="Reset demo data" description="Clears every Learnify value stored in this browser (progress, favorites, quiz results, settings) and starts over.">
        <Button variant="danger" onClick={() => setConfirmReset(true)} leftIcon={<TriangleAlert className="size-4" />}>
          Reset all local data
        </Button>
      </Group>

      <Modal
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Reset all local data?"
        description="This cannot be undone."
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmReset(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={resetAllLocalData}>
              Yes, reset everything
            </Button>
          </>
        }
      >
        <p className="text-fg-muted">
          You will be signed out and the app will reload with fresh demo data.
        </p>
      </Modal>
    </div>
  )
}
