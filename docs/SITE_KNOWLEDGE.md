# O7 Solutions — Site Knowledge Sheet

Reverse-engineered from https://www.o7solutions.in on 2026-10-16.
Structured data lives in [`data/site.json`](../data/site.json). This file explains it.

---

## 1. Who they are

| | |
|---|---|
| Business | O7 Solutions, an IT services agency |
| Location | Jalandhar, Punjab, India (map pin 31.3137, 75.5910). **The site never prints a street address.** |
| Contact | enquiry@o7solutions.in · +91 95019 99044 · +91 62845 45231 · landline 0181-415-9044 |
| Social | Facebook, Instagram, X/Twitter (`o7_solutions`), LinkedIn (company 26619023) |
| Credentials | ISO 9001:2015, team of 35+, 24x6 support |
| Audience | Small and mid-size local businesses, schools, NGOs and traders in Punjab |
| Positioning | "Best IT company in Jalandhar", a one-stop 360° agency: plan, design, develop, market |

**Contradictions on the live site (fix these in the rebuild):**
- Experience: "5+ years" (meta and stats box) vs "15+ successful years" (about text). Copyright reads 2019.
- Clients: "150" (stats box) vs "more than 1500 clients across the globe" (about intro).
- The about intro names **"Hapro"** instead of O7, which is left over from a template.
- "India's Largest Privately-Owned IT Services Provider" is a claim they can't back up.
- The Google Ads page says "07 Solutions" (zero, not O) and mentions **"OMJar.com"**, which is copied from someone else's text.

## 2. Services (the core content)

Five pillars, plus seven sub-service landing pages that target local SEO keywords.

| Pillar | Page | What it covers |
|---|---|---|
| Mobile | `/mobile-development` | Android, iOS, hybrid |
| ↳ | `/android-app-development` | Custom Android, hybrid |
| ↳ | `/ios-app-development` | Swift/Obj-C, UI/UX, cross-platform |
| Web | `/web-development` | E-commerce, CMS, custom, ERP, interactive |
| Software | `/software-development` | GST/billing, inventory, CRM, custom (waterfall SDLC) |
| ↳ | `/gst-billing-software` | Their product "Go GST Bill": invoices, e-invoices, challans, estimates |
| ↳ | `/crm-software` | Consulting, implementation, customization, portals |
| ↳ | `/erp-software` | Modules: sales, HR/payroll, purchase, finance |
| Marketing | `/digital-marketing` | SEO, SMM, PPC, content, email, analytics, Ads |
| ↳ | `/seo-services` | Keyword research, links, technical, local, audit, e-com, on/off page |
| ↳ | `/google-adwords-services` | Search, display, shopping, remarketing, video ads |
| IT | `/it-integration` | Network security, structured cabling, wireless, LAN/WAN/VPN design |

Also mentioned but with no page: domain registration, hosting, graphic design, SMS, voice, UI/UX, cloud computing.

Every pillar page follows the same template:
1. H2 hero "X Services in Jalandhar" with an intro paragraph
2. "Why X is necessary for business growth", a grid of four benefits
3. H1 "X Services For Your Business" (the H1 sits mid-page and is misused)
4. Alternating image and text blocks, one per offering, each with a "Read More" link
5. Shared footer

## 3. Sitemap and navigation

```
/                         Home
├── /about                About (stats, mission/vision/goal)
├── Services (dropdown)
│   ├── /mobile-development
│   ├── /web-development
│   ├── /software-development
│   ├── /digital-marketing
│   ├── /it-integration
│   ├── /seo-services
│   ├── /google-adwords-services
│   ├── /ios-app-development
│   ├── /android-app-development
│   └── /erp-software
├── /crm-software         (only reachable through in-page "Read More")
├── /gst-billing-software (only reachable through in-page "Read More")
├── /portfolio            21 client projects, filterable
├── /contact              Two forms + two Google Maps embeds
└── "Request A Quote"     Modal on every page
```

`sitemap.xml` sits at `/sitemap`, not `/sitemap.xml`. `robots.txt` lists it without a full URL. The sitemap was generated in Nov 2024 by xml-sitemaps.com and has 16 URLs.

**Footer** (same on every page): Location (map) · Company (Home, About, Portfolio, Services, Contact) · Workflow Solutions (5 pillars) · Follow Us · Terms/Privacy (dead links).

## 4. Home page sections, in order

1. Header: logo, nav, "Request A Quote", "CALL US"
2. Hero: "Best IT Company in Jalandhar, Punjab India" + custom software pitch
3. Our Services: tabbed (Mobile, Web, Software, Network, Marketing), each with a Read More
4. About block: "Jalandhar's Leading Website Design and Development company", "Own The Edge"
5. 360° IT Agency: Plan → Design → Develop → Marketing
6. Testimonials carousel (5): Hymoon Tours, St. Soldier, Namdhari Homeopathic, Aspella De Stella, HR International
7. Footer with map

