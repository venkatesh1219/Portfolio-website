# 🌆 Evening DevOps Brief — 26 Jun 2026 | 18:00 IST

---

## 📡 What's Trending Today

The biggest themes today are **supply chain security hardening** and **GitOps maturity**. ingress-nginx reaching end-of-life in March 2026 is still causing migration urgency across Kubernetes teams. GitHub Actions security best practices (SHA pinning, OIDC) are dominating the CI/CD conversation, while the ECS vs EKS debate remains the most-searched AWS architecture comparison. On the IaC front, the "Terraform as application code" mindset — with real testing, linting, and remote state — is becoming baseline expectation for senior engineers.

---

## 🔥 Top 7 Tips & Tricks

1. **Pin GitHub Actions to Commit SHA** — Replace mutable branch/tag refs with full commit SHAs to prevent supply chain attacks; e.g. `uses: actions/checkout@a5ac7e51b41094c92402da3b24376905380afc29`
2. **Use OIDC Instead of Static AWS Keys in CI/CD** — Federate GitHub Actions with AWS via OIDC; zero long-lived secrets stored, auto-rotating tokens, works natively with `aws-actions/configure-aws-credentials`
3. **Migrate Off ingress-nginx Immediately** — Retired March 2026; still-running deployments are on unpatched versions. Move to Envoy Gateway, Istio Gateway API, Linkerd Gateway, or Kgateway
4. **Store K8s Secrets Externally, Not in etcd** — Native Kubernetes Secrets are base64 only (not encrypted at rest by default). Use External Secrets Operator + AWS Secrets Manager or HashiCorp Vault
5. **Enforce GitOps with Policy-as-Code** — ArgoCD or Flux for reconciliation; gate every change with OPA/Gatekeeper or Kyverno. If it's not in Git, it doesn't exist in prod
6. **Generate + Sign SBOMs for Every Container Image** — Run `trivy sbom` or `syft` to generate; sign with `cosign sign --key cosign.key my-image:latest`; 73% of orgs with SBOMs report faster vulnerability mitigation
7. **Run Ephemeral GitHub Runners on K8s via ARC** — Actions Runner Controller creates per-job ephemeral runners inside your cluster; auto-scales to zero, eliminates idle runner EC2 costs entirely

---

## 🐛 Problems & Solutions

### Problem 1: kubectl drain Blocked by PodDisruptionBudget
- **Problem**: `kubectl drain <node>` hangs indefinitely during a rolling update or cluster upgrade. The drain operation times out and the node never evacuates.
- **Root cause**: A PodDisruptionBudget (PDB) has `ALLOWED DISRUPTIONS: 0` — the current number of healthy pods exactly meets the minAvailable threshold, so no evictions are permitted.
- **Fix**:
  1. Check blocking PDBs: `kubectl get pdb -A`
  2. Option A — Add unhealthy pod eviction policy to your PDB YAML:
     ```yaml
     spec:
       unhealthyPodEvictionPolicy: AlwaysAllow
     ```
  3. Option B — Scale up the deployment first (`kubectl scale deployment my-app --replicas=+1`), wait for the new pod to be Ready, then re-run the drain.
  4. For DaemonSet pods: always use `--ignore-daemonsets` flag.

### Problem 2: Terraform Configs Breaking Across Environments Due to Hardcoded Values
- **Problem**: Terraform modules fail when reused across accounts or regions because `us-east-1` and account IDs are hardcoded as string literals.
- **Root cause**: Values copy-pasted instead of using Terraform data sources and variables.
- **Fix**:
  ```hcl
  # Fetch dynamically instead of hardcoding
  data "aws_region" "current" {}
  data "aws_caller_identity" "current" {}

  # Use throughout module
  region     = data.aws_region.current.name
  account_id = data.aws_caller_identity.current.account_id

  # Mark secrets as sensitive
  variable "db_password" {
    type      = string
    sensitive = true
  }
  ```
  Store state remotely (S3 + DynamoDB lock). Run `tfsec` or `checkov` in CI for static analysis.

---

## 🏗️ Architecture Pick of the Day

### ECS vs EKS — Choosing the Right AWS Container Platform

