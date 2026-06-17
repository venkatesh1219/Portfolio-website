"use client";

import * as React from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/db";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

const field =
  "w-full rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30";
const labelClass = "mb-1.5 block text-sm font-medium";

export function PostForm({
  post,
  action,
  submitLabel,
}: {
  post?: Post;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
}) {
  const [title, setTitle] = React.useState(post?.title ?? "");
  const [slug, setSlug] = React.useState(post?.slug ?? "");
  const [slugEdited, setSlugEdited] = React.useState(Boolean(post?.slug));

  // Auto-derive the slug from the title until the user edits it manually.
  React.useEffect(() => {
    if (!slugEdited) setSlug(slugify(title));
  }, [title, slugEdited]);

  return (
    <form action={action} className="space-y-5">
      {post && <input type="hidden" name="id" value={String(post.id)} />}

      <div className="grid gap-5 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-5">
          <div>
            <label htmlFor="title" className={labelClass}>Title</label>
            <input
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="How we cut AWS cost 32%"
              className={field}
            />
          </div>

          <div>
            <label htmlFor="slug" className={labelClass}>Slug</label>
            <input
              id="slug"
              name="slug"
              value={slug}
              onChange={(e) => {
                setSlugEdited(true);
                setSlug(e.target.value);
              }}
              placeholder="how-we-cut-aws-cost"
              className={cn(field, "font-mono text-xs")}
            />
            <p className="mt-1 text-xs text-muted-foreground">/blog/{slug || "…"}</p>
          </div>

          <div>
            <label htmlFor="excerpt" className={labelClass}>Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={2}
              defaultValue={post?.excerpt ?? ""}
              placeholder="One or two sentences shown on the blog list and in search results."
              className={cn(field, "resize-y")}
            />
          </div>

          <div>
            <label htmlFor="body" className={labelClass}>
              Body <span className="text-muted-foreground">(Markdown)</span>
            </label>
            <textarea
              id="body"
              name="body"
              rows={16}
              defaultValue={post?.body ?? ""}
              placeholder={"## Heading\n\nWrite your post in Markdown…"}
              className={cn(field, "resize-y font-mono text-xs leading-relaxed")}
            />
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-5">
          <div className="rounded-xl border border-border bg-card/40 p-4">
            <label htmlFor="status" className={labelClass}>Status</label>
            <select
              id="status"
              name="status"
              defaultValue={post?.status ?? "draft"}
              className={field}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <p className="mt-2 text-xs text-muted-foreground">
              Only published posts appear on the public blog.
            </p>
          </div>

          <div>
            <label htmlFor="tags" className={labelClass}>Tags</label>
            <input
              id="tags"
              name="tags"
              defaultValue={post?.tags.join(", ") ?? ""}
              placeholder="AWS, FinOps, Kubernetes"
              className={field}
            />
            <p className="mt-1 text-xs text-muted-foreground">Comma-separated.</p>
          </div>

          <div>
            <label htmlFor="readingTime" className={labelClass}>Reading time</label>
            <input
              id="readingTime"
              name="readingTime"
              defaultValue={post?.readingTime ?? ""}
              placeholder="8 min read"
              className={field}
            />
          </div>

          <Button type="submit" variant="gradient" className="w-full">
            <Save className="h-4 w-4" />
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}
