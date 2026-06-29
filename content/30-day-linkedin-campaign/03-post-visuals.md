# 30 Post Visuals — One Branded Graphic Per Day

Ready-to-post 1200×1200 square graphics (LinkedIn-native). Each pairs with that
day's post and poll. Files live in `public/social/` (also served live at
`https://venkatesh-portfolio-website.vercel.app/social/day-NN.png`).

**Design system:** deep-navy card, one accent colour per content pillar, the
day's hook as the headline, a defendable metric as the callout, and your name +
role + site locked to the footer. Consistent across all 30 so the feed reads as
one brand.

| Pillar | Accent | Pillar | Accent |
|---|---|---|---|
| AWS Architecture | amber | Observability / SRE | teal |
| Kubernetes / EKS | blue | FinOps | green |
| IaC / CI-CD / GitOps | violet | Security / DevSecOps | red |
| Career | cyan | | |

## How to use them
- **Single-image post:** attach `day-NN.png` to that day's post. The graphic is the hook; the caption carries the story.
- **PNG** for posting, **SVG** if you want to tweak text/colour in Figma or a browser first.
- **Alt text (accessibility + reach):** describe the headline, e.g. *"Branded card: 'I cut an AWS bill by $8,000 a month' — FinOps, Day 2 of 30."*
- Keep the graphic's claim and the caption's claim identical — every number must be one you can defend on a call.

## Day → file map

| Day | Pillar | Headline on graphic | File |
|----|--------|--------------------|------|
| 1 | Career | Senior DevOps Engineer. Open to work. | day-01.png |
| 2 | FinOps | I cut an AWS bill by $8,000 a month. | day-02.png |
| 3 | K8s | The OOMKilled mystery. | day-03.png |
| 4 | IaC | One Terraform module. 6 days saved. | day-04.png |
| 5 | SRE | The 3am page that taught me MTTR. | day-05.png |
| 6 | AWS | The multi-account Landing Zone. | day-06.png |
| 7 | K8s | Cluster Autoscaler vs Karpenter. | day-07.png |
| 8 | Security | 7 things I find in every cluster audit. | day-08.png |
| 9 | GitOps | We deployed to prod by hand. Then ArgoCD. | day-09.png |
| 10 | Observability | Alerts people don't ignore. | day-10.png |
| 11 | FinOps | Spot is too risky for production? | day-11.png |
| 12 | AWS | The NAT Gateway bill nobody expected. | day-12.png |
| 13 | K8s | Zero-downtime releases on EKS. | day-13.png |
| 14 | CI/CD | From 2-week releases to 3 days. | day-14.png |
| 15 | Career | What I'd fix in your first week. | day-15.png |
| 16 | SRE | The failover that wasn't tested. | day-16.png |
| 17 | Security | The IAM policy that was just * | day-17.png |
| 18 | AWS | VPC design mistakes I keep seeing. | day-18.png |
| 19 | K8s | Kubernetes is overkill? | day-19.png |
| 20 | IaC | Terraform modules that actually scale. | day-20.png |
| 21 | FinOps | Right-sizing without breaking prod. | day-21.png |
| 22 | Observability | The 4 signals that actually matter. | day-22.png |
| 23 | AWS | The Transit Gateway routing loop. | day-23.png |
| 24 | K8s | HPA done right. | day-24.png |
| 25 | Security | The secrets management ladder. | day-25.png |
| 26 | GitOps | The drift that broke prod. | day-26.png |
| 27 | SRE | The runbook that cut onboarding 3 weeks. | day-27.png |
| 28 | K8s | ECS vs EKS — the honest take. | day-28.png |
| 29 | AWS | How 99.95% uptime actually happens. | day-29.png |
| 30 | Career | 30 days. What I learned. | day-30.png |

*Regenerate or restyle anytime via `gen_post_graphics.py` (in your outputs folder) — edit the POSTS table and re-run.*
