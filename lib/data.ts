/**
 * Single source of truth for all portfolio content.
 * Content reflects Venkatesh Sethumurugan's actual résumé.
 * Edit this file to update projects, experience, education, skills, and blog.
 */

import { blogBodies } from "./blog-content";

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
  { label: "Years in DevOps", value: "4+", hint: "Cloud & platform engineering" },
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
  /** key used to pick the right architecture diagram component.
   *  Optional — newer projects render a tech-stack panel instead. */
  diagram?:
    | "landing-zone"
    | "eks"
    | "gitops"
    | "cost"
    | "observability";
  /** Difficulty/seniority signal shown on cards. */
  level?: "Intermediate" | "Advanced";
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
  {
    slug: "multi-region-dr",
    title: "Multi-Region Disaster Recovery",
    tagline: "A DR plan you can actually prove — on a schedule",
    description:
      "An active-warm multi-region architecture on AWS with Aurora Global Database, Route 53 health-check failover, and a warm-standby EKS cluster in a second region. Quarterly game-days force a real failover and measure RTO/RPO — so recovery is a tested number, not a wiki page nobody has run.",
    category: "Resilience & DR",
    featured: true,
    level: "Advanced",
    techStack: [
      "Aurora Global Database",
      "Route 53",
      "Amazon EKS",
      "Terraform",
      "S3 Cross-Region Replication",
      "CloudWatch Synthetics",
      "AWS Backup",
    ],
    impact: [
      { metric: "< 15 min", label: "measured RTO (failover game-days)" },
      { metric: "< 1 min", label: "RPO with Aurora Global replication" },
      { metric: "Quarterly", label: "real failovers, on a schedule" },
    ],
    highlights: [
      "Aurora Global Database with sub-second cross-region replication and managed promotion.",
      "Route 53 health checks flip traffic to the standby region automatically.",
      "Warm-standby EKS in region two, kept in sync via GitOps and minimal-scale node groups.",
      "Quarterly game-days that trigger a genuine failover and record RTO/RPO each time.",
    ],
    github: "https://github.com/venkatesh1219/multi-region-dr-aws",
    caseStudy: {
      challenge:
        "Most DR plans are a wiki page nobody has tested — the real RTO and RPO are unknown until the day a region fails, which is the worst possible time to find out the app doesn't reconnect cleanly.",
      approach: [
        "Made Aurora Global Database the system of record, with a read-replica region promotable to primary in minutes and sub-second replication lag.",
        "Fronted both regions with Route 53 health checks and failover routing so traffic moves automatically when the primary stops answering.",
        "Kept a warm-standby EKS cluster in the second region reconciled by ArgoCD, scaled low to control cost but ready to absorb load on promotion.",
        "Scheduled quarterly game-days that force a real failover, exercise the application's reconnect path, and record measured RTO/RPO every time.",
      ],
      outcome:
        "Validated recovery of under 15 minutes RTO and under 1 minute RPO — measured, on a schedule, by the on-call team rather than assumed on paper.",
      repoTour: [
        { path: "terraform/regions/", what: "primary + standby region stacks (VPC, EKS, Aurora)" },
        { path: "terraform/route53/", what: "health checks + failover routing policy" },
        { path: "gameday/", what: "failover runbook + automated RTO/RPO measurement scripts" },
      ],
    },
  },
  {
    slug: "zero-trust-secrets",
    title: "Zero-Trust Secrets & Policy Baseline",
    tagline: "No long-lived secrets, no insecure pod ever ships",
    description:
      "A Kubernetes security baseline that makes insecure configuration impossible to deploy. HashiCorp Vault issues dynamic, short-TTL secrets synced in by the External Secrets Operator; IRSA gives every pod least-privilege AWS access; and OPA Gatekeeper blocks insecure workloads at admission. Zero long-lived secrets, 100% of workloads policy-compliant.",
    category: "Security & DevSecOps",
    featured: true,
    level: "Advanced",
    techStack: [
      "HashiCorp Vault",
      "External Secrets Operator",
      "OPA Gatekeeper",
      "IRSA",
      "Kubernetes NetworkPolicy",
      "AWS KMS",
      "cert-manager",
    ],
    impact: [
      { metric: "0", label: "long-lived secrets in the cluster" },
      { metric: "100%", label: "workloads passing admission policy" },
      { metric: "0", label: "critical findings in security audit" },
    ],
    highlights: [
      "Vault issues dynamic, short-TTL database and cloud credentials — nothing long-lived to steal.",
      "External Secrets Operator syncs secrets in so none ever sit in a manifest or Git.",
      "OPA Gatekeeper blocks :latest images, privileged pods, and missing limits at admission.",
      "IRSA + default-deny NetworkPolicies enforce least privilege end to end.",
    ],
    github: "https://github.com/venkatesh1219/zero-trust-secrets-k8s",
    caseStudy: {
      challenge:
        "Almost every cluster audit turns up the same two problems: secrets sitting in plaintext manifests, and nothing stopping an insecure pod from shipping. Security that depends on people remembering doesn't scale.",
      approach: [
        "Stood up Vault as the secrets authority, issuing dynamic short-TTL credentials so a leaked secret is worthless within minutes.",
        "Synced secrets into Kubernetes with the External Secrets Operator, keeping plaintext out of every manifest and Git history.",
        "Granted per-pod AWS access with IRSA — no shared node credentials, no wildcard policies — built from CloudTrail-observed usage.",
        "Enforced an OPA Gatekeeper policy set at admission so insecure config fails before it reaches the cluster, with default-deny NetworkPolicies on top.",
      ],
      outcome:
        "Zero long-lived secrets, 100% of workloads passing policy, insecure deploys rejected before they land, and zero critical findings on the next audit.",
      repoTour: [
        { path: "vault/", what: "dynamic secret engines + Kubernetes auth roles" },
        { path: "gatekeeper/constraints/", what: "admission policies: image, privilege, limits" },
        { path: "policies/network/", what: "default-deny + per-namespace NetworkPolicies" },
      ],
    },
  },
  {
    slug: "internal-developer-platform",
    title: "Internal Developer Platform",
    tagline: "Golden paths over tickets — self-service for engineers",
    description:
      "A self-service internal developer platform built on Backstage and Crossplane. Developers scaffold a new service, get a repo, CI/CD, namespace, and observability wired up from a golden-path template — provisioning real AWS infrastructure through Crossplane compositions, governed and least-privilege, without filing a ticket.",
    category: "Platform Engineering",
    featured: true,
    level: "Advanced",
    techStack: [
      "Backstage",
      "Crossplane",
      "Kubernetes",
      "ArgoCD",
      "GitHub Actions",
      "Terraform",
      "OpenTelemetry",
    ],
    impact: [
      { metric: "Days → mins", label: "to stand up a new service" },
      { metric: "Self-service", label: "infra without filing tickets" },
      { metric: "1 golden path", label: "consistent, governed by default" },
    ],
    highlights: [
      "Backstage software templates scaffold repo, pipeline, namespace, and dashboards in one flow.",
      "Crossplane compositions provision real AWS resources (RDS, S3, IAM) with guardrails.",
      "Every generated service ships with CI/CD, GitOps wiring, and observability by default.",
      "A service catalog and TechDocs make ownership and docs discoverable across the org.",
    ],
    github: "https://github.com/venkatesh1219/internal-developer-platform",
    caseStudy: {
      challenge:
        "As teams grew, every new service meant a queue of tickets — repo, pipeline, cloud resources, monitoring — each set up slightly differently. The platform team became a bottleneck and consistency drifted.",
      approach: [
        "Built a Backstage portal as the single front door, with software templates encoding the organization's golden path.",
        "Replaced ticket-driven infra with Crossplane compositions so developers request governed AWS resources declaratively, in Git.",
        "Wired every scaffolded service to CI/CD, ArgoCD, and a default observability stack so it's production-shaped from minute one.",
        "Published a service catalog and TechDocs so ownership, APIs, and runbooks are discoverable instead of tribal.",
      ],
      outcome:
        "Spinning up a new, production-ready service dropped from days of cross-team tickets to minutes of self-service — consistent, governed, and least-privilege by default.",
      repoTour: [
        { path: "backstage/templates/", what: "golden-path software templates (service scaffolding)" },
        { path: "crossplane/compositions/", what: "governed AWS resource compositions (RDS, S3, IAM)" },
        { path: "catalog/", what: "service catalog entities + TechDocs" },
      ],
    },
  },
  {
    slug: "event-streaming-platform",
    title: "Event-Driven Streaming Platform",
    tagline: "Real-time pipelines on MSK with exactly-once processing",
    description:
      "A real-time, event-driven data platform on AWS using Amazon MSK (Kafka), schema-governed topics, and a mix of Kafka Streams and serverless consumers. Backed by a tiered datastore — DynamoDB for low-latency lookups, S3 for the data lake — it processes high-volume events with exactly-once semantics and replayable history.",
    category: "Data & Streaming",
    featured: true,
    level: "Advanced",
    techStack: [
      "Amazon MSK (Kafka)",
      "EventBridge",
      "Kafka Streams",
      "AWS Lambda",
      "DynamoDB",
      "S3 Data Lake",
      "Glue Schema Registry",
    ],
    impact: [
      { metric: "Exactly-once", label: "processing semantics" },
      { metric: "< 15 ms", label: "p99 online lookup (DynamoDB)" },
      { metric: "Replayable", label: "event history from the log" },
    ],
    highlights: [
      "Amazon MSK as the durable event backbone with schema-governed, versioned topics.",
      "Kafka Streams and idempotent Lambda consumers giving exactly-once, replayable processing.",
      "Tiered storage: DynamoDB for sub-15ms online lookups, S3 as the analytical data lake.",
      "EventBridge fan-out decouples producers from downstream consumers cleanly.",
    ],
    github: "https://github.com/venkatesh1219/event-streaming-platform",
    caseStudy: {
      challenge:
        "Batch ETL meant data was always stale, point-to-point integrations were brittle, and reprocessing after a bug meant rebuilding state by hand. The business needed real-time, and engineering needed something replayable.",
      approach: [
        "Made Amazon MSK the durable event backbone, with the Glue Schema Registry enforcing versioned, backward-compatible contracts on every topic.",
        "Processed streams with Kafka Streams for stateful joins and idempotent Lambda consumers for fan-out work, keyed for exactly-once effects.",
        "Split storage by access pattern — DynamoDB for sub-15ms online reads, S3 as the replayable analytical lake — fed from the same log.",
        "Decoupled producers and consumers through EventBridge so new consumers can be added without touching producers, and history can be replayed.",
      ],
      outcome:
        "Real-time pipelines with exactly-once processing, sub-15ms online lookups, and a replayable event history — so a bug fix means a safe replay, not a manual rebuild.",
      repoTour: [
        { path: "terraform/msk/", what: "MSK cluster, topics, and Glue Schema Registry" },
        { path: "streams/", what: "Kafka Streams topology (stateful joins, aggregations)" },
        { path: "consumers/", what: "idempotent Lambda consumers + DynamoDB/S3 sinks" },
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
  cover?: string; // path to an architecture diagram in /public/blog
  body?: string; // full markdown, sourced from lib/blog-content.ts
};

export const blogPosts: BlogPost[] = [
  {
    slug: "multi-region-dr-game-days",
    title: "Proving Multi-Region DR: Game-Days, Aurora Global, and a 15-Minute RTO",
    excerpt:
      "An active-warm AWS architecture with Aurora Global Database and Route 53 failover — and the quarterly game-days that turn RTO/RPO from a guess into a measured number.",
    date: "2026-06-15",
    readingTime: "8 min read",
    tags: ["AWS", "SRE", "Disaster Recovery"],
    body: blogBodies["multi-region-dr-game-days"],
  },
  {
    slug: "zero-trust-secrets-kubernetes",
    title: "A Zero-Trust Secrets Baseline for Kubernetes (Vault + ESO + IRSA)",
    excerpt:
      "Dynamic short-TTL secrets with Vault, sync via External Secrets, per-pod least privilege with IRSA, and admission control that rejects insecure pods before they ship.",
    date: "2026-06-08",
    readingTime: "7 min read",
    tags: ["Kubernetes", "DevSecOps", "Vault"],
    body: blogBodies["zero-trust-secrets-kubernetes"],
  },
  {
    slug: "building-an-internal-developer-platform",
    title: "Building an Internal Developer Platform: Golden Paths over Tickets",
    excerpt:
      "How Backstage software templates and Crossplane compositions turn days of cross-team tickets into minutes of governed, self-service provisioning.",
    date: "2026-06-01",
    readingTime: "8 min read",
    tags: ["Platform Engineering", "Backstage", "Crossplane"],
    body: blogBodies["building-an-internal-developer-platform"],
  },
  {
    slug: "event-driven-streaming-aws",
    title: "Event-Driven on AWS: MSK, Exactly-Once, and Replayable Pipelines",
    excerpt:
      "Making Amazon MSK the source of truth, processing with Kafka Streams and idempotent Lambdas, and tiering storage across DynamoDB and S3 for real-time, replayable data.",
    date: "2026-05-22",
    readingTime: "7 min read",
    tags: ["AWS", "Kafka", "Data Engineering"],
    body: blogBodies["event-driven-streaming-aws"],
  },
  {
    slug: "aws-cost-optimization-32-percent",
    title: "How I Cut an AWS Bill 32% ($8K/month) Across 4 Accounts",
    excerpt:
      "The cost audit, Spot migration, Savings Plans, and right-sizing playbook that delivered real savings — plus the FinOps guardrails that kept teams shipping.",
    date: "2026-05-12",
    readingTime: "9 min read",
    tags: ["AWS", "FinOps", "Cost Optimization"],
    cover: "/blog/diagram-aws-cost-optimization.svg",
    body: blogBodies["aws-cost-optimization-32-percent"],
  },
  {
    slug: "zero-downtime-blue-green-argocd",
    title: "Zero-Downtime Releases with Blue-Green and ArgoCD",
    excerpt:
      "How a GitOps delivery model on EKS eliminated release-time outages and cut rollback from 45 minutes to 5 across 20+ microservices.",
    date: "2026-04-28",
    readingTime: "10 min read",
    tags: ["GitOps", "ArgoCD", "Kubernetes"],
    cover: "/blog/diagram-blue-green-argocd.svg",
    body: blogBodies["zero-downtime-blue-green-argocd"],
  },
  {
    slug: "eks-autoscaling-with-karpenter",
    title: "EKS Autoscaling with Karpenter (and a Lower Compute Bill)",
    excerpt:
      "Why I moved the node layer from Cluster Autoscaler to Karpenter — just-in-time provisioning, smart Spot mixing, and aggressive consolidation.",
    date: "2026-04-06",
    readingTime: "6 min read",
    tags: ["Kubernetes", "Karpenter", "FinOps"],
    cover: "/blog/diagram-karpenter-eks.svg",
    body: blogBodies["eks-autoscaling-with-karpenter"],
  },
  {
    slug: "aws-landing-zone-terraform",
    title: "A Multi-Account AWS Landing Zone with Terraform",
    excerpt:
      "Reusable modules, Transit Gateway networking, centralized CloudTrail, and SCP guardrails — going from week-long provisioning to a single day.",
    date: "2026-03-09",
    readingTime: "8 min read",
    tags: ["AWS", "Terraform", "Security"],
    cover: "/blog/diagram-aws-landing-zone.svg",
    body: blogBodies["aws-landing-zone-terraform"],
  },
  {
    slug: "ci-cd-pipeline-2-weeks-to-3-days",
    title: "From 2-Week Releases to 3 Days: A CI/CD Pipeline Rebuild",
    excerpt:
      "Killing manual gates, parallelizing quality checks, shifting security left, and letting ArgoCD own the rollout — 85% faster, with fewer defects.",
    date: "2026-02-18",
    readingTime: "6 min read",
    tags: ["CI/CD", "GitOps", "DevOps"],
    cover: "/blog/diagram-cicd-pipeline.svg",
    body: blogBodies["ci-cd-pipeline-2-weeks-to-3-days"],
  },
  {
    slug: "kubernetes-security-baseline",
    title: "A Kubernetes Security Baseline That Enforces Itself",
    excerpt:
      "Admission control with OPA Gatekeeper, dynamic secrets with Vault, per-pod least privilege with IRSA, and default-deny networking — guardrails over checklists.",
    date: "2026-02-02",
    readingTime: "6 min read",
    tags: ["Kubernetes", "DevSecOps", "Security"],
    cover: "/blog/diagram-k8s-security.svg",
    body: blogBodies["kubernetes-security-baseline"],
  },
  {
    slug: "observability-that-halved-mttr",
    title: "The Observability Stack That Halved Our MTTR",
    excerpt:
      "Prometheus, Grafana, Loki, and ELK with PagerDuty alerting — and the SRE practices that caught 95% of incidents before customers noticed.",
    date: "2026-01-15",
    readingTime: "7 min read",
    tags: ["Observability", "SRE", "Prometheus"],
    cover: "/blog/diagram-observability-mttr.svg",
    body: blogBodies["observability-that-halved-mttr"],
  },
  {
    slug: "llm-inference-platform-eks",
    title: "A Self-Hosted LLM Inference Platform on EKS (Cost ~60% Lower)",
    excerpt:
      "Replacing a hosted LLM API with vLLM on EKS — an OpenAI-compatible gateway, Karpenter GPU nodes, KEDA queue-depth scaling, and a semantic cache.",
    date: "2025-12-20",
    readingTime: "9 min read",
    tags: ["MLOps", "Kubernetes", "AWS"],
    cover: "/blog/llm-inference-architecture.png",
    body: blogBodies["llm-inference-platform-eks"],
  },
];
