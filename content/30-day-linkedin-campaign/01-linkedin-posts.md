# 30 LinkedIn Posts — One Per Day
> Voice: punchy hook → context → what I did → lesson → CTA. Real numbers only — defend them on a call.
> Portfolio: https://venkatesh-sethumurugan-portfolio.vercel.app/
> Best windows (IST + US tech): Tue–Thu, 8–10am or 7–9pm IST. Reply to every comment in the first 60–90 min.
> Swap any bracketed [detail] for your specifics before posting.

---

## Day 1 — Intro / Open to work (P7 · Availability)

4 years ago I was patching Linux servers by hand at 2am.

Last year I cut an AWS bill by $8,000/month and kept a platform at 99.95% uptime.

Here's what I actually do as a Senior DevOps Engineer:

• Design AWS platforms — multi-account Landing Zones, VPCs, the boring foundations that don't page you at 3am
• Run production Kubernetes (EKS) — 20+ microservices, zero-downtime releases
• Automate everything in Terraform + GitOps — so environments come up in a day, not a week
• Keep the lights on — Prometheus, Grafana, PagerDuty, and runbooks people actually use

I'm opening up to **remote roles, contracts, and freelance projects** over the next month.

So I'm going to do something useful with it: post one real lesson a day for 30 days — incidents I've debugged, money I've saved, things I got wrong.

If you're scaling on AWS or Kubernetes and infra is starting to hurt, follow along. And if you're hiring — let's talk.

Everything I've built is here 👇
https://venkatesh-sethumurugan-portfolio.vercel.app/

#DevOps #AWS #Kubernetes #OpenToWork #CloudEngineering

---

Four years ago, I was patching Linux servers by hand at 2 a.m., hoping nothing broke before sunrise.

Last year, I helped reduce an AWS bill by **$8,000/month** while keeping a production platform at **99.95% uptime**.

Today, as a Senior DevOps Engineer, I focus on building infrastructure that's reliable, scalable, and boring—in the best possible way.

• Design AWS landing zones and multi-account platforms that scale
• Run production Kubernetes (EKS) with 20+ microservices and zero-downtime deployments
• Automate infrastructure using Terraform and GitOps
• Build observability with Prometheus, Grafana, PagerDuty, and runbooks teams actually use

I'm opening up to **remote roles, contract work, and freelance projects** over the next month.

Rather than just updating my profile, I'm going to share something useful.

For the next 30 days, I'll post one real lesson every day:

* Production incidents I've debugged
* AWS cost optimizations that saved real money
* Kubernetes lessons learned
* Mistakes I've made—and what they taught me

If you're working on AWS or Kubernetes and infrastructure is becoming a bottleneck, follow along.

And if you're hiring or need help with your cloud platform, I'd love to connect.

Portfolio 👇
https://venkatesh-sethumurugan-portfolio.vercel.app/

#DevOps #AWS #Kubernetes #CloudEngineering #PlatformEngineering #OpenToWork



---

## Day 2 — The $8k/month cut (P5 · Mini case study)

I cut an AWS bill by $8,000 a month — 32% — without deleting a single workload.

No magic. Three boring levers most teams skip:

1. **Spot, properly.** Moved batch and stateless workloads to Spot with proper interruption handling. The fear is overblown when the workload is designed for it.

2. **Savings Plans over On-Demand.** We were paying retail for baseline compute that never turned off. Committing to the steady-state floor alone was most of the saving.

3. **Right-sizing.** Half the fleet was provisioned for a load test from 2022. CloudWatch told the real story — we just hadn't looked.

The lesson: cloud cost isn't a pricing problem, it's a **visibility problem**. You can't cut what you can't see. We started with a 1-week audit across 4 accounts before touching anything.

What's the biggest cost leak you've found in an AWS account?

Full FinOps teardown on my site 👇

#AWS #FinOps #CloudCost #DevOps #CostOptimization

---

