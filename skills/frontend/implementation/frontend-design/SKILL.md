---
name: frontend-design
description: Implement production frontend pages and components with intentional visual design. Use for new UI and substantive UI redesigns in the repository's existing framework.
---

# Frontend implementation

Apply [the shared contract](../../shared/contract.md). Read the pinned [Anthropic Frontend Design guide](references/upstream/guide.md) for design planning, implementation, and critique. It is retained under its [Apache 2.0 license](references/upstream/LICENSE.txt); this entrypoint is a portable adapter.

Inspect the existing framework, components, styling strategy, assets, routes, and validation scripts. Establish the audience, primary action, real content, and visual direction from the request and project. Resolve only consequential unknowns; do not reopen choices already made by the user or art-direction phase.

Implement a complete vertical slice with actual navigation and state behavior. Use existing components and tokens. Keep data/content separate when that matches the architecture. Provide relevant loading, empty, error, disabled, and success states; avoid dead buttons and invented backend behavior. Semantic HTML and native controls come first; custom interactions need explicit keyboard and focus behavior.

Build layout from content constraints: fluid sizing, sensible measures, flexible grids, resilient long text, and content-driven breakpoints. Check theme variants, focus visibility, reduced motion, image dimensions, and loading priorities. Do not migrate frameworks or add animation/component packages merely because an upstream example uses them.

Run the target repository's relevant lint/build/tests. Review rendered narrow and wide layouts when possible and exercise the changed primary interaction. For screenshot regression or a larger UI change, hand off to visual QA. Report the completed behavior and the checks actually run, including any browser gap.
