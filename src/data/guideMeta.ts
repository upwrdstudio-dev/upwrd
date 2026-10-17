// Lightweight index of the guides (titles and summaries only), so pages that
// just list or link to guides don't download every guide's full text.

export type GuideMeta = {
  slug: string
  /** Short label for cards and breadcrumbs. */
  label: string
  title: string
  summary: string
  published: string
  updated: string
  readMins: number
}

export const guideMeta: GuideMeta[] = [
  {
    slug: 'website-cost-malaysia',
    label: 'Website cost in Malaysia',
    title: 'How much does a website cost in Malaysia? (2026 guide)',
    summary: 'Real price ranges for landing pages, business websites and online stores in Malaysia — plus the hidden costs most quotes leave out.',
    published: '2026-10-13',
    updated: '2026-10-13',
    readMins: 6,
  },
  {
    slug: 'does-my-business-need-a-website',
    label: 'Does my business need a website?',
    title: 'Does my small business need a website in 2026?',
    summary: 'Social media is great for reach — but here’s why most small businesses still need a website, and what a good one needs to do.',
    published: '2026-10-13',
    updated: '2026-10-13',
    readMins: 5,
  },
  {
    slug: 'wordpress-vs-wix-vs-custom',
    label: 'WordPress vs Wix vs custom',
    title: 'WordPress vs Wix vs a custom-coded website: which is right for your business?',
    summary: 'A plain-language comparison of the three most common ways to build a small-business website — cost, ownership, flexibility and upkeep.',
    published: '2026-10-13',
    updated: '2026-10-13',
    readMins: 6,
  },
  {
    slug: 'google-business-profile-malaysia',
    label: 'Get on Google Maps',
    title: 'How to get your business on Google Maps in Malaysia (Google Business Profile guide)',
    summary: 'Set up and verify a free Google Business Profile step by step — including what to do if you work from home or don’t have a shop.',
    published: '2026-10-15',
    updated: '2026-10-15',
    readMins: 7,
  },
  {
    slug: 'com-vs-my-vs-com-my-domain',
    label: '.com vs .my vs .com.my',
    title: '.com vs .my vs .com.my: which domain should a Malaysian business choose?',
    summary: 'The differences between .com, .my and .com.my domains, who can register each one, and how to pick a good domain name for your business.',
    published: '2026-10-15',
    updated: '2026-10-15',
    readMins: 5,
  },
  {
    slug: 'landing-page-vs-website',
    label: 'Landing page vs full website',
    title: 'Landing page vs full website: which does your small business need?',
    summary: 'What a one-page landing page can and can’t do, when a multi-page website is worth it, and what to put on each.',
    published: '2026-10-15',
    updated: '2026-10-15',
    readMins: 5,
  },
  {
    slug: 'restaurant-cafe-website-checklist',
    label: 'Café & restaurant website checklist',
    title: 'What should a café or restaurant website have? A checklist for Malaysian F&B',
    summary: 'The must-haves for a café, restaurant or bakery website in Malaysia — menu, location, booking, halal status and the mistakes to avoid.',
    published: '2026-10-15',
    updated: '2026-10-15',
    readMins: 6,
  },
]