## Day 3 — The OOMKilled mystery (P2 · War story)

A pod kept dying. `OOMKilled`. But the app's memory looked fine in Grafana.

We chased it for a day. The app wasn't leaking. So what was eating the memory?

The answer: we'd set a memory **request** of 256Mi and no **limit**. Under load the JVM happily grew past it, the node got memory pressure, and the kubelet evicted the biggest offender. Our pod.

The fix was three lines of YAML:

• Set a realistic memory **limit** (not just a request)
• Match the JVM heap to it (`-XX:MaxRAMPercentage`)
• Add a `LimitRange` so no one forgets again

Zero OOMKills since.

The lesson: in Kubernetes, **requests get you scheduled — limits keep you alive.** A pod with no limit isn't "unlimited," it's "first to be killed."

What's the most time you've ever lost to a Kubernetes resource config?

#Kubernetes #EKS #DevOps #SRE #Troubleshooting

---

## Day 4 — The Terraform module that saved 6 days (P3 · How-to)

Spinning up a new environment used to take us a week. Now it takes a day.

The difference wasn't more people. It was one well-built Terraform module.

Here's what made it reusable instead of copy-paste:

• **One module, many environments.** dev/stg/uat/prod are the same code with different `tfvars` — not four diverging copies.
• **Sane defaults, few required inputs.** A new env needs ~5 variables, not 50.
• **Outputs that chain.** The network module outputs feed the EKS module — no hardcoded IDs anywhere.
• **A remote state backend with locking** (S3 + DynamoDB) so two people can't corrupt state.

65% faster provisioning, and — more importantly — **zero config drift**, because there's only one source of truth.

The lesson: the value of IaC isn't writing it once. It's that the 50th environment is as clean as the first.

How is your Terraform structured — one big repo, or modules?

Module patterns on my portfolio 👇

#Terraform #IaC #DevOps #AWS #Automation

---

## Day 5 — The 3am page that taught me about MTTR (P4 · War story)

The page came at 3:11am. Checkout was down. Revenue was bleeding.

It took us 90 minutes to find it that night. A year later, the same class of incident takes under 10. Here's what changed — and none of it was "try harder."

What we fixed:

• **Centralized everything.** Logs were in 5 places. We pulled them into Loki + ELK with one query surface.
• **Alerts that point at a cause,** not just "CPU high." Each alert links to a runbook.
• **Dashboards built for 3am-you,** not for demos. RED metrics (Rate, Errors, Duration) front and center.
• **Blameless postmortems** that actually changed something.

Result: MTTR down 50%.

The lesson: you don't reduce MTTR by being a hero at 3am. You reduce it by making the system **easy to understand when you're half asleep.**

What's the first thing you check when you get paged?

#SRE #DevOps #IncidentResponse #Observability #Reliability

---

## Day 6 — The multi-account Landing Zone (P1 · Teardown)

"Why not just put everything in one AWS account?"

Because the day someone's dev IAM mistake touches prod data, you'll wish you hadn't.

Here's the multi-account Landing Zone I built, and why each piece exists:

• **Separate accounts per environment** (dev/stg/uat/prod) — a blast radius wall. A mistake in dev can't reach prod.
• **Transit Gateway** for shared networking — accounts talk through one hub, not a mesh of peering you can't reason about.
• **Centralized CloudTrail** into a locked logging account — auditors and incident responders get one source of truth.
• **Service Control Policies** — guardrails that make dangerous actions *impossible*, not just "against policy."

Built as reusable Terraform, so a new account is provisioned in hours, not weeks.

The lesson: account structure is a security control. You're not separating for tidiness — you're separating so a bad day stays a small day.

One account or many in your setup? Curious where people land.

Architecture write-up 👇

#AWS #CloudArchitecture #Terraform #Security #DevOps

---

## Day 7 — Cluster Autoscaler vs Karpenter (P2 · X vs Y)

