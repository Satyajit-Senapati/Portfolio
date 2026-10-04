# Portable frontend skills

A modular UI/UX collection with **13 selectable skills**, pinned upstream references, and offline data. The selector loads a small set for each task or phase. Specialist entrypoints can also be used directly. Google Stitch is an optional stage for visual concepts and planning handoff.

## Use in this repository

`AGENTS.md` routes frontend work to the selector. Native Codex entrypoints in `.agents/skills/` point to this bundle using relative links. Start a new session or refresh skill discovery if newly added skills are not visible in the current session.

Examples:

```text
Create a landing page using the frontend collection.
Use $taste-skill and $frontend-design to refine this page.
Use $responsive-design to fix the mobile layout.
Use $design-motion-principles to improve menu transitions.
Use $web-design-guidelines and $web-accessibility to audit the UI.
Use $react-best-practices to investigate slow dashboard filtering.
Use $visual-qa to check the changed page across viewports.
Use $stitch-planning to prepare initial UI concepts and prompts before implementation.
```

Selection is performed by the coding agent using the [selector](frontend-selector/SKILL.md), not by a background service or keyword-only script. Normal automatic skill selection stays enabled. An explicitly named specialist does not require loading the selector or other unrelated skills.

## Copy to another repository

### Copy-only setup for Codex

Copy these two directory trees into the target repository, preserving their relative locations:

```text
target-repo/
  skills/frontend/       Complete portable bundle
  .agents/skills/        Generated Codex entrypoints from this package
```

The entrypoints contain relative Markdown links, so the target repo can live on a different drive or machine. No global skill installation is needed. Include the full bundle, its hidden files, source references, scripts, licenses, and lock file. Merge the package's named entrypoint folders with any existing `.agents/skills/` folders; inspect conflicting files rather than overwriting a different skill with the same name. A new session or discovery refresh may be needed.

The selector is discoverable automatically. For explicit project routing, merge this portable paragraph into the target's existing `AGENTS.md` if useful:

```markdown
For frontend creation, redesign, UX planning, responsive work, motion, or UI review,
read skills/frontend/frontend-selector/SKILL.md and load only the relevant specialists.
Read this project's instructions and design documentation before changing conventions.
```

Keep that project's framework, commands, tokens, and other conventions in its own instructions. Copying this portfolio's whole `AGENTS.md` or design docs would carry project-specific settings into the new repo.

### Generate entrypoints when needed

If copying only the bundle, using a different directory layout, or targeting Claude Code:

1. Copy the **entire `skills/frontend/` directory** to the same location in the target repository, including hidden files, references, scripts, and the lock file.
2. From the target repository root, run:

   ```sh
   node skills/frontend/scripts/install.mjs --repo .
   node skills/frontend/scripts/validate.mjs
   ```

3. Refresh the agent's skill discovery or start a new session. Use a named skill or ask for frontend work normally.

No skill text or project settings need editing. Node 20+ is used by the installer/validator; the Markdown instructions themselves need no runtime. You can place the complete bundle elsewhere *inside* the repo and invoke its installer from there with `--repo` pointing at the target root. Relative links are calculated automatically, including paths with spaces. Do not install into a different repository before copying the bundle there.

For Claude Code, use the same bundle and run:

```sh
node skills/frontend/scripts/install.mjs --repo . --agent claude
```

This creates flat `.claude/skills/` entrypoints. The default creates flat `.agents/skills/` entrypoints for Codex, avoiding reliance on nested category discovery. Commit the bundle and generated entrypoints together. The installer does not modify existing `AGENTS.md`, `CLAUDE.md`, package manifests, or global settings. It is idempotent and refuses any differing existing skill before writing entrypoints. To reconcile a conflicting or changed wrapper, review and back up that file yourself before reinstalling; there is no overwrite flag.

For other agents, configure their instruction entrypoint to read `skills/frontend/frontend-selector/SKILL.md`, or open the desired specialist directly. Automatic discovery depends on that host's supported skill location. A folder copy alone does not configure every coding agent.

## Collection

```text
frontend/
  frontend-selector/
  art-direction/taste-skill/
  ux/ui-ux-pro-max/
  ux/claude-design-skills/
  planning/stitch-planning/
  implementation/frontend-design/
  motion/design-motion-principles/
  accessibility/web-accessibility/
  responsive/responsive-design/
  design-system/project-design-system/
  performance/react-best-practices/
  review/web-design-guidelines/
  review/visual-qa/
  shared/contract.md
  scripts/
  catalog.json
  sources.lock.json
```

