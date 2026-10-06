# Production UAT — DKS Builders

Verified **6 October 2026** in the Windows workspace using **Node.js 24.19.0** and **npm 11.17.0**, against the production Next.js build.

## Quality checks

| Check                                     | Result                                                                                 |
| :---------------------------------------- | :------------------------------------------------------------------------------------- |
| ESLint                                    | Passed.                                                                                |
| Prettier and Git diff checks              | Passed.                                                                                |
| Strict TypeScript and Next.js route types | Passed.                                                                                |
| Production build                          | Passed; homepage, Projects and Careers generated successfully.                         |
| npm dependency audit                      | Zero vulnerabilities across all severity levels.                                       |
| Playwright UAT                            | **36 tests passed** against an isolated production server.                             |
| Automated WCAG A/AA checks                | Passed on the homepage, Projects and Careers.                                          |
| Lighthouse UAT                            | All configured quality gates passed; homepage performance remains an advisory warning. |

## Browser acceptance coverage

- Navigation between routes, mobile menu, Escape handling and keyboard skip navigation.
- Responsive overflow at 320, 375, 430, 768, 1024, 1280, 1440 and 1920 px; directory layouts also checked through 2560 px.
- Combined directory filters, search, sorting, empty results, resets and real email destinations. Careers is homepage section 08 immediately after Our Approach, and Selected Work starts at the left gutter.
- Service selection by pointer and keyboard, matching image/description and email enquiry destination. The six new service icons also passed focused accessibility and card-fitting checks.
- Supplied Google Maps business destination and both directions links. The exact DKS Builders marker and business card were separately inspected in a live iframe.
- Page scroll progress, gradual career image reveal and reduced-motion behavior.
- Process connection progress and reached-step states at mobile and desktop widths.
- Heading decoding, stable accessible names, resolved text and reduced-motion behavior.
- Restrained photography parallax and its reduced-motion fallback.
- Film autoplay, mobile media selection, unavailable-media fallback, offscreen pause and persistent visitor pause.
- Three.js stage controls and rotation pause, plus reduced-motion behavior without automatic heavy loading.
- Local image loading and WhatsApp destination/new-tab behavior across all routes.

Automated browser coverage uses Chromium. Desktop/mobile screenshots were visually inspected. Firefox, Safari and Edge have not been separately verified; automated accessibility checks are not a complete manual accessibility review.

## Lighthouse

Default mobile Lighthouse audits ran **three times per route**. The table records medians from the final production build.

| Route       | Performance | Accessibility | Best practices |     SEO |       CLS |
| :---------- | ----------: | ------------: | -------------: | ------: | --------: |
| `/`         |      **71** |       **100** |        **100** | **100** | 0.0001755 |
| `/projects` |      **93** |       **100** |        **100** | **100** |         0 |
| `/careers`  |      **94** |       **100** |        **100** | **100** |         0 |

Homepage performance runs were **40, 71 and 89**; Projects scored **94, 93 and 93**, and Careers scored **94, 91 and 96**. The early homepage audits overlapped the browser suite, so the local performance median includes resource contention. All routes scored **100** for accessibility, best practices and SEO in every run. All 36 browser tests passed against this production build.

The homepage remains below the advisory 90 performance target. Autoplay media and measured runner variance remain practical limits. Accessibility, best practices and SEO require at least 95; CLS must be at or below 0.1. These gates and audits were not weakened or disabled. Lighthouse completed with exit code 0 and cleaned up its owned browser and production-server processes.

Detailed HTML/JSON reports and `summary.json` are generated under the ignored `.lighthouseci/reports/` directory. Playwright writes its report to the ignored `playwright-report/` directory. GitHub Actions uploads both report directories as quality artifacts with 14-day retention.

## Reproduction

```sh
npm ci
npm audit --audit-level=moderate
npm run lint
npm run format:check
npm run typecheck
npm run build
npx playwright install chromium
npm test
npm run test:lighthouse
```

Use `npm.cmd`/`npx.cmd` on Windows when PowerShell blocks `.ps1` wrappers. If another preview uses port 3000, set `PLAYWRIGHT_PORT` to an unused port for the test run. `scripts/preview.mjs` accepts optional `PREVIEW_URL` and captures desktop, mobile and structural-study views from a running server.

## Delivery scope

The user authorized committing and pushing the complete project to **[rizad-mohamed/dksbuilders](https://github.com/rizad-mohamed/dksbuilders)**. The Quality workflow runs clean installation, dependency auditing, lint, formatting, types, production build, Playwright and Lighthouse for pushes and pull requests. Its live result is available in **[GitHub Actions](https://github.com/rizad-mohamed/dksbuilders/actions/workflows/ci.yml)**.

These measurements are local production UAT results; remote runner results are separate evidence. Source publication does not deploy a live website. Projects and Careers now provide the authorized filterable register and expressions of interest. No production hosting destination has been configured.
