# Venkatesh Sethumurugan — Portfolio

A world-class, production-ready portfolio for a **Senior Cloud DevOps Engineer**, built with a modern SaaS aesthetic, dark-mode-first design, and a cloud-engineering theme.

**Stack:** Next.js 15 (App Router) · TypeScript · TailwindCSS · Framer Motion · shadcn-style UI · Vercel.

---

## ✨ Features

- **Animated cloud hero** — drifting clouds, aurora gradients, and an engineering grid background.
- **Live GitHub stats** — server-fetched with ISR caching and a graceful fallback.
- **5 detailed projects** — each with a hand-drawn SVG architecture diagram, tech stack, business impact metrics, and a GitHub link.
- **7 pages** — Landing, About, Projects, Experience, Certifications, Blog (+ dynamic post pages), Contact.
- **SEO complete** — per-page metadata, canonical URLs, `sitemap.xml`, `robots.txt`, OpenGraph + Twitter cards, dynamic OG image generation, and JSON-LD schema (`Person`, `WebSite`, `ItemList`, `BlogPosting`, `BreadcrumbList`).
- **Fully responsive** + accessible (skip link, reduced-motion support, semantic landmarks).
- **Contact form** — works out of the box via `mailto:`, or wire it to Formspree/Resend with one env var.

---

## 📁 Folder Structure

```
.
├── app/
│   ├── layout.tsx              # Root layout: fonts, theme, nav/footer, JSON-LD
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Tailwind layers + dark theme tokens
│   ├── icon.svg                # Auto-generated favicon source
│   ├── sitemap.ts              # Dynamic sitemap
│   ├── robots.ts               # robots.txt
│   ├── manifest.ts             # PWA web manifest
│   ├── not-found.tsx           # Themed 404
│   ├── og/route.tsx            # Dynamic OpenGraph image (Edge)
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── experience/page.tsx
│   ├── certifications/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx     # Statically generated post pages
│   └── contact/page.tsx
├── components/
│   ├── ui/                     # shadcn-style primitives (button, card, badge)
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── cloud-background.tsx     # Animated cloud/aurora background
│   ├── github-stats.tsx        # Server component (live GitHub API)
│   ├── architecture-diagrams.tsx # 5 SVG architecture diagrams
│   ├── project-card.tsx
│   ├── skills-grid.tsx
│   ├── stats-band.tsx
│   ├── contact-form.tsx
│   ├── section-heading.tsx
│   ├── page-header.tsx
│   ├── cta-section.tsx
│   ├── motion.tsx              # Reusable Framer Motion reveal helpers
│   └── theme-provider.tsx
├── lib/
│   ├── data.ts                 # 🔑 Single source of truth for all content
│   ├── site.ts                 # Site config + nav
│   ├── seo.ts                  # Metadata + JSON-LD builders
│   └── utils.ts
├── public/                     # Add resume.pdf, icon-192/512.png here
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json             # shadcn config
└── package.json
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy env vars and edit
cp .env.example .env.local

# 3. Run the dev server
npm run dev
# → http://localhost:3000
```

### Environment variables

| Variable | Purpose | Required |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL (sitemap, OG, JSON-LD) | Recommended |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Username for live GitHub stats | Recommended |
| `GITHUB_TOKEN` | Raises GitHub API rate limit at build | Optional |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Formspree/Resend endpoint for the form | Optional |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Credentials for the `/admin` dashboard | For admin |
| `DATABASE_URL` | Vercel Postgres (Neon) — blog CRUD + analytics | For admin |

> Without a contact endpoint, the form gracefully falls back to a `mailto:` link.
> Without `DATABASE_URL`, the blog shows the seed posts and the dashboard shows empty states — nothing breaks.

---

## ✏️ Customizing content

Everything you'll want to edit lives in **`lib/data.ts`** and **`lib/site.ts`**:

- **Projects** → `projects[]` (title, tech stack, impact metrics, GitHub link, diagram key)
- **Experience** → `experiences[]`
- **Education** → `education[]` + `learningFocus[]` (shown on `/certifications`)
- **Skills** → `skills[]`
- **Blog posts** → managed in the `/admin` dashboard once a database is connected;
  `blogPosts[]` is the fallback seed used before then
- **Name, links, email, resume URL** → `siteConfig` in `lib/site.ts`

### Assets to add in `public/`

- `resume.pdf` — linked from every "Download résumé" button.
- `icon-192.png`, `icon-512.png` — referenced by the web manifest (PWA install icons).
- `avatar.jpg` — used in `Person` JSON-LD (optional).

The favicon is generated automatically from `app/icon.svg`, and the social
share image is generated on the fly at `/og` — no static OG image needed.

---

## 🔐 Admin dashboard (`/admin`)

A password-protected admin at **`/admin`** with:

- **Analytics** — visitor traffic (total / today / 7-day), a 14-day trend chart,
  top pages, top referrers, and Core Web Vitals (LCP/INP/CLS, p75) — collected
  first-party into your own database, plus **Vercel Web Analytics + Speed
  Insights** reporting to the Vercel dashboards.
- **Blog management** — create, edit, publish, and delete posts (Markdown body).
  The public blog reads published posts from the database, falling back to the
  seed posts in `lib/data.ts` when no DB is configured.

### Enable it (2 steps)

1. **Set credentials.** In Vercel → Settings → Environment Variables, add
   `ADMIN_USERNAME` and `ADMIN_PASSWORD`. Sign in at `/admin/login`.
2. **Add a database.** In Vercel → Storage → **Create Database → Postgres
   (Neon)**, then link it to the project. Vercel injects `DATABASE_URL`
   automatically. Redeploy — tables are created on first use.

> The dashboard and blog both work **before** you add a database (empty
> analytics + seed posts), so you can ship first and wire data later.

Visitor and Web Vitals data is gathered by a lightweight first-party beacon
(`/api/track`, `/api/vitals`); the `/admin` area is excluded from tracking.

---

## ▲ Deploying to Vercel

### Option A — Dashboard (recommended)

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and **Import** the repository.
3. Vercel auto-detects **Next.js** — no build settings needed.
   - Build command: `next build`
   - Output: `.next`
4. Add **Environment Variables** (from the table above) in the import screen.
   - At minimum set `NEXT_PUBLIC_SITE_URL` to your production domain.
5. Click **Deploy**. Done — you'll get a `*.vercel.app` URL in ~60s.

### Option B — Vercel CLI

```bash
npm i -g vercel

# First deploy (links the project, prompts for settings)
vercel

# Promote to production
vercel --prod
```

### Custom domain

1. In the Vercel project → **Settings → Domains**, add your domain.
2. Point your DNS (`A` / `CNAME`) at Vercel as instructed.
3. Update `NEXT_PUBLIC_SITE_URL` to the new domain and redeploy so canonical
   URLs, the sitemap, and OG tags all reflect it.

### Post-deploy SEO checklist

- [ ] Submit `https://yourdomain.com/sitemap.xml` to Google Search Console.
- [ ] Validate structured data with the [Rich Results Test](https://search.google.com/test/rich-results).
- [ ] Preview the share card at `https://yourdomain.com/og` and on social debuggers.
- [ ] Confirm `robots.txt` resolves at `https://yourdomain.com/robots.txt`.

---

## 🧰 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint with ESLint |
| `npm run typecheck` | Type-check with `tsc` |

---

## 📄 License

Personal portfolio — content © Venkatesh Sethumurugan. Code is free to reuse as a template.

Built with Next.js, TailwindCSS & Framer Motion.
