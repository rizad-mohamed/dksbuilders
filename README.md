# DKS Builders

Responsive engineering portfolio website for DKS Builders, Sri Lanka. The finalized design combines cinematic video, technical drawing grids, real project photographs, trusted-brand marks and progressive interactive construction studies.

## Included

- Responsive Home, Projects, Careers and Contact sections with accessible native disclosures.
- User-supplied 10-second silent hero video, separate mobile crop, poster fallback and pause/play control.
- Reduced-motion, data-saver and off-screen/hidden-page playback handling.
- Eight supplied trusted-brand logos and five original project photographs.
- Six construction disciplines, workflow micro animations and document scroll progress.
- Google Maps office embed, direct directions, WhatsApp shortcut and Quentagon development credit.
- Optional, locally bundled Three.js structural study; usable static fallback.
- SEO metadata, LocalBusiness schema, sitemap, robots and static hosting security headers.

## Local development

Requires Node.js 22 or later, npm 10 or later and Python 3.12 or later.

```sh
npm ci --ignore-scripts
npm run dev
```

Open `http://localhost:3000`. Production assets live in `dist/`; this semantic HTML/CSS/JavaScript project does not need a framework server.

## Validate and build

```sh
npm run check
npm run build
npx playwright install --with-deps chromium
npm run test:browser
npm run test:video
npm run test:design
npm audit
```

`check` validates source syntax, navigation, images, metadata, business data, image budgets, the JSON-LD CSP hash and Google Maps frame policy. `build` bundles the pinned local Three.js module and re-runs checks. `test:browser` scans six viewport sizes with Playwright/axe and checks menus, services, project disclosures, image decoding, JavaScript-disabled behavior and WebGL. `test:video` verifies actual local MP4 playback, looping, controls and fallbacks. `test:design` checks logos/photos, WhatsApp, map coordinates, Quentagon credit and scroll/workflow behavior. Browser scripts isolate the external map service. Ignored `qa-output/` contains reports and screenshots.

## Automation and delivery

GitHub Actions runs installation, validation, build, all three browser checks and dependency audit for pull requests, main-branch pushes, version tags and manual runs. Successful runs upload a deployment-ready archive with its checksum and source SHA; failed runs retain available QA diagnostics. Actions are pinned to verified commit SHAs, dependencies are locked and job permissions are scoped. Dependabot maintains npm and action updates monthly.

Version tags such as `v1.0.0` additionally publish a GitHub Release containing the tested archive. See [deployment instructions](docs/deployment.md). The release workflow does not automatically replace the company domain or change the existing Site’s audience.

## Project structure

- `dist/`: deployable HTML, CSS, JavaScript, imagery, video and bundled vendor module.
- `scripts/`: local serving, build and validation/browser checks.
- `.github/`: CI and release delivery workflow, dependency updates.
- `.openai/hosting.json`: existing Site identity and static output directory; contains no credentials.
- `docs/`: asset/content provenance, video encoding, QA and deployment handoff.

All photographic project assets and trusted-brand marks were supplied by the user. Generated service/people imagery is labelled illustrative and is not presented as completed project or staff evidence. Project photos are not assigned to named register entries without confirmed correspondence. Contact links use published company details. Automated checks do not constitute full accessibility certification or field-performance measurement.
