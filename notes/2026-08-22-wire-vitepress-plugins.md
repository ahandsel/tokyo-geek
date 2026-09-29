---
title: Wire VitePress image viewer, meta, and Mermaid plugins
description: Instructions for a future agent to keep three VitePress plugins in the repo and wire them into the live site. Do not delete these packages as unused.
excludeFromSidebar: true
---

# Wire VitePress image viewer, meta, and Mermaid plugins

This note is for a future AI agent. Read it before you touch `@davidingplus/vitepress-image-viewer`, `@nolebase/vitepress-plugin-meta`, or `vitepress-mermaid-renderer`.


## Goal

Keep these three packages in the project and **wire them into the published VitePress site**. Installing them in `package.json` is not enough. They do nothing until the theme or config imports them.

Do **not** remove these packages because they look unused. They are intentional. They were briefly dropped during the 2026-08-22 production audit (finding F8: declared in `package.json` and docs, never imported). That deletion was the wrong call. The correct follow-up is to wire them.


## Current state (2026-08-22)

* Site generator: VitePress `2.0.0-alpha.17`, source in `contents/`, theme in [`contents/.vitepress/theme/index.ts`][theme-index].
* Wired today: `vitepress-sidebar`, `@nolebase/vitepress-plugin-enhanced-readabilities`, and the local hero speech-bubble.
* **Not wired:** image viewer, Nolebase meta, Mermaid renderer.
* There are **no** ` ```mermaid ` fences under `contents/`. One draft chart lives in [`notes/branch-chart/2026-06-11-jr-central-fuji-view.md`][fuji-view].
* Earlier theme wiring for ImageViewer and Mermaid exists as salvage from the deleted `chart` branch. Do not copy that patch blindly. Port the ideas onto the **current** theme, which also has the speech-bubble and Japanese chrome that the 2026 patch does not have.


## Packages to add (if missing)

Use `pnpm`. Never `npm`, `npx`, or `yarn`.

```shell
pnpm add -D @davidingplus/vitepress-image-viewer@^1.1.5 @nolebase/vitepress-plugin-meta@^2.18.2 vitepress-mermaid-renderer@^1.2.0
```

Those versions match what this repo last shipped. Bump only if the plugin docs require it for VitePress 2 alpha, and re-run `pnpm build` after the bump.

Do not re-add `vitepress-plugin-chartjs`, `init`, or `openai`. Chart.js wiring was rejected in closed PRs. `init` and `openai` were unused and `init` pulled `daemon`.


## Constraints

* Preserve existing theme slots: enhanced-readabilities menus and `wireHeroSpeechBubble()`.
* Preserve `contents/.vitepress/config.mts` behavior that already landed: sitemap hostname with trailing slash, `srcExclude` for snippets and `temp.md`, public-asset dead-link filter, and the `interpolate-frontmatter-title` markdown-it rule.
* Image viewer must run only after hydration (`onMounted`). VitePress SSR will mismatch if you call it in `enhanceApp` on the server.
* Skip the home hero image and home feature images (`no-viewer` class). The cat icon is decorative, not a figure to zoom.
* Skip SVG images (`img[src$=".svg"]`) the same way the salvage activator does.
* Do not port `VideoViewer` unless the user asks. This note covers the three named plugins only.
* After wiring, list the plugins in `AGENTS.md` and `README.md` only if the theme or config actually imports them.


## 1. Image viewer - `@davidingplus/vitepress-image-viewer`

Copy [`notes/branch-chart/ImageViewerActivator.vue`][image-viewer-activator] to `contents/.vitepress/theme/components/ImageViewerActivator.vue`.

Wire it from [`contents/.vitepress/theme/index.ts`][theme-index]:

* Defer the activator until `onMounted` (the salvage patch's `DeferredImageViewerActivator` pattern).
* Mount it in the `doc-top` layout slot so it runs on article pages.
* Override `home-hero-image` with `VPImage` plus class `no-viewer`.
* After mount, add `no-viewer` to `.VPFeature img`.

The salvage theme diff is [`notes/branch-chart/theme-index-diff.patch`][theme-diff]. Use it as a checklist, then merge onto the current file. The 2026 patch still imports from `docs/.vitepress/` and replaces `enhanceApp` entirely, which would drop the speech bubble.

Done when: a content page `<img>` opens a zoom overlay, the home cat icon does not, and `pnpm build` has no SSR errors about `document` or `window`.


## 2. Mermaid - `vitepress-mermaid-renderer`

In [`contents/.vitepress/theme/index.ts`][theme-index], inside `Layout`:

1. `import { createMermaidRenderer } from 'vitepress-mermaid-renderer'`.
2. Read `isDark` from `useData()`.
3. Call `createMermaidRenderer({ theme: isDark.value ? 'dark' : 'forest', look: isDark.value ? 'default' : 'handDrawn' })` in `nextTick`.
4. `watch` `isDark` and call it again on theme change.

Upstream quick start: [VitePress Mermaid Renderer][mermaid-renderer]. The salvage patch also imported [`notes/branch-chart/vitepress-mermaid-renderer.css`][mermaid-css] by hand for Cloudflare Pages. GitHub Pages does not need that workaround; try the package default first, and copy the CSS only if the toolbar is unstyled in the built HTML.

Add at least one real ` ```mermaid ` fence under `contents/` (English and Japanese pair, `localization: sync`) so the plugin is exercised. Do not publish the fuji-view draft as-is. It still has duplicated sentences.

