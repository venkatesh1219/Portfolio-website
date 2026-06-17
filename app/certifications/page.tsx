import { GraduationCap, BookOpen, Target, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/cta-section";
import { Badge } from "@/components/ui/badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { education, learningFocus } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Education",
  path: "/certifications",
  description:
    "Education and continuous learning of Venkatesh Sethumurugan — BCA at Kalasalingam University and a Diploma in Computer Science Engineering, with ongoing focus on Kubernetes, AWS, and SRE.",
});

export default function EducationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Education & Learning"
        title="Always building, always learning"
        description="My foundation in computer science, plus the areas I'm actively deepening. Hands-on, project-driven, and continuous."
      />

      <section className="container-balanced py-12">
        <Reveal>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">
            Education
          </h2>
        </Reveal>

        <RevealGroup className="mt-6 grid gap-5 md:grid-cols-2">
          {education.map((edu) => (
            <RevealItem
              key={edu.degree}
              className="flex flex-col rounded-2xl border border-border bg-card/40 p-6"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                  <GraduationCap className="h-6 w-6" />
                </span>
                <Badge variant={edu.status === "Pursuing" ? "accent" : "success"}>
                  {edu.status}
                </Badge>
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-snug">
                {edu.degree}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {edu.institution}
              </p>
              <p className="mt-auto pt-4 text-sm text-muted-foreground">
                {edu.period}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-12">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
            <Target className="h-4 w-4" />
            Professional development focus
          </h2>
        </Reveal>

        <Reveal className="mt-6">
          <ul className="grid gap-3 sm:grid-cols-2">
            {learningFocus.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-xl border border-border bg-card/40 p-4 text-sm"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-10">
          <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-5 text-sm text-muted-foreground">
            <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p>
              Certifications are in progress and will be listed here as they&apos;re
              earned. My approach is hands-on: real projects, community
              engagement, and continuous skill development over credentials alone.
            </p>
          </div>
        </Reveal>
      </section>

      <CtaSection />
    </>
  );
}
