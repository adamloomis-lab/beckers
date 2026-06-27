import { useState, useRef } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import {
  MapPin, Phone, Clock, Facebook, Star, ArrowRight, Loader2, Send,
  HelpCircle, UtensilsCrossed, DoorOpen, MessageCircle, Briefcase, ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'wouter'
import { company, contactHero } from '../data/site'
import HoursList from '../components/HoursList'
import PageHero from '../components/PageHero'
import { FloatField, SuccessCheck } from '../components/FluidField'

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')

// Subject icon cards. Keep `value` identical to the old <select> so Netlify
// receives the same data.
const SUBJECT_OPTIONS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: 'General', label: 'General', icon: HelpCircle },
  { value: 'Catering', label: 'Catering', icon: UtensilsCrossed },
  { value: 'Private Room', label: 'Private room', icon: DoorOpen },
  { value: 'Other', label: 'Something else', icon: MessageCircle },
]

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', subject: 'General', message: '',
  })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [sending, setSending] = useState(false)
  const [firstName, setFirstName] = useState('')
  const formCardRef = useRef<HTMLDivElement>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)
    setSending(true)
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...form }),
      })
      if (!res.ok) throw new Error()
      setFirstName(form.firstName.trim() || '')
      setSent(true)
      setForm({ firstName: '', lastName: '', email: '', phone: '', subject: 'General', message: '' })
      requestAnimationFrame(() =>
        formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      )
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <PageHero
        slides={contactHero}
        eyebrow="We're Easy to Reach"
        title="Let's Talk."
        subtitle="Reservations, catering questions, private room bookings, or just saying hi. We're always glad to hear from you."
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
                <div
                  className="mt-8 flex flex-col items-center gap-4 rounded-lg border border-brick/30 bg-brick/5 px-6 py-12 text-center"
                  style={{ animation: 'rise 0.7s cubic-bezier(0.16,1,0.3,1) both' }}
                >
                  <span
                    className="flex h-20 w-20 items-center justify-center"
                    style={{ animation: 'pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}
                  >
                    <SuccessCheck />
                  </span>
                  <p className="font-display text-headline-md text-ink">
                    {firstName ? `Thank You, ${firstName}!` : 'Thank You!'}
                  </p>
                  <p className="max-w-md text-body-md text-ink-soft">
                    Your message just landed in our inbox here at Becker&rsquo;s, and a real person
                    will read it, not a robot. We&rsquo;ll get back to you the same day, most days.
                    Can&rsquo;t wait? Give us a ring; there&rsquo;s almost always someone by the phone.
                  </p>
                  <a
                    href={company.phoneHref}
                    className="group relative mt-2 inline-flex items-center gap-2 overflow-hidden rounded bg-brick px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-on-brick transition-colors hover:bg-brick-dark"
                  >
                    <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-cream/30 blur-md group-hover:[animation:sheen_0.9s_ease]" />
                    <Phone size={15} /> {company.phone}
                  </a>
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
                    <FloatField idPrefix="ct" name="firstName" label="First Name" value={form.firstName} onChange={onChange} required />
                    <FloatField idPrefix="ct" name="lastName" label="Last Name" value={form.lastName} onChange={onChange} />
                  </div>
                  <FloatField idPrefix="ct" name="email" label="Email Address" type="email" value={form.email} onChange={onChange} required />
                  <FloatField idPrefix="ct" name="phone" label="Phone" type="tel" value={form.phone} onChange={onChange} />

                  {/* Subject as single-select icon cards + a "Join our team" cross-link */}
                  <fieldset>
                    <legend className="mb-3 block font-sans text-ink-soft text-[12px] font-semibold uppercase tracking-[0.12em]">
                      What's this about?
                    </legend>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {SUBJECT_OPTIONS.map((o) => {
                        const active = form.subject === o.value
                        const Icon = o.icon
                        return (
                          <button
                            key={o.value}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setForm((p) => ({ ...p, subject: active ? '' : o.value }))}
                            className={`flex flex-col items-start gap-2 rounded-lg border px-3.5 py-3.5 text-left font-sans text-sm transition-all duration-200 active:scale-[0.98] ${
                              active
                                ? 'border-brick bg-brick text-on-brick shadow-[0_10px_24px_-12px_rgba(74,36,64,0.7)]'
                                : 'border-line bg-paper text-ink hover:border-brick hover:bg-card'
                            }`}
                          >
                            <Icon size={22} className={active ? 'text-on-brick' : 'text-brick'} strokeWidth={1.75} />
                            <span className="font-semibold leading-tight">{o.label}</span>
                          </button>
                        )
                      })}
                      {/* Careers card: routes to the job application form instead of setting a subject */}
                      <Link
                        href="/careers"
                        aria-label="Join our team, opens the job application page"
                        className="group flex flex-col items-start gap-2 rounded-lg border border-dashed border-brick/40 bg-paper px-3.5 py-3.5 text-left font-sans text-sm text-ink transition-all duration-200 hover:border-solid hover:border-brick hover:bg-card active:scale-[0.98]"
                      >
                        <span className="flex w-full items-center justify-between">
                          <Briefcase size={22} className="text-brick" strokeWidth={1.75} />
                          <ArrowUpRight size={16} className="text-ink-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brick" />
                        </span>
                        <span className="font-semibold leading-tight">Join our team</span>
                      </Link>
                    </div>
                  </fieldset>

                  <FloatField idPrefix="ct" name="message" label="Message" value={form.message} onChange={onChange} required textarea rows={5} />

                  {error && (
                    <p className="text-body-md text-error">
                      Oops, there was an error sending your message. Please try again, or call {company.phone}.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded bg-brick px-8 py-4 font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-on-brick transition-colors hover:bg-brick-dark disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-cream/30 blur-md group-hover:[animation:sheen_0.9s_ease]" />
                    {sending ? (
                      <><Loader2 size={16} className="animate-spin" /> Sending</>
                    ) : (
                      <><Send size={14} /> Send Message <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></>
                    )}
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
