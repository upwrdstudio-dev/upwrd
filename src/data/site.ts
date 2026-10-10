export const SITE_URL = 'https://upwrd.vercel.app'

export const CONTACT = {
  email: 'upwrdstudio@gmail.com',
  instagram: '@upwrdstudio',
  instagramUrl: 'https://instagram.com/upwrdstudio',
  /** International format, digits only — used for wa.me links. */
  whatsapp: '60176182724',
  whatsappDisplay: '+60 17-618 2724',
}

export const DEFAULT_WHATSAPP_MESSAGE = "Hi UPWRD! I'm interested in a website for my business."

export function whatsappLink(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`
}
