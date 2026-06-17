"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CloudBackground } from "@/components/cloud-background";
import { techTools } from "@/components/tech-icons";
import { siteConfig } from "@/lib/site";
import { heroSkills } from "@/lib/data";
import { cn } from "@/lib/utils";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/**
 * Profile photo: shows a clean monogram by default and upgrades to
 * /profile.jpg only once it loads successfully — so there's never a
 * broken-image flash if the photo hasn't been added yet.
 */
function ProfilePhoto() {
  const [src, setSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    const img = new window.Image();
    img.onload = () => setSrc("/profile.jpg");
    img.src = "/profile.jpg";
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${siteConfig.name} — ${siteConfig.title}`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="grid h-full w-full place-items-center bg-gradient-to-br from-secondary to-background">
          <span className="bg-gradient-to-br from-primary to-accent bg-clip-text text-7xl font-bold tracking-tight text-transparent">
            VS
          </span>
        </div>
      )}
    </div>
  );
}

// Tool badges that float around the photo. Positions are corner-anchored.
const orbitPositions = [
  "-left-5 top-6",
  "-right-5 top-16",
  "-left-3 bottom-16",
  "right-2 -bottom-5",
  "left-1/3 -top-5",
];

export function Hero({ children }: { children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24">
      <CloudBackground />

      <div className="container-balanced">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={item} className="flex justify-center lg:justify-start">
              <Badge variant="outline" className="gap-1.5 py-1 pl-1.5 pr-3">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500/20">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                </span>
                Open to senior platform &amp; DevOps roles
              </Badge>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl"
            >
              {siteConfig.name}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-3 text-xl font-semibold text-gradient sm:text-2xl"
            >
              {siteConfig.title}
            </motion.p>

            <motion.p
              variants={item}
              className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
            >
              I design and operate secure, cost-efficient, highly available cloud
              platforms — turning infrastructure into a paved road that lets teams
              ship faster and sleep better.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
            >
              {heroSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm font-medium text-foreground/90"
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <Button asChild size="lg" variant="gradient">
                <Link href="/contact">
                  Let&apos;s talk
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={siteConfig.resumeUrl} download>
                  <Download className="h-4 w-4" />
                  Download résumé
                </a>
              </Button>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-5 flex items-center justify-center gap-1.5 text-sm text-muted-foreground lg:justify-start"
            >
              <MapPin className="h-3.5 w-3.5" />
              {siteConfig.location}
            </motion.p>
          </motion.div>

          {/* Right: photo with orbiting tool badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative h-72 w-72 sm:h-80 sm:w-80">
              {/* glow ring */}
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/30 via-transparent to-accent/30 blur-2xl" />
              <div className="relative h-full w-full rounded-[2rem] border border-white/10 bg-card/60 p-1.5 shadow-2xl backdrop-blur">
                <ProfilePhoto />
              </div>

              {/* orbiting DevOps tool badges */}
              {techTools.slice(0, orbitPositions.length).map((tool, i) => (
                <div
                  key={tool.name}
                  className={cn(
                    "absolute grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-background/80 p-2 shadow-lg backdrop-blur animate-float",
                    orbitPositions[i]
                  )}
                  style={{ animationDelay: `${i * -1.3}s` }}
                  title={tool.name}
                >
                  <tool.Icon className="h-full w-full" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* GitHub stats slot (server-rendered child) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mx-auto mt-14 max-w-3xl"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
