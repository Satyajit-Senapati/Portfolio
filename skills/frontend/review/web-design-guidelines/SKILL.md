---
name: web-design-guidelines
description: Audit web UI code and behavior for usability, visual consistency, forms, navigation, and interaction quality using Vercel's interface guidelines. Use for UI reviews and regression checks.
---

# Web UI review

Apply [the shared contract](../../shared/contract.md). Use the bundled [Vercel review entrypoint](references/upstream/guide.md) and [interface checklist](references/interface-guidelines/command.md). The snapshot makes offline review possible. For an explicitly current-guidelines audit, retrieve the [current source](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md), state the version/date used, and report if retrieval is unavailable.

Infer scope from the request, changed files, routes, and existing repo structure. Do not ask for a file pattern if the requested UI can be identified. An entire-UI audit should cover representative routes, shared components, and critical journeys; describe sampling and gaps honestly.

Review navigation, focus, forms and validation, content clarity, empty/loading/error states, theme contrast, media, layout resilience, touch, and perceived performance. Treat Vercel-specific copy/brand preferences as optional. Do not disable browser zoom even if a source suggests a viewport workaround. Framework-specific checks apply only to the actual stack.

Findings should contain severity, file/line or route/state, observed evidence, user impact, and a concrete correction. Separate bugs from subjective suggestions and unverified hypotheses. Deduplicate issues sharing one root cause; prioritize blocked tasks over decoration.

Review-only requests produce findings. Fix requests include targeted changes and rechecks. For a full audit, combine with web accessibility and UX pattern review; perform browser/screenshot verification in a visual-QA phase. Do not claim compliance from static inspection alone.
