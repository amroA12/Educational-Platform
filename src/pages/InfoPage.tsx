import { useLocation } from 'react-router-dom'
import { ButtonLink } from '@/components/common/Button'
import { Seo } from '@/components/common/Seo'

interface InfoContent {
  title: string
  description: string
  sections: { heading: string; body: string }[]
}

const pages: Record<string, InfoContent> = {
  about: {
    title: 'About Learnify',
    description: 'Learnify is a modern learning platform built to help people build practical skills.',
    sections: [
      {
        heading: 'Our mission',
        body: 'Learnify helps people build practical skills through structured courses, interactive lessons, quizzes, and progress tracking. We believe great learning is clear, consistent, and rewarding.',
      },
      {
        heading: 'How it works',
        body: 'Pick a course, learn at your own pace, test yourself with quizzes, and earn certificates as you finish. Streaks and achievements keep you motivated along the way.',
      },
      {
        heading: 'About this project',
        body: 'Learnify is a front-end-only portfolio project built with React and TypeScript. All courses, people, reviews, and statistics are fictional demo data, and everything you do is stored locally in your browser.',
      },
    ],
  },
  help: {
    title: 'Help Center',
    description: 'Answers to common questions about using Learnify.',
    sections: [
      {
        heading: 'How do I enroll in a course?',
        body: 'Open any course and choose Enroll. Enrolled courses appear in My Courses, where you can continue right where you left off.',
      },
      {
        heading: 'Where is my progress saved?',
        body: 'Progress, favorites, quiz results, and settings are saved in your browser using local storage. Clearing your browser data resets them. You can also reset the demo from Settings.',
      },
      {
        heading: 'Can I use the demo account?',
        body: 'Yes. Choose Use Demo Account on the login page to explore a pre-filled student profile without entering credentials.',
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'How Learnify handles your data.',
    sections: [
      {
        heading: 'Your data stays in your browser',
        body: 'Learnify is a front-end demo. It has no server and no database, so nothing you enter is sent anywhere. All information is stored locally on your device.',
      },
      {
        heading: 'No tracking',
        body: 'This demo does not use analytics, advertising cookies, or third-party trackers.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    description: 'The terms for using the Learnify demo.',
    sections: [
      {
        heading: 'Demo use only',
        body: 'Learnify is a portfolio project. Courses, certificates, and instructors are fictional and have no real-world accreditation or value.',
      },
      {
        heading: 'No warranty',
        body: 'The demo is provided as is, without warranties of any kind.',
      },
    ],
  },
}

export default function InfoPage() {
  const slug = useLocation().pathname.replace('/', '')
  const page = pages[slug] ?? pages.about

  return (
    <div className="container-page max-w-3xl py-12 sm:py-16">
      <Seo title={page.title} description={page.description} />
      <h1 className="text-3xl font-extrabold sm:text-4xl">{page.title}</h1>
      <p className="mt-3 text-lg text-fg-muted">{page.description}</p>
      <div className="mt-10 space-y-8">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold">{section.heading}</h2>
            <p className="mt-2 leading-relaxed text-fg-muted">{section.body}</p>
          </section>
        ))}
      </div>
      <ButtonLink to="/courses" className="mt-12">
        Explore courses
      </ButtonLink>
    </div>
  )
}
