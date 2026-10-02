# Cinematic hero integration

The user supplied a 10-second 1280×720 construction montage on 2 October 2026. The source remains unchanged. Delivery derivatives remove the audio track and use H.264/yuv420p with fast-start metadata:

| Asset | Dimensions | Duration | Bytes |
| --- | --- | --- | --- |
| `dks-hero-desktop.mp4` | 1280×720 | 10 seconds | 2,237,420 |
| `dks-hero-mobile.mp4` | 540×960 | 10 seconds | 901,834 |

The mobile delivery uses a central portrait crop of the original film. Desktop posters at 640/1280px and a 540×960 mobile poster come from its opening frame. The visible credit remains “Illustrative cinematic imagery”; the montage is not presented as evidence of DKS projects or employees.

Native markup includes autoplay, muted, loop, playsinline and preload=none. After idle time, the loader selects the mobile file at widths up to 760px. Reduced motion, data saver and 2G connections retain the poster without requesting video. Off-screen heroes defer loading or pause playback; hidden tabs pause. Manual pause survives scrolling out and back. Media failure or rejected autoplay pauses the video and retains the poster. A pause/play control appears after successful playback.

Local Chromium tests use the actual delivered MP4s and range-aware local routes. Desktop/mobile decode, advancing playback, duration, native looping, controls, off-screen pause/resume, dynamic reduced motion, initial reduced motion/data saver, simulated autoplay rejection and missing-file fallback passed. Sample scenes at 3 and 6 seconds were visually inspected at 1440px and 390px. Native looping was verified; no claim of a perfectly seamless editorial transition is made. Safari/Firefox and physical-device autoplay behavior remain separate checks.

For replacement footage, retain root-relative local paths in `dist/media-config.json`, truthful imagery credit, responsive first-frame posters and silent fast-start encodes. Rebuild and run `npm run test:browser` and `npm run test:video` before publishing through the existing project. The earlier creative brief remains in `docs/google-flow-prompt.txt`.
