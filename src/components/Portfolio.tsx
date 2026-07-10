const projects = [
  {
    name: 'Chi Hao (吃好)',
    desc: 'Chinese restaurant in TTDI. WhatsApp-integrated reservations, bilingual branding, private dining showcase.',
    url: 'https://www.chihao.my/',
    image: '/images/chihao.jpg',
  },
  {
    name: 'Justwine',
    desc: 'Wine bar & restaurant with live music. Editorial dark design, chef feature, gallery-driven layout.',
    url: 'https://www.justwine.com.my/',
    image: '/images/justwine.jpg',
  },
  {
    name: 'Crazy Crabs',
    desc: 'Seafood restaurant. Same-page booking form, bold branding, seasonal menu system.',
    url: 'https://www.crazycrabs.com.my/',
    image: '/images/crazycrabs.jpg',
  },
  {
    name: 'Virtue Trustee Berhad',
    desc: 'Corporate fiduciary & trust services. Multilingual, FAQ-driven trust content, full service breakdown.',
    url: 'https://virtuetrustee.my/',
    image: '/images/virtuetrustee.jpg',
  },
]

export default function Portfolio() {
  return (
    <section id="work" className="bg-navy py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal mb-4">
            Selected work
          </p>
          <h2 className="font-display font-700 text-3xl md:text-4xl text-cream tracking-tight">
            From neighbourhood favourites to corporate trust brands.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl overflow-hidden border border-cream/10 bg-navy-light hover:border-teal/40 transition-colors"
            >
              <div className="h-56 overflow-hidden bg-navy-dark">
                <img
                  src={p.image}
                  alt={`${p.name} website screenshot`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display font-600 text-lg text-cream mb-2 flex items-center gap-2">
                  {p.name}
                  <span className="text-teal opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </h3>
                <p className="text-cream/60 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
