import {
  company,
  openingHours,
  reviews,
  ratingSummary,
  menuSections,
  faqs,
  type MenuGroup,
} from '../data/site'

// Production target domain. Canonicals, sitemap, OG and schema all point here so
// SEO value lands on the live host the moment DNS flips from the old Duda site.
export const SITE_URL = 'https://www.beckersashtabula.com'

const OG_IMAGE = '/images/hero.jpg'

export const abs = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

// Netlify serves pages with a trailing slash; keep canonical/sitemap URLs aligned.
export const pageUrl = (path: string) =>
  abs(path === '/' ? '/' : path.endsWith('/') ? path : `${path}/`)

function openingHoursSpec() {
  return openingHours.map((o) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: o.days,
    opens: o.opens,
    closes: o.closes,
  }))
}

function aggregateRating() {
  return {
    '@type': 'AggregateRating',
    ratingValue: ratingSummary.value,
    reviewCount: String(ratingSummary.count),
    bestRating: '5',
    worstRating: '1',
  }
}

function reviewNodes() {
  return reviews.map((r) => ({
    '@type': 'Review',
    reviewBody: r.quote,
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
  }))
}

export function restaurantSchema() {
  const a = company.address
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/#restaurant`,
    name: company.name,
    url: SITE_URL,
    image: abs(OG_IMAGE),
    logo: abs('/images/logo.png'),
    telephone: company.phone,
    email: company.email,
    priceRange: '$$',
    servesCuisine: ['American', 'Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Comfort Food'],
    description: company.shortBlurb,
    slogan: company.tagline,
    hasMenu: pageUrl('/menu'),
    acceptsReservations: 'True',
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: company.geo.lat,
      longitude: company.geo.lng,
    },
    areaServed: [
      { '@type': 'City', name: 'Ashtabula, OH' },
      { '@type': 'AdministrativeArea', name: 'Ashtabula County, OH' },
    ],
    openingHoursSpecification: openingHoursSpec(),
    aggregateRating: aggregateRating(),
    review: reviewNodes(),
    sameAs: [company.social.facebook, company.social.yelp, company.social.instagram],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.name,
    publisher: { '@id': `${SITE_URL}/#restaurant` },
  }
}

// Extract a numeric price (first number) for schema Offers; undefined if none.
function parsePrice(price?: string): string | undefined {
  if (!price) return undefined
  const m = price.match(/(\d+(?:\.\d+)?)/)
  return m ? m[1] : undefined
}

function menuSectionSchema(group: MenuGroup) {
  return {
    '@type': 'MenuSection',
    name: group.title,
    ...(group.note ? { description: group.note } : {}),
    hasMenuItem: group.items.map((it) => {
      const price = parsePrice(it.price)
      return {
        '@type': 'MenuItem',
        name: it.name,
        ...(it.desc ? { description: it.desc } : {}),
        ...(price ? { offers: { '@type': 'Offer', price, priceCurrency: 'USD' } } : {}),
      }
    }),
  }
}

export function menuSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${SITE_URL}/menu/#menu`,
    name: "Becker's Restaurant Menu",
    url: pageUrl('/menu'),
    inLanguage: 'en-US',
    provider: { '@id': `${SITE_URL}/#restaurant` },
    hasMenuSection: menuSections.map((s) => ({
      '@type': 'MenuSection',
      name: s.title,
      description: s.tagline,
      hasMenuSection: s.groups.map(menuSectionSchema),
    })),
  }
}

function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: pageUrl(it.path),
    })),
  }
}

export type PageMeta = {
  title: string
  description: string
  canonical: string
  ogImage: string
  jsonLd: object[]
}

