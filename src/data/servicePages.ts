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
  /** Copy only this page has, so it isn't just the shared template. */
  details?: { heading: string; body: string[] }
  /** Guide slugs (guideMeta.ts) to link from this page. */
  guides?: string[]
}

export const servicePages: ServicePage[] = [
  {
    slug: 'website-design-kuala-lumpur',
    guides: ['website-cost-malaysia', 'does-my-business-need-a-website', 'wordpress-vs-wix-vs-custom'],
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
    details: {
      heading: 'Built around how people choose where to eat',
      body: [
        'Most diners decide in a few minutes on their phone. They check your menu and prices, look at the photos, see whether you’re open and work out where to park. If any of that is hard to find, they move on to the next place on Google Maps. A good restaurant website answers those questions straight away, then makes booking or ordering a single tap.',
        'We built Chi Hao (吃好), a Chinese restaurant in TTDI, with WhatsApp reservations, bilingual branding and a private dining showcase, and Justwine, a wine bar with live music, with an editorial design, a chef feature and a photo gallery. Ondeh Bakehouse is a concept we designed to show how a café can take pre-orders on WhatsApp.',
        'Need menus, posters or social media posts too? We design them in the same style as your website, so your brand looks the same from Instagram to the table.',
      ],
    },
    guides: ['restaurant-cafe-website-checklist', 'website-cost-malaysia', 'google-business-profile-malaysia'],
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
      {
        q: 'Should our menu be a PDF?',
        a: 'We recommend a menu written on the page instead. PDFs are slow to open and awkward to read on a phone. A menu on the page loads faster, reads well on any screen and is quicker to update when prices change.',
      },
      {
        q: 'Can the website show our halal status?',
        a: 'Yes. If you hold a valid halal certificate from JAKIM or your state religious authority, we display it clearly. If you’re pork-free but not certified, we describe that accurately instead.',
      },
      {
        q: 'Can our website and menu be in more than one language?',
        a: 'Yes. We can set up your menu and key pages in English plus Chinese or Bahasa Malaysia, depending on who your customers are.',
      },
    ],
    whatsapp: "Hi UPWRD! I'm interested in a website for my restaurant/café.",
  },
  {
    slug: 'spa-salon-website-design',
    guides: ['google-business-profile-malaysia', 'landing-page-vs-website', 'website-cost-malaysia'],
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
      { title: 'Matching social design', body: 'Social media posts for your promotions that match your website — from RM 800/month for 8 posts.' },
    ],
    work: ['Halia House'],
    price: { label: 'Spa or salon website', value: 'from RM 3,800', note: 'Matching social media design from RM 800/month' },
    faqs: [
      {
        q: 'Can customers book appointments on the website?',
        a: 'Yes — through a pre-filled WhatsApp booking message, or by connecting an online booking system if you already use one.',
      },
      {
        q: 'Can we update treatments and prices ourselves?',
        a: 'Yes. The site is built so you can edit treatments, prices and promotions yourself — or our Care Plan can handle updates for you.',
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
    guides: ['does-my-business-need-a-website', 'com-vs-my-vs-com-my-domain', 'website-cost-malaysia'],
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
        a: 'Enquiries go straight to your email or WhatsApp, so the right person sees them right away.',
      },
    ],
    whatsapp: "Hi UPWRD! I'm interested in a website for our firm.",
  },
  {
    slug: 'ecommerce-website-malaysia',
    guides: ['website-cost-malaysia', 'com-vs-my-vs-com-my-domain', 'wordpress-vs-wix-vs-custom'],
    label: 'E-commerce Websites',
    eyebrow: 'Online stores · Malaysia',
    heading: 'E-commerce website',
    headingAccent: 'design in Malaysia.',
    intro:
      'Online stores for Malaysian businesses, where customers can browse your products and pay you directly with FPX online banking or card, on a store you can manage yourself.',
    includesTitle: 'Every online store includes',
    includes: [
      { title: 'FPX & card payments', body: 'Customers pay by FPX online banking or card through a Malaysian payment gateway.' },
      { title: 'Products you manage', body: 'Add products, update prices and stock, and run promotions yourself.' },
      { title: 'Delivery & pickup', body: 'Shipping rates, delivery areas or self-pickup, set up the way you sell.' },
      { title: 'Mobile-first checkout', body: 'A short, simple checkout designed for phones, where most people shop.' },
      { title: 'Order management', body: 'New orders and customer details in one place, with a walkthrough at handover.' },
      { title: 'Google-ready SEO', body: 'Product and category pages set up so people can find them on Google.' },
    ],
    work: [],
    price: { label: 'Online store', value: 'from RM 6,500', note: 'Usually 6–8 weeks · Care Plan from RM 150/month' },
    faqs: [
      {
        q: 'Can customers pay with FPX online banking?',
        a: 'Yes. We connect a Malaysian payment gateway so customers can pay by FPX online banking or card. Many gateways also support e-wallets, depending on the one you choose.',
      },
      {
        q: 'What do I need to accept online payments?',
        a: 'Payment gateways usually ask for your SSM business registration and a business bank account. We check what you need before we start, so there are no surprises at launch.',
      },
      {
        q: 'Should I sell on Shopee or Lazada instead?',
        a: 'Marketplaces are good for reach, but they charge fees on each sale and your products sit next to your competitors’. Your own store gives you your own branding and customer list, with only payment gateway fees. Many businesses use both.',
      },
      {
        q: 'Can I manage products and orders myself?',
        a: 'Yes. You can add products, change prices and stock, and manage orders yourself, and we walk you through it at handover.',
      },
      {
        q: 'How long does an online store take?',
        a: 'Usually 6–8 weeks, depending on how many products you have and how quickly photos and product details come in.',
      },
    ],
    whatsapp: "Hi UPWRD! I'm interested in an online store for my business.",
  },
  {
    slug: 'website-redesign-malaysia',
    guides: ['wordpress-vs-wix-vs-custom', 'website-cost-malaysia', 'google-business-profile-malaysia'],
    label: 'Website Redesign',
    eyebrow: 'Website redesign · Malaysia',
    heading: 'Website redesign',
    headingAccent: 'for Malaysian businesses.',
    intro:
      'Is your website slow, dated or hard to use on a phone? We redesign it to load fast, look like your business today and turn visitors into WhatsApp enquiries, while protecting what already works: your domain, your best content and the pages Google already knows.',
    includesTitle: 'Every redesign includes',
    includes: [
      { title: 'An honest look first', body: 'We review your current site and tell you what is working, what is costing you enquiries, and whether you need a redesign or just a few fixes.' },
      { title: 'Mobile-first design', body: 'Rebuilt for the phones most of your visitors use, with buttons that are easy to tap.' },
      { title: 'Faster loading', body: 'Lighter pages and properly sized images, so visitors don’t give up before it loads.' },
      { title: 'Clearer copy', body: 'We rewrite the key pages so people understand what you do, where you are and how to reach you.' },
      { title: 'Google rankings protected', body: 'Your domain stays, and any page whose address changes gets a permanent redirect.' },
      { title: 'Easy to update', body: 'Built on a system you can edit yourself, with a walkthrough at handover.' },
    ],
    work: ['Chi Hao (吃好)', 'Justwine', 'Virtue Trustee Berhad'],
    price: { label: 'Website redesign', value: 'from RM 1,500', note: 'RM 1,500 for a one-page site · from RM 3,800 for a full business website' },
    faqs: [
      {
        q: 'Will I lose my Google rankings if I redesign my website?',
        a: 'Not if it’s done carefully. We keep your domain, carry over the content that works, and set up permanent (301) redirects for any page whose address changes, so visitors and Google land in the right place.',
      },
      {
        q: 'Can you redesign a WordPress or Wix website?',
        a: 'Yes. We can rebuild it on WordPress, which you can edit yourself and move to any host. Wix sites can’t be exported, so moving from Wix means rebuilding the pages, but your domain comes with you.',
      },
      {
        q: 'How do I know if my website needs a redesign?',
        a: 'Common signs: it’s hard to use on a phone, it loads slowly, the information is out of date, or visitors rarely contact you. Send us the link and we’ll tell you honestly whether you need a redesign or just a few fixes.',
      },
      {
        q: 'How long does a redesign take?',
        a: 'About a week for a one-page site and 3–4 weeks for a full business website, depending on how quickly content and feedback come in.',
      },
    ],
    whatsapp: "Hi UPWRD! I'd like to redesign my website.",
  },
  {
    slug: 'landing-page-design-malaysia',
    guides: ['landing-page-vs-website', 'website-cost-malaysia', 'does-my-business-need-a-website'],
    label: 'Landing Page Design',
    eyebrow: 'Landing pages · Malaysia',
    heading: 'Landing page design',
    headingAccent: 'in Malaysia.',
    intro:
      'One focused page that tells people what you do, shows why they should trust you, and gets them to WhatsApp, call or book you. Ideal for a new business, a single service or a promotion.',
    includesTitle: 'Every landing page includes',
    includes: [
      { title: 'Mobile-first design', body: 'Designed for phones first, where most people will see it.' },
      { title: 'WhatsApp & enquiry buttons', body: 'One-tap ways to reach you, near the top and again at the end.' },
      { title: 'Google Maps & basic SEO', body: 'Your location, page title and description set up so people can find you.' },
      { title: 'Copywriting included', body: 'We write the words and structure the page. You review and approve.' },
      { title: 'Ready in about a week', body: 'Quick to launch, so you can start sending people to it straight away.' },
      { title: 'Room to grow', body: 'The design, copy and photos carry over if you later want a full website.' },
    ],
    work: ['Ondeh Bakehouse', 'Halia House'],
    price: { label: 'Landing page', value: 'RM 1,500', note: 'About 1 week · copywriting included' },
    faqs: [
      {
        q: 'What is the difference between a landing page and a website?',
        a: 'A landing page is one page with one goal, such as getting WhatsApp enquiries. A business website has separate pages for your services, about and contact, and can show up for more searches on Google. Many businesses start with a landing page and grow it later.',
      },
      {
        q: 'Can a landing page show up on Google?',
        a: 'Yes, especially for your business name and a few closely related searches. Every landing page is set up with a page title, description and Google Maps link from day one.',
      },
      {
        q: 'Can I run ads to my landing page?',
        a: 'Yes. A focused landing page is a good place to send Facebook, Instagram or Google ads, because every visitor sees one clear message and one way to act.',
      },
      {
        q: 'Can I add more pages later?',
        a: 'Yes. When you’re ready, the design, copy and photos carry over into a full business website.',
      },
    ],
    whatsapp: "Hi UPWRD! I'm interested in a landing page for my business.",
  },
  {
    slug: 'social-media-design-malaysia',
    guides: ['google-business-profile-malaysia', 'does-my-business-need-a-website', 'restaurant-cafe-website-checklist'],
    label: 'Social Media Design',
    eyebrow: 'Social media design · Malaysia',
    heading: 'Social media design',
    headingAccent: 'for Malaysian businesses.',
    intro:
      'On-brand posts for your Instagram and Facebook, designed every month, so your social media looks as professional as your website and you’re never stuck for something to post.',
    includesTitle: 'Social media design includes',
    includes: [
      { title: '8 posts a month', body: 'A steady flow of on-brand posts, ready to publish, for RM 800 a month.' },
      { title: 'Matches your website', body: 'Your colours, fonts and style, so your socials and website look like one brand.' },
      { title: 'Made for Malaysian audiences', body: 'In English, Bahasa Malaysia or Chinese, for your promotions, new products and festive seasons.' },
      { title: 'Single designs too', body: 'Need just one post, banner or poster? Single designs start from RM 150.' },
      { title: 'Menus, posters & packaging', body: 'Print and packaging design available on request, in the same style.' },
      { title: 'Pairs with a website', body: 'Get a Business Website plus three months of social design in the Digital Foundation bundle.' },
    ],
    work: [],
    price: { label: 'Social media design', value: 'RM 800/month', note: '8 posts a month · single designs from RM 150' },
    faqs: [
      {
        q: 'How much does social media design cost?',
        a: 'RM 800 a month for 8 posts, or from RM 150 for a single design. Menus, posters and packaging are available on request.',
      },
      {
        q: 'Can you match our website and brand?',
        a: 'Yes. Posts use your colours, fonts and style, so your social media and website look like the same brand. If we’re also building your website, both are designed together.',
      },
      {
        q: 'Is there a bundle with a website?',
        a: 'Yes. The Digital Foundation bundle is a Business Website plus three months of social media design (8 posts a month) for RM 5,200.',
      },
      {
        q: 'Where can I see examples?',
        a: 'Our design portfolio at upwrdstudio.com/design shows social media, campaign and packaging work for Malaysian brands.',
      },
    ],
    whatsapp: "Hi UPWRD! I'm interested in monthly social media design.",
  },
]
