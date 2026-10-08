import Marquee from '../Marquee'

const items = ['Websites', 'AI Automation', 'Social Design', 'E-commerce', 'Brand Assets', 'Packaging', 'Maintenance']

export default function Ticker() {
  return (
    <div data-nav="dark" className="relative z-10 bg-accent py-5 text-white md:py-7">
      <Marquee speed={50}>
        {items.map((item) => (
          <span key={item} className="flex items-center whitespace-nowrap text-3xl font-medium tracking-[-0.04em] md:text-5xl">
            <span className="px-6 md:px-10">{item}</span>
            <span className="h-2.5 w-2.5 bg-white md:h-3.5 md:w-3.5" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </div>
  )
}
