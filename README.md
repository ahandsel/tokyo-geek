# Tokyo Geek

A revamp to my Japan_Guide blog using [VitePress static site generator](https://vitepress.dev/).


## Dev notes and steps


### Project tools and dependencies

| Tool                                                  | Purpose                                 | Config file                   |
| ----------------------------------------------------- | --------------------------------------- | ----------------------------- |
| [VitePress][]                                         | Static site generator                   | [.vitepress/config.mts][]     |
| [vitepress-sidebar][]                                 | Sidebar management for VitePress        | [.vitepress/config.mts][]     |
| [@nolebase/vitepress-plugin-enhanced-readabilities][] | Enhanced reading experience             | [.vitepress/theme/index.ts][] |
| [markdownlint-cli2][]                                 | Markdown linting                        |                               |

[.vitepress/config.mts]: ./contents/.vitepress/config.mts
[.vitepress/theme/index.ts]: ./contents/.vitepress/theme/index.ts
[@nolebase/vitepress-plugin-enhanced-readabilities]: https://nolebase-integrations.ayaka.io/pages/en/integrations/vitepress-plugin-enhanced-readabilities/
[markdownlint-cli2]: https://github.com/DavidAnson/markdownlint-cli2
[vitepress-sidebar]: https://vitepress-sidebar.cdget.com/
[VitePress]: https://vitepress.dev/guide/what-is-vitepress


### Local dev

```shell
# Install dependencies
pnpm install

# Start a local dev server
pnpm dev

# Build the static site
pnpm build
```


### AI coding CLIs

The Claude Code, Codex, and Cursor Agent CLIs are listed in [`contents/public/Brewfile`](./contents/public/Brewfile) (`claude-code`, `codex`, `cursor-cli`). After installing them, launch from the repo root:

```shell
pnpm claude   # Claude Code
pnpm codex    # Codex
pnpm cursor   # Cursor Agent (cursor-agent)
```


### Linting

```shell
pnpm lint
```


### Site icons

The icons in `contents/public/` are committed static files. The generator is not a dependency, so regenerate them on demand when the source icon changes:

```shell
pnpm dlx @vite-pwa/assets-generator --preset minimal-2023 contents/public/cat-icon-clear.png
```
