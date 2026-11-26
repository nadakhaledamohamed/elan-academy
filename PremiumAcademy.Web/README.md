# PremiumAcademy.Web — Élan Academy frontend

Next.js (App Router, static export) · TypeScript · Tailwind CSS · Framer Motion · GSAP ScrollTrigger · Lenis · next-intl · next-themes.

## Run

```bash
npm install
npm run dev        # http://localhost:3000  (redirects to /en/ or /ar/)
npm run build      # writes the static site to ./out
npm run start      # serves ./out locally
```

Requires Node 20 or newer. TypeScript is pinned to 5.x because Next.js 15 does not load its config with TypeScript 7.

## Where things live

| Path | Purpose |
| --- | --- |
| `messages/en.json`, `messages/ar.json` | Every visible string, one file per language |
| `src/content/site.ts` | Contact details, courses, plans and prices (replaced by API data in Stage 3) |
| `src/app/globals.css` | Design tokens for both themes, fonts, base type styles |
| `src/lib/geometry.ts` | Generates all rosette, star and scale artwork as SVG paths |
| `src/components/geometry` | `Rosette`, `Halo` and `CourseEmblem` (one cover artwork per course) |
| `src/components/scroll.tsx` | Lenis smooth scrolling, scroll progress bar, GSAP ScrollTrigger scrub and parallax, word-by-word text reveal |
| `src/components/motion.tsx` | Shared Framer Motion pieces: reveal, stagger, counter, tilt, magnetic |
| `src/components/home` | Homepage sections; `CourseCards.tsx` is the parchment course section |
| `src/components/layout` | Header, full-screen menu, language and theme switches, footer |
| `src/i18n` | Locale routing, request config and locale-aware `Link` |

## Status

Built: design system, both themes, English and Arabic (RTL), header and menu, footer, full homepage.
Next: Courses, About, Our Tutor, Contact, legal pages and the booking flow. Those routes currently show a labelled holding page.

## Placeholders to replace

- Course pictures in `src/assets/courses` are cropped from the owner's mock-up image at low resolution. Replace them with final, licensed images of the same proportions (about 900 × 1100 px).
- Testimonial cards are labelled empty slots until real feedback is supplied (`testimonials.*`).
- Tutor name, title, biography and credentials (`tutor.*` in both message files), shown in square brackets.
- Lesson platform and cancellation policy in the FAQ, shown in square brackets.
- Plan prices in `src/content/site.ts` are provisional and flagged on the page.
- Course descriptions, philosophy and method copy are drafts for approval.
- Footer legal links point to Contact until the legal pages exist.

## Deploying

`npm run build` produces plain files in `out/`. Upload that folder to any static host (Cloudflare Pages build command `npm run build`, output directory `out`). Set `NEXT_PUBLIC_SITE_URL` to the public address before building.
