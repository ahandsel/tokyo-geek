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

Translate the active file from English to Japanese as a blog article. Preserve meaning, tone, and intent while producing natural, readable Japanese. Return a clean translated article and a short translation log.


## Scope

* Source is the currently opened file (`#file:./` context).
* Do not change the original meaning, claims, links, or non-linguistic metadata.
* Do not invent facts or add new sections.


## What to translate vs. preserve


### Preserve exactly (do not translate, do not reformat)

* Frontmatter keys and any machine-readable values (for example: `slug`, `id`, `date`, `tags` values, URLs, file paths).
* URLs (including link destinations), IDs, filenames, anchors, and query strings.
* Fenced code blocks and their contents, including language identifiers.
* Inline code spans.
* CLI commands, API names, function names, configuration keys, JSON/YAML keys, and error messages.
* Placeholders and templating markers (for example: `{var}`, `${VAR}`, `{{...}}`, `<tag>...</tag>`).
* Markdown structure: headings, lists, tables, blockquotes, link syntax, and image syntax.


### Translate (natural Japanese)

* Titles, headings, body text, captions, and alt text (unless the alt text is intentionally a literal identifier).
* Human-readable frontmatter values (for example: `title`, `description`, `summary`, `excerpt`) unless they are explicitly treated as identifiers.


## Japanese style and consistency

* Match the author voice and register:
  * If the source is formal, use a consistent formal register.
  * If the source is casual, use a consistent casual register.
  * If unclear, default to a neutral, professional "です・ます" style.
* Prefer plain, concrete Japanese. Avoid slang and overly literary phrasing.
* Keep terminology consistent across the document. If a term is repeated in English, translate it consistently in Japanese.
* Expand acronyms on first use if the source does (do not add expansions that are not present in the source).
* Keep date and time formats exactly as written in the source (for example, keep YYYY-MM-DD and 24-hour time if present).
* Use ASCII `"` for quotations when needed. Do not introduce curly quotes.
* Do not use `–`. Use `-` instead.


## Quality checks

* Accuracy: no missing sentences, no added claims, and no meaning drift.
* Fluency: natural Japanese phrasing and sentence flow.
* Technical correctness: preserved code, placeholders, links, and metadata.
* Consistency: terms, tone, and formatting are uniform across sections.


## Output

1. Translated article in Markdown (Japanese), preserving the original Markdown structure.
2. Translation log (bullet list), including:
   * Major translation decisions (tone/register, recurring term choices).
   * Any ambiguous phrases flagged with brief notes (do not rewrite facts).
   * A short glossary of key terms (EN -> JA) if the article contains domain-specific terminology.


## Do not

* Change URLs, IDs, filenames, anchors, or code.
* Alter code semantics inside fenced blocks or inline code.
* Add promotional language or subjective opinions.
