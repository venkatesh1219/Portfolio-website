import { cn } from "@/lib/utils";

/* ------------------------------- Stat card -------------------------------- */

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: React.FC<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl border border-border bg-card/40 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        {Icon && <Icon className="h-4 w-4 text-primary" />}
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

/* ------------------------- Area chart (time series) ----------------------- */

export function AreaChart({
  data,
  height = 180,
}: {
  data: { day: string; views: number }[];
  height?: number;
}) {
  const w = 720;
  const h = height;
  const pad = { top: 10, right: 8, bottom: 22, left: 8 };
  const max = Math.max(1, ...data.map((d) => d.views));
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const stepX = data.length > 1 ? innerW / (data.length - 1) : innerW;

  const pts = data.map((d, i) => {
    const x = pad.left + i * stepX;
    const y = pad.top + innerH - (d.views / max) * innerH;
    return [x, y] as const;
  });

  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const area =
    `M${pad.left},${pad.top + innerH} ` +
    pts.map(([x, y]) => `L${x},${y}`).join(" ") +
    ` L${pad.left + innerW},${pad.top + innerH} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1={pad.left}
          x2={pad.left + innerW}
          y1={pad.top + innerH * g}
          y2={pad.top + innerH * g}
          stroke="hsl(var(--border))"
          strokeDasharray="3 4"
        />
      ))}
      <path d={area} fill="url(#areaFill)" />
      <path d={line} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="hsl(var(--primary))" />
      ))}
      {data.map((d, i) =>
        i % 2 === 0 ? (
          <text
            key={d.day}
            x={pad.left + i * stepX}
            y={h - 6}
            textAnchor="middle"
            className="fill-[hsl(var(--muted-foreground))] text-[10px]"
          >
            {d.day.slice(5)}
          </text>
        ) : null
      )}
    </svg>
  );
}

/* --------------------------------- Bar list ------------------------------- */

export function BarList({
  items,
  empty = "No data yet",
}: {
  items: { label: string; value: number }[];
  empty?: string;
}) {
  if (!items.length) {
    return <p className="py-6 text-center text-sm text-muted-foreground">{empty}</p>;
  }
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it.label} className="relative">
          <div className="flex items-center justify-between gap-3 rounded-md px-2.5 py-1.5 text-sm">
            <span className="relative z-10 truncate font-medium">{it.label}</span>
            <span className="relative z-10 tabular-nums text-muted-foreground">{it.value}</span>
          </div>
          <div
            className="absolute inset-y-0 left-0 z-0 rounded-md bg-primary/15"
            style={{ width: `${(it.value / max) * 100}%` }}
          />
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------ Web Vital card ---------------------------- */

// Core Web Vitals "good" thresholds (75th percentile).
const THRESHOLDS: Record<string, { good: number; poor: number; unit: string }> = {
  LCP: { good: 2500, poor: 4000, unit: "ms" },
  INP: { good: 200, poor: 500, unit: "ms" },
  CLS: { good: 0.1, poor: 0.25, unit: "" },
  FCP: { good: 1800, poor: 3000, unit: "ms" },
  TTFB: { good: 800, poor: 1800, unit: "ms" },
};

export function VitalCard({
  metric,
  p75,
  samples,
}: {
  metric: string;
  p75: number;
  samples: number;
}) {
  const t = THRESHOLDS[metric] ?? { good: 0, poor: Infinity, unit: "" };
  const rating = p75 <= t.good ? "good" : p75 <= t.poor ? "needs work" : "poor";
  const color =
    rating === "good"
      ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
      : rating === "needs work"
        ? "text-amber-300 border-amber-500/30 bg-amber-500/10"
        : "text-destructive border-destructive/30 bg-destructive/10";
  const display =
    metric === "CLS" ? p75.toFixed(3) : `${Math.round(p75)}${t.unit}`;

  return (
    <div className="rounded-xl border border-border bg-card/40 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{metric}</span>
        <span className={cn("rounded-full border px-2 py-0.5 text-[11px] font-medium", color)}>
          {rating}
        </span>
      </div>
      <p className="mt-2 text-2xl font-bold tabular-nums">{display}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        p75 · {samples} sample{samples === 1 ? "" : "s"}
      </p>
    </div>
  );
}
