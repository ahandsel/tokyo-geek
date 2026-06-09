# Skills

This folder contains local Codex skills used by this repository.


## Usage

To use a skill, enter the skill's name in the AI interface (VS Code extension, terminal prompt, or desktop app) with the appropriate prefix for AI tool.

| Tool           | Input       | Example                                                 |
| -------------- | ----------- | ------------------------------------------------------- |
| Claude         | /skill-name | `/ai-commit --auto` or `/extract-copy-from-figma <URL>` |
| Codex          | $skill-name | `$ai-commit --auto` or `$extract-copy-from-figma <URL>` |
| GitHub Copilot | @skill-name | `@ai-commit --auto` or `@extract-copy-from-figma <URL>` |

> [!TIP]
> Ask the AI `What does [skill name] do?` to get a description of the skill's functionality and usage instructions.


## Available skills


### Daily utility skills

* [`ai-commit`](./ai-commit/SKILL.md): Auto-gather git changes, confirm scope with the user, and draft a commit title and message following the project commit style guide.
* [`general-en-polisher`](./general-en-polisher/SKILL.md): Polishes Markdown files to enforce the repo core writing rules (straight quotes, no contractions, the Oxford comma, sentence case headings, plain hyphens, and more), then runs `link-polisher` on the same files.
* [`git-pull-main`](./git-pull-main/SKILL.md): Bring the current git branch up to date with commits from the main branch (pull, rebase, or merge main).


### Repository maintenance skills

* [`folder-readme-maintainer`](./folder-readme-maintainer/SKILL.md): Audits the repository for missing or outdated folder `README.md` files and creates or updates them.


### UX copywriting and localization skills

* [`extract-copy-from-figma`](./extract-copy-from-figma/SKILL.md): Extracts UX copy and layer names from a Figma node into a Markdown table for downstream review and localization.


### Other utility skills

* [`gh-cli`](./gh-cli/SKILL.md): Interact with GitHub repositories using the GitHub CLI (gh). Covers PRs, issues, releases, workflow runs, and branch operations.
* [`link-polisher`](./link-polisher/SKILL.md): Rewrites raw URLs in Markdown files as Markdown links with a human-readable label fetched from the source (Figma file name, GitHub issue or pull request title).


### Figma official skills

Vendored from the official `figma@claude-plugins-official` plugin (Figma MCP Server Guide v2.2.12). See [doc-figma-mcp.md](/doc-figma-mcp.md) for MCP server setup:

* [`figma-use`](./figma-use/SKILL.md): Mandatory prerequisite before every `use_figma` tool call (write actions or JavaScript execution in a Figma file).
* [`figma-generate-design`](./figma-generate-design/SKILL.md): Translate an application page, view, or multi-section layout from code into Figma. Pair with `figma-use`.
* [`figma-generate-library`](./figma-generate-library/SKILL.md): Build or update a design system in Figma from a codebase (variables, tokens, components, theming). Pair with `figma-use`.
* [`figma-code-connect`](./figma-code-connect/SKILL.md): Create and maintain Figma Code Connect template files (`.figma.ts` / `.figma.js`) that map Figma components to code.
* [`figma-create-new-file`](./figma-create-new-file/SKILL.md): Mandatory prerequisite before every `create_new_file` tool call (new Design, FigJam, or Slides file).
* [`figma-generate-diagram`](./figma-generate-diagram/SKILL.md): Mandatory prerequisite before every `generate_diagram` tool call. Routes flowcharts, ERDs, sequence diagrams, gantt charts, and other Mermaid-based diagrams to FigJam.
* [`figma-use-figjam`](./figma-use-figjam/SKILL.md): FigJam-specific guidance for `use_figma`. Compose with `figma-use`.
* [`figma-use-slides`](./figma-use-slides/SKILL.md): Slides-specific guidance for `use_figma`. Compose with `figma-use`.
