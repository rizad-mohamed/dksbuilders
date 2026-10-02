# Deployment and release handoff

## Deliverable

Serve the contents of `dist/` at the web origin root. Absolute asset paths (`/assets/...`) mean it must not be mounted under a repository subpath without a deliberate path/metadata migration. No Node server, database, runtime API key or environment secret is required for this static site.

The existing Site identity is preserved in `.openai/hosting.json`; changing GitHub source does not automatically bind that Site to this repository. Publication to that Site remains through Sites’ source/version deployment flow. No GitHub Pages or alternate public host is silently enabled.

## Continuous integration

The `ci.yml` workflow runs on main pushes, pull requests, version tags and manual dispatch. It uses locked npm installation, syntax/static/header checks, production build, responsive/axe/WebGL checks, real MP4 playback/fallback checks, engineering-folio checks and npm dependency audit. A deployment archive is produced only after successful validation. QA diagnostics are uploaded even after test failure, when available.

The archive contains `dist/`, `.openai/hosting.json` and `SOURCE_COMMIT.txt`. Its `.sha256` companion verifies its bytes. CI artifacts expire after 30 days; QA diagnostics expire after 14 days. No source credentials, node_modules or uploaded source PNGs are packaged.

## Versioned delivery

After a main commit has passed CI, an authorized maintainer can create and push an annotated semantic-version tag:

```sh
git tag -a v1.0.0 -m "Release finalized DKS Builders website"
git push origin v1.0.0
```

The tag triggers full validation. Only after success does the release job create a GitHub Release for that tag and attach the archive/checksum. Release notes identify the exact tested source SHA. The job receives `contents: write`; validation retains `contents: read`. It uses the built-in Actions token and requires no personal token. Existing assets are not overwritten. The workflow does not create a release for ordinary main pushes or manual CI runs.

## Hosting checks

A host must serve `.mp4` as `video/mp4` and support byte ranges; CSS and JS must have correct MIME types. Apply `dist/_headers` on hosts that support that format, or transfer the same policies into server configuration. Its CSP explicitly permits Google Maps frames while keeping scripts and media local. Header semantics are host-specific; GitHub Pages does not apply `_headers`.

The map iframe points to the exact coordinates resolved from the supplied Google Maps link. A directions link remains available when Google is unavailable. Hero playback respects reduced-motion/data-saving preferences and falls back to its still poster if decoding/autoplay fails.

The current canonical URL, Open Graph URL, JSON-LD URL, sitemap and robots target the existing Site. A domain migration must change these together; do not publish unchanged metadata on a different domain as a final public launch. Confirm company content and high-resolution portfolio originals before that launch.

## Rollback

Re-deploy a previous tested archive or revert the responsible Git commit and let CI validate the restored state. Preserve git history; do not force-push main for routine rollback. The repository contains supplied client assets: keep their provenance and illustrative labelling intact.
