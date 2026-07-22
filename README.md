# Fitness Web App

A modern fitness coaching landing page built for **Negin Safareh** — a personal fitness and dance coach based in Tehran, Iran. The app showcases training services, workout plans, and anatomy education with a dark-themed, glassmorphism UI featuring RTL support for Persian.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS 4, Custom CSS (glassmorphism, gradients) |
| Animations | Framer Motion 12, IntersectionObserver-based scroll reveals |
| i18n | next-intl 4 (3 locales: `fa` default, `en`, `vi`) |
| Icons | FontAwesome (solid + brands) |
| Fonts | Vazir (Persian), Geist (Latin) |

## Project Structure

```
fitness-webapp/
├── app/
│   ├── globals.css                        # Tailwind import + design tokens, custom components, animations
│   └── [locale]/
│       ├── layout.tsx                     # Root layout — NextIntlClientProvider + ScrollReveal
│       ├── page.tsx                       # Home page — composes all landing sections
│       └── selling-package/
│           └── page.tsx                   # Selling package page (reuses Navbar/Header/Footer)
│
├── components/
│   ├── Navbar.tsx                         # Fixed glassmorphism nav — desktop links, social icons, auth buttons, mobile slide-in menu
│   ├── Header.tsx                         # Hero section controller — manages 3-slide carousel state + auto-advance
│   ├── HomeHeroContent.tsx                # Hero slide content — animated tag/title/description/CTA + banner image + pagination dots
│   ├── Services.tsx                       # 6-card services grid (dance, bodybuilding, anatomy, nutrition, challenges, online support)
│   ├── TrainingPlans.tsx                  # Multi-section: plan cards + schedule table + anatomy + results stats + testimonials
│   ├── PlanCard.tsx                       # Reusable pricing/plan card with featured variant
│   ├── ScheduleTable.tsx                  # Responsive weekly workout table (desktop table, mobile cards)
│   ├── SectionHeading.tsx                 # Reusable section header (accent line + label + gradient heading)
│   ├── CountUp.tsx                        # Viewport-triggered number animation (IntersectionObserver)
│   ├── ScrollReveal.tsx                   # Global IntersectionObserver — adds .visible to .reveal/.reveal-right/.reveal-left/.reveal-scale
│   ├── CTA.tsx                            # Contact/signup form (name, phone, goal, plan, message)
│   └── Footer.tsx                         # Brand, quick links, contact info, social icons, copyright
│
├── i18n/
│   ├── routing.ts                         # defineRouting — locales: [fa, en, vi], defaultLocale: fa
│   └── request.ts                         # getRequestConfig — loads messages/{locale}.json
│
├── messages/
│   ├── fa.json                            # Persian translations (default)
│   ├── en.json                            # English translations
│   └── vi.json                            # Vietnamese translations
│
├── assets/
│   ├── fonts/                             # Vazir font family (Bold, Medium, Light, Thin + Farsi digits)
│   └── img/jpg/                           # Muscle anatomy images, testimonial avatars, banner
│
├── middleware.ts                           # next-intl locale redirect middleware — matcher: /, /(vi|en)/:path*
├── next.config.ts                         # Next.js config wrapped with next-intl plugin
├── postcss.config.mjs                     # PostCSS config for Tailwind
└── package.json
```

