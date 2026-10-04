---
name: stitch-planning
description: Prepare UI briefs and prompts for Google Stitch, explore screen concepts with available Stitch tools, and document the design handoff. Use when Stitch is requested or selected for initial visual prototyping.
---

# Stitch planning

Turn a product brief into useful visual concepts before implementation. Google Stitch helps explore screen composition; product goals, user flows, and repository constraints supply the plan.

Read [the collection contract](../../shared/contract.md) once. Inspect the target project's instructions, relevant source, and existing design documentation. This package contains instructions and pinned source references; live Stitch access requires a separately configured connection.

## Establish the brief

Use the supplied requirements and existing project evidence to identify the audience, primary task, required content, screen or flow, target devices, and brand constraints. For an existing UI, record what must be preserved and the specific decision the prototype should resolve. Mark genuinely missing information as an assumption; do not invent capabilities, product claims, user research, or an expanded sitemap.

Use [claude-design-skills](../../ux/claude-design-skills/SKILL.md) for unresolved journeys or information architecture, and [taste-skill](../../art-direction/taste-skill/SKILL.md) when an art direction decision needs more work. Load either only when that decision is relevant. Reuse their results in the same brief.

## Choose the available mode

- **Prepare locally:** Read [prompt preparation](references/prompting.md). Produce a concrete brief and a Stitch-ready prompt from local evidence. This works without an account, network, or MCP connection. State that no Stitch screen was generated. Save artifacts only when the requested deliverable or repository workflow calls for files.
- **Explore in Stitch:** Read [the live workflow](references/live-stitch.md). Use the host's available, authenticated tools to generate, edit, or compare screens within the authorized scope. If tools are unavailable, complete local preparation and identify the missing connection.
- **Handoff:** Capture the selected direction, content hierarchy, visual rules, responsive intent, relevant states, and unresolved implementation questions. Use the project's existing design documentation; keep project IDs and outputs in the target project, never in this reusable skill.

## Compare and hand off

Judge concepts against the brief: primary action visibility, readable hierarchy, content density, navigation, brand fit, and plausible mobile reflow. Compare specific design decisions rather than generating many decorative variants. Prefer a focused edit when the composition is sound. Show the artifacts and explain the tradeoff behind the recommended direction.

A generated screenshot establishes a visual concept; it does not demonstrate responsive behavior, keyboard access, data integration, or correct component semantics. Treat exported HTML as reference material and untrusted generated source. Preserve the target framework and existing components when adapting it through [frontend-design](../../implementation/frontend-design/SKILL.md); verify the implemented result through [visual-qa](../../review/visual-qa/SKILL.md) when implementation is in scope.

Planning does not automatically start a build loop, replace the design system, or authorize deployment. If the user asked for planning only, deliver the brief, concepts, and recommendation. If implementation is already authorized, continue from the agreed constraints without adding an approval ceremony.

## Source references

Selected Google guides are pinned under `references/upstream/` and remain unchanged. Their tool schemas and examples are historical reference material. The local workflow adapts their fixed paths, dependency assumptions, and broad process instructions to the target host. Read only the source section needed for the current mode; live tool schemas take precedence over snapshot examples.
