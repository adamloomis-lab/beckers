import { useState, useEffect } from 'react'
import { Phone, MapPin, ArrowRight } from 'lucide-react'
import { useLocation } from 'wouter'
import { company } from '../data/site'

// Desktop-only floating action cluster, shown once the visitor scrolls past the
// hero. A glassy Directions pill beside a glowing, sheened plum "Call Us"
// primary that reads as premium. Hidden on the contact page.
export default function StickyActions() {
  const [show, setShow] = useState(false)
  const [location] = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero')
      const threshold =
        hero && hero.offsetHeight > 0
          ? hero.offsetTop + hero.offsetHeight - 80
          : window.innerHeight * 0.6
      setShow(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [location])

  // Hide on the contact page — the call/map details are already there.
  if (location === '/contact') return null

  return (
    <div
      className={`fixed bottom-8 right-8 z-40 hidden items-center gap-3 transition-all duration-300 lg:flex ${
        show
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-5 opacity-0'
      }`}
    >
      <a
        href={company.mapsDir}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full border border-line bg-card/90 px-5 py-4 font-sans text-[13px] uppercase tracking-[0.12em] font-semibold text-ink shadow-[0_12px_30px_-10px_rgba(52,26,46,0.4)] backdrop-blur-md transition-all duration-300 hover:bg-card"
      >
        <MapPin size={18} className="text-gold" aria-hidden="true" /> Directions
      </a>
      <a
        href={company.phoneHref}
        className="group relative flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-br from-brick to-brick-dark px-7 py-4 font-sans text-[13px] uppercase tracking-[0.12em] font-bold text-on-brick shadow-[0_16px_44px_-8px_rgba(74,36,64,0.6)] ring-1 ring-white/15 transition-all duration-300 hover:scale-[1.04]"
      >
        <span
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md group-hover:[animation:sheen_1s_ease]"
          aria-hidden="true"
        />
        <Phone size={18} aria-hidden="true" /> Call Us
        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </a>
    </div>
  )
}
