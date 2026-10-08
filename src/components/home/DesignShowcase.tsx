import { Link } from 'react-router-dom'
import Marquee from '../Marquee'
import SectionHeading from '../SectionHeading'
import Button from '../Button'
import Reveal from '../Reveal'
import { designItems, type DesignItem } from '../../data/designItems'

const half = Math.ceil(designItems.length / 2)
const rows = [designItems.slice(0, half), designItems.slice(half)]

function Tile({ item }: { item: DesignItem }) {
  return (
    <div className="group/tile mr-3 h-[200px] shrink-0 overflow-hidden rounded-2xl bg-ink/5 md:mr-4 md:h-[300px]">
      <img
        src={item.image}
        alt={`${item.category} — ${item.title}`}
        loading="lazy"
        draggable={false}
        className="h-full w-auto max-w-none transition-transform duration-700 ease-out-expo group-hover/tile:scale-105"
      />
    </div>
  )
}

export default function DesignShowcase() {
  return (
    <section id="design" className="overflow-hidden bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="03"
          label="Design"
          lines={['Campaigns, packaging', '& everything social.']}
          aside={
            <Button to="/design" variant="dark">
              View design work
            </Button>
          }
        />
      </div>

      <Reveal y={60}>
        <Link to="/design" data-cursor="View" aria-label="View the full design portfolio" className="mt-16 flex flex-col gap-3 md:mt-24 md:gap-4">
          {rows.map((row, i) => (
            <Marquee key={i} speed={i === 0 ? 45 : 38} reverse={i === 1} slowOnHover>
              {row.map((item) => (
                <Tile key={item.image} item={item} />
              ))}
            </Marquee>
          ))}
        </Link>
      </Reveal>
    </section>
  )
}