## Architecture Schematic

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          BROWSER REQUEST                                 │
└───────────────────────────────┬──────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  middleware.ts                                                           │
│  ─────────────────                                                       │
│  Detects locale from URL path (/fa/*, /en/*, /vi/*)                     │
│  Redirects bare "/" to default locale "/fa"                              │
│  Pattern: /, /(vi|en)/:path*                                            │
└───────────────────────────────┬──────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  [locale]/layout.tsx                                                     │
│  ───────────────────                                                     │
│  Resolves locale + loads messages/{locale}.json                          │
│  Wraps app in NextIntlClientProvider (translations context)              │
│  Injects <ScrollReveal /> for viewport animations                       │
│  Sets <html lang={locale}> with Vazir (Persian) / Geist (Latin) fonts   │
└───────────────────────────────┬──────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  [locale]/page.tsx  (Home)                                               │
│  ─────────────────────                                                   │
│  Composes all sections in order:                                         │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ Navbar            Fixed glassmorphism nav                          │  │
│  │                   ┌─ Desktop: nav links, social icons, auth btns   │  │
│  │                   └─ Mobile: hamburger → Framer Motion slide menu  │  │
│  │                   RTL-aware (isRtl = locale === 'fa')              │  │
│  ├────────────────────────────────────────────────────────────────────┤  │
│  │ Header            3-slide carousel hero                           │  │
│  │  └─ HomeHeroContent  Animated slide transitions (Framer Motion)    │  │
│  │                       Auto-advances every 5s (paused on hover)    │  │
│  │                       Gradient tag, title, description, 2 CTAs    │  │
│  │                       Banner image (desktop only)                  │  │
│  │                       Dot pagination indicators                    │  │
│  ├────────────────────────────────────────────────────────────────────┤  │
│  │ Services          6 feature cards in 3-col grid                   │  │
│  │                   Dance, Bodybuilding, Anatomy,                   │  │
│  │                   Nutrition, Challenges, Online Support            │  │
│  │                   Each card: icon + title + description            │  │
│  ├────────────────────────────────────────────────────────────────────┤  │
│  │ TrainingPlans     Multi-section component:                        │  │
│  │  ├─ Plan Cards    3 pricing plans (FA/48h, VP/72h, Premium/30d)   │  │
│  │  │                VP is "featured" with glow border               │  │
│  │  ├─ Schedule      Responsive weekly workout table                 │  │
│  │  │                Desktop: HTML table / Mobile: stacked cards      │  │
│  │  ├─ Anatomy       4 muscle cards (glute, thigh, calf, core)       │  │
│  │  │                + trainer tip callout                            │  │
│  │  ├─ Results       4 animated counters (CountUp)                   │  │
│  │  │                500 students, 1200 sessions, 48 programs, 8 yrs │  │
│  │  └─ Testimonials  3 review cards with star ratings + avatars      │  │
│  ├────────────────────────────────────────────────────────────────────┤  │
│  │ CTA               Contact/signup form                             │  │
│  │                   Fields: name, phone, goal, plan preference,     │  │
│  │                   message → submit (currently console.log)        │  │
│  ├────────────────────────────────────────────────────────────────────┤  │
│  │ Footer            Brand info, quick links, contact, social icons  │  │
│  │                   Copyright + privacy/terms links                 │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

## i18n Flow

```
┌──────────┐     ┌──────────────┐     ┌──────────────────┐     ┌──────────────┐
│  URL      │────►│  middleware   │────►│  [locale]/       │────►│  Component   │
│  /fa/*    │     │  detect fa   │     │  layout.tsx      │     │  useLocale() │
│  /en/*    │     │  detect en   │     │  load fa.json    │     │  useTrans.() │
│  /vi/*    │     │  detect vi   │     │  → messages      │     │  → "title"   │
└──────────┘     └──────────────┘     └──────────────────┘     └──────────────┘
     │                                                            │
     │  Default: /fa (Persian — RTL)                              │  RTL-aware:
     │  Supports: /en (English)                                   │  dir="rtl" when
     │            /vi (Vietnamese)                                │  locale === 'fa'
     └────────────────────────────────────────────────────────────┘
```

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0c0a10` | Page background (near-black) |
| `--fg` | `#f0ecf4` | Primary text (off-white) |
| `--accent` | `#c850e0` | Primary accent (purple) |
| `--accent-light` | `#e08aff` | Accent hover / highlights |
| `--accent-deep` | `#8b1faa` | Dark accent / gradients |
| `--card` | `rgba(200,80,224,0.06)` | Card background |
| `--border` | `rgba(200,80,224,0.12)` | Border color |
| `--surface` | `#15121a` | Elevated surface |

## Animations

- **Scroll Reveal**: IntersectionObserver adds `.visible` to `.reveal`, `.reveal-right`, `.reveal-left`, `.reveal-scale` elements. Staggered children via `--i` CSS custom property.
- **Hero Carousel**: Framer Motion `AnimatePresence` with direction-aware slide transitions (RTL-aware), auto-advance every 5s.
- **CountUp**: Viewport-triggered number animation (30 steps over 1500ms).
- **Hero Blobs**: CSS `@keyframes blobFloat` — 3 floating gradient blobs with offset delays.
- **Nav**: Glassmorphism `backdrop-filter: blur(24px)` with scrolled state.
- **Mobile Menu**: Framer Motion `AnimatePresence` slide-in from right.
- **Cards**: CSS hover transforms (translateY, scale, border glow).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — defaults to Persian (`/fa`).

Switch language via URL:
- English: `http://localhost:3000/en`
- Vietnamese: `http://localhost:3000/vi`
- Persian: `http://localhost:3000/fa`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