## 5. Portfolio (21 projects)

Filters: E-commerce · Educational · Organisation · Tour & Travel · Websites · Apps.
Full list with live URLs is in `data/site.json → portfolio`. Notable clients: NGC Energy India, Govt. Polytechnic College Behram, UCMAS Punjab, DLM School, Right Click Jobs, Trumath, Mahalakshmi Plastic, Sardarni Upto Date.
Several are apps with no public link (Moon Walker, Parent-Teacher app, O7 Tracking, Tracking App).

## 6. Lead capture

- One form, repeated in the quote modal and on /contact → `POST /sendemail/send`
- Fields: email (insists on a Gmail address, which turns away business emails), name, country (~240-option dropdown), phone, service, message
- Protection: Laravel CSRF, a hidden honeypot field (`hideval`), Google reCAPTCHA
- The quote and contact forms use **two different country lists**
- Placeholder text "Sign up Only by Google" is confusing

## 7. Tech stack (current)

| Layer | What |
|---|---|
| Backend | Laravel (PHP), served by `laravel_session` + `XSRF-TOKEN` cookies, nginx 1.25.5, server-side page cache |
| Frontend | Bootstrap 4, jQuery 3.2.1, a bought HTML theme ("elagent" vendor folder) |
| Plugins | Owl Carousel, Isotope, Magnific Popup, WOW.js, animate.css, parallax-scroll, mCustomScrollbar, nice-select, bootstrap-select |
| Icons | Font Awesome **loaded 3 times** (CSS, local JS, kit), Themify, Flaticon |
| Third party | GA4 `G-MW09BT8C5W`, Elfsight widget, reCAPTCHA, Google Maps iframes |
| Assets | All under `/distt/` (sic). CSS: 13 files (`style.css` alone is 395 KB). JS: 17 files |
| Images | PNG/JPG with spaces in filenames, no WebP, no lazy loading, no `width`/`height` |

## 8. SEO and UX audit: what's broken

**Broken links / 404s**
- Nav links to `/career` and `/team`, both 404
- `ndroid-app-development` is a typo in the nav and 404s
- Relative links (`href="digital-marketing"`) resolve to `/about/digital-marketing` and similar on every subpage, which gives about 60 broken URLs for crawlers
- Terms of Use and Privacy Policy links go nowhere

**On-page SEO**
- Home page has **no H1**. Service pages put the H1 halfway down, under the H2s
- About 90% of images have no `alt`. Some alts are wrong (the video-ads image is tagged "SEO Audit")
- iOS page canonical is `/IOS-app-development` (uppercase), which doesn't match the real URL
- Every page shares one OG image (`/public/distt/images.png`)
- No structured data at all: no `Organization`, `LocalBusiness`, `Service`, `Review` or `BreadcrumbList` schema
- No street address anywhere, which weakens local SEO (NAP consistency)
- Duplicate content: the "Why mobile app is necessary" block repeats word for word on 3 pages, and "Why software is helpful" on 2
- Spelling: "neccesary", "Martket-leading", "knowlegeable", "Opps!", "Intergration"
- One Google Ads link points to a long Google search URL instead of a page

**Performance**
- About 30 render-blocking requests before first paint
- Heavy, unused CSS (the whole theme ships to every page)
- Font Awesome loaded three times

**UX**
- Copy is generic and textbook-like ("CMS stands for…") and doesn't speak to outcomes
- No pricing hints, case-study details, process timeline, FAQ or team
- Gmail-only email field
- Two map embeds on /contact, one of them sized `col-lg-12` with no height

## 9. What to keep in the rebuild

- All 16 URLs and slugs. They have ranking history, so keep them exact or 301 them
- Titles and meta descriptions follow a good "Service in Jalandhar – O7 Solutions" pattern
- Five-pillar service structure + local-keyword sub-pages
- Portfolio with real client links
- Testimonials (ask the client to confirm them and add photos/logos)
- GA4 property ID
- Contact numbers, email, map pin

## 10. Open questions for the client

1. Street address for the footer and schema?
2. Real numbers: years in business, client count, projects?
3. Keep Laravel, or move to a static/Next.js site with a form handler?
4. Do `/career` and `/team` pages need to exist?
5. Is "Go GST Bill" a real product with its own page or app?
6. What is the quiz subdomain (`quiz.o7solutions.in`) for: training, hiring?
7. Brand assets: logo SVG, colours, fonts?
