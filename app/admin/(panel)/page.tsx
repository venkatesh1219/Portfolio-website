import { Eye, CalendarDays, TrendingUp, Files, Gauge, Database } from "lucide-react";
import { getAnalytics } from "@/lib/db";
import { StatCard, AreaChart, BarList, VitalCard } from "@/components/admin/charts";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const a = await getAnalytics();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Visitor traffic and Core Web Vitals for your portfolio.
        </p>
      </div>

      {!a.configured && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
          <Database className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-medium">No database connected yet</p>
            <p className="mt-1 text-amber-200/80">
              Add a Vercel Postgres (Neon) store and set <code>DATABASE_URL</code> to
              start collecting first-party visitor and Web Vitals data. Vercel Web
              Analytics &amp; Speed Insights are already wired up and reporting to your
              Vercel dashboards in the meantime.
            </p>
          </div>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total views" value={a.totalViews.toLocaleString()} icon={Eye} />
        <StatCard label="Today" value={a.viewsToday.toLocaleString()} icon={CalendarDays} />
        <StatCard label="Last 7 days" value={a.views7d.toLocaleString()} icon={TrendingUp} />
        <StatCard label="Pages tracked" value={a.uniquePaths.toLocaleString()} icon={Files} />
      </div>

      {/* Time series */}
      <section className="rounded-2xl border border-border bg-card/40 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Visitors</h2>
          <span className="text-xs text-muted-foreground">Last 14 days</span>
        </div>
        <AreaChart data={a.series} />
      </section>

      {/* Top pages + referrers */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card/40 p-6">
          <h2 className="mb-4 font-semibold">Top pages</h2>
          <BarList items={a.topPages.map((p) => ({ label: p.path, value: p.views }))} />
        </section>
        <section className="rounded-2xl border border-border bg-card/40 p-6">
          <h2 className="mb-4 font-semibold">Top referrers</h2>
          <BarList
            items={a.topReferrers.map((r) => ({ label: r.referrer, value: r.views }))}
            empty="No referrers yet — most visits are direct"
          />
        </section>
      </div>

      {/* Web Vitals */}
      <section className="rounded-2xl border border-border bg-card/40 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Gauge className="h-4 w-4 text-primary" />
          <h2 className="font-semibold">Core Web Vitals</h2>
          <span className="ml-auto text-xs text-muted-foreground">p75 · last 30 days</span>
        </div>
        {a.vitals.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {a.vitals.map((v) => (
              <VitalCard key={v.metric} metric={v.metric} p75={v.p75} samples={v.samples} />
            ))}
          </div>
        ) : (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No performance samples yet — they appear as real visitors load the site.
          </p>
        )}
      </section>
    </div>
  );
}