The `project-design-system` skill discovers tokens and components from whichever repository is being edited. Portfolio-specific context lives outside the bundle in this repo's `AGENTS.md` and design documentation. It will not carry this site's palette, framework, port, or file layout into another project.

## Where Stitch fits

Use the product brief and required flows to frame the task, then use Stitch to explore screen composition when visual alternatives will help. The intended sequence is brief → optional Stitch concepts → design handoff → implementation → verification. A small UI correction can go directly to implementation.

`stitch-planning` is a portable adapter around selected guides from [Google's official Stitch skill collection](https://github.com/google-labs-code/stitch-skills), pinned with their Apache-2.0 license. It supports local briefs and prompts, live screen exploration through available tools, and design handoff. It works with any target framework; it does not select React, Tailwind, shadcn, or a static HTML layout for the project.

Copying the files makes the **skill instructions** available. Generating or editing real screens also requires a Stitch connection and authentication configured in the host environment; follow [Google's MCP setup instructions](https://stitch.withgoogle.com/docs/mcp/setup/). Connections and credentials are not copied with the bundle. Without them, the adapter produces a brief and ready-to-use prompt and clearly reports that no live screen was generated.

Examples:

```text
Use $stitch-planning to turn this brief into a prompt I can paste into Stitch.
Use $stitch-planning with the connected Stitch tools to compare two dashboard layouts.
Use $stitch-planning to document the chosen screen for implementation in this repo's stack.
```

The official Stitch plugins offer a larger service integration and build suite. This package includes the planning references it needs, with host-aware instructions; automatic build loops, React converters, upload scripts, and global installers are outside its scope.

## Upstream content and tools

These are **portable adapters**, not unmodified upstream installations. Actual source snapshots, rule files, the UI UX Pro Max CSV catalogs and Python search engine, and their notices are bundled as on-demand references. Upstream `SKILL.md` files are stored as `guide.md` to avoid duplicate skill registration. The [shared contract](shared/contract.md) resolves conflicting style prescriptions, tool assumptions, and scope expansion. No upstream installer or script is run automatically.

See [source provenance and the linked-skill assessment](SOURCES.md) for pinned commits, licenses, selection rationale, and limitations. The `frontend-design-complete` repository was reviewed but is not redistributed. The bundle does not fetch updates at task time unless the task specifically calls for current references.

UI UX Pro Max's original search requires Python 3. If it is unavailable, the included Node fallback searches complete CSV records without dependencies:

```sh
node skills/frontend/scripts/search-data.mjs ux "keyboard focus modal"
node skills/frontend/scripts/search-data.mjs stack:react "render state"
```

The fallback uses simple token ranking; it is not equivalent to upstream BM25 search or its design-system reasoning. Browsers, Playwright, axe, and screen readers are optional capabilities provided by the host/project. The [visual-QA skill](review/visual-qa/SKILL.md) includes a Playwright recipe and an available-browser workflow; installing this collection does not install those tools.

## Validate and maintain

```sh
node skills/frontend/scripts/validate.mjs
node --test skills/frontend/scripts/collection.test.mjs
```

In this repository, `npm run check:skills` runs both. Tests cover relocation, copy-only reuse, native link resolution, idempotent installation, refusal to overwrite existing skills, source tampering, and offline CSV search. Test fixtures are written to new directories in the OS temporary folder. The validator checks the collection's deliberately small frontmatter schema, catalog, authored local links, immutable source hashes, and presence of license notices. It does not validate agent behavior, external URLs, live Stitch calls, or the applicability of every upstream recommendation.

To update a source, review an explicit upstream commit, its license, and changed files. Replace only that snapshot and update the corresponding paths/hashes in `sources.lock.json`; record meaningful adapter changes in the source notes. Re-run validation and relevant behavior scenarios. Keep upstream bytes unchanged; `.gitattributes` protects snapshot hashes from line-ending conversion. Do not silently track mutable `main` content.

Local adapter instructions and helper scripts use the [collection MIT license](LICENSE). Third-party references retain their respective licenses and notices; preserve them when copying.
