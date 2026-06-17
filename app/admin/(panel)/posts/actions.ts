"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createPost,
  updatePost,
  deletePost,
  slugify,
  type PostInput,
} from "@/lib/db";

function readInput(fd: FormData): PostInput {
  const title = String(fd.get("title") ?? "").trim();
  const rawSlug = String(fd.get("slug") ?? "").trim();
  return {
    title,
    slug: slugify(rawSlug || title),
    excerpt: String(fd.get("excerpt") ?? "").trim(),
    body: String(fd.get("body") ?? ""),
    tags: String(fd.get("tags") ?? "").trim(),
    readingTime: String(fd.get("readingTime") ?? "").trim() || "5 min read",
    status: String(fd.get("status")) === "published" ? "published" : "draft",
  };
}

function revalidateBlog(slug?: string) {
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function createPostAction(fd: FormData) {
  const input = readInput(fd);
  if (!input.title) redirect("/admin/posts/new?error=title");
  try {
    await createPost(input);
  } catch {
    redirect("/admin/posts/new?error=db");
  }
  revalidateBlog(input.slug);
  redirect("/admin/posts");
}

export async function updatePostAction(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  const input = readInput(fd);
  if (!input.title) redirect(`/admin/posts/${id}/edit?error=title`);
  try {
    await updatePost(id, input);
  } catch {
    redirect(`/admin/posts/${id}/edit?error=db`);
  }
  revalidateBlog(input.slug);
  redirect("/admin/posts");
}

export async function deletePostAction(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  try {
    await deletePost(id);
  } catch {
    /* ignore */
  }
  revalidateBlog();
  redirect("/admin/posts");
}