Done when: `pnpm build` emits SVG (or the plugin's diagram container) for that fence, and toggling dark mode in `pnpm dev` re-renders the chart.


## 3. Page meta - `@nolebase/vitepress-plugin-meta`

This plugin writes extra `<meta>` tags (Open Graph, excerpt, author) for SEO and link previews.

The public Nolebase page is still marked constructing. After `pnpm add`, read the package itself:

* `node_modules/@nolebase/vitepress-plugin-meta/` README and exported `transformHead` helper.
* Peer range already includes `vitepress` `^2.0.0-alpha.1`.

Wire it in [`contents/.vitepress/config.mts`][config], not the theme. Typical shape is an async `transformHead(context)` that calls the helper and returns the extra head tuples. Keep the existing `head` entries for favicon, apple-touch-icon, and `apple-mobile-web-app-title`.

`vite.ssr.noExternal` already includes `@nolebase/*`. Leave that in place.

Done when: a built article HTML includes `og:title` / `og:description` (or the tags the helper documents) derived from frontmatter `title` and `description`, and the home page still has its current icons.


## Verify

Run, in order:

```shell
pnpm build
pnpm check-sitemap
pnpm lint
```

Spot-check:

* `contents/.vitepress/dist/tech/coding-fonts.html` (or another image-heavy page) for the viewer markup.
* The new Mermaid page's HTML for a diagram container, not a raw code fence only.
* One article `<head>` for the new meta tags.
* `contents/.vitepress/theme/index.ts` still calls `wireHeroSpeechBubble()` and still renders both Nolebase readabilities menus.


## Related notes

* [`2026-06-11-branch-chart.md`][branch-chart] - salvage of the deleted `chart` branch. ImageViewer and Mermaid wiring started there. Ignore the Chart.js section.
* [`2026-08-18-repo-audit.md`][repo-audit] - unrelated 24-hour tooling audit.

<!-- Links -->

[branch-chart]: ./2026-06-11-branch-chart.md
[config]: ../contents/.vitepress/config.mts
[fuji-view]: ./branch-chart/2026-06-11-jr-central-fuji-view.md
[image-viewer-activator]: ./branch-chart/ImageViewerActivator.vue
[mermaid-css]: ./branch-chart/vitepress-mermaid-renderer.css
[mermaid-renderer]: https://github.com/sametcn99/vitepress-mermaid-renderer
[repo-audit]: ./2026-08-18-repo-audit.md
[theme-diff]: ./branch-chart/theme-index-diff.patch
[theme-index]: ../contents/.vitepress/theme/index.ts
