import { Briefcase, MapPin, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/cta-section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion";
import { experiences } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Experience",
  path: "/experience",
  description:
    "Professional experience of Venkatesh Sethumurugan — Senior Cloud DevOps Engineer roles across platform engineering, SRE, and cloud automation.",
});

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="A track record of shipping platforms"
        description="Eight years turning operational pain into self-service platforms across fintech, SaaS, and cloud-native organizations."
      />

      <section className="container-balanced py-12">
        <ol className="relative space-y-10 border-l border-border pl-6 sm:pl-8">
          {experiences.map((exp, i) => (
            <Reveal as="li" key={exp.company} delay={Math.min(i, 3)} className="relative">
              <span className="absolute -left-[31px] top-1 grid h-5 w-5 place-items-center rounded-full border border-primary/50 bg-background sm:-left-[39px]">
                <span className="h-2 w-2 rounded-full bg-primary" />
              </span>

              <div className="rounded-2xl border border-border bg-card/40 p-6 sm:p-7">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
                      <Briefcase className="h-5 w-5 text-primary" />
                      {exp.role}
                    </h2>
                    <p className="mt-0.5 text-sm font-medium text-primary">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:items-end">
                    <span className="font-medium text-foreground">{exp.period}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {exp.summary}
                </p>

                <ul className="mt-4 space-y-2">
                  {exp.achievements.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{a}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {exp.stack.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <CtaSection />
    </>
  );
}
