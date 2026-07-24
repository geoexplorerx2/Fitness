# Fitness Web App

A modern fitness coaching platform built for **Negin Safareh** — a personal fitness and dance coach based in Tehran, Iran. The app showcases training services, workout plans, anatomy education, and user management with a dark-themed glassmorphism UI featuring RTL support for Persian.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS 4, Custom CSS (glassmorphism, gradients, blob animations) |
| Animations | Framer Motion 12, IntersectionObserver scroll reveals |
| i18n | next-intl 4 (3 locales: `fa` default, `en`, `vi`) |
| Icons | FontAwesome 7 (solid + brands) |
| Fonts | Vazir (Persian), Geist (Latin) |
| Database | MySQL via Prisma ORM 7 |
| Backend API | Express.js 5 |
| Deployment | Docker multi-stage + Docker Compose + Nginx reverse proxy |

## Project Structure

```
fitness-webapp/
├── app/
│   ├── globals.css                    # Tailwind + design tokens + custom animations
│   ├── lib/
│   │   └── prisma.ts                  # Singleton PrismaClient instance
│   ├── generated/
│   │   └── prisma/                    # Generated Prisma client (gitignored)
│   └── [locale]/
│       ├── layout.tsx                 # Root layout — NextIntlClientProvider + ScrollReveal
│       ├── page.tsx                   # Home page — composes all landing sections
│       ├── dashboard/
│       │   ├── layout.tsx             # Dashboard layout
│       │   └── page.tsx               # Dashboard page
│       ├── selling-package/
│       │   └── page.tsx               # Package pricing page
│       └── accout/
│           ├── signup/
│           │   └── page.tsx           # Sign-up page
│           └── signin/
│               └── page.tsx           # Sign-in page
│
├── components/
│   ├── Navbar.tsx                     # Fixed glassmorphism nav — desktop links, socials, auth, mobile slide-in menu
│   ├── Header.tsx                     # Hero 3-slide carousel controller
│   ├── HomeHeroContent.tsx            # Animated hero slide content + pagination dots
│   ├── HeroBlobs.tsx                  # Animated background blob effects
│   ├── Services.tsx                   # 6-card services grid
│   ├── TrainingPlans.tsx              # Multi-section: plan cards, schedule, anatomy, results, testimonials
│   ├── PlanCard.tsx                   # Reusable pricing card with featured variant
│   ├── ScheduleTable.tsx              # Responsive weekly workout table
│   ├── SectionHeading.tsx             # Reusable section header
│   ├── CountUp.tsx                    # Viewport-triggered number animation
│   ├── ScrollReveal.tsx               # IntersectionObserver scroll animations
│   ├── PackageSection.tsx             # Package/pricing display
│   ├── CTA.tsx                        # Contact/signup form
│   ├── SignUpForm.tsx                 # Registration form
│   ├── SignInForm.tsx                 # Login form
│   └── Footer.tsx                     # Brand, links, contact, socials, copyright
│
├── prisma/
│   ├── schema.prisma                  # Prisma schema (MySQL datasource)
│   └── migrations/                    # Database migrations
│
├── i18n/
│   ├── routing.ts                     # defineRouting — locales: [fa, en, vi], default: fa
│   └── request.ts                     # getRequestConfig — loads messages/{locale}.json
│
├── messages/
│   ├── fa.json                        # Persian translations (default)
│   ├── en.json                        # English translations
│   └── vi.json                        # Vietnamese translations
│
├── assets/
│   ├── fonts/                         # Vazir font family (Bold, Medium, Light, Thin + Farsi digits)
│   └── img/jpg/                       # Anatomy images, avatars, banner
│
├── prisma.config.ts                   # Prisma config — loads DATABASE_URL from .env
├── prisma/
│   └── schema.prisma                  # MySQL datasource + Prisma client generator
├── middleware.ts                       # next-intl locale routing middleware
├── next.config.ts                      # Next.js config + next-intl plugin (standalone output)
├── postcss.config.mjs                  # Tailwind PostCSS config
├── nginx.conf                          # Reverse proxy config for neginsafareh-academy.ir
├── Dockerfile                          # Multi-stage Docker build
├── docker-compose.yml                  # Production deployment with health checks
└── package.json
```

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                           │
│  /fa/*  /en/*  /vi/*                                               │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Nginx (Production)                                                 │
│  Reverse proxy → localhost:3006                                     │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  middleware.ts (next-intl)                                          │
│  ─────────────────────────                                          │
│  Detects locale from URL path (/fa/*, /en/*, /vi/*)                │
│  Redirects bare "/" → default locale "/fa"                          │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  [locale]/layout.tsx                                                │
│  ───────────────────                                                │
│  Resolves locale, loads messages/{locale}.json                     │
│  Wraps in NextIntlClientProvider                                    │
│  Injects ScrollReveal + sets <html lang/dir>                       │
└────────────────────────────┬────────────────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
┌─────────────────────┐ ┌──────────┐ ┌──────────┐
│  page.tsx (Home)    │ │Dashboard │ │ Signup/  │
│  ────────────────   │ │ Pages    │ │ Signin   │
│  Landing sections:  │ └──────────┘ └──────────┘
│  Navbar             │
│  Header (carousel)  │
│  Services           │
│  TrainingPlans      │
│  └─ PlanCards       │
│  └─ ScheduleTable   │
│  └─ Anatomy         │
│  └─ Results(CountUp)│
│  └─ Testimonials    │
│  CTA (contact form) │
│  Footer             │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Express.js API Server                                              │
│  ─────────────────────                                              │
│  REST endpoints for auth, workouts, packages, contact               │
│  Handles form submissions, user management                          │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Prisma ORM + MySQL                                                 │
│  ──────────────────────                                             │
│  app/lib/prisma.ts — Singleton PrismaClient                        │
│  prisma/schema.prisma — Models: User, Workout, Exercise, Package   │
│  prisma/migrations/ — Versioned schema migrations                  │
│  DATABASE_URL in .env (gitignored)                                  │
└─────────────────────────────────────────────────────────────────────┘
```

## Page Breakdown

### Home Page (`/[locale]`)
| Section | Component | Details |
|---------|-----------|---------|
| Navigation | `Navbar.tsx` | Fixed glassmorphism nav — desktop links, social icons, auth buttons, Framer Motion mobile slide-in. RTL-aware. |
| Hero | `Header.tsx` + `HomeHeroContent.tsx` | 3-slide carousel with auto-advance (5s). Animated tag/title/description/CTA, banner image, dot pagination. |
| Services | `Services.tsx` | 6-card grid: Dance, Bodybuilding, Anatomy, Nutrition, Challenges, Online Support. |
| Training Plans | `TrainingPlans.tsx` | Pricing cards (FA/48h, VP/72h, Premium/30d), weekly schedule table, 4 muscle anatomy cards, animated result counters, testimonials. |
| Contact | `CTA.tsx` | Form with name, phone, goal, plan, message fields. |
| Footer | `Footer.tsx` | Brand, quick links, contact, social icons, copyright. |

### Auth & Dashboard
| Page | Route | Components |
|------|-------|------------|
| Sign In | `/[locale]/accout/signin` | `SignInForm.tsx` |
| Sign Up | `/[locale]/accout/signup` | `SignUpForm.tsx` |
| Dashboard | `/[locale]/dashboard` | Dashboard layout + page |

## Data Flow

```
User Action (form submit, login, registration)
        │
        ▼
Next.js Server Action / API Route
        │
        ▼
Express.js API ───► Prisma Client ───► MySQL
                        │
                        ▼
                Response → UI Update
```

## i18n Flow

```
┌──────────┐    ┌──────────────┐    ┌──────────────────┐    ┌──────────────┐
│  URL      │───►│  middleware   │───►│  [locale]/       │───►│  Component   │
│  /fa/*    │    │  detect fa   │    │  layout.tsx      │    │  useLocale() │
│  /en/*    │    │  detect en   │    │  load fa.json    │    │  useTrans.() │
│  /vi/*    │    │  detect vi   │    │  → messages      │    │  → "title"   │
└──────────┘    └──────────────┘    └──────────────────┘    └──────────────┘
     │                                                           │
     │  Default: /fa (Persian — RTL)                            │  RTL-aware:
     │  Supports: /en (English)                                  │  dir="rtl" when
     │            /vi (Vietnamese)                               │  locale === 'fa'
     └───────────────────────────────────────────────────────────┘
```

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0c0a10` | Page background |
| `--fg` | `#f0ecf4` | Primary text |
| `--accent` | `#c850e0` | Primary accent (purple) |
| `--accent-light` | `#e08aff` | Accent hover / highlights |
| `--accent-deep` | `#8b1faa` | Dark accent / gradients |
| `--card` | `rgba(200,80,224,0.06)` | Card background |
| `--border` | `rgba(200,80,224,0.12)` | Border color |
| `--surface` | `#15121a` | Elevated surface |

## Animations

- **Scroll Reveal**: IntersectionObserver adds `.visible` to `.reveal`/`.reveal-right`/`.reveal-left`/`.reveal-scale` elements. Staggered via `--i` CSS property.
- **Hero Carousel**: Framer Motion `AnimatePresence` with RTL-aware direction slides, auto-advance every 5s.
- **CountUp**: Viewport-triggered number animation (30 steps / 1500ms).
- **Hero Blobs**: CSS `@keyframes blobFloat` gradient blobs with offset delays.
- **Nav**: Glassmorphism `backdrop-filter: blur(24px)` with scrolled state.
- **Mobile Menu**: Framer Motion slide-in from right.
- **Cards**: CSS hover transforms (translateY, scale, border glow).

## Deployment

### Docker
```bash
docker compose up -d
```
- Builds multi-stage Docker image
- Runs on port 3006 (mapped to container port 3000)
- Health check every 30s, 1GB memory limit

### Nginx
Configured to reverse proxy `neginsafareh-academy.ir` → `localhost:3006`.

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
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma Studio (GUI) |
