import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostForm } from "@/components/admin/post-form";
import { getPostById, isDbConfigured } from "@/lib/db";
import { updatePostAction, deletePostAction } from "../../actions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Edit post",
  robots: { index: false, follow: false },
};

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  if (!isDbConfigured()) notFound();
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to posts
        </Link>
        <form action={deletePostAction}>
          <input type="hidden" name="id" value={String(post.id)} />
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </form>
      </div>

      <h1 className="text-2xl font-bold tracking-tight">Edit post</h1>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error === "title"
            ? "A title is required."
            : "Couldn't save — is the database connected?"}
        </div>
      )}

      <PostForm post={post} action={updatePostAction} submitLabel="Save changes" />
    </div>
  );
}
