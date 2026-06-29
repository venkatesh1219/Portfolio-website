# LinkedIn Cold DM Sequence — Founders / CTOs / VP Eng

**Sender:** Venkatesh Sethumurugan — Senior Cloud DevOps Engineer (AWS · EKS · Terraform · CI/CD · cost optimization)
**Audience:** Founder / CTO / VP Eng at a startup or scale-up running on AWS
**Goal:** Open a conversation that can go either way — full-time role *or* a contract engagement
**Tone:** Crisp, professional, no fluff
**Channel:** LinkedIn (connection note + DMs)

Merge fields: `{{first_name}}`, `{{company}}`, `{{trigger}}`, `{{portfolio_url}}`

> Positioning note: founders don't care about your titles — they care about cloud bills, uptime, and shipping speed. Every touch opens on one of those, then positions you as the person who fixes it. The "hire or contract" flexibility is the close, not the opener.

---

## Touch 1 — Connection request note (Day 0)
*Max 300 characters. Keep it about them, not you.*

```
Hi {{first_name}} — I build and run AWS/Kubernetes platforms for engineering teams (EKS, Terraform, CI/CD, cost optimization). Following {{company}}'s work and would like to connect.
```

**Personalize before sending:** replace the generic line with a real trigger — a role they posted, a launch, a fundraise, or a "we're scaling on EKS" comment. Example: *"Saw {{company}} is hiring its first platform engineer — would like to connect."*

---

## Touch 2 — First DM, post-connect (Day 1–2)
*Send once they accept. One problem, one proof point, one small ask.*

```
Thanks for connecting, {{first_name}}.

Quick reason I reached out: most teams scaling on AWS hit the same wall — Kubernetes costs creep, deploys get fragile, and infra work pulls engineers off the product. I fix that for a living.

Recent examples: cut EKS spend ~30–40% with Karpenter + Kubecost bin-packing, and built GitOps pipelines that took deploys from manual to push-button.

If platform/infra is on your radar at {{company}} — as a hire or a contract project — worth a 15-min call? Happy to share what I'd look at first either way.

Portfolio: {{portfolio_url}}
```

**Personalize:** swap the metric for whichever pain is most likely theirs. Cost-sensitive seed stage → lead with the spend number. Reliability pain → lead with the GitOps/deploy line. Hiring a platform engineer → lead with "saw the role."

---

## Touch 3 — Follow-up (Day 4–6)
*New information, not a bump. Add a concrete mechanism or a relevant artifact.*

```
{{first_name}} — following up with something concrete rather than just nudging.

I put together a short teardown of how I'd approach a typical AWS/EKS setup: where the cost leaks usually are, what I'd harden first for reliability, and the quickest CI/CD wins. Built it from real projects (multi-region DR, secrets baseline with Vault, GPU/MLOps platforms).

If useful I can walk you through it on a 15-min call, or just send it over. No pitch — happy to be a second pair of eyes on your infra whether or not anything comes of it.
```

**Personalize:** if they have a public stack (job posts, engineering blog, GitHub), name one specific thing you'd look at — that single detail outperforms any merge field.

---

## Touch 4 — Break-up (Day 9–12)
*Gracious exit. Leave the door open with a low-friction yes.*

```
{{first_name}} — I'll stop here so I'm not cluttering your inbox.

If infra, cost, or reliability work comes up at {{company}} down the line — full-time or a contract sprint — I'd be glad to help. My work's all here: {{portfolio_url}}

Either way, good luck with what you're building.
```

---

## Why this works
- **Founder-first framing:** opens on cost / reliability / engineer-time, the three things a CTO actually loses sleep over — not on your résumé.
- **Dual intent handled cleanly:** "as a hire or a contract project" lowers the bar to reply. They don't have to commit to opening a req to say yes.
- **Real numbers, real guardrails:** the ~30–40% EKS figure and the project references are drawn from your portfolio — keep them honest and ready to back up on a call.
- **Every touch earns the next:** connect → problem+proof → concrete teardown → graceful exit. No "just bumping this."

## Before you send — checklist
1. Replace `{{trigger}}` in Touch 1 with a real, specific reason you're reaching out. A generic connect note halves your accept rate.
2. Confirm the EKS savings range matches what you can actually defend — adjust the number to a project you can talk through.
3. Set `{{portfolio_url}}` to your live site.
4. Don't send all four to the same person regardless of replies — stop the moment they respond.
5. Keep it B2B and relevant; if they're clearly not a fit, skip rather than send.

---

## Regions & time zones (US · UK · Europe · India)

IST-based, targeting US / UK / Europe / India. Treat the timezone question as a feature you address up front — humbly, in one line:

> "I'm IST-based and comfortable overlapping with US/EU teams — I hold a few hours of daily overlap with your hours and stay flexible on the rest."

- **US:** lead with the cost + reliability numbers; they're the universal language. Address overlap before they ask.
- **UK / Europe:** your afternoon is their morning — emphasise the easy overlap.
- **India:** offer near-full overlap and hybrid/on-site optionality; referrals are your warmest channel.

Keep every DM humble and concrete. You're a calm, senior pair of hands offering to help — not selling a turnaround. One real number, one small ask, no over-promising.
