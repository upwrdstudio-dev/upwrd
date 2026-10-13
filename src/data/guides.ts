// Long-form guides at /guides/<slug>. Written to answer the questions small
// business owners actually search (and ask AI assistants), in plain language.
// <head> titles/descriptions live in pageMeta.json under the same path.

export type Block =
  | { p: string }
  | { list: string[] }
  | { table: { head: string[]; rows: string[][] } }
  | { note: string }

export type Guide = {
  slug: string
  title: string
  /** Short label for cards and breadcrumbs. */
  label: string
  summary: string
  published: string
  updated: string
  readMins: number
  /** The direct answer, shown first. */
  answer: string
  sections: { heading: string; blocks: Block[] }[]
  faqs: { q: string; a: string }[]
  related: { label: string; to: string }[]
  sources?: { label: string; url: string }[]
}

export const guides: Guide[] = [
  {
    slug: 'website-cost-malaysia',
    label: 'Website cost in Malaysia',
    title: 'How much does a website cost in Malaysia? (2026 guide)',
    summary: 'Real price ranges for landing pages, business websites and online stores in Malaysia — plus the hidden costs most quotes leave out.',
    published: '2026-10-13',
    updated: '2026-10-13',
    readMins: 6,
    answer:
      'In Malaysia, a simple landing page usually costs from about RM1,500, a 5–8 page business website roughly RM1,500–6,000 with a freelancer or small studio (RM5,000–15,000 with an agency), and an online store from about RM5,000. On top of that, budget roughly RM50–150 a year for a domain and RM150–500 a month if you want hosting and maintenance handled for you.',
    sections: [
      {
        heading: 'Typical price ranges',
        blocks: [
          {
            table: {
              head: ['Type of website', 'Freelancer / small studio', 'Agency'],
              rows: [
                ['Landing page (1 page)', 'from ~RM1,500', 'varies widely'],
                ['Business website (5–8 pages)', '~RM1,500 – 6,000', '~RM5,000 – 15,000'],
                ['Online store (e-commerce)', '~RM5,000 – 12,000', '~RM10,000 – 30,000+'],
                ['Monthly care (hosting, updates)', '~RM150 – 500 / month', '~RM500 – 1,500 / month'],
              ],
            },
          },
          {
            note: 'These are market ranges gathered from Malaysian pricing guides in 2025–26. Quotes vary a lot, so compare what each one actually includes, not just the total.',
          },
        ],
      },
      {
        heading: 'What makes a website cost more (or less)',
        blocks: [
          {
            list: [
              'Number of pages — every extra page means more design, writing and testing.',
              'Custom design vs a template — a template is cheaper; a design made for your brand costs more but looks and converts better.',
              'Features — online payments, bookings, multiple languages, member areas or calculators all add work.',
              'Content — whether you supply the text and photos, or the designer writes and sources them.',
              'Who builds it — freelancers and small studios are usually cheaper than agencies, which carry more overheads.',
            ],
          },
        ],
      },
      {
        heading: 'The hidden costs to ask about',
        blocks: [
          { p: 'Many cheap quotes leave out costs you’ll pay anyway. Before you agree to anything, ask whether the price includes:' },
          {
            list: [
              'Domain name — usually around RM50–150 a year for a .com or .my.',
              'Hosting — the server your site runs on, paid monthly or yearly.',
              'Copywriting and photos — writing good copy takes time; some quotes assume you’ll provide it.',
              'Maintenance — security updates, backups and small edits after launch.',
              'Revisions — how many rounds of changes are included before extra charges apply.',
            ],
          },
        ],
      },
      {
        heading: 'Red flags in a website quote',
        blocks: [
          {
            list: [
              'You won’t own the domain or the website — always make sure the domain is registered in your name.',
              'No clear scope — a single number with no list of pages or features usually leads to surprise bills.',
              'Very low prices with no portfolio — a website is something you’ll live with for years.',
              'No mention of mobile — most visitors will see your site on a phone.',
            ],
          },
        ],
      },
      {
        heading: 'What UPWRD charges',
        blocks: [
          {
            p: 'For reference, our own prices: a Landing Page is RM1,500, a Business Website starts from RM3,800 and an online store from RM6,500. Every quote is fixed before we start, includes copywriting and three rounds of revisions, and you own your website and domain once it’s paid.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a cheap website worth it?',
        a: 'It can be, if it’s fast, works on phones, and you own it. The risk with very cheap websites is what’s missing: no ownership, no copywriting, no maintenance, or a design that doesn’t build trust.',
      },
      {
        q: 'Do I need to pay every month for a website?',
        a: 'You’ll always pay for a domain (yearly) and hosting (monthly or yearly). A monthly care plan is optional — it covers updates, backups and small edits so you don’t have to.',
      },
      {
        q: 'How long does it take to build a website?',
        a: 'Roughly a week for a landing page, 3–4 weeks for a business website and 6–8 weeks for an online store, depending on how quickly content and feedback come in.',
      },
    ],
    related: [
      { label: 'Our pricing', to: '/#pricing' },
      { label: 'Website design in Kuala Lumpur', to: '/services/website-design-kuala-lumpur' },
    ],
    sources: [
      { label: 'Rebrand — web design pricing for Malaysian SMEs', url: 'https://www.rebrand.com.my/web-design-pricing-malaysia-smes/' },
      { label: 'Walk Production — Malaysia web design price', url: 'https://www.walkproduction.com/blog/malaysia-web-design-price/' },
      { label: 'Ulement — website cost in Malaysia (2026)', url: 'https://ulement.com/how-much-does-a-wordpress-website-cost-in-malaysia/' },
      { label: 'Jumix Design — website maintenance cost (2026)', url: 'https://jumixdesign.com/website-maintenance-cost-malaysia-2026/' },
    ],
  },
  {
    slug: 'does-my-business-need-a-website',
    label: 'Does my business need a website?',
    title: 'Does my small business need a website in 2026?',
    summary: 'Social media is great for reach — but here’s why most small businesses still need a website, and what a good one needs to do.',
    published: '2026-10-13',
    updated: '2026-10-13',
    readMins: 5,
    answer:
      'For most small businesses, yes. When people hear about you — from a friend, on Instagram or on Google Maps — they search your name before they visit, call or book. A website is the one place online you fully control, it helps you show up on Google, and it makes a new business look established. Social media alone works as a start, but it shouldn’t be your only home online.',
    sections: [
      {
        heading: '6 reasons a small business needs a website',
        blocks: [
          {
            list: [
              'Customers Google you first — if nothing comes up, they often choose a competitor who does.',
              'Instant credibility — a proper site tells people you’re real and established, even if you opened last month.',
              'Show up on Google Maps and search — a website linked to your Google Business Profile strengthens your local listing.',
              'You own it — social platforms change their rules and reach; your website and domain stay yours.',
              'Works 24/7 — menu, prices, hours, location and booking available any time, so you answer fewer repeat questions.',
              'More enquiries — clear call, WhatsApp, booking and directions buttons turn interest into customers.',
            ],
          },
        ],
      },
      {
        heading: 'Isn’t Instagram or Facebook enough?',
        blocks: [
          {
            p: 'Social media is excellent for being discovered and staying in touch. But it isn’t built to answer the practical questions customers have before they buy — and you don’t control it. Posts get buried, reach drops, and accounts can be restricted. Many businesses start on social media and add a simple website once they want to look more professional and be found on Google.',
          },
          { p: 'The best setup is both: social media to attract people, and a website to convince them.' },
        ],
      },
      {
        heading: 'What a good small-business website needs',
        blocks: [
          {
            list: [
              'Looks great on a phone — that’s where most visitors will see it.',
              'Says clearly what you do, where you are and how to reach you, right at the top.',
              'Your services, menu or prices, with real photos.',
              'One-tap ways to contact you: WhatsApp, call, booking or directions.',
              'Fast loading, and set up so Google can understand it.',
              'A domain in your name, so you own it.',
            ],
          },
        ],
      },
      {
        heading: 'Start small',
        blocks: [
          {
            p: 'You don’t need a big website to start. A single, well-made landing page with your key information and contact buttons is often enough for a new business — you can grow it into a full website later.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What’s the cheapest way to get a professional website?',
        a: 'A one-page landing page is usually the most affordable starting point. It covers what customers need — who you are, what you offer, where you are and how to contact you — and can be expanded later.',
      },
      {
        q: 'Will a website help me show up on Google Maps?',
        a: 'Your Google Business Profile is what appears on Maps, and linking it to a website with matching details helps Google trust and understand your business.',
      },
      {
        q: 'Can I update the website myself?',
        a: 'Yes — most small-business sites can be built on a system you can edit yourself, like WordPress.',
      },
    ],
    related: [
      { label: 'Landing Page — RM1,500', to: '/#pricing' },
      { label: 'Websites for restaurants & cafés', to: '/services/restaurant-website-design' },
    ],
  },
  {
    slug: 'wordpress-vs-wix-vs-custom',
    label: 'WordPress vs Wix vs custom',
    title: 'WordPress vs Wix vs a custom-coded website: which is right for your business?',
    summary: 'A plain-language comparison of the three most common ways to build a small-business website — cost, ownership, flexibility and upkeep.',
    published: '2026-10-13',
    updated: '2026-10-13',
    readMins: 6,
    answer:
      'For most small businesses, WordPress is the best balance: you can edit it yourself, you own it and can move it to any host, and it can grow with you. Wix is quickest for a simple DIY site, but your site stays on Wix and you keep paying their subscription. A custom-coded site gives the best speed and most unique design, and suits showcase or landing pages where you don’t need to edit often.',
    sections: [
      {
        heading: 'At a glance',
        blocks: [
          {
            table: {
              head: ['', 'WordPress', 'Wix', 'Custom code'],
              rows: [
                ['Edit it yourself', 'Yes', 'Yes, very easy', 'Usually needs a developer'],
                ['Who owns it', 'You — move it to any host', 'Stays on Wix', 'You — host it anywhere'],
                ['Ongoing cost', 'Hosting + domain', 'Wix subscription', 'Hosting (often low) + domain'],
                ['Design freedom', 'High', 'Medium (within Wix)', 'Unlimited'],
                ['Speed', 'Good when built well', 'Okay', 'Excellent'],
                ['Online store', 'Yes (WooCommerce)', 'Yes (Wix plans)', 'Possible, more work'],
                ['Best for', 'Most small businesses', 'Simple DIY sites', 'Showcase & landing pages'],
              ],
            },
          },
        ],
      },
      {
        heading: 'WordPress',
        blocks: [
          {
            p: 'WordPress powers a huge share of the web. It’s open-source, so you’re never locked to one company: you can change hosting, designers or developers any time. It’s easy to update text, photos and prices yourself, and it can add an online store, bookings or multiple languages as you grow. It does need occasional updates and backups, which a care plan can handle.',
          },
        ],
      },
      {
        heading: 'Wix',
        blocks: [
          {
            p: 'Wix is a website builder you pay for monthly. It’s very beginner-friendly and quick to get started, which makes it a reasonable choice if you want to build a simple site yourself. The trade-offs: you can’t move your Wix site to another host, you keep paying the subscription for as long as the site is live, and design and performance are limited to what Wix allows.',
          },
        ],
      },
      {
        heading: 'Custom-coded',
        blocks: [
          {
            p: 'A custom-coded site is built from scratch for your business. It can look like anything, load very fast and be cheap to host. The downside is that changing content usually needs a developer, so it suits sites that don’t change often — landing pages, campaign pages or a showcase for a premium brand.',
          },
        ],
      },
      {
        heading: 'Which should you choose?',
        blocks: [
          {
            list: [
              'You want to edit content yourself and grow over time → WordPress.',
              'You want to build a very simple site yourself this weekend → Wix.',
              'You want a standout, very fast site that rarely changes → custom code.',
              'You’re not sure → start with what you need today; a good designer will tell you honestly.',
            ],
          },
          {
            p: 'At UPWRD we build most client websites in WordPress, so clients can update them and own them outright, and use custom code for landing pages and showcase sites where design and speed matter most.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I move my Wix website to WordPress later?',
        a: 'Not directly — Wix sites can’t be exported to another platform, so moving means rebuilding the site in WordPress (your domain can be moved).',
      },
      {
        q: 'Is WordPress secure?',
        a: 'Yes, when it’s kept updated and backed up, uses reputable plugins and good hosting. Most problems come from neglected sites, which is what a care plan prevents.',
      },
      {
        q: 'Which one is best for SEO?',
        a: 'All three can rank on Google. What matters more is fast loading, good content, a clear structure and a properly set-up Google Business Profile.',
      },
    ],
    related: [
      { label: 'Website design in Kuala Lumpur', to: '/services/website-design-kuala-lumpur' },
      { label: 'Concept sites we’ve built', to: '/work#concepts' },
    ],
  },
]
