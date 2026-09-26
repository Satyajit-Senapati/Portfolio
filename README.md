<p align="center">
  <img src="./public/favicon.svg" width="88" height="88" alt="Satyajit Senapati monogram">
</p>

<h1 align="center">Satyajit Senapati</h1>

<p align="center">
  A portfolio for a Lead Data & AI Engineer building scalable data platforms, intelligent search, and production AI applications.
</p>

<p align="center">
  <img alt="GitHub Pages ready" src="https://img.shields.io/badge/GitHub%20Pages-ready-087d83?style=flat-square&logo=github&logoColor=white">
  <img alt="React 19" src="https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react&logoColor=white">
  <img alt="Strict TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178c6?style=flat-square&logo=typescript&logoColor=white">
  <img alt="Dark, light and system themes" src="https://img.shields.io/badge/themes-dark%20%7C%20light%20%7C%20system-263641?style=flat-square">
</p>

<p align="center">
  <a href="#overview">Overview</a> ·
  <a href="#run-locally">Run Locally</a> ·
  <a href="#validation">Validation</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#deployment">Deployment</a> ·
  <a href="#content">Content</a>
</p>

---

## Overview

This site presents Satyajit's work through a concise engineering narrative. It combines résumé-verified experience with interactive reference architecture patterns and product explorations from the supplied portfolio brief. The design uses a restrained graphite and teal visual system, responsive editorial layouts, and purposeful motion.

| Area | What it shows |
| --- | --- |
| **Identity** | Lead Data & AI Engineer positioning and an original data-to-AI hero diagram |
| **Expertise** | Domain-based skills across data engineering, Azure, AI/search, and software delivery |
| **Experience** | A compact career timeline with expandable contributions and technologies |
| **Architecture Lab** | Selectable cloud data platform, RAG, and production delivery patterns |
| **Projects** | InterviewOS, NEVRI, and [Orqalis](https://github.com/Satyajit-Senapati/Orqalis) |
| **GitHub & Knowledge** | Curated links to [PracticeLab](https://github.com/Satyajit-Senapati/PracticeLab) and [Applied AI Notes](https://github.com/Satyajit-Senapati/Applied-AI) |
| **Contact** | Email, [GitHub](https://github.com/Satyajit-Senapati), and [LinkedIn](https://www.linkedin.com/in/satyajit-senapati-007/) |

The site is static at runtime. It needs no backend, API key, analytics service, or live GitHub API request.

## Run Locally

### Requirements

- Node.js **24** recommended
- npm

### Start the Site

```powershell
npm.cmd ci
npm.cmd run dev
```

Open [http://localhost:4000/](http://localhost:4000/). On macOS or Linux, use `npm` in place of `npm.cmd`.

## Validation

Run the project gate before a release:

```powershell
npm.cmd run validate
```

This runs ESLint, strict TypeScript compilation, a Vite production build, and checks for broken internal targets and missing published assets. The output is written to `dist/`. There is no test suite yet; the site has no backend or data mutation workflow.

To inspect the production build locally:

```powershell
npm.cmd run preview
```

## Architecture

| Area | Implementation |
| --- | --- |
| Application | React 19, strict TypeScript, and Vite |
| Content | Typed, version-controlled records in `src/content/portfolio.ts` |
| Presentation | Semantic components in `src/App.tsx` and CSS design tokens in `src/styles.css` |
| Interactions | Native disclosure for experience/projects, selectable architecture stages, mobile menu, email copy |
| Appearance | Dark, light, and system modes; preference stored in browser local storage |
| Accessibility | Skip link, visible focus, semantic sections, keyboard controls, and reduced-motion support |
| Metadata | Open Graph card, Twitter card, Person structured data, canonical URL, sitemap, and robots file |

The Architecture Lab diagrams are **reference patterns**, not public diagrams of a client's private infrastructure. See [architecture and design notes](docs/architecture.md) for the visual system and responsive strategy.

## Deployment

The [GitHub Actions workflow](.github/workflows/deploy.yml) publishes `dist/` to GitHub Pages after a push to `main`:

```text
push to main → npm ci → lint → TypeScript + Vite build → site checks → Pages metadata → deploy
```

1. Push this directory to the [Portfolio repository](https://github.com/Satyajit-Senapati/Portfolio) on `main`.
2. In **Settings → Pages**, select **GitHub Actions** as the build and deployment source.
3. Open the workflow run to find the deployed URL after it succeeds.

Vite uses a relative asset base, so the build works at a project Pages path or a user Pages root. The deployment step writes the correct absolute social image, canonical, sitemap, and robots URLs for the repository. If the site later uses a custom domain, set the repository variable `SITE_URL` to its final HTTPS URL and redeploy. The site has one route, so anchors and page refreshes need no routing fallback.

## Content

| Change | File |
| --- | --- |
| Experience, skills, projects, architecture patterns, contact links | `src/content/portfolio.ts` |
| Section structure and interactions | `src/App.tsx` |
| Themes, layout, and responsive rules | `src/styles.css` |
| Browser metadata and structured data | `index.html` |
| Downloadable résumé | `public/Satyajit-Senapati-Resume.pdf` |
| Social preview artwork | `public/og.png` |

The résumé lives in `public/Satyajit-Senapati-Resume.pdf` and is linked for download in the hero and footer, with a view link in Experience. It includes contact information, so review it before deploying. InterviewOS and NEVRI repository/demo links are intentionally pending confirmation; Orqalis links to its verified public repository.

## Project Structure

```text
src/
  App.tsx                  page sections and interactions
  content/portfolio.ts     typed portfolio content
  styles.css               design tokens, themes, and responsive layout
public/
  favicon.svg              site monogram and header logo
  og.png                   social preview card
  Satyajit-Senapati-Resume.pdf
scripts/prepare-pages.mjs  deployment metadata generation
.github/workflows/deploy.yml
docs/architecture.md
```
