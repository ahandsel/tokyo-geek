# Skills

This folder contains local Codex skills used by this repository.


## Usage

To use a skill, enter the skill's name in the AI interface (VS Code extension, terminal prompt, or desktop app) with the appropriate prefix for AI tool.

| Tool           | Input       | Example                                        |
| -------------- | ----------- | ---------------------------------------------- |
| Claude         | /skill-name | `/ai-commit --auto` or `/gh-pr-reporter <URL>` |
| Codex          | $skill-name | `$ai-commit --auto` or `$gh-pr-reporter <URL>` |
| GitHub Copilot | @skill-name | `@ai-commit --auto` or `@gh-pr-reporter <URL>` |

> [!TIP]
> Ask the AI `What does [skill name] do?` to get a description of the skill's functionality and usage instructions.


## Available skills


### Daily utility skills

| Skill                     | Description                                                                                                                                                                                                        | Last updated (UTC) |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| [`ai-commit`][]           | Auto-gather git changes, confirm scope with the user, and draft a commit title and message following the project commit style guide.                                                                               | 2026-06-03 13:30   |
| [`general-en-polisher`][] | Polishes Markdown files to enforce the repo core writing rules (straight quotes, no contractions, the Oxford comma, sentence case headings, plain hyphens, and more), then runs `link-polisher` on the same files. | 2026-06-03 09:37   |

[`ai-commit`]: ./ai-commit/SKILL.md
[`general-en-polisher`]: ./general-en-polisher/SKILL.md


### Repository maintenance skills

| Skill                          | Description                                                                                                                                                                                    | Last updated (UTC) |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| [`file-folder-name-linter`][]  | Lints repository file and folder names against three fixed rules (`notes/` date prefix, `.yaml` not `.yml`, kebab-case) via `pnpm lint-naming`, with style-guide pointers for the reviewer.    | 2026-06-05 00:00   |
| [`folder-readme-maintainer`][] | Audits the repository for missing or outdated folder `README.md` files and creates or updates them. Run after adding, moving, or renaming folder contents.                                     | 2026-06-09 00:00   |
| [`readme-maintainer`][]        | Audits the repository for missing or outdated folder `README.md` files and creates or updates them.                                                                                            | 2026-06-03 04:16   |
| [`script-auditor`][]           | Audits helper scripts in `scripts/` and `skills/*/scripts/` against the `AGENTS.md` script guidelines (no Python, prefer `.mjs` or zsh, require `--help`, a notes section, and status emojis). | 2026-06-04 01:36   |
| [`skill-allowlist-syncer`][]   | Fully syncs the `Skill(<name>)` entries in `.claude/settings.json` under `permissions.allow` with the skills in the repo `skills/` folder, adding new skills and removing deleted ones.        | 2026-06-01 09:37   |

[`file-folder-name-linter`]: ./file-folder-name-linter/SKILL.md
[`folder-readme-maintainer`]: ./folder-readme-maintainer/SKILL.md
[`readme-maintainer`]: ./readme-maintainer/SKILL.md
[`script-auditor`]: ./script-auditor/SKILL.md
[`skill-allowlist-syncer`]: ./skill-allowlist-syncer/SKILL.md


### Other utility skills

| Skill                    | Description                                                                                                                                                                                             | Last updated (UTC) |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| [`gh-cli`][]             | Interact with GitHub repositories using the GitHub CLI (gh). Covers PRs, issues, releases, workflow runs, and branch operations.                                                                        | 2026-05-14 06:13   |
| [`gh-issue-to-task`][]   | Generates a `tasks/<n>-<slug>.md` scaffold from a GitHub issue: fetches the issue, extracts linked specs and Figma URLs, infers Phrase project, tag, and branch, and writes the file (optional enrich). | 2026-06-08 00:00   |
| [`gh-pr-reporter`][]     | Fetches every comment on a GitHub PR (reviews, inline review comments, and general comments) and emits a single consolidated Markdown report.                                                           | 2026-06-04 14:30   |
| [`link-polisher`][]      | Rewrites raw URLs in Markdown files as Markdown links with a human-readable label fetched from the source (Figma file name, GitHub issue or pull request title).                                        | 2026-06-03 04:16   |

[`gh-cli`]: ./gh-cli/SKILL.md
[`gh-issue-to-task`]: ./gh-issue-to-task/SKILL.md
[`gh-pr-reporter`]: ./gh-pr-reporter/SKILL.md
[`link-polisher`]: ./link-polisher/SKILL.md
