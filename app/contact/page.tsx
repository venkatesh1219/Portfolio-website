import { Mail, MapPin, Github, Linkedin, Clock3, Phone } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  path: "/contact",
  description:
    "Get in touch with Venkatesh Sethumurugan — Senior Cloud DevOps Engineer. Available for senior platform and DevOps roles.",
});

const details = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: siteConfig.links.email },
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Location", value: siteConfig.location },
  { icon: Clock3, label: "Response time", value: "Usually within 24 hours" },
];

const socials = [
  { icon: Github, label: "GitHub", href: siteConfig.links.github },
  { icon: Linkedin, label: "LinkedIn", href: siteConfig.links.linkedin },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk platforms"
        description="Hiring for a senior platform or DevOps role, or want a second set of eyes on your cloud architecture? Drop me a line."
      />

      <section className="container-balanced grid gap-10 py-12 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="rounded-2xl border border-border bg-card/40 p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight">Send a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              I&apos;ll get back to you personally.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>

        <Reveal delay={1} className="lg:col-span-2">
          <div className="space-y-4">
            {details.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-start gap-3 rounded-xl border border-border bg-card/40 p-5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-border bg-card/40 p-5">
              <p className="mb-3 text-sm font-medium">Find me online</p>
              <div className="flex gap-2">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