My EKS nodes were half-empty and my bill didn't care.

Cluster Autoscaler was doing its job — it just does a limited job. Switching the node layer to Karpenter changed the economics.

The honest comparison:

**Cluster Autoscaler** — scales fixed node groups you defined up front. Simple, predictable, but you're stuck with the instance types and sizes you pre-chose. Bin-packing is mediocre.

**Karpenter** — looks at the *pending pods* and provisions the cheapest node that fits, right now. Mixes instance types and Spot automatically. Consolidates underused nodes.

For us: tighter bin-packing, more Spot, and a noticeably lower compute bill — without me babysitting node groups.

The lesson: Cluster Autoscaler scales the boxes you picked. Karpenter picks the boxes. If your workloads are diverse, that difference is real money.

Which are you running — and would you switch?

#Kubernetes #Karpenter #EKS #FinOps #DevOps

---

## Day 8 — 7 things I find in almost every cluster audit (P6 · Checklist)

I've reviewed a lot of Kubernetes clusters. The same 7 issues show up almost every time:

1. **Secrets in plaintext manifests** — sitting in Git, base64 ≠ encryption.
2. **No resource limits** — one noisy pod can starve a node.
3. **`:latest` image tags** — you have no idea what's actually running.
4. **Privileged pods** nobody remembers approving.
5. **No NetworkPolicies** — every pod can talk to every other pod.
6. **Cluster-admin handed out** like candy.
7. **No PodDisruptionBudgets** — so a routine node drain takes down your service.

The good news: every one is preventable at **admission time** with OPA Gatekeeper or Kyverno. Insecure config fails *before* it reaches the cluster.

The lesson: security that depends on people remembering doesn't scale. Security that's a guardrail does.

How many of these 7 are in your cluster right now? Be honest 😅

Full hardening checklist on my site 👇

#Kubernetes #DevSecOps #Security #DevOps #PlatformEngineering

---

## Day 9 — We deployed to prod by hand. Then ArgoCD. (P3 · Mistake → lesson)

For too long, our "deployment process" was someone running `kubectl apply` from their laptop.

It worked — until the day it didn't. Different person, slightly different manifest, no record of what changed. A 45-minute rollback while everyone guessed.

We moved to GitOps with ArgoCD. The shift:

• **Git is the only source of truth.** What's in the repo *is* what's in the cluster.
• **Deploys are pull, not push.** ArgoCD reconciles — no one needs cluster credentials on their laptop.
• **Every change is a PR** — reviewed, logged, revertible with one click.
• Rollback went from 45 minutes to **under 5**.

The lesson: "it works" and "it's safe" are different claims. Manual deploys can work for years and still be one bad afternoon away from an outage. GitOps makes the safe path the easy path.

Push-based or pull-based deploys for you?

#GitOps #ArgoCD #Kubernetes #DevOps #CICD

---

## Day 10 — Alerts people don't ignore (P4 · How-to)

If your team mutes the alerts channel, you don't have monitoring. You have noise.

We had 200+ alerts firing a week. Nobody trusted any of them. Here's how we got to a handful that people actually act on:

• **Alert on symptoms, not causes.** "Checkout error rate > 2%" matters. "CPU 80%" usually doesn't.
• **Every alert is actionable.** If there's nothing to *do*, it's a dashboard, not an alert.
• **Page on user impact only.** Everything else goes to a ticket, not your phone.
• **Each alert links to a runbook** — what it means, what to check, how to fix.

We cut alert volume by ~80% and *increased* trust. When it fires now, people move.

The lesson: more alerts make you *less* safe, not more. Every false page erodes the response to the real one.

What's your worst "boy who cried wolf" alert?

#SRE #Observability #DevOps #Monitoring #Prometheus

---

## Day 11 — "Spot instances are too risky for production" (P5 · Myth-buster)

I hear this constantly. It's mostly fear, not math.

