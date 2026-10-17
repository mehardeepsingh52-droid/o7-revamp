# O7 Solutions — website rebuild

A redesign of [o7solutions.in](https://www.o7solutions.in), a web, app and software company in Jalandhar, Punjab. Same business and URLs, with a new design, better SEO and much faster pages.

Live preview: https://o7solutions-revamp.vercel.app

## Run it
```
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (stop `next dev` first, they share .next/)
```

## Design
Black with acid lime, cobalt and hot pink. Type is Unbounded (display), Geist (body) and Geist Mono (labels). Sections stack like rounded sheets.

Homepage, top to bottom:
- **Header**: three floating islands: logo, nav (a pill follows the hovered link or the section on screen) and the quote button, which always stays visible.
- **Hero**: WebGL liquid background that follows the cursor, stacked headline with stickers, key stats.
- **Projects**: 3D swivel carousel of live client sites with an auto-advance timer.
- **Services**: vertical strips; the hovered one opens.
- **About**: crossing marquee tapes and a bento grid of mission, vision, goal and stats.
- **Reviews**: staggered two-column cards.
- **Contact**: a fill-in-the-blanks letter with service chips, plus call / WhatsApp / email / visit tiles.
- **Footer**: big email link, numbered link columns, outlined wordmark.

Buttons come from `components/shared/Button.tsx`: `primary` (letters roll on hover, looping arrow, light sweep) and `ghost` (spinning prism border).

A palette sidebar (`components/features/PaletteSwitcher.tsx`) lets you try ten colour schemes live. Once one is picked, copy its values into the tokens at the top of `app/site.css` and remove the switcher.

## Project layout
| Path | What's there |
|---|---|
| `lib/site.ts` | All site content: company details, nav, stats, values, projects, services, testimonials |
| `lib/enquiry.ts` | Builds the mailto link the contact form uses |
| `app/layout.tsx` | SEO metadata and JSON-LD |
| `app/globals.css` | Reset and layout helpers |
| `app/site.css` | Design tokens (every colour comes from these), labels, titles, buttons, section backgrounds |
| `app/(home)/` | Fonts, scroll animations and the homepage |
| `components/site/` | One component per section, plus the hero shader |
| `components/shared/` | Button, scroll animations (`data-fx`), WebGL canvas, icons |
| `components/features/` | Palette switcher and the "type o7" easter egg |
| `docs/`, `data/`, `scripts/` | Audit of the old site, its content as JSON, and the crawler used to collect it |

## Performance notes
- The hero shader renders at half resolution, capped at 40 fps, and pauses when off-screen.
- Only `transform` and `opacity` are animated. Glows are static; the spinning borders rotate a gradient layer instead of repainting it.
- No `backdrop-filter` over moving content. Native scrolling, no smooth-scroll library.
- Scroll handlers never re-render or measure layout on every event.

## Things to know
- Inside the 3D carousel, `backdrop-filter` makes Chrome render the screenshot black.
- GSAP owns `transform` on `data-fx` elements, so hover effects use the separate `translate` / `rotate` / `scale` properties.
- New colours should be tokens or `color-mix()` of tokens so they follow the palette.
- In a CSS module, target the shared button as `:global(.btn)`.
- Grid columns that hold a scrolling row need `minmax(0, 1fr)` or they overflow on phones.

## Still to do
- Confirm with O7: street address, testimonial names/photos, which portfolio sites are still theirs.
- Build the service pages at the old URLs, plus about, portfolio and contact pages.
- A real form backend, an Open Graph image, then point o7solutions.in at the new site.
