import { NotebookPen } from 'lucide-react'
import { useProgressStore } from '@/store/progressStore'

/** Personal notes per lesson. Saved to local storage as you type. */
export function LessonNotes({ lessonId }: { lessonId: string }) {
  const note = useProgressStore((state) => state.notes[lessonId] ?? '')
  const setNote = useProgressStore((state) => state.setNote)

  return (
    <div>
      <label htmlFor={`note-${lessonId}`} className="mb-2 flex items-center gap-2 text-sm font-bold">
        <NotebookPen className="size-4 text-primary-ink" aria-hidden="true" />
        My notes for this lesson
      </label>
      <textarea
        id={`note-${lessonId}`}
        value={note}
        onChange={(event) => setNote(lessonId, event.target.value)}
        placeholder="Jot down key ideas, questions, or code snippets…"
        className="min-h-40 w-full resize-y rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed placeholder:text-fg-subtle hover:border-line-strong focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
      />
      <p className="mt-2 text-xs text-fg-subtle" role="status">
        {note ? 'Saved automatically in this browser.' : 'Notes are saved automatically in this browser.'}
      </p>
    </div>
  )
}
