import { defineRouting } from 'next-intl/routing'

/**
 * i18n routing configuration.
 *
 * Supported locales:
 *   - en  (English)
 *   - vi  (Vietnamese)
 *   - fa  (Persian / Farsi) — default
 */
export const routing = defineRouting({
  locales: ['en', 'vi', 'fa'],
  defaultLocale: 'fa',
  localeDetection: false,
})
