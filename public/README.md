# Public assets

Drop these files here (referenced by the app):

- `profile.jpg` — your hero photo. A square image (~600×600+) works best. Until
  you add it, the hero shows a clean "VS" monogram and auto-upgrades to your
  photo once the file is present — no code change needed.
- `resume.pdf` — linked from every "Download résumé" button (`siteConfig.resumeUrl`).
- `icon-192.png` / `icon-512.png` — PWA install icons (see `app/manifest.ts`).
- `avatar.jpg` — optional, used in the `Person` JSON-LD.

The favicon is generated from `app/icon.svg`, and the social share image is
generated dynamically at `/og`, so no static `og-image.png` is required.
