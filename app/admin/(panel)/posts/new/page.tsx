import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { PostForm } from "@/components/admin/post-form";
import { createPostAction } from "../actions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "New post",
  robots: { index: false, follow: false },
};

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/admin/posts"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to posts
      </Link>

      <h1 className="text-2xl font-bold tracking-tight">New post</h1>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error === "title"
            ? "A title is required."
            : "Couldn't save — is the database connected?"}
        </div>
      )}

      <PostForm action={createPostAction} submitLabel="Create post" />
    </div>
  );
}
