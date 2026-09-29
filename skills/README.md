# Skills

This folder contains the local AI skills used by this repository.


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

| Skill                      | Description                                                                                                                                                                                                                                          | Last updated |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| [`ai-commit`][]            | Auto-gather git changes, confirm scope with the user, and draft a commit title and message following the project commit style guide.                                                                                                                  | 2026-06-03   |
| [`content-sync-en-ja`][]   | Audits the `contents/en` and `contents/ja` trees for orphans and drift, then closes each gap by delegating the translation to `blog-translator` and reconciling the `localization` state. | 2026-09-06   |
| [`blog-content-auditor`][] | Audits one content Markdown file for content quality: verifies facts are correct and up-to-date, checks style-guide compliance, and confirms the content is logically sound and complete, then reports findings grouped by accuracy, style, and sense. | 2026-06-26   |
| [`blog-md-linter`][]       | Lints and polishes a Markdown file, or every Markdown file under a folder such as `contents/`: runs the repo auto-fixers, refreshes any table of contents, converts links to reference-style links per the repo convention, and checks style-guide compliance. | 2026-06-14   |
| [`blog-translator`][]      | Translates a paired content Markdown file between English and Japanese: detects the direction from the source path, finds the 1-to-1 counterpart, preserves frontmatter, Markdown, code, and VitePress directives, and reconciles the `localization` state. | 2026-06-14   |
| [`general-en-polisher`][]  | Polishes Markdown files to enforce the repo core writing rules (straight quotes, no contractions, the Oxford comma, sentence case headings, plain hyphens, and more), then runs `link-polisher` on the same files.                                     | 2026-06-03   |
| [`gh-sync-with-main`][]    | Bring the current git branch up to date with commits from the main branch (pull, rebase, or merge main), or check the sync status without changing anything with `--verify`.                                                                            | 2026-09-29   |

[`ai-commit`]: ./ai-commit/SKILL.md
[`blog-content-auditor`]: ./blog-content-auditor/SKILL.md
[`blog-md-linter`]: ./blog-md-linter/SKILL.md
[`blog-translator`]: ./blog-translator/SKILL.md
[`content-sync-en-ja`]: ./content-sync-en-ja/SKILL.md
[`general-en-polisher`]: ./general-en-polisher/SKILL.md
[`gh-sync-with-main`]: ./gh-sync-with-main/SKILL.md


### Repository maintenance skills

| Skill                          | Description                                                                                                                                                                                                                                       | Last updated |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| [`audit-gh-branches`][]        | Audits every local and remote Git branch, classifies each as safe to delete, deletion candidate, needs rebase, ice, or keep active, and extracts unique work as dated notes. Read-only.                                                              | 2026-09-29   |
| [`file-folder-name-linter`][]  | Lints repository file and folder names against three fixed rules (`notes/` date prefix, `.yaml` not `.yml`, kebab-case) via `pnpm lint-naming`, with style-guide pointers for the reviewer.                                                         | 2026-06-05   |
| [`folder-readme-maintainer`][] | Audits the repository for missing or outdated folder `README.md` files and creates or updates them. Run after adding, moving, or renaming folder contents.                                                                                          | 2026-06-09   |
| [`pr-auditor`][]               | Blunt merge audit of a branch or PR written by an AI coding agent, treating its description, comments, and green checks as claims to verify, and reporting severity-ranked findings without editing anything.                                        | 2026-09-06   |
| [`script-auditor`][]           | Audits helper scripts in `scripts/` and `skills/*/scripts/` against the `AGENTS.md` script guidelines (no Python, prefer `.mjs` or zsh, require `--help`, a notes section with a version history, and status emojis).                               | 2026-08-18   |
| [`skill-allowlist-syncer`][]   | Fully syncs the managed `permissions.allow` entries in `.claude/settings.json` with the repo `skills/` folder: one `Skill(<name>)` entry per skill, and one `Bash(<runner> <path>:*)` entry per runnable script stored inside a skill.               | 2026-08-18   |

[`audit-gh-branches`]: ./audit-gh-branches/SKILL.md
[`file-folder-name-linter`]: ./file-folder-name-linter/SKILL.md
[`folder-readme-maintainer`]: ./folder-readme-maintainer/SKILL.md
[`pr-auditor`]: ./pr-auditor/SKILL.md
[`script-auditor`]: ./script-auditor/SKILL.md
[`skill-allowlist-syncer`]: ./skill-allowlist-syncer/SKILL.md


### Other utility skills

| Skill                  | Description                                                                                                                                                                                             | Last updated |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| [`audit-pr-comments`][] | Audits a user-specified PR review file with extreme scrutiny, annotates every comment in place with a verdict (keep, rewrite, remove, downgrade, escalate, expand, merge, split, or request evidence), then offers to fix the valid findings.       | 2026-09-06   |
| [`gh-cli`][]           | Interact with GitHub repositories using the GitHub CLI (gh). Covers PRs, issues, releases, workflow runs, and branch operations.                                                                         | 2026-05-14   |
| [`gh-pr-generator`][]  | Drafts a structured pull request body from the branch diff (summary, pending tasks, and a collapsed details block), runs the pre-flight checks, and opens the PR with the `gh` CLI.                       | 2026-09-06   |
| [`gh-pr-reporter`][]   | Fetches every comment on a GitHub PR (reviews, inline review comments, and general comments) and emits a single consolidated Markdown report.                                                            | 2026-06-04   |
| [`link-polisher`][]    | Rewrites raw URLs in Markdown files as Markdown links with a human-readable label fetched from the source (Figma file name, GitHub issue or pull request title).                                         | 2026-06-03   |

[`audit-pr-comments`]: ./audit-pr-comments/SKILL.md
[`gh-cli`]: ./gh-cli/SKILL.md
[`gh-pr-generator`]: ./gh-pr-generator/SKILL.md
[`gh-pr-reporter`]: ./gh-pr-reporter/SKILL.md
[`link-polisher`]: ./link-polisher/SKILL.md


### Productivity skills

Vendored from [`mattpocock/skills`](https://github.com/mattpocock/skills/tree/main/skills/productivity), copyright (c) 2026 Matt Pocock, MIT license.
Each vendored folder carries a copy of the upstream `LICENSE`.
These are general workflow tools, not repo-specific.
Every skill except `grilling` is user-invoked only (`disable-model-invocation`), so you reach it by typing the command.

| Skill                      | Description                                                                                                                        | Last updated |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| [`grill-me`][]             | Run a relentless interview that sharpens a plan or design until every branch of the decision tree is resolved. User-invoked only.  | 2026-09-06   |
| [`grilling`][]             | The same relentless plan and design interview as `grill-me`, but the model can also reach for it on "grill" trigger phrases.       | 2026-09-06   |
| [`handoff`][]              | Compact the current conversation into a handoff document so another agent can continue the work. User-invoked only.                | 2026-09-06   |
| [`writing-great-skills`][] | Reference for writing and editing skills well: the vocabulary and principles that make a skill predictable. User-invoked only.     | 2026-09-06   |

[`grill-me`]: ./grill-me/SKILL.md
[`grilling`]: ./grilling/SKILL.md
[`handoff`]: ./handoff/SKILL.md
[`writing-great-skills`]: ./writing-great-skills/SKILL.md
