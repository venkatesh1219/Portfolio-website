import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/motion";
import { projects } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

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
        url: p.github,
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

      <CtaSection />
    </>
  );
}
