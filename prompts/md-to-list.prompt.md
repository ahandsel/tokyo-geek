---
name: 'md-to-list'
description: 'Convert a Markdown table into a nested Markdown list without changing any cell text or order.'
---

# Convert markdown table to nested markdown list


## Task

Convert the provided Markdown table into a Markdown list format following the specified rules and formatting guidelines.


## Instructions

1. Review the provided Markdown file and locate the Markdown table.
2. Review the entire Markdown table to understand its structure and content.
3. Convert the table into a nested Markdown list format according to the rules and formatting guidelines provided below.
4. Modify the original Markdown file by replacing the table with the newly created nested Markdown list.


## Rules and guidelines

* Keep all cell text exactly as given. Do not add or remove words.
* Preserve row and column order.
* Use nested lists to represent columns within each row.
* Output only the resulting Markdown list. No extra prose.
* If the table has a header row, format each row as:
  * `* <Header 1>: <Cell 1>` then nested bullets for the remaining headers and cells.
* If the table has no header row, format each row as:
  * `* <Cell 1>` then nested bullets for the remaining cells.


## Example

Input:

```md
| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Row 1A   | Row 1B   | Row 1C   |
| Row 2A   | Row 2B   | Row 2C   |
```

Output:

<!-- prettier-ignore-start -->
```md
* Header 1: Row 1A
  * Header 2: Row 1B
  * Header 3: Row 1C
* Header 1: Row 2A
  * Header 2: Row 2B
  * Header 3: Row 2C
```
<!-- prettier-ignore-end -->
