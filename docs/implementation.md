# Redesign decisions

## Source audit

The source was a static HTML/CSS/JavaScript site, with a blue company logo, charcoal/amber presentation, a full-width video hero, capability disclosures, a project register, an illustrative Three.js study, contact links, partner marks, and static QA scripts.

The new brief authorizes a visual overhaul and a Next.js migration. The supplied reference establishes a light architectural layout, editorial headings, navy typography, blue controls and construction-drawing motifs. Newsreader suits that explicit editorial reference; DM Sans provides a readable body and interface companion. All controls and containers use square corners.

Design configuration: DESIGN_VARIANCE 7, MOTION_INTENSITY 6, VISUAL_DENSITY 3. Native CSS supports the layout; no general-purpose UI framework is required.

## Content preserved

Company location, phone numbers, both email addresses, six construction disciplines, mission/vision/values, coordinated turnkey delivery, named project-register entries, supplied marks, original company logo, and source asset provenance are retained.

The homepage project photos remain an archive. Their file numbers do not establish a match to the named projects. Illustrative photography, film and the code-native structural model have explicit visible labels. No new counters, testimonials, accreditation or project-attribution claims are introduced.

## Routes and metadata

The homepage is rebuilt in server-rendered sections with isolated client components. Projects and Careers are minimal Coming Soon routes as requested. The former capabilities anchor is supported alongside the new Services navigation.

The obsolete preview-domain canonical, sitemap and structured-data URL are removed. A confirmed deployment origin can be configured with NEXT_PUBLIC_SITE_URL. Sitemap entries and absolute canonical URLs are omitted until it is provided. Contact facts use native microdata for GeneralContractor.

## Motion and media

- CSS: hero entry, navigation underline, button feedback and image hover.
- Motion: visible-content viewport reveals, service-image transitions and modest image parallax.
- Three.js: interactive Plan/Frame/Enclosure visualization in an isolated canvas with pointer response and a pause control.
- Responsive film: retained local MP4 derivatives, loaded on user request; no autoplay download.
- Reduced motion: static CSS, no parallax, optional 3D, paused active film when the preference changes.
- Data saving: automatic 3D initialization is withheld.
- Lifecycle: 3D stops offscreen and in hidden tabs; all observers, listeners, geometry and materials are cleaned up.

The blueprint grid and drafting marks follow the explicitly supplied architectural reference. The implementation uses the preserved house illustration; it does not depict it as an actual DKS project.

## Delivery boundaries

The implementation and legitimate staged commits remain local. The source remote is retained for provenance; nothing is pushed there. Remote CI cannot be verified until the new destination is supplied.
