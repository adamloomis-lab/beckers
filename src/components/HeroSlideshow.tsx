import { useState, useEffect } from 'react'
import type { Photo } from '../data/site'
import { useReducedMotion } from '../hooks/useReducedMotion'

// Cross-fading background slideshow for hero areas. Rotates through real food
// photos so the top of each page stays fresh. Honors reduced-motion (holds on
// the first image, no auto-rotate, no Ken Burns).
export default function HeroSlideshow({
  slides,
  interval = 5500,
}: {
  readonly slides: Photo[]
  readonly interval?: number
}) {
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || slides.length < 2) return
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), interval)
    return () => clearInterval(id)
  }, [reduced, slides.length, interval])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {slides.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={i === 0 ? s.alt : ''}
          loading={i === 0 ? 'eager' : 'lazy'}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === active ? 'opacity-100' : 'opacity-0'
          } ${i === active && !reduced ? 'kenburns' : ''}`}
        />
      ))}
    </div>
  )
}
