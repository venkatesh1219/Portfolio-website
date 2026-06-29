# 30 LinkedIn Polls — One Per Day
> LinkedIn polls allow a question (≤140 chars) + up to **4 options** (≤30 chars each) + a duration (1d/3d/1w/2w).
> Run each poll a few hours after that day's post. **Pin the "seed comment"** immediately — that's where the reach comes from.
> Tip: take a side in the seed comment. Neutral polls get votes; opinionated ones get debate.

---

## Day 1 — (P7) Hiring
**Q:** What's the hardest DevOps skill to actually hire for?
- AWS architecture depth
- Real Kubernetes ops
- Incident / on-call instincts
- Cost / FinOps sense

**Seed comment:** For me it's #3 — anyone can list tools, but staying calm and systematic at 3am is rare and you can't fake it. What's been hardest for *you* to hire?

---

## Day 2 — (P5) FinOps
**Q:** Where's the biggest hidden cost leak in most AWS accounts?
- Idle / oversized instances
- NAT Gateway data charges
- Unattached EBS / old snapshots
- On-Demand for steady load

**Seed comment:** I've seen all four, but oversized instances win most often — half a fleet sized for a 2022 load test. What's the worst you've personally found?

---

## Day 3 — (P2) Kubernetes
**Q:** Kubernetes pod gets OOMKilled. First thing you blame?
- Missing memory limits
- An actual memory leak
- JVM heap not capped
- Node memory pressure

**Seed comment:** 9 times out of 10 it's the limits/heap mismatch, not a real leak. The app gets blamed for an infra config. Which bites you most?

---

