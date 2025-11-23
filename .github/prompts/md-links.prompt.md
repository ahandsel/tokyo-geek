---
agent: agent
model: GPT-5 mini
description: Convert all inline Markdown links to reference links using [text][] with [text]: url definitions.
---

# Markdown Inline Links to Reference Links Converter


## Task

Scan the active Markdown file and convert every inline link `[text](url)` into a reference link `[text][]` with a single definition of the form `[text]: url` appended at the end of the file.


## Rules

* Use **implicit reference labels**. For `[text](url)` produce `[text][]` and a single `[text]: url` definition.
* **Do not touch** content inside fenced code blocks, inline code spans, HTML blocks, or YAML frontmatter.
* Preserve existing reference-style definitions. Reuse them if the label matches.
* **Deduplicate** by label+URL. Multiple identical inline links must point to one definition.
* **Collisions**: if two different URLs share the same link text, keep the first as `[text]: first-url` and create unique slugs for others: `[text-2]: second-url`, `[text-3]: third-url`, then reference them as `[text-2][]`, `[text-3][]` only where needed.
* **Ordering**: emit new definitions in order of first appearance in the document.
* **Placement**: after conversion, append one blank line, then all new definitions at the very end of the file, after any existing definitions.
* Preserve link fragments, and query strings. Example: `[t](https://ex.com/p?q=1#f)` → `[t][]` with `[t]: https://ex.com/p?q=1#f`.
* Handle autolinks `<https://…>` by converting to `[url][]` with the literal URL as label: `[https://…]: https://…`. Skip if inside code.
* Do **not** change images, footnotes, or reference-style images.
* Output must be a unified diff against the current file.


## Algorithm

1. Parse the Markdown into tokens while tracking fenced code, inline code, and HTML to avoid edits there.
2. Find inline links and autolinks outside excluded regions.
3. Build a map: `label -> {url, title, firstIndex}`. The label is the visible link text trimmed of surrounding whitespace. For autolinks, use the URL as label.
4. Resolve collisions by generating `label-2`, `label-3`, … only for conflicting URLs.
5. Replace each inline link with `[resolved-label][]`.
6. Collect new definitions not already present. Sort by `firstIndex`. Format as `[label]: url`.
7. Append definitions at EOF after one blank line. Keep any preexisting definitions in place.
8. Return a unified diff applying all edits.


## Acceptance checks

* No inline links remain outside excluded regions.
* Definitions exist for every `[label][]` and are unique.
* No duplicate or unreachable definitions are introduced.
* File renders equivalently aside from link style changes.


## Example

Input:

```md
See [Docs](https://example.com/docs "Guide") and <https://example.com>.
```

Output:

```md
See [Docs][] and [example.com][].

[Docs]: https://example.com/docs
[example.com]: https://example.com
```
