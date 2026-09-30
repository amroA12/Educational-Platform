import { Download, FileArchive, FileText, Link2 } from 'lucide-react'
import { toast } from '@/store/toastStore'
import type { Lesson, LessonType } from '@/types'

interface Resource {
  name: string
  meta: string
  icon: typeof FileText
}

const resourcesByType: Record<LessonType, Resource[]> = {
  video: [
    { name: 'Lesson slides', meta: 'PDF · 2.4 MB', icon: FileText },
    { name: 'Code examples', meta: 'ZIP · 640 KB', icon: FileArchive },
    { name: 'Further reading', meta: 'External links', icon: Link2 },
  ],
  reading: [
    { name: 'Printable summary', meta: 'PDF · 820 KB', icon: FileText },
    { name: 'Further reading', meta: 'External links', icon: Link2 },
  ],
  exercise: [
    { name: 'Starter files', meta: 'ZIP · 1.1 MB', icon: FileArchive },
    { name: 'Project brief', meta: 'PDF · 1.6 MB', icon: FileText },
    { name: 'Reference solution', meta: 'ZIP · 1.3 MB', icon: FileArchive },
  ],
}

/** Resource list UI. Downloads are simulated: the demo ships no real files. */
export function ResourceList({ lesson }: { lesson: Lesson }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {resourcesByType[lesson.type].map(({ name, meta, icon: Icon }) => (
        <li key={name} className="card flex items-center gap-3 p-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-ink">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold">{name}</span>
            <span className="block text-xs text-fg-subtle">{meta}</span>
          </span>
          <button
            type="button"
            onClick={() => toast.info('Demo resource', 'Downloads are not included in this front-end demo.')}
            aria-label={`Download ${name}`}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-fg-muted transition hover:bg-surface-muted hover:text-primary-ink"
          >
            <Download className="size-4.5" />
          </button>
        </li>
      ))}
    </ul>
  )
}
