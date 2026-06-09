---
name: 'md-to-csv'
description: 'Convert Markdown tables into CSV following the specified template.'
---

# Convert Markdown tables into CSV


## Purpose

Convert Markdown tables into CSV. No commentary. No summaries. Output only CSV.


## When to apply

* The user pastes a Markdown table or a Markdown file containing a table.
* The user asks to transform a Markdown table to CSV.


## Output contract

* Emit **only** CSV text. No code fences. No prose.
* RFC 4180 style: comma-separated, CRLF or LF accepted, UTF-8.
* Header row first. Preserve column order and cell text exactly.
* Quote any field that contains a comma, double quote, or newline.
* Escape double quotes inside a field by doubling them.
* Do not trim whitespace, reflow text, or alter punctuation.
* If multiple Markdown tables are provided, convert the first unless the user specifies otherwise.


## Procedure

1. Read the entire Markdown input line by line.
2. Identify the target Markdown table (pipes `|` or header-divider syntax).
3. Parse rows and cells without altering cell content.
4. Write CSV rows in the same order.
5. Apply quoting rules and escape embedded quotes by doubling.
6. Return the CSV output only.


## CSV template

When requested, use this template as the target schema:

```csv
key_name,en,comment
```


## Example


### Input (Markdown)

```markdown
| English      | Key      | Description      | Notes      |
| ------------ | -------- | ---------------- | ---------- |
| englishValue | keyValue | descriptionValue | notesValue |
```


### Output (CSV)

```csv
key_name,en,comment
keyValue,englishValue,descriptionValue
```
