/**
 * Single source of truth for all portfolio content.
 * Content reflects Venkatesh Sethumurugan's actual résumé.
 * Edit this file to update projects, experience, education, skills, and blog.
 */

export type Skill = {
  name: string;
  category: "Cloud" | "Containers" | "IaC" | "CI/CD" | "Observability" | "Languages";
  level: number; // 0-100
};

export const skills: Skill[] = [
  { name: "AWS", category: "Cloud", level: 95 },
  { name: "GCP", category: "Cloud", level: 65 },
  { name: "Azure (fundamentals)", category: "Cloud", level: 45 },
  { name: "Kubernetes / EKS", category: "Containers", level: 90 },
  { name: "Docker", category: "Containers", level: 90 },
  { name: "Helm", category: "Containers", level: 85 },
  { name: "Terraform", category: "IaC", level: 92 },
  { name: "CloudFormation", category: "IaC", level: 78 },
  { name: "GitHub Actions", category: "CI/CD", level: 90 },
  { name: "ArgoCD", category: "CI/CD", level: 88 },
  { name: "Jenkins", category: "CI/CD", level: 82 },
  { name: "GitLab CI", category: "CI/CD", level: 80 },
  { name: "Prometheus", category: "Observability", level: 88 },
  { name: "Grafana", category: "Observability", level: 88 },
  { name: "Loki / ELK", category: "Observability", level: 80 },
  { name: "Bash", category: "Languages", level: 90 },
  { name: "Python", category: "Languages", level: 75 },
];

export const heroSkills = [
  "AWS",
  "Kubernetes",
  "Terraform",
  "GitOps",
  "CI/CD",
  "Docker",
] as const;

export type Stat = { label: string; value: string; hint: string };

export const stats: Stat[] = [
  { label: "Years in DevOps", value: "3+", hint: "Cloud & platform engineering" },
  { label: "AWS cost saved", value: "$8K/mo", hint: "32% reduction · 4 accounts" },
  { label: "Uptime SLA", value: "99.95%", hint: "EKS + Aurora Multi-AZ" },
  { label: "Microservices", value: "20+", hint: "Operated on production EKS" },
];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  featured: boolean;
  techStack: string[];
  impact: { metric: string; label: string }[];
  highlights: string[];
  github: string;
  liveUrl?: string;
  /** key used to pick the right architecture diagram component */
  diagram:
    | "landing-zone"
    | "eks"
    | "gitops"
    | "cost"
    | "observability";
  /** Optional long-form case study shown on the project detail page. */
  caseStudy?: {
    challenge: string;
    approach: string[];
    outcome: string;
    repoTour?: { path: string; what: string }[];
  };
};

