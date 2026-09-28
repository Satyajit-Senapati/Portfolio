# Design Research and Identity

## Direction

A personal engineering portfolio with an editorial hierarchy: a human introduction, real products, and credible technical depth. Ink and lilac give the dark theme character; warm ivory and deeper violet make the light theme intentional. Space, type, and linework carry the design. No template code or third-party brand artwork was copied.

## References and Decisions

| Source                                                                                                                                               | What Informed the Design                                                   | Portfolio Application                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [Ibrahim Memon’s Figma Portfolio](https://figma-portfolio-ten.vercel.app/) and [source repository](https://github.com/ibrahimmemonn/Figma-Portfolio) | A personal avatar, clear introduction, and spacious project storytelling   | A custom portrait composition and early selected-work section; independently written React/CSS |
| [Grafit](https://www.framer.com/marketplace/templates/grafit/)                                                                                       | Expressive typography and deliberate contrast                              | Large editorial headings with restrained supporting labels                                     |
| [Codex](https://www.framer.com/marketplace/templates/codex/)                                                                                         | Developer work presented as a coherent professional identity               | Technical depth through a compact capability map and interactive architecture patterns         |
| [IBM Design Language: 8-Bar](https://www.ibm.com/design/language/ibm-logos/8-bar/)                                                                   | Optical legibility, consistent use, clear space, and monochrome discipline | A simple mark checked at small sizes, with a single-color variant                              |
| [Pentagram: Isomorphic Labs](https://www.pentagram.com/work/isomorphic-labs)                                                                         | A distinctive identity connected to a technical practice                   | An original geometric S that suggests a continuous path through a system                       |

These are visual research references, not affiliations or endorsements. The supplied Figma portfolio’s assets and implementation were not imported.

## Woven Initials Logo

The owner selected **07 / Woven Initials** from the second concept round. Interlocking S ribbons reference Satyajit and Senapati; their diagonal cuts form a compact architectural silhouette. The concept was generated with the built-in image generation tool, then reconstructed as four smooth vector paths for production. Earlier logo explorations remain available in Git history.

- Master: `public/brand/satyajit-mark.svg`
- Monochrome: `public/brand/satyajit-mark-mono.svg`
- Browser/header tile: `public/favicon.svg`
- Construction: 64 × 64 view box, four filled vector paths, no fonts or strokes.
- Clear space: preserve at least 7 units of the view box around the visible mark.
- Use: scale uniformly; use lilac on ink, violet on light, or one contrasting monochrome color.
- Keep the unmodified silhouette at small sizes. Do not add shadows or gradients to the mark.

The temporary public comparison pages and concept assets were removed after selection. The production SVG files above are the source of truth. The full prompt set and refinement prompt are in [logo-round-2-prompts.md](logo-round-2-prompts.md).

## Avatar

Final asset: `public/images/satyajit-avatar.png`.

Created with the **built-in image generation tool**, using the owner’s supplied photograph only as an identity reference. The original photograph is not in the published assets. The first generated portrait was retained following the owner’s feedback that it preserved their identity better than a later, more stylized variation. The generated source remains in the tool’s output directory.

### Selected Generation Prompt

> Use case: stylized-concept. Asset type: premium personal portfolio profile avatar. Input image: the attached portrait is the identity reference for Satyajit Senapati. Create ONE beautifully crafted stylized 3D digital bust avatar of this same adult man, recognizable facial proportions, warm medium brown skin, dark brown eyes, thick swept-back slightly tousled black hair, his full neatly shaped black beard and mustache, and calm approachable expression with a very subtle natural smile. Preserve his identity and adult age. Deliberately illustrated, sculpted 3D character, not a photograph and not a photo filter. Sophisticated editorial character design, natural-sized eyes, restrained stylization, soft matte materials, detailed hair shapes, believable face, tasteful professional charisma. Replace formal shirt/tie/vest with a refined dark charcoal crew-neck and a simple unbranded dark navy overshirt. Chest-up bust, near frontal with a slight relaxed three-quarter turn, looking at viewer. Entire hair and shoulders within frame, generous 8% clear space above hair, bust centered, no hands. Soft neutral studio key light and a faint lavender rim light, suitable for both warm white and deep ink website backgrounds. Genuine transparent background (alpha), no floor, no backdrop, no cast shadow outside the figure. Square high quality composition. No text, no logo, no watermarks, no UI, no extra objects, no neon skin, no excessive cartoon eyes. Output the avatar asset only.

## Product Previews and Typography

The preview images are browser captures of the owner’s public [DataRevia](https://datarevia.sattylabs.workers.dev/) and [NEVRI](https://nevri-notes.web.app/) sites. DataRevia replaces the former InterviewOS name and URL. NEVRI’s description reflects its published web availability and Android testing status.

Manrope is self-hosted from Google Fonts. Its SIL Open Font License is included at `public/fonts/OFL.txt`.
