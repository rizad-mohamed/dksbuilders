> Migration note: this original asset record is preserved for attribution. Assets formerly under dist/assets now live under public/assets. Obsolete static-build documents have been retired. Current behavior is documented in implementation.md and README.md.

# Content inventory and provenance

Inspected all four supplied screenshots before coding. They are content sources only; none of the old card layouts, stock staff portraits, yellow rounded modules, counters, reviews or section compositions were retained.

| Information | Decision |
| --- | --- |
| DKS Builders; Sri Lankan operations; turnkey delivery | Retained; matches supplied About and current company About page |
| No. 22, Ambalangoda Road, Elpitiya | Retained; supplied Contact and current company Contact agree |
| 091 22 90 737; 077 75 52 416 | Retained; tel links normalized to +94 |
| dksbuilders@gmail.com; info@dksbuilders.com | Retained; both on supplied/current Contact, Gmail primary in current header/footer |
| Six construction service categories | Retained; supplied Services and company Services agree |
| Mission, vision, values | Condensed without guarantees; legal requirements, quality, innovation, customer satisfaction and international ambition preserved |
| 2001 history, 25-year counter, 15+ years in social post | Conflict; withheld until company confirms establishment/history |
| Staff, skilled workers, projects and built-area counters | Withheld as currentness/source consistency not established |
| CIDA C3 | Hiring sources describe C3; current registration scope/expiry not confirmed against CIDA, so omitted pending certificate |
| Leadership and employee photographs | Stock-looking portraits and unconfirmed identities excluded; engineering disciplines retained |
| Process | Derived from company About: understand, 2D/3D design, estimate, build |
| Project evidence | University of Moratuwa, Bank of Ceylon Wariyapola, Labour Office Hatton from company project register; no invented completion dates, contract values or client quotes |
| Testimonials, ratings, blogs and guarantees | Unverified/demo material removed |
| CTAs | Project discussion, portfolio exploration, real phone/email/map links; no nonworking submission form |

## Primary company sources, checked 2 October 2026

- https://dksbuilders.com/about-us/
- https://dksbuilders.com/services/
- https://dksbuilders.com/projects/
- https://dksbuilders.com/contact/
- CIDA registration lookup: https://www.cida.gov.lk/sea_con/search_ictad.php (current DKS registration was not resolved)

Company published project durations are presented as **published duration**, not independently audited delivery dates. Archive photographs are displayed together and are not falsely assigned to individual named projects.

## Asset inventory

- `dks-original-logo.webp`: original logo cropped from supplied `Services.png`; existing brand blue retained. It is a low-resolution screenshot crop, not a redesigned logo.
- `dks-project-archive-1.webp` through `6.webp`: exact project-photo crops from supplied `Home.png` portfolio. Source crops approximately 71×71px. They are authentic screenshot evidence, with visibly limited detail. Superseded by the new user-supplied 500×500 originals. No AI upscaling, synthetic details or named-project matching.
- `architecture-concept-768.webp`, `architecture-concept-1536.webp`: built-in imagegen created an editorial tropical concrete architectural concept, with warm light, raw beams/pillars, faint palms and no people/branding. Explicitly labelled conceptual on the page and excluded from project evidence. Source inspected; resized/encoded with Pillow. Superseded by the supplied film and no longer deployed.
- No external image hotlinks, stock employees, borrowed contractor photographs or generated social card.

## Outstanding company inputs

Current CIDA certificate (grade, category, number, expiry); confirmed legal trading name; establishment date; current workforce figures if desired; accurate leadership titles and owned portraits; high-resolution originals and named-project mapping; approved project statuses/dates/values; confirmation that both inboxes are monitored. Public-launch content should be signed off against company records.

## Cinematic revision assets and provenance

