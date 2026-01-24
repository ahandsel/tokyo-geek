---
name: 'en-to-ja-translate'
description: 'Translate an English Markdown blog article into Japanese while preserving meaning, structure, and technical correctness.'
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

# Blog article translation (English to Japanese)


## Task

Translate the active file from English to Japanese as a blog article. Preserve meaning, tone, and intent, and produce natural, readable Japanese. Return a clean translated article and a short translation log.


## Scope

* Source is the currently opened file (`#file:./` context).
* Do not change meaning, claims, links, or non-linguistic metadata.
* Do not invent facts, add new sections, or remove content.


## Output requirements

Produce exactly two sections, in this order:

1. `## Translated article` - the translated Markdown article (Japanese), preserving the original Markdown structure.
2. `## Translation log` - a bullet list that includes:
   * Major translation decisions (tone/register, recurring term choices).
   * Ambiguous phrases flagged with brief notes (do not rewrite facts).
   * A short glossary of key terms (EN -> JA) if the article contains domain-specific terminology.

Do not include any other preface or commentary.


## What to translate vs. preserve


### Preserve exactly (do not translate, do not reformat)

* Markdown structure and formatting:
  * Headings, lists, tables, blockquotes, horizontal rules.
  * Link syntax and destinations, image syntax and destinations.
* Frontmatter:
  * Keys and any machine-readable or identifier-like values (for example: `slug`, `id`, `date`, `tags`, URLs, file paths).
  * Keep all frontmatter keys, ordering, and formatting unchanged.
* Code and technical literals:
  * Fenced code blocks and their contents, including language identifiers.
  * Inline code spans.
  * CLI commands, API names, function names, class names, method names.
  * Configuration keys, JSON/YAML keys, environment variable names.
  * Error messages, stack traces, and log output.
* Identifiers and references:
  * URLs (including query strings), anchors, IDs.
  * Filenames, paths, and package names.
  * Placeholders and templating markers (for example: `{var}`, `${VAR}`, `{{...}}`, `<tag>...</tag>`).


### Translate (natural Japanese)

* Titles, headings, body text, captions, and image alt text, unless the text is clearly an identifier that must remain unchanged.
* Human-readable frontmatter values (for example: `title`, `description`, `summary`, `excerpt`) unless clearly treated as identifiers.


## Japanese style and consistency

* Match the author voice and register:
  * If the source is formal, use a consistent formal register.
  * If the source is casual, use a consistent casual register.
  * If unclear, default to a neutral, professional "です・ます" style.
* Prefer plain, concrete Japanese. Avoid slang and overly literary phrasing.
* Keep terminology consistent across the document. If a term is repeated in English, translate it consistently in Japanese.
* Keep abbreviations and acronyms as written unless the source expands them. Do not add expansions not present in the source.
* Keep date and time formats exactly as written in the source (for example: keep `YYYY-MM-DD`, and keep 24-hour time if present).
* Use ASCII `"` for quotations when needed. Do not introduce curly quotes.
* Do not use `–`. Use `-` instead.


## Quality checks

Before returning the result, verify:

* Accuracy: no missing sentences, no added claims, and no meaning drift.
* Fluency: natural Japanese phrasing and sentence flow.
* Technical correctness: code, placeholders, links, and metadata are preserved exactly.
* Consistency: terms, tone, and formatting are uniform across sections.


## Do not

* Change URLs, IDs, filenames, anchors, query strings, or code.
* Alter code semantics inside fenced blocks or inline code.
* Add promotional language or subjective opinions.
* Translate tool names, product names, or proper nouns when doing so would reduce clarity.
