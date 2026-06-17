import { CloudBackground } from "@/components/cloud-background";
import { Reveal } from "@/components/motion";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
      <CloudBackground />
      <div className="container-balanced">
        <Reveal className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
