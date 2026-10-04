# Preparing a Stitch brief and prompt

Use [Google's prompt guide snapshot](upstream/enhance-prompt/guide.md) for prompt structure and [its keyword reference](upstream/enhance-prompt/references/KEYWORDS.md) when a vague component description needs clarification. Choose vocabulary that describes the intended layout; a navigation bar does not automatically become sticky or translucent.

## One shared brief

Capture only the information needed to make the screen useful:

- Product and audience; the user's main task and the screen's purpose.
- Required content and its order of importance, including the primary action.
- Existing brand and UI conventions, with source paths or supplied references.
- Target devices and relevant states, such as loading, empty results, validation, or expanded navigation.
- The design decision being tested and the constraints that each concept must respect.
- Unknowns that affect the result, distinguished from established requirements.

For a larger site, [Google's SITE.md snapshot](upstream/site-md/guide.md) can inform the scope and sitemap. Use the real framework and routes; its `site/public/` layout and build-loop backlog are examples. Do not add pages merely to fill a template.

If a design spec is useful, [Google's DESIGN.md snapshot](upstream/design-md/guide.md) describes palette roles, typography, geometry, elevation, and layout. Derive exact values from existing tokens when available. Proposed values for a new project should be identified as proposed. Avoid duplicating the repository's design system into a competing source of truth; link the established documentation and summarize what Stitch needs.

## Prompt structure

Use this as a flexible outline, omitting sections that do not apply:

```markdown
Design a [screen] for [audience] so they can [primary task].

Platform and viewport: [web/mobile, target viewport or device].
Primary action: [action and expected outcome].

Content and hierarchy:
1. [Region, required content, priority, and action].
2. [Region, required content, priority, and action].

Visual direction: [specific composition, density, rhythm, and reference qualities].
Existing design constraints: [brand rules and component behavior].
Relevant states and responsive intent: [what changes and what must remain usable].
Explore this decision: [the specific difference or uncertainty].
Preserve: [elements outside the requested change].
```

Use actual copy or accurately labeled placeholders. Describe the qualities learned from a reference; do not transplant another site's identity, claims, or assets.

**Design tokens depend on the destination.** If Stitch has an attached design system, reference its identifier and keep the screen prompt focused on layout, content, and behavior. If preparing a self-contained prompt for the web interface or a tool without design-system support, include the relevant palette, font, and shape rules. The pinned Google guides differ on this point because they cover different workflows. Do not universally ban or duplicate tokens.

For a targeted edit, specify the screen, region, required change, and preserved context. Do not restart the whole design for a small layout correction. For alternative concepts, vary a meaningful composition decision while keeping content and product requirements constant.

## Deliverable

Return the brief, the prompt, the decision to evaluate, and relevant assumptions. For a planning-only request, distinguish prepared prompts from actual generated screens. When saving is useful, choose the target repository's established documentation location; `.stitch/` is a fallback for Stitch-specific assets, not a mandatory project layout.
