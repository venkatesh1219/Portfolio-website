# Cold Outreach — Email + LinkedIn DM Sequences
**Sender:** Venkatesh Sethumurugan — Senior Cloud/DevOps Engineer (AWS · EKS · Terraform · CI/CD · Observability · FinOps)
**Goal:** open a conversation that can go either way — **full-time remote role _or_ contract/freelance engagement**
**Portfolio:** https://venkatesh-portfolio-website.vercel.app/

Merge fields: `{{first_name}}`, `{{company}}`, `{{trigger}}`, `{{portfolio_url}}`

> **The one rule that beats every template:** replace `{{trigger}}` with a real, specific reason you're reaching out — a job post, a fundraise, an engineering blog, a "scaling on EKS" comment. A specific opener beats any merge field. Generic = deleted.

> **Guardrail:** these are drafts. Send them yourself, one personalized batch at a time. No bulk-blasting, real reply-to address, honest numbers you can defend on a call.

---
---

# AUDIENCE 1 — Recruiters & Staffing Agencies
*They place people. Make yourself the easiest candidate to place: clear role, clear stack, clear availability, clear proof.*

## Email — Touch 1 (Day 0)
**Subject:** Senior DevOps (AWS/K8s) — remote or contract, available now

```
Hi {{first_name}},

I'm a Senior DevOps Engineer with 4+ years running production AWS + Kubernetes platforms, reaching out in case you're placing for remote or contract DevOps roles.

Quick snapshot so you can match me fast:
• Stack: AWS, EKS, Terraform, GitHub Actions/ArgoCD, Prometheus/Grafana
• Proof: cut an AWS bill $8k/mo (32%), ran platforms at 99.95% uptime, took release cycles from 2 weeks to 3 days
• Open to: remote full-time, contract, or freelance — flexible on engagement type

Portfolio with full project write-ups: {{portfolio_url}}

If you have something that fits — or want my CV on file — happy to send it over.

Thanks,
Venkatesh
```
*Personalize: if they posted a specific role, name it in line 1 and lead with the matching skill.*

## Email — Touch 2 (Day 3–4)
**Subject:** Re: Senior DevOps (AWS/K8s) — remote or contract

```
Hi {{first_name}}, following up with something concrete.

I put my work where it's verifiable — 5 production-grade projects with architecture and code: multi-account AWS Landing Zone, EKS microservices platform, GitOps CI/CD, observability stack, and a cost-optimization teardown.

{{portfolio_url}}

If a client is asking for AWS/Kubernetes/Terraform, I can usually show them exactly that, already built. Want me to send my CV for your roster?
```

## Email — Touch 3 (Day 8, break-up)
**Subject:** Re: Senior DevOps (AWS/K8s)

```
Hi {{first_name}}, I'll close the loop so I'm not crowding your inbox.

If a remote or contract DevOps req comes across your desk — AWS, Kubernetes, Terraform, CI/CD — I'd be glad to be considered. Everything's here whenever it's useful: {{portfolio_url}}

Appreciate your time either way.
Venkatesh
```

## LinkedIn — Connection note (≤300 chars)
```
Hi {{first_name}} — Senior DevOps Engineer (AWS/EKS/Terraform), open to remote or contract roles. Reaching out in case you place for cloud/DevOps. Portfolio in my profile. Would like to connect.
```

## LinkedIn — DM after connect
```
Thanks for connecting, {{first_name}}. Quick context in case it's useful: I'm a Senior DevOps Engineer (AWS, EKS, Terraform, CI/CD, observability), open to remote full-time or contract.

Highlights: $8k/mo AWS savings, 99.95% uptime, 2-week→3-day release cycles. Full proof: {{portfolio_url}}

If you're placing for anything cloud/DevOps, happy to send my CV. No rush.
```

---
---

# AUDIENCE 2 — Startup Founders / CTOs
*They don't care about titles. They care about the cloud bill, uptime, and engineers being pulled off the product. Open on the pain.*

## Email — Touch 1 (Day 0)
**Subject:** {{company}}'s AWS bill / infra — a quick outside read

```
Hi {{first_name}},

Most teams scaling on AWS hit the same wall: cloud costs creep, deploys get fragile, and infra work quietly pulls your engineers off the product.

That's the wall I fix. Recent work: cut an AWS bill by $8k/month (32%), kept platforms at 99.95% uptime, and built GitOps pipelines that took deploys from manual to one-click.

If infra is on your radar at {{company}} — as a hire or a contract project — worth a 15-min call? I'll tell you the first three things I'd look at, free either way.

Portfolio: {{portfolio_url}}
Venkatesh
```
*Personalize: cost-sensitive seed stage → lead with the $8k number. Reliability pain → lead with uptime/GitOps. Hiring a platform engineer → open on the role.*

