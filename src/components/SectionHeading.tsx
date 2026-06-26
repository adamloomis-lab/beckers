import type { ReactNode } from 'react'

// Section heading. `tone="dark"` is for plum/dark sections (cream type);
// default light tone is for the cream base (ink type). Centered headings get a
// gold star divider; left-aligned headings get a gold rule.
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  tone = 'light',
  className = '',
}: {
  readonly eyebrow?: string
  readonly title: ReactNode
  readonly intro?: ReactNode
  readonly align?: 'center' | 'left'
  readonly tone?: 'light' | 'dark'
  readonly className?: string
}) {
  const centered = align === 'center'
  const titleColor = tone === 'dark' ? 'text-cream' : 'text-ink'
  const introColor = tone === 'dark' ? 'text-cream-dim' : 'text-ink-soft'
  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow${tone === 'dark' ? ' !text-gold' : ''}`}>{eyebrow}</p>
      )}
      <h2 className={`mt-3 font-display text-headline-lg md:text-[42px] ${titleColor}`}>{title}</h2>
      {centered ? (
        <div className="star-divider mt-5" aria-hidden="true">
          <Star />
        </div>
      ) : (
        <span className="brick-rule mt-5" />
      )}
      {intro && <p className={`mt-5 text-body-lg ${introColor}`}>{intro}</p>}
    </div>
  )
}

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.6 6.6L21.5 9l-5.2 4.5L18 21 12 17l-6 4 1.7-7.5L2.5 9l6.9-.4z" />
    </svg>
  )
}
