import { Award } from 'lucide-react'
import { getCourse } from '@/data/courses'
import { getInstructor } from '@/data/instructors'
import type { Certificate } from '@/types'
import { formatDate } from '@/utils/format'
import { LogoMark } from '@/components/common/Logo'

/**
 * Certificate artwork. All sizes use container-query units (cqw) so the same component renders
 * crisply as a card thumbnail, in the modal, and when printed. Colours are fixed (not themed)
 * so the certificate looks like paper in both light and dark mode.
 */
export function CertificateView({ certificate }: { certificate: Certificate }) {
  const course = getCourse(certificate.courseId)
  const instructor = course ? getInstructor(course.instructorId) : undefined

  return (
    <div
      role="img"
      aria-label={`Certificate of completion awarded to ${certificate.recipient} for ${course?.title}`}
      className="@container w-full"
    >
      <div
        className="relative aspect-[1.414/1] w-full overflow-hidden bg-[#fffdf8] text-[#1d1b3a] shadow-card"
        style={{ borderRadius: '0.6cqw' }}
      >
        <div className="absolute inset-0 border-brand-800" style={{ borderWidth: '1.1cqw', borderStyle: 'solid' }} />
        <div
          className="absolute border-amber-500/70"
          style={{ inset: '2.2cqw', borderWidth: '0.25cqw', borderStyle: 'solid' }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{ background: 'radial-gradient(circle at 50% 45%, #5b3fe8, transparent 60%)' }}
        />

        <div className="relative flex h-full flex-col items-center justify-between text-center" style={{ padding: '5.2cqw 7cqw 4.4cqw' }}>
          <div className="flex items-center" style={{ gap: '1cqw' }}>
            <LogoMark className="!size-[4.2cqw]" />
            <span className="font-extrabold tracking-tight" style={{ fontSize: '3cqw' }}>
              Learnify
            </span>
          </div>

          <div>
            <p className="font-bold uppercase text-amber-700" style={{ fontSize: '1.7cqw', letterSpacing: '0.35em' }}>
              Certificate of Completion
            </p>
            <p className="text-[#55526e]" style={{ fontSize: '1.6cqw', marginTop: '2cqw' }}>
              This certifies that
            </p>
            <p
              className="font-serif font-bold italic text-brand-800"
              style={{ fontSize: '5.4cqw', lineHeight: 1.15, marginTop: '0.8cqw' }}
            >
              {certificate.recipient}
            </p>
            <div className="mx-auto bg-amber-500/60" style={{ height: '0.2cqw', width: '28cqw', marginTop: '0.8cqw' }} />
            <p className="text-[#55526e]" style={{ fontSize: '1.6cqw', marginTop: '1.6cqw' }}>
              successfully completed
            </p>
            <p className="font-extrabold" style={{ fontSize: '3.3cqw', lineHeight: 1.2, marginTop: '0.8cqw' }}>
              {course?.title}
            </p>
          </div>

          <div className="grid w-full grid-cols-3 items-end" style={{ gap: '2cqw' }}>
            <div className="text-left">
              <p className="font-semibold" style={{ fontSize: '1.7cqw' }}>
                {formatDate(certificate.issuedAt, 'MMMM d, yyyy')}
              </p>
              <div className="bg-[#1d1b3a]/40" style={{ height: '0.15cqw', marginBlock: '0.5cqw' }} />
              <p className="uppercase text-[#55526e]" style={{ fontSize: '1.15cqw', letterSpacing: '0.15em' }}>
                Date
              </p>
            </div>

            <div className="flex flex-col items-center">
              <span
                className="flex items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-600 text-white shadow-md"
                style={{ width: '7.6cqw', height: '7.6cqw' }}
              >
                <Award style={{ width: '4.4cqw', height: '4.4cqw' }} aria-hidden="true" />
              </span>
            </div>

            <div className="text-right">
              <p className="font-serif italic" style={{ fontSize: '2.1cqw' }}>
                {instructor?.name}
              </p>
              <div className="bg-[#1d1b3a]/40" style={{ height: '0.15cqw', marginBlock: '0.5cqw' }} />
              <p className="uppercase text-[#55526e]" style={{ fontSize: '1.15cqw', letterSpacing: '0.15em' }}>
                Instructor
              </p>
            </div>
          </div>

          <p className="font-mono text-[#55526e]" style={{ fontSize: '1.2cqw', marginTop: '1.4cqw' }}>
            Certificate ID: {certificate.id}
          </p>
        </div>
      </div>
    </div>
  )
}
