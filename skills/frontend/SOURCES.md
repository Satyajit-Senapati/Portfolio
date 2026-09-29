# Sources and adaptation notes

Reviewed and retrieved on 2026-09-29. `sources.lock.json` records immutable commits, upstream-to-local paths, and SHA-256 digests for every vendored file. These files are source snapshots, not endorsements by their authors of this adapter collection.

| Layer | Source | Pinned commit | Terms / packaging |
| --- | --- | --- | --- |
| Art direction | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | `ce26fc25c0e5e8cab638f883de62d9a86ee5e45b` | MIT; selected TasteSkill entrypoint and original license |
| UX intelligence | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | `09170eec67eefd46a7ae85de61b40c194020f997` | MIT; skill, data, supporting references, search scripts; original data provenance/font license metadata retained |
| Implementation | [anthropics/skills, frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | `8a1541c4a3ffa5a20a5a91de0dcf3f0bab1d1ef4` | Apache-2.0; original skill and LICENSE.txt retained |
| UX process | [richhemsley3/claude-design-skills](https://github.com/richhemsley3/claude-design-skills) | `1185d0d84974eaed6e927b953243c96754de02b6` | MIT; stage-specific source guides and supporting resources |
| Motion | [kylezantos/design-motion-principles](https://github.com/kylezantos/design-motion-principles) | `4a9ca879f24a361f4dca4174fe2da0f67b5ddee3` | MIT; source workflows/references and license |
| React performance / UI review | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | `063bee94c3f4df8453406c830b0a7df0f2860278` | MIT declared in repository README; original declaration retained as LICENSE-SOURCE.md (no standalone license file found in that snapshot) |
| Interface checklist | [vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines) | `e3d624baaf29dc1fc645aff3e38f03e564d2d6b1` | MIT; command.md and original LICENSE |
| Accessibility | [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/), [ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/) | Living references checked on review date | Original local workflow and concise checklist; standards linked, not vendored |
| Visual regression | [Playwright visual comparisons](https://playwright.dev/docs/test-snapshots) | Living reference checked on review date | Original local workflow and example; runtime not bundled |
| Responsive / design system / selector | Authored for this collection | Versioned with the host repo | Original, project-discovering instructions |

All included upstream file bytes are unchanged. Only the on-disk names of upstream `SKILL.md` entrypoints become `guide.md`; they are not independently registered. Compiled upstream `AGENTS.md`, redundant README files, metadata, and UI UX Pro Max's development tests are omitted. Vercel's individual rule files replace its compiled all-rules document. Retained upstream links that name those omitted/renamed files should be resolved using the collection contract. The validator checks authored navigation, not every historical upstream link.

No font binaries or icon packages are installed by this collection. If choosing assets through the catalogs, inspect their asset-specific license/provenance rather than assuming every asset is covered by the skill repository's MIT license.

## Assessment of frontend-design-complete

Requested source: [nhatmobile1/claude-skills/skills/frontend-design-complete](https://github.com/nhatmobile1/claude-skills/tree/main/skills/frontend-design-complete), inspected at `cd54506f8f80231ff072de68bee954402eefcdca`. The trailing period in the supplied URL was punctuation and was removed for retrieval.

The source entrypoint combines visual direction, responsiveness, accessibility, modern CSS, forms, themes/tokens, performance, and other frontend concerns. Its distribution directory also contains split references and a visual-pattern scanner. The breadth is useful as a coverage checklist, but the source declares itself a single frontend skill; adding it to every specialist task would duplicate much of this collection.

Some prescriptions conflict even within a design brief: it suggests textured atmospheres while also banning texture overlays, and treats particular fonts, warm backgrounds, rounded corners, and palettes as universal anti-patterns. Those are context-dependent design choices. Applying them mechanically here would conflict with the portfolio's established ivory/lilac identity and component styling.

Decision: retain independently selected layers and original responsive/accessibility/system/QA workflows; do not activate the combined skill in addition to them. The complete skill remains a linked reference for comparison. No repository license file or explicit repository license was found in the inspected snapshot, so its text and scanner are **not bundled**. This is a packaging choice, not a claim that the upstream project is unusable.

## Compatibility decisions

- Existing brand and user direction take precedence over upstream aesthetic defaults.
- Motion presets do not automatically increase animation intensity; reduced motion and immediate focus remain baseline behavior.
- The process collection is staged, not an automatic end-to-end pipeline or delegation trigger.
- React performance rules are filtered by the actual framework and version; a Vite app does not acquire Next.js APIs.
- UI review can use a pinned offline checklist; fresh retrieval is reserved for requests needing current guidance.
- Tool instructions resolve relative to the local snapshot. No fixed `.claude` path, global install, API key, runtime download, or upstream install script is required for ordinary use.
- Codex entrypoints use the documented [.agents/skills repository location](https://learn.chatgpt.com/docs/build-skills). They are generated flat so category nesting does not depend on host discovery behavior.
