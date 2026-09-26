# Portfolio architecture and design

## Experience

The site tells a short engineering story: positioning, capabilities, career context, reference architectures, product explorations, engineering principles, and contact. The architecture lab provides technical depth without presenting a client-specific diagram as public documentation. Its patterns are based on technologies and workflows named in the résumé.

## Components and content

`src/App.tsx` contains the page sections and the small interactions: navigation, theme preference, experience disclosure, architecture stage selection, and email copy. `src/content/portfolio.ts` holds the editable data. A project can gain `repository` and `demo` URLs after they are confirmed; the UI currently shows a clear pending-link note. The résumé is stored in `public/` and served for viewing and download.

## Visual system

The interface uses graphite/navy surfaces, cool silver text, and restrained teal to emphasize interactions and the data-flow motif. Typography, fine rules, generous spacing, and one architectural hero diagram provide the identity. Both themes use dedicated color tokens. CSS breakpoints reshape the page at tablet and mobile widths; the architecture flow becomes a vertical sequence on small screens.

## Motion and accessibility

Motion is limited to entry reveals, quiet data-flow movement, and hover/focus feedback. The site respects `prefers-reduced-motion`. It uses native links, buttons, and disclosure elements, a skip link, visible focus styles, and semantic sections. The theme preference persists locally and follows the system setting when set to **system**.

## Deployment

Vite uses a relative base path to support both user and project GitHub Pages sites. The deployment workflow builds static files and runs `scripts/prepare-pages.mjs` to add the repository-specific canonical URL, social image URL, sitemap, and robots metadata. No application server or runtime secrets are needed.
