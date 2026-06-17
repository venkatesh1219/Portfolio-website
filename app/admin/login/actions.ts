"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  credentialsMatch,
  expectedToken,
  adminConfigured,
} from "@/lib/auth";

export async function login(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/admin");

  if (!adminConfigured()) {
    redirect("/admin/login?error=unconfigured");
  }

  if (!(await credentialsMatch(username, password))) {
    redirect("/admin/login?error=invalid");
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, await expectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect(from.startsWith("/admin") ? from : "/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
