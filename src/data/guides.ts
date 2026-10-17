// Long-form guides at /guides/<slug>. Written to answer the questions small
// business owners actually search (and ask AI assistants), in plain language.
// <head> titles/descriptions live in pageMeta.json under the same path.

import { guideMeta, type GuideMeta } from './guideMeta'

const meta = (slug: string) => {
  const m = guideMeta.find((g) => g.slug === slug)
  if (!m) throw new Error(`Missing guide meta: ${slug}`)
  return m
}

export type Block =
  | { p: string }
  | { list: string[] }
  | { table: { head: string[]; rows: string[][] } }
  | { note: string }

export type Guide = GuideMeta & {
  /** The direct answer, shown first. */
  answer: string
  sections: { heading: string; blocks: Block[] }[]
  faqs: { q: string; a: string }[]
  related: { label: string; to: string }[]
  sources?: { label: string; url: string }[]
}

export const guides: Guide[] = [
  {
    ...meta('website-cost-malaysia'),
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
              'Domain name — usually around RM50–150 a year for a .com or .my ([which to choose](/guides/com-vs-my-vs-com-my-domain)).',
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
    ...meta('does-my-business-need-a-website'),
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
            p: 'You don’t need a big website to start. A single, well-made landing page with your key information and contact buttons is often enough for a new business — you can grow it into a full website later. Compare the two in [landing page vs full website](/guides/landing-page-vs-website).',
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
        a: 'Your Google Business Profile is what appears on Maps, and linking it to a website with matching details helps Google trust and understand your business. See [how to set up your Google Business Profile](/guides/google-business-profile-malaysia).',
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
    ...meta('wordpress-vs-wix-vs-custom'),
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
  {
    ...meta('google-business-profile-malaysia'),
    answer:
      'Create a free Google Business Profile at business.google.com: add your business name, category, location or service area, phone number and website, then verify that you run the business. Google chooses which verification options you get — usually a video, a live video call, a phone or SMS code, or email — and reviews take up to 5 business days. If customers don’t come to you (for example, you work from home), set it up as a service-area business and hide your address.',
    sections: [
      {
        heading: 'What you need before you start',
        blocks: [
          {
            list: [
              'A Google account — ideally one you’ll keep using for the business, not a staff member’s personal account.',
              'Your business name exactly as customers see it on your signage, packaging or social media. Google’s rules don’t allow extra keywords in the name (e.g. “Ali Bakery – Best Cakes KL”), and doing it can get your profile suspended.',
              'A phone number customers can reach, and your opening hours.',
              'Your website, if you have one. A profile that links to a proper website with matching details is easier for Google to trust.',
              'A few real photos of your products, premises or work.',
            ],
          },
        ],
      },
      {
        heading: 'Step by step',
        blocks: [
          {
            list: [
              'Go to business.google.com and sign in, then choose to add your business.',
              'Enter your business name and pick the category that describes your main business as specifically as possible — “Bakery” rather than “Store”.',
              'Answer whether customers can visit you at a staffed location. Say yes only if you have a shop, office or studio open to customers during your hours.',
              'Add your address (if customers visit) and/or the areas you serve — cities, postcodes or regions.',
              'Add your phone number and website.',
              'Verify your business using one of the options Google offers you (see below).',
              'Once verified, finish your profile: hours, photos, services or menu, and a description.',
            ],
          },
        ],
      },
      {
        heading: 'Working from home? Set up a service-area business',
        blocks: [
          {
            p: 'You don’t need a shop to be on Google Maps. If you deliver, travel to customers or work online — a home baker who delivers, a mobile hairdresser, a cleaning service, a freelance designer — you can create a service-area business. Google’s rules say that if you don’t have a storefront where you receive customers, you must hide your address. Your profile then shows the areas you serve instead, and you can add up to 20 of them (for example Kuala Lumpur, Petaling Jaya, Subang Jaya).',
          },
          {
            note: 'Google still asks for your real address during setup to verify you — it just won’t be shown to customers. Virtual offices and addresses you don’t actually operate from aren’t allowed.',
          },
        ],
      },
      {
        heading: 'How verification works',
        blocks: [
          { p: 'Verification proves you really run the business. Google decides which methods you’re offered, based on your business type and details, and you need to verify before you can edit your profile or reply to customers. Options include:' },
          {
            list: [
              'Video recording — a short, continuous video recorded on your phone, usually through Google Maps. New profiles are often asked to verify this way.',
              'Live video call — a Google support agent checks your business with you over video, during your business hours.',
              'Phone or SMS — a code sent to your business number.',
              'Email — a code or link sent to your business email.',
              'Postcard — a code mailed to your address (offered less often).',
            ],
          },
          {
            p: 'For video, Google wants to see three things: where you are (for example the street outside, a nearby sign or your shopfront), your business itself (your equipment, products, tools or workspace), and proof that you manage it (for example unlocking the premises, an employee-only area, or tools only the business would have). Record it in one take. Verification reviews usually take up to 5 business days.',
          },
        ],
      },
      {
        heading: 'After you’re verified: how to show up higher',
        blocks: [
          { p: 'Google says local results are based mainly on relevance, distance and prominence. You can’t change how far people are from you, but you can improve the other two:' },
          {
            list: [
              'Fill in everything — categories, services or menu, hours, description and attributes. A complete profile matches more searches.',
              'Add special hours for public holidays like Hari Raya, Chinese New Year and Deepavali, so customers don’t turn up to a closed shop.',
              'Upload real photos regularly. Profiles with up-to-date photos look active and trustworthy.',
              'Ask happy customers for reviews, and reply to every review — good or bad — politely.',
              'Link to your website, and keep your name, phone and address exactly the same on your website, profile and social media.',
              'Post updates and offers from time to time.',
            ],
          },
        ],
      },
      {
        heading: 'Why your profile needs a website behind it',
        blocks: [
          {
            p: 'Your profile gets you found; your website is what convinces people. It’s where customers check your full menu or services, prices and photos before they call — and a website with clear, matching business details helps Google understand who you are. Read more in [Does my small business need a website?](/guides/does-my-business-need-a-website), or see [what a small-business website costs in Malaysia](/guides/website-cost-malaysia).',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a Google Business Profile free?',
        a: 'Yes. Creating, verifying and managing a Google Business Profile is free. Be careful of anyone who calls claiming you must pay Google to stay listed.',
      },
      {
        q: 'Do I need SSM registration to get on Google Maps?',
        a: 'Google doesn’t ask for SSM registration to create a profile. It does need you to prove you operate the business during verification, for example by showing your location, equipment and something that shows you manage it.',
      },
      {
        q: 'Can I have a Google Business Profile if I work from home?',
        a: 'Yes. Set it up as a service-area business and hide your home address. Your profile will show the areas you serve instead.',
      },
      {
        q: 'Why isn’t my business showing on Google Maps yet?',
        a: 'Usually the profile isn’t verified yet, is still under review, or is new and has few reviews and photos. After verification, complete every section, add photos, collect reviews and make sure it links to your website.',
      },
    ],
    related: [
      { label: 'Website design in Kuala Lumpur', to: '/services/website-design-kuala-lumpur' },
      { label: 'Our pricing', to: '/#pricing' },
    ],
    sources: [
      { label: 'Google — Verify your business on Google', url: 'https://support.google.com/business/answer/7107242' },
      { label: 'Google — Sign up for Business Profile (service areas)', url: 'https://support.google.com/business/answer/10514137' },
      { label: 'Google — Guidelines for representing your business', url: 'https://support.google.com/business/answer/3038177' },
      { label: 'Google — Tips to improve your local ranking', url: 'https://support.google.com/business/answer/7091' },
    ],
  },
  {
    ...meta('com-vs-my-vs-com-my-domain'),
    answer:
      'If your customers are mainly in Malaysia, a .com.my or .my domain tells them you’re local; a .com is the most familiar worldwide and works for any business. A .com.my needs an SSM-registered business or company, while .my is also open to individuals with a MyKad. Whichever you choose, register it in your own name, keep it short and easy to spell, and turn on auto-renew.',
    sections: [
      {
        heading: 'The differences at a glance',
        blocks: [
          {
            table: {
              head: ['', '.com', '.my', '.com.my'],
              rows: [
                ['Who can register', 'Anyone', 'Individuals, businesses and organisations', 'Businesses and companies registered in Malaysia'],
                ['Documents', 'None', 'MyKad (or passport) for individuals; registration documents for businesses', 'SSM registration (e.g. Borang D for a business)'],
                ['Signals', 'Global, familiar', 'Malaysian, short', 'Malaysian business'],
                ['Best for', 'Brands selling beyond Malaysia, or if your .my is taken', 'Malaysian brands that want a short address', 'Registered Malaysian businesses'],
              ],
            },
          },
          {
            note: 'Malaysian domains (.my and .com.my) are managed by MYNIC and sold through accredited registrars, who may ask for supporting documents. Check the current requirements with your registrar before you buy.',
          },
        ],
      },
      {
        heading: 'Which one should you choose?',
        blocks: [
          {
            list: [
              'Your customers are in Malaysia and you’re SSM-registered → .com.my is a safe, familiar choice.',
              'You want a shorter Malaysian address, or you aren’t registered yet → .my.',
              'You sell overseas, or plan to → .com.',
              'Your first choice is taken → try the same name on another extension before changing the name itself.',
            ],
          },
          {
            p: 'If budget allows, it’s worth registering both your .com and your Malaysian domain and pointing one at the other, so no one else can take your name.',
          },
        ],
      },
      {
        heading: 'How to pick a good domain name',
        blocks: [
          {
            list: [
              'Use your business name, so people can guess it.',
              'Keep it short and easy to say out loud — you’ll be spelling it over the phone.',
              'Avoid hyphens, numbers and unusual spellings that people will get wrong.',
              'Check that the matching Instagram, Facebook or TikTok handle is free.',
              'Make sure it isn’t someone else’s brand name.',
            ],
          },
        ],
      },
      {
        heading: 'Register it in your own name',
        blocks: [
          {
            p: 'This is the most important part. Your domain should be registered under your name or your business’s name, with a login you control — not your designer’s or a former staff member’s. If someone else holds it, they control your website and email, and getting it back can be difficult. At UPWRD, the client’s domain is always registered in the client’s name, and you own your website once it’s paid.',
          },
        ],
      },
      {
        heading: 'What a domain costs',
        blocks: [
          {
            p: 'Prices depend on the extension and the registrar, but most common domains cost roughly RM50–150 a year. First-year promotional prices are often lower than renewal prices, so check the renewal price too. The domain is only the address — you also need hosting for the website itself (see our [website cost guide](/guides/website-cost-malaysia)).',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I register a .com.my without SSM registration?',
        a: 'Generally no. A .com.my is meant for registered Malaysian businesses and companies, so registrars ask for SSM documents. Individuals can register a .my with their MyKad, or any .com.',
      },
      {
        q: 'Does a .my domain help me rank on Google in Malaysia?',
        a: 'Google uses country domains like .my as a signal that a site is aimed at that country, which can help with local searches. A .com can still rank well in Malaysia — your content, Google Business Profile and reviews matter much more.',
      },
      {
        q: 'Can I change my domain later?',
        a: 'Yes. Point the old domain at the new one with permanent (301) redirects, so visitors and Google rankings carry over, and update your Google Business Profile and social media links.',
      },
      {
        q: 'What happens if my domain expires?',
        a: 'Your website and any email on that domain stop working. There’s usually a short grace period to renew, but after that someone else can register it. Turn on auto-renew and keep your contact email up to date.',
      },
    ],
    related: [
      { label: 'Website cost in Malaysia', to: '/guides/website-cost-malaysia' },
      { label: 'Our pricing', to: '/#pricing' },
    ],
    sources: [
      { label: 'MYNIC — Domain FAQ', url: 'https://mynic.my/resources/domains/faq' },
      { label: 'Shinjiru — supporting documents for .MY domains', url: 'https://www.shinjiru.com.my/blog/supporting-document-requirement-for-my-domain-registration-full-guide/' },
      { label: 'SSM — .COM.MY domain registration', url: 'https://ssm.com.my/Pages/Domain_Registration.aspx' },
      { label: 'Google Search Central — managing multi-regional sites', url: 'https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites' },
    ],
  },
  {
    ...meta('landing-page-vs-website'),
    answer:
      'A landing page is a single page with one job: get visitors to WhatsApp, call or book you. It suits new businesses, a single service or a campaign, and it’s quicker and cheaper to build. A full business website has separate pages for your services, about, contact and more, gives Google more to show in search, and suits businesses with several services or more to explain. Many businesses start with a landing page and grow it into a full website later.',
    sections: [
      {
        heading: 'The differences at a glance',
        blocks: [
          {
            table: {
              head: ['', 'Landing page', 'Business website'],
              rows: [
                ['Pages', '1 long page', 'Usually 5–8 pages'],
                ['Goal', 'One action (WhatsApp, call, book)', 'Inform, build trust and convert'],
                ['Google', 'Ranks for your name and a few related searches', 'Each page can target its own searches'],
                ['Build time (UPWRD)', 'About 1 week', '3–4 weeks'],
                ['Price (UPWRD)', 'RM1,500', 'from RM3,800'],
                ['Best for', 'New businesses, one service, campaigns', 'Established businesses, several services'],
              ],
            },
          },
        ],
      },
      {
        heading: 'Choose a landing page if…',
        blocks: [
          {
            list: [
              'You’re just starting and need to look professional fast.',
              'You offer one main product or service.',
              'You’re running ads or a promotion and want one clear page to send people to.',
              'Your budget is tight and you’d rather start small and grow.',
            ],
          },
        ],
      },
      {
        heading: 'Choose a full website if…',
        blocks: [
          {
            list: [
              'You offer several services that each deserve their own explanation.',
              'You want to show up on Google for different searches — for example each service or each area you serve.',
              'Customers need more detail before buying: menus, packages, team, case studies or FAQs.',
              'You want room to grow with new pages, guides or an online store.',
            ],
          },
        ],
      },
      {
        heading: 'What to put on a landing page',
        blocks: [
          { p: 'A good landing page answers the questions people have, in the order they have them:' },
          {
            list: [
              'A headline that says what you do and where — “Custom cakes in Petaling Jaya” beats “Welcome”.',
              'A clear button to WhatsApp, call or book, near the top and again at the bottom.',
              'Your main products or services, with prices or “from” prices if you can.',
              'Real photos of your work, products or space.',
              'Reviews or testimonials from real customers.',
              'Location, hours and a map, or the areas you serve.',
              'A short FAQ that handles the usual questions before people ask.',
            ],
          },
        ],
      },
      {
        heading: 'Start small, then grow',
        blocks: [
          {
            p: 'Starting with a landing page isn’t a dead end. The design, copy and photos can be reused when you’re ready for more pages, so you’re building on what you already have. You can see how both work in our [concept sites](/work#concepts), or compare prices on [our pricing](/#pricing).',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Can a landing page rank on Google?',
        a: 'Yes — especially for your business name and a few closely related searches. To show up for many different searches (each service, each area), you’ll want separate pages, which is where a full website helps.',
      },
      {
        q: 'Is a landing page the same as a link-in-bio page?',
        a: 'No. A link-in-bio page is a list of links. A landing page explains your business, shows your work and prices, and is built to turn visitors into enquiries on your own domain.',
      },
      {
        q: 'How much does a landing page cost in Malaysia?',
        a: 'At UPWRD a landing page is RM1,500, including copywriting and mobile-first design. See [what websites cost in Malaysia](/guides/website-cost-malaysia) for market ranges.',
      },
    ],
    related: [
      { label: 'Our pricing', to: '/#pricing' },
      { label: 'Website design in Kuala Lumpur', to: '/services/website-design-kuala-lumpur' },
    ],
  },
  {
    ...meta('restaurant-cafe-website-checklist'),
    answer:
      'A good café or restaurant website answers a hungry customer’s questions in seconds: what you serve (a mobile-friendly menu with prices), where you are (map, parking and landmarks), when you’re open, and how to book or order (one-tap WhatsApp, call or delivery links). Add real photos of your food and space, your halal status if you’re certified, and keep every detail matching your Google Business Profile.',
    sections: [
      {
        heading: 'The must-haves',
        blocks: [
          {
            list: [
              'Your menu with prices, readable on a phone.',
              'Address with a Google Maps link, plus parking tips and nearby landmarks or MRT/LRT stations.',
              'Opening hours, including rest days and public holiday hours.',
              'One-tap buttons to WhatsApp, call, reserve or order.',
              'Real photos of your dishes, drinks and space.',
              'Payment options — cash, cards, DuitNow QR or e-wallets — so no one is caught out.',
              'Links to your Instagram, TikTok or Facebook, and your delivery app listings.',
            ],
          },
        ],
      },
      {
        heading: 'Put your menu on the page, not in a PDF',
        blocks: [
          {
            p: 'PDF or photo menus are hard to read on a phone — customers have to download, pinch and zoom. A menu written on the page loads faster, can be searched by Google (so someone looking for “nasi lemak near me” can find your dishes), and is easy to update when prices change.',
          },
        ],
      },
      {
        heading: 'Make booking and ordering one tap',
        blocks: [
          {
            p: 'The easiest setup for most cafés is a WhatsApp button that opens a pre-filled message — “Hi, I’d like to book a table for 4 on Saturday at 7pm.” If you already use a reservation system, link to it directly. Delivery apps are great for reach, but they charge commission on every order, so give regulars a way to order or book with you directly too.',
          },
        ],
      },
      {
        heading: 'Details Malaysian diners look for',
        blocks: [
          {
            list: [
              'Halal status. Only show the halal logo if you hold a valid halal certificate from JAKIM or your state religious authority. “Pork-free” or “no pork, no lard” isn’t the same as halal-certified, so describe it accurately.',
              'Parking — it’s often the first question people ask.',
              'Language — a bilingual menu (English with Bahasa Malaysia or Chinese) if that’s what your customers read.',
              'Dietary info — vegetarian options, spice levels and common allergens.',
              'Private events, catering or festive menus, with a way to enquire.',
            ],
          },
        ],
      },
      {
        heading: 'Keep it in sync with Google',
        blocks: [
          {
            p: 'Most diners find you on Google Maps first, then tap through to your website. Make sure your name, address, phone number and hours match exactly on both — mismatched details confuse customers and Google. Here’s [how to set up your Google Business Profile](/guides/google-business-profile-malaysia).',
          },
        ],
      },
      {
        heading: 'Common mistakes to avoid',
        blocks: [
          {
            list: [
              'Outdated prices or hours — update them whenever they change, especially around festive seasons.',
              'Huge, slow-loading photos that make the site crawl on mobile data.',
              'No way to contact you without scrolling to the very bottom.',
              'Relying only on Instagram, where your menu and hours get buried under new posts.',
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Do I still need a website if I’m on GrabFood or foodpanda?',
        a: 'Delivery apps help people discover you, but they charge commission and you don’t control how you’re shown. A website gives you a place for your full menu, booking and direct orders. More in [Does my business need a website?](/guides/does-my-business-need-a-website).',
      },
      {
        q: 'How much does a restaurant website cost?',
        a: 'At UPWRD, a single-page site is RM1,500 and a full restaurant website starts from RM3,800. See our [restaurant & café website service](/services/restaurant-website-design) for what’s included.',
      },
      {
        q: 'Can I update the menu and prices myself?',
        a: 'Yes. We build menus so you can edit dishes and prices yourself, or our Care Plan can handle updates for you.',
      },
    ],
    related: [
      { label: 'Restaurant & café websites', to: '/services/restaurant-website-design' },
      { label: 'See a café concept site', to: '/concepts/ondeh-bakehouse' },
    ],
  },
]