|  | **ECS** | **EKS** |
|---|---|---|
| **Use case** | AWS-native workloads, small-medium teams, simple microservices | Multi-cloud portability, large platform teams, complex workloads |
| **Pros** | No control plane cost, simpler config, fast time-to-market, fewer concepts | Full K8s ecosystem, portability, Helm/GitOps/Argo/Flux, HPA/VPA/Karpenter |
| **Cons** | AWS lock-in, limited ecosystem, fewer deployment strategies | $0.10/hr control plane cost (~$73/mo), steep learning curve, more moving parts |
| **Choose when** | Small team, no K8s expertise, fully committed to AWS, want production in days | Dedicated platform team, K8s skills exist, multi-cloud needed, scale demands |
| **Fargate** | ✅ Supported (serverless, no EC2 management) | ✅ Supported (identical pricing) |

**Verdict**: If your team has no Kubernetes experience and you're fully AWS-native, start with ECS — you'll ship faster. If you need portability, advanced deployment patterns (canary, blue-green via Flagger), or have a dedicated platform team, EKS pays off at scale.

---

## 📱 LinkedIn Content Created Today

---

### A) Carousel Caption

**7 DevOps tricks that will save your pipeline — and most engineers don't know #4.**

Swipe to learn:
1. ➡️ Why @main in GitHub Actions is a security risk
2. ➡️ OIDC: retire your static AWS keys for good
3. ➡️ ingress-nginx is dead — where to go next
4. ➡️ The right way to handle K8s secrets
5. ➡️ GitOps: making Git your single source of truth
6. ➡️ SBOMs + image signing in one command
7. ➡️ Ephemeral CI runners that scale to zero
8. ➡️ 🔥 Fire drill: fixing a PDB-blocked node drain
9. ➡️ How to find me for more

#DevOps #CloudEngineering #SRE #Kubernetes #AWS

> **First comment**: 🔗 More DevOps content + project writeups: https://venkatesh-portfolio-website.vercel.app/

---

### Carousel Slide Copy (10 slides, 1080×1080px, dark navy #0A192F bg, cyan #64FFDA accents)

**Slide 1 — Cover**
> **7 DevOps Tricks That Will Save Your Pipeline 🚀**
> Real tips from the trenches — swipe to learn →

**Slide 2 — Tip 1**
> **Pin Actions to Commit SHA**
> Never use `@main` or `@v3` — they're mutable and can be hijacked.
> Pin to full SHA to prevent supply chain attacks.
> `uses: actions/checkout@a5ac7e51b41094c92402da3b24376905380afc29`

**Slide 3 — Tip 2**
> **OIDC Over Static AWS Keys**
> Replace `AWS_ACCESS_KEY_ID` in CI with OIDC federation.
> Zero secrets stored. Auto-rotating. Native GitHub Actions support.
> Zero secrets = zero blast radius.

**Slide 4 — Tip 3**
> **ingress-nginx Is Retired ⚠️**
> End-of-life: March 2026.
> Still running it? You're on unpatched versions.
> Migrate NOW → Envoy Gateway / Istio / Kgateway

**Slide 5 — Tip 4**
> **K8s Secrets ≠ Secure Storage**
> Base64 is not encryption.
> Use External Secrets Operator + AWS Secrets Manager or HashiCorp Vault.
> Your etcd should never hold plaintext credentials.

**Slide 6 — Tip 5**
> **GitOps: Git Is the Only Source of Truth**
> If it's not in Git, it doesn't exist in prod.
> ArgoCD or Flux for reconciliation.
> OPA/Gatekeeper or Kyverno for policy-as-code gates.

**Slide 7 — Tip 6**
> **Sign Every Container Image**
> Generate SBOM: `trivy sbom my-image:latest`
> Sign: `cosign sign --key cosign.key my-image:latest`
> 73% of orgs with SBOMs respond to vulns faster.

**Slide 8 — Tip 7**
> **Ephemeral Runners with ARC**
> Actions Runner Controller = K8s-native GitHub runners.
> Spins up per-job. Terminates after. Scales to zero.
> No more idle EC2 runner costs.

