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

| Prompt                                    | Description                                                                                                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [audit-broken-md.prompt.md][]             | Audit every Markdown file for character-substitution corruption left by a failed linter or regex pass, and report findings without editing.                  |
| [audit-file-name.prompt.md][]             | Audit and propose renames for files and folders under a given path to comply with the naming conventions.                                                    |
| [audit-gh-workflow.prompt.md][]           | Audit a GitHub Actions workflow for correctness, security, and robustness, then propose selectable fixes.                                                    |
| [audit-new-skill.prompt.md][]             | Audit the skills, scripts, and docs added in a commit, auto-apply low-risk fixes, and propose scripts that automate the skill.                               |
| [audit-skills-security.prompt.md][]       | Audit every skill in `skills/` and flag any skill that a cautious user should review before use.                                                             |
| [csv-lint.prompt.md][]                    | Lint CSV files with minimal quoting and consistent formatting.                                                                                               |
| [csv-to-md.prompt.md][]                   | Convert CSV tables into Markdown tables.                                                                                                                     |
| [gh-pr-ready.prompt.md][]                 | Diagnose why a branch or pull request is not ready to merge, then fix it after approval.                                                                     |
| [improve-my-prompt.prompt.md][]           | Rewrite a supplied prompt using current prompt-engineering practices, and return it with a changelog and clarifying questions.                               |
| [ja-review.prompt.md][]                   | Proofread Japanese text, normalize notation, and optimize structure per the repo Japanese style guide; defaults to the `contents/ja/` travel and tech pages. |
| [md-en-review.prompt.md][]                | Proofread and edit English text for clarity, grammar, and style guide compliance.                                                                            |
| [md-lint.prompt.md][]                     | Scan Markdown files, update tables of contents, fix formatting, and enforce the style guide.                                                                 |
| [md-map-link.prompt.md][]                 | Link the first mention of every real-world location to a Google Maps search query.                                                                           |
| [md-ref-link.prompt.md][]                 | Convert inline Markdown links into reference-style links.                                                                                                    |
| [md-to-csv.prompt.md][]                   | Convert Markdown tables into CSV.                                                                                                                            |
| [md-to-list.prompt.md][]                  | Convert a Markdown table into a nested Markdown list without changing cell text or order.                                                                    |
| [quick-en-review.prompt.md][]             | Quickly proofread and edit English text for clarity, grammar, and style.                                                                                     |
| [repo-enforce-yaml.prompt.md][]           | Audit and normalize `.yml` versus `.yaml` extension references across the repository, standardizing on `.yaml`.                                              |
| [repo-public-audit.prompt.md][]           | Audit a repository for personal, public use and flag terms or files that do not fit its purpose.                                                             |
| [script-review-min.prompt.md][]           | Review and improve a script with minimal, surgical edits.                                                                                                    |
| [script-review.prompt.md][]               | Review and improve a script for quality, readability, reusability, scalability, and security.                                                                |
| [script-version-sync.prompt.md][]         | Auto-update changed scripts' version history and flag related documentation that is out of sync.                                                             |
| [setup-ja-font.prompt.md][]               | Set up a Japanese-friendly editor font so Markdown tables mixing English and Japanese line up in VS Code.                                                    |
| [skills-script-review.prompt.md][]        | Review an AI agent skill and assess where Node.js scripts would replace prose instructions.                                                                  |
| [ux-check-csv.prompt.md][]                | Proofread and edit UX copy in a CSV file.                                                                                                                    |
| [ux-check-md.prompt.md][]                 | Proofread and edit UX copy in a Markdown table.                                                                                                              |
| [vitepress-show-translations.prompt.md][] | Keep the VitePress language switcher visible at all widths so it tracks the search button.                                                                   |

[audit-broken-md.prompt.md]: audit-broken-md.prompt.md
[audit-file-name.prompt.md]: audit-file-name.prompt.md
[audit-gh-workflow.prompt.md]: audit-gh-workflow.prompt.md
[audit-new-skill.prompt.md]: audit-new-skill.prompt.md
[audit-skills-security.prompt.md]: audit-skills-security.prompt.md
[csv-lint.prompt.md]: csv-lint.prompt.md
[csv-to-md.prompt.md]: csv-to-md.prompt.md
[gh-pr-ready.prompt.md]: gh-pr-ready.prompt.md
[improve-my-prompt.prompt.md]: improve-my-prompt.prompt.md
[ja-review.prompt.md]: ja-review.prompt.md
[md-en-review.prompt.md]: md-en-review.prompt.md
[md-lint.prompt.md]: md-lint.prompt.md
[md-map-link.prompt.md]: md-map-link.prompt.md
[md-ref-link.prompt.md]: md-ref-link.prompt.md
[md-to-csv.prompt.md]: md-to-csv.prompt.md
[md-to-list.prompt.md]: md-to-list.prompt.md
[quick-en-review.prompt.md]: quick-en-review.prompt.md
[repo-enforce-yaml.prompt.md]: repo-enforce-yaml.prompt.md
[repo-public-audit.prompt.md]: repo-public-audit.prompt.md
[script-review-min.prompt.md]: script-review-min.prompt.md
[script-review.prompt.md]: script-review.prompt.md
[script-version-sync.prompt.md]: script-version-sync.prompt.md
[setup-ja-font.prompt.md]: setup-ja-font.prompt.md
[skills-script-review.prompt.md]: skills-script-review.prompt.md
[ux-check-csv.prompt.md]: ux-check-csv.prompt.md
[ux-check-md.prompt.md]: ux-check-md.prompt.md
[vitepress-show-translations.prompt.md]: vitepress-show-translations.prompt.md
