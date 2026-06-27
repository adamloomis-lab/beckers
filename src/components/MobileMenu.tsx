import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { X, Phone, MapPin, Clock, ArrowRight, Facebook, Utensils } from 'lucide-react'
import Logo from './Logo'
import { company, hoursCompact } from '../data/site'

export interface MobileMenuProps {
  readonly open: boolean
  readonly onClose: () => void
  readonly links: ReadonlyArray<{ label: string; href: string }>
}

// Full-screen, high-trust mobile navigation for Becker's. A backdrop-blurred
// deep-plum panel slides in from the right with a warm gold glow, staggered
// uppercase link entrance, and prominent contact CTAs. Body scroll locks while
// open. Honors prefers-reduced-motion via the global motion reset in index.css.
export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const id = requestAnimationFrame(() => setShown(true))
      return () => {
        cancelAnimationFrame(id)
        document.body.style.overflow = ''
      }
    }
    setShown(false)
    document.body.style.overflow = ''
  }, [open])

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="lg:hidden fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Menu">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`absolute inset-0 bg-ink/55 backdrop-blur-sm transition-opacity duration-300 ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <div
        className={`steel-panel relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto text-cream shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          shown ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ boxShadow: '-24px 0 60px -20px rgba(207, 154, 60, 0.28), -8px 0 40px rgba(0,0,0,0.5)' }}
      >
        <div className="relative flex min-h-full flex-col px-7 pb-10 pt-6">
          <div className="flex items-center justify-between">
            <Logo onDark className="h-10" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10"
            >
              <X size={24} />
            </button>
          </div>

          {/* Trust badge with pulsing gold dot */}
          <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-3 py-1.5 font-sans text-label-sm uppercase tracking-[0.2em] text-gold-light">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            Homestyle Cooking Since {company.established}
          </span>

          {/* Nav links — large uppercase rows, staggered, with arrow nudge */}
          <nav className="mt-6 flex flex-col">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={onClose}
                className={`group flex items-center justify-between border-b border-cream/10 py-4 font-display text-headline-md uppercase text-cream/90 transition-all duration-500 hover:text-gold-light ${
                  shown ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                }`}
                style={{ transitionDelay: `${120 + i * 70}ms` }}
              >
                {l.label}
                <ArrowRight
                  size={20}
                  className="text-cream/30 transition-all group-hover:translate-x-1 group-hover:text-gold-light"
                />
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div
            className={`mt-8 flex flex-col gap-3 transition-all duration-500 ${
              shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: `${120 + links.length * 70 + 60}ms` }}
          >
            <a
              href={company.phoneHref}
              className="flex items-center justify-center gap-2 rounded bg-brick px-6 py-4 font-sans text-label-lg uppercase tracking-widest text-on-brick shadow-lg transition-colors hover:bg-brick-light"
            >
              <Phone size={18} /> Call {company.phone}
            </a>
            <Link
              href="/menu"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded border-2 border-gold/70 px-6 py-4 font-sans text-label-lg uppercase tracking-widest text-gold-light transition-colors hover:bg-gold hover:text-ink"
            >
              <Utensils size={18} /> See the Menu
            </Link>
          </div>

          {/* Contact footer with gold-accent icons */}
          <div className="mt-auto space-y-3 pt-10 font-body text-body-md text-cream-dim">
            <a
              href={company.mapsDir}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 transition-colors hover:text-cream"
            >
              <MapPin size={18} className="mt-1 shrink-0 text-gold" /> {company.addressOneLine}
            </a>
            <p className="flex items-start gap-3">
              <Clock size={18} className="mt-1 shrink-0 text-gold" />
              <span>
                {hoursCompact.map((h) => (
                  <span key={h.day} className="block">
                    {h.day}: {h.time}
                  </span>
                ))}
              </span>
            </p>
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition-colors hover:text-cream"
            >
              <Facebook size={18} className="shrink-0 text-gold" /> {company.shortName} on Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
