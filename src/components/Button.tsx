import { Link } from 'wouter'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'ghost' | 'cream'

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-semibold uppercase tracking-[0.14em] text-[12px] px-7 py-3.5 rounded transition-all active:scale-[0.98]'

const variants: Record<Variant, string> = {
  // Primary CTA — plum fill
  primary: 'bg-brick text-on-brick hover:bg-brick-dark shadow-[0_12px_30px_-14px_rgba(74,36,64,0.8)]',
  // Plum outline on the cream base
  outline: 'border border-brick/45 text-brick hover:bg-brick hover:text-on-brick',
  // Light outline on dark / plum surfaces
  ghost: 'border border-cream/35 text-cream hover:border-cream/70 hover:bg-cream/10',
  // Solid cream on dark / plum surfaces
  cream: 'bg-cream text-brick hover:bg-cream-dim',
}

interface Props {
  readonly href: string
  readonly variant?: Variant
  readonly children: ReactNode
  readonly className?: string
  readonly external?: boolean
}

export default function Button({ href, variant = 'primary', children, className = '', external }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`
  if (href.startsWith('/') && !external) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  )
}
