---
name: react-best-practices
description: Diagnose and improve React or Next.js rendering, loading, data waterfalls, and bundle performance using Vercel's rule set. Use for measured performance problems or a performance review.
---

# React performance

Apply [the shared contract](../../shared/contract.md). Read the category index in the pinned [Vercel guide](references/upstream/guide.md), then only matching files in `references/upstream/rules/`. Do not load a compiled all-rules document.

Identify the installed React/framework versions, rendering mode, build pipeline, and concrete symptom. Use existing profiler traces, network timings, bundle reports, or a reproducible slow interaction to establish a baseline. Separate measured evidence from suspected cost.

Prioritize user-visible waterfalls and heavy initial payloads, then expensive renders or main-thread work. Check data dependencies before parallelizing; preserve cancellation, errors, ordering, and loading semantics. Use existing framework capabilities and avoid speculative memoization or cache layers.

Vite/client React is not Next.js. Skip server components, server actions, Next image/dynamic/cache APIs, and streaming rules unless those technologies are present. Check current official documentation for version-dependent APIs before applying them. Account for compiler configuration before adding manual memoization.

After changes, repeat the same representative measurement and run the project gate. Verify keyboard responsiveness, loading/error states, and visual stability. Report before/after numbers with environment and method; if instrumentation is unavailable, state that the improvement is reasoned but unmeasured. An optimization must preserve behavior.
