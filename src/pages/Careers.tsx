import { useState, useRef } from 'react'
import type { FormEvent } from 'react'
import { Phone, Clock, Utensils, TrendingUp, PartyPopper, Check, ChevronDown } from 'lucide-react'
import { company, openRoles, perks, careersHero } from '../data/site'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')

const perkIcons = [Clock, Utensils, PartyPopper, TrendingUp]

export default function Careers() {
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
        body: encode({ 'form-name': 'application', ...data }),
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
  const label = 'block text-[12px] font-sans font-semibold uppercase tracking-[0.12em] text-ink-soft mb-2'

  return (
    <>
      <PageHero
        slides={careersHero}
        eyebrow="Now Hiring in Ashtabula"
        title="Come Work With Us."
        subtitle="We're hiring good people who like good food and better coworkers."
      >
        <Button href="#apply" variant="cream">
          Apply Now
        </Button>
        <Button href={company.phoneHref} variant="ghost">
          <Phone size={15} /> {company.phone}
        </Button>
      </PageHero>

      {/* ---------- INTRO ---------- */}
      <section className="bg-paper py-20 md:py-24">
        <div className="container-x max-w-3xl text-center">
          <p className="text-body-lg text-ink-soft">
            Becker&rsquo;s isn&rsquo;t just a job. It&rsquo;s a crew that shows up for each other, tips
            that reflect the work, and a kitchen that runs on pride. If you&rsquo;re dependable,
            friendly, and ready to put in honest work, we want to meet you.
          </p>
        </div>
      </section>

      {/* ---------- OPEN ROLES ---------- */}
      <section className="bg-paper-2 py-24 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Open Roles" title="Where You Might Fit" />
          <div className="reveal-group mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {openRoles.map((r) => (
              <div key={r.title} className="surface-card flex flex-col p-7">
                <h3 className="font-display text-headline-sm text-ink">{r.title}</h3>
                <p className="mt-2 text-body-md text-ink-soft">{r.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHAT YOU GET ---------- */}
      <section className="bg-paper py-24 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="What You Get" title="More Than a Paycheck" />
          <div className="reveal-group mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p, i) => {
              const Icon = perkIcons[i]
              return (
                <div key={p} className="flex items-start gap-4 rounded-lg border border-line bg-card p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold">
                    <Icon size={20} />
                  </span>
                  <p className="text-body-md text-ink">{p}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- APPLY FORM ---------- */}
      <section id="apply" className="scroll-mt-24 bg-paper-2 py-24 md:py-28">
        <div className="container-x max-w-3xl">
          <div ref={formCardRef} className="surface-card scroll-mt-28 p-8 md:p-12">
            <div className="text-center">
              <h2 className="font-display text-headline-lg text-ink">Apply to Join Us</h2>
              <p className="mt-3 text-body-md text-ink-soft">
                Tell us a little about yourself and we&rsquo;ll be in touch soon — or stop in and ask
                for a manager.
              </p>
            </div>

            {sent ? (
              <div className="mt-8 flex flex-col items-center gap-4 rounded-lg border border-brick/40 bg-brick/5 px-6 py-12 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brick text-on-brick">
                  <Check size={28} />
                </span>
                <p className="font-display text-headline-md text-ink">
                  Welcome to the family{firstName ? `, ${firstName}` : ''}!
                </p>
                <p className="max-w-md text-body-md text-ink-soft">
                  Thanks for wanting to join the Becker&rsquo;s crew. We got your application and
                  we&rsquo;ll be in touch real soon. Honest work, good tips, and a team that has your
                  back — we can&rsquo;t wait to meet you. Want to say hi sooner? Stop in and ask for a
                  manager, or call {company.phone}.
                </p>
              </div>
            ) : (
              <form
                name="application"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={onSubmit}
                className="mt-8 space-y-5"
              >
                <input type="hidden" name="form-name" value="application" />
                <p className="hidden">
                  <label>
                    Don’t fill this out: <input name="bot-field" />
                  </label>
                </p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={label} htmlFor="ap-name">Full Name</label>
                    <input id="ap-name" className={field} type="text" name="name" placeholder="Jane Doe" required />
                  </div>
                  <div>
                    <label className={label} htmlFor="ap-email">Email Address</label>
                    <input id="ap-email" className={field} type="email" name="email" placeholder="you@example.com" required />
                  </div>
                  <div>
                    <label className={label} htmlFor="ap-phone">Phone Number</label>
                    <input id="ap-phone" className={field} type="tel" name="phone" placeholder="(440) 000-0000" />
                  </div>
                  <div>
                    <label className={label} htmlFor="ap-position">Interested Position</label>
                    <div className="relative">
                      <select id="ap-position" name="position" defaultValue="Server" className={`${field} appearance-none pr-11`}>
                        <option>Server</option>
                        <option>Line Cook</option>
                        <option>Dishwasher / Prep</option>
                        <option>Host</option>
                        <option>Any / Not Sure</option>
                      </select>
                      <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className={label} htmlFor="ap-message">Tell us why you'd be a great fit</label>
                  <textarea id="ap-message" className={field} name="message" rows={5} placeholder="I love homestyle cooking and making people smile…" />
                </div>
                {error && (
                  <p className="text-body-md text-error">
                    Oops, something went wrong sending your application. Please try again, or call {company.phone}.
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full rounded bg-brick px-8 py-4 font-sans text-[13px] font-sans font-semibold uppercase tracking-[0.14em] text-on-brick transition-colors hover:bg-brick-dark"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
