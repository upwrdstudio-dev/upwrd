export type Project = {
  name: string
  category: string
  desc: string
  tags: string[]
  url: string
  image: string
}

export const projects: Project[] = [
  {
    name: 'Chi Hao (吃好)',
    category: 'Chinese restaurant · TTDI',
    desc: 'WhatsApp-integrated reservations, bilingual branding and a private dining showcase.',
    tags: ['Website', 'Bilingual', 'Reservations'],
    url: 'https://www.chihao.my/',
    image: '/images/chihao.jpg',
  },
  {
    name: 'Justwine',
    category: 'Wine bar & live music',
    desc: 'Editorial dark design with a chef feature and a gallery-driven layout.',
    tags: ['Website', 'Editorial', 'Gallery'],
    url: 'https://thebrickjw.my/',
    image: '/images/justwine.jpg',
  },
  {
    name: 'Virtue Trustee Berhad',
    category: 'Corporate trust services',
    desc: 'Multilingual site with FAQ-driven trust content and a full service breakdown.',
    tags: ['Corporate', 'Multilingual', 'Content'],
    url: 'https://virtuetrustee.my/',
    image: '/images/virtuetrustee.jpg',
  },
]
