# 10 LinkedIn Posts — One Per Project

> Drip these out ~2x/week. Each post: hook → context → what I did → lesson → CTA.
> Swap in your real numbers before posting. Portfolio link:
> https://venkatesh-portfolio-website.vercel.app/
> Best posting windows (IST audience + US tech): Tue–Thu, 9–11am or 7–9pm.

---

## Post 1 — LLM Inference Platform on EKS

Hosted LLM APIs are convenient — until your bill scales linearly with usage and your prompts leave the network.

So I built a self-hosted inference platform on EKS instead.

The setup:
• vLLM serving Llama 3 / Mistral behind an OpenAI-compatible gateway
• Karpenter provisioning GPU nodes just-in-time (Spot for batch, On-Demand for interactive)
• KEDA scaling on request-queue depth — not CPU
• A semantic cache to skip repeat generations

Result: ~60% lower cost-per-token at steady volume, p95 time-to-first-token under 800ms, and zero data leaving the VPC.

The unlock wasn't the model — it was treating GPU capacity as an autoscaling, bin-packed resource like any other.

Full architecture write-up on my site 👇

#AWS #Kubernetes #MLOps #LLM #DevOps #EKS

---

## Post 2 — MLOps Platform on EKS

"It worked in my notebook" is where most ML projects go to die.

I built an MLOps platform on EKS to close that gap:
• Kubeflow Pipelines for reproducible training
• MLflow registry as the single promotion gate (Staging → Production)
• KServe for canary model serving
• Everything triggered from Git

Experiment-to-production dropped from days to hours, with full lineage and one-click rollback.

The biggest win wasn't speed. It was that every model deployed is now reproducible and auditable — you can point to exactly which data and code produced it.

Walkthrough on my portfolio 👇

#MLOps #Kubernetes #AWS #DevOps #MachineLearning

---

## Post 3 — Real-Time Feature Store

Your model scores great in training and disappoints in production. Why?

Usually: train/serve skew. The features are computed one way offline and another way online.

I killed that with a Feast feature store on AWS:
• One feature definition powering BOTH online and offline stores
• Streaming materialization from MSK (Kafka)
• Online lookups from DynamoDB at <15ms p99
• Point-in-time-correct training datasets

Same features, both paths. Skew gone. And new features became reusable across models instead of re-built every time.

Feature stores feel like overhead — until the first time skew silently tanks a model in prod.

Details on my site 👇

#MLOps #DataEngineering #AWS #MachineLearning #Kafka

---

## Post 4 — Multi-Region DR

Your disaster recovery plan is a guess until you've actually failed over.

Most "DR plans" I've seen are a wiki page nobody has tested. Real RTO and RPO? Unknown.

So I built — and proved — automated multi-region failover:
• Aurora Global Database (sub-second cross-region replication)
• Route 53 health checks flipping traffic automatically
• EKS warm standby in a second region
• Quarterly game-days that force a REAL failover

Validated < 15 min RTO and < 1 min RPO. Not assumed — measured, on a schedule, by the on-call team.

If you haven't run the failover, you don't have a DR plan. You have a hope.

How I tested it 👇

#AWS #SRE #DisasterRecovery #Reliability #DevOps

---

## Post 5 — Zero-Trust Secrets & Policy

Two things I find in almost every cluster audit:
1. Secrets sitting in plaintext manifests
2. Nothing stopping an insecure pod from shipping

I rebuilt the security baseline so both become impossible:
• HashiCorp Vault for dynamic, short-TTL secrets
• External Secrets Operator syncing them into Kubernetes
• IRSA for per-pod least-privilege AWS access
• OPA Gatekeeper blocking :latest images, privileged pods, and missing limits at admission

Zero long-lived secrets. 100% of workloads pass policy. Insecure deploys fail BEFORE they reach the cluster.

Security works best as a guardrail, not a gate you ask permission at.

Breakdown on my portfolio 👇

