import { Phone, MapPin, FileText } from 'lucide-react'
import { company, menuSections, menuPdf, menuHero } from '../data/site'
import PageHero from '../components/PageHero'
import Button from '../components/Button'

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.6 6.6L21.5 9l-5.2 4.5L18 21 12 17l-6 4 1.7-7.5L2.5 9l6.9-.4z" />
    </svg>
  )
}

export default function Menu() {
  return (
    <>
      <PageHero
        slides={menuHero}
        eyebrow="Breakfast · Lunch · Dinner"
        title="Always Cooking. Always Worth It."
        subtitle="From sunrise pancakes to dinner steaks, our menu's built on the meals you grew up loving."
      >
        <Button href={menuPdf} variant="cream" external>
          <FileText size={15} /> View Full Menu (PDF)
        </Button>
        <Button href={company.phoneHref} variant="ghost">
          Call to Order
        </Button>
      </PageHero>

      {/* ---------- INTRO ---------- */}
      <section className="bg-paper pt-20 pb-6">
        <div className="container-x max-w-3xl text-center">
          <p className="text-body-lg text-ink-soft">
            At Becker&rsquo;s, the menu reads like a Sunday morning at Grandma&rsquo;s and a Friday
            night out, all under one roof. Stop in for breakfast at 7, lunch with the crew, or dinner
            with the family. We&rsquo;ll have a seat ready.
          </p>
        </div>
      </section>

      {/* ---------- CATEGORY NAV ---------- */}
      <nav
        aria-label="Menu sections"
        className="sticky top-20 z-30 border-y border-line bg-paper/95 backdrop-blur-md"
      >
        <div className="container-x flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4">
          {menuSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-[14px] font-sans font-semibold uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-brick"
            >
              {s.title}
            </a>
          ))}
        </div>
      </nav>

      {/* ---------- SECTIONS ---------- */}
      <div className="bg-paper pb-8">
        {menuSections.map((section, si) => (
          <section
            key={section.id}
            id={section.id}
            className={`scroll-mt-36 py-16 md:py-20 ${si % 2 === 1 ? 'bg-paper-2' : ''}`}
          >
            <div className="container-x">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-display text-headline-lg text-brick md:text-[40px]">
                  {section.title}
                </h2>
                <div className="star-divider mt-4" aria-hidden="true">
                  <Star />
                </div>
                <p className="mt-4 text-body-md italic text-ink-soft">{section.tagline}</p>
              </div>

              <div className="mt-12 space-y-12">
                {section.groups.map((group) => (
                  <div key={group.title}>
                    <h3 className="font-display text-headline-sm text-ink">{group.title}</h3>
                    {group.note && (
                      <p className="mt-1.5 max-w-3xl text-[14.5px] leading-relaxed text-ink-faint">
                        {group.note}
                      </p>
                    )}
                    {group.items.length > 0 && (
                      <ul className="mt-5 grid gap-x-12 gap-y-5 md:grid-cols-2">
                        {group.items.map((item) => (
                          <li key={item.name} className="border-b border-line/70 pb-4">
                            <div className="flex items-baseline justify-between gap-3">
                              <span className="font-display text-[20px] font-semibold text-ink">
                                {item.name}
                              </span>
                              {item.price && (
                                <span className="shrink-0 text-[17px] font-semibold text-brick">{item.price}</span>
                              )}
                            </div>
                            {item.desc && (
                              <p className="mt-1 text-[15.5px] leading-relaxed text-ink-soft">{item.desc}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ---------- CTA ---------- */}
      <section className="steel-panel py-20 text-center">
        <div className="container-x">
          <h2 className="font-display text-headline-lg text-cream md:text-[40px]">Hungry Yet?</h2>
          <p className="mx-auto mt-4 max-w-xl text-body-md text-cream-dim">
            Walk in or call ahead. Either way, we&rsquo;ll take care of you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={company.phoneHref} variant="cream">
              <Phone size={15} /> Call {company.phone}
            </Button>
            <Button href={company.mapsDir} variant="ghost" external>
              <MapPin size={15} /> Get Directions
            </Button>
          </div>
          <p className="mt-6 text-[13px] text-cream-faint">
            Prices and items subject to change. The{' '}
            <a href={menuPdf} target="_blank" rel="noopener noreferrer" className="underline hover:text-cream">
              printed menu (PDF)
            </a>{' '}
            is the most current.
          </p>
        </div>
      </section>
    </>
  )
}