## Email — Touch 2 (Day 4, proof/mechanism)
**Subject:** Re: {{company}}'s AWS bill / infra

```
{{first_name}} — to make this concrete rather than just a nudge:

The cost leaks I find most on AWS are the same few every time — oversized instances, NAT Gateway data charges, and On-Demand pricing for load that never turns off. The reliability gaps are usually untested failover and manual deploys.

I've packaged how I'd approach a typical AWS/EKS setup — where I'd cut cost first, what I'd harden for reliability, the quickest CI/CD wins. Built from real projects (multi-region DR, Vault secrets baseline, EKS platforms): {{portfolio_url}}

Happy to walk you through it on a 15-min call, or just send it. No pitch — glad to be a second set of eyes.
```

## Email — Touch 3 (Day 9, break-up)
**Subject:** Re: {{company}}'s AWS bill / infra

```
{{first_name}} — I'll stop here so I'm not cluttering your inbox.

If cost, reliability, or slow deploys come up at {{company}} — full-time or a contract sprint — I'd be glad to help. Work's all here: {{portfolio_url}}

Either way, good luck with what you're building.
Venkatesh
```

## LinkedIn — Connection note (≤300 chars)
```
Hi {{first_name}} — I build and run AWS/Kubernetes platforms for engineering teams (EKS, Terraform, CI/CD, cost optimization). Following {{company}}'s work — would like to connect.
```
*Personalize: swap in a real trigger — "Saw {{company}} is hiring its first platform engineer" / "Saw you're scaling on EKS".*

## LinkedIn — DM after connect
```
Thanks for connecting, {{first_name}}.

Reason I reached out: teams scaling on AWS usually hit the same wall — costs creep, deploys get fragile, infra pulls engineers off the product. I fix that for a living.

Examples: ~30–40% off EKS spend with Karpenter + right-sizing, and GitOps pipelines that made deploys push-button.

If platform/infra is on your radar at {{company}} — hire or contract — worth a 15-min call? Happy to share what I'd look at first either way. {{portfolio_url}}
```

---
---

# AUDIENCE 3 — Engineering Managers / Heads of Platform at SaaS companies
*They're hiring for a team. Speak to load off their plate, ramp time, and reliability — and that you mentor, not just build.*

## Email — Touch 1 (Day 0)
**Subject:** Senior DevOps for {{company}} — platform, reliability, and ramp

```
Hi {{first_name}},

Reaching out because I suspect your platform/infra to-do list is longer than your headcount — most are.

I'm a Senior DevOps Engineer who takes that load off: production EKS (20+ microservices), Terraform/GitOps that cut env provisioning from a week to a day, and observability that dropped MTTR 50%. I also mentor — I've cut team onboarding by 3 weeks with runbooks and IaC standards.

Open to a remote role or a contract to clear a specific backlog. Worth a short call?

Portfolio: {{portfolio_url}}
Venkatesh
```
*Personalize: if they have an open DevOps/SRE/Platform req, name it and map two of your bullets to its requirements.*

## Email — Touch 2 (Day 4)
**Subject:** Re: Senior DevOps for {{company}}

```
{{first_name}} — a bit more on how I'd plug in.

Week one I don't build, I look: where the money leaks, what pages people at night, how long commit-to-prod takes, and what only lives in one person's head. The first-week findings are usually worth more than the first month of building.

Five production projects showing exactly how I work — architecture and code: {{portfolio_url}}

If you've got a backlog you'd like a senior pair of hands on — permanent or contract — happy to scope it on a 15-min call.
```

## Email — Touch 3 (Day 9, break-up)
**Subject:** Re: Senior DevOps for {{company}}

```
{{first_name}} — closing the loop so I'm not a pest.

If a DevOps/platform need comes up at {{company}} — a hire or a contract to clear specific work — I'd welcome the conversation. Everything's here: {{portfolio_url}}

Thanks for your time.
Venkatesh
```

## LinkedIn — Connection note (≤300 chars)
```
Hi {{first_name}} — Senior DevOps Engineer (AWS/EKS/Terraform/observability). I build platforms and mentor teams to run them. Following {{company}}'s engineering work — would like to connect.
```

## LinkedIn — DM after connect
```
Thanks for connecting, {{first_name}}.

Quick note: I'm a Senior DevOps Engineer who takes platform load off stretched teams — production EKS, Terraform/GitOps (week→day provisioning), observability that cut MTTR 50%. I also mentor and document, so the team levels up, not just the infra.

Open to a remote role or a contract to clear a backlog at {{company}}. Worth a short call? Proof: {{portfolio_url}}
```

---
---

