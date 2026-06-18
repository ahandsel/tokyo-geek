---
title: Security audit - VitePress v2.0.0-alpha.17
description: Security review of the VitePress v2.0.0-alpha.16 to v2.0.0-alpha.17 upgrade for Tokyo Geek, covering the bundled markdown-it ReDoS patch and the new source changes.
excludeFromSidebar: true
---

# Security audit: VitePress v2.0.0-alpha.17

Audit date: 2026-06-18. Scope: the [v2.0.0-alpha.17 release](https://github.com/vuejs/vitepress/releases/tag/v2.0.0-alpha.17) versus the `2.0.0-alpha.16` we currently pin in [`package.json`](../package.json).

**Verdict: safe to upgrade, and net-positive for security.** The release carries one genuine security fix (a bundled markdown-it ReDoS patch) and one new feature whose code was reviewed for injection. No new vulnerabilities were introduced. There is one breaking change that directly affects this repo.

The 31 commits are mostly docs and translations. Four source changes have security relevance.


## 1. markdown-it ReDoS patch - CVE-2026-2327 (the one real security fix)

alpha.17 bumps its bundled markdown-it from `14.1.0` to `14.1.1`, which fixes [CVE-2026-2327 / GHSA-38c4-r59v-3vqw](https://github.com/advisories/GHSA-38c4-r59v-3vqw): a Regular Expression Denial of Service in the `linkify` rule. A long run of `*` followed by a non-matching character triggers catastrophic backtracking and pins the CPU.

The important nuance for this repo:

* VitePress **bundles** markdown-it into its own dist. Our [`pnpm-lock.yaml`](../pnpm-lock.yaml) lists only `@types/markdown-it` under the `vitepress` entry, not `markdown-it` itself.
* The `markdown-it@14.1.1` already resolved in our tree is pulled **only by markdownlint-cli2** (confirmed via `pnpm why markdown-it`), not by the site build.
* So the engine that actually renders our pages is the markdown-it frozen inside alpha.16, which is the vulnerable `14.1.0`. `pnpm audit` will not flag this, because the bundled copy is not a separate node in the dependency tree. Upgrading to alpha.17 is the only way we pick up the patch.

**Real-world risk to Tokyo Geek: low.** Markdown is parsed at build time from content we author, and we have no dynamic routes or data loaders (`*.paths.*` or `*.data.*`) processing untrusted markdown. The fix matters most for sites that parse external or user-supplied markdown, which is not our case, but it is a free improvement to the build's markdown engine.


## 2. New text-fragment feature (link.ts and router.ts) - reviewed, no injection

The `:~:text=` text-fragment support (PR #5140) is new URL and hash parsing, so it was checked specifically:

* `src/node/markdown/plugins/link.ts` splits the href on `:~:`, normalizes the URL, then re-appends the fragment. The final attribute value still flows through markdown-it's `renderToken`, which escapes it. The added unit test confirms `&` becomes `&amp;`. No attribute breakout or cross-site scripting.
* `src/client/app/router.ts` assigns `location.hash` from the navigation target. Setting `location.hash` is not a script-execution sink, and the value is the internal navigation target, so there is no DOM-based cross-site scripting or open redirect.


## 3. VPFeature.vue details array uses v-html - by design, unchanged trust model

The new list form renders `<li v-for ... v-html="item">`. This mirrors the **pre-existing** `v-html` on feature `details`, `title`, and `icon`. The source is home-page frontmatter, which is trusted author input, so there is no new attack surface. Informational only: do not place untrusted data into `features` frontmatter.


## 4. BREAKING: @include of a missing file now fails the build

`src/node/utils/processIncludes.ts` no longer silently swallows errors. A broken `<!-- @include: ./path -->` now throws instead of being ignored. **This repo has 29 `@include` directives across `contents/`.** The change is security-neutral-to-positive (fail-loud, and it also drops the `fs-extra` and `picocolors` dependencies), but after upgrading we should run `pnpm build` to confirm none of those includes point at a now-erroring path.


## Neutral and non-security changes

* `src/client/app/composables/copyCode.ts`: now awaits `clipboard.writeText` so the textarea fallback works in non-secure contexts (robustness).
* `src/node/serve/serve.ts`: brotli disabled in the **preview** server (local-only, performance).
* rollup `4.57.1` to `4.59.0` (build-only dev dependency, no advisory).
* `rel="alternate"` and `hreflang` added to language-switcher links (correctness, a minor positive).


## Recommendation and checklist

Upgrade `2.0.0-alpha.16` to `2.0.0-alpha.17`.

1. Bump `vitepress` in [`package.json`](../package.json) and run `pnpm install`.
2. Run `pnpm build` (or the full `pnpm test`) to catch any `@include` that the stricter error handling now rejects.
3. Spot-check the home page features and language switcher render correctly.


## Sources

* [GHSA-38c4-r59v-3vqw / CVE-2026-2327](https://github.com/advisories/GHSA-38c4-r59v-3vqw)
* [CVE-2026-2327 on Snyk](https://security.snyk.io/vuln/SNYK-JS-MARKDOWNIT-10666750)
* [markdown-it CHANGELOG](https://github.com/markdown-it/markdown-it/blob/master/CHANGELOG.md)
* [VitePress v2.0.0-alpha.17 release](https://github.com/vuejs/vitepress/releases/tag/v2.0.0-alpha.17)
