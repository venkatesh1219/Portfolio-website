import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Github,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Target,
  ListChecks,
  TrendingUp,
  FolderGit2,
  Check,
} from "lucide-react";
import { CloudBackground } from "@/components/cloud-background";
import { ArchitectureDiagram } from "@/components/architecture-diagrams";
import { CtaSection } from "@/components/cta-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { projects } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;
export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return buildMetadata({ title: "Not found", path: `/projects/${slug}` });
  return {
    ...buildMetadata({
      title: project.title,
      description: project.description,
      path: `/projects/${project.slug}`,
    }),
    keywords: project.techStack,
  };
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;
  const cs = project.caseStudy;
  const repoTour = cs?.repoTour;

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.tagline,
    description: project.description,
    url: `${siteConfig.url}/projects/${project.slug}`,
    codeRepository: project.github,
    keywords: project.techStack.join(", "),
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    about: project.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
              { name: project.title, path: `/projects/${project.slug}` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
        <CloudBackground />
        <div className="container-balanced">
          <Reveal className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                All projects
              </Link>
            </nav>
            <Badge variant="accent">{project.category}</Badge>
            <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-3 text-lg font-medium text-primary">{project.tagline}</p>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" aria-hidden="true" />
                  View repository
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              {project.liveUrl && (
                <Button asChild variant="outline" size="lg">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live demo
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Impact band */}
      <section className="border-y border-border bg-card/20 py-10">
        <div className="container-balanced">
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {project.impact.map((it, i) => (
              <Reveal key={it.label} delay={i}>
                <div className="rounded-2xl border border-border bg-background/40 p-6 text-center">
                  <dt className="sr-only">{it.label}</dt>
                  <dd>
                    <p className="text-3xl font-bold tracking-tight text-primary">
                      {it.metric}
                    </p>
                    <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                      {it.label}
                    </p>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Architecture */}
      <section className="container-balanced py-14 sm:py-20">
        <Reveal>
          <div className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
            <span className="h-px w-6 bg-primary" aria-hidden="true" />
            Architecture
          </div>
          <div className="rounded-2xl border border-border bg-card/40 p-6 sm:p-8">
            <ArchitectureDiagram kind={project.diagram} />
          </div>
        </Reveal>
      </section>

      {/* Case study */}
      {cs && (
        <section className="container-balanced pb-4">
          <div className="grid gap-10 lg:grid-cols-3">
            <Reveal className="lg:col-span-1">
              <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                <Target className="h-5 w-5 text-primary" aria-hidden="true" />
                The challenge
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {cs.challenge}
              </p>
              <h2 className="mt-10 flex items-center gap-2 text-2xl font-bold tracking-tight">
                <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />
                The outcome
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {cs.outcome}
              </p>
            </Reveal>

            <Reveal className="lg:col-span-2" delay={1}>
              <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                <ListChecks className="h-5 w-5 text-primary" aria-hidden="true" />
                The approach
              </h2>
              <ol className="mt-5 space-y-4">
                {cs.approach.map((step, i) => (
                  <li
                    key={i}
                    className="flex gap-4 rounded-xl border border-border bg-card/40 p-4"
                  >
                    <span
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/15 text-sm font-semibold text-primary"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-foreground/90">{step}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>
      )}

      {/* What I built (highlights) */}
      <section className="container-balanced py-14 sm:py-16">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight">What I built</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-3 rounded-xl border border-border bg-card/40 p-4"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-muted-foreground">{h}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Repo tour + tech stack */}
      <section className="container-balanced pb-16">
        <div className="grid gap-10 lg:grid-cols-2">
          {repoTour && (
            <Reveal>
              <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                <FolderGit2 className="h-5 w-5 text-primary" aria-hidden="true" />
                Inside the repo
              </h2>
              <ul className="mt-5 space-y-3">
                {repoTour.map((t) => (
                  <li key={t.path} className="rounded-xl border border-border bg-card/40 p-4">
                    <code className="font-mono text-sm font-medium text-primary">{t.path}</code>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.what}</p>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" size="sm" className="mt-5">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" aria-hidden="true" />
                  Browse the code
                </a>
              </Button>
            </Reveal>
          )}

          <Reveal delay={1}>
            <h2 className="text-2xl font-bold tracking-tight">Tech stack</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Prev / next */}
      <section className="border-t border-border">
        <div className="container-balanced grid gap-4 py-10 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                Previous
              </span>
              <p className="mt-2 font-semibold tracking-tight transition-colors group-hover:text-primary">
                {prev.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className="group rounded-2xl border border-border bg-card/40 p-5 text-right transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-start-2"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Next
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <p className="mt-2 font-semibold tracking-tight transition-colors group-hover:text-primary">
                {next.title}
              </p>
            </Link>
          )}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