The myth: Spot can be reclaimed any moment, so it's unsafe for prod.
The reality: Spot can be reclaimed with a **2-minute warning**, and most modern workloads can handle that gracefully if you design for it.

What actually makes Spot safe in production:

• **Use it where interruption is survivable** — stateless services, batch, CI runners, async workers.
• **Spread across instance types and AZs** so one capacity pool draining doesn't take you out.
• **Drain on the 2-minute notice** — Karpenter / node termination handlers do this for you.
• **Keep a small On-Demand or Savings Plan floor** for the workloads that truly can't blink.

Done right, Spot is a big chunk of how I've cut bills 30%+.

The lesson: "risky" usually means "I haven't designed for the failure mode." Spot interruption is a *known, announced* event — that's the easiest kind to handle.

Would you run Spot in prod? Why or why not?

#AWS #FinOps #Spot #DevOps #CostOptimization

---

## Day 12 — The NAT Gateway bill nobody expected (P1 · War story)

A client's AWS bill jumped. No new services, no traffic spike. Just… more money.

The culprit? **NAT Gateway data processing charges.**

Here's what happened: dozens of private-subnet workloads were pulling container images and hitting S3 *through the NAT Gateway* — paying per-GB processing on traffic that never needed to leave AWS.

The fix was almost free:

• **VPC Gateway Endpoints** for S3 and DynamoDB — traffic stays on the AWS backbone, no NAT, no charge.
• **Interface Endpoints** for ECR, so image pulls skip the NAT too.
• Right-sized the number of NAT Gateways per AZ to actual need.

The line item dropped hard.

The lesson: in AWS, the expensive thing is often the **path your traffic takes**, not the service you think you're paying for. Read the bill by line item — the surprise is always in the boring rows.

What's the most surprising line you've found on an AWS bill?

#AWS #FinOps #CloudCost #Networking #DevOps

---

## Day 13 — Zero-downtime releases on EKS (P2 · Teardown)

We used to take a maintenance window to deploy. Customers noticed. Now we ship in the middle of the day and nobody feels it.

Here's the blue-green setup on EKS that made releases boring:

• **Two identical environments** — blue (live) and green (new). Traffic only flows to one.
• **Deploy to green, test it for real** — same data path, same config, no traffic yet.
• **Flip traffic at the load balancer** — instant cutover, instant rollback if anything looks wrong.
• **ArgoCD drives the whole thing** from Git, so the process is identical every time.

Rollback went from 45 minutes of panic to a 5-minute traffic flip.

The lesson: zero-downtime isn't about deploying *carefully*. It's about being able to **undo instantly**. Once rollback is trivial, deploying stops being scary.

Blue-green or canary in your shop? Both have their place — curious what you run.

Full walkthrough on my site 👇

#Kubernetes #EKS #DevOps #CICD #ArgoCD

---

## Day 14 — From 2-week releases to 3 days (P3 · How-to)

A team I joined shipped every two weeks, and dreaded each one. We got it to 3 days, and the dread went away too.

What we changed in the pipeline:

• **Killed the manual gates.** Most "approvals" were just someone clicking a button — automated checks replaced them.
• **Parallelized the slow stages.** Tests, builds, and scans ran together, not in a queue.
• **Security shifted left** — SonarCloud + Snyk run in the PR, not in a separate review week.
• **One-button deploy** via the pipeline, not a 12-step runbook.

Release cycle: 2 weeks → 3 days. 85% faster. Defects went *down*, not up, because smaller changes are easier to reason about.

The lesson: slow releases aren't a discipline problem, they're a **batch-size problem**. Ship smaller, more often, and risk drops with it.

What's the slowest stage in your pipeline right now?

#CICD #DevOps #GitHubActions #Automation #GitOps

---

## Day 15 — What I'd fix in your first week (P7 · Availability)

Whenever I join a team or start a contract, I don't touch anything for the first few days. I just look. Here's what I'm looking *for*:

