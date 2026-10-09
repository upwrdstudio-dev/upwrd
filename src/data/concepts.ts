import type { Project } from './projects'

// Self-initiated concept sites for fictional businesses. They live at
// /concepts/<slug> and are noindexed; the card screenshots are generated
// from the live pages.
export const concepts: Project[] = [
  {
    name: 'Ondeh Bakehouse',
    category: 'Concept · Café & bakery',
    desc: 'A Malaysian–French bakehouse: live menu tabs, WhatsApp pre-orders and a warm, editorial feel.',
    tags: ['Concept', 'F&B', 'Ordering'],
    url: '/concepts/ondeh-bakehouse',
    image: '/images/concepts/ondeh-bakehouse.jpg',
  },
  {
    name: 'Halia House',
    category: 'Concept · Spa & skin studio',
    desc: 'A calm, image-led spa site with an interactive booking picker and treatment previews.',
    tags: ['Concept', 'Beauty', 'Booking'],
    url: '/concepts/halia-house',
    image: '/images/concepts/halia-house.jpg',
  },
  {
    name: 'Northline Advisory',
    category: 'Concept · Accounting & tax',
    desc: 'A trust-first site for an SME accounting firm, with a live SME tax estimator and fixed-fee plans.',
    tags: ['Concept', 'Professional services', 'Calculator'],
    url: '/concepts/northline-advisory',
    image: '/images/concepts/northline-advisory.jpg',
  },
]
