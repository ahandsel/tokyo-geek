# Writing style guides

This folder contains all the writing style guides relevant for this repository, including general writing rules, documentation-specific rules, and repository-specific conventions for formatting and style within documents.


## Change log <!-- omit in toc -->

* 2026-05-20 - Sanitized for public portfolio use; removed product-specific branding and internal references.


## Table of contents <!-- omit in toc -->

* [Overview](#overview)
* [File structure](#file-structure)
* [General style guides](#general-style-guides)
* [Technical style guides](#technical-style-guides)
* [Markdown style guide](#markdown-style-guide)
* [Frontmatter style guide](#frontmatter-style-guide)
* [Commit style guide](#commit-style-guide)
* [Terminology and glossary](#terminology-and-glossary)
* [Document templates](#document-templates)
* [Contents structure snapshot](#contents-structure-snapshot)


## Overview

These style guides standardize voice, tone, wording, formatting, and translation conventions for this repository's content.

This folder includes the following style guides:

* The general style guides define baseline writing rules such as language, grammar, capitalization, and punctuation.
* The technical style guides define documentation-specific writing rules such as sentence structure, lists, procedural steps, and alert banners.
* The Markdown style guide defines how Markdown documents in this repository should be formatted, such as note banners and reference-style links.


## File structure

```text
docs/
├── README.md ........................... This file
├── general-style-guide-english.md ...... Baseline writing rules (English)
├── general-style-guide-japanese.md ..... Baseline writing rules (Japanese)
├── technical-style-guide-english.md .... Documentation-specific rules (English)
├── technical-style-guide-japanese.md ... Documentation-specific rules (Japanese)
├── markdown-style-guide.md ............. Markdown formatting conventions (banners and links)
├── frontmatter-style-guide.md .......... YAML frontmatter keys for content files
├── repo-commit-style-guide.md .......... Git commit title and body conventions
├── technical-doc-overview.md ........... Overview of help document types
├── glossary.yaml ....................... EN-JA translation glossary
├── words-to-avoid.txt .................. cspell trigger list for terms to flag
├── contents-structure.md ............... Auto-generated tree snapshot of contents/
└── templates/ .......................... Document structure templates
    ├── how-to-guides-template-structure.md
    ├── how-to-guides-example.md
    └── reference-document-template-structure.md
```
  

## General style guides

The general style guides define baseline writing rules that apply across all documentation content. They cover language, grammar, capitalization, punctuation, inclusive language, internationalization, formatting, and word usage.

* [General style guide - English](./general-style-guide-english.md) - Rules for English writing, including active voice, contractions, abbreviations, capitalization, punctuation, date and time formats, and a word list.
* [General style guide - Japanese](./general-style-guide-japanese.md) - Rules for Japanese writing, including honorifics, character usage (kanji, hiragana, katakana), punctuation, and formatting.


## Technical style guides

Help documentation writing falls under the technical style guides. These contain documentation-specific writing rules that supplement the general style guides and apply to help documentation authored in Markdown and rendered with VitePress.

* [Technical style guide - English](./technical-style-guide-english.md) - Rules for English documentation, including sentence structure, lists, preparations sections, procedural steps, inline formatting, and alert banners.
* [Technical style guide - Japanese](./technical-style-guide-japanese.md) - Rules for Japanese documentation, including tone, expressions, procedural steps, sentence structure, inline formatting, punctuation, and alert banners.
* [Help documentation overview](./technical-doc-overview.md) - Explains the four types of help documents (tutorials, how-to guides, reference documents, and explanations) and when to use each type. Based on the [Diataxis](https://diataxis.fr/) framework.


## Markdown style guide

* [Markdown style guide](./markdown-style-guide.md) - How Markdown documents in this repository should be formatted, including banners that highlight important notes and link styling within documents.


## Frontmatter style guide

* [Frontmatter style guide](./frontmatter-style-guide.md) - The YAML frontmatter keys used in content files under `contents/`, covering the page title, search and social metadata, sidebar behavior, and bilingual localization state.


## Commit style guide

* [Git commit style guide](./repo-commit-style-guide.md) - Title format, body format, and emoji conventions for commits in this repository.


## Terminology and glossary

* [EN-JA translation glossary](./glossary.yaml) - English-to-Japanese term translations organized by topic. Each entry includes the English term, Japanese translation, and usage context.
* [Words to avoid](./words-to-avoid.txt) - cspell trigger list of words that should be flagged for review during spell checks.


## Document templates

The [templates/](./templates) folder contains structure definitions and examples for supported help document types.

* [How-to guides - template structure](./templates/how-to-guides-template-structure.md) - Required section order and formatting rules for how-to guide documents.
* [How-to guides - example](./templates/how-to-guides-example.md) - A sample how-to guide that demonstrates the template in practice.
* [Reference document - template structure](./templates/reference-document-template-structure.md) - Required section order and formatting rules for reference documents.


## Contents structure snapshot

* [Contents structure](./contents-structure.md) - Auto-generated tree view of the [`contents/`](../contents/) folder. Regenerated by running `pnpm tree`.
