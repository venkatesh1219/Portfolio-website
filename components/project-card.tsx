import Link from "next/link";
import { Github, ArrowUpRight, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectVisual } from "@/components/architecture-diagrams";
import type { Project } from "@/lib/data";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <article className="group grid gap-8 rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/40 sm:p-8 lg:grid-cols-2 lg:items-center">
      {/* Diagram */}
      <div className={reversed ? "lg:order-2" : ""}>
        <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span className="h-px w-6 bg-primary" />
          Architecture
        </div>
        <ProjectVisual project={project} />
      </div>

      {/* Content */}
      <div className={reversed ? "lg:order-1" : ""}>
        <Badge variant="accent">{project.category}</Badge>
        <h3 className="mt-3 text-2xl font-bold tracking-tight">
          <Link
            href={`/projects/${project.slug}`}
            className="rounded-md transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-primary">{project.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Business impact */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {project.impact.map((it) => (
            <div
              key={it.label}
              className="rounded-lg border border-border bg-background/40 p-3 text-center"
            >
              <p className="text-lg font-bold tracking-tight text-foreground">
                {it.metric}
              </p>
              <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
                {it.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="mt-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Tech stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="sm">
            <Link href={`/projects/${project.slug}`}>
              Read case study
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          </Button>
          {project.liveUrl && (
            <Button asChild variant="ghost" size="sm">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live demo
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
