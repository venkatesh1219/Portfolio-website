import { CheckCircle2, Cloud, GitBranch, ShieldCheck, Gauge } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SkillsGrid } from "@/components/skills-grid";
import { SectionHeading } from "@/components/section-heading";
import { StatsBand } from "@/components/stats-band";
import { CtaSection } from "@/components/cta-section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  path: "/about",
  description:
    "About Venkatesh Sethumurugan — a Senior Cloud DevOps Engineer with 8+ years building secure, cost-efficient platforms on AWS and Kubernetes.",
});

const principles = [
  {
    icon: Cloud,
    title: "Paved roads, not gates",
    body: "I build platforms that make the secure, reliable path the easy path — so teams move fast without fighting infrastructure.",
  },
  {
    icon: ShieldCheck,
    title: "Security by default",
    body: "Guardrails, least privilege, and policy-as-code baked into the foundation, not bolted on after an audit.",
  },
  {
    icon: Gauge,
    title: "Cost is a feature",
    body: "FinOps thinking from day one — rightsizing, Spot, and Graviton with the visibility to keep spend accountable.",
  },
  {
    icon: GitBranch,
    title: "Everything as code",
    body: "Infrastructure, delivery, and policy live in Git. Reviewable, reproducible, and auditable by design.",
  },
];

const focusAreas = [
  "Multi-account AWS architecture & Landing Zones",
  "Kubernetes / EKS platform engineering",
  "GitOps continuous delivery with Argo CD",
  "CI/CD pipeline design & supply-chain security",
  "FinOps & cloud cost optimization",
  "SLO-driven observability & SRE practices",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About me"
        title="Engineering the platforms teams ship on"
        description="I'm Venkatesh — a Senior Cloud DevOps Engineer who turns infrastructure into a product that developers love to use."
      />

      <section className="container-balanced grid gap-12 py-12 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <div className="space-y-5 text-pretty leading-relaxed text-muted-foreground">
            <p>
              For <strong className="text-foreground">3+ years</strong> I&apos;ve
              worked at the seam between development and operations — building
              the cloud foundations, Kubernetes platforms, and delivery
              pipelines that let engineering teams scale without chaos.
            </p>
            <p>
              My work spans the full platform lifecycle: designing{" "}
              <strong className="text-foreground">multi-account AWS Landing Zones</strong>{" "}
              with Terraform and guardrails baked in, operating{" "}
              <strong className="text-foreground">production EKS platforms</strong>{" "}
              hosting 20+ microservices, and rolling out{" "}
              <strong className="text-foreground">blue-green GitOps delivery</strong>{" "}
              with ArgoCD for zero-downtime releases.
            </p>
            <p>
              I care deeply about the things that don&apos;t show up in a demo —
              cost efficiency (a 32% AWS reduction), reliability (99.95% uptime),
              security posture, and the developer experience. I&apos;m also a
              committed mentor, and I document everything so teams ramp up fast.
            </p>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              What I focus on
            </p>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <li key={area} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <RevealGroup className="space-y-4">
          {principles.map(({ icon: Icon, title, body }) => (
            <RevealItem
              key={title}
              className="rounded-xl border border-border bg-card/40 p-5"
            >
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold">{title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="container-balanced py-8">
        <StatsBand />
      </section>

      <section className="border-y border-border bg-card/20 py-16 sm:py-24">
        <div className="container-balanced">
          <SectionHeading
            eyebrow="Skills"
            title="Tools of the trade"
            description="A working command of the modern cloud-native stack — from infrastructure to delivery to observability."
          />
          <div className="mt-12">
            <SkillsGrid />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
