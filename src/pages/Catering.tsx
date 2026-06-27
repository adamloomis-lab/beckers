import { useState, useRef } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import {
  Phone, Users, Briefcase, Gift, Heart, PartyPopper, ArrowRight, Loader2, Send,
  CalendarHeart, Building2, PartyPopper as PartyIcon, Flower2, DoorOpen, MessageCircle,
  type LucideIcon,
} from 'lucide-react'
import { company, cateringTypes, cateringSteps, cateringHero } from '../data/site'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import { FloatField, IconCardGroup, SuccessCheck } from '../components/FluidField'

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')

const typeIcons = [Users, Briefcase, Gift, Heart]

// Event-type icon cards. Keep `value` identical to the old <select> so Netlify
// receives the same data.
const EVENT_TYPE_OPTIONS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: 'Family Gathering', label: 'Family gathering', icon: CalendarHeart },
  { value: 'Work Event', label: 'Work event', icon: Building2 },
  { value: 'Shower or Celebration', label: 'Shower / celebration', icon: PartyIcon },
  { value: 'Funeral or Memorial Meal', label: 'Memorial meal', icon: Flower2 },
  { value: 'Private Room Booking', label: 'Private room', icon: DoorOpen },
  { value: 'Other', label: 'Something else', icon: MessageCircle },
]

export default function Catering() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', eventDate: '', guests: '', eventType: 'Family Gathering', message: '',
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
        body: encode({ 'form-name': 'catering', ...form }),
      })
      if (!res.ok) throw new Error()
      setFirstName(form.name.trim().split(/\s+/)[0] || '')
      setSent(true)
      setForm({ name: '', email: '', phone: '', eventDate: '', guests: '', eventType: 'Family Gathering', message: '' })
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
        slides={cateringHero}
        eyebrow="Catering Across Ashtabula County"
        title="We'll Handle the Food."
        subtitle="You handle the toast. Catering for events big and small across Ashtabula County."
      >
        <Button href={company.phoneHref} variant="cream">
          <Phone size={15} /> Call {company.phone}
        </Button>
        <Button href="#quote" variant="ghost">
          Request a Quote
        </Button>
      </PageHero>

      {/* ---------- INTRO ---------- */}
      <section className="bg-paper py-20 md:py-24">
        <div className="container-x max-w-3xl text-center">
          <p className="text-body-lg text-ink-soft">
            Whether it&rsquo;s twelve people or two hundred, we cook it like we&rsquo;d cook it for our
            own family. Drop-off, buffet-style, or full setup. We work around your day, not the other
            way around.
          </p>
        </div>
      </section>

      {/* ---------- WHAT WE CATER ---------- */}
      <section className="bg-paper-2 py-24 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="What We Cater" title="Every Kind of Gathering" />
          <div className="reveal-group mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cateringTypes.map((t, i) => {
              const Icon = typeIcons[i]
              return (
                <div key={t.title} className="surface-card flex flex-col p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brick/8 text-brick">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-headline-sm text-ink">{t.title}</h3>
                  <p className="mt-2 text-body-md text-ink-soft">{t.blurb}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- PRIVATE ROOM ---------- */}
      <section className="bg-paper py-24 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal relative overflow-hidden rounded-xl">
            <img
              src="/images/catering-dessert-bars.jpg"
              alt="Dessert bars set out for a celebration in Becker's private room"
              className="h-[420px] w-full object-cover"
            />
            <span className="absolute bottom-4 left-4 rounded-md bg-paper/95 px-3 py-1.5 text-[12px] font-sans font-semibold uppercase tracking-[0.12em] text-ink">
              Private Room · Seats up to 40
            </span>
          </div>
          <div className="reveal">
            <SectionHeading
              align="left"
              eyebrow="Private Events"
              title="Private Room at Becker's"
              intro="Birthdays, showers, work lunches, and celebrations of every kind. Our private room makes any occasion feel a little more special, and we handle the food, the setup, and the cleanup."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#quote">Reserve the Room</Button>
              <Button href={company.phoneHref} variant="outline">
                <Phone size={15} /> {company.phone}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="bg-paper-2 py-24 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="How It Works" title="Easy From Start to Finish" />
          <div className="reveal-group mt-14 grid gap-6 md:grid-cols-3">
            {cateringSteps.map((s) => (
              <div key={s.step} className="surface-card relative p-8">
                <span className="font-display text-[52px] font-extrabold leading-none text-brick/15">
                  {s.step}
                </span>
                <h3 className="mt-2 font-display text-headline-sm text-ink">{s.title}</h3>
                <p className="mt-2 text-body-md text-ink-soft">{s.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CATERING FORM ---------- */}
      <section id="quote" className="scroll-mt-24 bg-paper py-24 md:py-28">
        <div className="container-x max-w-3xl">
          <SectionHeading
            eyebrow="Request Catering"
            title="Tell Us About Your Event"
            intro="Send us the details and we'll get back to you the same day, most days, to build your menu and lock in the date."
          />
          <div ref={formCardRef} className="surface-card mt-12 scroll-mt-28 p-8 md:p-12">
            {sent ? (
              <div
                className="flex flex-col items-center gap-4 rounded-lg border border-brick/30 bg-brick/5 px-6 py-12 text-center"
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
                  Your catering request is in. We&rsquo;ll reach out the same day, most days, to talk
                  menu, headcount, and timing. Need an answer fast? Give us a call.
                  We&rsquo;d love to feed your crew.
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
                name="catering"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={onSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="form-name" value="catering" />
                <p className="hidden">
                  <label>
                    Don’t fill this out: <input name="bot-field" />
                  </label>
                </p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FloatField idPrefix="cat" name="name" label="Your Name" value={form.name} onChange={onChange} required />
                  <FloatField idPrefix="cat" name="email" label="Email Address" type="email" value={form.email} onChange={onChange} required />
                  <FloatField idPrefix="cat" name="phone" label="Phone" type="tel" value={form.phone} onChange={onChange} />
                  <FloatField idPrefix="cat" name="eventDate" label="Event Date" value={form.eventDate} onChange={onChange} />
                  <FloatField idPrefix="cat" name="guests" label="Guest Count" value={form.guests} onChange={onChange} />
                </div>

                <IconCardGroup
                  legend="Type of event"
                  options={EVENT_TYPE_OPTIONS}
                  value={form.eventType}
                  onChange={(v) => setForm((p) => ({ ...p, eventType: v }))}
                  cols="grid-cols-2 sm:grid-cols-3"
                />

                <FloatField idPrefix="cat" name="message" label="Tell us about your event" value={form.message} onChange={onChange} textarea rows={5} />

                {error && (
                  <p className="text-body-md text-error">
                    Oops, something went wrong sending your request. Please try again, or call {company.phone}.
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
                    <><Send size={14} /> Send Catering Request <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="steel-panel py-20 text-center">
        <div className="container-x">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cream/10 text-gold-light">
            <PartyPopper size={26} />
          </span>
          <h2 className="mt-5 font-display text-headline-lg text-cream md:text-[40px]">
            Let&rsquo;s Talk About Your Event
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body-md text-cream-dim">
            Call us or send a message. We&rsquo;ll get back to you the same day, most days.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={company.phoneHref} variant="cream">
              <Phone size={15} /> Call {company.phone}
            </Button>
            <Button href="#quote" variant="ghost">
              Request a Quote
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