#Kubernetes #Security #DevSecOps #AWS #Vault

---

## Post 6 — Karpenter Cost Optimization

Cluster Autoscaler kept my nodes half-empty and my teams had no idea what their workloads cost.

I fixed both:
• Swapped Cluster Autoscaler for Karpenter → tight bin-packing + Spot consolidation
• Spot-first with On-Demand fallback and graceful interruption handling
• Kubecost for per-namespace chargeback

~45% lower EKS compute cost. Same latency. 70% of stateless workloads on Spot.

The chargeback piece mattered more than the autoscaler. Once teams could SEE their spend, they right-sized themselves.

Make cost visible and people optimize without being asked.

Numbers + setup on my site 👇

#FinOps #Kubernetes #AWS #CostOptimization #Karpenter

---

## Post 7 — Internal Developer Platform (Backstage)

Spinning up a new service used to take days: copy-paste a repo, file tickets for infra, wire up CI, hope you didn't miss a security default.

I replaced all of it with an Internal Developer Platform:
• Backstage templates scaffold repo + pipeline + infra in one flow
• Crossplane provisions RDS / S3 / IAM as Kubernetes resources
• Security and observability defaults baked into every template

New service: from template to production in minutes. No tickets.

The point of a platform isn't to add abstraction — it's to make the secure, observable path the EASIEST path.

How I built the golden paths 👇

#PlatformEngineering #DevEx #Kubernetes #Backstage #DevOps

---

## Post 8 — Serverless Data Lakehouse

We were paying for an analytics cluster 24/7 to serve workloads that ran in bursts.

I re-architected it to fully serverless:
• Kinesis streams → S3 lakehouse (bronze/silver/gold)
• Lambda + Step Functions for transforms
• Glue catalog → Athena for SQL
• Parquet + partitioning for speed and cost

Idle compute cost: $0 (scales to zero). Query cost: ~60% lower. Data queryable within minutes of landing.

Serverless isn't always cheaper — but for bursty, event-driven analytics, paying only when data moves is hard to beat.

Architecture on my portfolio 👇

#AWS #Serverless #DataEngineering #Lambda #Athena

---

## Post 9 — Progressive Delivery (Argo Rollouts + Istio)

Blue-green is safe to roll back — but a bad release still hits 100% of users for a moment.

I wanted releases that limit the blast radius AND roll themselves back. So:
• Argo Rollouts for weighted canaries (5–10% steps)
• Istio shifting traffic gradually
• An analysis step querying Prometheus for error rate + latency SLOs
• Auto-abort the moment the error budget burns too fast

No human in the loop for the rollback. The release decides for itself.

Automated analysis is what turns "canary deployment" from a buzzword into an actual safety net.

Setup on my site 👇

#Kubernetes #DevOps #CICD #SRE #ArgoCD

---

## Post 10 — Compliance-as-Code (SOC 2)

Audit season used to mean weeks of gathering screenshots, and misconfigs were caught only AFTER they deployed.

I made compliance generate its own evidence:
• Checkov + OPA/Conftest scanning Terraform pre-merge (build fails on violations)
• AWS Config + Security Hub for continuous control monitoring
• Auto-remediation Lambdas fixing common drift
• Evidence snapshots collected to S3 on a schedule

Non-compliant infra is blocked before merge. Controls are monitored continuously, not once a year. Audit prep went from weeks to days.

Compliance shouldn't be a fire drill. It should be a dashboard.

How I automated it 👇

#DevSecOps #Compliance #AWS #SOC2 #CloudSecurity

---

### Posting tips
- Lead with the hook on its own line — that's all that shows before "see more".
- Drop the portfolio link in the **first comment**, not the body (LinkedIn suppresses reach on posts with outbound links in the body). Reference it with "link in comments 👇".
- 3–5 hashtags max; more looks spammy.
- Reply to every comment in the first hour — early engagement drives the algorithm.
