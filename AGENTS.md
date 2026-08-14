# AGENTS.md

`Tokyo Geek` is a personal website mainly focused on travel guides and tips for Japan.

Core topics:
* Traveling and living in Japan.
* Tech and software development.
* Traveling notes.
* Miscellaneous things the author (`ahandsel`) wants to share.


## Localization

Content is bilingual.
Every file under `contents/en/` has a 1-to-1 counterpart under `contents/ja/` (same path below the language folder), holding the English and Japanese versions of the same page.

By default, the content should be the same, just in their respective languages.

Each content file declares its localization state in a `localization` frontmatter key:

| Value           | Meaning                                                                          |
| --------------- | -------------------------------------------------------------------------------- |
| `sync`          | Default. The two versions are kept in 1-to-1 parity and should match in content. |
| `TODO: drifted` | The two versions have diverged and requires updating.                            |
| `independent`   | The two versions are intentionally different; do not sync them.                  |

Rules when editing content:

* Default new and existing paired files to `localization: sync`.
* When you edit a `sync` file, flag its counterpart in the other language: set the counterpart's `localization` to `TODO: drifted` so the drift is tracked until it is reconciled.
* Once a `TODO: drifted` file has been brought back in line with its counterpart, set both back to `sync`.
* When the two language versions should be intentionally different, set `localization: independent` and do not flag drift between them.


## Tech stack

* Content: Markdown in `contents/`, with frontmatter for metadata and localization state.
* Site generator: [VitePress][] (static site), with these plugins:
  * `vitepress-sidebar` - automatic sidebar generation.
  * `DavidingPlus/vitepress-image-viewer` - image zoom and captions.
  * VitePress Mermaid Renderer - diagrams.
  * `@nolebase/vitepress-plugin-enhanced-readabilities` - readability controls.
  * `@nolebase/vitepress-plugin-meta` - meta tags.
* Customization: `.mts`, `.ts`, `.mjs`, and Vue.
* Lint: Prettier + markdownlint-cli2.
* Package manager: `pnpm@11.6.0`.

[VitePress]: https://vitepress.dev/


## Common commands

| Command        | What it does                                                           |
| -------------- | ---------------------------------------------------------------------- |
| `pnpm dev`     | `vitepress dev contents` - start the dev server.                       |
| `pnpm build`   | `vitepress build contents`.                                            |
| `pnpm preview` | `vitepress preview contents`.                                          |
| `pnpm check`   | `lint` + dev server (sanity check while editing).                      |
| `pnpm lint`    | Prettier (`lint-code`) then markdownlint-cli2 `--fix` (`lint-md`).     |
| `pnpm tree`    | Regenerate the doc structure via `scripts/generate-doc-structure.mjs`. |
| `pnpm test`    | `tree` + `lint` + `build` + `preview` (used as the pre-merge check).   |
| `pnpm index`   | List pnpm scripts via `scripts/index.sh`.                              |
| `pnpm nodenv`  | Install and pin `.node-version`, then enable pnpm via corepack.        |

Run `pnpm tree` after adding or moving content so the generated structure stays in sync, then `pnpm lint` before finishing.

On a machine where the pinned Node version does not have pnpm yet, `pnpm run nodenv` cannot start, so run the same chain directly once:

```zsh
V="$(cat .node-version)" && nodenv install -s "$V" && nodenv local "$V" && NODENV_VERSION="$V" nodenv exec corepack enable pnpm && nodenv rehash
```

After that, `pnpm nodenv` handles later version bumps.


## Style guides

Writing, formatting, and translation conventions for this repository live in [docs/](./docs/).
Consult them before authoring or editing content. See [docs/README.md](./docs/README.md) for the full index.

* [General style guide - English](./docs/general-style-guide-english.md) / [Japanese](./docs/general-style-guide-japanese.md) - baseline writing rules (language, grammar, capitalization, punctuation, word usage).
* [Technical style guide - English](./docs/technical-style-guide-english.md) / [Japanese](./docs/technical-style-guide-japanese.md) - documentation-specific rules (sentence structure, lists, procedural steps, alert banners).
* [Help documentation overview](./docs/technical-doc-overview.md) - the four help document types and when to use each ([Diataxis](https://diataxis.fr/)).
* [Markdown style guide](./docs/markdown-style-guide.md) - Markdown formatting (note banners, reference-style links).
* [Frontmatter style guide](./docs/frontmatter-style-guide.md) - YAML frontmatter keys for content files (title, description, head, sidebar, localization).
* [Git commit style guide](./docs/repo-commit-style-guide.md) - commit title, body, and emoji conventions.
* [EN-JA translation glossary](./docs/glossary.yaml) and [words to avoid](./docs/words-to-avoid.txt) - terminology references.
* [Document templates](./docs/templates/) - structure definitions and examples for how-to guides and reference documents.


## Conventions

* Site config and theme tweaks live in `contents/.vitepress/config.mts` and `contents/.vitepress/theme/index.ts`. Plugins are wired there.
* PWA icons in `contents/public/` are committed static files. The generator is no longer a dependency, so regenerate them on demand when the source icon changes. There is no `pwa-assets.config.*` file, so the preset and the source image have to be passed on the command line:

  ```shell
  pnpm dlx @vite-pwa/assets-generator --preset minimal-2023 contents/public/cat-icon-clear.png
  ```

  The `minimal-2023` preset emits exactly the committed file set: `pwa-64x64.png`, `pwa-192x192.png`, `pwa-512x512.png`, `maskable-icon-512x512.png`, `apple-touch-icon-180x180.png`, and `favicon.ico`. Note that `pnpm dlx` resolves in a throwaway project and ignores the `sharp` override in `pnpm-workspace.yaml`, so the run pulls the vulnerable `sharp` 0.33.5 that the generator pins. That is acceptable for a one-off local run against a trusted image, but do not treat the override as covering it.
* Never use en-dash or em-dash; always use a plain hyphen (`-`) instead.
* Always use `pnpm` - never `npm`, `npx`, or `yarn`. The pnpm equivalents:
  * `npm install` / `yarn add` → `pnpm add` (or `pnpm install` for the whole lockfile)
  * `npm run <script>` / `yarn <script>` → `pnpm run <script>` (or `pnpm <script>`)
  * `npm exec <bin>` → `pnpm exec <bin>`
  * `npx <pkg>` → `pnpm dlx <pkg>`


## Git commits

* Never add a `Co-Authored-By` trailer.
* Use the `ai-commit` skill to draft messages.


## Scripts

Default to creating scripts as Node.js ES modules (`.mjs`) or zsh for any new script tooling in this repo.
* Do not use Python due to the overhead of managing Python environments and dependencies across different users' machines.
* Default to Node.js for scripts that involve file system operations, string manipulation, or integration with JavaScript-based tools, as it provides a consistent runtime environment and leverages the strengths of the JavaScript ecosystem for build and automation tasks.
* Use zsh for simple command sequences, environment setup, or when leveraging powerful shell features that would be more cumbersome to implement in Node.js.
* Always include `--help` output for any script, and ensure it is clear and informative for users who may not be familiar with the script's functionality.
* When writing scripts, always include a notes section near the top with:
  * General notes - a brief description of what the script does.
  * Usage - how to include or invoke the script.
  * Output - what the script generates or returns.
* For script outputs that are expected to be read by a user, use emojis to clarify messages and statuses, e.g. ✅ for success, ⚠️ for warnings, and ❌ for errors.
