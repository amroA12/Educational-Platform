import { Link } from 'react-router-dom'
import { brand, footerColumns } from '@/data/site'
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon, YoutubeIcon } from '@/components/common/SocialIcons'
import { Logo } from '@/components/common/Logo'

const socials = [
  { label: 'X (Twitter)', icon: XIcon, href: 'https://x.com' },
  { label: 'LinkedIn', icon: LinkedinIcon, href: 'https://www.linkedin.com' },
  { label: 'YouTube', icon: YoutubeIcon, href: 'https://www.youtube.com' },
  { label: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com' },
  { label: 'GitHub', icon: GithubIcon, href: 'https://github.com/amroA12' },
]

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-fg-muted">
              {brand.tagline} Structured courses, interactive lessons, and progress tracking in one place.
            </p>
            <ul className="mt-6 flex gap-2">
              {socials.map(({ label, icon: Icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-xl border border-line text-fg-muted transition hover:border-primary hover:bg-primary-soft hover:text-primary-ink"
                  >
                    <Icon className="size-4.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-bold">{column.title}</h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="text-sm text-fg-muted transition hover:text-primary-ink">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-fg-subtle sm:flex-row sm:justify-between">
          <p>© {YEAR} Learnify. All rights reserved.</p>
          <p>A front-end demo project. All courses, people, and statistics are fictional.</p>
        </div>
      </div>
    </footer>
  )
}
