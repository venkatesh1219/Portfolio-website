import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { GitHubStats } from "@/components/github-stats";
import { StatsBand } from "@/components/stats-band";
import { SkillsGrid } from "@/components/skills-grid";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { CtaSection } from "@/components/cta-section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { projects } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* Hero with animated cloud background + GitHub stats */}
      <Hero>
        <GitHubStats />
      </Hero>

      {/* Impact metrics */}
      <section className="container-balanced py-12">
        <StatsBand />
      </section>

      {/* Featured projects */}
      <section className="container-balanced py-16 sm:py-24">
        <SectionHeading
          eyebrow="Selected work"
          title="Platforms with measurable impact"
          description="A few systems I've designed and operated — from multi-account AWS foundations to GitOps delivery at scale."
        />
        <div className="mt-12 space-y-8">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/projects">
              View all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Skills */}
      <section className="border-y border-border bg-card/20 py-16 sm:py-24">
        <div className="container-balanced">
          <SectionHeading
            eyebrow="Toolbox"
            title="The stack I build with"
            description="Deep expertise across cloud, containers, infrastructure-as-code, delivery, and observability."
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
