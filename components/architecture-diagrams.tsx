import * as React from "react";
import type { Project } from "@/lib/data";

/**
 * Lightweight, theme-aware SVG architecture diagrams — one per project.
 * They use currentColor / CSS variables so they look native in dark mode
 * and scale crisply on any screen. Kept dependency-free on purpose.
 */

const box =
  "fill-[hsl(var(--card))] stroke-[hsl(var(--border))]";
const accentBox =
  "fill-[hsl(var(--primary)/0.12)] stroke-[hsl(var(--primary)/0.5)]";
const line = "stroke-[hsl(var(--muted-foreground)/0.5)]";
const label = "fill-[hsl(var(--foreground))] text-[11px] font-medium";
const sub = "fill-[hsl(var(--muted-foreground))] text-[9px]";

function Node({
  x,
  y,
  w = 120,
  h = 44,
  title,
  subtitle,
  accent,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  title: string;
  subtitle?: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        className={accent ? accentBox : box}
        strokeWidth={1}
      />
      <text
        x={x + w / 2}
        y={subtitle ? y + h / 2 - 2 : y + h / 2 + 4}
        textAnchor="middle"
        className={label}
      >
        {title}
      </text>
      {subtitle && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          className={sub}
        >
          {subtitle}
        </text>
      )}
    </g>
  );
}