export const projects: Project[] = [
  {
    slug: "aws-landing-zone",
    title: "AWS Landing Zone",
    tagline: "Multi-account foundation with guardrails baked in",
    description:
      "A multi-account AWS organization (dev / stg / UAT / prod) built with Terraform, shared networking via Transit Gateway, centralized CloudTrail logging, and Service Control Policy guardrails. Reusable Terraform modules cut environment provisioning from a week to a day and eliminated configuration drift.",
    category: "Cloud Foundation",
    featured: true,
    techStack: [
      "AWS Organizations",
      "Terraform",
      "Transit Gateway",
      "Service Control Policies",
      "CloudTrail",
      "IAM",
      "VPC",
    ],
    impact: [
      { metric: "1 wk → 1 day", label: "environment provisioning (65% faster)" },
      { metric: "4", label: "AWS accounts: dev / stg / UAT / prod" },
      { metric: "0", label: "manual configuration drift" },
    ],
    highlights: [
      "Reusable Terraform modules standardize every account from a single source.",
      "Shared hub-and-spoke networking via Transit Gateway across all environments.",
      "Centralized CloudTrail logging and Service Control Policy guardrails.",
      "Documented architecture patterns and mentored the team on best practices.",
    ],
    github: "https://github.com/venkatesh1219/aws-landing-zone-terraform",
    diagram: "landing-zone",
    caseStudy: {
      challenge:
        "Each new AWS environment took roughly a week to stand up by hand, and small differences between dev, staging, UAT, and prod created configuration drift that was hard to audit and easy to get wrong.",
      approach: [
        "Modeled the whole organization as reusable Terraform modules — organization/OUs, networking, logging, SCP guardrails, and an IAM baseline.",
        "Connected every environment VPC to a single Transit Gateway hub with deliberately non-overlapping CIDRs, so there is no peering mesh to maintain.",
        "Centralized a multi-region, log-validated CloudTrail into an immutable bucket in a dedicated log-archive account.",
        "Attached Service Control Policies at the Workloads OU so guardrails apply to every current and future account and cannot be switched off.",
      ],
      outcome:
        "Environment provisioning dropped from about a week to a single day, configuration drift was eliminated, and all four accounts now sit under consistent, code-defined guardrails.",
      repoTour: [
        { path: "modules/", what: "organization · networking · logging · scp · iam-baseline" },
        { path: "environments/", what: "dev · staging · uat · prod (backend + tfvars per env)" },
        { path: "docs/ARCHITECTURE.md", what: "account topology, networking, and guardrail design" },
      ],
    },
  },
  {
    slug: "eks-platform",
    title: "EKS Microservices Platform",
    tagline: "20+ microservices with zero-downtime delivery",
    description:
      "A production Amazon EKS platform (EC2 + Fargate) hosting 20+ microservices, with Helm chart management, ArgoCD GitOps, HPA autoscaling, and blue-green deployments. Achieved zero-downtime releases and 99.95% availability while cutting rollback time from 45 minutes to 5.",
    category: "Platform Engineering",
    featured: true,
    techStack: [
      "Amazon EKS",
      "EC2 + Fargate",
      "Helm",
      "ArgoCD",
      "HPA / Cluster Autoscaler",
      "Blue-Green Deployments",
    ],
    impact: [
      { metric: "20+", label: "microservices in production" },
      { metric: "99.95%", label: "platform availability" },
      { metric: "45m → 5m", label: "rollback time" },
    ],
    highlights: [
      "EC2 + Fargate node strategy balancing cost and burst capacity.",
      "Helm-managed releases with ArgoCD GitOps reconciliation.",
      "HPA-driven autoscaling sized to real traffic patterns.",
      "Blue-green deployments delivering zero-downtime releases.",
    ],
    github: "https://github.com/venkatesh1219/eks-microservices-platform",
    diagram: "eks",
    caseStudy: {
      challenge:
        "Running 20+ microservices on EKS meant balancing cost against burst capacity, and every release risked downtime — rollbacks could take 45 minutes when something went wrong.",
      approach: [
        "Split compute across an On-Demand managed node group for steady baseline and a tainted Spot group for bursty, stateless work, with a Fargate profile isolating batch jobs.",
        "Packaged services in a single reusable Helm chart with HPA, ingress, and a parameterized active 'color' for blue-green.",
        "Drove all deployments through an ArgoCD app-of-apps so the cluster's state always equals what's in git.",
        "Made rollback a one-line change: flip the active color and re-sync.",
      ],
      outcome:
        "Zero-downtime releases at 99.95% availability across 20+ services, with rollback time cut from 45 minutes to 5.",
      repoTour: [
        { path: "terraform/", what: "EKS cluster, VPC, managed + spot node groups, Fargate, IRSA" },
        { path: "helm/microservice/", what: "reusable chart: deployment, service, HPA, ingress, blue-green" },
        { path: "argocd/", what: "app-of-apps + per-service Applications" },
      ],
    },
  },
  {
    slug: "gitops-cicd-platform",
    title: "GitOps & CI/CD Platform",
    tagline: "Secure, automated delivery from commit to cluster",
    description:
      "An enterprise CI/CD and GitOps delivery system using GitHub Actions, Jenkins, and ArgoCD, with SonarCloud and Snyk security gates. Blue-green and GitOps strategies eliminated production outages during releases, while CodePipeline automation slashed manual deployment effort.",
    category: "Continuous Delivery",
    featured: true,
    techStack: [
      "ArgoCD",
      "GitHub Actions",
      "Jenkins",
      "AWS CodePipeline / CodeBuild",
      "SonarCloud",
      "Snyk",
      "Helm",
    ],
    impact: [
      { metric: "Zero", label: "downtime during releases" },
      { metric: "40%", label: "fewer production defects" },
      { metric: "80%", label: "less manual deployment effort" },
    ],
    highlights: [
      "Blue-green + ArgoCD GitOps eliminated release-time outages.",
      "SonarCloud and Snyk quality/security gates in every pipeline.",
      "Automated ECS deployments via CodePipeline + CodeBuild.",
      "Event-driven ops (Lambda, EventBridge, SNS) removed 15+ hrs/week of toil.",
    ],
    github: "https://github.com/venkatesh1219/gitops-cicd-platform",
    diagram: "gitops",
    caseStudy: {
      challenge:
        "Deployments were manual and error-prone, releases occasionally caused outages, and there was no consistent quality or security gate before code reached production.",
      approach: [
        "Built CI that blocks merges on a SonarCloud quality gate and a Snyk high/critical vulnerability scan, with results uploaded to GitHub code-scanning.",
        "Adopted a strict GitOps model: CI never touches the cluster — it builds an image and commits a new tag, and ArgoCD reconciles the change.",
        "Used an ArgoCD ApplicationSet to template one Application per environment from a single values file, making promotion auditable through git history.",
        "Implemented the same stages in both GitHub Actions and a Jenkinsfile, so the model is tool-agnostic for teams mid-migration.",
      ],
      outcome:
        "Zero downtime during releases, 40% fewer production defects, and 80% less manual deployment effort — with one-revert rollbacks.",
      repoTour: [
        { path: ".github/workflows/", what: "ci (test + SonarCloud + Snyk) and cd (build + promote)" },
        { path: "argocd/applicationsets/", what: "one Application per environment from a template" },
        { path: "scripts/bump-image.sh", what: "the GitOps promotion step" },
      ],
    },
  },
  {
    slug: "cost-optimization",
    title: "Cloud Cost Optimization & FinOps",
    tagline: "$8K/month saved without slowing delivery",
    description:
      "A FinOps program spanning 4 AWS accounts: a full cost audit followed by Spot instance migration, Savings Plans, EC2 right-sizing, and intelligent scheduling. Delivered $8,000/month (32%) in savings and a documented cost-management framework the team now follows.",
    category: "FinOps",
    featured: true,
    techStack: [
      "AWS Cost Explorer",
      "Savings Plans",
      "Spot Fleets",
      "EC2 Right-sizing",
      "Instance Scheduling",
      "CloudWatch",
    ],
    impact: [
      { metric: "$8K/mo", label: "annualized AWS savings" },
      { metric: "32%", label: "total cost reduction" },
      { metric: "4", label: "AWS accounts optimized" },
    ],
    highlights: [
      "Spot instance migration across stateless workloads.",
      "Savings Plans and right-sizing guided by usage data.",
      "Intelligent scheduling for non-production environments.",
      "Documented FinOps framework and trained the team on cost monitoring.",
    ],
    github: "https://github.com/venkatesh1219/aws-cost-optimization",
    diagram: "cost",
    caseStudy: {
      challenge:
        "AWS spend across four accounts was climbing without clear ownership, and non-production environments ran 24/7 even though they were only used during office hours.",
      approach: [
        "Ran a full Cost Explorer audit by tag to make spend visible and find the biggest levers.",
        "Wrote read-only Python tooling to flag over-provisioned EC2 (14-day p95 CPU) and idle resources (unattached EBS, unused Elastic IPs).",
        "Deployed a tag-driven Lambda scheduler that powers non-prod down out of hours, plus Savings Plans and Spot migration for the right workloads.",
        "Added AWS Budgets alerts and documented a FinOps framework the team now follows.",
      ],
      outcome:
        "$8,000/month — a 32% reduction — saved across four accounts, with delivery velocity unchanged and a repeatable framework to keep it from regressing.",
      repoTour: [
        { path: "scripts/", what: "rightsizing and idle-resource reports (read-only)" },
        { path: "lambda/instance_scheduler/", what: "stop/start office-hours instances by tag" },
        { path: "docs/FINOPS_FRAMEWORK.md", what: "the inform → optimize → operate loop" },
      ],
    },
  },
  {
    slug: "observability-stack",
    title: "Observability & SRE Stack",
    tagline: "One pane of glass, 50% faster resolution",
    description:
      "A centralized observability platform — Prometheus, Grafana, Loki, and the ELK stack — deployed across all environments with unified dashboards and PagerDuty alerting. Proactive detection resolved 95% of incidents before customer impact and cut MTTR in half.",
    category: "Observability & SRE",
    featured: true,
    techStack: [
      "Prometheus",
      "Grafana",
      "Loki",
      "ELK Stack",
      "PagerDuty",
      "CloudWatch",
    ],
    impact: [
      { metric: "50%", label: "reduction in MTTR" },
      { metric: "95%", label: "incidents caught pre-impact" },
      { metric: "All envs", label: "unified dashboards" },
    ],
    highlights: [
      "Prometheus + Grafana metrics with custom, per-service dashboards.",
      "Loki and ELK centralize logs across every environment.",
      "PagerDuty alerting with on-call runbooks for fast response.",
      "Mentored the team on SRE principles and incident response.",
    ],
    github: "https://github.com/venkatesh1219/observability-stack",
    diagram: "observability",
    caseStudy: {
      challenge:
        "Incidents were often noticed by customers first, signals were scattered across tools, and noisy cause-based alerts created fatigue rather than fast response.",
      approach: [
        "Centralized metrics (Prometheus), logs (Loki + ELK), and dashboards (Grafana) into one pane of glass across every environment.",
        "Expressed SLOs with the RED method — Rate, Errors, Duration — so alerts fire on symptoms users feel, not on noisy internal causes.",
        "Routed critical alerts to PagerDuty and warnings to Slack via Alertmanager, with every critical alert linking to a runbook.",
        "Wrote per-alert runbooks and ran blameless postmortems with tracked action items.",
      ],
      outcome:
        "MTTR cut in half and 95% of incidents caught before customer impact, with unified dashboards across all environments.",
      repoTour: [
        { path: "prometheus/rules/", what: "SLO alert rules using the RED method" },
        { path: "alertmanager/", what: "critical → PagerDuty, warning → Slack routing" },
        { path: "docs/runbooks/", what: "per-alert response checklists" },
      ],
    },
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    company: "Easy Deploy",
    role: "Senior DevOps Engineer",
    period: "Sep 2024 — Present",
    location: "Coimbatore, IN",
    summary:
      "Lead DevOps engineer owning a multi-account AWS Landing Zone and production EKS platform hosting 20+ microservices.",
    achievements: [
      "Architected a multi-account AWS Landing Zone (dev/stg/UAT/prod) with Terraform — provisioning 65% faster and free of configuration drift.",
      "Operated production EKS clusters (EC2 + Fargate) with blue-green deploys, cutting rollback time from 45 to 5 minutes.",
      "Built CI/CD pipelines (GitHub Actions, Jenkins, ArgoCD) with SonarCloud + Snyk gates, reducing production defects by 40%.",
      "Ran an AWS cost optimization program delivering $8,000/month (32%) in savings across 4 accounts.",
      "Deployed centralized observability (Prometheus, Grafana, Loki, ELK) with PagerDuty, reducing MTTR by 50%.",
      "Mentored 2 junior engineers and authored 30+ runbooks, cutting onboarding time by 3 weeks.",
    ],
    stack: ["AWS", "EKS", "Terraform", "ArgoCD", "GitHub Actions", "Prometheus"],
  },
  {
    company: "Trioangle Technologies",
    role: "DevOps Engineer",
    period: "Dec 2023 — Jun 2024",
    location: "Madurai, IN",
    summary:
      "Built CI/CD pipelines and high-availability AWS infrastructure for multiple production applications.",
    achievements: [
      "Built end-to-end CI/CD pipelines (GitHub Actions, GitLab CI, Jenkins) with security testing, cutting release cycles from 2 weeks to 3 days.",
      "Designed HA AWS infrastructure (EC2, RDS, S3, VPC, IAM) with Terraform and CloudFormation, achieving 99.9% uptime for 5+ apps.",
      "Managed 40+ Linux/Unix servers; automated patching with Bash/Python, reducing manual ops effort by 60%.",
      "Deployed Docker + Kubernetes microservices, reducing deployment failures by 70%.",
      "Implemented Grafana + Prometheus monitoring, resolving 95% of incidents before customer impact.",
    ],
    stack: ["AWS", "Terraform", "Kubernetes", "Docker", "GitLab CI", "Prometheus"],
  },
  {
    company: "NextVee Enterprises",
    role: "Cloud Engineer",
    period: "Feb 2022 — Dec 2023",
    location: "Coimbatore, IN",
    summary:
      "Architected and automated scalable AWS environments for 8+ client projects.",
    achievements: [
      "Deployed scalable AWS environments (EC2, RDS, S3, VPC) with Terraform for 8+ clients, cutting setup time by 50%.",
      "Established CI/CD pipelines (GitHub Actions, GitLab CI), eliminating manual deployments and reducing production errors by 45%.",
      "Reduced incident response time from 2 hours to 20 minutes with proactive Grafana/Prometheus monitoring.",
      "Strengthened security with IAM least-privilege, security groups, and encryption — zero security breaches.",
      "Led Agile improvements with Jira/Confluence, lifting sprint velocity by 25%.",
    ],
    stack: ["AWS", "Terraform", "GitHub Actions", "GitLab CI", "Grafana", "IAM"],
  },
];

