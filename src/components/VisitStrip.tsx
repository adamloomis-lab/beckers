import { useEffect, useState } from 'react'
import { MapPin, Phone, Clock } from 'lucide-react'
import { company, hours } from '../data/site'

const labelCls = 'block font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-light'

// Standout band that sits directly under the hero: address, phone, and hours
// with the current day resolved client-side and highlighted. Today is resolved
// after mount so the prerendered HTML carries no day-specific text (no
// hydration mismatch) and always reflects the visitor's real day.
export default function VisitStrip() {
  const [dow, setDow] = useState<number | null>(null)
  useEffect(() => setDow(new Date().getDay()), [])
  const today = dow == null ? null : hours.find((h) => h.dow === dow)

  return (
    <section className="steel-panel relative z-20 border-b border-cream/10">
      <div className="container-x grid divide-y divide-cream/12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {/* Visit */}
        <a
          href={company.mapsDir}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 px-2 py-7 transition-colors sm:justify-center sm:px-6"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream/10 text-gold-light transition-colors group-hover:bg-cream/15">
            <MapPin size={22} />
          </span>
          <span>
            <span className={labelCls}>Visit Us</span>
            <span className="mt-1 block font-display text-[19px] font-semibold leading-tight text-cream group-hover:underline">
              {company.address.street}
            </span>
            <span className="block text-[14px] text-cream-dim">
              {company.address.city}, {company.address.state} {company.address.zip}
            </span>
          </span>
        </a>

        {/* Call */}
        <a
          href={company.phoneHref}
          className="group flex items-center gap-4 px-2 py-7 transition-colors sm:justify-center sm:px-6"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream/10 text-gold-light transition-colors group-hover:bg-cream/15">
            <Phone size={22} />
          </span>
          <span>
            <span className={labelCls}>Call Ahead</span>
            <span className="mt-1 block font-display text-[23px] font-bold leading-tight text-cream group-hover:underline">
              {company.phone}
            </span>
            <span className="block text-[14px] text-cream-dim">Reservations &amp; carry-out</span>
          </span>
        </a>

        {/* Hours — today highlighted */}
        <div className="flex items-center gap-4 px-2 py-7 sm:justify-center sm:px-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream/10 text-gold-light">
            <Clock size={22} />
          </span>
          <span>
            <span className={labelCls}>{today ? `Open Today · ${today.day}` : 'Open Seven Days a Week'}</span>
            <span className="mt-1 block font-display text-[19px] font-semibold leading-tight text-cream">
              {today ? today.time : '7:00 am – 9:00 pm'}
            </span>
            <span className="block text-[14px] text-cream-dim">Mon–Sat 7a–9p · Sun 7a–4p</span>
          </span>
        </div>
      </div>
    </section>
  )
}
