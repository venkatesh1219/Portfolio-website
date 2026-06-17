import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/cta-section";
import { Badge } from "@/components/ui/badge";
import { RevealGroup, RevealItem } from "@/components/motion";
import { blogPosts } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Blog",
  path: "/blog",
  description:
    "Writing on cloud platform engineering, Kubernetes, GitOps, FinOps, and SRE by Venkatesh Sethumurugan.",
});

function blogJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Venkatesh Sethumurugan — Blog",
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      keywords: post.tags.join(", "),
    })),
  };
}

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd()) }}
      />

      <PageHeader
        eyebrow="Blog"
        title="Notes from the platform trenches"
        description="Practical writing on Kubernetes, GitOps, FinOps, and reliability — the patterns and trade-offs behind the systems I build."
      />

      <section className="container-balanced py-12">
        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <RevealItem key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/40"
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h2 className="mt-4 text-xl font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{formatDate(post.date)}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readingTime}
                  </span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read article
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <CtaSection />
    </>
  );
}
