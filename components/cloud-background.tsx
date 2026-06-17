"use client";

import { cn } from "@/lib/utils";
import { techTools } from "@/components/tech-icons";

/**
 * Decorative animated background for the cloud-engineering theme:
 *  - aurora gradient blobs
 *  - drifting SVG clouds
 *  - floating DevOps tool glyphs (AWS, Kubernetes, Docker, Terraform…)
 *  - faint engineering grid
 * Purely presentational and aria-hidden; respects prefers-reduced-motion.
 */

type FloatingTool = {
  index: number; // into techTools
  className: string; // position + size + animation
};

const floatingTools: FloatingTool[] = [
  { index: 0, className: "left-[8%] top-[22%] h-10 w-10 animate-float [animation-delay:-1s]" },
  { index: 1, className: "right-[10%] top-[18%] h-12 w-12 animate-float [animation-delay:-3s]" },
  { index: 2, className: "left-[14%] top-[64%] h-11 w-11 animate-float [animation-delay:-2s]" },
  { index: 3, className: "right-[12%] top-[58%] h-10 w-10 animate-float [animation-delay:-4s]" },
  { index: 4, className: "left-[22%] top-[40%] h-9 w-9 animate-float [animation-delay:-5s]" },
  { index: 5, className: "right-[22%] top-[38%] h-9 w-9 animate-float [animation-delay:-1.5s]" },
];

export function CloudBackground({
  className,
  showTools = true,
}: {
  className?: string;
  showTools?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {/* base grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* aurora blobs */}
      <div className="absolute -top-32 left-1/4 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-[120px] animate-aurora" />
      <div className="absolute top-10 right-1/4 h-[24rem] w-[24rem] rounded-full bg-accent/20 blur-[120px] animate-aurora [animation-delay:3s]" />
      <div className="absolute bottom-0 left-1/3 h-[20rem] w-[20rem] rounded-full bg-sky-500/10 blur-[120px] animate-aurora [animation-delay:6s]" />

      {/* drifting clouds */}
      <Cloud className="top-[18%] h-16 w-16 animate-drift-slow opacity-[0.07]" />
      <Cloud className="top-[42%] h-24 w-24 animate-drift-medium opacity-[0.05] [animation-delay:-12s]" />
      <Cloud className="top-[64%] h-12 w-12 animate-drift-fast opacity-[0.08] [animation-delay:-20s]" />
      <Cloud className="top-[30%] h-20 w-20 animate-drift-slow opacity-[0.04] [animation-delay:-30s]" />

      {/* floating DevOps tool glyphs */}
      {showTools &&
        floatingTools.map((tool, i) => {
          const { Icon } = techTools[tool.index];
          return (
            <div
              key={i}
              className={cn(
                "absolute grid place-items-center rounded-xl border border-white/10 bg-white/[0.03] p-2 opacity-40 backdrop-blur-sm",
                tool.className
              )}
            >
              <Icon className="h-full w-full" />
            </div>
          );
        })}

      {/* vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}

function Cloud({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 40"
      className={cn("absolute left-0 text-foreground", className)}
      fill="currentColor"
    >
      <path d="M50 38H16C8.27 38 2 31.73 2 24c0-7.4 5.74-13.46 13.01-13.96C17.6 4.2 23.3 0 30 0c8.2 0 15 6.2 15.86 14.18C56.04 14.9 62 20.2 62 27c0 6.07-4.93 11-12 11Z" />
    </svg>
  );
}
