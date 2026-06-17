import { NextResponse } from "next/server";
import { recordPageview } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Lightweight first-party pageview beacon. Best-effort, never blocks. */
export async function POST(req: Request) {
  try {
    const { path, referrer, device } = await req.json();
    if (typeof path !== "string" || path.length > 512) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    // Skip the admin area so it doesn't pollute visitor analytics.
    if (path.startsWith("/admin")) return NextResponse.json({ ok: true });

    let ref = typeof referrer === "string" ? referrer : "";
    try {
      if (ref) ref = new URL(ref).hostname;
    } catch {
      /* keep raw referrer if not a URL */
    }

    await recordPageview(
      path.slice(0, 512),
      ref.slice(0, 255),
      typeof device === "string" ? device.slice(0, 32) : "unknown"
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