**Slide 9 — Fire Drill 🔥**
> **kubectl drain Stuck?**
> Problem: PDB has ALLOWED DISRUPTIONS: 0 — no pods can evict.
> Fix: Add `unhealthyPodEvictionPolicy: AlwaysAllow` to your PDB
> OR scale up replicas first → wait → then drain.

**Slide 10 — CTA**
> **Found this useful?**
> Follow Venkatesh for daily DevOps content.
> 🌐 venkatesh-portfolio-website.vercel.app
> 💻 github.com/venkatesh1219

---

### B) Reel Caption + Script

**Caption:**
Nobody talks about THIS difference between ECS and EKS. Here's when each one actually makes sense 👇

- ⚡ The real cost difference (it's not just the control plane)
- ⚡ Why ECS ships faster but EKS scales smarter
- ⚡ The one rule of thumb that makes the choice obvious

🔗 Full breakdown + more: https://venkatesh-portfolio-website.vercel.app/ | 💻 github.com/venkatesh1219

#CloudArchitecture #DevOps #AWS #SRE #TechContent

---

**60-Second Reel Script:**

**[0–5s — Hook]**
"Nobody talks about THIS difference between ECS and EKS — and it's the one that actually determines which you should pick."

**[5–20s — Context]**
"Both run containers on AWS. Both support Fargate. Both are production-ready. So why does the wrong choice cost teams months of platform work? Because the decision isn't about features — it's about your team's operating model."

**[20–45s — Side-by-Side]**
"Three real differences:
One — ECS has NO control plane cost. EKS costs $73 a month per cluster before you run a single pod.
Two — ECS is AWS-only. EKS gives you full Kubernetes portability — move to GKE, AKS, or on-prem without rewriting your deployments.
Three — ECS is ready in days for a small team. EKS takes weeks to harden properly — RBAC, network policies, pod security, admission controllers — but it unlocks the full ecosystem: Helm, Argo Rollouts, Karpenter, the works."

**[45–55s — Rule of Thumb]**
"Here's the rule: No K8s experience, fully AWS-native, small team → ECS. You'll ship faster.
Dedicated platform team, multi-cloud needs, scale demands → EKS. You'll thank yourself in 12 months."

**[55–60s — CTA]**
"Follow for more real DevOps breakdowns. Full writeups at venkatesh-portfolio-website.vercel.app."

---

**Reel Thumbnail Design Brief (1080×1920px, your_story format):**
- Split-screen: LEFT = dark navy (#0A192F) with "ECS" in large white bold text; RIGHT = dark purple (#1A0533) with "EKS" in large white bold text
- Centre divider: Electric yellow (#FFE135) "⚡ vs ⚡" label
- Bottom strip: "Venkatesh | DevOps Engineer" in white on dark bar
- Max 6 words of headline text

---

### C) Text + Image Caption

Ever had `kubectl drain` hang indefinitely during a node upgrade? Yeah, me too — at the worst possible time.

Here's what's actually happening:

Your PodDisruptionBudget is doing its job *too well*. When `ALLOWED DISRUPTIONS` hits 0, the drain operation has no pods it's legally allowed to evict — so it just… waits. Forever. Meanwhile your upgrade window is burning.

The fix is simpler than you think:

**Option A** — Add this to your PDB spec:
```yaml
unhealthyPodEvictionPolicy: AlwaysAllow
```
This lets unhealthy pods be evicted even when the budget is exhausted.

**Option B** — Scale up first:
```
kubectl scale deployment my-app --replicas=+1
# Wait for pod to be Ready, then:
kubectl drain <node> --ignore-daemonsets
```

What's your go-to fix for PDB-blocked drains? Drop it below 👇

#DevOps #Kubernetes #CloudProblems #SRE #Engineering

> 🔗 https://venkatesh-portfolio-website.vercel.app/ | 💻 github.com/venkatesh1219

---

**Text+Image Design Brief (1200×627px, landscape):**
- LEFT HALF: Dark navy (#0A192F) background | 🔴 icon + white bold text: "kubectl drain stuck — PDB has 0 ALLOWED DISRUPTIONS"
- RIGHT HALF: Same dark bg | ✅ icon + cyan (#64FFDA) headline: "Fix: unhealthyPodEvictionPolicy: AlwaysAllow" + white sub-text: "Or scale up replicas first, then drain"
- BOTTOM BAR (full width): "Venkatesh | venkatesh-portfolio-website.vercel.app" in small white text

---

### D) Poll Post

**Poll Question** (LinkedIn native poll — no image needed):
> Which GitOps tool do you use to deploy to Kubernetes in production?

**Option A**: Argo CD
**Option B**: Flux CD
**Option C**: Neither — push-based CI
**Option D**: Still figuring it out

**Caption:**
GitOps is table stakes in 2026 — but the ArgoCD vs Flux debate is still very much alive.

ArgoCD gives you a beautiful UI and fast onboarding. Flux gives you a cleaner operator model and better image automation. Both are CNCF projects. Both are production-proven.

Vote below 👇 and tell me why in the comments — especially if you've switched from one to the other.

#GitOps #Kubernetes #DevOps #ArgoCD #FluxCD

---

## 🎨 Canva Folder

**Folder name**: `DevOps Brief – 26-Jun-2026 – 18:00 IST`
**Folder URL**: https://www.canva.com/folder/FAHNoyfkBwQ

> ⚠️ **Note**: Canva `generate-design` hit quota limit during this automated run. The folder has been created. Please open it and manually create the 3 designs using the design briefs documented above. Design specs summary:
>
> - **Design A (Carousel)**: instagram_post format (1080×1080), 10 slides, dark navy #0A192F bg, cyan #64FFDA accents — use slide copy from Section A above
> - **Design B (Reel Thumbnail)**: your_story format (1080×1920), ECS ⚡ vs ⚡ EKS split-screen — use brief from Section B above
> - **Design C (Text+Image)**: facebook_post / landscape format (1200×627), kubectl drain PDB problem vs solution — use brief from Section C above

---

## 🔗 Links

- Portfolio: https://venkatesh-portfolio-website.vercel.app/
- GitHub: https://github.com/venkatesh1219

---

## 📦 Sources

1. **[AWS ECS vs EKS 2026 — SquareOps](https://squareops.com/eks-vs-ecs/)** — Comprehensive comparison of control plane costs, use cases, and when to choose each AWS container platform
2. **[Kubernetes Best Practices 2026 — Pulumi Blog](https://www.pulumi.com/blog/kubernetes-best-practices-i-wish-i-had-known-before/)** — Covers ingress-nginx retirement, GitOps enforcement, external secrets, Gateway API migration
3. **[IaC Best Practices: Terraform, Pulumi, OpenTofu 2026 — DEV Community](https://dev.to/muskan_8abedcc7e12/infrastructure-as-code-best-practices-terraform-pulumi-and-opentofu-in-2026-4nc1)** — Remote state, secrets handling, modular design, CI linting
4. **[GitHub Actions CI/CD Complete Guide 2026 — tech-insider.org](https://tech-insider.org/github-actions-ci-cd-pipeline-tutorial-2026/)** — SHA pinning, OIDC federation, ARC for ephemeral runners, reusable workflows
5. **[Kubernetes Pod Disruption Budgets — OneUptime Blog](https://oneuptime.com/blog/post/2026-02-02-kubernetes-pod-disruption-budgets/view)** — PDB mechanics, `unhealthyPodEvictionPolicy: AlwaysAllow`, drain failure debugging
6. **[GitOps 2026: ArgoCD vs Flux — turbogeek.co.uk](https://www.turbogeek.co.uk/gitops-argocd-vs-flux-2026/)** — ArgoCD 3.3 new features, Flux 2.0 multi-cluster support, Flagger progressive delivery
7. **[Software Supply Chain Security Guide 2026 — Cloudsmith](https://cloudsmith.com/blog/the-2026-guide-to-software-supply-chain-security-from-static-sboms-to-agentic-governance)** — SBOM generation challenges, Trivy/Syft/Grype tooling, cosign image signing
8. **[Container Security Tools 2026 — Checkmarx](https://checkmarx.com/learn/container-security/10-container-security-tools-to-know-in-2026/)** — DevSecOps integration, scanning at build/deploy/runtime, VEX tooling

---

*Generated automatically by the Evening DevOps Brief automation — 26 Jun 2026 18:00 IST*