function Connector({ d }: { d: string }) {
  return (
    <path
      d={d}
      className={line}
      strokeWidth={1.25}
      fill="none"
      markerEnd="url(#arrow)"
    />
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 520 300"
      role="img"
      className="h-auto w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path
            d="M0 0 L10 5 L0 10 z"
            className="fill-[hsl(var(--muted-foreground)/0.6)]"
          />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

function LandingZone() {
  return (
    <Frame>
      <title>AWS Landing Zone architecture</title>
      <Node x={200} y={12} title="AWS Organizations" subtitle="Control Tower" accent />
      <Connector d="M260 56 L260 80" />
      <Node x={200} y={80} title="Management" subtitle="Account Factory (AFT)" />
      <Connector d="M200 102 L120 140" />
      <Connector d="M260 124 L260 140" />
      <Connector d="M320 102 L400 140" />
      <Node x={40} y={140} title="Log Archive" subtitle="CloudTrail / Config" />
      <Node x={200} y={140} title="Audit" subtitle="GuardDuty / SecHub" />
      <Node x={360} y={140} title="Network Hub" subtitle="Transit Gateway" />
      <Connector d="M100 184 L100 216" />
      <Connector d="M260 184 L260 216" />
      <Connector d="M420 184 L420 216" />
      <Node x={40} y={216} title="Prod OU" subtitle="Workload accounts" />
      <Node x={200} y={216} title="Non-Prod OU" subtitle="Dev / Stage" />
      <Node x={360} y={216} title="Sandbox OU" subtitle="SCP guardrails" />
    </Frame>
  );
}

function EKS() {
  return (
    <Frame>
      <title>EKS platform architecture</title>
      <Node x={200} y={12} title="Developers" subtitle="git push" accent />
      <Connector d="M260 56 L260 78" />
      <Node x={180} y={78} w={160} title="Ingress / Istio Gateway" subtitle="ALB + mTLS mesh" />
      <Connector d="M260 122 L260 144" />
      <rect x={40} y={144} width={440} height={140} rx={10} className={box} strokeWidth={1} />
      <text x={56} y={162} className={sub}>Amazon EKS · multi-tenant</text>
      <Node x={56} y={172} w={120} title="Team A NS" subtitle="quota + RBAC" />
      <Node x={200} y={172} w={120} title="Team B NS" subtitle="NetworkPolicy" />
      <Node x={344} y={172} w={120} title="Platform NS" subtitle="Kyverno / ESO" />
      <Node x={56} y={232} w={120} title="Karpenter" subtitle="Spot + Graviton" accent />
      <Node x={200} y={232} w={120} title="Cert-Manager" subtitle="TLS automation" />
      <Node x={344} y={232} w={120} title="External Secrets" subtitle="AWS SM" />
    </Frame>
  );
}

function GitOps() {
  return (
    <Frame>
      <title>GitOps platform architecture</title>
      <Node x={20} y={120} title="Developer" subtitle="Pull Request" accent />
      <Connector d="M140 142 L180 142" />
      <Node x={180} y={120} title="GitHub Actions" subtitle="build + scan" />
      <Connector d="M300 142 L340 142" />
      <Node x={340} y={120} title="Git Repo" subtitle="desired state" accent />
      <Connector d="M400 120 C400 70 260 60 260 88" />
      <Node x={200} y={20} w={120} title="Argo CD" subtitle="reconcile" accent />
      <Connector d="M260 64 L260 88" />
      <Node x={180} y={210} w={160} title="Argo Rollouts" subtitle="canary / blue-green" />
      <Connector d="M260 132 L260 210" />
      <Connector d="M340 232 L420 232" />
      <Node x={400} y={210} title="K8s Fleet" subtitle="40+ clusters" />
      <Connector d="M180 232 L120 232" />
      <Node x={20} y={210} title="Slack" subtitle="ChatOps" />
    </Frame>
  );
}

function Cost() {
  return (
    <Frame>
      <title>Cost optimization architecture</title>
      <Node x={200} y={12} title="AWS CUR" subtitle="billing export" accent />
      <Connector d="M260 56 L260 78" />
      <Node x={180} y={78} w={160} title="Athena + Glue" subtitle="cost data lake" />
      <Connector d="M260 122 L260 144" />
      <Node x={180} y={144} w={160} title="QuickSight" subtitle="team showback" accent />
      <Connector d="M180 100 L90 100" />
      <Node x={20} y={78} title="Compute Optimizer" subtitle="rightsizing" />
      <Connector d="M340 100 L430 100" />
      <Node x={400} y={78} title="Savings Plans" subtitle="commit strategy" />
      <Connector d="M100 122 C100 200 240 200 240 188" />
      <Connector d="M450 122 C450 230 280 230 280 188" />
      <Node x={180} y={210} w={160} title="Lambda automation" subtitle="anomaly alerts → Slack" accent />
    </Frame>
  );
}

function Observability() {
  return (
    <Frame>
      <title>Observability stack architecture</title>
      <Node x={20} y={20} title="Services" subtitle="apps + infra" accent />
      <Connector d="M140 42 L200 42" />
      <Node x={200} y={20} w={140} title="OTel Collector" subtitle="metrics·logs·traces" accent />
      <Connector d="M270 64 L160 110" />
      <Connector d="M270 64 L270 110" />
      <Connector d="M270 64 L390 110" />
      <Node x={100} y={110} title="Prometheus" subtitle="→ Thanos" />
      <Node x={210} y={110} title="Loki" subtitle="logs" />
      <Node x={320} y={110} title="Tempo" subtitle="traces" />
      <Connector d="M160 154 L260 190" />
      <Connector d="M260 154 L260 190" />
      <Connector d="M390 154 L300 190" />
      <Node x={200} y={190} w={140} title="Grafana" subtitle="single pane" accent />
      <Connector d="M340 212 L420 212" />
      <Node x={400} y={190} title="Alertmanager" subtitle="SLO burn-rate" />
    </Frame>
  );
}

const map: Record<NonNullable<Project["diagram"]>, React.FC> = {
  "landing-zone": LandingZone,
  eks: EKS,
  gitops: GitOps,
  cost: Cost,
  observability: Observability,
};

export function ArchitectureDiagram({
  kind,
}: {
  kind: NonNullable<Project["diagram"]>;
}) {
  const Diagram = map[kind];
  return (
    <div className="rounded-lg border border-border bg-background/40 p-4">
      <Diagram />
    </div>
  );
}

/**
 * Fallback visual for projects without a hand-drawn diagram: a clean,
 * theme-aware "stack at a glance" panel. Keeps the card/detail layout
 * balanced without committing to an architecture diagram.
 */
export function ProjectStackPanel({ project }: { project: Project }) {
  const lead = project.impact[0];
  return (
    <div className="flex h-full flex-col justify-between gap-4 rounded-lg border border-border bg-background/40 p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {project.category}
        </span>
        {project.level ? (
          <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
            {project.level}
          </span>
        ) : null}
      </div>

      {lead ? (
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <p className="text-2xl font-bold tracking-tight text-foreground">
            {lead.metric}
          </p>
          <p className="mt-0.5 text-xs leading-tight text-muted-foreground">
            {lead.label}
          </p>
        </div>
      ) : null}

      <div>
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Core stack
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {project.techStack.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-1.5 rounded-md border border-border bg-card/40 px-2 py-1.5 text-[11px] font-medium text-foreground"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
              <span className="truncate">{tech}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Picks the right project visual: hand-drawn diagram if present, else the stack panel. */
export function ProjectVisual({ project }: { project: Project }) {
  if (project.diagram) return <ArchitectureDiagram kind={project.diagram} />;
  return <ProjectStackPanel project={project} />;
}
