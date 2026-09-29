---
name: project-design-system
description: Discover, maintain, and document the target repository's design tokens, themes, component contracts, and spacing conventions. Use for design-system changes or consistency work.
---

# Project design system

Apply [the shared contract](../../shared/contract.md). This skill contains no portfolio-specific palette or component names. Discover the target project's authoritative sources each time: applicable agent instructions, design/architecture docs, CSS variables, theme configuration, component primitives, and representative screens.

Build a compact map of semantic color roles, typography roles, spacing, radii/elevation, layout widths, breakpoints, motion, and component states. Record source paths. Distinguish observed conventions from proposed additions; documentation can be stale, so inspect actual code and flag discrepancies.

Reuse existing tokens before introducing values. If a new role is necessary, name it by purpose and provide values for supported themes. Keep semantic aliases separate from raw scales when the project follows that pattern. Avoid turning every one-off dimension into a global token.

For shared components, preserve accessibility contracts, variants, content limits, responsive rules, and public APIs. Check representative consumers before changing a token or primitive. Resolve inconsistent local overrides at their source instead of adding another override layer.

For a new system, derive a small initial set from real screens; do not generate an exhaustive library without consumers. Store project decisions in the target repo's existing design docs (or a clearly named new document if none exists). Keep this portable collection unchanged when adapting to a new project.

Deliver the changed token/component map, affected consumers, and validation across relevant themes, states, and widths.
