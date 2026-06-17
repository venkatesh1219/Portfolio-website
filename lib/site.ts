export const siteConfig = {
  name: "Venkatesh Sethumurugan",
  title: "Senior Cloud DevOps Engineer",
  shortName: "Venkatesh S.",
  description:
    "Senior Cloud DevOps Engineer specializing in AWS, Kubernetes, Terraform, and GitOps. I design and run secure, cost-efficient, highly available platforms at scale.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://venkatesh-portfolio-website.vercel.app",
  ogImage: "/og",
  email: "venkateshaws22@gmail.com",
  phone: "+91 86080 51219",
  location: "Theni, Tamil Nadu, India · Open to remote",
  resumeUrl: "/resume.pdf",
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "venkatesh1219",
  links: {
    github: "https://github.com/venkatesh1219",
    linkedin: "https://www.linkedin.com/in/venkatesh-sethumurugan",
    email: "mailto:venkateshaws22@gmail.com",
  },
  keywords: [
    "Cloud DevOps Engineer",
    "AWS",
    "Kubernetes",
    "EKS",
    "Terraform",
    "GitOps",
    "ArgoCD",
    "CI/CD",
    "Docker",
    "Platform Engineering",
    "Site Reliability Engineering",
    "Infrastructure as Code",
    "Venkatesh Sethumurugan",
  ],
} as const;

export type SiteConfig = typeof siteConfig;

export const navItems = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Projects", href: "/projects" },
  { title: "Experience", href: "/experience" },
  { title: "Education", href: "/certifications" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
] as const;
