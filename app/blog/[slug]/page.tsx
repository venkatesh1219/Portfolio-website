import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { CtaSection } from "@/components/cta-section";
import { getPublishedPosts, getPublishedPostBySlug } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;
export const dynamicParams = true;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return buildMetadata({ title: "Not found", path: `/blog/${slug}` });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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

        <p className="mt-8 text-lg leading-relaxed text-foreground">{post.excerpt}</p>

        {post.body ? (
          <div className="markdown mt-6 space-y-4 leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline [&_code]:rounded [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-card [&_pre]:p-4 [&_strong]:text-foreground">
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </div>
        ) : (
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Full article coming soon. Manage this post&apos;s content from the{" "}
            <Link href="/admin/posts" className="text-primary underline">
              admin dashboard
            </Link>
            .
          </p>
        )}
      </article>

      <CtaSection />
    </>
  );
}
