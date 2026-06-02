# IBK Portfolio v3.0

**Ibukunoluwa Oluwafemi** — Mechanical Engineering Student · AI Workflow Optimizer  
[ibk-portfolio-one.vercel.app](https://ibk-portfolio-one.vercel.app)

---

## Project Structure

```
ibk-portfolio/
├── index.html                    # Entry HTML — FOUC prevention, meta tags, font preloads
├── vite.config.js                # Vite build config
├── vercel.json                   # Vercel SPA routing + cache headers
├── package.json
│
├── public/
│   ├── profile.jpg               # ← ADD YOUR PHOTO HERE
│   ├── Resumé.pdf                # ← ADD YOUR RESUME HERE
│   ├── projects/
│   │   ├── runsa-registration.jpg
│   │   ├── runsa-agenda.jpg
│   │   ├── runsa-idcard.jpg
│   │   ├── runsa-dashboard.jpg
│   │   ├── beam-code.jpg
│   │   ├── beam-output.jpg
│   │   ├── maize-sketch.jpg
│   │   ├── maize-welding.jpg
│   │   ├── maize-final.jpg
│   │   ├── tunnel-design.jpg
│   │   └── tunnel-final.jpg
│   ├── certificates/
│   │   ├── purpose-driven-ai.jpg
│   │   ├── hp-leadership.jpg
│   │   └── hp-ai-business.jpg
│   └── events/
│       ├── event1-photo1.jpg
│       └── event2-photo1.jpg
│
└── src/
    ├── main.jsx                  # React entry point
    ├── App.jsx                   # Root — composes all sections + modal state
    │
    ├── data/
    │   └── portfolio.js          # ← SINGLE SOURCE OF TRUTH — edit all content here
    │
    ├── styles/
    │   ├── tokens.js             # Design token system (colors, gradients, etc.)
    │   └── GlobalStyles.jsx      # Global CSS injected as React component
    │
    ├── hooks/
    │   └── index.js              # useTheme, useReveal, useCounter, useMobile, etc.
    │
    └── components/
        ├── primitives.jsx        # Shared UI: Chip, SectionHeader, GlowButton, etc.
        ├── Modals.jsx            # Detail Modal, Gallery Lightbox, Contact Modal
        ├── Nav.jsx               # Sticky nav, scroll indicator, mobile menu
        ├── Hero.jsx              # Hero section with hexagon portrait + stat cards
        ├── About.jsx             # About + Why Work With Me
        ├── Skills.jsx            # Skills by category, modal cards
        ├── Projects.jsx          # Featured project + case study cards
        ├── Experience.jsx        # Interactive timeline
        ├── Education.jsx         # Education cards
        ├── Awards.jsx            # Awards section
        ├── Certificates.jsx      # Certificates grid
        ├── Events.jsx            # Events with gallery
        └── Contact.jsx           # Contact section + floating button
```

---

## Quick Start

```bash
# 1. Clone or unzip into your project folder
cd ibk-portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open http://localhost:5173
```

---

## Updating Content

**All content is in one file:** `src/data/portfolio.js`

| What to edit | Where |
|---|---|
| Your name, bio, tagline | `PROFILE` object at top |
| Stats (CGPA, SAT, delegates) | `PROFILE.stats` array |
| "Why work with me" cards | `PROFILE.whyMe` array |
| Skills | `SKILLS` array |
| Projects | `PROJECTS` array |
| Experience / timeline | `EXPERIENCE` array |
| Education | `EDUCATION` array |
| Certificates | `CERTIFICATES` array |
| Awards | `AWARDS` array |
| Events | `EVENTS` array |

Every item has a `modal` object — that's what pops up when users click the card.

---

## Adding Photos

Drop all images into the `/public/` folder following the structure above.

- **Profile photo:** `public/profile.jpg` (recommended 400×400px, square crop)
- **Resume:** `public/Resumé.pdf`
- **Project images:** `public/projects/[project-name].jpg`
- **Certificate images:** `public/certificates/[cert-name].jpg`
- **Event photos:** `public/events/[event-name].jpg`

If an image is missing, the portfolio shows a placeholder — nothing breaks.

---

## Deploy to Vercel

### Option A — GitHub + Vercel (recommended)

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "IBK Portfolio v3.0"
git remote add origin https://github.com/ibukun06/ibk-portfolio.git
git push -u origin main

# 2. Go to vercel.com → New Project → Import from GitHub
# 3. Framework: Vite (auto-detected)
# 4. Deploy → done
```

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Build Settings (Vercel)

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

---

## Customization Guide

### Change accent color

In `src/styles/tokens.js`:

```js
// Dark mode accent — change #63b3ed to any color
accent: "#63b3ed",      // primary blue
accentB: "#fbbf24",     // amber (fabrication)
accentC: "#34d399",     // green (success)
accentD: "#a78bfa",     // violet (AI/digital)
```

### Change fonts

In `index.html` (Google Fonts link) and `src/styles/GlobalStyles.jsx`:

```css
/* Replace Syne + DM Sans with your preference */
font-family: 'Your Font', sans-serif;
```

### Add a new section

1. Create `src/components/YourSection.jsx`
2. Add data array to `src/data/portfolio.js`
3. Import and add `<YourSection />` to `src/App.jsx`
4. Add nav link to `NAV_LINKS` in `src/components/Nav.jsx`

---

## Features

- ✅ Dark / light mode with system preference detection + localStorage persistence
- ✅ No theme flash on page load (blocking FOUC script)
- ✅ Scroll progress bar
- ✅ Active section highlighting in nav
- ✅ Animated stat counters
- ✅ Scroll reveal on all sections
- ✅ Click-to-expand detail modals on every card
- ✅ Gallery lightbox with keyboard + swipe navigation
- ✅ Floating contact button
- ✅ Contact modal with one-tap copy
- ✅ Mobile-first responsive (320px → ultrawide)
- ✅ Reduced-motion support
- ✅ Semantic HTML + ARIA labels
- ✅ Keyboard navigable
- ✅ Fast Vite build with code splitting
- ✅ Vercel SPA routing + asset caching

---

## License

Personal portfolio — all rights reserved.  
Built by Ibukunoluwa Oluwafemi with AI-assisted tools.
