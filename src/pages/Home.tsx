import { Link } from 'wouter'
import {
  UtensilsCrossed,
  Truck,
  Users,
  Drama,
  PartyPopper,
  MapPin,
  Phone,
  Clock,
  Quote,
  ArrowRight,
  Facebook,
  Star,
  Instagram,
} from 'lucide-react'
import { company, homeCards, reviews, homeHero, foodGallery } from '../data/site'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import HoursList from '../components/HoursList'
import HeroSlideshow from '../components/HeroSlideshow'
import HeroChips from '../components/HeroChips'
import VisitStrip from '../components/VisitStrip'

const cardIcons = [UtensilsCrossed, Truck, Users]

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <HeroSlideshow slides={homeHero} />
        <div className="hero-tint absolute inset-0" />
        <div className="hero-grade absolute inset-0" />

        <div className="container-x relative z-10 pt-28 pb-20">
          <div className="max-w-2xl">
            <p className="rise rise-1 flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-gold-light">
              <span className="hero-rule" /> Ashtabula, Ohio
            </p>
            <h1 className="rise rise-2 mt-5 font-display text-display-lg-mobile font-extrabold leading-[1.02] text-cream md:text-display-xl">
              Real Food. Real People.
              <br className="hidden sm:block" /> Real <span className="italic font-semibold text-gold-light">Ashtabula.</span>
            </h1>
            <p className="rise rise-3 mt-6 max-w-xl text-body-lg text-cream-dim">
              Three meals a day, seven days a week — homestyle cooking and big portions.
            </p>
            <div className="rise rise-4 mt-8">
              <HeroChips />
            </div>
            <div className="rise rise-5 mt-9 flex flex-wrap gap-4">
              <Button href="/menu" variant="cream">
                See the Menu
              </Button>
              <Button href="/contact" variant="ghost">
                Plan a Visit
              </Button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })}
          aria-label="Scroll down to see more"
          className="absolute inset-x-0 bottom-7 z-10 mx-auto hidden h-10 w-6 items-start justify-center rounded-full border border-cream/30 p-1.5 transition-colors hover:border-cream/70 sm:flex"
        >
          <span className="h-2 w-1 animate-bounce rounded-full bg-cream/70" />
        </button>
      </section>

      {/* ---------- VISIT / HOURS BAND ---------- */}
      <VisitStrip />

      {/* ---------- THREE CARDS ---------- */}
      <section className="bg-paper py-24 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="More Than Just a Meal"
            title="Everything Becker's"
            intro="Stop in for a plate, let us cater your next gathering, or come join the crew behind the counter."
          />
          <div className="reveal-group mt-14 grid gap-6 md:grid-cols-3">
            {homeCards.map((c, i) => {
              const Icon = cardIcons[i]
              return (
                <Link
                  key={c.title}
                  href={c.href}
                  className="surface-card group flex flex-col p-8 transition-all hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(74,36,64,0.55)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brick/8 text-brick">
                    <Icon size={24} />
                  </span>
                  <h3 className="mt-6 font-display text-headline-sm text-ink">{c.title}</h3>
                  <p className="mt-3 flex-1 text-body-md text-ink-soft">{c.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-sans font-semibold uppercase tracking-[0.14em] text-brick transition-colors group-hover:text-brick-dark">
                    {c.cta} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- HIGHLIGHTS: SPECIAL EVENTS + PRIVATE ROOM ---------- */}
      <section className="bg-paper-2 py-24 md:py-28">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <article className="reveal group relative overflow-hidden rounded-xl">
            <img
              src="/images/drinks.jpg"
              alt="Drinks and a lively weekend at Becker's"
              className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-steel/90 via-steel/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1 text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-ink">
                <Drama size={13} /> Special Events
              </span>
              <h3 className="mt-4 font-display text-headline-lg text-cream">More Than Just Dinner</h3>
              <p className="mt-2 max-w-md text-body-md text-cream-dim">
                From our crowd-favorite Murder Mystery dinner theater to private celebrations,
                there&rsquo;s always something happening. Follow along on Facebook for what&rsquo;s
                coming up next.
              </p>
            </div>
          </article>

          <article className="reveal group relative overflow-hidden rounded-xl">
            <img
              src="/images/catering-roast.jpg"
              alt="A celebration spread in Becker's private room"
              className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brick/90 via-brick/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1 text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-brick">
                <PartyPopper size={13} /> Private Room
              </span>
              <h3 className="mt-4 font-display text-headline-lg text-cream">Got Something to Celebrate?</h3>
              <p className="mt-2 max-w-md text-body-md text-cream-dim">
                Our private room is built for birthdays, showers, work lunches, and everything in
                between.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded bg-cream px-6 py-3 text-[12px] font-sans font-semibold uppercase tracking-[0.14em] text-brick transition-colors hover:bg-cream-dim"
              >
                Reserve the Room <ArrowRight size={15} />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* ---------- FOOD GALLERY ---------- */}
      <section className="bg-paper py-24 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Fresh From the Kitchen"
            title="A Little Taste of Becker's"
            intro="Big portions, real cooking, a full bar, and a case full of fresh-baked muffins, cookies, and cinnamon rolls — here's a peek at what's coming off the line."
          />
          <div className="reveal-group mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {foodGallery.map((p) => (
              <div key={p.src} className="group relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/menu" variant="outline">
              See the Full Menu
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- REVIEWS ---------- */}
      <section className="bg-paper-2 py-24 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="What Folks Are Saying" title="Serving Comfort Since 1985" />
          <div className="reveal-group mt-14 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="surface-card flex flex-col p-8">
                <Quote size={28} className="text-gold" />
                <blockquote className="mt-4 flex-1 font-display text-[20px] italic leading-relaxed text-ink">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brick/10 font-display font-bold text-brick">
                    {r.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">{r.name}</span>
                    <span className="flex text-gold" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" />
                      ))}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SOCIAL ---------- */}
      <section className="steel-panel py-20">
        <div className="container-x text-center">
          <p className="eyebrow text-gold">Follow Along</p>
          <h2 className="mt-3 font-display text-headline-lg text-cream md:text-[36px]">
            New Specials & Events
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body-md text-cream-dim">
            Behind-the-counter moments, daily specials, and what&rsquo;s coming out of the kitchen.
            <span className="ml-1 font-semibold text-cream">@beckersashtabula</span>
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Becker's on Facebook"
              className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-cream/25 text-cream transition-colors hover:border-cream hover:bg-cream/10"
            >
              <Facebook size={20} />
            </a>
            <a
              href={company.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Becker's on Instagram"
              className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-cream/25 text-cream transition-colors hover:border-cream hover:bg-cream/10"
            >
              <Instagram size={20} />
            </a>
            <a
              href={company.social.yelp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Becker's on Yelp"
              className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-cream/25 text-cream transition-colors hover:border-cream hover:bg-cream/10"
            >
              <Star size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- COME SEE US ---------- */}
      <section className="bg-paper-2 py-24 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <SectionHeading
              align="left"
              eyebrow="Come See Us"
              title="Real Comfort, Right in Ashtabula"
              intro="Whether it's a sunrise breakfast, a working lunch, or dinner with the family — we'll have a seat ready."
            />
            <ul className="mt-8 space-y-5 text-body-md">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="mt-0.5 shrink-0 text-brick" />
                <a href={company.mapsDir} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-brick">
                  {company.addressOneLine}
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Phone size={20} className="mt-0.5 shrink-0 text-brick" />
                <a href={company.phoneHref} className="text-ink-soft hover:text-brick">
                  {company.phone}
                </a>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/menu">See the Menu</Button>
              <Button href="/contact" variant="outline">
                Get Directions
              </Button>
            </div>
          </div>

          <div className="reveal surface-card p-7 md:p-9">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-brick" />
              <h3 className="font-display text-headline-sm text-ink">Hours</h3>
            </div>
            <HoursList className="mt-4 -mx-2" />
            <p className="mt-3 px-1 text-[13px] text-ink-faint">
              Breakfast, lunch &amp; dinner served daily.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