## Day 4 — (P3) Terraform
**Q:** Best place to store Terraform state?
- S3 + DynamoDB lock
- Terraform Cloud
- Local (don't @ me)
- Git (please no)

**Seed comment:** S3 + DynamoDB is my default for AWS shops — cheap, locked, audited. But Terraform Cloud's collaboration is tempting. What are you running, and why?

---

## Day 5 — (P4) Incidents
**Q:** Production is down. The very first thing you check?
- Recent deploys / changes
- Dashboards / golden signals
- Logs
- Is it DNS? (it's DNS)

**Seed comment:** "What changed?" almost always gets me there fastest — most incidents are self-inflicted by a recent change. What's your reflex first move?

---

## Day 6 — (P1) AWS accounts
**Q:** How should a growing startup structure AWS accounts?
- One account, tag everything
- Account per environment
- Account per team/service
- Full Landing Zone / Org

**Seed comment:** I lean account-per-environment early, growing into a full Org. One account feels simpler until a dev mistake reaches prod data. Where do you draw the line?

---

## Day 7 — (P2) Autoscaling
**Q:** EKS node autoscaling — what are you running?
- Karpenter
- Cluster Autoscaler
- Managed node groups only
- Still figuring it out

**Seed comment:** Switched to Karpenter and the bin-packing + Spot mixing paid for itself. But CA is simpler to reason about. Anyone regret switching either way?

---

## Day 8 — (P6) Security
**Q:** Be honest — where do your Kubernetes secrets actually live?
- Sealed/External Secrets
- Vault (dynamic)
- AWS Secrets Manager
- Plaintext in manifests 😬

**Seed comment:** No judgment — I find plaintext manifests in most first audits. The goal isn't perfection, it's shrinking what a leak is worth. Where are you on the ladder?

---

## Day 9 — (P3) Deployments
**Q:** Push-based or pull-based deployments?
- Pull (GitOps / ArgoCD)
- Push (CI runs kubectl/helm)
- Mix of both
- Still manual (it's fine, it's fine)

**Seed comment:** Pull-based won me over — no cluster creds on laptops, Git is truth, rollback is one revert. But push is simpler to start. What's your setup?

---

## Day 10 — (P4) Alerting
**Q:** What's the #1 cause of alert fatigue?
- Alerting on causes, not symptoms
- No runbook attached
- Thresholds set too tight
- Paging on non-urgent stuff

**Seed comment:** For me it's paging on causes ("CPU 80%") instead of symptoms ("checkout failing"). Every false page weakens the real one. What kills trust in your alerts?

---

## Day 11 — (P5) Spot
**Q:** Spot instances in production — yes or no?
- Yes, with proper handling
- Only for batch / CI
- Only non-prod
- Too risky, never

**Seed comment:** Run it in prod for stateless + batch with drain-on-notice and it's a big chunk of my cost savings. "Risky" usually means "not designed for the failure." Convince me otherwise?

---

## Day 12 — (P1) AWS bill
**Q:** Most *surprising* line item you've found on an AWS bill?
- NAT Gateway charges
- Inter-AZ data transfer
- CloudWatch logs ingestion
- Forgotten / orphaned resources

**Seed comment:** Inter-AZ and NAT data transfer are the silent killers — traffic you didn't know you were paying to move. What blindsided you?

---

## Day 13 — (P2) Releases
**Q:** Zero-downtime deploys — your strategy?
- Blue-green
- Canary
- Rolling update
- We take a maintenance window

**Seed comment:** Blue-green for the instant rollback, canary when I want gradual confidence. Both beat a maintenance window. What do you run in prod?

---

## Day 14 — (P3) Pipelines
**Q:** What's the slowest part of your CI/CD pipeline?
- Tests
- Build / image push
- Manual approvals
- Deploy / rollout

**Seed comment:** Manual approvals are usually the hidden tax — a human waiting on another human. Automating those got us from 2 weeks to 3 days. Where's your bottleneck?

---

## Day 15 — (P7) Hiring
**Q:** What makes a great DevOps hire stand out?
- Debugging / problem-solving
- Communication & docs
- Breadth across the stack
- Automation mindset

**Seed comment:** I'd weight debugging highest — tools change, but the instinct to isolate a problem under pressure is the durable skill. What do you look for first?

---

## Day 16 — (P4) DR
**Q:** Have you ever *actually triggered* a failover in production?
- Yes, on a schedule (game-days)
- Yes, once, by accident 😅
- No, but we're "Multi-AZ"
- What's a failover

**Seed comment:** Multi-AZ failing over is the easy half — your app reconnecting is the half nobody tests. A DR plan you've never run is a hope. When did you last prove yours?

---

## Day 17 — (P6) IAM
**Q:** How do you build least-privilege IAM policies?
- Generate from CloudTrail usage
- Start deny, add what breaks
- Hand-write from docs
- `*` and move on 😬

**Seed comment:** Access Analyzer generating policies from real usage changed this for me — least-privilege without the guesswork. How do you avoid the `*` trap?

---

## Day 18 — (P1) Networking
**Q:** Workloads in public vs private subnets — your default?
- Everything private + NAT
- Private + VPC endpoints (no NAT)
- Public for "simple" stuff
- Depends on the workload

**Seed comment:** Private + VPC endpoints is my default — keeps S3/ECR traffic off the NAT bill entirely. Public subnets "for now" always cost more later. Where do you land?

---

## Day 19 — (P2) Kubernetes
**Q:** When is Kubernetes genuinely overkill?
- 1–3 stable services
- Small team, no cluster owner
- ECS/Fargate would do
- It's never overkill 😄

**Seed comment:** I run K8s for a living and still talk teams *out* of it sometimes. Complexity you don't need is just risk. Where's your "not worth it yet" line?

---

## Day 20 — (P3) Terraform
**Q:** Terraform: monorepo or multi-repo?
- Monorepo, all infra
- Repo per environment
- Repo per service/team
- Mix / modules in a registry

**Seed comment:** Genuinely split on this. Monorepo for one source of truth, multi-repo for blast-radius isolation. There's no clean winner — what's worked for you at scale?

---

## Day 21 — (P5) FinOps
**Q:** How do you decide an instance is oversized?
- p95/p99 from CloudWatch
- Average utilization
- Gut feel / it "feels big"
- Cost Explorer recommendations

**Seed comment:** p95/p99, never averages — averages hide the spike that causes the outage when you cut. Right-sizing is a reliability exercise that saves money. What's your signal?

---

## Day 22 — (P4) Observability
**Q:** In an incident, what do you reach for FIRST?
- Metrics / dashboards
- Logs
- Traces
- Recent change history

**Seed comment:** Metrics to localize *where*, then logs/traces for *why*. Leading with raw logs is how you lose 30 minutes. What's your order of operations?

---

## Day 23 — (P1) Networking
**Q:** Hardest thing to debug in AWS?
- Transit Gateway / routing
- IAM permission boundaries
- VPC / security groups
- DNS / Route 53

**Seed comment:** Routing across accounts wins for me — it fails silently, nothing in app logs, straight to flow logs and route tables. What's humbled you most?

---

## Day 24 — (P2) Scaling
**Q:** What do you scale your workloads on?
- CPU (the default)
- Memory
- Custom metric (queue depth, RPS)
- KEDA event-driven

**Seed comment:** CPU is the default, rarely the right answer. Queue workers should scale on queue depth, not CPU. What signal do you actually scale on?

---

## Day 25 — (P6) Secrets
**Q:** Your team's secrets management, honestly?
- Vault (dynamic, short-TTL)
- Cloud-managed (Secrets Manager/SSM)
- CI/CD env vars
- Hardcoded somewhere 😬

**Seed comment:** Cloud-managed at minimum, dynamic for the sensitive stuff. The win isn't preventing every leak — it's making an expired credential worthless. Where are you?

---

## Day 26 — (P3) GitOps
**Q:** How do you catch configuration drift?
- ArgoCD/Flux auto-reconcile
- terraform plan in CI
- Manual audits
- We find out the hard way 😅

**Seed comment:** Without something actively pulling state back to declared, every environment slowly becomes a snowflake. ArgoCD reverting drift automatically is the quiet hero. How do you catch it?

---

## Day 27 — (P4) Docs
**Q:** Do your runbooks actually get used in incidents?
- Yes, linked from alerts
- Sometimes, if we find them
- We have them, nobody opens them
- What runbooks 😬

**Seed comment:** A runbook nobody opens at 3am is just decoration. Linking it straight from the alert is what made mine get used. Honest answers only — where's your team?

---

## Day 28 — (P2) Containers
**Q:** ECS or EKS for a new platform today?
- EKS (need the ecosystem)
- ECS Fargate (keep it simple)
- Depends on team size
- Neither — plain VMs/serverless

**Seed comment:** I run both. EKS where the ecosystem pays off, ECS where simplicity wins. The best platform is the *least* one that solves your problem. What would you pick today?

---

## Day 29 — (P1) Reliability
**Q:** What uptime does your product actually promise?
- 99.9% (~8h/yr down)
- 99.95% (~4h/yr)
- 99.99% (~52m/yr)
- We don't have an SLA

**Seed comment:** Every extra nine is a single-point-of-failure you had to remove, not effort you added. 99.95% is mechanisms, not heroics. What are you actually held to?

---

## Day 30 — (P7) Career
**Q:** Best place to find solid contract / freelance DevOps work?
- LinkedIn / inbound
- Referrals / network
- Job boards (Wellfound, etc.)
- Agencies / consultancies

**Seed comment:** Closing out 30 days of posting with a genuine question — referrals have always been my best channel, but I'm curious what's working for others right now. Where do you find the good contracts?

---

*30 polls complete. Reminder: pin the seed comment within a minute of posting, and reply to every voter comment in the first 90 minutes.*