• **Where does the money leak?** Usually idle resources, NAT charges, On-Demand for steady load.
• **What pages people at night, and why?** The recurring incidents reveal the missing guardrail.
• **How long from commit to production?** And how much of that is a human waiting on another human.
• **What's only in one person's head?** That's your real risk — and your fastest win is a runbook.

I've done this enough times that the first-week findings are usually worth more than the first month of building.

I'm open to **remote roles, contracts, and freelance work** right now. If your infra is starting to hurt — cost, reliability, or slow deploys — I'm happy to be a second pair of eyes, no strings.

What's the one thing a new DevOps hire should fix first?

Portfolio + how to reach me 👇
https://venkatesh-sethumurugan-portfolio.vercel.app/

#DevOps #AWS #Kubernetes #OpenToWork #Freelance

---

## Day 16 — The failover that wasn't tested (P4 · War story)

"We have Multi-AZ, we're fine."

Then the primary RDS instance had a problem, the failover kicked in… and the app stayed down anyway. Multi-AZ worked. The *application* didn't reconnect.

What we found:

• The app cached the DB endpoint's IP and never re-resolved DNS after failover.
• Connection pools held dead connections for minutes.
• Nobody had ever *triggered* a failover to watch what happened.

The fixes: shorter DNS TTL handling, connection validation in the pool, and — the big one — a **scheduled game-day** where we force a failover on purpose every quarter.

The lesson: a DR feature you've never triggered is a **hope, not a plan**. Multi-AZ failing over is the easy half. Your app surviving it is the half nobody tests.

Have you actually triggered a failover in prod? Or is it still theory?

#SRE #AWS #RDS #Reliability #DisasterRecovery

---

## Day 17 — The IAM policy that was just `*` (P6 · Mistake → lesson)

I opened an IAM policy during an audit and found this: `"Action": "*", "Resource": "*"`.

Attached to a service that needed to read one S3 bucket.

It's the most common security finding there is, and the reason is human, not technical: **least-privilege is annoying to build, and `*` always works.** So under deadline, `*` wins.

How I make least-privilege the easy path:

• **Start from deny, add what breaks.** Run with minimal perms, read the AccessDenied errors, grant exactly those.
• **Use IAM Access Analyzer** to generate policies from real CloudTrail usage.
• **Per-pod roles via IRSA** on EKS — no shared node-level credentials.
• **Short-lived credentials over long-lived keys**, always.

Result on the last audit: zero critical findings.

The lesson: `*` isn't a permission, it's a postponed incident. The cost of least-privilege is paid once, up front. The cost of `*` is paid at the worst possible time.

What's your approach — generate policies, or hand-write them?

#AWS #IAM #DevSecOps #Security #CloudSecurity

---

## Day 18 — VPC design mistakes I keep seeing (P1 · Checklist)

Most AWS networking pain traces back to decisions made in the first hour of building the VPC. Five I see constantly:

1. **CIDR too small.** /24 felt fine until you needed a second EKS cluster. Plan for 10x.
2. **Workloads in public subnets** because it was "easier." Databases facing the internet is never easier later.
3. **One AZ.** Cheaper today, an outage tomorrow. Spread across at least two.
4. **No VPC endpoints** — so S3/ECR traffic pays the NAT tax (see Day 12).
5. **Overlapping CIDRs across accounts** — which makes peering and Transit Gateway a nightmare.

None of these are hard to get right. They're just hard to *fix* once everything's running inside them.

The lesson: the network is the foundation. You can refactor an app in an afternoon — you can't easily re-IP a running platform.

Which of these have you had to untangle?

VPC patterns in my Landing Zone write-up 👇

#AWS #Networking #CloudArchitecture #VPC #DevOps

---

## Day 19 — "Kubernetes is overkill" (P2 · Myth-buster)

Sometimes it is. I'll say that as someone who runs it for a living.

The myth is usually stated as an absolute — "you don't need Kubernetes." But it's a trade, not a verdict.

