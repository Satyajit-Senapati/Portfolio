---
name: frontend-selector
description: Select a small set of frontend skills for UI creation, redesign, UX planning, responsive fixes, motion, or UI audits. Use for mixed frontend tasks or when no specialist is named.
---

# Frontend skill selector

Select skills by the requested outcome. Read the selected SKILL.md files only; do not concatenate this collection or its upstream references. An explicit specialist request can bypass this router.

Read [the shared contract](../shared/contract.md) once. Inspect the target repository's manifest, relevant UI files, and existing design documentation. Treat the repository being worked on as the project root; never infer it from this skill's installation directory.

## Routing

The first skill in each row owns the task. The others provide focused input, not competing plans.

| Request | Load for this phase |
| --- | --- |
| Create a landing page | [frontend-design](../implementation/frontend-design/SKILL.md), [taste-skill](../art-direction/taste-skill/SKILL.md), [ui-ux-pro-max](../ux/ui-ux-pro-max/SKILL.md) |
| Make a page look premium / improve hierarchy | [taste-skill](../art-direction/taste-skill/SKILL.md), [frontend-design](../implementation/frontend-design/SKILL.md) |
| Plan research, IA, journeys, or a multi-screen flow | [claude-design-skills](../ux/claude-design-skills/SKILL.md); add [ui-ux-pro-max](../ux/ui-ux-pro-max/SKILL.md) when choosing interaction patterns |
| Plan or compare visual concepts with Google Stitch | [stitch-planning](../planning/stitch-planning/SKILL.md); add [taste-skill](../art-direction/taste-skill/SKILL.md) only for an unresolved art direction decision |
| Build a dashboard, form, or product UI | [frontend-design](../implementation/frontend-design/SKILL.md), [ui-ux-pro-max](../ux/ui-ux-pro-max/SKILL.md); add process only for unresolved journeys |
| Fix mobile/tablet layout | [responsive-design](../responsive/responsive-design/SKILL.md), [ui-ux-pro-max](../ux/ui-ux-pro-max/SKILL.md), [web-design-guidelines](../review/web-design-guidelines/SKILL.md) for affected layout checks |
| Improve or review animations | [design-motion-principles](../motion/design-motion-principles/SKILL.md) |
| Audit the entire UI | [web-design-guidelines](../review/web-design-guidelines/SKILL.md), [web-accessibility](../accessibility/web-accessibility/SKILL.md), [ui-ux-pro-max](../ux/ui-ux-pro-max/SKILL.md); browser evidence in a separate visual-QA phase |
| Fix keyboard, semantics, contrast, or ARIA | [web-accessibility](../accessibility/web-accessibility/SKILL.md) |
| Optimize React / Next dashboard | [react-best-practices](../performance/react-best-practices/SKILL.md), [web-design-guidelines](../review/web-design-guidelines/SKILL.md) for interaction regressions |
| Change tokens, themes, shared components, or system consistency | [project-design-system](../design-system/project-design-system/SKILL.md) |
| Screenshot comparison / viewport regression | [visual-qa](../review/visual-qa/SKILL.md) |
| Small copy edit, backend-only task, or build configuration | No design skill unless the task actually needs one |

Usually load one to three specialists per phase. Read project tokens without automatically activating the design-system skill; use that skill when changing or documenting the system. Responsive and accessible implementation remain a baseline even if their full audit skills are not selected.

Stitch is an optional visual prototype phase after the product brief. Select it when requested or when available Stitch tools fit the user's design task; do not route every frontend task through it. Without a connection, it can prepare local briefs and prompts. Planning alone does not start implementation or a build loop.

## Execute

State the selected skills and their purpose briefly. Distinguish implement/fix from review-only; an audit produces findings unless fixes were requested. Keep one short design brief shared across the selected skills: audience, primary task, existing constraints, intended changes, and observable success criteria. Do not make each skill repeat research or request the same approval.

For multi-phase work, finish the relevant design/implementation phase, then load visual QA to verify the changed states. Release irrelevant reference material between phases where the host supports it. Explain any additional skill selection in terms of a concrete unresolved issue.
