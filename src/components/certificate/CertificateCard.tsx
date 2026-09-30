import { useState } from 'react'
import { Eye, Printer } from 'lucide-react'
import { getCourse } from '@/data/courses'
import type { Certificate } from '@/types'
import { formatDate } from '@/utils/format'
import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { CertificateView } from './CertificateView'

/** Print stylesheet hook: only the element marked `.print-area` is printed. */
const printCertificate = () => window.print()

export function CertificateCard({ certificate }: { certificate: Certificate }) {
  const course = getCourse(certificate.courseId)
  const [open, setOpen] = useState(false)
  if (!course) return null

  return (
    <article className="card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View certificate for ${course.title}`}
        className="block w-full bg-surface-muted p-4 transition hover:bg-line/60"
      >
        <CertificateView certificate={certificate} />
      </button>
      <div className="p-5">
        <h2 className="font-bold leading-snug">{course.title}</h2>
        <p className="mt-1 text-sm text-fg-muted">Issued {formatDate(certificate.issuedAt)}</p>
        <p className="mt-0.5 font-mono text-xs text-fg-subtle">{certificate.id}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button size="sm" onClick={() => setOpen(true)} leftIcon={<Eye className="size-4" />}>
            View Certificate
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setOpen(true)
              window.setTimeout(printCertificate, 350)
            }}
            leftIcon={<Printer className="size-4" />}
          >
            Print
          </Button>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Certificate of Completion"
        description={course.title}
        size="xl"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button onClick={printCertificate} leftIcon={<Printer className="size-4" />}>
              Print / Save as PDF
            </Button>
          </>
        }
      >
        <div className="print-area">
          <CertificateView certificate={certificate} />
        </div>
      </Modal>
    </article>
  )
}