Eight additional built-in imagegen photographs were created in one parallel batch, inspected and encoded as 640px/1280px WebP variants: `building`, `highway`, `bridge`, `water`, `irrigation`, `home`, `engineering-team`, `craft-detail`. Shared prompt direction: photorealistic editorial Sri Lankan construction environments, tropical warm natural light, coherent amber/charcoal/steel-blue grading, physically credible infrastructure/PPE, no branded claims. Individual scenes show a concrete institutional structure, highway paving, concrete river bridge, water-service pipes/valves, agricultural irrigation channel, locally plausible residence, engineers reviewing plans, and reinforcement/formwork. None is DKS project/staff evidence. Scene-specific prompts are creative production directions, not factual claims.

Labels on the service visual, hero, process photograph and people photograph make this illustrative status visible. Five supplied project originals now appear in framed photographic plates, separately from the named project register. The supplied construction montage now replaces the original conceptual hero. Its opening frame provides responsive posters; the old conceptual asset is retained in source history. All image files remain below the static check's 300KB ceiling; the optional Three.js bundle is separately lazy-loaded and is not part of the initial page runtime.

The structural study is code-native functional geometry that explains construction sequencing; it is labelled as a concept, not a photographed real project. No workers/equipment ownership is inferred from illustrative media. The Google Flow brief is provided separately and requires the same truthful usage policy for any generated film.

## Supplied hero film

The user-uploaded construction montage was inspected as a contact sheet. Silent desktop and portrait mobile derivatives and opening-frame posters were created locally. See `hero-video-integration.md` for measured encoding details and browser QA. The film remains labelled illustrative, without attributing depicted scenes or people to DKS.

## Engineering folio supplied assets

Eight transparent brand marks (`1.png`–`8.png`, 106×79px) were losslessly encoded as WebP and shown at their native size: BOC, Access Engineering, KDAW, Ministry of Buddhasasana, Mahaweli Authority, SEC, University of Moratuwa and UDA. These are the user-designated trusted brands; no certification or endorsement claim is added. Five supplied 500×500 project PNGs (01, 03, 04, 05, 06) were encoded to WebP, without generative alteration. Their file numbers do not establish exact project-name correspondence, so the gallery uses descriptive captions rather than matching them to project-register entries.

The supplied map short link resolved to DKS Builders at 6.2898939,80.1617432. Google returned an embed document identifying the same location in Elpitiya; the frame uses those exact coordinates and the original short link is used for directions. No Google Maps API key is introduced.

## 5 October 2026 — DKS brand refresh

The latest direct user request replaces the earlier visual direction. The full-site capture from dksbuilders.com is now the primary layout/style reference; the compact light concept informs the three-area row and careers section. Earlier aesthetic decisions above are historical provenance, not current design instructions.

The supplied full DKS logo was isolated using built-in imagegen background extraction and optimized to a 360px transparent PNG (`dks-logo-transparent.png`, approximately 47KB). The visible header/footer use this mark without an opaque backing. Exact edit prompt and usage are recorded in implementation.md.

The completed-building slider selects supplied archive photographs 04, 05 and 06: a finished two-storey building beside a lawn, the Panduwasnuwara bus stand facade and a poolside terrace. These are shown with descriptive archive captions rather than invented named-project matches. Photographs 01 and 03 remain preserved but are omitted from this completed-building selection. The separately sourced named register remains unchanged.

Trusted marks are displayed only in monochrome, including hover, in the third homepage section. The supplied film now plays automatically when visible unless reduced motion is requested; its illustrative status remains visible. Code-native technical drawings use illustrative dimensions and explicitly say CONCEPT / NOT TO SCALE.

## Subsequent visual refinement — latest user references

The latest direct request restores partner marks to their original colours and replaces the carousel with the five-photo two-over-three archive gallery. This supersedes the monochrome and completed-building-only presentation described in the preceding historical entry. The source photographs and their descriptive archive captions remain unchanged and are not mapped to named register entries.

Reduced displayed photo heights, more visible square grids and engineering-yellow highlights follow the new screenshots. A persistent lower-right WhatsApp link reuses the official source site's `wa.me/94777552416` destination and project-enquiry prefill. It opens a conversation only when clicked; the website never sends a message automatically.
