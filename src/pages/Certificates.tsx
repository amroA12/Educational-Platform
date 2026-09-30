import { useMemo } from 'react'
import { Award } from 'lucide-react'
import { buildCertificate } from '@/data/certificates'
import { selectFullName, useAuthStore } from '@/store/authStore'
import { useProgressStore } from '@/store/progressStore'
import { ButtonLink } from '@/components/common/Button'
import { CertificateCard } from '@/components/certificate/CertificateCard'
import { EmptyState } from '@/components/common/EmptyState'
import { Seo } from '@/components/common/Seo'

export default function Certificates() {
  const user = useAuthStore((state) => state.user)
  const completedAt = useProgressStore((state) => state.completedAt)
  const name = selectFullName(user)

  const certificates = useMemo(
    () =>
      Object.entries(completedAt)
        .sort(([, a], [, b]) => b.localeCompare(a))
        .map(([courseId, issuedAt]) => buildCertificate(courseId, issuedAt, name)),
    [completedAt, name],
  )

  return (
    <div>
      <Seo title="Certificates" description="Certificates you have earned by completing Learnify courses." />
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold sm:text-3xl">Certificates</h1>
        <p className="mt-1 text-fg-muted">
          {certificates.length > 0
            ? `You have earned ${certificates.length} ${certificates.length === 1 ? 'certificate' : 'certificates'}.`
            : 'Complete a course to earn your first certificate.'}
        </p>
      </header>

      {certificates.length === 0 ? (
        <EmptyState
          icon={Award}
          title="No certificates yet"
          message="Finish every lesson in a course and your certificate of completion will appear here."
          action={<ButtonLink to="/my-courses">Continue learning</ButtonLink>}
        />
      ) : (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
          {certificates.map((certificate) => (
            <li key={certificate.id}>
              <CertificateCard certificate={certificate} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
