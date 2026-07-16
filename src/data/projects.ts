export type Project = {
  name: string
  desc: string
  url: string
  image: string
}

export const projects: Project[] = [
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