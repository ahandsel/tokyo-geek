# Prompts

Reusable AI prompt files (`*.prompt.md`) for reviewing, linting, and converting Markdown documentation, UX copy, and scripts in this repository. Each file defines a task-specific instruction set to run with an AI assistant.


## Usage

To use a prompt, reference the prompt's file path in the AI interface (VS Code extension, terminal prompt, or desktop app) with the appropriate prefix for the AI tool.

| Tool           | Input                                    | Example                                                 |
| -------------- | ---------------------------------------- | ------------------------------------------------------- |
| Claude         | `Follow prompts/<prompt-file>.prompt.md` | `Follow prompts/md-ref-link.prompt.md for example.md`   |
| Codex          | `Follow prompts/<prompt-file>.prompt.md` | `Follow prompts/md-ref-link.prompt.md for example.md`   |
| GitHub Copilot | `#prompts/<prompt-file>.prompt.md`       | `#prompts/script-version-sync.prompt.md for example.md` |


## Contents

| Prompt                            | Description                                                                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| [csv-lint.prompt.md][]            | Lint CSV files with minimal quoting and consistent formatting.                                   |
| [csv-to-md.prompt.md][]           | Convert CSV tables into Markdown tables.                                                         |
| [md-en-review.prompt.md][]        | Proofread and edit English text for clarity, grammar, and style guide compliance.                |
| [md-lint.prompt.md][]             | Scan Markdown files, update tables of contents, fix formatting, and enforce the style guide.     |
| [md-ref-link.prompt.md][]         | Convert inline Markdown links into reference-style links.                                        |
| [md-to-csv.prompt.md][]           | Convert Markdown tables into CSV.                                                                |
| [md-to-list.prompt.md][]          | Convert a Markdown table into a nested Markdown list without changing cell text or order.        |
| [prd-review-terms.prompt.md][]    | Extract and define terminology from a PRD document.                                              |
| [quick-en-review.prompt.md][]     | Quickly proofread and edit English text for clarity, grammar, and style.                         |
| [repo-public-audit.prompt.md][]   | Audit a repository for personal, public use and flag terms or files that do not fit its purpose. |
| [script-review-min.prompt.md][]   | Review and improve a script with minimal, surgical edits.                                        |
| [script-review.prompt.md][]       | Review and improve a script for quality, readability, reusability, scalability, and security.    |
| [script-version-sync.prompt.md][] | Auto-update changed scripts' version history and flag related documentation that is out of sync. |
| [ux-check-csv.prompt.md][]        | Proofread and edit UX copy in a CSV file.                                                        |
| [ux-check-md.prompt.md][]         | Proofread and edit UX copy in a Markdown table.                                                  |

[csv-lint.prompt.md]: csv-lint.prompt.md
[csv-to-md.prompt.md]: csv-to-md.prompt.md
[md-en-review.prompt.md]: md-en-review.prompt.md
[md-lint.prompt.md]: md-lint.prompt.md
[md-ref-link.prompt.md]: md-ref-link.prompt.md
[md-to-csv.prompt.md]: md-to-csv.prompt.md
[md-to-list.prompt.md]: md-to-list.prompt.md
[prd-review-terms.prompt.md]: prd-review-terms.prompt.md
[quick-en-review.prompt.md]: quick-en-review.prompt.md
[repo-public-audit.prompt.md]: repo-public-audit.prompt.md
[script-review-min.prompt.md]: script-review-min.prompt.md
[script-review.prompt.md]: script-review.prompt.md
[script-version-sync.prompt.md]: script-version-sync.prompt.md
[ux-check-csv.prompt.md]: ux-check-csv.prompt.md
[ux-check-md.prompt.md]: ux-check-md.prompt.md
