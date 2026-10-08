# UPWRD Studio — Website

Built with React + TypeScript + Tailwind CSS (Vite), animated with Framer Motion, GSAP ScrollTrigger and Lenis smooth scroll.

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

## Structure

```
src/
  components/
    home/            — homepage sections (Hero, Services, Work, Process, Pricing, FAQ…)
    Logo.tsx         — the UPWRD mark + wordmark (single source for the logo geometry)
    Nav.tsx          — floating nav + mobile menu
    Footer.tsx       — contact section + footer
    Preloader.tsx    — first-visit intro (once per session)
    RouteCurtain.tsx — page-change transition
  data/
    projects.ts      — website portfolio
    designItems.ts   — design portfolio images
    site.ts          — email, Instagram, site URL
  pages/             — Home, Work, Design, 404
public/brand/        — logo files (SVG), app icon, social share image
```

## Editing content

- **Portfolio projects:** edit `src/data/projects.ts` (screenshots go in `public/images/`)
- **Design work:** edit `src/data/designItems.ts` (images go in `public/images/design/`)
- **Contact details:** edit `src/data/site.ts`
- **Services / pricing / FAQ copy:** the arrays at the top of each file in `src/components/home/`

## Brand

- Colours: Ink `#0A0A0A`, Paper `#F3F3EF`, Electric blue `#3651FF`
- Type: Geist (headings & body), Instrument Serif italic (accent words), Geist Mono (labels)
- Logo files: `public/brand/` — `upwrd-logo.svg` (for light backgrounds), `upwrd-logo-white.svg` (dark),
  `upwrd-mark.svg` / `upwrd-mark-white.svg` (symbol only), `upwrd-app-icon.png` (profile pictures, app icon)
