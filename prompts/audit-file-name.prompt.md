---
name: 'audit-file-name'
description: 'Audit and propose renames for files and folders under a specified path to comply with naming conventions.'
argument-hint: 'Provide the target directory path to audit (e.g., docs/).'
---

# File and folder name audit


## Role

You are a codebase style auditor.


## Input

* `TARGET`: the directory to audit, relative to the repository root.
  When the user names no directory, ask which one to audit before starting.
  Do not assume a default.


## Repository tooling

This repository already automates part of this audit.
Run it first and treat its output as evidence, then extend the audit by hand:

* `pnpm lint-naming` - the repository file and folder name linter, and the canonical checker for this audit.
* [skills/file-folder-name-linter/][] - the skill that wraps the same rules.
* `.namelintignore` at the repository root - the exceptions file the linter reads. Treat paths matched there as exempt, and propose an entry there (instead of a rename) when a non-compliant name is intentional.

Report any case where your findings and the linter disagree, because that means one of the two needs updating.


## Goal

Audit naming under `TARGET` and ensure items follow the "lowercase kebab-case" naming rules (unless exempt):

* Allowed characters in folder names and file base names: lowercase letters (`a-z`), digits (`0-9`), and hyphens (`-`) only.
* Disallowed in folder names and file base names: spaces, underscores (`_`), and periods (`.`).
* No uppercase letters.
* No leading or trailing hyphens.
* No consecutive hyphens (`--`).
* Repo-specific rules the linter also enforces: Markdown files under `notes/` carry a `YYYY-MM-DD-` date prefix, and YAML files use `.yaml`, not `.yml`.
* Preserve meaning, and avoid ambiguous abbreviations.
* Optional style guideline: keep names short and descriptive (flag names longer than 40 characters as "length" warnings).


## Scope

* Include all nested subfolders and files under `TARGET`.
* Validate:
  * Folder names.
  * File base names (the name without the extension).
* Extensions:
  * Preserve file extensions exactly as-is.
  * Do not rename extensions.
  * Treat multi-part extensions (for example, `.tar.gz`) as extensions and preserve them.


## Required inputs

If you can access the filesystem, enumerate and search directly.

If you cannot access the filesystem, request and use the following inputs:

1. A complete tree:
   * `find <TARGET> -print`
2. Search results for reference updates:
   * `rg -n --hidden --no-ignore-vcs "<path-or-filename-fragment>" <TARGET> README*`

Proceed using whatever inputs are available, and clearly state which mode you are using.


## Tasks

1. Enumerate the complete tree of `TARGET` (folders and files).
2. Identify every violation of the rules above (and any "length" warnings, if applicable).
3. For each violation, propose a specific rename:
   * Show `current/path/name` -> `proposed/path/name`.
   * Preserve file extensions exactly.
4. Detect and handle rename collisions:
   * If two different items would map to the same new name, propose disambiguated alternatives.
5. Generate a safe rename plan:
   * Output an ordered list of renames (deepest paths first).
   * Include a note if any rename is a case-only change (for example, `Foo.md` -> `foo.md`).
   * If the filesystem may be case-insensitive, propose a two-step rename for case-only changes.
6. Update references (do not skip):
   * Search for links and paths to renamed items in:
     * All files under `TARGET`.
     * Repository indexes that list files, such as `README.md` files and `docs/contents-structure.md`.
     * Doc tooling files, but only those that exist in this repository. Check before citing one.
   * Cover common reference types:
     * Markdown links and image references.
     * HTML links in docs.
     * Frontmatter fields that include paths.
     * Sidebar or navigation configs.
   * Propose exact edits (file and line number when available), or a patch-style diff.
7. Output:
   * A violations table: path, rule broken, proposed rename, and notes (collision, case-only, length warning).
   * A finalized rename execution order (deepest paths first).
   * A reference update list with exact edit guidance.


## Exceptions

The following items are exempt from renaming:

* `README` and `README.md` (exact names only).
* `LICENSE` and `LICENSE.md` (exact names only).
* `AGENTS.md` and `CLAUDE.md` (exact names only).
* `SKILL.md` inside a skill folder (exact name only).
* Files ignored by git defined in `.gitignore` (respecting all patterns).
* Dotted tool folders that a framework requires, such as `.github/` and `.claude/` (exact folder names only).
* Vendored or third-party files that must keep an upstream name.

When the repository uses a framework with its own naming rules, honor that framework instead of kebab-case for the files it owns, and say so in the report.
Verify the framework is actually present before applying its exception.


## Constraints

* Do not rename items that are already compliant (or exempt).
* Do not change content other than necessary reference updates.
* Be explicit about assumptions:
  * Case-sensitive vs case-insensitive filesystem.
  * Whether the rename will be executed with `git mv`.
* If inputs are incomplete, list what is missing and continue with the best possible analysis from the provided data.


## Deliverable format

* When the user asks to save the report, write it to `notes/YYYY-MM-DD-<slug>.md` (the date prefix is enforced by the naming rules). Otherwise reply in the conversation.
* Start with a short summary: number of items scanned, number of violations, number of collisions, and number of case-only renames.
* Then sections in this order:
  1. Violations
  2. Proposed renames
  3. Rename execution order
  4. Reference updates

[skills/file-folder-name-linter/]: ../skills/file-folder-name-linter/SKILL.md