# AUDIENCE 4 — Consultancies / MSPs / Cloud Partner Firms
*They subcontract delivery. Sell reliability, AWS breadth, and that you make them look good to their clients.*

## Email — Touch 1 (Day 0)
**Subject:** Subcontract DevOps capacity — AWS/EKS/Terraform

```
Hi {{first_name}},

In case {{company}} ever needs extra senior DevOps capacity for client delivery — that's exactly what I do.

I deliver production AWS work end to end: multi-account Landing Zones, EKS platforms, Terraform modules, CI/CD, and observability. Across past roles I've built infra for 8+ client projects, cut a bill $8k/month, and held 99.95% uptime SLAs — the kind of results that make the firm look good to its clients.

Open to contract/subcontract or white-label delivery. Worth keeping me on your bench? Portfolio: {{portfolio_url}}

Venkatesh
```

## Email — Touch 2 (Day 4)
**Subject:** Re: Subcontract DevOps capacity

```
{{first_name}} — to show rather than tell:

Five reference-grade projects, with architecture diagrams and Terraform/Helm/ArgoCD code, mirroring typical client engagements — landing zone, EKS platform, GitOps pipeline, observability stack, cost optimization: {{portfolio_url}}

If you've got client work that needs an extra senior pair of hands — overflow, a specialist piece, or white-label — happy to scope it. Reliable delivery, clear docs, no drama.
```

## Email — Touch 3 (Day 9, break-up)
**Subject:** Re: Subcontract DevOps capacity

```
{{first_name}} — I'll leave it here for now.

If client demand outpaces your bench and you need senior AWS/Kubernetes delivery — contract or white-label — I'd be glad to help. Details whenever useful: {{portfolio_url}}

Appreciate your time.
Venkatesh
```

## LinkedIn — Connection note (≤300 chars)
```
Hi {{first_name}} — Senior DevOps Engineer (AWS/EKS/Terraform/CI-CD). I deliver production cloud work for client engagements and am open to contract/subcontract. Would like to connect with {{company}}.
```

## LinkedIn — DM after connect
```
Thanks for connecting, {{first_name}}.

Quick reason I reached out: if {{company}} ever needs extra senior DevOps capacity for client delivery, I'm available for contract/subcontract or white-label. I deliver AWS Landing Zones, EKS platforms, Terraform, CI/CD and observability — built for 8+ client projects, with $8k/mo savings and 99.95% uptime on the record.

Happy to be on your bench. Proof: {{portfolio_url}}
```

---
---

# Sending playbook (read before you send)

**Cadence per prospect:** Day 0 → Day 3–4 → Day 8–9, then stop. Three touches. Never more than four.

**Volume:** 10–20 *personalized* sends a day beats 200 generic. Block 30 min each morning.

**Personalization (do at least one per message):**
- Name a real trigger in Touch 1 (job post, fundraise, blog, comment, their stack).
- Match the metric to their likely pain (cost vs reliability vs speed).
- For recruiters, name the specific role; for MSPs, reference a client vertical they serve.

**Tracking:** log every send in a simple sheet — name, company, audience, channel, date sent, touch #, reply (y/n), outcome. Without tracking you'll double-message people and miss follow-ups.

**What "good" looks like:** cold outreach reply rates are typically low single digits. 15–20 thoughtful sends/day for a few weeks, paired with the daily LinkedIn content (so you're not a stranger when you land in their inbox), is what turns into calls.

**Compliance:** real sender identity, B2B-relevant, easy to opt out, honest claims. Don't scrape-and-blast — that burns your domain and your name.

---
---

# Regions & time zones (US · UK · Europe · India)

You're based in India (IST, UTC+5:30) and targeting US, UK, Europe, and India. Make the overlap a selling point, not a worry — say it plainly and humbly.

**One line to drop into Touch 1 when the prospect is overseas:**
> "I'm IST-based and used to overlapping with US and European teams — I keep 3–4 hours of daily overlap with your working hours, and I'm flexible on the rest."

**Per-region notes:**
- **US:** lead with cost ($8k/mo) and reliability — the metrics travel well. Best send window: their morning = your evening (7–9pm IST). Mention timezone overlap explicitly; it's the top remote-hire objection.
- **UK / Europe:** strong overlap (your afternoon = their morning). Send 1–3pm IST. GDPR-aware security framing (least-privilege, secrets, audit) lands well here.
- **India:** you can offer near-full overlap and on-site/hybrid optionality — say so. Referrals and product startups on AWS are the warmest segment.

**Tone reminder (all regions):** humble and specific beats confident and generic. You're offering to be a useful second pair of eyes, not pitching a transformation. Every claim is one you can defend on a call. Never over-promise; "happy to help either way" is the close.
