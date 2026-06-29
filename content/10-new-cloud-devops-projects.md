# 10 New Senior Cloud & DevOps Projects

> Companion content for [venkatesh-portfolio-website.vercel.app](https://venkatesh-portfolio-website.vercel.app/).
> These 10 projects are deliberately **distinct** from the 5 already on the site
> (AWS Landing Zone, EKS Microservices Platform, GitOps & CI/CD, Cost Optimization, Observability).
> Focus areas: **AWS · Kubernetes/EKS · Terraform · CI/CD · AI/MLOps · Cost Optimization.**
>
> ⚠️ Use real numbers. Replace any metric below with figures you can defend in an interview.

---

## 1. Self-Hosted LLM Inference Platform on EKS

**Tagline:** Private, autoscaling LLM serving with token-level cost control
**Category:** AI/MLOps · Platform Engineering

A production GPU platform on Amazon EKS that serves open-weight LLMs (Llama 3, Mistral) with **vLLM** behind an OpenAI-compatible gateway. Karpenter provisions GPU nodes on demand, KEDA scales replicas on queue depth, and a semantic cache cuts redundant generations. Replaced a third-party API spend with predictable, owned infrastructure.

**Tech stack:** Amazon EKS · NVIDIA GPU Operator · vLLM · KServe · Karpenter · KEDA · LiteLLM gateway · Terraform · Prometheus/Grafana

**Impact**
- **~60%** lower cost-per-1M-tokens vs. hosted API at steady volume
- **p95 < 800ms** time-to-first-token under autoscaled load
- **0** customer data leaving the VPC (private inference)

**Highlights**
- Mixed `g5`/`g6` GPU node pools via Karpenter with Spot for batch, On-Demand for interactive.
- Token-bucket rate limiting and per-team token accounting through a LiteLLM gateway.
- Semantic + exact-match response cache (Redis) to skip repeat generations.
- GPU utilization dashboards and cost-per-token SLOs in Grafana.

**Case study**
- *Challenge:* Hosted LLM API spend was scaling linearly with usage and sending prompts off-network — a compliance and cost problem.
- *Approach:* Stood up vLLM on EKS GPU nodes, fronted by an OpenAI-compatible gateway so app teams changed only a base URL; Karpenter handled GPU bin-packing and Spot consolidation; KEDA scaled on request-queue depth, not CPU.
- *Outcome:* Cut blended cost-per-token ~60% at steady volume, kept all inference in-VPC, and gave each team a metered token budget.

**Repo tour**
- `terraform/` — EKS + GPU node IAM, Karpenter, VPC endpoints
- `helm/vllm/` — model server chart, HPA/KEDA scaledobject
- `gateway/` — LiteLLM config, rate limits, token accounting

---

## 2. MLOps Platform on EKS (Train → Register → Serve)

**Tagline:** End-to-end model lifecycle on Kubernetes
**Category:** AI/MLOps

A self-service ML platform on EKS where data scientists run **Kubeflow Pipelines** for training, log to an **MLflow** registry, and promote models to **KServe** for serving — all triggered from Git. Reproducible environments and GPU scheduling removed the "works on my notebook" gap.

**Tech stack:** Amazon EKS · Kubeflow Pipelines · MLflow · KServe · Argo Workflows · S3 (artifacts) · Terraform · Karpenter (GPU)

**Impact**
- **Days → hours** from experiment to deployed model
- **100%** reproducible training runs (pinned images + artifact lineage)
- **3** environments (dev/stage/prod) promoted via Git

**Highlights**
- Parameterized Kubeflow pipeline templates for the common train/eval/register flow.
- MLflow model registry with stage-gated promotion (Staging → Production).
- KServe canary rollouts with traffic splitting for safe model upgrades.
- GPU sharing via time-slicing for cheap experimentation workloads.

**Case study**
- *Challenge:* Models were trained ad hoc in notebooks, impossible to reproduce, and hand-deployed.
- *Approach:* Codified training as Kubeflow pipelines, made the MLflow registry the single promotion gate, and served through KServe with canary traffic.
- *Outcome:* Cut the experiment-to-production loop from days to hours with full lineage and one-click rollback.

**Repo tour**
- `pipelines/` — Kubeflow components (train/eval/register)
- `serving/` — KServe InferenceService manifests + canary policy
- `terraform/` — platform addons, S3 artifact buckets, IRSA

---

## 3. Real-Time Feature Store & Streaming ML Pipeline

**Tagline:** Consistent features online and offline, in milliseconds
**Category:** AI/MLOps · Data Platform

A **Feast**-based feature store on AWS that ingests events from **MSK (Kafka)**, materializes features to a low-latency online store (DynamoDB/Redis) for real-time inference, and to S3/Redshift for training — solving train/serve skew for fraud and recommendation models.

**Tech stack:** Feast · Amazon MSK · Kinesis · DynamoDB · Redshift · AWS Glue · Lambda · Terraform

**Impact**
- **< 15ms** online feature lookup at p99
- **0** train/serve skew (same feature definitions both paths)
- **40+** features served across 3 models

**Highlights**
- Single feature definition powering both online and offline stores.
- Streaming materialization from MSK with exactly-once semantics.
- Point-in-time-correct training datasets generated from the offline store.
- Feature freshness and drift monitoring wired into alerting.

**Case study**
- *Challenge:* Models performed worse in production than in training — classic train/serve skew from features computed differently in each path.
- *Approach:* Centralized feature definitions in Feast, streamed materialization via MSK, and served online from DynamoDB.
- *Outcome:* Eliminated skew, brought online lookups under 15ms p99, and made new features reusable across models.

**Repo tour**
- `feature_repo/` — Feast definitions + materialization jobs
- `streaming/` — MSK consumers, Kinesis bridges
- `terraform/` — MSK, DynamoDB, Glue catalog

---

## 4. Multi-Region DR & Automated Failover

**Tagline:** RTO under 15 minutes across regions
**Category:** Reliability · Platform Engineering

An automated disaster-recovery design for a critical EKS + Aurora workload: **Aurora Global Database** for sub-second cross-region replication, **Route 53** health-check failover, EKS warm standby in a second region, and game-day chaos tests proving the runbook actually works.

**Tech stack:** Aurora Global Database · Route 53 (failover routing) · Amazon EKS (multi-region) · Velero · Terraform · AWS Backup · Chaos testing

**Impact**
- **< 15 min** RTO, **< 1 min** RPO (validated, not assumed)
- **2** regions with automated failover
- **Quarterly** game-days with documented results

**Highlights**
- Aurora Global Database with managed cross-region replication and fast promotion.
- Route 53 health checks flipping traffic to the standby region automatically.
- Velero-backed EKS cluster state and PV snapshots for fast rebuild.
- Failover runbook validated through scheduled chaos game-days.

**Case study**
- *Challenge:* The DR plan was a wiki page nobody had tested; real RTO/RPO were unknown.
- *Approach:* Built warm standby infra as Terraform modules, automated DNS failover, and ran quarterly game-days that force a real region failover.
- *Outcome:* Proven sub-15-minute RTO and sub-minute RPO, with a runbook the on-call team has actually executed.

**Repo tour**
- `terraform/regions/` — primary + standby stacks
- `failover/` — Route 53 health checks, promotion scripts
- `gamedays/` — chaos scenarios + results log

---

## 5. Zero-Trust Secrets & Policy Platform

**Tagline:** No long-lived secrets, no unguarded clusters
**Category:** Security · Platform Engineering

A cluster security baseline that kills static credentials: **HashiCorp Vault** with dynamic secrets, **External Secrets Operator** syncing to Kubernetes, **IRSA** for AWS access, and **OPA Gatekeeper** policies blocking insecure workloads at admission. Security became a guardrail, not a gate.

**Tech stack:** HashiCorp Vault · External Secrets Operator · IRSA · OPA Gatekeeper · cert-manager · Terraform · AWS KMS

**Impact**
- **0** long-lived secrets in manifests or CI
- **100%** of workloads pass admission policy
- **Minutes** to rotate, automatically

**Highlights**
- Vault dynamic DB credentials with short TTLs, synced via ESO.
- IRSA replaces node-wide IAM with per-pod least privilege.
- Gatekeeper constraints block `:latest` images, missing limits, and privileged pods.
- cert-manager automates internal TLS issuance and rotation.

**Case study**
- *Challenge:* Secrets lived in plaintext manifests and CI variables; nothing stopped insecure pods from shipping.
- *Approach:* Centralized secrets in Vault with dynamic credentials, synced through ESO, and enforced security policy at the admission layer with Gatekeeper.
- *Outcome:* Removed all long-lived secrets, enforced least-privilege per pod, and made insecure deployments fail before they reach the cluster.

**Repo tour**
- `vault/` — policies, dynamic secret backends
- `gatekeeper/` — constraint templates + constraints
- `terraform/` — IRSA roles, KMS keys, ESO install

---

## 6. Kubernetes Cost Optimization with Karpenter & Kubecost

**Tagline:** 45% cheaper compute, same performance
**Category:** Cost Optimization · Platform Engineering

A node-level FinOps overhaul: replaced Cluster Autoscaler with **Karpenter** for just-in-time, right-sized nodes and aggressive Spot consolidation, added **Kubecost** for per-team chargeback, and set right-size recommendations via VPA in recommend-mode. Distinct from account-level FinOps — this is about cluster efficiency.

**Tech stack:** Karpenter · Kubecost · VPA (recommend mode) · Spot · Bin-packing · Terraform · Prometheus

**Impact**
- **~45%** EKS compute cost reduction
- **70%** of stateless workloads on Spot with graceful drain
- **Per-namespace** chargeback visibility

**Highlights**
- Karpenter consolidation continuously bin-packs and retires under-used nodes.
- Spot-first provisioning with On-Demand fallback and interruption handling.
- Kubecost chargeback reports per team/namespace, exposing the real cost owners.
- VPA recommendations to fix chronically over-requested pods.

**Case study**
- *Challenge:* Cluster Autoscaler left nodes half-empty and teams had no idea what their workloads cost.
- *Approach:* Switched to Karpenter for tight bin-packing and Spot consolidation, and made cost visible per namespace with Kubecost.
- *Outcome:* ~45% lower compute spend with unchanged latency, plus chargeback that made teams self-correct over-provisioning.

**Repo tour**
- `karpenter/` — NodePools, disruption/consolidation policy
- `kubecost/` — install + chargeback config
- `terraform/` — IAM, interruption queue (SQS)

---

## 7. Internal Developer Platform with Backstage + Crossplane

**Tagline:** Golden paths from `git init` to production
**Category:** Platform Engineering · Developer Experience

A self-service IDP where developers scaffold a service from a **Backstage** template and get a repo, CI/CD, and cloud infra provisioned by **Crossplane** — without filing a ticket. Encodes the org's golden paths so the secure, observable default is the easy one.

**Tech stack:** Backstage · Crossplane · ArgoCD · GitHub Actions · Terraform · Kubernetes

**Impact**
- **Days → minutes** to a running, production-ready service
- **15+** software templates (service, job, frontend)
- **1** service catalog as the source of truth

**Highlights**
- Backstage software templates wire repo + pipeline + infra in one flow.
- Crossplane compositions provision RDS, S3, and IAM as Kubernetes resources.
- Built-in observability and security defaults baked into every template.
- TechDocs keep service docs next to the code in the catalog.

**Case study**
- *Challenge:* Spinning up a new service meant days of copy-paste and tickets to multiple teams.
- *Approach:* Built Backstage golden-path templates backed by Crossplane compositions so infra is requested declaratively and reconciled like any other K8s resource.
- *Outcome:* New services go from template to production in minutes, with security and observability on by default.

**Repo tour**
- `backstage/templates/` — scaffolder templates
- `crossplane/compositions/` — RDS/S3/IAM XRDs
- `catalog/` — service catalog entries

---

## 8. Serverless Event-Driven Data Lakehouse

**Tagline:** Petabyte-ready analytics with no servers to manage
**Category:** AWS · Data Platform

A fully serverless ingestion-to-analytics pipeline: **Kinesis** streams land raw events in an **S3** lakehouse, **Lambda** + **Step Functions** orchestrate transforms, **Glue** catalogs the data, and **Athena** powers SQL analytics — partitioned and compacted for cost and speed.

**Tech stack:** Kinesis · Lambda · Step Functions · S3 · AWS Glue · Athena · EventBridge · Terraform

**Impact**
- **$0** idle compute cost (scales to zero)
- **Minutes** from event to queryable
- **60%** cheaper queries via partitioning + Parquet compaction

**Highlights**
- Medallion (bronze/silver/gold) S3 layout with lifecycle tiering.
- Step Functions orchestrate multi-stage transforms with retries.
- Glue crawler + catalog gives Athena a live schema.
- EventBridge triggers downstream jobs on data arrival.

**Case study**
- *Challenge:* A standing EMR/EC2 analytics stack cost money around the clock for bursty workloads.
- *Approach:* Re-architected the pipeline as serverless — Kinesis → S3 → Lambda/Step Functions → Athena — with Parquet + partitioning for query efficiency.
- *Outcome:* Removed idle compute cost entirely and cut query cost ~60%, while keeping data queryable within minutes of arrival.

**Repo tour**
- `terraform/` — Kinesis, S3 layers, Glue, Athena workgroups
- `lambdas/` — transform functions
- `stepfunctions/` — orchestration definitions

---

## 9. Progressive Delivery with Argo Rollouts & Istio

**Tagline:** Automated canaries that roll themselves back
**Category:** CI/CD · Platform Engineering

A progressive-delivery layer on EKS using **Argo Rollouts** and an **Istio** service mesh: new versions get a weighted canary, an automated analysis step queries Prometheus for error rate and latency SLOs, and the rollout aborts itself if metrics regress. Distinct from blue-green — this is metric-driven canary.

**Tech stack:** Argo Rollouts · Istio · Prometheus · ArgoCD · Helm · Terraform

**Impact**
- **Automated** rollback on SLO breach (no human in the loop)
- **5–10%** blast radius per canary step
- **Faster, safer** releases than all-at-once

**Highlights**
- Weighted traffic shifting via Istio VirtualService during rollout.
- AnalysisTemplates query Prometheus and gate each canary step.
- Auto-abort + auto-rollback when error budget burns too fast.
- Integrated with ArgoCD for declarative, GitOps-driven rollouts.

**Case study**
- *Challenge:* Blue-green flipped 100% of traffic at once — safe to roll back, but a bad release still hit every user briefly.
- *Approach:* Layered Argo Rollouts canaries with Istio traffic shifting and automated Prometheus analysis gating each step.
- *Outcome:* Releases now expose only a small slice of traffic and self-abort on SLO regression, shrinking blast radius dramatically.

**Repo tour**
- `rollouts/` — Rollout + AnalysisTemplate manifests
- `istio/` — VirtualService/DestinationRule
- `helm/` — chart wiring rollout strategy

---

## 10. Compliance-as-Code & SOC 2 Automation

**Tagline:** Audit evidence that generates itself
**Category:** Security · Governance · CI/CD

A compliance automation layer that shifts controls left: **Checkov** scans Terraform pre-merge, **AWS Config** rules + **Security Hub** continuously check the live environment, and a Lambda pipeline collects evidence automatically — turning SOC 2 prep from a fire drill into a dashboard.

**Tech stack:** Checkov · OPA/Conftest · AWS Config · Security Hub · GuardDuty · Lambda · Terraform

**Impact**
- **Pre-merge** blocking of non-compliant infra
- **Continuous** control monitoring (not point-in-time)
- **Weeks → days** of audit-evidence prep

**Highlights**
- Checkov + Conftest gates in CI fail builds on policy violations.
- AWS Config conformance packs map to SOC 2 / CIS controls.
- Security Hub aggregates findings; auto-remediation Lambdas fix common drift.
- Evidence (config snapshots, scan reports) collected to S3 on a schedule.

**Case study**
- *Challenge:* Audits meant weeks of manual screenshot-gathering, and misconfigurations were caught only after deploy.
- *Approach:* Shifted checks left with Checkov/Conftest in CI, enforced continuous control monitoring with AWS Config + Security Hub, and automated evidence collection.
- *Outcome:* Non-compliant infra is blocked before merge, controls are monitored continuously, and audit prep dropped from weeks to days.

**Repo tour**
- `policies/` — Checkov + OPA rules
- `config/` — Config conformance packs
- `evidence/` — collection Lambda + S3 layout

---

### Suggested mapping to your site

| # | Project | Reuse `diagram` key | New category |
|---|---------|--------------------|--------------|
| 1 | LLM Inference Platform | `eks` | AI/MLOps |
| 2 | MLOps Platform | `eks` | AI/MLOps |
| 3 | Feature Store | `gitops` | Data Platform |
| 4 | Multi-Region DR | `landing-zone` | Reliability |
| 5 | Zero-Trust Secrets | `gitops` | Security |
| 6 | Karpenter Cost Opt | `cost` | Cost Optimization |
| 7 | Backstage IDP | `gitops` | Developer Experience |
| 8 | Serverless Lakehouse | `landing-zone` | Data Platform |
| 9 | Progressive Delivery | `gitops` | CI/CD |
| 10 | Compliance-as-Code | `landing-zone` | Security |

I can wire any of these into `lib/data.ts` in your exact `Project` schema on request.
