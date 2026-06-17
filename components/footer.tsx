import Link from "next/link";
import { Github, Linkedin, Mail, Cloud } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site";

const socials = [
  { icon: Github, href: siteConfig.links.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.links.linkedin, label: "LinkedIn" },
  { icon: Mail, href: siteConfig.links.email, label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/30">
      <div className="container-balanced py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary">
                <Cloud className="h-5 w-5" />
              </span>
              {siteConfig.name}
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.title} building secure, cost-efficient, and reliable
              cloud platforms with AWS, Kubernetes, and GitOps.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <nav className="flex flex-col gap-2.5">
              <p className="text-sm font-semibold">Navigate</p>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2.5">
              <p className="text-sm font-semibold">Get in touch</p>
              <a
                href={siteConfig.links.email}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.resumeUrl}
                download
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Download résumé
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Built with Next.js, TailwindCSS &amp; Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
