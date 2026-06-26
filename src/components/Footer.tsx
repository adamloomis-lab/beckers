import { Link } from 'wouter'
import { Phone, MapPin, Facebook, Star } from 'lucide-react'
import Logo from './Logo'
import { company, hoursCompact } from '../data/site'

const explore = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Catering', href: '/catering' },
  { label: 'Join Our Team', href: '/careers' },
  { label: 'Get in Touch', href: '/contact' },
]

const policies = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-paper-2 text-ink-soft">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-5 max-w-xs text-body-md">
            Homestyle cooking in the heart of Ashtabula since {company.established}.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brick text-cream transition-colors hover:bg-brick-dark"
              aria-label="Becker's Restaurant on Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href={company.social.yelp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gold text-ink transition-colors hover:bg-gold-light"
              aria-label="Becker's Restaurant on Yelp"
            >
              <Star size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-headline-sm text-ink">Visit</h3>
          <ul className="mt-5 space-y-4 text-body-md">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
              <a href={company.mapsDir} target="_blank" rel="noopener noreferrer" className="hover:text-brick">
                {company.address.street}
                <br />
                {company.address.city}, {company.address.state} {company.address.zip}
              </a>
            </li>
            <li>
              <a href={company.phoneHref} className="flex items-start gap-3 hover:text-brick">
                <Phone size={18} className="mt-0.5 shrink-0 text-gold" />
                <span>{company.phone}</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-headline-sm text-ink">Hours</h3>
          <ul className="mt-5 space-y-3 text-body-md">
            {hoursCompact.map((h) => (
              <li key={h.day} className="flex items-baseline justify-between gap-3">
                <span className="text-ink-soft">{h.day}</span>
                <span className="whitespace-nowrap text-ink">{h.time}</span>
              </li>
            ))}
          </ul>
          <p className="font-sans mt-4 text-[12px] uppercase tracking-[0.16em] text-ink-faint">
            Breakfast · Lunch · Dinner
          </p>
        </div>

        <div>
          <h3 className="font-display text-headline-sm text-ink">Explore</h3>
          <ul className="mt-5 space-y-3 text-body-md">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-brick">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="font-sans container-x flex flex-col items-center justify-between gap-4 py-6 text-label-sm uppercase tracking-[0.16em] text-ink-faint sm:flex-row">
          <span className="order-2 sm:order-1">
            © {year} {company.name}. All rights reserved.
          </span>
          <div className="order-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:order-2">
            {policies.map((p) => (
              <Link key={p.href} href={p.href} className="transition-colors hover:text-brick">
                {p.label}
              </Link>
            ))}
          </div>
          <span className="order-3 normal-case tracking-normal">
            Website by{' '}
            <a
              href="https://adamloomis.online"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink-soft transition-colors hover:text-brick"
            >
              AdamLoomis.online
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
