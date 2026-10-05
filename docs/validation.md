# Local verification — DKS brand refresh

Verified on 5 October 2026 in the Windows workspace using Node.js 24.19.0.

- ESLint, strict TypeScript, formatting, git diff checks and the production build passed.
- All 22 Playwright tests passed against the production build. Automated WCAG and mobile autoplay checks were repeated after the final mobile spacing adjustment and passed.
- Automated WCAG A/AA checks passed for the homepage, Projects and Careers.
- Responsive overflow checks passed at 320, 375, 430, 768, 1024, 1280, 1440 and 1920 pixels.
- Navigation, Escape behavior, keyboard skip link, contact destinations, image loading and service disclosures passed.
- Desktop/mobile film autoplay, unavailable-film fallback, offscreen pausing, visitor pause persistence and reduced-motion behavior passed.
- Carousel button/arrow-key navigation, current-slide indication and disabled boundary controls passed. Three.js stage selection and rotation pause passed.
- Desktop, mobile and 3D screenshots were visually inspected. The transparent logo has a real alpha channel and an approximately 47KB project PNG. Colours, fonts and rounded corners were verified after removing a stylesheet encoding marker that prevented root variables from matching.

## Lighthouse

Default mobile Lighthouse audits of the final production build, three runs per page; medians below. The runner completed successfully and cleaned up its owned Chromium and Next.js processes.

| Route     | Performance | Accessibility | Best practices | SEO | CLS    |
| --------- | ----------- | ------------- | -------------- | --- | ------ |
| /         | 85          | 100           | 100            | 100 | 0.0002 |
| /projects | 94          | 100           | 100            | 100 | 0      |
| /careers  | 96          | 100           | 100            | 100 | 0      |

The homepage's mobile performance runs were 67, 85 and 90. Its median remains below the 90 target. The autoplay media load and observed runner variance remain practical limits; no 90+ guarantee is claimed. Performance is a visible warning in the workflow; accessibility, best practices and SEO enforce 95, and CLS enforces 0.1. No legitimate audits are disabled to raise scores.

Motion Mini loads on demand. Native CSS handles parallax and transitions, with static fallbacks. Pointer glare avoids per-frame React rendering. Three.js remains outside the initial request path and stops when offscreen. The secondary serif is not preloaded. The film now autoplays in accordance with the latest user request, with reduced-motion and playback-policy fallbacks.

Detailed HTML/JSON reports are generated in the ignored .lighthouseci/reports directory. Ignored previews are in .local-preview; scripts/preview.mjs regenerates desktop, mobile and structural-model views against localhost:3000. Its static previews use reduced motion; normal-motion autoplay is separately verified by browser tests.

## Delivery

The implementation, asset provenance, licences, documentation and reviewable commits remain local. GitHub Actions is configured, but remote CI has not run because the new destination repository has not been supplied. The original remote has not been pushed to. Projects and Careers retain their previously authorized Coming Soon scope and now share the refreshed DKS brand system.
