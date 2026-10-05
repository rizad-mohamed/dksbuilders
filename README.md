# DKS Builders

A responsive construction-company website built with Next.js App Router, React, TypeScript and modern CSS. The homepage preserves the source company's factual content, supplied project archive, partner marks and responsive hero film. Projects and Careers are intentionally Coming Soon.

## Run locally

Requires Node.js 22.19+ and npm; CI uses Node.js 24.

```sh
npm ci
npm run dev
```

On Windows, use npm.cmd and npx.cmd if PowerShell blocks the corresponding .ps1 wrappers.

Open http://localhost:3000. For production: `npm run build`, then `npm run start`.

## Quality checks

```sh
npm run lint
npm run format:check
npm run typecheck
npm run build
npx playwright install chromium
npm run test
npm run test:lighthouse
```

Playwright starts the production server and covers navigation, keyboard access, service disclosures, responsive overflow, media failures, reduced motion, Three.js controls, local images and automated WCAG checks. The automated Lighthouse runner checks the homepage and Coming Soon routes three times. Accessibility, best practices and SEO require 95; performance uses a 90 warning threshold to account for runner variance. Layout shift must remain under 0.1. Linux CI installs browser system dependencies automatically.

## Architecture

- `app/`: server-rendered routes, metadata, robots and sitemap.
- `components/`: page sections and isolated interactive components.
- `lib/`: content and the lazily imported Three.js scene.
- `public/assets/`: preserved photography, film and company marks.
- `public/fonts/`: self-hosted variable fonts and their licenses.
- `tests/`: Playwright tests.
- `.github/workflows/ci.yml`: installation, lint, formatting, types, production build, browser tests and Lighthouse.

Lighthouse runs through a maintained programmatic API and writes HTML/JSON reports to .lighthouseci/reports. No Lighthouse CI server or upload credential is needed.

Motion Mini is loaded only when reveal content enters the viewport. Native CSS scroll timelines provide image parallax where supported; other browsers show static images. CSS handles service transitions, navigation, CTA and image interactions. The Three.js structural model loads near the viewport, caps pixel density, stops offscreen or in hidden tabs, and disposes GPU resources. Reduced-motion and data-saving visitors opt into the model. Film downloads only on an explicit Play action, uses the mobile derivative on small screens, pauses offscreen and falls back to the hero image if unavailable.

## Content and assets

See [content and asset provenance](docs/content-and-assets.md). Illustrative images, film and geometry are labelled and are not presented as evidence of DKS projects or staff. The supplied project photos are not mapped to named project-register entries without confirmation. No unverifiable statistics, awards, certifications or testimonials are added.

Newsreader's editorial serif follows the supplied architectural reference; DM Sans supports navigation and body text. Both are self-hosted with their SIL Open Font Licenses.

## Deployment

Deploy as a standard Node.js Next.js application, for example on Vercel or a Node host using `npm run build` and `npm run start`. No external API keys or runtime hosting plugin are required.

Set optional `NEXT_PUBLIC_SITE_URL=https://your-confirmed-domain.example` before building to enable absolute canonical URLs, metadata URLs and sitemap entries. It must be the confirmed public deployment URL; no old preview domain is retained. Without it, no public domain is assumed and the sitemap is empty.

See [local verification results](docs/validation.md) for the measured scores and remaining performance target.

GitHub CI runs on pushes and pull requests. This local implementation is not pushed to the source remote: a new destination repository must be supplied before migration. Hosting security headers are configured in `next.config.ts`. Automated accessibility checks complement, rather than replace, manual accessibility review.
