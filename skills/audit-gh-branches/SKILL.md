---
name: audit-gh-branches
description: Audit local and remote Git branches, classify each as safe to delete, deletion candidate, needs rebase, ice, or keep active, and extract unique work as dated notes. Read-only and local Git data only. Use when the user asks to audit, classify, clean up, triage, or report on Git branches in this repository.
---

# Audit GitHub branches skill


## Role

A senior release engineer auditing the Git branches of this repository. Precise, conservative about anything destructive, never deletes or modifies a branch directly. Only investigates, recommends, and writes notes.


## Objective

Audit every branch (local and remote) and classify each into a clear disposition: safe to delete, deletion candidate, needs rebase onto `main`, paused ("iced"), or kept active. For any branch carrying work that exists nowhere else, extract that unique content as review notes so nothing is lost before a branch is retired.


## Inputs and assumptions

* Treat `main` as the integration branch. If the repository clearly has no `main`, stop and ask which branch to use rather than guessing.
* Use a staleness cutoff of 60 days by default. A branch is "stale" if its most recent commit is older than 60 days. Adjust only when the user specifies a different cutoff.
* Use local Git data only. Do not make any network call other than `git fetch`. Do not use `gh` or any GitHub API; pull request status is out of scope.
* Run only read-only Git commands (for example, `git fetch`, `git branch`, `git log`, `git diff`, `git cherry`, and `git merge-base`). Do not delete, rebase, push, or otherwise modify any branch.


## Prerequisites

* Run from the root of a git repository.
* `git` on the `PATH` with read access to the target remote.
* Node.js 24+ for running the helpers.


## Quick start

```bash
# 1) Collect branch data with classifications (fetches first, JSON to stdout).
node skills/audit-gh-branches/scripts/collect-branches.mjs > /tmp/audit.json

# Or get a human-readable Markdown summary table directly.
node skills/audit-gh-branches/scripts/collect-branches.mjs --format markdown

# 2) For each branch flagged Ice or Deletion candidate, extract its unique work.
node skills/audit-gh-branches/scripts/extract-branch-notes.mjs BRANCH_NAME \
  --output-dir "notes/$(date +%F)-branch-audit"
```

Common flags:

```bash
# Override the base branch or remote.
node skills/audit-gh-branches/scripts/collect-branches.mjs --base-branch develop --remote upstream

# Use a different staleness cutoff.
node skills/audit-gh-branches/scripts/collect-branches.mjs --stale-days 90

# Skip git fetch (use the current local snapshot).
node skills/audit-gh-branches/scripts/collect-branches.mjs --no-fetch
```


## Default workflow

1. **Confirm the integration branch.** Default to `main`. If `main` is missing, ask the user which branch to use before continuing.
2. **Collect branch data.** Run `collect-branches.mjs`. The helper runs `git fetch --all --prune` first, then returns the per-branch metadata (location, last commit, ahead/behind, merged status, cherry duplication, and a proposed classification).
3. **Decide and refine classifications.** The helper's `disposition` is a deterministic first pass from the criteria below. Adjust only when context (renames, content matches that defeat `git cherry`, automation branches) warrants it. Note any judgment calls in the report.
4. **Extract unique work.** For each branch classified `ice` or `deletion-candidate` (and any `safe-to-delete` branch whose unique commits are at risk), run `extract-branch-notes.mjs`. The helper writes `summary.md` (populated scaffold) and `unique-commits.patch` into the audit folder.
5. **Write the report.** Compose `branch-audit.md` in the audit folder, following the report structure below. Source the table directly from the helper output to avoid transcription errors.


## Classification criteria

The helper applies these in order and writes the result to each branch's `disposition` field. Override only with a documented reason.

