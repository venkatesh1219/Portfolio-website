import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

const size = { width: 1200, height: 630 };

/**
 * Dynamic OpenGraph / Twitter card image.
 * Accepts ?title= and ?subtitle= to customize per-page if desired.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? siteConfig.name;
  const subtitle = searchParams.get("subtitle") ?? siteConfig.title;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(1200px 600px at 0% 0%, #0b3b54 0%, transparent 55%), radial-gradient(1000px 600px at 100% 100%, #3b1d7a 0%, transparent 55%), #06080f",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "rgba(34, 211, 238, 0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
            }}
          >
            ☁️
          </div>
          <div style={{ color: "#22d3ee", fontSize: 26, fontWeight: 600 }}>
            {siteConfig.url.replace("https://", "")}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "white",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          <div style={{ color: "#94a3b8", fontSize: 38, marginTop: 18 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["AWS", "Kubernetes", "Terraform", "GitOps", "CI/CD"].map((t) => (
            <div
              key={t}
              style={{
                color: "#e2e8f0",
                fontSize: 24,
                padding: "8px 20px",
                borderRadius: 999,
                border: "1px solid rgba(148,163,184,0.3)",
                background: "rgba(148,163,184,0.08)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
