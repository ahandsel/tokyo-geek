# Frontmatter style guide

This document describes the YAML frontmatter used in the Markdown content files under [`contents/`](../contents/). Frontmatter is the block delimited by `---` at the very top of a file. It supplies the page title, the search and social metadata, the sidebar behavior, and the bilingual localization state.

VitePress reads these keys when it builds the static site, and the `vitepress-sidebar` plugin reads some of them when it generates the navigation. The keys and behaviors below are configured in [`contents/.vitepress/config.mts`](../contents/.vitepress/config.mts).


## Table of contents <!-- omit in toc -->

* [Minimal example](#minimal-example)
* [Key reference](#key-reference)
* [Content keys](#content-keys)
  * [title](#title)
  * [description](#description)
  * [head](#head)
  * [tags](#tags)
* [Sidebar keys](#sidebar-keys)
  * [order](#order)
  * [excludeFromSidebar](#excludefromsidebar)
* [Localization key](#localization-key)
* [Home page keys](#home-page-keys)
* [Files without frontmatter](#files-without-frontmatter)


## Minimal example

A standard content page declares a `title`, a `description`, a `head` block with search keywords, and a `localization` state:

```yaml
---
title: Hiking in Tokyo
description: Hiking trail recommendations near Tokyo, from beginner-friendly outings to challenging full-day treks.
head:
  - - meta
    - name: keywords
      content: tokyo, hiking, trails, outdoors, japan
localization: sync
---
```


## Key reference

| Key                  | Required           | Type    | Purpose                                                                |
| -------------------- | ------------------ | ------- | ---------------------------------------------------------------------- |
| `title`              | Yes                | string  | Page title, browser tab title, and sidebar label.                      |
| `description`        | Yes                | string  | Search and social meta description for the page.                       |
| `localization`       | Yes (paired pages) | enum    | Bilingual parity state: `sync`, `TODO: drifted`, or `independent`.     |
| `head`               | Recommended        | array   | Extra `<head>` tags, most often the `keywords` meta tag.               |
| `order`              | No                 | number  | Sidebar sort position within a folder. Defaults to `10`.               |
| `excludeFromSidebar` | No                 | boolean | When `true`, hides the page from the sidebar.                          |
| `tags`               | No                 | array   | Topic tags for the page.                                               |
| `layout`             | No                 | enum    | Page layout. Set to `home` only on the locale landing pages.           |
| `titleTemplate`      | No                 | string  | Overrides the global title template. Used on the home pages.           |
| `hero`, `features`   | No                 | object  | Home page hero and feature-card content. Used only with `layout: home`.|


## Content keys

These keys describe the page itself and feed the rendered HTML and search metadata.


### title

Required on every content page. The `title`:

* Sets the browser tab title, rendered through the global template `:title - Tokyo Geek`.
* Is used as the page heading and the sidebar label, because the sidebar is configured with `useTitleFromFrontmatter: true` and `frontmatterTitleFieldName: 'title'`.

Wrap the value in single quotes only when it contains a character that YAML would otherwise misread, such as a leading quote or a colon followed by a space:

```yaml
title: 'SoftBank to Y!mobile: online eSIM transfer guide'
```

Follow the language style guides for capitalization. Emoji are allowed and common, for example `Platt Kodama - discount Shinkansen tickets 🚅`.


### description

Required on every content page. The `description` is a one-sentence to two-sentence summary used as the page meta description for search engines and link previews. Keep it concise and specific to the page content.


### head

Optional but recommended. The `head` key injects extra tags into the page `<head>`. The established pattern in this repository is a single `keywords` meta tag:

```yaml
head:
  - - meta
    - name: keywords
      content: japan post, international shipping, ead, my page, postal
```

The nested-array syntax is VitePress's per-page head format: the outer array holds tags, and each tag is `[tagName, attributesObject]`. Write keywords as a comma-separated, lowercase list of terms relevant to the page.


### tags

Optional and rarely used. The `tags` key holds a list of topic tags:

```yaml
tags:
  - yakushima
  - travel
  - japan
  - hiking
  - nature
```

Only add tags when they serve a clear purpose for the page. Most pages do not set this key.


## Sidebar keys

These keys control how the `vitepress-sidebar` plugin places and orders a page in the navigation.


### order

Optional. The `order` key sets the sort position of a page or folder within its sidebar group. Lower numbers sort first. Pages without `order` default to `10`.

In practice, `order` is set mainly on folder `index.md` files to control the order of top-level sections, for example `order: 0` on a section landing page so it sorts above its siblings.


### excludeFromSidebar

Optional boolean. When set to `true`, the page is removed from the generated sidebar. This is configured through `excludeFilesByFrontmatterFieldName: 'excludeFromSidebar'`.

Use it for pages that should exist and be reachable by link but should not clutter the navigation, such as the content map:

```yaml
title: Content map
description: Overview of all pages
excludeFromSidebar: true
localization: sync
```

Setting `excludeFromSidebar: false` is equivalent to omitting the key; it is sometimes written explicitly to document intent.


## Localization key

Required on every paired content page. Every file under `contents/en/` has a 1-to-1 counterpart at the same path under `contents/ja/`. The `localization` key tracks whether the two language versions are in parity.

| Value           | Meaning                                                                          |
| --------------- | -------------------------------------------------------------------------------- |
| `sync`          | Default. The two versions are kept in 1-to-1 parity and should match in content. |
| `TODO: drifted` | The two versions have diverged and require updating.                             |
| `independent`   | The two versions are intentionally different; do not sync them.                  |

Rules when editing content:

* Default new and existing paired files to `localization: sync`.
* When you edit a `sync` file, set its counterpart's `localization` to `TODO: drifted` so the drift is tracked until it is reconciled.
* Once a `TODO: drifted` file has been brought back in line with its counterpart, set both back to `sync`.
* When the two language versions should be intentionally different, set both to `localization: independent` and do not flag drift between them.

The `blog-translator` skill reads and reconciles this key when it syncs a paired file.


## Home page keys

The locale landing pages, [`contents/index.md`](../contents/index.md) (English) and [`contents/ja/index.md`](../contents/ja/index.md) (Japanese), use VitePress's home layout instead of a normal document. They set:

* `layout: home` to switch to the home-page layout.
* `titleTemplate` to override the global `:title - Tokyo Geek` template with a standalone tagline.
* `hero` for the headline, tagline, and icon.
* `features` for the feature cards that link into the main sections.

These keys follow the [VitePress home page reference](https://vitepress.dev/reference/default-theme-home-page). Do not add them to ordinary content pages.


## Files without frontmatter

Not every Markdown file under `contents/` is a page, and these do not need the content or localization keys:

* Files under [`contents/snippets/`](../contents/snippets/) are reusable partials included into pages with the `@include` directive. They are not routes and are excluded from the build, so they have no `title` or `localization`.
* `README.md` files are contributor documentation. They are excluded from both the build and the sidebar.
