"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";

function beacon(url: string, payload: unknown) {
  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
    } else {
      fetch(url, { method: "POST", body, keepalive: true });
    }
  } catch {
    /* best-effort */
  }
}

function deviceType(): string {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  return "desktop";
}

/**
 * First-party visitor + Web Vitals tracking that feeds the /admin dashboard.
 * Complements Vercel Web Analytics / Speed Insights (added in the layout).
 */
export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    beacon("/api/track", {
      path: pathname,
      referrer: document.referrer || "",
      device: deviceType(),
    });
  }, [pathname]);

  useReportWebVitals((metric) => {
    if (pathname?.startsWith("/admin")) return;
    beacon("/api/vitals", {
      metric: metric.name,
      value: metric.value,
      rating: metric.rating,
      path: pathname,
    });
  });

  return null;
}
