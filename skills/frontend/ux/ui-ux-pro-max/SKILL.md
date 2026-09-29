---
name: ui-ux-pro-max
description: Select UX patterns, typography, color roles, charts, and component behavior using bundled UI UX Pro Max data. Use when a design decision needs pattern research or a usability review.
---

# UI UX Pro Max

Apply [the shared contract](../../shared/contract.md). The real upstream data, search engine, and references are bundled under [references/upstream](references/upstream/guide.md). Do not read the entire database into context or assume recommendations are user-research findings.

Identify the product type, audience, primary task, actual framework, and existing design system. Search one focused concern at a time: e.g. `keyboard focus modal`, `dashboard comparison`, or `portfolio typography`. Read the returned rows in context, then choose and justify a pattern against the current UI.

## Offline search

Python 3 is optional. From the project root, with this bundle at its default location:

```sh
python skills/frontend/ux/ui-ux-pro-max/references/upstream/scripts/search.py "keyboard focus modal" --domain ux --json
python skills/frontend/ux/ui-ux-pro-max/references/upstream/scripts/search.py "render state" --stack react --json
```

Use the available Python executable (`python3` or `py -3` where appropriate). For a bundle elsewhere, resolve the script from this SKILL.md instead of using an upstream `.claude/skills` path. Do not install Python just to use this skill.

If Python is unavailable, the dependency-free Node fallback searches a selected CSV and returns matching complete records (simple token ranking, not the upstream BM25/reasoning engine):

```sh
node skills/frontend/scripts/search-data.mjs ux "keyboard focus modal"
node skills/frontend/scripts/search-data.mjs stack:react "render state"
```

Without either runtime, search the relevant local CSV directly. `references/upstream/data/` contains styles, typography, colors, landing patterns, products, charts, UX guidance, motion, and stack-specific tables. Read [quick-reference](references/upstream/references/quick-reference.md) only for the relevant topic; native-app pro rules do not automatically apply to web pages.

## Apply

For a new interface, establish semantic color roles, a legible type scale, content density, navigation, primary actions, and necessary empty/loading/error/success states. For an existing interface, keep its vocabulary and token system. Validate actual rendered contrast and behavior; a dataset's accessibility label is not proof.

Upstream `--design-system` can propose a system when requested. Avoid `--persist` for a lookup; when persistence is useful, point `--output-dir` explicitly at the target repository and honor existing design docs. Treat suggested libraries as options, not install instructions. Return chosen patterns, rationale, and relevant tradeoffs, then implement or report according to the request.
