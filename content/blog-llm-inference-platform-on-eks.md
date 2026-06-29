# How I Built a Self-Hosted LLM Inference Platform on EKS (and Cut Cost ~60%)

*Senior DevOps / Platform Engineering · AWS · Kubernetes · MLOps*

Hosted LLM APIs are the right call when you're prototyping. The moment usage becomes steady and predictable, two problems show up: the bill scales linearly with every token, and your prompts — often containing customer data — leave your network.

This is the story of replacing a hosted LLM API with a self-hosted inference platform on Amazon EKS: how it's architected, the decisions that mattered, and the numbers that came out the other side.

> The metrics here reflect a steady-volume, production-style workload. Your mileage depends heavily on traffic shape, model size, and GPU availability — measure before you commit.

---

## The problem

We were calling a hosted LLM API for several internal products. Three things forced a rethink:

1. **Cost scaled with usage, not value.** At steady volume the per-token bill kept climbing with no ceiling and no leverage to pull.
2. **Data left the VPC.** Prompts included customer records. Every request was a compliance conversation waiting to happen.
3. **No control over latency or capacity.** When the provider was slow, we were slow, and there was nothing to tune.

The goal: owned, autoscaling inference that keeps data in-network and makes cost-per-token a lever we control — without asking application teams to rewrite anything.

---

## The architecture

![Self-hosted LLM inference platform on EKS architecture](/blog/llm-inference-architecture.png)

The whole platform runs inside one VPC. Nothing about a request leaves the network.

**Entry point — an OpenAI-compatible gateway.** App teams already spoke the OpenAI SDK. The single most important design choice was to keep them speaking it. A **LiteLLM** gateway exposes an OpenAI-compatible API, so migrating a service meant changing a base URL and an API key — nothing else. The gateway also owns rate limiting and per-team token accounting, which is where cost governance actually lives.

**Serving — vLLM on GPU nodes.** Behind the gateway, **vLLM** serves open-weight models (Llama 3 for interactive, Mistral for batch). vLLM's continuous batching and PagedAttention are what make self-hosting economically viable — they keep the GPU busy instead of idling between requests. **KServe** wraps model serving so we can do canary rollouts when swapping model versions.

**Capacity — Karpenter, not the Cluster Autoscaler.** GPUs are expensive and scarce, so node provisioning has to be tight. **Karpenter** provisions GPU nodes just-in-time and bin-packs them, then consolidates as demand falls. Interactive traffic runs on On-Demand `g5` nodes; batch and async work runs on **Spot** `g6` with graceful interruption handling. This split is most of the cost win.

**Scaling — KEDA on the right signal.** Scaling LLM pods on CPU is a trap; the GPU saturates long before CPU does. **KEDA** scales replicas on **request-queue depth** instead, so we add capacity when requests start waiting — the signal users actually feel.

**Caching — skip work you've already done.** A **Redis** semantic cache short-circuits repeat and near-duplicate prompts. For workloads with repetitive queries (support, classification, internal tooling), cache hits are free latency and free money.

**Observability — cost as a first-class SLO.** Prometheus and Grafana track GPU utilization, time-to-first-token, and — critically — **cost-per-token as an SLO**. If efficiency regresses, it pages like any other reliability problem.

---

## The decisions that actually mattered

**1. OpenAI-compatible from day one.** Adoption is everything. A faster, cheaper platform that requires a rewrite gets ignored. Because migration was a one-line change, teams opted in instead of being dragged.

**2. Queue depth as the scaling signal.** Switching from CPU-based to queue-depth-based autoscaling was the difference between "scales too late and drops requests" and "scales when it matters." Pick the metric your users feel.

**3. Spot for everything that can tolerate it.** Batch, async, and retryable work on Spot GPUs cut a large slice of cost. The discipline is honest workload classification — what truly needs On-Demand vs. what can take an interruption.

**4. Make cost visible per team.** Per-team token accounting in the gateway turned a shared, invisible bill into something each team could see and own. Visibility changes behavior faster than any policy.

---

## The results

At steady volume, against the hosted API baseline:

- **~60% lower cost per 1M tokens** — driven by Spot GPUs, Karpenter consolidation, and cache hits.
- **p95 time-to-first-token under 800ms** under autoscaled load.
- **Zero inference data leaving the VPC** — the compliance story changed entirely.
- **Predictable capacity** — we tune it, instead of waiting on a provider.

The headline is the cost number, but the durable win is **control**: latency, capacity, data residency, and spend are all levers we own now.

---

## What I'd tell you before you build this

Self-hosting LLMs is not free — you're trading a usage bill for an engineering and GPU-capacity commitment. It pays off when:

- Volume is **steady and high enough** to keep GPUs busy. Bursty, low-volume traffic often stays cheaper on a hosted API.
- **Data residency or compliance** makes hosted APIs a real problem.
- You have the platform muscle to **operate GPUs, autoscaling, and model updates** safely.

If those hold, an EKS-based platform turns inference from a line item you can't control into infrastructure you can.

---

*Building or scaling something similar on AWS/EKS? I write about cloud platform engineering, Kubernetes, and FinOps. More work at [venkatesh-portfolio-website.vercel.app](https://venkatesh-portfolio-website.vercel.app/).*
