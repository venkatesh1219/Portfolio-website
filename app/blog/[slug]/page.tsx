import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CtaSection } from "@/components/cta-section";
import { blogPosts } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return buildMetadata({ title: "Not found", path: `/blog/${slug}` });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

function articleJsonLd(slug: string) {
  const post = blogPosts.find((p) => p.slug === slug)!;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(slug)) }}
      />

      <article className="container-balanced max-w-3xl pt-32 pb-12 sm:pt-40">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-1.5">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span>{formatDate(post.date)}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
        </div>

        <div className="prose-portfolio mt-8 space-y-5 text-pretty leading-relaxed text-muted-foreground">
          <p className="text-lg text-foreground">{post.excerpt}</p>
          <p>
            This is a starter article stub. Replace this content with the full
            post — or wire the blog up to MDX, a CMS, or Contentlayer. The data
            model already exists in{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
              lib/data.ts
            </code>
            , so adding real content is a matter of dropping in the body.
          </p>
          <p>
            Each post is statically generated at build time via{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
              generateStaticParams
            </code>
            , carries its own OpenGraph metadata, and emits{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
              BlogPosting
            </code>{" "}
            structured data for rich search results.
          </p>
        </div>
      </article>

      <CtaSection />
    </>
  );
}
