import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Menu, Phone } from 'lucide-react'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import { company } from '../data/site'
import { useScrolled } from '../hooks/useScrolled'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Catering', href: '/catering' },
  { label: 'Join Our Team', href: '/careers' },
  { label: 'Get in Touch', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [location] = useLocation()
  const scrolled = useScrolled(40)

  // Solid cream bar once scrolled (or menu open); translucent over the hero.
  const solid = scrolled || open

  const linkBase = 'font-sans text-[17px] font-medium tracking-wide transition-colors'
  const linkColor = solid ? 'text-ink-soft hover:text-brick' : 'text-cream hover:text-cream/70'

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        solid
          ? 'border-b border-line bg-paper/95 backdrop-blur-md'
          : 'border-b border-transparent bg-gradient-to-b from-black/45 to-transparent'
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        <Logo onDark={!solid} />

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => {
            const active = l.href === location
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`${linkBase} ${active ? 'text-brick' : linkColor} ${
                  active ? 'font-semibold' : ''
                }`}
              >
                {l.label}
              </Link>
            )
          })}
          <a
            href={company.phoneHref}
            className="inline-flex items-center gap-2 rounded bg-brick px-5 py-2.5 font-sans text-[15px] font-semibold text-on-brick transition-colors hover:bg-brick-dark"
          >
            <Phone size={16} /> {company.phone}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className={solid ? 'text-ink lg:hidden' : 'text-cream lg:hidden'}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu size={28} />
        </button>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} links={links} />
    </header>
  )
}
