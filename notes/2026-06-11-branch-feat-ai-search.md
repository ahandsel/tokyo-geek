---
title: Salvage notes - `feat-ai-search` branch
description: Captures the unique commits that lived on the `feat-ai-search` branch before it was deleted, so the work can be re-applied to `contents/` later if useful.
excludeFromSidebar: true
---

# Salvage notes: `feat-ai-search` branch

The `feat-ai-search` branch was deleted on 2026-06-11. It carried two commits ahead of `main` from Feb 2026, written against the **old `docs/` site layout** (before commit `25f2e3d` "Major upgrade" renamed `docs/` to `contents/`). No PR was ever opened. A rebase would have conflicted on ~146 files, so it is faster to re-apply the intent by hand against the current layout.

This note preserves the salvageable changes. Companion files live in [`branch-feat-ai-search/`](./branch-feat-ai-search/).


## Commits (oldest → newest)

| Hash      | Date       | Subject                                       |
| --------- | ---------- | --------------------------------------------- |
| `5cfb109` | 2026-02-20 | Add excludeFromSidebar  to frontmatter        |
| `3449445` | 2026-02-20 | import and use withBase to fix link           |


## What was added


### 1. `excludeFromSidebar` frontmatter sweep (commit `5cfb109`)

Touches **146 pages** under `docs/{en,ja,snippets}/` to give every doc an explicit `excludeFromSidebar` boolean in its frontmatter.

**Split:**

* `excludeFromSidebar: true` on 3 pages (the snippet docs that should not appear in the sidebar):
  * `docs/snippets/README.md`
  * `docs/snippets/doc-status-ai.md`
  * `docs/snippets/doc-status-wip.md`
* `excludeFromSidebar: false` on the remaining 143 content pages.

The full path list with values is in [`branch-feat-ai-search/excludeFromSidebar-targets.tsv`](./branch-feat-ai-search/excludeFromSidebar-targets.tsv). The raw patch (still at `docs/` paths) is at [`branch-feat-ai-search/01-exclude-from-sidebar.patch`](./branch-feat-ai-search/01-exclude-from-sidebar.patch).

**Status on `main`:**

* The plugin is already wired - `contents/.vitepress/config.mts:164` sets `excludeFilesByFrontmatterFieldName: 'excludeFromSidebar'`.
* A few infrastructure pages (`map.md`, `snippets/mapping.md`, `snippets/related-guides-list.md`, etc.) already use the field.
* The bulk of the content pages on `main` do NOT yet have the frontmatter set - e.g. `contents/en/tech/mac-apps.md` and `contents/en/tips/index.md` have no `excludeFromSidebar` key.

**Why apply:** Explicit `false` on every content page makes future toggles a one-character edit rather than a frontmatter block insertion, and a deliberate `true` on the snippet helpers prevents accidental sidebar leaks if the plugin's default ever changes.

**Re-application notes:**

* Re-do as a script, not by replaying the patch - paths now live under `contents/` and many files have had their frontmatter restructured since Feb 2026 (e.g. `head: meta keywords`, `excerpt`, `lastUpdated`).
* A small `.mjs` script that walks `contents/{en,ja,snippets}/**/*.md`, parses YAML frontmatter with `gray-matter` (already a dep), and inserts the key if absent is the cleanest approach. Default to `false` for everything under `contents/{en,ja}/` and `true` for `contents/snippets/*.md` (matches the original sweep's intent).
* Run `pnpm tree && pnpm lint && pnpm build` afterwards.


### 2. `withBase` link fix on `nighttab.md` (commit `3449445`)

Both `docs/en/tech/nighttab.md` and `docs/ja/tech/nighttab.md` had hard-coded paths in `<a href="/public/share/nighttab/...">` `<details>` summaries, which broke when the site is hosted under a non-root base path. The fix replaces them with VitePress's `withBase` helper:

```html
<summary>Click to expand <a :href="withBase('/public/share/nighttab/google-bookmarks.json')">google-bookmarks.json</a></summary>
```

…and appends a `<script setup>` block at the end of each file:

```html
<!-- markdownlint-disable MD033 -->
<script setup>
import { withBase } from 'vitepress'
</script>
<!-- markdownlint-enable MD033 -->
```

The Japanese file additionally **fixes a bug**: three of its `href`s were previously `/share/...` instead of `/public/share/...`, so the links were already broken even on a root-deployed site.

Full patch: [`branch-feat-ai-search/02-withbase-nighttab.patch`](./branch-feat-ai-search/02-withbase-nighttab.patch).

**Status on `main`:**

* `contents/en/tech/nighttab.md` and `contents/ja/tech/nighttab.md` still use the bare `<a href="...">` form - the fix has NOT been ported.
* Worth applying if the site is ever served from a non-root base (or just for hygiene + the JA path typo).


## Re-application checklist

1. Open a fresh branch from current `main`.
2. Write a `scripts/add-exclude-from-sidebar.mjs` walker per the notes above, and run it. Spot-check a handful of files before committing.
3. Hand-port the `nighttab.md` changes to `contents/en/tech/nighttab.md` and `contents/ja/tech/nighttab.md`, including the JA path typo fix (`/share/` → `/public/share/`).
4. Run `pnpm tree && pnpm lint && pnpm build`.
