import "server-only";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { blogPosts } from "./data";

/**
 * Data layer backed by Vercel Postgres (Neon). Every public function degrades
 * gracefully when no database is configured: blog reads fall back to the static
 * seed in `lib/data.ts`, analytics return empty sets, and mutations throw a
 * clear, catchable error. This keeps the site (and builds) working before the
 * database is provisioned.
 */

const CONNECTION_STRING =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  "";

export function isDbConfigured(): boolean {
  return CONNECTION_STRING.length > 0;
}

let _sql: NeonQueryFunction<false, false> | null = null;
function getSql(): NeonQueryFunction<false, false> | null {
  if (!isDbConfigured()) return null;
  if (!_sql) _sql = neon(CONNECTION_STRING);
  return _sql;
}

let schemaReady: Promise<void> | null = null;
async function ensureSchema(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  if (schemaReady) return schemaReady;
  schemaReady = (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL DEFAULT '',
        body TEXT NOT NULL DEFAULT '',
        tags TEXT NOT NULL DEFAULT '',
        reading_time TEXT NOT NULL DEFAULT '5 min read',
        status TEXT NOT NULL DEFAULT 'draft',
        published_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )`;
    await sql`
      CREATE TABLE IF NOT EXISTS pageviews (
        id SERIAL PRIMARY KEY,
        path TEXT NOT NULL,
        referrer TEXT,
        device TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )`;
    await sql`
      CREATE TABLE IF NOT EXISTS web_vitals (
        id SERIAL PRIMARY KEY,
        metric TEXT NOT NULL,
        value DOUBLE PRECISION NOT NULL,
        rating TEXT,
        path TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )`;
    await sql`CREATE INDEX IF NOT EXISTS pageviews_created_idx ON pageviews (created_at)`;
    await sql`CREATE INDEX IF NOT EXISTS vitals_created_idx ON web_vitals (created_at)`;
  })();
  return schemaReady;
}

/* ------------------------------- Blog posts ------------------------------- */

export type PostStatus = "draft" | "published";

export type Post = {
  id: number | string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  tags: string[];
  readingTime: string;
  status: PostStatus;
  date: string; // ISO — published_at, else created_at
  cover?: string; // optional architecture diagram (seed posts only)
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function parseTags(tags: string): string[] {
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

// Seed posts used as fallback when there's no database.
function seedPosts(): Post[] {
  return blogPosts.map((p, i) => ({
    id: `seed-${i}`,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    body: p.body ?? "",
    tags: [...p.tags],
    readingTime: p.readingTime,
    status: "published" as const,
    date: p.date,
    cover: p.cover,
  }));
}

function rowToPost(r: Record<string, any>): Post {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt ?? "",
    body: r.body ?? "",
    tags: parseTags(r.tags ?? ""),
    readingTime: r.reading_time ?? "5 min read",
    status: (r.status as PostStatus) ?? "draft",
    date: (r.published_at ?? r.created_at)?.toISOString?.() ?? String(r.published_at ?? r.created_at),
  };
}

export async function getPublishedPosts(): Promise<Post[]> {
  const sql = getSql();
  if (!sql) return seedPosts();
  try {
    await ensureSchema();
    const rows = await sql`
      SELECT * FROM posts
      WHERE status = 'published'
      ORDER BY COALESCE(published_at, created_at) DESC`;
    // Merge: code seed is the baseline; any DB post overrides its slug so
    // admin-edited posts win, while code-authored articles always appear.
    const seedBySlug = new Map<string, Post>(
      seedPosts().map((p) => [p.slug, p] as [string, Post]),
    );
    const bySlug = new Map<string, Post>(seedBySlug);
    for (const r of rows) {
      const p = rowToPost(r);
      const seed = seedBySlug.get(p.slug);
      if (seed) {
        if (!p.body) p.body = seed.body;
        if (!p.cover) p.cover = seed.cover;
      }
      bySlug.set(p.slug, p);
    }
    return [...bySlug.values()].sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch {
    return seedPosts();
  }
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const sql = getSql();
  if (!sql) return seedPosts().find((p) => p.slug === slug) ?? null;
  try {
    await ensureSchema();
    const rows = await sql`
      SELECT * FROM posts WHERE slug = ${slug} AND status = 'published' LIMIT 1`;
    const seed = seedPosts().find((p) => p.slug === slug) ?? null;
    if (rows.length) {
      const p = rowToPost(rows[0]);
      if (seed) {
        if (!p.body) p.body = seed.body;
        if (!p.cover) p.cover = seed.cover;
      }
      return p;
    }
    return seed;
  } catch {
    return seedPosts().find((p) => p.slug === slug) ?? null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const sql = getSql();
  if (!sql) return seedPosts();
  await ensureSchema();
  const rows = await sql`SELECT * FROM posts ORDER BY updated_at DESC`;
  return rows.map(rowToPost);
}

export async function getPostById(id: string): Promise<Post | null> {
  const sql = getSql();
  if (!sql) return null;
  await ensureSchema();
  const rows = await sql`SELECT * FROM posts WHERE id = ${id} LIMIT 1`;
  return rows.length ? rowToPost(rows[0]) : null;
}

export type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  tags: string;
  readingTime: string;
  status: PostStatus;
};

export async function createPost(input: PostInput): Promise<Post> {
  const sql = getSql();
  if (!sql) throw new Error("Database not configured");
  await ensureSchema();
  const publishedAt = input.status === "published" ? new Date().toISOString() : null;
  const rows = await sql`
    INSERT INTO posts (slug, title, excerpt, body, tags, reading_time, status, published_at)
    VALUES (${input.slug}, ${input.title}, ${input.excerpt}, ${input.body},
            ${input.tags}, ${input.readingTime}, ${input.status}, ${publishedAt})
    RETURNING *`;
  return rowToPost(rows[0]);
}

export async function updatePost(id: string, input: PostInput): Promise<Post> {
  const sql = getSql();
  if (!sql) throw new Error("Database not configured");
  await ensureSchema();
  // Set published_at the first time a post is published; keep it otherwise.
  const rows = await sql`
    UPDATE posts SET
      slug = ${input.slug},
      title = ${input.title},
      excerpt = ${input.excerpt},
      body = ${input.body},
      tags = ${input.tags},
      reading_time = ${input.readingTime},
      status = ${input.status},
      published_at = CASE
        WHEN ${input.status} = 'published' AND published_at IS NULL THEN now()
        WHEN ${input.status} = 'draft' THEN NULL
        ELSE published_at END,
      updated_at = now()
    WHERE id = ${id}
    RETURNING *`;
  if (!rows.length) throw new Error("Post not found");
  return rowToPost(rows[0]);
}

export async function deletePost(id: string): Promise<void> {
  const sql = getSql();
  if (!sql) throw new Error("Database not configured");
  await ensureSchema();
  await sql`DELETE FROM posts WHERE id = ${id}`;
}

/* ------------------------------- Analytics -------------------------------- */

export async function recordPageview(path: string, referrer: string, device: string) {
  const sql = getSql();
  if (!sql) return;
  try {
    await ensureSchema();
    await sql`INSERT INTO pageviews (path, referrer, device) VALUES (${path}, ${referrer}, ${device})`;
  } catch {
    /* analytics is best-effort */
  }
}

export async function recordVital(metric: string, value: number, rating: string, path: string) {
  const sql = getSql();
  if (!sql) return;
  try {
    await ensureSchema();
    await sql`INSERT INTO web_vitals (metric, value, rating, path) VALUES (${metric}, ${value}, ${rating}, ${path})`;
  } catch {
    /* best-effort */
  }
}

export type VitalSummary = {
  metric: string;
  p75: number;
  samples: number;
};

export type Analytics = {
  configured: boolean;
  totalViews: number;
  viewsToday: number;
  views7d: number;
  uniquePaths: number;
  series: { day: string; views: number }[];
  topPages: { path: string; views: number }[];
  topReferrers: { referrer: string; views: number }[];
  vitals: VitalSummary[];
};

function emptyAnalytics(configured: boolean): Analytics {
  // 14-day zero-filled series so the chart always has an x-axis.
  const series: { day: string; views: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    series.push({ day: d.toISOString().slice(0, 10), views: 0 });
  }
  return {
    configured,
    totalViews: 0,
    viewsToday: 0,
    views7d: 0,
    uniquePaths: 0,
    series,
    topPages: [],
    topReferrers: [],
    vitals: [],
  };
}

export async function getAnalytics(): Promise<Analytics> {
  const sql = getSql();
  if (!sql) return emptyAnalytics(false);
  try {
    await ensureSchema();
    const [totals, today, week, uniq, seriesRows, pages, refs, vitals] = await Promise.all([
      sql`SELECT count(*)::int AS n FROM pageviews`,
      sql`SELECT count(*)::int AS n FROM pageviews WHERE created_at >= date_trunc('day', now())`,
      sql`SELECT count(*)::int AS n FROM pageviews WHERE created_at > now() - interval '7 days'`,
      sql`SELECT count(DISTINCT path)::int AS n FROM pageviews`,
      sql`SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day, count(*)::int AS views
          FROM pageviews WHERE created_at > now() - interval '14 days'
          GROUP BY day ORDER BY day`,
      sql`SELECT path, count(*)::int AS views FROM pageviews
          WHERE created_at > now() - interval '30 days'
          GROUP BY path ORDER BY views DESC LIMIT 8`,
      sql`SELECT referrer, count(*)::int AS views FROM pageviews
          WHERE created_at > now() - interval '30 days' AND referrer IS NOT NULL AND referrer <> ''
          GROUP BY referrer ORDER BY views DESC LIMIT 8`,
      sql`SELECT metric, count(*)::int AS samples,
                 percentile_cont(0.75) WITHIN GROUP (ORDER BY value) AS p75
          FROM web_vitals WHERE created_at > now() - interval '30 days'
          GROUP BY metric`,
    ]);

    // Zero-fill the 14-day series.
    const base = emptyAnalytics(true).series;
    const found = new Map(seriesRows.map((r) => [r.day as string, r.views as number]));
    const series = base.map((d) => ({ day: d.day, views: found.get(d.day) ?? 0 }));

    return {
      configured: true,
      totalViews: totals[0]?.n ?? 0,
      viewsToday: today[0]?.n ?? 0,
      views7d: week[0]?.n ?? 0,
      uniquePaths: uniq[0]?.n ?? 0,
      series,
      topPages: pages.map((r) => ({ path: r.path as string, views: r.views as number })),
      topReferrers: refs.map((r) => ({ referrer: r.referrer as string, views: r.views as number })),
      vitals: vitals.map((r) => ({
        metric: r.metric as string,
        p75: Number(r.p75 ?? 0),
        samples: r.samples as number,
      })),
    };
  } catch {
    return emptyAnalytics(true);
  }
}