export function getPageMeta(rawPath: string): PageMeta {
  const path = rawPath !== '/' ? rawPath.replace(/\/$/, '') : '/'
  const ogImage = abs(OG_IMAGE)

  switch (path) {
    case '/':
      return {
        title: "Becker's Restaurant | Homestyle Cooking in Ashtabula, OH",
        description: `${company.shortBlurb} Open Mon-Sat 7am-9pm, Sun 7am-4pm. Call ${company.phone}.`,
        canonical: pageUrl('/'),
        ogImage,
        jsonLd: [restaurantSchema(), websiteSchema(), faqSchema()],
      }
    case '/menu':
      return {
        title: "Menu | Becker's Restaurant, Ashtabula OH",
        description:
          'Breakfast served all day, hearty lunches, and homestyle dinner classics, plus a full bar and a fresh in-house bakery. See the full Becker’s menu: favorites, omelets, burgers, sandwiches, dinners, seafood, and a 55+ menu.',
        canonical: pageUrl('/menu'),
        ogImage: abs('/images/gallery-breakfast-burger.jpg'),
        jsonLd: [
          restaurantSchema(),
          menuSchema(),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Menu', path: '/menu' },
          ]),
        ],
      }
    case '/catering':
      return {
        title: "Catering | Becker's Restaurant, Ashtabula OH",
        description:
          'Catering for parties, work events, showers, reunions, and memorial meals across Ashtabula County. We bring the food, you enjoy the day. Call (440) 993-1131.',
        canonical: pageUrl('/catering'),
        ogImage: abs('/images/catering-roast.jpg'),
        jsonLd: [
          restaurantSchema(),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Event Catering',
            provider: { '@id': `${SITE_URL}/#restaurant` },
            areaServed: { '@type': 'AdministrativeArea', name: 'Ashtabula County, OH' },
            url: pageUrl('/catering'),
          },
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Catering', path: '/catering' },
          ]),
        ],
      }
    case '/careers':
      return {
        title: "Careers | Join the Becker's Team in Ashtabula, OH",
        description:
          'Now hiring servers, line cooks, dishwashers, prep, and hosts at Becker’s Restaurant in Ashtabula. Steady hours, fair pay, meals on shift, and real growth. Apply online.',
        canonical: pageUrl('/careers'),
        ogImage: abs('/images/staff.jpg'),
        jsonLd: [
          restaurantSchema(),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Join Our Team', path: '/careers' },
          ]),
        ],
      }
    case '/contact':
      return {
        title: "Contact Becker's Restaurant | Ashtabula, OH",
        description: `Call, message, or stop by. Becker’s Restaurant is at ${company.addressOneLine}, open seven days a week. Reservations, catering, and private room bookings welcome.`,
        canonical: pageUrl('/contact'),
        ogImage: abs('/images/banner-contact.jpg'),
        jsonLd: [
          restaurantSchema(),
          faqSchema(),
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            url: pageUrl('/contact'),
            about: { '@id': `${SITE_URL}/#restaurant` },
          },
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ],
      }
    case '/privacy':
      return {
        title: "Privacy Policy | Becker's Restaurant",
        description:
          'How Becker’s Restaurant collects, uses, and protects information submitted through this website.',
        canonical: pageUrl('/privacy'),
        ogImage,
        jsonLd: [breadcrumb([{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy' }])],
      }
    case '/terms':
      return {
        title: "Terms of Service | Becker's Restaurant",
        description: 'The terms that govern your use of the Becker’s Restaurant website.',
        canonical: pageUrl('/terms'),
        ogImage,
        jsonLd: [breadcrumb([{ name: 'Home', path: '/' }, { name: 'Terms of Service', path: '/terms' }])],
      }
    case '/accessibility':
      return {
        title: "Accessibility Statement | Becker's Restaurant",
        description:
          'Our commitment to making the Becker’s Restaurant website accessible to everyone, and how to reach us about accessibility.',
        canonical: pageUrl('/accessibility'),
        ogImage,
        jsonLd: [breadcrumb([{ name: 'Home', path: '/' }, { name: 'Accessibility', path: '/accessibility' }])],
      }
    default:
      return {
        title: "Page Not Found | Becker's Restaurant",
        description:
          "Sorry, we couldn't find that page. Becker’s Restaurant is Ashtabula’s homestyle spot for breakfast, lunch, and dinner.",
        canonical: pageUrl(path),
        ogImage,
        jsonLd: [restaurantSchema()],
      }
  }
}

export const ALL_ROUTES: string[] = [
  '/',
  '/menu',
  '/catering',
  '/careers',
  '/contact',
  '/privacy',
  '/terms',
  '/accessibility',
]
