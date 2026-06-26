import { useState, useRef } from 'react'
import type { FormEvent } from 'react'
import { Phone, Users, Briefcase, Gift, Heart, PartyPopper, Check, ChevronDown } from 'lucide-react'
import { company, cateringTypes, cateringSteps, cateringHero } from '../data/site'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')

const typeIcons = [Users, Briefcase, Gift, Heart]

export default function Catering() {
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
        body: encode({ 'form-name': 'catering', ...data }),
      })
      if (!res.ok) throw new Error()
      setFirstName((data.name || '').trim().split(/\s+/)[0] || '')
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
    'w-full rounded border border-line bg-card px-4 py-3.5 text-body-md text-ink placeholder:text-ink-faint focus:border-brick focus-visible:outline-none focus:ring-1 focus:ring-brick/40'
  const label = 'block font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-soft mb-2'

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
            own family. Drop-off, buffet-style, or full setup — we work around your day, not the other
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
              intro="Birthdays, showers, work lunches, and celebrations of every kind. Our private room makes any occasion feel a little more special — and we handle the food, the setup, and the cleanup."
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
              <div className="flex flex-col items-center gap-4 rounded-lg border border-brick/40 bg-brick/5 px-6 py-12 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brick text-on-brick">
                  <Check size={28} />
                </span>
                <p className="font-display text-headline-md text-ink">
                  Thanks{firstName ? `, ${firstName}` : ''}!
                </p>
                <p className="max-w-md text-body-md text-ink-soft">
                  Your catering request is in. We&rsquo;ll reach out the same day, most days, to talk
                  menu, headcount, and timing. Need an answer fast? Give us a call at {company.phone} —
                  we&rsquo;d love to feed your crew.
                </p>
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
                  <div>
                    <label className={label} htmlFor="cat-name">Your Name</label>
                    <input id="cat-name" className={field} type="text" name="name" placeholder="Jane Doe" required />
                  </div>
                  <div>
                    <label className={label} htmlFor="cat-email">Email Address</label>
                    <input id="cat-email" className={field} type="email" name="email" placeholder="you@example.com" required />
                  </div>
                  <div>
                    <label className={label} htmlFor="cat-phone">Phone</label>
                    <input id="cat-phone" className={field} type="tel" name="phone" placeholder="(440) 000-0000" />
                  </div>
                  <div>
                    <label className={label} htmlFor="cat-date">Event Date</label>
                    <input id="cat-date" className={field} type="text" name="eventDate" placeholder="e.g. Sat, June 14" />
                  </div>
                  <div>
                    <label className={label} htmlFor="cat-guests">Guest Count</label>
                    <input id="cat-guests" className={field} type="text" name="guests" placeholder="Approx. how many?" />
                  </div>
                  <div>
                    <label className={label} htmlFor="cat-type">Type of Event</label>
                    <div className="relative">
                      <select id="cat-type" name="eventType" defaultValue="Family Gathering" className={`${field} appearance-none pr-11`}>
                        <option>Family Gathering</option>
                        <option>Work Event</option>
                        <option>Shower or Celebration</option>
                        <option>Funeral or Memorial Meal</option>
                        <option>Private Room Booking</option>
                        <option>Other</option>
                      </select>
                      <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className={label} htmlFor="cat-message">Tell us about your event</label>
                  <textarea id="cat-message" className={field} name="message" rows={5} placeholder="What are you thinking? Menu ideas, drop-off vs. full setup, location…" />
                </div>
                {error && (
                  <p className="text-body-md text-error">
                    Oops, something went wrong sending your request. Please try again, or call {company.phone}.
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full rounded bg-brick px-8 py-4 font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-on-brick transition-colors hover:bg-brick-dark"
                >
                  Send Catering Request
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
