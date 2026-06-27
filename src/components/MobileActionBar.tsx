import { Phone, MapPin, UtensilsCrossed } from 'lucide-react'
import { Link } from 'wouter'
import { company } from '../data/site'

// High-end floating action bar: an elevated, blurred plum capsule that stands
// off the edge rather than sitting flat against it. Glassy Call / Directions
// buttons flank a glowing gold-ringed Menu primary. Mobile only (hidden lg+).
const c = company as Record<string, any>
const directions =
  c.mapsDir ||
  'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent(c.addressOneLine || (c.address ? c.address.street + ', ' + c.address.city : c.name || ''))
const phone = c.phoneHref || 'tel:' + String(c.phone || '').replace(/[^\d+]/g, '')

export default function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 px-3 lg:hidden"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <div className="flex gap-2 rounded-2xl border border-white/10 bg-brick/90 p-2 shadow-[0_14px_40px_rgba(52,26,46,0.55)] backdrop-blur-xl">
        <a
          href={phone}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 py-3.5 font-sans text-[11px] uppercase tracking-[0.14em] font-semibold text-cream transition-all active:scale-95"
        >
          <Phone size={18} className="text-gold-light" aria-hidden="true" /> Call
        </a>
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 py-3.5 font-sans text-[11px] uppercase tracking-[0.14em] font-semibold text-cream transition-all active:scale-95"
        >
          <MapPin size={18} className="text-gold-light" aria-hidden="true" /> Directions
        </a>
        <Link
          href="/menu"
          className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gold py-3.5 font-sans text-[11px] uppercase tracking-[0.14em] font-bold text-ink ring-1 ring-white/20 animate-glow-pulse transition-all active:scale-95"
        >
          <span
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/40 blur-md group-hover:[animation:sheen_0.9s_ease]"
            aria-hidden="true"
          />
          <UtensilsCrossed size={18} aria-hidden="true" /> Menu
        </Link>
      </div>
    </nav>
  )
}
