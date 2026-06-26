import type { ReactNode } from 'react'
import type { Photo } from '../data/site'
import HeroSlideshow from './HeroSlideshow'

// Image-backed page header used across the inner pages. Rotates through real
// food photos behind a plum-tinted overlay that keeps cream type legible.
// Children render below the subtitle (e.g. buttons).
export default function PageHero({
  slides,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  readonly slides: Photo[]
  readonly eyebrow: string
  readonly title: ReactNode
  readonly subtitle?: ReactNode
  readonly children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden">
      <HeroSlideshow slides={slides} />
      <div className="smoke-overlay absolute inset-0" />
      <div className="container-x relative z-10 pt-40 pb-20 text-center md:pt-44 md:pb-24">
        <p className="eyebrow rise rise-1 text-gold-light">{eyebrow}</p>
        <h1 className="rise rise-2 mx-auto mt-4 max-w-3xl font-display text-display-lg-mobile font-extrabold text-cream md:text-display-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="rise rise-3 mx-auto mt-5 max-w-2xl text-body-lg text-cream-dim">{subtitle}</p>
        )}
        {children && <div className="rise rise-4 mt-8 flex flex-wrap justify-center gap-4">{children}</div>}
      </div>
    </section>
  )
}
