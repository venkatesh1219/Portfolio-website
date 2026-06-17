import Link from "next/link";
import { Plus, Pencil, Trash2, Database, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, isDbConfigured } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { deletePostAction } from "./actions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog posts",
  robots: { index: false, follow: false },
};

export default async function AdminPostsPage() {
  const configured = isDbConfigured();
  const posts = configured ? await getAllPosts() : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog posts</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create, edit, and publish posts to your portfolio blog.
          </p>
        </div>
        <Button asChild variant="gradient" size="sm" disabled={!configured}>
          <Link href="/admin/posts/new">
            <Plus className="h-4 w-4" />
            New post
          </Link>
        </Button>
      </div>

      {!configured && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
          <Database className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-medium">Connect a database to manage posts</p>
            <p className="mt-1 text-amber-200/80">
              Until <code>DATABASE_URL</code> is set, the public blog shows the built-in
              seed posts. Add a Vercel Postgres (Neon) store to create and edit posts here.
            </p>
          </div>
        </div>
      )}

      {configured && (
        <div className="overflow-hidden rounded-xl border border-border">
          {posts.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">
              No posts yet. Click <strong>New post</strong> to write your first one.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-card/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="hidden px-4 py-3 font-medium sm:table-cell">Updated</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {posts.map((post) => (
                  <tr key={String(post.id)} className="hover:bg-card/40">
                    <td className="px-4 py-3">
                      <p className="font-medium">{post.title}</p>
                      <p className="font-mono text-xs text-muted-foreground">/blog/{post.slug}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={post.status === "published" ? "success" : "secondary"}>
                        {post.status}
                      </Badge>
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                      {formatDate(post.date)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {post.status === "published" && (
                          <Button asChild variant="ghost" size="icon" title="View">
                            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button asChild variant="ghost" size="icon" title="Edit">
                          <Link href={`/admin/posts/${post.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <form action={deletePostAction}>
                          <input type="hidden" name="id" value={String(post.id)} />
                          <Button
                            type="submit"
                            variant="ghost"
                            size="icon"
                            title="Delete"
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
