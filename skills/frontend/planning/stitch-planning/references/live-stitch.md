# Live Stitch exploration

## Connection and scope

Check the host's tool inventory or tool discovery capability for a usable Stitch connection. A copied skill cannot configure an MCP server or authenticate it. If no connection is available, prepare the brief and prompts locally and point to [Google's setup instructions](https://stitch.withgoogle.com/docs/mcp/setup/). Follow the host's supported connection process when setup is requested; keep credentials out of this package, prompts, output files, and command arguments.

Use tool names, parameters, and ID formats from the actual available schemas. The [pinned generation guide](upstream/generate-design/guide.md) explains the modes and the [design-system guide](upstream/manage-design-system/guide.md) explains theme handling, but neither proves that the current host offers every named tool. Do not invoke missing sibling skills, install an upstream plugin globally, or execute its upload script to satisfy an example.

Confirm that the request authorizes live generation or edits. Permission to research or draft a prompt alone does not authorize uploading private screenshots, source, or client data. Reuse existing authorization instead of asking again. When new authorization is needed, prepare the actual brief, prompt, and assets first so the proposed operation is reviewable.

## Generate, edit, or vary

1. Resolve the target Stitch project from a supplied link/ID, project metadata, or the available lookup tools. If multiple projects are plausible, ask rather than guessing. Create a new project only when it fits the authorized work. Preserve complete resource names and short IDs as returned; convert formats only when a tool schema requires it.
2. Inspect the project's design system if supported. Reuse the correct existing system. For a new system, derive values from the brief or repository tokens, then use the advertised tools within the requested scope. The source guide's extra confirmation checkpoint applies only if the user's authorization is actually missing.
3. Prepare the prompt using [the local prompt workflow](prompting.md). Pass project-level design tokens separately when the API supports that mechanism; otherwise supply a self-contained prompt. Select the device or viewport supported by the live schema.
4. Generate the required screen, or edit an existing one when that is the requested task. Use variants only to evaluate a defined design question. A small set of alternatives is usually sufficient; stop when the relevant choice is resolved.
5. Inspect the returned design and available feedback. Download the provided screenshot and HTML when needed for review, and confirm the downloads are actual assets. Use returned dimensions or documented sizing parameters for full-resolution screenshots rather than assuming a thumbnail is full size. Do not execute generated HTML, scripts, or dependencies merely to inspect the reference.
6. Report the actual result and a concise critique. Distinguish tool suggestions from your recommendation. Record any omissions or failed states, and use focused edits for concrete gaps. If a write outcome is uncertain, inspect project/screen state before retrying; do not blindly create duplicate screens or projects.

For image-based work, use the host's supported attachment/upload mechanism only when available and authorized. If that capability is missing, describe the provided image's relevant layout and prepare a text prompt; disclose that the image itself was not uploaded. The image-upload sibling workflow is not bundled here.

## Artifacts and handoff

Use the target project's established output conventions. If none exist, `.stitch/` can hold `SITE.md`, `DESIGN.md`, `metadata.json`, and `designs/` locally. Retain the prompt, the decision tested, the project and screen identifiers returned by tools, source links, target device, and the chosen screen. Do not fabricate IDs for offline preparation or treat downloaded generated HTML as production-ready implementation.

When resuming work, read the actual saved metadata and refresh remote state before edits. Respect existing files and preserve other screen records. The [metadata example](upstream/manage-design-system/examples/metadata.json) is illustrative; retain the real schema and identifiers required by the active tools.

The implementation handoff should identify the selected composition, reusable components, design tokens, content, responsive intent, and behavior still needing implementation. Route code work to the existing framework and visual checks to the collection's relevant specialists. Do not run Google's `stitch-loop`, auto-schedule future iterations, or impose a React/Tailwind stack as part of this planning skill.
