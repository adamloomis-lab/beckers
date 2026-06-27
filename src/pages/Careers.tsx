import { useState, useRef } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import {
  Phone, Clock, Utensils, TrendingUp, PartyPopper, ArrowRight, Loader2, Send,
  UtensilsCrossed, ChefHat, Droplets, ConciergeBell, HelpCircle,
  type LucideIcon,
} from 'lucide-react'
import { company, openRoles, perks, careersHero } from '../data/site'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import { FloatField, IconCardGroup, SuccessCheck } from '../components/FluidField'

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')

const perkIcons = [Clock, Utensils, PartyPopper, TrendingUp]

// Position icon cards. Keep `value` identical to the old <select> so Netlify
// receives the same data.
const POSITION_OPTIONS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: 'Server', label: 'Server', icon: UtensilsCrossed },
  { value: 'Line Cook', label: 'Line cook', icon: ChefHat },
  { value: 'Dishwasher / Prep', label: 'Dish / prep', icon: Droplets },
  { value: 'Host', label: 'Host', icon: ConciergeBell },
  { value: 'Any / Not Sure', label: 'Any / not sure', icon: HelpCircle },
]

export default function Careers() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', position: 'Server', message: '',
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
        body: encode({ 'form-name': 'application', ...form }),
      })
      if (!res.ok) throw new Error()
      setFirstName(form.name.trim().split(/\s+/)[0] || '')
      setSent(true)
      setForm({ name: '', email: '', phone: '', position: 'Server', message: '' })
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
                  Thanks for wanting to join the Becker&rsquo;s crew. We got your application and
                  we&rsquo;ll be in touch real soon. Honest work, good tips, and a team that has your
                  back — we can&rsquo;t wait to meet you. Want to say hi sooner? Stop in and ask for a
                  manager, or give us a call.
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
                  <FloatField idPrefix="ap" name="name" label="Full Name" value={form.name} onChange={onChange} required />
                  <FloatField idPrefix="ap" name="email" label="Email Address" type="email" value={form.email} onChange={onChange} required />
                </div>
                <FloatField idPrefix="ap" name="phone" label="Phone Number" type="tel" value={form.phone} onChange={onChange} />

                <IconCardGroup
                  legend="Interested position"
                  options={POSITION_OPTIONS}
                  value={form.position}
                  onChange={(v) => setForm((p) => ({ ...p, position: v }))}
                  cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                />

                <FloatField idPrefix="ap" name="message" label="Tell us why you'd be a great fit" value={form.message} onChange={onChange} textarea rows={5} />

                {error && (
                  <p className="text-body-md text-error">
                    Oops, something went wrong sending your application. Please try again, or call {company.phone}.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded bg-brick px-8 py-4 font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-on-brick transition-colors hover:bg-brick-dark disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-cream/30 blur-md group-hover:[animation:sheen_0.9s_ease]" />
                  {sending ? (
                    <><Loader2 size={16} className="animate-spin" /> Submitting</>
                  ) : (
                    <><Send size={14} /> Submit Application <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
