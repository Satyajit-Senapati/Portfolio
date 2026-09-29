---
name: web-accessibility
description: Implement or review keyboard access, semantics, focus, contrast, forms, and ARIA against WCAG 2.2 AA. Use for accessibility issues or an explicit accessibility audit.
---

# Web accessibility

Apply [the shared contract](../../shared/contract.md). Use WCAG 2.2 AA as the baseline unless the project specifies another target. Read the [focused checks](references/checks.md) for affected controls. Consult the [W3C quick reference](https://www.w3.org/WAI/WCAG22/quickref/) and [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/) for exact criteria or custom-widget patterns; distinguish normative requirements from recommendations.

Trace the primary task with keyboard only. Verify names, roles, states, reading order, focus entry/exit, unobscured focus, and error recovery. Use native controls where possible. Extra ARIA does not repair incorrect semantics; compare custom-widget behavior to its intended pattern.

Measure text and non-text contrast in actual themes and states. Check zoom/reflow, text resizing, long content, touch targets, motion preferences, and non-color signals. Include forms, status messages, media alternatives, and authentication when present.

Use an existing axe or equivalent scanner when available, then manually check behavior. Record browser, route/state, test method, criterion, and evidence. Do not report screen-reader success without exercising a screen reader, or claim full WCAG conformance from automated checks.

For review requests, prioritize blocked tasks and report findings with source locations, reproduction, user impact, and a fix. For fix requests, change the smallest appropriate semantic/behavioral layer and retest the same path.
