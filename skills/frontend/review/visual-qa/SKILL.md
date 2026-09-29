---
name: visual-qa
description: Verify rendered UI with browser interaction, screenshots, viewport coverage, and visual regression comparisons. Use after substantial UI changes or for an explicit visual QA request.
---

# Visual QA

Apply [the shared contract](../../shared/contract.md). Discover the app's documented start command, port/base path, and existing browser/test tooling. Use the available browser tool or existing Playwright setup. Do not assume a browser capability exists because this skill is installed.

Define a small matrix from the changed behavior: representative routes, narrow/intermediate/wide widths, affected themes, and important interaction states. For responsive changes include 320px and breakpoint boundaries. For motion include reduced motion. Do not multiply every possible state without a concrete risk.

1. Open the running app and check console errors and failed assets.
2. Exercise the primary changed interaction with pointer and keyboard, including focus restoration and error/recovery where relevant.
3. Wait for fonts, relevant images, and an observable ready state. Use stable data, timezone/locale, and a consistent browser for comparisons. Do not rely on arbitrary sleeps.
4. Capture meaningful screenshots and inspect them, including below the fold and open menus/dialogs. Check clipping, wrapping, overlap, alignment, hierarchy, contrast, missing assets, and horizontal overflow.
5. Compare against a reviewed baseline or the user's reference. Separate expected design changes from regressions. Do not update baseline images just to make tests pass.

Use [the Playwright recipe](references/playwright.md) when adding or running screenshot regression tests. If Playwright is unavailable, an available browser's screenshots plus recorded viewport/state checks are useful evidence. If no browser is available, complete static checks and clearly identify the unverified visual/interaction work; never fabricate screenshots or install a browser automatically.

Store artifacts in the target project's established test/report folder or an ignored task-output directory. Report the app/build tested, browser, routes, widths, states, findings/fixes, artifact locations, and coverage gaps. A screenshot pass is not a substitute for interaction or accessibility testing.
