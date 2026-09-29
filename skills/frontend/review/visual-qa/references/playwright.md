# Playwright regression recipe

Use an existing Playwright test setup first. When creating tests is within scope, use the project's package manager and installed `@playwright/test` version. This collection does not install packages or browser binaries. Confirm the app URL/base path and test directory from the target project.

This example belongs in the target project's test directory; adapt routes and the ready condition to its UI. Keep assertions tied to user-observable behavior.

```js
import { test, expect } from '@playwright/test';

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`page at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    // Requires the target project's configured baseURL.
    await page.goto('/');
    await expect(page.getByRole('main')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow).toBe(false);
    await expect(page).toHaveScreenshot(`page-${width}.png`, {
      fullPage: true,
      animations: 'disabled',
    });
  });
}
```

Add application-specific assertions for open navigation, theme changes, form errors, or dialogs. Wait for relevant images to load and for reveal/lazy content to settle before capturing those states; a full-page screenshot alone may not trigger every lazy asset. Test real motion separately since disabled-animation snapshots cannot validate timing or interruption.

Create initial baselines only after visually reviewing them. Fix browser/OS/font versions in CI when consistent pixel comparisons matter. Set a justified tolerance for rendering noise rather than masking meaningful content. Keep before/after/diff artifacts for unexpected changes.

Reference: [Playwright visual comparisons](https://playwright.dev/docs/test-snapshots). Consult current official docs before choosing version-specific configuration or CLI flags.
