import type { ChangeEvent } from 'react'
import type { LucideIcon } from 'lucide-react'

/* Shared "fluid" form controls for Becker's, tuned for the white card surface
   over the blush-cream page: floating-label fields (plum underline + focus
   glow), single-select icon cards, a cleanly restyled select, an animated
   thank-you checkmark, and a sheened submit button. Used by the Contact,
   Careers, and Catering forms so the whole site stays DRY and on-brand. */

interface FloatFieldProps {
  name: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  required?: boolean
  textarea?: boolean
  rows?: number
  idPrefix?: string
}

export function FloatField({
  name, label, value, onChange, type = 'text', required, textarea, rows = 5, idPrefix = 'f',
}: FloatFieldProps) {
  const id = `${idPrefix}-${name}`
  const input =
    'peer w-full bg-transparent px-4 pt-6 pb-2 font-body text-ink text-body-md placeholder-transparent outline-none'
  const labelCls =
    'pointer-events-none absolute left-4 top-4 origin-left font-sans text-base text-ink-faint transition-all duration-200 ' +
    'peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-brick ' +
    'peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.14em] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-ink-faint'
  return (
    <div className="group relative rounded-lg border border-line bg-paper transition-all duration-300 focus-within:border-brick/60 focus-within:bg-card focus-within:shadow-[0_10px_30px_-14px_rgba(74,36,64,0.5)]">
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          placeholder=" "
          value={value}
          onChange={onChange}
          className={`${input} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          required={required}
          placeholder=" "
          value={value}
          onChange={onChange}
          className={input}
        />
      )}
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-0.5 w-[calc(100%-2rem)] -translate-x-1/2 scale-x-0 bg-brick transition-transform duration-300 peer-focus:scale-x-100"
      />
    </div>
  )
}

interface IconOption {
  value: string
  label: string
  icon: LucideIcon
}

/* Single-select grid of icon cards (replaces a subject/position/type select).
   Submitted value stays identical so Netlify receives the same data. */
export function IconCardGroup({
  legend, options, value, onChange, cols = 'grid-cols-2 sm:grid-cols-3',
}: {
  legend: string
  options: IconOption[]
  value: string
  onChange: (value: string) => void
  cols?: string
}) {
  return (
    <fieldset>
      <legend className="mb-3 block font-sans text-ink-soft text-[12px] font-semibold uppercase tracking-[0.12em]">
        {legend}
      </legend>
      <div className={`grid ${cols} gap-2.5`}>
        {options.map((o) => {
          const active = value === o.value
          const Icon = o.icon
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? '' : o.value)}
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
      </div>
    </fieldset>
  )
}

/* Light, restyled select matching the fluid form surface (secondary fields). */
export function FluidSelect({
  name, label, value, onChange, options, placeholder, idPrefix = 'f',
}: {
  name: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  options: string[]
  placeholder: string
  idPrefix?: string
}) {
  return (
    <div>
      <label htmlFor={`${idPrefix}-${name}`} className="block font-sans text-ink-soft text-[10px] font-semibold tracking-[0.14em] uppercase mb-2">
        {label}
      </label>
      <select
        id={`${idPrefix}-${name}`}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3.5 rounded-lg bg-paper border border-line font-sans text-ink text-base appearance-none transition-all duration-300 focus-visible:outline-none focus:border-brick/60 focus:bg-card focus:ring-2 focus:ring-brick/15"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(106,92,100,0.7)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

/* Animated drawn checkmark for the personalized thank-you state. */
export function SuccessCheck() {
  return (
    <svg viewBox="0 0 52 52" className="h-16 w-16" aria-hidden="true">
      <circle
        cx="26" cy="26" r="24" fill="none" stroke="#4a2440" strokeWidth="3"
        strokeDasharray="151" strokeDashoffset="151"
        style={{ animation: 'draw-check 0.6s ease forwards' }}
      />
      <path
        d="M15 27 l7 7 l15 -16" fill="none" stroke="#4a2440" strokeWidth="4"
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="40" strokeDashoffset="40"
        style={{ animation: 'draw-check 0.4s 0.5s ease forwards' }}
      />
    </svg>
  )
}
