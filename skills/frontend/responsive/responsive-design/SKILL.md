---
name: responsive-design
description: Fix or design layouts across mobile, tablet, desktop, zoom, and input modes. Use for overflow, breakpoint failures, navigation collapse, and content reflow.
---

# Responsive design

Apply [the shared contract](../../shared/contract.md). Inspect the failing viewport, affected components, parent sizing, and current breakpoints before changing layout. Preserve the task's content hierarchy across widths.

Diagnose the constraint: fixed width/min-width, intrinsic grid or flex sizing, unbroken text, absolute positioning, oversized media, nested scroll containers, or viewport-height assumptions. Fix that constraint instead of hiding page overflow. Use `min-width: 0`, `minmax(0, 1fr)`, wrapping, logical properties, or bounded fluid sizing where they address the cause.

Let content determine breakpoints. Keep existing ones unless evidence shows failure. Validate just below and above each changed breakpoint, not only named devices. Start with 320, 390, 768, 1024, and 1440 CSS px as a sampling matrix, then adjust to the actual app.

At narrow widths, preserve essential actions and content, reflow navigation, allow controls/text to wrap, and give tables/diagrams an intentional labeled scroll region if their relationships need two dimensions. Do not shrink all text or hide essential columns as a universal fix.

Check touch targets, keyboard operation, orientation, long/localized strings, media aspect ratios, safe areas, sticky headers, and virtual-keyboard obstruction where applicable. Prefer current viewport units with fallback when full-height panels need them. Test 200% text resize and 320px-equivalent reflow; viewport emulation alone does not prove real-device behavior.

Implement the smallest coherent change, run existing checks, and inspect the affected states at narrow/intermediate/wide sizes. Capture evidence through visual QA when available. Report which widths/states were actually verified.
