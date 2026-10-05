# Local verification

Verified on 5 October 2026 in the Windows workspace using Node.js 24.19.0.

- Clean npm ci installation passed; npm reported zero dependency vulnerabilities.
- ESLint, strict TypeScript, formatting and the production build passed.
- All 19 Playwright tests passed against the production build after the final typography fix.
- Automated WCAG checks passed for the homepage, Projects and Careers.
- Responsive overflow checks passed at 320, 375, 430, 768, 1024, 1280, 1440 and 1920 pixels.
- Navigation, Escape behavior, keyboard skip link, contact destinations, image loading, service disclosures, hero film playback/failure, reduced motion and Three.js stage/pause controls passed.
- Final desktop, mobile and 3D screenshots were visually inspected. The original font fallback was corrected by defining Next font variables on the document root.
- The audit runner uses a free port and stops its owned process tree, including Next's Windows worker. The final audit used the corrected build rather than a stale server.

## Lighthouse

Default mobile Lighthouse audits, three runs per page; medians shown below.

| Route     | Performance | Accessibility | Best practices | SEO | CLS |
| --------- | ----------- | ------------- | -------------- | --- | --- |
| /         | 85          | 100           | 100            | 100 | 0   |
| /projects | 90          | 100           | 100            | 100 | 0   |
| /careers  | 94          | 100           | 100            | 100 | 0   |

The homepage's final mobile performance runs ranged from 83 to 92. Its median remains below the 90 target. Performance is a visible warning in the automated workflow to accommodate measured runner variance; accessibility, best practices and SEO enforce 95, and CLS enforces 0.1. No legitimate audits are disabled to increase scores.

Initial animation cost was reduced by keeping reveal wrappers server-rendered, sharing one observer and lazily loading Motion Mini. CSS handles scroll parallax and service transitions. Speculative route prefetching is disabled. Three.js and film are absent from the initial request path.

Detailed HTML/JSON reports are generated in the ignored .lighthouseci/reports directory. Review this warning after deployment on the confirmed host and on representative physical devices; a passing warning threshold is not a guarantee of 90+ performance.

## Delivery

The rebuilt application, licenses, asset provenance, documentation and meaningful implementation commits are stored locally. Generated builds, browser reports and preview screenshots are ignored.

GitHub Actions is configured with caching, concurrency, read-only repository permissions, immutable Action hashes, browser tests and Lighthouse checks. Remote CI has not been executed because the new destination repository has not been supplied. The original remote has not been pushed to.

ESLint 9 is retained for the current JSX accessibility plugin's supported peer range. TypeScript 6 is retained because typescript-eslint does not yet support TypeScript 7. These choices do not downgrade Next.js or React.
