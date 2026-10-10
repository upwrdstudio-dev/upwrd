import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import TextReveal from './TextReveal'
import Reveal from './Reveal'
import Magnetic from './Magnetic'
import CircleText from './CircleText'
import { Eyebrow } from './SectionHeading'
import { Arrow } from './Button'
import { MARK_BLOCK, MARK_U } from './Logo'
import { LOCKUP_WIDTH, WORDMARK_PATH } from './logoPaths'
import EnquiryForm from './EnquiryForm'
import WhatsAppIcon from './WhatsAppIcon'
import { CONTACT, whatsappLink } from '../data/site'

function LocalTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kuala_Lumpur',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    const update = () => setTime(fmt.format(new Date()))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return <span className="tabular-nums">{time}</span>
}

function SpinningCTA() {
  return (
    <Magnetic strength={0.35}>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative grid h-36 w-36 place-items-center rounded-full bg-accent text-white transition-transform duration-500 ease-out-expo hover:scale-105 md:h-44 md:w-44"
        aria-label="Start a project — chat with us on WhatsApp"
      >
        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
          <CircleText
            text="Start a project • Start a project • "
            className="animate-[spin-slow_18s_linear_infinite] font-mono text-[10px] uppercase [--r:61px] md:text-[11px] md:[--r:76px]"
          />
        </span>
        <Arrow className="h-7 w-7 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
      </a>
    </Magnetic>
  )
}

const footerLinks = [
  { to: '/#services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/design', label: 'Design' },
  { to: '/#process', label: 'Process' },
  { to: '/#pricing', label: 'Pricing' },
  { to: '/#faq', label: 'FAQ' },
]

export default function Footer() {
  const wordmarkRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wordmarkRef, offset: ['start end', 'end end'] })
  const wordY = useTransform(scrollYProgress, [0, 1], ['45%', '0%'])
  // The block starts in the gap of the U and lifts into place as the footer lands.
  const blockY = useTransform(scrollYProgress, [0.35, 1], [10, 0])

  return (
    <footer id="contact" data-nav="dark" className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 pt-28 md:px-8 md:pt-40">
        <Reveal y={12}>
          <Eyebrow label="Let's talk" tone="dark" />
        </Reveal>

        <div className="mt-8 flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <TextReveal
            lines={[
              "Let's build",
              'something',
              <span className="font-serif font-normal italic tracking-[-0.02em] text-accent-soft">upward.</span>,
            ]}
            className="text-[15vw] font-medium leading-[0.9] tracking-tightest md:text-[8.5rem]"
          />
          <Reveal delay={0.3} className="self-start md:self-end">
            <SpinningCTA />
          </Reveal>
        </div>

        <div id="enquire" className="mt-20 grid scroll-mt-28 gap-10 md:mt-28 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-soft">Free website check</p>
            <h3 className="mt-4 text-4xl font-medium leading-[1] tracking-tightest md:text-5xl">
              Not sure where to start?
            </h3>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/65">
              Tell us a little about your business. We’ll look at your current website or Instagram and reply on
              WhatsApp with honest, practical suggestions — no obligation.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 text-lg text-paper transition-colors hover:text-[#25D366]"
            >
              <WhatsAppIcon className="h-6 w-6 text-[#25D366]" />
              {CONTACT.whatsappDisplay}
            </a>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-7">
            <EnquiryForm />
          </Reveal>
        </div>

        <div className="mt-20 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 md:mt-24 md:grid-cols-4">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">Contact</p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-fit bg-gradient-to-r from-accent-soft to-accent-soft bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 text-lg transition-[background-size] duration-500 ease-out-expo hover:bg-[length:100%_1px]"
            >
              WhatsApp {CONTACT.whatsappDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-1 block w-fit bg-gradient-to-r from-accent-soft to-accent-soft bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 text-white/70 transition-[background-size] duration-500 ease-out-expo hover:bg-[length:100%_1px]"
            >
              {CONTACT.email}
            </a>
          </div>
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">Social</p>
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-accent-soft to-accent-soft bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 text-lg transition-[background-size] duration-500 ease-out-expo hover:bg-[length:100%_1px]"
            >
              Instagram {CONTACT.instagram}
            </a>
          </div>
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">Based in</p>
            <p className="text-lg">
              Malaysia <span className="text-white/50">·</span> <LocalTime />
            </p>
          </div>
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">Explore</p>
            <ul className="grid grid-cols-2 gap-y-1.5 text-white/70">
              {footerLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div ref={wordmarkRef} className="mx-auto mt-20 max-w-[1800px] overflow-hidden px-5 md:mt-28 md:px-8" aria-hidden="true">
        <motion.svg style={{ y: wordY }} viewBox={`7 4 ${LOCKUP_WIDTH - 14} 42`} className="block w-full text-paper">
          <path d={MARK_U} fill="currentColor" />
          <motion.rect
            x={MARK_BLOCK.x}
            y={MARK_BLOCK.y}
            width={MARK_BLOCK.size}
            height={MARK_BLOCK.size}
            className="fill-accent"
            style={{ y: blockY }}
          />
          <path d={WORDMARK_PATH} fill="currentColor" />
        </motion.svg>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-xs text-white/60 md:flex-row md:justify-between md:px-8">
        <p>© {new Date().getFullYear()} UPWRD Studio. All rights reserved.</p>
        <p>Websites · AI Automation · Design — made in Malaysia.</p>
      </div>
    </footer>
  )
}
