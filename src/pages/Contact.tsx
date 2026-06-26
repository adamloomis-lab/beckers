import { useState, useRef } from 'react'
import type { FormEvent } from 'react'
import { MapPin, Phone, Clock, Facebook, Star, Check, ChevronDown } from 'lucide-react'
import { company, contactHero } from '../data/site'
import HoursList from '../components/HoursList'
import PageHero from '../components/PageHero'

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [firstName, setFirstName] = useState('')
  const formCardRef = useRef<HTMLDivElement>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form) as never) as Record<string, string>
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...data }),
      })
      if (!res.ok) throw new Error()
      setFirstName((data.firstName || '').trim() || '')
      setSent(true)
      form.reset()
      requestAnimationFrame(() =>
        formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      )
    } catch {
      setError(true)
    }
  }

  const field =
    'w-full rounded border border-line bg-card px-4 py-3 text-body-md text-ink placeholder:text-ink-faint focus:border-brick focus-visible:outline-none focus:ring-1 focus:ring-brick/40'
  const label = 'block text-[12px] font-sans font-semibold uppercase tracking-[0.12em] text-ink-soft mb-2'

  return (
    <>
      <PageHero
        slides={contactHero}
        eyebrow="We're Easy to Reach"
        title="Let's Talk."
        subtitle="Reservations, catering questions, private room bookings, or just saying hi — we're always glad to hear from you."
      />

      {/* ---------- DETAILS + FORM ---------- */}
      <section className="bg-paper py-24 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          {/* Find Us */}
          <div className="reveal">
            <h2 className="font-display text-headline-lg text-ink">Find Us</h2>
            <span className="brick-rule mt-5 block" />

            <ul className="mt-8 space-y-6 text-body-md">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  <span className="block text-[12px] font-sans font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    Our Location
                  </span>
                  <a href={company.mapsDir} target="_blank" rel="noopener noreferrer" className="mt-1 block text-ink-soft hover:text-brick">
                    {company.address.street}
                    <br />
                    {company.address.city}, {company.address.state} {company.address.zip}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-4">
                <Phone size={20} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  <span className="block text-[12px] font-sans font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    Call Us
                  </span>
                  <a href={company.phoneHref} className="mt-1 block text-ink-soft hover:text-brick">
                    {company.phone}
                  </a>
                </span>
              </li>
            </ul>

            <div className="mt-9 rounded-lg border border-line bg-card p-7">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-gold" />
                <h3 className="font-display text-headline-sm text-ink">Hours of Operation</h3>
              </div>
              <HoursList className="mt-4 -mx-2" />
            </div>

            <div className="mt-9">
              <h3 className="text-[12px] font-sans font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Connect With Us
              </h3>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={company.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Becker's on Facebook"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-brick text-cream transition-colors hover:bg-brick-dark"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={company.social.yelp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Becker's on Yelp"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-gold text-ink transition-colors hover:bg-gold-light"
                >
                  <Star size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Send a Message */}
          <div className="reveal">
            <div ref={formCardRef} className="surface-card scroll-mt-28 p-8 md:p-10">
              <h2 className="font-display text-headline-md text-ink">Send a Message</h2>

              {sent ? (
                <div className="mt-8 flex flex-col items-center gap-4 rounded-lg border border-brick/40 bg-brick/5 px-6 py-12 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brick text-on-brick">
                    <Check size={28} />
                  </span>
                  <p className="font-display text-headline-md text-ink">
                    Thanks for reaching out{firstName ? `, ${firstName}` : ''}!
                  </p>
                  <p className="text-body-md text-ink-soft">
                    Your message just landed in our inbox here at Becker&rsquo;s — and a real person
                    will read it, not a robot. We&rsquo;ll get back to you the same day, most days.
                    Can&rsquo;t wait? Give us a ring at {company.phone}; there&rsquo;s almost always
                    someone by the phone. See you soon!
                  </p>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={onSubmit}
                  className="mt-7 space-y-5"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don’t fill this out: <input name="bot-field" />
                    </label>
                  </p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={label} htmlFor="ct-first">First Name</label>
                      <input id="ct-first" className={field} type="text" name="firstName" required />
                    </div>
                    <div>
                      <label className={label} htmlFor="ct-last">Last Name</label>
                      <input id="ct-last" className={field} type="text" name="lastName" />
                    </div>
                  </div>
                  <div>
                    <label className={label} htmlFor="ct-email">Email Address</label>
                    <input id="ct-email" className={field} type="email" name="email" required />
                  </div>
                  <div>
                    <label className={label} htmlFor="ct-phone">Phone</label>
                    <input id="ct-phone" className={field} type="tel" name="phone" />
                  </div>
                  <div>
                    <label className={label} htmlFor="ct-subject">What's This About?</label>
                    <div className="relative">
                      <select id="ct-subject" name="subject" defaultValue="General" className={`${field} appearance-none pr-11`}>
                        <option>General</option>
                        <option>Catering</option>
                        <option>Private Room</option>
                        <option>Employment</option>
                        <option>Other</option>
                      </select>
                      <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint" />
                    </div>
                  </div>
                  <div>
                    <label className={label} htmlFor="ct-message">Message</label>
                    <textarea id="ct-message" className={field} name="message" rows={5} required />
                  </div>
                  {error && (
                    <p className="text-body-md text-error">
                      Oops, there was an error sending your message. Please try again, or call {company.phone}.
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full rounded bg-brick px-8 py-4 font-sans text-[13px] font-sans font-semibold uppercase tracking-[0.14em] text-on-brick transition-colors hover:bg-brick-dark"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- MAP ---------- */}
      <section className="border-t border-line">
        <iframe
          title="Becker's Restaurant location, 1601 West Prospect Road, Ashtabula, OH"
          src={company.mapsEmbed}
          className="h-[460px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <p className="font-sans bg-steel py-3 text-center text-label-sm uppercase tracking-[0.16em] text-cream-faint">
          Serving Ashtabula &amp; Ashtabula County, Ohio
        </p>
      </section>
    </>
  )
}
