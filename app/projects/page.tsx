import { Github, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { CtaSection } from "@/components/cta-section";
import { SectionHeading } from "@/components/section-heading";
import { GitHubProjects } from "@/components/github-projects";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { projects } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Projects",
  path: "/projects",
  description:
    "Cloud and platform engineering projects by Venkatesh Sethumurugan — AWS Landing Zone, EKS Platform, GitOps Platform, Cost Optimization, and an Observability Stack.",
});

/** ItemList + CreativeWork schema so each project is machine-readable. */
function projectsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        description: p.description,
        url: `${siteConfig.url}/projects/${p.slug}`,
        codeRepository: p.github,
        keywords: p.techStack.join(", "),
      },
    })),
  };
}

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
            ])
          ),
        }}
      />

      <PageHeader
        eyebrow="Projects"
        title="Cloud platforms, end to end"
        description="Each project pairs an architecture diagram with the tech stack, the business impact it delivered, and a link to the code."
      />

      <section className="container-balanced space-y-8 py-12">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={Math.min(i, 3)}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </section>

      {/* Live repos pulled from GitHub */}
      <section className="border-t border-border bg-card/20 py-16 sm:py-20">
        <div className="container-balanced">
          <SectionHeading
            eyebrow="On GitHub"
            title="Code, labs & open source"
            description="Repositories straight from my GitHub — personal projects and hands-on labs across DevOps, Kubernetes, and the cloud-native ecosystem."
          />
          <div className="mt-12">
            <GitHubProjects />
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg">
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                View all on GitHub
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
