import { Link } from 'react-router-dom'
import SectionHeading from '../SectionHeading'
import Reveal from '../Reveal'
import { Arrow } from '../Button'
import { thumb } from '../../lib/images'

type Industry = {
  title: string
  body: string
  service: { to: string; label: string }
  concept?: { to: string; name: string; image: string }
}

// "Who we build for": lets visitors find their own industry, and links each
// one to its service page (internal links help those pages rank).
const industries: Industry[] = [
  {
    title: 'Cafés & restaurants',
    body: 'Menus people can read on a phone, WhatsApp bookings and pre-orders, and your location, hours and parking up front.',
    service: { to: '/services/restaurant-website-design', label: 'Restaurant & café websites' },
    concept: { to: '/concepts/ondeh-bakehouse', name: 'Ondeh Bakehouse', image: '/images/concepts/ondeh-bakehouse.jpg' },
  },
  {
    title: 'Spas, salons & beauty',
    body: 'Treatment menus with prices, easy booking, and visuals that match your space and your feed.',
    service: { to: '/services/spa-salon-website-design', label: 'Spa & salon websites' },
    concept: { to: '/concepts/halia-house', name: 'Halia House', image: '/images/concepts/halia-house.jpg' },
  },
  {
    title: 'Professional firms',
    body: 'Clear service pages, FAQs that answer what clients ask, and enquiries that go straight to the right person.',
    service: { to: '/services/professional-services-website-design', label: 'Websites for firms' },
    concept: { to: '/concepts/northline-advisory', name: 'Northline Advisory', image: '/images/concepts/northline-advisory.jpg' },
  },
  {
    title: 'Shops & online stores',
    body: 'Online stores with FPX and card payments, products you can update yourself, and delivery or pickup options.',
    service: { to: '/services/ecommerce-website-malaysia', label: 'E-commerce websites' },
  },
]

// A still sketch of a store for the one industry without a concept site.
function StoreSketch() {
  const tones = ['bg-[#E9D9B8]', 'bg-[#D7E4C6]', 'bg-[#E6CFC5]', 'bg-[#D6D3CC]']
  return (
    <div className="flex h-full flex-col justify-center gap-3 bg-ink-800 p-5">
      <div className="grid grid-cols-4 gap-2">
        {tones.map((t) => (
          <div key={t} className="rounded-lg bg-white/[0.05] p-1.5">
            <div className={`aspect-square rounded-md ${t}`} />
            <div className="mt-1.5 h-1 w-2/3 rounded-full bg-white/25" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-xl bg-accent px-3 py-2 text-[11px] font-medium text-white">
        <span>Pay with FPX or card</span>
        <span aria-hidden="true">→</span>
      </div>
    </div>
  )
}

export default function Industries() {
  return (
    <section id="industries" className="bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="02"
          label="Who we build for"
          lines={['Built for', <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">your kind of business.</span>]}
          aside={
            <p className="max-w-xs text-[15px] leading-relaxed text-ink/65">
              Pick yours to see what a website for your industry should include, and a concept site we designed for it.
            </p>
          }
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <Reveal key={ind.title} delay={i * 0.06} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white transition-colors duration-500 hover:border-ink/25">
                <Link to={ind.service.to} tabIndex={-1} aria-hidden="true" className="relative block aspect-[4/3] overflow-hidden bg-paper-dim">
                  {ind.concept ? (
                    <img
                      src={thumb(ind.concept.image, 800)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                    />
                  ) : (
                    <StoreSketch />
                  )}
                </Link>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="text-2xl font-medium tracking-[-0.03em]">
                    <Link to={ind.service.to} className="transition-colors hover:text-accent">
                      {ind.title}
                    </Link>
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/65">{ind.body}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-5 text-sm">
                    <Link to={ind.service.to} className="group/link inline-flex items-center gap-2 font-medium">
                      {ind.service.label}
                      <Arrow className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover/link:rotate-45" />
                    </Link>
                    {ind.concept && (
                      <Link to={ind.concept.to} className="text-ink/55 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink">
                        See concept
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-[15px] leading-relaxed text-ink/65">
            Not on the list? We build for all kinds of small businesses: tuition centres, workshops, studios, shops and
            more.{' '}
            <Link to="/services/website-design-kuala-lumpur" className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-accent">
              Website design in Kuala Lumpur
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
