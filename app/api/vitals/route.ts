import { NextResponse } from "next/server";
import { recordVital } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set(["LCP", "CLS", "INP", "FCP", "TTFB", "FID"]);

/** First-party Core Web Vitals beacon (complements Vercel Speed Insights). */
export async function POST(req: Request) {
  try {
    const { metric, value, rating, path } = await req.json();
    if (typeof metric !== "string" || !ALLOWED.has(metric)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    if (typeof value !== "number" || !isFinite(value)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    await recordVital(
      metric,
      value,
      typeof rating === "string" ? rating.slice(0, 32) : "",
      typeof path === "string" ? path.slice(0, 512) : ""
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
