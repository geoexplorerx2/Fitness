A Next.js 16 fitness web application with built-in internationalization (i18n) supporting English and Vietnamese via `next-intl`. Built with React 19, Tailwind CSS 4, and TypeScript using the App Router with locale-based dynamic routing.

## Project Schematic

```
fitness-webapp/
├── app/
│   ├── globals.css                    # Global styles (Tailwind)
│   └── [locale]/
│       ├── layout.tsx                 # Root layout with NextIntlClientProvider
│       └── page.tsx                   # Home page (locale-aware)
├── components/                        # (empty - to be added)
├── hooks/                             # (empty - to be added)
├── types/                             # (empty - to be added)
├── i18n/
│   ├── routing.ts                     # Locale routing config (en, vi)
│   └── request.ts                     # next-intl request config
├── messages/
│   ├── en.json                        # English translations
│   └── vi.json                        # Vietnamese translations
├── middleware.ts                       # Locale redirect middleware
├── public/                            # Static assets
├── package.json                       # Dependencies & scripts
├── tsconfig.json                      # TypeScript config
├── next.config.ts                     # Next.js config
├── postcss.config.mjs                 # PostCSS config (Tailwind)
└── eslint.config.mjs                  # ESLint config

┌─────────────────────────────────────────────────────────┐
│                     REQUEST FLOW                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Browser ──► middleware.ts ──► /[locale]/layout.tsx     │
│                  │                    │                  │
│                  ▼                    ▼                  │
│           Detect locale     NextIntlClientProvider       │
│           from URL path          │                       │
│                               useTranslations()         │
│                               from messages/*.json      │
│                                     │                   │
│                                     ▼                   │
│                              /[locale]/page.tsx          │
│                              (rendered content)          │
│                                                         │
└─────────────────────────────────────────────────────────┘

SUPPORTED LOCALES: en (default) | vi

TECH STACK:
  Next.js 16 + React 19 + TypeScript
  Tailwind CSS 4 + next-intl 4
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.
