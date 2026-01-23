# Project overview

Vitepress-based documentation site for Tokyo Geek.


## Libraries and tools

* [Vitepress](https://vitepress.dev/) - Static site generator
* [vitepress-plugin-sidebar](https://github.com/jooy2/vitepress-sidebar) - Auto generate sidebar for Vitepress
* [Markdownlint](https://github.com/DavidAnson/markdownlint) - Markdown linting tool


## Writing style guide

* Use straight quotes instead of curly quotes.
* Avoid using contractions (Example: "don't" should be "do not").
* Use the Oxford comma.
* Ensure consistency in capitalization and punctuation.
* Use sentence case for headings and subheadings (capitalize only the first word and proper nouns).
* Avoid using slang or idiomatic expressions.
* Keep the wording simple and straightforward to ensure non-native English speakers easily understand the content.
* Do not use `–`. Use `-` instead.
* Tone: Friendly and simple, avoiding overly wordy or formal language.
* Voice: Prefer active voice; use passive voice only when necessary.
* Readability: Use short sentences and paragraphs; utilize lists and tables for clarity.
* Use emojis to enhance the reading experience, but do not overuse them. Avoid using emojis in headings.
* Use numerical digits for all numbers as it improves readability (Example: "5" instead of "five").
* Use `Example:` instead of `e.g.:` for better clarity.


## Markdown formatting guidelines


### Link format

* Use reference-style links for all URLs.
* Prefer using collapsed reference links in markdown when possible: `[example][]`
  * Should only be used if alphabetical characters are in the link identifier.
* When collapsed reference links are not possible, use full reference links: `[example.com][example-link]`
  * The link identifier should be in kebab-case, lowercase letters, numbers, and hyphens only.
  * The link identifier should be 2 to 4 words long.
* For multiple links to the same URL, reuse the same reference label.
* Specific link identifier prefixes:
  * For Google Maps links, start with `map-` followed by the place name in kebab-case.
  * For images, start with `img-` followed by a brief description in kebab-case.
  * For YAMAP links, start with `yamap-` followed by the trail name in kebab-case.


### Front matter format

The document must include this front matter format:

```md
---
title: 'Document title'
description: 'Brief description of the document.'
head:
  - - meta
    - name: keywords
      content: sample, keywords
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

[[toc]]
```

Use the title and description from the front matter as the first heading and introductory paragraph. Include `[[toc]]` after the introduction.
