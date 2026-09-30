import { useEffect } from 'react'

interface SeoProps {
  title: string
  description?: string
}

const SITE = 'Learnify'
const DEFAULT_DESCRIPTION =
  'Learnify helps you build practical skills through structured courses, interactive lessons, quizzes, and progress tracking.'

/** Sets the document title and meta description for the current page. */
export function Seo({ title, description = DEFAULT_DESCRIPTION }: SeoProps) {
  useEffect(() => {
    document.title = title === SITE ? `${SITE} — Learn smarter. Grow faster.` : `${title} | ${SITE}`
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description
  }, [title, description])

  return null
}
