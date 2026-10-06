# DKS Builders — implementation decisions

Updated 6 October 2026. The current implementation uses Next.js App Router, React, TypeScript and native CSS. The original asset record remains in [content and asset provenance](content-and-assets.md).

## Brand and visual flow

The palette preserves DKS blue (`#0074be`), deep navy (`#103448`), light technical surfaces and restrained engineering yellow (`#facb63`). DM Sans is the main display and interface font; Newsreader is limited to the Residential, Commercial and Infrastructure highlight titles. Both fonts are self-hosted through `next/font/local`.

Primary containers use 8px corners, nested surfaces generally use 3–6px corners, and the floating glass navigation and mobile menu have square edges. Glass has a solid background fallback. Existing focus indicators, accessible navigation labels and mobile Escape behavior are preserved.

Headings remain left aligned while visual weight varies between sections: the project introduction is offset above an asymmetric gallery, the desktop career photograph sits left of its copy, and process steps sit left of their introduction. Mobile collapses these compositions into a clear reading order.

Homepage order: hero → three key areas → trusted brands → project photographs and register → careers invitation → company and structural study → construction disciplines → approach → contact → office map. Projects and Careers retain their intentional Coming Soon routes.

## Services and project evidence

Six discipline selectors share a photograph, description and real email enquiry link. Building, road, bridge, pipe, water-flow and house icons come from the installed Phosphor family. Decorative icons are hidden from assistive technology; buttons expose their selected state and control the live description. Service names use larger, heavier type, with a yellow rail and highlighted icon on the selected box.

The gallery uses the five supplied archive photographs and keeps their original captions. Its two leading photographs have unequal desktop widths; the remaining three use equal columns. Photographs are not assigned to named project-register entries without a verified mapping. No completion dates, awards, financial figures or testimonials are invented.

Partner logos retain their supplied colours. The DKS logo uses the supplied transparent PNG without an invented wordmark or background. Illustrative photographs, film, drawing dimensions and 3D geometry remain labelled as illustrative.

## Precise motion and accessibility

- The page progress bar uses a native scroll timeline where supported. Its JavaScript fallback loads Motion only when needed.
- Photo parallax stays within 12px in either direction. Its DOM animation engine loads when the associated section approaches the viewport.
- Career imagery gradually reveals from 18% to full opacity as it enters view. The effect has a visible fallback if animation loading fails.
- The approach rail measures the numbered step positions, fills with scroll progress and highlights reached nodes. ResizeObserver maintains alignment on responsive layouts.
- Three selected headings run a single 650ms decoding pass. Only a short wave of characters changes at a time; original character widths and accessible heading text remain stable.
- Section reveals use Motion Mini on demand. Hover feedback uses short CSS transitions; pointer glare updates CSS variables without per-frame React state updates.
- Reduced motion disables decoding, parallax and glare, keeps career imagery fully visible and displays the complete process connection.

Continuous scroll effects update DOM styles rather than React state. Observers, frame callbacks, media-query listeners and animation subscriptions are cleaned up on unmount.

## Hero film and structural study

The muted hero film selects mobile or desktop media, autoplays when visible, pauses offscreen or when the tab is hidden, and preserves a visitor's deliberate pause. The high-priority poster gets a painted frame before autoplay downloads begin. Reduced motion starts with the poster and optional Play control; failed or blocked playback keeps a usable fallback.

The Three.js study supports Plan, Frame and Enclosure, pointer response and rotation controls. It initializes near the viewport, caps pixel density, stops offscreen/in hidden tabs and disposes GPU resources. Reduced-motion and data-saving visitors explicitly opt in.

## Contact and location

Existing phone numbers, email addresses and the Elpitiya office address are preserved. The final section embeds the exact business pin resolved from the supplied Google Maps link; both directions links share that destination. The iframe is lazy loaded and has an accessible title.

WhatsApp remains available across routes and uses the supplied phone number with a prefilled message. It opens only on visitor interaction and never sends a message automatically. Safe-area spacing and footer clearance preserve mobile usability. The developer credit reads “Developed by Quentagon” and is centered.

## Architecture and delivery

Server-rendered routes compose isolated client components for navigation, media and motion. Shared content and the office destination live in `lib/`; images, film and licensed fonts live in `public/`. Optional `NEXT_PUBLIC_SITE_URL` supplies canonical and sitemap URLs for the confirmed deployment origin.

The project deploys as a Next.js application on a compatible host. GitHub Actions checks dependency advisories, lint, formatting, types, production builds, Playwright/axe and Lighthouse, and retains reports. The user has authorized committing and pushing the complete project to `rizad-mohamed/dksbuilders`. Source publication and website hosting are separate operations; no website deployment is included in this release.
