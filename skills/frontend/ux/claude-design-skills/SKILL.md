---
name: claude-design-skills
description: UX process for research synthesis, information architecture, journeys, wireframes, component specifications, and design critique. Use for unresolved product flows or an explicitly requested design process.
---

# UX process

Apply [the shared contract](../../shared/contract.md). This adapter uses the MIT-licensed richhemsley3 collection, selected because its research-to-IA-to-journeys workflow matches this bundle's purpose. The name is not an Anthropic endorsement.

Select the stage that addresses the request. Read only its matching reference; do not execute all 18 upstream skills or their orchestrated pipeline by default.

| Need | Reference | Useful output |
| --- | --- | --- |
| Research plan or synthesis | [user researcher](references/upstream/user-researcher/guide.md) | Questions, observed evidence, assumptions, gaps |
| Navigation and hierarchy | [information architect](references/upstream/information-architect/guide.md) | Content model, grouping, labels, navigation |
| Journey and failure paths | [journey map](references/upstream/journey-map/guide.md) | Stages, actions, friction, recovery |
| Screen transitions | [UX flow planner](references/upstream/ux-flow-planner/guide.md) | Entry points, transitions, branches, exit states |
| Page layout | [wireframe](references/upstream/wireframe-agent/guide.md), then [page designer](references/upstream/page-designer/guide.md) if needed | Hierarchy and responsive state specification |
| Component specification | [component builder](references/upstream/component-builder/guide.md) | Props, states, content limits, keyboard behavior |
| Critique | [design critique](references/upstream/design-critique/guide.md) | Prioritized issues with evidence and proposed changes |

Reuse existing research and requirements. Distinguish observed behavior from hypotheses and proposed tests. Never invent interviews, sample sizes, quotations, or usability results. For simple UI changes, infer context from the repo and move directly to the relevant stage.

Upstream references may assume a `CLAUDE.md`, specific token files, diagram plugins, or another skill. Discover equivalent project resources; do not create those conventions just to satisfy a reference. Use plain Markdown or an available diagram tool when the requested output needs it. Do not launch subagents without task-level authorization.

Hand off a concise specification: user goal, key path and recovery, screen hierarchy, component states, accessibility/responsive behavior, and acceptance criteria. Implementation belongs to the implementation skill; the UX stage should not silently redesign the entire product.
