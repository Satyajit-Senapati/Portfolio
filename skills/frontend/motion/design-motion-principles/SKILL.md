---
name: design-motion-principles
description: Design, implement, or audit purposeful UI motion, transitions, and micro-interactions. Use for animation behavior, timing, easing, interruptions, and reduced-motion alternatives.
---

# Motion

Apply [the shared contract](../../shared/contract.md). Use the pinned [motion guide](references/upstream/guide.md) and choose [create](references/upstream/workflows/create.md) or [audit](references/upstream/workflows/audit.md) based on the requested action. Branded HTML reports and demonstration apps are optional outputs, only when useful to the request.

For each motion, state what relationship or state change it explains, how often it occurs, and what should happen if interrupted. Frequent actions should feel immediate. Pick duration and easing from travel distance, component size, task urgency, and project conventions; upstream designer lenses are interpretations, not universal requirements.

Prefer CSS transitions or the existing motion library. Animate transform/opacity when appropriate; measure expensive layout, blur, or paint effects. Preserve a usable final state if animation fails. Avoid delaying input, hiding essential content behind a reveal, or adding motion solely to increase a preset intensity.

Honor `prefers-reduced-motion` with an immediate or restrained equivalent. Keyboard users must receive immediate focus and state feedback; do not delay focus until an entrance finishes. Do not treat upstream "never animate keyboard actions" as a reason to remove useful non-delaying feedback. Avoid flashing, perpetual distraction, and hover-only information.

Verify initial load, enter/exit, rapid toggles, cancellation, route/unmount cleanup, touch, keyboard, and reduced motion as relevant. Inspect actual frames in browser tooling when available. In an audit, report trigger, observed issue, impact, recommended change, and verification evidence.
