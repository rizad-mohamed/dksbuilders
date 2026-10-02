# QA — Cinematic revision, 2 October 2026

## Passed locally

- Static source audit: all section links, unique IDs, one H1/logical heading levels, image alt/dimensions, local assets, normalized NAP, schema, canonical/sitemap, placeholders, reduced-motion/focus rules and image byte budgets.
- Production build: self-hosted minified Three.js bundle with license, JavaScript syntax validation; no remote runtime dependencies.
- Local Chromium render and interaction audits at **320×780, 390×844, 768×1024, 1280×800, 1440×1000, 2560×1080**. No document horizontal overflow, no JavaScript exceptions, all requested images decoded.
- Mobile menu toggle/Escape; service disclosure updates image and caption; published project disclosures expand.
- Keyboard range changes the loaded 3D study to enclosure; WebGL renders successfully. Changing to reduced motion disposes the canvas and returns the static fallback. 3D not offered in reduced-motion baseline.
- Actual desktop/mobile MP4 playback, muted inline looping, pause/resume, off-screen pause/resume, preference changes, initial reduced motion/data saver, simulated autoplay rejection and missing-media fallback passed. JS-disabled mobile navigation and content remain available.
- Axe WCAG 2/2.1/2.2 A/AA-tagged scans: **zero violations across all six viewports** after resolving blue/secondary-text contrast findings. All source checks and browser checks completed with zero captured page exceptions.
- Visual inspection: desktop/mobile hero, desktop complete page, structural 3D scene and image contact sheet. Reduced-motion full-page captures were used for stable layout inspection; rendered transitions were tested separately.

## Method and practical limits

Tests route the actual local checkout to `https://dks.test/`; no public or private deployed URL was used as a testing target. A locally installed Chromium executable and software graphics made WebGL/browser QA possible in the container. The reusable script supports normal Playwright Chromium in GitHub CI. Test screenshots/reports stay under ignored `qa-output/`.

Automated axe success is not a complete WCAG conformance certification. Safari/Firefox, physical touch devices, screen-reader usability, 200% text enlargement and deployed response headers still need human/device checks before public launch. No Lighthouse score, INP/LCP/CLS figure, GPU benchmark or real-world Core Web Vitals result is invented. The supplied film was decoded and played in local Chromium; representative desktop/mobile scenes were inspected. Connection preferences and rejection/error conditions were simulated. Physical-device autoplay and real connections remain unmeasured.

## Publication/content verification

Confirm the current company CIDA certificate/grade and official wording before adding it. Establishment and workforce claims remain omitted where earlier sources conflict. No fabricated reviews, ratings, projects or clients. Generic imagery is explicitly illustrative, including engineers who are not presented as DKS staff. The newly supplied 500×500 project originals replace the screenshot thumbnail archive; larger source originals would improve large-screen photographic detail. Public-domain launch also needs the company's content sign-off and domain-specific metadata.

## Engineering folio revision validation

Repeated the six viewport layout/accessibility scans: zero detected axe violations, zero page exceptions and all images decoded. Checked eight brand marks, five project originals, fixed WhatsApp placement and destination, Quentagon credit, exact Google Maps coordinates, top-to-bottom scroll progress and active workflow rows. Desktop/mobile section captures were visually inspected. The Google iframe was isolated with a neutral stub for targeted layout checks; its real embed document was separately retrieved and confirmed the coordinates and Elpitiya location. External map rendering remains dependent on Google and browser connectivity. Hero-media playback/fallback QA is retained separately.