**Kubernetes is probably overkill if:**
• You have 1–3 services and they rarely change.
• You have no one who wants to own a cluster.
• ECS Fargate or even a couple of well-managed VMs would do.

**Kubernetes earns its complexity when:**
• You have many services with different scaling needs.
• You want one consistent deploy/observe/scale model across all of them.
• Portability across environments or clouds actually matters to you.

I've run 20+ microservices on EKS where it clearly paid off. I've also told people to *not* adopt it.

The lesson: the right question isn't "is Kubernetes good." It's "is my problem big enough to be worth its complexity *budget*." Complexity you don't need is just risk.

Where's your line — when does K8s become worth it?

#Kubernetes #EKS #DevOps #PlatformEngineering #CloudArchitecture

---

## Day 20 — Terraform modules that actually scale (P3 · Teardown)

Most Terraform doesn't fail because of bad syntax. It fails because it grows into a tangle nobody wants to touch.

Here's how I structure it so the 50th change is as safe as the first:

• **Root configs are thin.** They wire modules together and pass variables — no resources defined directly.
• **Modules are small and single-purpose** — network, eks, rds, iam. Each does one thing well.
• **Versioned modules** so a change to `vpc` doesn't silently break every environment at once.
• **Remote state per environment**, with locking, and **`terraform plan` in CI on every PR** so you see the blast radius before merge.

This is what took provisioning from a week to a day and killed config drift.

The lesson: IaC scales on **structure**, not cleverness. Boring, small, composable modules beat one heroic 2000-line file every time.

Monorepo or multi-repo for your Terraform? Genuinely split on this one.

Module structure on my site 👇

#Terraform #IaC #DevOps #AWS #PlatformEngineering

---

## Day 21 — Right-sizing without breaking prod (P5 · Mini case study)

The scariest part of cost optimization isn't finding waste. It's cutting it without causing an incident.

Here's how I right-size production safely:

• **Measure before you touch.** Pull 2–4 weeks of CloudWatch — p95 and p99, not averages. Averages hide the spikes that matter.
• **Cut in steps, not leaps.** Drop one instance size, watch for a few days, repeat. Never halve capacity in one move.
• **Right-size on the real constraint.** Some workloads are memory-bound, some CPU-bound — sizing on the wrong one causes the outage you were trying to avoid.
• **Keep headroom for the spike** you saw in the p99, not the average day.

This, plus Spot and Savings Plans, is how the $8k/month came out — with zero reliability regressions.

The lesson: right-sizing is a **reliability exercise that happens to save money.** Do it on data, in small steps, and prod never notices.

How do you right-size — gut feel, or the metrics?

#FinOps #AWS #CloudCost #SRE #DevOps

---

## Day 22 — The 4 signals that actually matter (P4 · How-to)

Drowning in dashboards but still surprised by outages? You're probably watching the wrong things.

Google's SRE book nailed it with the **Four Golden Signals**. Here's how I actually use them:

1. **Latency** — how long requests take. Split success vs error latency; a fast 500 is still a 500.
2. **Traffic** — how much demand. Your baseline for "is this normal?"
3. **Errors** — rate of failed requests. The most direct signal of user pain.
4. **Saturation** — how full your system is. The leading indicator of the *next* outage.

Get these four right per service and you can delete half your dashboards.

The lesson: observability isn't about collecting more — it's about watching the **few signals that predict user pain.** Everything else is for debugging, not alerting.

Logs, metrics, or traces — which do you reach for first in an incident?

#SRE #Observability #Prometheus #Grafana #DevOps

---

## Day 23 — The Transit Gateway routing loop (P1 · War story)

Traffic between two accounts just… vanished. No errors. Packets left, never arrived.

This is the kind of AWS networking bug that humbles you, because there's nothing in the application logs to find.

What it was: a **Transit Gateway route table** sending a CIDR back toward the attachment it came from — a loop. Combined with overlapping route propagation, packets went in circles until TTL killed them.