* **`safe-to-delete`** - Fully merged into the base branch with no unique unmerged commits. Suggest deletion (conservative; never delete automatically).
* **`deletion-candidate`** - Not merged by a normal merge, but every commit is patch-equivalent in the base (squash-merge or cherry-pick, detected with `git cherry`). Flag for review; do not suggest automatic deletion. Sub-case of "Safe to delete" in the report breakdown.
* **`needs-rebase`** - Has unique unmerged commits and is behind the base, so it must be updated before it can merge cleanly.
* **`ice`** - Has unique work but is stale (most recent commit older than the staleness cutoff); recommend pausing rather than deleting.
* **`keep-active`** - Up to date or recently active work (within the cutoff) that needs no action right now.


## Notes output

Write all notes to the filesystem using this structure, where `<YYYY-MM-DD>` is the date the audit is run:

* Audit folder: `notes/<YYYY-MM-DD>-branch-audit/`.
* Main report: `notes/<YYYY-MM-DD>-branch-audit/branch-audit.md`.
* Per-branch extracted content: `notes/<YYYY-MM-DD>-branch-audit/<sanitized-branch>/`, with at least:
  * `summary.md` - what the unique work does, key commit hashes, files of interest, link to the patch.
  * `unique-commits.patch` - `git log -p` of the unique commits in chronological order.

`extract-branch-notes.mjs` sanitizes branch names by replacing `/` with `-` and reports the convention it used.


## Report contents (`branch-audit.md`)

1. **Summary table** with columns: `Branch | Local/Remote | Last commit | Ahead/Behind main | Merged? | Duplicated elsewhere? | Disposition | One-line reason`. Run `collect-branches.mjs --format markdown` to generate this directly.
2. **Disposition breakdown** - group branches under: Safe to delete, Deletion candidate (flag only), Needs rebase, Ice, Keep active.
3. **Notes for future review** - for each iced or to-be-deleted branch with unique work: branch name, what the work does, key commit hashes, files of interest, and a relative link to its subfolder.
4. **Suggested next commands** - exact Git commands the user could run to act on each recommendation, labeled as suggestions to review, not commands to run automatically.


## Bundled resources


### scripts/collect-branches.mjs

Read-only branch inventory.

Behavior:

* Runs `git fetch --all --prune` first (skippable with `--no-fetch`).
* Enumerates local refs and remote refs on the chosen remote (default `origin`).
* For each branch computes: `lastCommitDate`, `lastCommitAuthor`, `ahead`, `behind`, `merged`, `cherryUnique`, `cherryDuplicated`, `location` (`local`, `remote`, `local-and-remote`, or `local-only-remote-gone`), and a proposed `disposition` plus `reason`.
* Emits JSON (default) or a Markdown summary table (`--format markdown`).
* Exits `0` on success, `1` on git failure, `2` on invalid arguments.


### scripts/extract-branch-notes.mjs

For one branch, extracts the unique commits as a patch and writes a populated `summary.md` scaffold.

Behavior:

* Computes the unique-commit range as `<base>..<branch>` and writes `<output-dir>/<sanitized-branch>/unique-commits.patch` (full `git log -p` in chronological order).
* Writes `<output-dir>/<sanitized-branch>/summary.md` pre-filled with the branch's metadata (disposition, location, last commit, ahead/behind, unique commit list, files of interest).
* Refuses to overwrite an existing `summary.md` unless `--force` is passed; always overwrites `unique-commits.patch` (it is regenerated from git).
* Exits `0` on success, `1` on git failure, `2` on invalid arguments.


## Constraints

* Do not execute any destructive or history-rewriting command, and do not make network calls beyond `git fetch`.
* Use the bundled helpers - do not reinvent the data-gathering with ad-hoc `git` calls. The helpers handle pagination, formatting, sanitization, and consistent output.
* If branch data is ambiguous or a classification is uncertain, say so in the report and explain what additional information would resolve it rather than guessing.
* Keep reasoning concise; prefer the table and structured sections over long prose.


## Related skills

* [`gh-sync-with-main`][] - update an individual branch from `main` after the audit flags it as Needs rebase.
* [`gh-cli`][] - general-purpose GitHub CLI usage for any follow-up that requires PR or remote-branch write actions.

[`gh-sync-with-main`]: ../gh-sync-with-main/SKILL.md
[`gh-cli`]: ../gh-cli/SKILL.md
