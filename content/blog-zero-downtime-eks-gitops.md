# Zero-Downtime Releases on EKS: Blue-Green, GitOps, and 5-Minute Rollbacks

*Senior DevOps / Platform Engineering · AWS · EKS · ArgoCD*

We used to take a maintenance window to deploy. Customers noticed. Now releases go out in the middle of the workday and nobody feels a thing — and if something looks wrong, we undo it in about five minutes instead of forty-five.

This is how the blue-green + GitOps setup on EKS works, and why "be able to undo instantly" matters more than "deploy carefully."

> Zero-downtime releases, rollback from 45 minutes to under 5, across a platform of 20+ microservices. Production numbers — the patterns transfer regardless of scale.

---

## The problem with "deploy carefully"

The old process was a person running `kubectl apply` from their laptop during a maintenance window. It worked — until the day it didn't. A slightly different manifest, a different person, no record of what changed, and a 45-minute rollback while everyone guessed at the previous state.

The trap is thinking the answer is *more care*. Manual deploys can work for years and still be one bad afternoon away from an outage. The real fix is making the safe path the easy path, and making rollback trivial.

---

## Blue-green: two environments, instant cutover

Blue-green runs two identical production environments. Only one — say blue — serves live traffic. The new release goes to green.

The flow:

1. **Deploy to green** — same data path, same config, real environment, but no live traffic yet.
2. **Verify green for real** — smoke tests and health checks against the actual deployed version, not a staging approximation.
3. **Flip traffic at the load balancer** — an instant cutover from blue to green. Users move over in one step.
4. **Keep blue warm** — if anything looks wrong, flip back. Rollback is a traffic change, not a redeploy.

That last point is the whole game. Rollback went from 45 minutes of redeploying-the-old-version panic to a 5-minute traffic flip. Once undo is trivial, deploying stops being scary.

---

## GitOps with ArgoCD: Git is the only truth

Blue-green tells you *how* traffic moves. GitOps makes sure the process is identical every single time and that nobody needs cluster credentials on their laptop.

- **Git is the source of truth.** What's in the repo *is* what's in the cluster. ArgoCD continuously reconciles the two.
- **Deploys are pull, not push.** ArgoCD running inside the cluster pulls the desired state — no one runs `kubectl` against prod from a laptop.
- **Every change is a PR** — reviewed, logged, and revertible with a single Git revert.
- **Drift gets corrected automatically.** If someone hotfixes the cluster by hand, ArgoCD flags it loudly or reverts it. Your "source of truth" stops being a polite fiction.

The combination is what made releases boring: blue-green for the instant, reversible cutover; ArgoCD for the identical, auditable, drift-free process.

---

## The supporting cast

A few things make zero-downtime real rather than aspirational:

- **PodDisruptionBudgets** so routine node operations don't take a service below its minimum replicas.
- **Readiness probes that tell the truth** — traffic only reaches a pod that's genuinely ready, which is what makes the cutover clean.
- **HPA + Karpenter** so green can scale to handle full load before the flip, not after.
- **Observability on both colors** so you can compare green against blue *before* committing the traffic switch.

---

## What I'd tell a team starting this

- **Optimize for reversibility, not perfection.** You will ship a bad release eventually. The question is whether undo takes 5 minutes or 45.
- **Blue-green costs more (two environments) — choose where it's worth it.** For revenue-critical services it pays for itself the first time. For everything else, a good rolling update or canary may be enough.
- **Adopt GitOps before you scale the team.** The bigger the team, the more expensive manual, unaudited deploys become.
- **Test the rollback, not just the deploy.** A rollback path you've never exercised is a hope, not a plan.

---

## The takeaway

Zero-downtime isn't about deploying more carefully. It's about being able to undo instantly. Blue-green gives you the reversible cutover; GitOps with ArgoCD makes the process identical, auditable, and drift-free every time. Get both and releases stop being events you schedule around — they become something you do on a Tuesday afternoon without thinking about it.

*Platform engineering and CI/CD modernization are core to what I do. I'm available for remote and contract work — [get in touch](https://venkatesh-portfolio-website.vercel.app/).*
