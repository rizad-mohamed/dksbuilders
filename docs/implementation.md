# DKS brand refresh — implementation decisions

The latest user request takes precedence over instructions in the earlier pasted brief. The full-site screenshot and supplied official DKS logo establish the current visual direction. The earlier light architectural concept informs the three-area service row and careers composition.

## Brand and hierarchy

The shared palette is white, DKS blue (#0074be) and deep navy (#103448). DM Sans is the primary display/interface family, matching the modern architectural reference. Newsreader is limited to the three service titles, following the compact reference. Buttons use pill corners; primary containers use 22px corners, nested media 16px and small marks 12px. Projects and Careers keep their authorized Coming Soon scope and share the header, transparent logo, palette, drawing motif and controls.

Homepage order: hero → three key areas → monochrome trusted brands (third section) → completed-project photography carousel and project register → Build your career with DKS → company and interactive structural study → six services → approach → contact.

Residential, Commercial and Infrastructure reflect the documented company capabilities. The completed-building carousel uses supplied archive photographs 04, 05 and 06. Construction-stage images remain available in the asset archive. No photograph is assigned to a named register entry without a source mapping. No completion dates, financial figures, accreditation or testimonials are invented.

## Logo

The supplied DKS mark was isolated with built-in imagegen background extraction, then trimmed and encoded as a transparent PNG: `public/assets/dks-logo-transparent.png`. Its alpha channel was verified. The header and footer use this full mark without a separate invented wordmark or background container.

Final image-edit prompt: “Remove only the black background of the official logo to real transparent alpha PNG. Preserve the exact existing logo shapes, typography, arrangement, blue and grey colours and tagline verbatim. Do not redesign or stylize. Fit the full logo closely in the output with a small transparent margin, no huge blank canvas, no added shadow, no backdrop, no checkerboard baked into pixels.” The edit target was the supplied blue/grey DKS BUILDERS mark and Making Dreams Come to Life tagline; the website screenshot was excluded as an edit target. The original generated asset is preserved outside the project; its optimized project copy is committed with the site.

## Engineering detail and motion

Subtle blue grids, datum marks, section rules and a code-native axonometric drawing connect the sections. Drawing dimensions are illustrative and labelled CONCEPT / NOT TO SCALE. The retained Three.js structural study supports Plan, Frame and Enclosure, pointer response and rotation pause. It initializes near the viewport, caps pixel density, stops offscreen/in hidden tabs and disposes GPU resources. Reduced-motion and data-saving visitors explicitly opt into it.

The hero plays the muted responsive film automatically when visible. It pauses offscreen/in hidden tabs, resumes on returning when the visitor has not deliberately paused, and preserves that deliberate pause. Reduced motion starts with a static opening-frame poster and an optional Play control. Unavailable media retains the poster; browser autoplay rejection retains the Play control.

Native CSS view timelines provide stronger hero and photo parallax with static fallbacks. Motion Mini progressively adds section reveals. Navigation, buttons, accordion images, carousel controls and partner marks have restrained microanimations. Pointer glare uses CSS variables updated through requestAnimationFrame, without React updates per pointer frame. Reduced motion disables parallax and glare.

The native scroll-snap carousel supports touch/trackpad scrolling, labelled Previous/Next buttons, arrow-key navigation, a live current-slide indicator and disabled boundary controls. It does not advance automatically. The lint exceptions are confined to its intentionally focusable native scroll region; keyboard and automated accessibility tests validate the behavior.

## Delivery

All work remains local. No remote publishing or push is authorized by this refresh. The source remote remains for provenance until the requested new destination is provided. Existing contact details and the asset provenance record are preserved.
