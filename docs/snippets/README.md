# Notes on snippets

This document is an overview of the `snippets/` folder contents.


## Change log <!-- omit in toc -->

* 2026-02-09 - Swap md-index-list.md w/ md-index-list-folders.md


## Table of contents <!-- omit in toc -->

* [Overview of snippets](#overview-of-snippets)
* [Comparing indexing snippets](#comparing-indexing-snippets)
* [General usage](#general-usage)
  * [AI and translation banner usage](#ai-and-translation-banner-usage)


## Overview of snippets

| Snippet                      | Purpose                                                                                         |
| ---------------------------- | ----------------------------------------------------------------------------------------------- |
| [mapping.md][]               | Used for [map.md][] only, full site map with folder descriptions and index links                |
| [md-index-list-folders.md][] | Used for a folder's index.md file only, folder index without descriptions (use for index pages) |
| [related-guides-list.md][]   | Flat list of pages in the same folder only, excludes subfolders and the current page            |
| [doc-status-ai.md][]         | Status badge and warning for AI-translated documents                                            |
| [doc-status-wip.md][]        | Status badge and warning for work-in-progress documents                                         |


## Comparing indexing snippets

Following are indexing-related snippets that generate page lists from markdown files.
Each snippet parses frontmatter to extract titles and descriptions, then renders the results as HTML lists.

| Snippet                      | Differences                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------- |
| [mapping.md][]               | Includes folder descriptions and index links, recurses through all subfolders |
| [md-index-list-folders.md][] | Folder index without descriptions, recurses through all subfolders            |
| [related-guides-list.md][]   | Flat list of same folder only, no subfolders, excludes the current page       |


## General usage

Snippets are reusable VitePress components that can be included in markdown files using the `<!--@include: ...-->` directive.

Example: `<!--@include: ../path/to/snippets/mapping.md-->`

> [!TIP]
> Use the following prompt to generate the correct relative path:
> "Review my insert_file, and verify the relative path to include the snippet is correct."


### AI and translation banner usage

When using the document status snippets for AI-translated or work-in-progress docs, include only the relevant language region (English or Japanese) using the region markers provided in each snippet.

English version:

```markdown
<!--@include: ../path/to/snippets/doc-status-ai.md#english-->
<!--@include: ../path/to/snippets/doc-status-wip.md#english-->
```

Japanese version:

```markdown
<!--@include: ../path/to/snippets/doc-status-ai.md#japanese-->
<!--@include: ../path/to/snippets/doc-status-wip.md#japanese-->
```

[doc-status-ai.md]: ./doc-status-ai.md
[doc-status-wip.md]: ./doc-status-wip.md
[map.md]: ../en/map.md
[mapping.md]: ./mapping.md
[md-index-list-folders.md]: ./md-index-list-folders.md
[related-guides-list.md]: ./related-guides-list.md
