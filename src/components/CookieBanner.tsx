import { useEffect, useState } from 'react'
import { Link } from 'wouter'

const STORAGE_KEY = 'cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return
    const timer = setTimeout(() => setVisible(true), 700)
    return () => clearTimeout(timer)
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-2xl rounded-lg border border-line bg-paper-2 px-5 py-4 shadow-lg"
    >
      <p className="text-body-md text-ink-soft">
        This site uses cookies to keep things running smoothly. We never sell your data.{' '}
        <Link href="/privacy" className="underline hover:text-brick">
          Privacy Policy
        </Link>
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          onClick={accept}
          className="rounded bg-brick px-5 py-2 text-label-sm font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-brick-dark"
        >
          Sounds Good
        </button>
        <button
          onClick={decline}
          className="rounded border border-line px-5 py-2 text-label-sm font-semibold uppercase tracking-wide text-ink-soft transition-colors hover:border-brick hover:text-brick"
        >
          No Thanks
        </button>
      </div>
    </div>
  )
}
