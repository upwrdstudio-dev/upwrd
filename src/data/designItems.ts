export type DesignItem = {
  title: string
  category: string
  image: string
}

export const designItems: DesignItem[] = [
  { title: '12.12 Sale Banner', category: 'Butcher & Deli', image: '/images/design/butcher-1212sale.jpg' },
  { title: 'Meatballs Promo', category: 'Butcher & Deli', image: '/images/design/butcher-meatballs.jpg' },
  { title: "Mother's Day Campaign", category: 'Butcher & Deli', image: '/images/design/butcher-mothersday.jpg' },
  { title: "Single's Day Sale", category: 'Butcher & Deli', image: '/images/design/butcher-singlesday.jpg' },
  { title: 'Campaign Poster', category: 'Beauty & Wellness', image: '/images/design/ascobeaut-poster.jpg' },
  { title: 'Campaign Banner', category: 'Beauty & Wellness', image: '/images/design/ascobeaut-banner.jpg' },
  { title: 'Sofa Promotion', category: 'Furniture & Home', image: '/images/design/ecofoya-sofa.jpg' },
  { title: 'Mattress Promotion', category: 'Furniture & Home', image: '/images/design/ecofoya-mattress.jpg' },
  { title: 'Custom Cabinetry Poster', category: 'Furniture & Home', image: '/images/design/cabinetry-poster.jpg' },
  { title: 'Product Packaging', category: 'Packaging Design', image: '/images/design/mrpig-packaging.jpg' },
  { title: 'Blind Box Packaging', category: 'Packaging Design', image: '/images/design/pigking-packaging.jpg' },
  { title: 'Promo Poster', category: 'Packaging Design', image: '/images/design/pigking-promo.jpg' },
  { title: 'Packaging Set', category: 'Packaging Design', image: '/images/design/pigking-boxes.jpg' },
  { title: 'Packaging Set', category: 'Packaging Design', image: '/images/design/pigking-lurou-packaging.jpg' },
  { title: 'Packaging Set', category: 'Packaging Design', image: '/images/design/pigking-curry-packaging.jpg' },
  { title: 'Packaging Set', category: 'Packaging Design', image: '/images/design/pigking-rendang-packaging.jpg' },
  { title: 'Packaging Set', category: 'Packaging Design', image: '/images/design/pigking-soup-packaging.jpg' },
  { title: 'Packaging Set', category: 'Packaging Design', image: '/images/design/pigking-blackvinegar-packaging.jpg' },
]

export function shuffle<T>(array: T[]) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}