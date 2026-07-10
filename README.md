# UPWRD Studio — Website

Built with React + TypeScript + Tailwind CSS (Vite).

## Run locally

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Build for production

```bash
npm run build
```

Output goes to the `dist/` folder — upload that to any static host
(Vercel, Netlify, Cloudflare Pages, or your own server).

## Deploying

**Vercel / Netlify (easiest):**
1. Push this folder to a GitHub repo
2. Import the repo on vercel.com or netlify.com
3. Build command: `npm run build`, output directory: `dist`

## Structure

```
src/
  components/
    Nav.tsx        — sticky nav bar
    Hero.tsx        — hero section with node-network signature graphic
    NodeNetwork.tsx — the animated SVG signature element
    Services.tsx    — 3 service cards (Web / Automation / Design)
    Portfolio.tsx   — 4 real client projects with screenshots
    Process.tsx     — Discover → Build → Grow steps
    Pricing.tsx     — pricing teaser + Digital Foundation bundle CTA
    Contact.tsx     — footer with email + Instagram
  App.tsx           — assembles all sections
  index.css         — Tailwind directives + base styles
```

## Editing content

- **Portfolio projects:** edit the `projects` array in `src/components/Portfolio.tsx`
- **Services copy:** edit the `services` array in `src/components/Services.tsx`
- **Pricing numbers:** edit the `tiers` array in `src/components/Pricing.tsx`
- **Contact details:** edit `src/components/Contact.tsx`
- **Brand colors:** edit `tailwind.config.ts` (navy / teal / ink / cream tokens)

## Notes

- Portfolio screenshots live in `public/images/` — replace with higher-res
  or updated screenshots any time by swapping the file with the same name.
- Fonts (Space Grotesk, Inter, IBM Plex Mono) load from Google Fonts in
  `index.html` — no local font files needed.
- Fully responsive down to mobile, keyboard-navigable, and respects
  `prefers-reduced-motion`.
