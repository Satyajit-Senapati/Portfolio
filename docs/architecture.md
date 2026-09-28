# Portfolio architecture and design

## Experience

The page moves from personal identity to selected products, about, capabilities, career context, reference architectures, engineering principles, and contact. Products appear early so visitors can quickly reach real work. The architecture lab provides technical depth without presenting a client-specific diagram as public documentation. Its patterns are based on technologies and workflows named in the resume.

## Components and content

`src/App.tsx` contains the page sections and the small interactions: navigation, theme preference, experience disclosure, architecture stage selection, and email copy. `src/content/portfolio.ts` holds the editable data, including the DataRevia and NEVRI live app links and the Orqalis and PracticeLab repository links. The resume is stored in `public/` and served for viewing and download.

## Visual system

The interface uses ink surfaces, soft lilac, and warm ivory. Self-hosted Manrope provides a consistent type hierarchy. An original geometric Folded S logo and a custom digital avatar create a personal identity. Orbital linework around the portrait, restrained ambient light, and a dotted architecture canvas add texture without competing with content. Featured products use real public website captures in browser frames.

Theme colors are CSS custom properties. The content width is capped at 1240px. At 1050px, the navigation becomes a menu to avoid a cramped tablet header. At 760px, the hero and project rows become vertical, architecture stages become a sequence, and contact is simplified. Below 600px, expertise uses one column for readable descriptions and technologies. All layouts work down to 320px.

Body, supporting, and caption text use shared 15px, 13px, and 12px tokens. Expertise cards share grid rows through CSS subgrid so text wrapping cannot misalign their headings or technology dividers. Local project cards use flexible vertical layouts to keep repository actions aligned. Small icon controls have a minimum 44px target size.

## Capitalization and Text Weight

Headings, navigation, buttons, and technology labels use Title Case. Articles, conjunctions, and prepositions stay lowercase within a title, as in “Intelligent Systems from Data to AI” and “Design for Real Use.” A visual line break does not start a new title. Short section eyebrows use uppercase as a consistent visual treatment.

Descriptions, contribution bullets, and status feedback use sentence case. Generic terms such as fact tables, dimension models, and bronze layers are lowercase in prose. Preserve product names and technical spelling: DataRevia, NEVRI, Orqalis, PracticeLab, GitHub, LinkedIn, PySpark, OpenAI, scikit-learn, and .NET. Use “Resume” throughout.

Manrope weight tokens distinguish body copy (450), supporting labels (500), controls (600), headings (650), and primary actions (700). The hero accent inherits its heading weight; color supplies emphasis. Avoid browser-default bold or automatic CSS capitalization for content.

## Motion and Accessibility Behavior

Motion is limited to brief entry reveals and hover/focus feedback. There is no perpetual animation, typewriter, or custom cursor. The site respects `prefers-reduced-motion`. It uses native links, buttons, and disclosure elements, a skip link, visible focus styles, and semantic sections. The theme preference persists locally and follows system changes when set to **System**. The menu closes on Escape, outside click, or navigation. Email copy reports success or a useful fallback without silently opening another app.

## Assets and performance

The avatar was generated from the owner’s supplied photo; the original photograph is not published. WebP delivery copies reduce image transfer size while the high-resolution PNG assets remain available. Product screenshots are lazy-loaded, while the hero portrait is preloaded with high fetch priority. The variable font is local and preloaded. React and CSS provide the interactions without an animation or component framework. Asset provenance, the image prompt, and brand rules are recorded in [design research](design-research.md).

## Deployment

Vite uses a relative base path to support both user and project GitHub Pages sites. The deployment workflow builds static files and runs `scripts/prepare-pages.mjs` to add the repository-specific canonical URL, social image URL, sitemap, and robots metadata. No application server or runtime secrets are needed.
