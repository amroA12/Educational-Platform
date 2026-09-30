import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { delay } from '@/lib/async'
import { parseSkills, toProfileValues } from '@/lib/profile'
import { profileSchema, type ProfileValues } from '@/lib/schemas'
import { useAuthStore } from '@/store/authStore'
import { toast } from '@/store/toastStore'
import type { User } from '@/types'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Modal } from '@/components/common/Modal'
import { Textarea } from '@/components/common/Textarea'

interface ProfileEditModalProps {
  user: User
  open: boolean
  onClose: () => void
}

export function ProfileEditModal({ user, open, onClose }: ProfileEditModalProps) {
  const updateProfile = useAuthStore((state) => state.updateProfile)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({ resolver: zodResolver(profileSchema), values: toProfileValues(user) })

  const close = () => {
    reset(toProfileValues(user))
    onClose()
  }

  const onSubmit = async ({ skills, ...values }: ProfileValues) => {
    await delay(500)
    updateProfile({ ...values, skills: parseSkills(skills) })
    toast.success('Profile updated', 'Your changes are saved in this browser.')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={close}
      title="Edit profile"
      description="Update how you appear on Learnify."
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={close} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" form="profile-form" loading={isSubmitting}>
            Save changes
          </Button>
        </>
      }
    >
      <form id="profile-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="First name" autoComplete="given-name" error={errors.firstName?.message} {...register('firstName')} />
          <Input label="Last name" autoComplete="family-name" error={errors.lastName?.message} {...register('lastName')} />
        </div>
        <Input label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Headline" placeholder="e.g. Aspiring Front-End Developer" error={errors.headline?.message} {...register('headline')} />
          <Input label="Location" placeholder="City, Country" error={errors.location?.message} {...register('location')} />
        </div>
        <Textarea label="Bio" placeholder="Tell others a little about yourself" error={errors.bio?.message} {...register('bio')} />
        <Input
          label="Skills"
          hint="Separate skills with commas, e.g. React, TypeScript, Figma"
          error={errors.skills?.message}
          {...register('skills')}
        />
      </form>
    </Modal>
  )
}
