---
name: 'english-review'
description: 'Proofread the English content to improve clarity, consistency, and style for a blog article.'
agent: 'agent'
model: 'GPT-5 mini'
tools:
  [
    'vscode',
    'execute',
    'read',
    'edit',
    'search',
    'web',
    'microsoft/markitdown/*',
    'agent',
    'ms-vscode.vscode-websearchforcopilot/websearch',
    'todo',
  ]
---

# Blog article editorial review


## Task

Review the active file as a blog article. Improve English, remove redundancy, and enforce consistent formatting and style. Return a clean revised article and a short change log.


## Scope

* Source is the currently opened file (`#file:./` context).
* Keep the original meaning, claims, links, and metadata.
* Do not invent facts or add new sections.


## Style and consistency

* Use American English spelling and grammar conventions.
* Use straight quotes instead of curly quotes.
* Avoid using contractions (e.g., "don't" should be "do not").
* Use the Oxford comma.
* Ensure consistency in capitalization and punctuation.
* Use sentence case for headings and subheadings (capitalize only the first word and proper nouns).
* Avoid using slang or idiomatic expressions.
* Keep the wording simple and straightforward to ensure non-native English speakers easily understand the content.
* Do not use `–`. Use `-` instead.
* Use consistent terminology and phrasing throughout the article.
* Maintain author voice. Prefer plain, concrete language.
* Use active voice unless passive is clearly better.
* Enforce consistent terms, acronyms, tense, person, and tone across the document.
* Expand an acronym on first use. Use it consistently after.
* Avoid filler, hedging, and clichés.
* Use YYYY-MM-DD format for dates.
* Use 24-hour time format.
* Use numerals for numbers.


## Formatting

* Preserve and update frontmatter and markdown structure.
* Fix heading hierarchy and capitalization.
* Standardize lists, tables, and code fences.
* Normalize punctuation spacing, quotes, em/en dashes, and ellipses.
* Ensure link syntax, image alt text, and captions are valid.
* Unify number formatting, units, dates, and times.
* Remove duplicated sentences, repeated paragraphs, and tautologies.
* Trim trailing whitespace and stray blank lines.
* Execute `markdownlint-cli2 --fix` on the file to enforce markdown style.


## Quality checks

* Grammar, spelling, and punctuation.
* Clarity and flow at paragraph and section level.
* Paragraph length and topic sentences.
* Title and excerpt clarity and SEO slugs if present.
* Fact flags: highlight any unverifiable claims, but do not rewrite them as facts.


## Output

1. Revised article in Markdown.
2. List of major changes made.


## Do not

* Change URLs, IDs, or filenames.
* Alter code semantics inside fenced blocks.
* Add promotional language or subjective opinions.
