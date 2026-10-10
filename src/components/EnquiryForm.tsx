import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { whatsappLink } from '../data/site'
import { Arrow } from './Button'

const needs = ['A new website', 'Redesign my website', 'AI automation', 'Design / social media', 'Not sure yet']

const field =
  'w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-paper placeholder:text-white/35 outline-none transition-colors focus:border-accent-soft/60 focus:bg-white/[0.07]'

// "Free website check" form. There's no backend: submitting composes a
// WhatsApp message with the details and opens it, because owners reply on
// WhatsApp far more reliably than by email.
export default function EnquiryForm() {
  const [need, setNeed] = useState(needs[0])
  const [error, setError] = useState<string | null>(null)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const business = String(data.get('business') ?? '').trim()
    const link = String(data.get('link') ?? '').trim()
    const notes = String(data.get('notes') ?? '').trim()

    if (!name || !business) {
      setError('Please add your name and business name.')
      return
    }
    setError(null)

    const details = [
      `Name: ${name}`,
      `Business: ${business}`,
      link && `Current website / Instagram: ${link}`,
      `Looking for: ${need}`,
      notes && `Notes: ${notes}`,
    ].filter(Boolean)
    const message = `Hi UPWRD! I'd like a free website check.\n\n${details.join('\n')}`

    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 md:p-8">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" placeholder="Your name" aria-label="Your name" autoComplete="name" className={field} />
        <input name="business" placeholder="Business name" aria-label="Business name" autoComplete="organization" className={field} />
      </div>
      <input
        name="link"
        placeholder="Current website or Instagram (optional)"
        aria-label="Current website or Instagram"
        className={`${field} mt-3`}
      />

      <fieldset className="mt-5">
        <legend className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {needs.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setNeed(n)}
              aria-pressed={need === n}
              className={`relative rounded-full border px-4 py-2 text-sm transition-colors ${
                need === n ? 'border-transparent text-white' : 'border-white/15 text-white/70 hover:border-white/35 hover:text-white'
              }`}
            >
              {need === n && (
                <motion.span
                  layoutId="enquiry-need"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{n}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <textarea
        name="notes"
        rows={3}
        placeholder="Anything else? (optional)"
        aria-label="Anything else"
        className={`${field} mt-5 resize-none`}
      />

      {error && (
        <p role="alert" className="mt-3 text-sm text-[#FF9A8A]">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="group mt-5 flex w-full items-center justify-between gap-3 rounded-full bg-[#25D366] py-2 pl-6 pr-2 font-medium text-[#062B16] transition-transform duration-500 ease-out-expo hover:scale-[1.01]"
      >
        <span>Send on WhatsApp</span>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#062B16] text-[#25D366] transition-transform duration-500 ease-out-expo group-hover:rotate-45">
          <Arrow className="h-4 w-4" />
        </span>
      </button>
      <p className="mt-3 text-center text-xs text-white/45">Opens WhatsApp with your details filled in — nothing is sent until you tap send.</p>
    </form>
  )
}
