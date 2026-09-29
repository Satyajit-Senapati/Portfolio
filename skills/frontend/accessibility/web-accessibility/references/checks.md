# Focused accessibility checks

This is a working checklist, not the complete standard. Criterion numbers refer to [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

- **Structure:** meaningful landmarks, page title, heading hierarchy, useful link names, alt text reflecting image purpose, decorative images ignored, table headers associated with data. See 1.1.1, 1.3.1, 2.4.2, 2.4.4, 4.1.2.
- **Keyboard/focus:** every operation reachable without a pointer; logical tab order; visible focus; no unintended trap; focus not entirely covered by sticky content. Modal focus enters the dialog, stays within it while modal, and returns appropriately when closed. See 2.1.1, 2.1.2, 2.4.3, 2.4.7, 2.4.11.
- **Contrast:** ordinary text 4.5:1; large text 3:1 (at least 18pt regular or 14pt bold); required control boundaries, states, and meaningful graphics 3:1 against adjacent colors. Evaluate applicable exceptions, not decorative boundaries. Test theme, hover, focus, error, and overlay backgrounds. See 1.4.3, 1.4.11.
- **Reflow and sizing:** resize text to 200%; test reflow at 320 CSS px wide, commonly equivalent to 400% zoom on a 1280px viewport. Preserve content and operations without two-dimensional scrolling except intrinsically two-dimensional content. Do not disable browser zoom. See 1.4.4, 1.4.10, 1.4.12.
- **Targets:** WCAG 2.2 AA uses 24 by 24 CSS px or sufficient spacing/other specified exceptions. Prefer roughly 44 by 44 for comfortable touch use; 44 is not the AA minimum. Provide a non-drag alternative where dragging is not essential. See 2.5.7, 2.5.8.
- **Forms:** persistent labels, useful input types/autocomplete, instructions before submission, errors programmatically associated with fields, retained input, and recoverable failures. Announce asynchronous status without unnecessarily moving focus. See 1.3.5, 3.3.1, 3.3.2, 3.3.3, 4.1.3.
- **Authentication:** permit password managers and paste; avoid memory/puzzle-only barriers without a compliant alternative. See 3.3.8.
- **Hover/focus content:** additional content must be dismissible, hoverable, and persistent where the criterion applies. No information accessible only on hover. See 1.4.13.
- **Motion/media:** respect reduced-motion preferences as a design baseline, provide pause controls for applicable moving content, avoid unsafe flashing, and supply applicable captions/alternatives. Reduced motion for interaction is also addressed by AAA 2.3.3; do not mislabel it as an AA criterion. See 1.2, 2.2.2, 2.3.1.

For custom tabs, menus, comboboxes, dialogs, and tree/grid widgets, consult the exact [ARIA APG pattern](https://www.w3.org/WAI/ARIA/apg/patterns/). A simple site navigation disclosure need not implement the application-menu pattern.
