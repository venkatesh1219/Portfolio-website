# How I Cut MTTR by 50% — Building Observability People Actually Use

*Senior DevOps / SRE · Prometheus · Grafana · Loki · PagerDuty*

A 3am page. Checkout was down, revenue was bleeding, and it took us 90 minutes to find the cause. A year later, the same class of incident takes under 10 minutes. Mean time to resolution dropped by half — and none of it was "try harder" or "hire heroes."

This is what actually moved MTTR: making the system easy to understand when you're half asleep.

> MTTR down 50%, alert volume down ~80%, 95% of incidents caught before customer impact. Real production numbers. The principles matter more than the figures.

---

## Why incidents took 90 minutes

The slow night wasn't a skill problem. It was a *legibility* problem:

- **Logs lived in five places.** SSH here, a console there, a third tool for the database. Just *assembling the picture* ate most of the 90 minutes.
- **Alerts pointed at causes, not symptoms.** "CPU high" tells you nothing about whether a user is in pain.
- **Dashboards were built for demos,** not for 3am. Pretty, but they didn't answer "what's broken and where."
- **Nobody trusted the alerts,** because most of them were noise.

Fix those four things and the 90 minutes collapses.

---

## The stack, and what each piece is for

- **Prometheus** — metrics and alerting. The numbers that tell you *something* is wrong and roughly where.
- **Grafana** — one dashboard surface across every environment. RED metrics (Rate, Errors, Duration) front and center per service.
- **Loki + ELK** — centralized logs with one query surface. No more SSH-and-grep across five machines.
- **PagerDuty** — routing, escalation, and on-call schedules, so the right person gets the right page (and only the right page).

Tooling is necessary but not sufficient. The wins came from *how* it was used.

---

## The four changes that actually cut MTTR

**1. Centralize the picture.** Pulling logs into Loki + ELK with one query surface meant the first 30 minutes of every incident — just gathering context — nearly disappeared. You localize *where* with metrics, then confirm *why* with logs and traces, all without changing tools.

**2. Alert on symptoms, not causes.** "Checkout error rate > 2%" matters because it maps to user pain. "CPU at 80%" usually doesn't — a healthy system under load looks identical to a sick one on that metric. We re-pointed alerts at the Four Golden Signals: latency, traffic, errors, saturation.

**3. Every alert links to a runbook.** When a page fires, the responder gets a link to a runbook that says what it means, what to check, and how to fix — written for the tired on-call engineer, with copy-paste commands and expected output. Found in two seconds, not searched for in a panic.

**4. Cut the noise to restore trust.** We had 200+ alerts a week and nobody believed any of them. After re-pointing everything at user-impacting symptoms and demoting the rest to tickets, alert volume fell ~80% and *trust went up*. Now when it fires, people move — because every false page had been eroding the response to the real one.

---

## Blameless postmortems — the part that compounds

The 50% didn't come from one change; it came from a loop. After every significant incident, a blameless postmortem asked: what made this slow to detect, slow to diagnose, slow to fix? Each answer became a new dashboard panel, a new runbook, or a deleted alert. The system got more legible after every incident instead of accumulating scar tissue.

---

## What I'd tell a team starting this

- **Don't buy more dashboards. Watch fewer signals.** Get the Four Golden Signals right per service and you can delete half of what you have.
- **Treat runbooks as part of the alert,** not separate documentation. An unlinked runbook is decoration.
- **Measure alert trust, not just alert coverage.** If the team mutes the channel, you don't have monitoring — you have noise.
- **Make the postmortem change something.** A postmortem that produces no concrete change is a meeting, not a fix.

---

## The takeaway

You don't reduce MTTR by being faster at 3am. You reduce it by making the system easy to understand when you're at your worst — half awake, under pressure, revenue on the line. Centralize the picture, alert on user pain, link every alert to a runbook, and let blameless postmortems compound the gains.

*Observability and incident-response work pays back the first time it saves you a bad night. I'm available for remote and contract roles — [reach out](https://venkatesh-portfolio-website.vercel.app/).*
