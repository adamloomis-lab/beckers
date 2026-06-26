import { useState, useEffect } from 'react'
import { Phone, MapPin } from 'lucide-react'
import { company } from '../data/site'

// Sticky Call / Directions bar. Slides up once the visitor scrolls past the
// hero and tucks away near the footer so it never covers the legal links.
// Large, high-contrast tap targets for easy use on phones.
export default function StickyActions() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const nearBottom = window.innerHeight + y > document.body.scrollHeight - 200
      setShow(y > 460 && !nearBottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
    >
      <div className="container-x pb-3 sm:pb-4">
        <div className="mx-auto flex max-w-lg gap-3">
          <a
            href={company.phoneHref}
            className="flex flex-1 items-center justify-center gap-2.5 rounded-full bg-brick px-5 py-4 text-[17px] font-semibold text-on-brick shadow-[0_12px_30px_-8px_rgba(74,36,64,0.65)] transition-colors hover:bg-brick-dark"
          >
            <Phone size={20} /> Call Us
          </a>
          <a
            href={company.mapsDir}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2.5 rounded-full bg-gold px-5 py-4 text-[17px] font-semibold text-ink shadow-[0_12px_30px_-8px_rgba(0,0,0,0.4)] transition-colors hover:bg-gold-light"
          >
            <MapPin size={20} /> Directions
          </a>
        </div>
      </div>
    </div>
  )
}
