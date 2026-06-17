import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { siteConfig } from "@/lib/site";

export function CtaSection() {
  return (
    <section className="container-balanced py-20 sm:py-28">
      <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-background p-10 text-center sm:p-16">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />
        <div className="relative">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s build platforms that scale.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Whether you need a cloud foundation, a Kubernetes platform, or a
            GitOps delivery system — I&apos;d love to help. Let&apos;s talk.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="gradient">
              <Link href="/contact">
                Start a conversation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={siteConfig.resumeUrl} download>
                <Download className="h-4 w-4" />
                Download résumé
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
