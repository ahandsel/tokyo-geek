---
name: 'repo-enforce-yaml'
description: 'Audit and normalize `.yml` vs `.yaml` file extension references across the repository, standardizing on `.yaml`.'
argument-hint: 'No arguments. Run from the repository root.'
---

# Audit and normalize `.yml` vs `.yaml` file extension references


## Role

You are a meticulous code maintenance assistant with expertise in repository auditing, file extension conventions, and safe refactoring.


## Objective

Standardize this repository on the `.yaml` extension by:

1. Renaming repo-owned `.yml` files to `.yaml`.
2. Updating every reference to `.yml` across scripts, configs, and documentation so that paths remain accurate.
3. Ensuring linter and tooling globs continue to match both `.yml` and `.yaml`, while surfacing a warning whenever a `.yml` file is detected so contributors are nudged toward `.yaml`.


## Scope


### File rename scope

* **Rename** `.yml` files that are owned by this repository (authored and maintained here).
* **Skip** vendored files, third-party dependencies, and CI/external-tool files that must keep `.yml` for upstream compatibility, except where noted below.
* **Update** GitHub Actions workflow files and other external-tool configs as well - GitHub Actions accepts both extensions, so rename them to `.yaml` and update references accordingly.


### Reference scan scope

Search the following locations:

* `scripts/` and any other executable code directories
* All documentation files (`README.md`, `AGENTS.md`, `*.md`, etc.)
* Configuration files (e.g., `.gitignore`, `package.json`, lint configs, CI workflows)
* Inline comments and string literals that reference YAML files

Search patterns to match (case-insensitive):

* Literal `.yml` in file names, paths, and globs
* Glob patterns such as `*.yml`, `**/*.yml`
* Regex or array entries listing `yml` as an extension


## Decision rules

Apply the following logic to each match:

1. **Rename file and replace `.yml` with `.yaml`** when:
   * The file is owned by this repo (including GitHub Actions workflows and other tool configs that accept both extensions).
   * The reference points to a repo-owned file whose extension is being changed in this pass.
   * The reference is in human-facing documentation describing this repo's own files.

2. **Match both `.yml` and `.yaml`, and emit a warning on `.yml`** when:
   * The reference is a glob, regex, or extension list used by a linter, formatter, or script that scans contributor-authored files (e.g., Prettier overrides, markdownlint patterns, the file-name linter).
   * The tooling should continue to accept `.yml` files but log a warning so contributors know to use `.yaml`.
   * If the tool does not support warnings natively, add a separate check (script or lint rule) that flags `.yml` files.

3. **Leave unchanged** when:
   * The file is vendored or third-party and not owned by this repo.
   * The reference is to an external tool or upstream convention that strictly requires `.yml`.
   * Changing the reference would break a working integration that cannot accept `.yaml`.


## Workflow

1. Run a recursive search for `.yml` across the repository and list every match with file path and line number.
2. Identify which `.yml` files on disk are repo-owned vs vendored/third-party.
3. Classify each match using the decision rules above.
4. Present the proposed changes as a grouped list **before editing**:
   * **Group A - File renames:** `.yml` files to rename to `.yaml`.
   * **Group B - Reference replacements:** `.yml` references to update to `.yaml` (one-to-one).
   * **Group C - Glob updates with warnings:** linter/tooling patterns to extend to both extensions, plus the warning mechanism added.
   * **Group D - Left unchanged:** with rationale for each.
5. Wait for user confirmation, then apply the changes in this order:
   1. Rename files.
   2. Update references to renamed files.
   3. Update globs and add `.yml` warnings.
6. Run `pnpm lint` (per `AGENTS.md`) and report any issues.
7. Produce **separate commits per category** following the project commit style:
   * Commit 1: docs (`*.md`, README updates, AGENTS.md, etc.)
   * Commit 2: scripts (`scripts/`, executable code, glob/warning updates)
   * Commit 3: configs (`.gitignore`, `package.json`, lint configs, GitHub Actions workflows, other tool configs, file renames belonging to configs)
   * If a single rename touches multiple categories, place it in the most appropriate commit and note the cross-cutting nature in the commit body.
8. Provide a final summary: commits created, files renamed, references updated, globs extended, warnings added, and any references left unchanged with reasons.


## Constraints

* Do not rename vendored or third-party `.yml` files.
* When renaming a file under `.github/workflows/` or `.github/dependabot.yml`, first confirm GitHub accepts the `.yaml` extension for that file type (it does for both), update every reference to the old path, and warn the user that anything keyed to the old filename outside the repository, such as a branch protection rule or a deploy hook, must be checked by hand on GitHub.
* Preserve file contents during renames - only the extension changes.
* Follow the writing style and Markdown rules in `AGENTS.md` for any documentation edits.
* Use the `ai-commit` skill for commit messages, per the user's global instructions.
* If a match is ambiguous (e.g., unclear whether a file is repo-owned), flag it in the proposal and ask before deciding.


## Output format

1. **Search results** - all `.yml` references and `.yml` files with paths and line numbers.
2. **Ownership classification** - which `.yml` files on disk are repo-owned vs skipped.
3. **Proposed changes** - grouped A/B/C/D as defined in the workflow, with rationale.
4. **Confirmation prompt** - "Proceed with these changes? (yes / modify / cancel)".
5. **Post-change summary** - commits created (one per category), files renamed, references updated, lint status, and any items deferred.
