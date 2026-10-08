import type { Project } from '../data/projects'
import { Arrow } from './Button'

type ProjectCardProps = {
  project: Project
  index: number
  tone?: 'light' | 'dark'
  className?: string
  frameClassName?: string
}

// A browser-framed screenshot. The captures are full-page, so on hover the
// page slowly scrolls inside the frame, like someone browsing the live site.
export default function ProjectCard({ project, index, tone = 'dark', className = '', frameClassName = 'aspect-[4/3]' }: ProjectCardProps) {
  const dark = tone === 'dark'

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Visit"
      className={`group block ${className}`}
    >
      <div
        className={`overflow-hidden rounded-2xl border p-1.5 transition-colors duration-500 md:rounded-3xl md:p-2 ${
          dark ? 'border-white/10 bg-white/[0.04] group-hover:border-white/25' : 'border-ink/10 bg-white group-hover:border-ink/25'
        }`}
      >
        <div className="flex items-center gap-1.5 px-2 pb-2 pt-1 md:pb-2.5">
          <span className={`h-2 w-2 rounded-full ${dark ? 'bg-white/20' : 'bg-ink/15'}`} />
          <span className={`h-2 w-2 rounded-full ${dark ? 'bg-white/20' : 'bg-ink/15'}`} />
          <span className={`h-2 w-2 rounded-full ${dark ? 'bg-white/20' : 'bg-ink/15'}`} />
          <span
            className={`ml-3 truncate font-mono text-[10px] ${dark ? 'text-white/45' : 'text-ink/50'}`}
          >
            {project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
          </span>
        </div>
        <div className={`relative overflow-hidden rounded-xl md:rounded-2xl ${frameClassName}`}>
          <img
            src={project.image}
            alt={`${project.name} website`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top group-hover:scale-[1.02] group-hover:object-bottom"
            style={{
              transition:
                'object-position 7s cubic-bezier(0.45,0,0.55,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${dark ? 'text-white/50' : 'text-ink/45'}`}>
            {String(index + 1).padStart(2, '0')} — {project.category}
          </p>
          <h3 className="mt-2 text-2xl font-medium tracking-[-0.03em] md:text-3xl">{project.name}</h3>
          <p className={`mt-2 min-h-[3.25em] max-w-md text-sm leading-relaxed ${dark ? 'text-white/65' : 'text-ink/65'}`}>
            {project.desc}
          </p>
        </div>
        <span
          className={`mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white ${
            dark ? 'border-white/15' : 'border-ink/15'
          }`}
        >
          <Arrow className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className={`rounded-full border px-3 py-1 text-xs ${dark ? 'border-white/10 text-white/65' : 'border-ink/10 text-ink/65'}`}
          >
            {t}
          </span>
        ))}
      </div>
    </a>
  )
}
