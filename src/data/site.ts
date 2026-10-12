export const SITE_URL = 'https://upwrdstudio.com'

export const CONTACT = {
  email: 'upwrdstudio@gmail.com',
  instagram: '@upwrdstudio',
  instagramUrl: 'https://instagram.com/upwrdstudio',
  /** Google Business Profile (opens the profile panel in Google Search). */
  googleProfileUrl:
    'https://www.google.com/search?q=UPWRD+Studio&stick=H4sIAAAAAAAA_-NgU1I1qLAwsTS2NE02sUhLMUtNNTC2MqgwTTRLM08zSbNINDC2TLM0WMTKE1pQXpSiEFxSmpKZDwBPfCdmOAAAAA',
  /** International format, digits only — used for wa.me links. */
  whatsapp: '60176182724',
  whatsappDisplay: '+60 17-618 2724',
}

export const DEFAULT_WHATSAPP_MESSAGE = "Hi UPWRD! I'm interested in a website for my business."

export function whatsappLink(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`
}
