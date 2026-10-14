import Marquee from '../Marquee'

const items = ['Websites', 'Landing Pages', 'Online Stores', 'Social Design', 'Brand Assets', 'Packaging', 'Maintenance']

export default function Ticker() {
  return (
    <div data-nav="dark" className="relative z-10 bg-accent py-3.5 text-white md:py-5">
      <Marquee speed={50}>
        {items.map((item) => (
          <span key={item} className="flex items-center whitespace-nowrap text-xl font-medium tracking-[-0.03em] md:text-3xl">
            <span className="px-5 md:px-8">{item}</span>
            <span className="h-1.5 w-1.5 bg-white md:h-2 md:w-2" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </div>
  )
}
