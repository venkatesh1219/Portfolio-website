# How I Designed a Multi-Account AWS Landing Zone (and Cut Provisioning From a Week to a Day)

*Senior DevOps / Platform Engineering · AWS · Terraform · Security*

"Why not just put everything in one AWS account?" is a fair question when you're small. It stops being fair the first time a developer's IAM mistake touches production data, or your monthly bill becomes one undifferentiated number nobody can attribute.

This is how I design a multi-account AWS Landing Zone: what each piece is for, why the structure *is* a security control, and how building it as reusable Terraform took environment provisioning from a week down to a day.

> The numbers here — 65% faster provisioning, zero config drift, zero critical audit findings — come from production work across four AWS accounts. Your results depend on team size and starting point; the patterns are what transfer.

---

## The problem with a single account

A single AWS account feels simpler until it doesn't:

1. **No blast-radius wall.** Dev, staging, and prod share one IAM space and one set of limits. A mistake anywhere can reach everywhere.
2. **Cost is unattributable.** One bill, every environment mixed together. You can't tell what dev is wasting versus what prod actually needs.
3. **Audit is painful.** Compliance wants isolation and a clean audit trail. A single account gives you neither cleanly.

The goal of a Landing Zone is to make the *safe* structure the *default* structure — so a bad day stays a small day.

---

## The architecture

The Landing Zone is an AWS Organization with separate accounts for each environment (dev / staging / UAT / prod), plus dedicated accounts for shared services, networking, and logging. Here's what each layer does and why it exists.

**Account separation — the blast-radius wall.** Each environment lives in its own account. A runaway script in dev cannot touch prod data, prod service limits, or prod IAM. This is the single highest-leverage decision in the whole design: isolation you get for free at account boundaries is isolation you'd otherwise fight IAM policies forever to approximate.

**Transit Gateway — networking you can reason about.** Instead of a tangle of VPC peering connections that grows quadratically, all accounts attach to a central **Transit Gateway**. Traffic flows through one hub with explicit route tables. When something can't reach something else, there's one place to look — not N² peering connections.

**Centralized CloudTrail — one source of truth.** Every account ships CloudTrail logs to a locked, dedicated logging account that almost nobody can write to and nobody can delete from. When an incident or an auditor asks "who did what, when," the answer is in one tamper-resistant place.

**Service Control Policies — guardrails, not requests.** SCPs make dangerous actions *impossible* at the Organization level — blocking region usage you don't operate in, preventing disabling of CloudTrail, stopping public S3 where it's not allowed. The difference between "against policy" and "denied by SCP" is the difference between a wiki page and a wall.

**IAM Identity Center — one front door.** Human access is federated through a single sign-on with permission sets scoped per account and role. No long-lived IAM users scattered across accounts.

---

## Why Terraform made it repeatable

The architecture above is only half the value. The other half is that a *new* account is provisioned in hours, not weeks, because it's all reusable Terraform.

What made the modules reusable instead of copy-paste:

- **One module, many environments.** dev/stg/uat/prod are the same code parameterized with different `tfvars` — not four diverging copies that drift apart.
- **Few required inputs.** A new environment needs a handful of variables (CIDR, environment name, account ID), with sane defaults for everything else.
- **Outputs that chain.** The networking module's outputs feed the EKS and RDS modules — no hardcoded VPC IDs or subnet IDs anywhere.
- **Remote state with locking** (S3 + DynamoDB), so two engineers can't corrupt state, and `terraform plan` runs in CI on every PR so you see the blast radius before merge.

Result: environment provisioning dropped from roughly a week to a day — about 65% faster — and, just as importantly, **config drift went to zero**, because there is exactly one source of truth.

---

## What I'd tell a team starting this

- **Start with the account structure, even if you build the rest later.** Account boundaries are the hardest thing to retrofit and the most valuable to get right early.
- **Plan your CIDRs across all accounts up front.** Overlapping ranges make Transit Gateway and any future peering a nightmare. You can refactor an app in an afternoon; you can't easily re-IP a running platform.
- **Treat SCPs as code and roll them out gradually.** Test in non-prod OUs first — an overly broad SCP can lock you out of your own account.
- **Don't over-engineer on day one.** You don't need 12 accounts at seed stage. Account-per-environment plus a logging account is a strong, defensible baseline you can grow from.

---

## The takeaway

Account structure isn't tidiness — it's a security control with a cost dimension attached. You separate so that a mistake stays contained, costs stay attributable, and audits stay clean. Build it as reusable IaC and the 50th environment comes up as cleanly as the first.

*If you're scaling on AWS and your account structure grew organically rather than by design, this is usually the highest-leverage thing to fix. I'm available for remote and contract work — [get in touch](https://venkatesh-portfolio-website.vercel.app/).*