How I found it:

• **VPC Flow Logs** showed traffic leaving but never landing.
• **TGW route tables**, read carefully, showed the conflicting routes.
• Fix: explicit, non-overlapping route tables per attachment, with propagation turned off where I wanted control.

The lesson: cloud networking fails *silently*. When the app logs are clean but traffic is gone, stop reading app logs — go straight to **flow logs and route tables.**

What's the hardest networking bug you've chased?

#AWS #Networking #CloudArchitecture #DevOps #Troubleshooting

---

## Day 24 — HPA done right (P2 · How-to)

Autoscaling that scales on the wrong metric is worse than no autoscaling — it reacts late and thrashes.

The default Horizontal Pod Autoscaler scales on CPU. For a lot of workloads, CPU is the wrong signal. Here's how I set it up:

• **Scale on the metric that reflects load.** For a queue worker, that's queue depth (via KEDA), not CPU. For an API, often it's requests-per-pod.
• **Set sane min/max** so you don't scale to zero under a blip or to infinity under a bad deploy.
• **Tune the stabilization window** so it doesn't flap up and down every 30 seconds.
• **Make sure nodes can keep up** — HPA adds pods, but Karpenter/Cluster Autoscaler has to add nodes for them.

Get it right and the platform absorbs spikes while you sleep.

The lesson: autoscaling is only as good as the **signal you scale on.** CPU is the default, not the answer.

What do you scale your workloads on — CPU, or something smarter?

#Kubernetes #EKS #KEDA #SRE #DevOps

---

## Day 25 — The secrets management ladder (P6 · Checklist)

Where your secrets live says a lot about how much a breach will hurt. Here's the ladder, worst to best:

1. **Hardcoded in code / committed to Git** — the floor. Assume already leaked.
2. **In CI/CD env vars** — better, but still long-lived and widely readable.
3. **In a managed store** (AWS Secrets Manager / SSM) — encrypted, access-controlled, audited.
4. **Dynamic, short-TTL secrets** (Vault) — generated on demand, expire fast, nothing long-lived to steal.

Where I aim teams: managed store at minimum, dynamic for the sensitive stuff, synced into Kubernetes via the External Secrets Operator so nothing sits in a manifest.

The lesson: you can't prevent every leak — so **shrink what a leak is worth.** A short-lived credential that's already expired is a non-event.

What's your team on — env vars, a managed store, or full dynamic secrets?

Secrets baseline on my site 👇

#DevSecOps #Security #AWS #Kubernetes #Vault

---

## Day 26 — The drift that broke prod (P3 · War story)

Prod broke after a deploy that changed *nothing relevant*. The diff was tiny. So why did it blow up?

Because the cluster no longer matched the code. Someone had hotfixed a config live, weeks earlier, and never put it back in Git. Our "source of truth" was lying.

That's **configuration drift** — and it's silent until the moment it isn't.

How I kill drift:

• **GitOps with ArgoCD** — it continuously reconciles. Drift gets reverted automatically, or flagged loudly.
• **`terraform plan` in CI** — any out-of-band change shows up as an unexpected diff before you merge.
• **No console changes in prod.** If it's not in Git, it doesn't exist. Break-glass access is logged and rare.

The lesson: drift isn't a one-time bug, it's **entropy.** Without something actively pulling the system back to the declared state, every environment slowly becomes a snowflake.

How do you catch drift today — or do you find out the hard way?

#GitOps #ArgoCD #Terraform #DevOps #SRE

---

## Day 27 — The runbook that cut onboarding by 3 weeks (P4 · Teardown)

New engineers used to take over a month to be useful. Not because they were slow — because the knowledge lived in three people's heads.

I wrote 30+ runbooks. Onboarding dropped by 3 weeks. Here's what makes a runbook people *actually use*:

• **It answers "what do I do RIGHT NOW,"** not "how does this system work." Theory goes elsewhere.
• **Copy-paste commands,** with the expected output shown. No "you should know this part."
• **Written for the tired on-call engineer at 3am,** not for a code review.
• **Linked directly from the alert** that triggers it — found in 2 seconds, not searched for in panic.
• **Updated after every incident** that revealed a gap.

The lesson: documentation isn't a chore you do at the end. It's a **force multiplier** — it turns one person's hard-won knowledge into the whole team's baseline.

Do your runbooks get used in real incidents, or just written and forgotten?

#SRE #DevOps #Documentation #IncidentResponse #PlatformEngineering

---

## Day 28 — ECS vs EKS, the honest take (P2 · X vs Y)

Everyone wants Kubernetes on the résumé. That doesn't mean every team should run it. Here's how I actually choose between ECS and EKS:

**Pick ECS (especially Fargate) when:**
• You want containers without operating a control plane.
• Your team is small and doesn't want to own cluster upgrades, CNI, add-ons.
• AWS-native is fine — you're not chasing portability.

**Pick EKS when:**
• You need the Kubernetes ecosystem — Helm, operators, ArgoCD, custom controllers.
• You're running many services with complex scaling and scheduling needs.
• Portability or a multi-cloud story actually matters.

I run both. EKS for the 20+ microservice platform; ECS where simplicity wins.

The lesson: the best container platform is the **least one that solves your problem.** EKS is more powerful *and* more to operate — that's a cost, not just a feature.

ECS or EKS in your stack — and would you choose the same again?

#AWS #Kubernetes #ECS #EKS #DevOps

---

## Day 29 — How 99.95% uptime actually happens (P1 · Mini case study)

99.95% uptime sounds like luck or heroics. It's neither. It's a set of boring mechanisms doing their job:

• **Multi-AZ everything** — EKS nodes, RDS, load balancers spread across zones. One AZ blinking is a non-event.
• **Automated failover** that's *tested* — RDS failover, health-check-driven traffic shifting (see Day 16, the hard way).
• **HPA + Karpenter** absorbing load spikes before they become errors.
• **Blue-green deploys** so releases never cause downtime.
• **Observability that catches the slow burn** before it becomes an outage.

99.95% is about 4 hours of downtime a year. You don't earn it by reacting fast — you earn it by **removing the single points of failure** that cause outages in the first place.

The lesson: reliability is designed in, not bolted on. Every "nine" you add is a SPOF you removed.

What uptime does your product actually promise — and do you hit it?

Reliability patterns on my site 👇

#SRE #AWS #Reliability #Kubernetes #DevOps

---

## Day 30 — 30 days, what I learned, and a clear ask (P7 · Availability)

30 posts ago I said I'd share one real lesson a day. Here's what 30 days of posting taught me:

• **Specific beats clever.** The posts with a real number — $8k saved, 50% MTTR, the OOMKilled bug — landed every time.
• **Problems connect, polish doesn't.** People don't want my highlight reel. They want the 3am page and how I got out of it.
• **Showing up daily compounds.** Slowly, then noticeably.

If you've followed along: thank you. You've watched me debug failovers, cut cloud bills, harden clusters, and admit what I got wrong.

Now the clear ask. I'm a **Senior DevOps Engineer** open to **remote roles, contracts, and freelance projects** — AWS, Kubernetes, Terraform, CI/CD, observability, cost.

If your infra is hurting — or you know someone hiring — let's talk. A 15-minute call costs you nothing and I'll tell you exactly what I'd look at first.

Everything I've built, and how to reach me 👇
https://venkatesh-sethumurugan-portfolio.vercel.app/

Where's the best place to find good contract DevOps work these days? Genuinely asking 👇

#DevOps #AWS #Kubernetes #OpenToWork #Freelance

---

*30 posts complete. Pair each with the matching poll in `02-linkedin-polls.md`. Track performance in the Excel calendar.*
