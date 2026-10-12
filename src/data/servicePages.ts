// Content for the SEO landing pages at /services/<slug>. Each targets a
// search real customers make; titles/descriptions for <head> live in
// pageMeta.json under the same path.

export type ServicePage = {
  slug: string
  /** Short label used in links and breadcrumbs. */
  label: string
  eyebrow: string
  /** H1 — contains the search phrase the page targets. */
  heading: string
  headingAccent: string
  intro: string
  includesTitle: string
  includes: { title: string; body: string }[]
  /** Names from projects.ts / concepts.ts to show as relevant work. */
  work: string[]
  price: { label: string; value: string; note: string }
  faqs: { q: string; a: string }[]
  whatsapp: string
}

export const servicePages: ServicePage[] = [
  {
    slug: 'website-design-kuala-lumpur',
    label: 'Website Design Kuala Lumpur',
    eyebrow: 'Website design · Kuala Lumpur',
    heading: 'Website design in',
    headingAccent: 'Kuala Lumpur.',
    intro:
      'UPWRD Studio designs and builds fast, mobile-friendly websites for small and medium businesses in Kuala Lumpur and the Klang Valley — sites that turn visitors into WhatsApp enquiries, rank on Google, and are easy for your team to update.',
    includesTitle: 'Every website includes',
    includes: [
      { title: 'Mobile-first design', body: 'Most of your customers find you on their phone, so every page is designed for small screens first.' },
      { title: 'WhatsApp enquiries', body: 'Clear WhatsApp and enquiry buttons on every page, so interested customers reach you in one tap.' },
      { title: 'Google-ready SEO', body: 'Page titles, descriptions, sitemap, Google Maps and Google Business Profile links set up from day one.' },
      { title: 'Copywriting included', body: 'We write the words and structure the pages — you just review and approve.' },
      { title: 'Easy to update', body: 'Built on a system you can edit yourself, with a walkthrough at handover.' },
      { title: 'You own it', body: 'Your domain is registered in your name and the site is fully yours once paid.' },
    ],
    work: ['Chi Hao (吃好)', 'Justwine', 'Virtue Trustee Berhad'],
    price: { label: 'Business Website', value: 'from RM 3,800', note: 'Landing pages from RM 1,500 · online stores from RM 6,500' },
    faqs: [
      {
        q: 'How much does a website cost in Kuala Lumpur?',
        a: 'With UPWRD, a landing page is RM 1,500, a 5–8 page business website starts from RM 3,800 and an online store from RM 6,500. You get a fixed quote before we start.',
      },
      {
        q: 'Do you only work with businesses in Kuala Lumpur?',
        a: 'We’re based in Kuala Lumpur and work mostly with businesses across the Klang Valley, but most projects run on WhatsApp and video calls, so we can work with businesses anywhere in Malaysia.',
      },
      {
        q: 'How long does it take to build a website?',
        a: 'About a week for a landing page, 3–4 weeks for a business website and 6–8 weeks for an online store, depending on how quickly content and feedback come in.',
      },
      {
        q: 'Will my website show up on Google?',
        a: 'Every site is set up with the technical SEO Google needs, plus a sitemap and Google Business Profile link. Ranking also depends on competition, content and reviews — we’ll tell you honestly what it takes in your industry.',
      },
    ],
    whatsapp: "Hi UPWRD! I'm looking for a website for my business in KL.",
  },
  {
    slug: 'restaurant-website-design',
    label: 'Restaurant & Café Websites',
    eyebrow: 'For restaurants, cafés & bars',
    heading: 'Restaurant & café website',
    headingAccent: 'design in Malaysia.',
    intro:
      'Websites for restaurants, cafés, bakeries and bars that make it easy to see the menu, find you on the map and book or order on WhatsApp — designed to look as good as your food.',
    includesTitle: 'Built for F&B',
    includes: [
      { title: 'Menu that’s easy to update', body: 'A clear, mobile-friendly menu with prices and photos — no more blurry PDF menus.' },
      { title: 'Reservations & orders', body: 'Book a table or pre-order on WhatsApp in one tap, with the message already filled in.' },
      { title: 'Location & hours', body: 'Google Maps, opening hours and parking info where hungry customers expect them.' },
      { title: 'Bilingual content', body: 'English with Chinese or Bahasa Malaysia where your customers need it.' },
      { title: 'Private dining & events', body: 'Pages for private rooms, catering, live music or event bookings.' },
      { title: 'Photo-led design', body: 'A layout that lets your dishes and space do the selling.' },
    ],
    work: ['Chi Hao (吃好)', 'Justwine', 'Ondeh Bakehouse'],
    price: { label: 'Restaurant website', value: 'from RM 3,800', note: 'Single-page sites from RM 1,500' },
    faqs: [
      {
        q: 'Can customers book a table or order through the website?',
        a: 'Yes. The simplest option is a WhatsApp button that opens a pre-filled booking or order message. We can also connect a booking system if you already use one.',
      },
      {
        q: 'Can I update the menu and prices myself?',
        a: 'Yes. Your menu is built so you can edit dishes and prices yourself, or our Care Plan can handle updates for you.',
      },
      {
        q: 'Do I still need a website if I have Instagram and GrabFood?',
        a: 'Those are great for discovery, but a website is what shows up when people Google your name — with your menu, hours, location and booking in one place you control, without platform commission.',
      },
    ],
    whatsapp: "Hi UPWRD! I'm interested in a website for my restaurant/café.",
  },
  {
    slug: 'spa-salon-website-design',
    label: 'Spa & Salon Websites',
    eyebrow: 'For spas, salons & beauty studios',
    heading: 'Spa & salon website',
    headingAccent: 'design in Malaysia.',
    intro:
      'Calm, image-led websites for spas, salons, aesthetic and beauty studios — where customers can browse treatments, check prices and book in a few taps instead of going back and forth on DM.',
    includesTitle: 'Built for beauty & wellness',
    includes: [
      { title: 'Treatment menu', body: 'Every treatment with duration, price and a short description, easy to browse on mobile.' },
      { title: 'Easy booking', body: 'Book on WhatsApp in one tap, or connect the booking system you already use.' },
      { title: 'Packages & memberships', body: 'Pages for packages, memberships and promotions that you can update yourself.' },
      { title: 'Instagram-quality visuals', body: 'A design that matches the look and feel of your space and your feed.' },
      { title: 'Reviews & trust', body: 'Space for testimonials and Google reviews, which matter most in this industry.' },
      { title: 'Automated reminders', body: 'Optional AI automation for appointment reminders and follow-ups, so fewer no-shows.' },
    ],
    work: ['Halia House'],
    price: { label: 'Spa or salon website', value: 'from RM 3,800', note: 'Booking reminders via AI Automation from RM 1,200' },
    faqs: [
      {
        q: 'Can customers book appointments on the website?',
        a: 'Yes — through a pre-filled WhatsApp booking message, or by connecting an online booking system if you already use one.',
      },
      {
        q: 'Can you send automatic appointment reminders?',
        a: 'Yes. Our AI Automation service can send reminders and follow-ups automatically, which helps reduce no-shows.',
      },
      {
        q: 'Do you also design our social media posts?',
        a: 'Yes. Social media design is available at RM 800/month for 8 posts, designed to match your website.',
      },
    ],
    whatsapp: "Hi UPWRD! I'm interested in a website for my spa/salon.",
  },
  {
    slug: 'professional-services-website-design',
    label: 'Professional Services Websites',
    eyebrow: 'For accounting, legal & advisory firms',
    heading: 'Websites for professional',
    headingAccent: 'services firms.',
    intro:
      'Trust-first websites for accounting firms, law firms, trust companies and consultancies — clear services, credible content and an easy way for prospective clients to get in touch.',
    includesTitle: 'Built to build trust',
    includes: [
      { title: 'Clear service pages', body: 'Each service explained in plain language, so clients understand what you do before they call.' },
      { title: 'FAQ-driven content', body: 'Answer the questions clients ask most — which also helps you show up on Google.' },
      { title: 'Multilingual', body: 'English, Bahasa Malaysia and Chinese where your clients need it.' },
      { title: 'Lead capture', body: 'Enquiry forms and WhatsApp buttons that go straight to the right person.' },
      { title: 'Interactive tools', body: 'Calculators and estimators that keep visitors engaged and show your expertise.' },
      { title: 'Professional design', body: 'A calm, credible look that reflects how you work with clients.' },
    ],
    work: ['Virtue Trustee Berhad', 'Northline Advisory'],
    price: { label: 'Firm website', value: 'from RM 3,800', note: 'Fixed quote agreed before we start' },
    faqs: [
      {
        q: 'Can the website be in more than one language?',
        a: 'Yes. We’ve built multilingual sites for corporate clients and can set up English, Bahasa Malaysia and Chinese versions.',
      },
      {
        q: 'Can you build a calculator or estimator for our site?',
        a: 'Yes — like the SME tax estimator in our Northline Advisory concept. Interactive tools keep visitors on your site and make your expertise tangible.',
      },
      {
        q: 'Can enquiries go directly into our system?',
        a: 'Enquiries can go to email or WhatsApp, and with AI Automation we can route them into a CRM, spreadsheet or calendar.',
      },
    ],
    whatsapp: "Hi UPWRD! I'm interested in a website for our firm.",
  },
  {
    slug: 'ai-automation-malaysia',
    label: 'AI Automation for SMEs',
    eyebrow: 'AI automation · Malaysia',
    heading: 'AI automation for',
    headingAccent: 'Malaysian SMEs.',
    intro:
      'We take repetitive admin off your team’s plate — reminders, follow-ups, invoices and replies to common questions — with automations built in n8n and AI that run quietly in the background.',
    includesTitle: 'What we automate',
    includes: [
      { title: 'Booking reminders', body: 'Automatic WhatsApp or email reminders before appointments, so fewer no-shows.' },
      { title: 'Invoice follow-ups', body: 'Polite, automatic payment reminders until invoices are paid.' },
      { title: 'Auto-replies', body: 'Instant answers to common questions on email and chat, handing over to you when needed.' },
      { title: 'Lead routing', body: 'New enquiries from your website saved to a spreadsheet or CRM and sent to the right person.' },
      { title: 'Reports & summaries', body: 'Daily or weekly summaries of bookings, sales or enquiries, sent to you automatically.' },
      { title: 'Custom workflows', body: 'Multi-step workflows connecting the tools you already use.' },
    ],
    work: [],
    price: { label: 'AI Automation', value: 'from RM 1,200', note: 'Per workflow · scoped with you before we start' },
    faqs: [
      {
        q: 'What is AI automation?',
        a: 'Software that handles repetitive tasks for you — sending reminders, following up on invoices, replying to common questions or moving data between tools — without someone doing it by hand.',
      },
      {
        q: 'Do I need to change the tools I already use?',
        a: 'Usually not. We connect the tools you already have, like WhatsApp, Gmail, Google Sheets and your calendar.',
      },
      {
        q: 'How do I know if automation is worth it?',
        a: 'If your team sends the same messages or does the same admin every day, it’s a good candidate. We’ll look at your workflow and tell you honestly what’s worth automating.',
      },
    ],
    whatsapp: "Hi UPWRD! I'm interested in AI automation for my business.",
  },
]