/** Education & continuous learning — reflects the résumé (no fabricated certs). */
export type Education = {
  degree: string;
  institution: string;
  period: string;
  status: "Completed" | "Pursuing";
};

export const education: Education[] = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Kalasalingam University, Madurai",
    period: "2024 — 2027",
    status: "Pursuing",
  },
  {
    degree: "Diploma in Computer Science Engineering",
    institution: "Government Polytechnic College, Madurai",
    period: "2017 — 2019",
    status: "Completed",
  },
];

export const learningFocus: string[] = [
  "Kubernetes & container orchestration",
  "AWS cloud architecture",
  "Site Reliability Engineering (SRE) principles",
  "Infrastructure automation",
  "Technical leadership & mentoring",
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readingTime: string;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "aws-cost-optimization-32-percent",
    title: "How We Cut AWS Cost 32% ($8K/month) Across 4 Accounts",
    excerpt:
      "The cost audit, Spot migration, Savings Plans, and right-sizing playbook that delivered real savings — plus the FinOps guardrails that kept teams shipping.",
    date: "2026-05-12",
    readingTime: "9 min read",
    tags: ["AWS", "FinOps", "Cost Optimization"],
  },
  {
    slug: "zero-downtime-blue-green-argocd",
    title: "Zero-Downtime Releases with Blue-Green and ArgoCD",
    excerpt:
      "How a GitOps delivery model on EKS eliminated release-time outages and cut rollback from 45 minutes to 5 across 20+ microservices.",
    date: "2026-03-28",
    readingTime: "10 min read",
    tags: ["GitOps", "ArgoCD", "Kubernetes"],
  },
  {
    slug: "aws-landing-zone-terraform",
    title: "A Multi-Account AWS Landing Zone with Terraform",
    excerpt:
      "Reusable modules, Transit Gateway networking, centralized CloudTrail, and SCP guardrails — going from week-long provisioning to a single day.",
    date: "2026-02-09",
    readingTime: "8 min read",
    tags: ["AWS", "Terraform", "Security"],
  },
  {
    slug: "observability-that-halved-mttr",
    title: "The Observability Stack That Halved Our MTTR",
    excerpt:
      "Prometheus, Grafana, Loki, and ELK with PagerDuty alerting — and the SRE practices that caught 95% of incidents before customers noticed.",
    date: "2026-01-15",
    readingTime: "7 min read",
    tags: ["Observability", "SRE", "Prometheus"],
  },
];
