# Redesign Review

Reviewed on 28 September 2026 against the local development and production builds.

## Layout and Interaction Checks

- Dark and light themes at 320, 390, 820, 1024, and 1440 CSS pixels: no horizontal overflow.
- Visual review of the hero, project showcases, about, expertise, experience, architecture, principles, and contact across desktop, tablet, and mobile.
- Header navigation collapses before tablet links become crowded.
- Mobile menu opens, closes on navigation and Escape, and returns keyboard focus to its toggle on Escape.
- Native product disclosure opens with Enter.
- Architecture pattern and stage selection update the detail content and pressed states.
- Theme preference persists after reload.
- Reduced-motion mode keeps content visible and disables smooth scrolling and transitions.
- Email copy displays its success feedback.
- Resume returns HTTP 200 with a valid PDF signature; view and download links share the same published PDF.
- Avatar and both product previews load successfully; font is available locally.
- Internal anchors and heading associations resolve; one page-level heading.
- No browser runtime errors in the reviewed states.
- DataRevia and NEVRI public sites were opened and captured. Local tools retain their public repository links; private product repositories are not exposed.

## Production Audit

Lighthouse 12.8.2, default mobile simulation, local Vite production preview:

| Category / Metric        | Result    |
| ------------------------ | --------- |
| Performance              | 97 / 100  |
| Accessibility            | 100 / 100 |
| Best Practices           | 100 / 100 |
| SEO                      | 100 / 100 |
| First Contentful Paint   | 1.4 s     |
| Largest Contentful Paint | 2.3 s     |
| Cumulative Layout Shift  | 0         |
| Total Blocking Time      | 120 ms    |

The initial large PNG delivery was replaced with WebP copies: avatar approximately 79 KB, DataRevia preview 52 KB, and NEVRI preview 53 KB. The avatar and font are preloaded. High-resolution generated/screenshot sources are retained. Scores are a local lab result; production network and device conditions vary.

## Release Gate

`npm run validate` passes ESLint, TypeScript, the production build, internal target checks, required asset checks, and structured-data parsing. GitHub Pages uses the existing relative-base deployment workflow.
