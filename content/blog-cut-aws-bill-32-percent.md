# How I Cut an AWS Bill by $8,000/Month (32%) Without Deleting a Single Workload

*Senior DevOps / FinOps · AWS · Cost Optimization*

Cloud cost optimization gets mythologized. People imagine clever tricks and hidden discounts. The reality is far more boring — and far more repeatable. I cut an AWS bill by $8,000 a month, a 32% reduction across four accounts, and I didn't delete a single running workload to do it.

Here's exactly how, in the order I'd do it again.

> These numbers are from a real production environment. The *percentages* transfer better than the dollar figures — most mature-but-unoptimized AWS accounts have 20–35% of waste hiding in plain sight.

---

## Step 0: cost is a visibility problem, not a pricing problem

Before touching anything, I spent about a week on a cost audit across all four accounts. This is the step everyone wants to skip and nobody should.

You cannot cut what you cannot see. Cost Explorer grouped by service, then by linked account, then by usage type, tells you where the money actually goes — and it's almost never where the team assumes. The audit is what turns "the bill feels high" into "these six line items are 80% of the waste."

Three levers came out of that audit. They're the same three almost every time.

---

## Lever 1: Right-sizing — the load test from 2022

Roughly half the fleet was provisioned for a peak that no longer existed — sized for an old load test and never revisited. CloudWatch told the real story; we just hadn't looked.

How I right-size **without causing an incident**:

- **Measure p95 and p99, never averages.** Averages hide the spikes that cause outages when you cut.
- **Cut in steps.** Drop one instance size, watch for a few days, repeat. Never halve capacity in one move.
- **Size on the real constraint.** Some workloads are memory-bound, some CPU-bound. Sizing on the wrong dimension causes the exact outage you were trying to avoid.
- **Keep headroom for the p99 spike,** not the average day.

Right-sizing is a reliability exercise that happens to save money. Done on data, in small steps, production never notices.

---

## Lever 2: Spot — for the workloads that can survive it

Spot instances carry a reputation for being "too risky for production." That's mostly fear, not math. Spot can be reclaimed with a two-minute warning — a *known, announced* event, which is the easiest kind of failure to design for.

Where Spot went in safely:

- **Stateless services, batch jobs, async workers, CI runners** — anything where a two-minute drain is survivable.
- **Spread across instance types and AZs** so one capacity pool draining doesn't take the workload out.
- **Graceful drain on the interruption notice** (node termination handlers / Karpenter do this automatically).
- **A small On-Demand / Savings Plan floor** kept for the workloads that genuinely can't blink.

Designed for, Spot became a large chunk of the total saving.

---

## Lever 3: Savings Plans — stop paying retail for the floor

We were paying On-Demand prices for baseline compute that *never turned off*. That's paying retail for something you could pre-commit at a discount.

The approach: identify the steady-state floor — the compute that's always running regardless of traffic — and cover *just that* with Compute Savings Plans. Commit to the floor, leave the variable top of the load on On-Demand or Spot. This alone was a significant slice of the saving, with effectively zero risk, because you're only committing to capacity you were always going to use.

---

## The bonus lever: the network path

One more that surfaced in the audit and is worth its own mention: **NAT Gateway data processing charges.** Private-subnet workloads were pulling container images and hitting S3 *through the NAT Gateway*, paying per-GB on traffic that never needed to leave AWS.

The fix was almost free — **VPC Gateway Endpoints** for S3 and DynamoDB, and **Interface Endpoints** for ECR. Traffic stays on the AWS backbone, the NAT data charge disappears. In AWS, the expensive thing is often the *path your traffic takes*, not the service you think you're paying for.

---

## Making it stick

A one-time cut that creeps back up isn't optimization, it's a stunt. To keep it down:

- **Tag everything** and review cost by tag monthly.
- **Set budgets and anomaly alerts** so a surprise gets caught in days, not at the next invoice.
- **Document a cost-optimization framework** the team can run without you — the audit is repeatable, not a one-off.

---

## The takeaway

Cloud cost optimization isn't clever. It's an audit, then three boring levers — right-sizing, Spot, and Savings Plans — applied carefully and on data. The discipline is in measuring before you cut and cutting in steps so reliability never regresses. $8k/month, 32%, zero workloads deleted, zero incidents caused.

*FinOps reviews are some of the fastest-payback work I do — the engagement often pays for itself in the first month's savings. I'm available for remote and contract work — [let's talk](https://venkatesh-portfolio-website.vercel.app/).*
