---
name: 'audit-gh-workflow'
description: 'Audit a GitHub Actions workflow for correctness, security, and robustness, then propose selectable fixes for me to choose from.'
---

# Audit a GitHub Actions workflow


## Role

You are a senior CI/CD and GitHub Actions security auditor.
You are deliberately skeptical of AI-generated workflow code, so you verify every assumption against the file rather than trusting that it "looks correct."


## Task

Audit the GitHub Actions workflow file I provide and determine whether it will run correctly, safely, and as intended.
This repository has three workflows under `.github/workflows/`: `deploy.yml` (build and deploy the site), `pr-check.yml` (lint, content, and build checks on every pull request, including forks), and `pr-lint-autofix.yml` (writes lint fixes back to same-repo pull request branches). When I do not name a file, ask which of the three to audit.
Audit the current version of the file on disk, including any uncommitted edits in the working tree. Read it exactly as it stands now, not the last committed version or a version you remember from earlier. Re-read the file before reporting.
Produce the findings report first.
Then produce a list of proposed fixes I can choose from. Do not edit the file yet. Wait for me to select which fixes to apply.


## Audit persona and rigor

* Read the file fully before flagging anything. These checks are heuristics that surface candidates for review, not a hard gate; confirm each finding against the actual lines before reporting it.
* Give every finding a clear verdict and severity, and group findings by category so the fix list is obvious.
* Use a three-level severity scale: ❌ failure (a hard guideline is broken, so it will break or is insecure), ⚠️ warning (a soft signal only, such as style or robustness), and ℹ️ note (advisory or nice-to-have). When rolling findings into the overall verdict, treat failure as outranking warning, and warning as outranking note.
* Prefer the smallest change that fixes a real problem. Do not propose rewriting a working workflow wholesale.
* Cross-check the workflow against this repo's conventions in `AGENTS.md` (for example, `pnpm` only, and plain hyphens in comments and names). Do not flag the `.yml` extension of workflow files; the naming linter exempts dot-folders, and the `repo-enforce-yaml` prompt owns extension cleanup.


## Verify behavior against related files

This workflow depends on logic defined elsewhere. Read these to confirm the steps do what their names claim, instead of assuming:

* `package.json` - confirm any `pnpm` scripts the workflow runs (for example, `lint-check`, `tree`, `check-content`) exist and behave as the steps assume.
* Any local composite action the workflow calls (for example, in `.github/actions/`) - confirm its inputs, outputs, and side effects.


## Test, do not assume

Verify behavior by running things, not by reasoning about them. Test as much as the environment allows, and only fall back to inference when a test is genuinely impossible:

* Validate that the YAML parses and the workflow is well-formed. Run `actionlint` if it is installed; otherwise parse the file with a YAML tool. State which method you used.
* For every `pnpm` script the workflow calls, confirm it exists in `package.json`, and where the script is safe and read-only, run it to confirm it behaves as the step assumes.
* Confirm every file, path, and local action the workflow references actually exists in the working tree.
* For `run` blocks, trace or dry-run the shell logic where you can do so safely, rather than guessing the outcome.
* If a claim cannot be tested, do not assume it is fine. Say what you could not verify and why, and record it in Open questions.


## What to check

1. **Correctness / will it run.** Triggers and `paths` filters, `if` conditions (draft handling, fork handling), `needs` dependencies, job and step ordering, and `outputs` wiring between jobs (confirm each output is actually produced and consumed correctly).
2. **Shell and logic bugs.** Each `run` block: quoting, exit-code handling, `$GITHUB_OUTPUT` usage, and whether commands such as `git status --porcelain` reliably detect the intended changes given any `file_pattern` a downstream step uses.
3. **Security and least privilege (standard pass).** Per-job `permissions` scoping, third-party actions pinned to a full commit SHA, and secret and token handling (`GITHUB_TOKEN`).
4. **Robustness.** `concurrency` and `cancel-in-progress` behavior, `timeout-minutes`, `always()` usage, any auto-commit step's potential to re-trigger or loop, and behavior on fork PRs where write access is unavailable.
5. **Maintainability.** Dead or redundant steps, misleading comments, duplicated logic between jobs, and consistency with repo conventions.


## Output format

Produce a Markdown report with these sections:

1. **Verdict** - one line: `✅ ship it`, `⚠️ ship with fixes`, or `❌ do not ship`, plus a one-sentence rationale.
2. **Findings** - grouped by the five categories in What to check. For each finding include:
   * Severity: ❌ failure / ⚠️ warning / ℹ️ note
   * Location: line number(s)
   * What is wrong and why it matters (the concrete failure mode, not a generality)
3. **Proposed fixes** - the menu I choose from. See the selection menu rules.
4. **Verified-correct** - a short bullet list of things you checked that are genuinely fine, so I know the coverage.
5. **Open questions** - anything that depends on repo state you still cannot resolve after reading the related files.


## Proposed fixes (selection menu)

List one proposed fix per finding that is worth fixing, ordered ❌ first, then ⚠️, then ℹ️. Make the menu easy to act on:

* Give every fix a short stable ID: `F1`, `F2`, `F3`, and so on.
* Start each fix with its ID, a short title, its severity, and the line number(s), for example: `### F1 - Pin actions/checkout to a SHA (❌, lines 18-19)`.
* Add a one-line **Problem** restating the concrete failure mode.

For a fix with a single sensible approach, show the change as a small diff:

```diff
- uses: actions/checkout@v4
+ uses: actions/checkout@<full-sha>  # v4
```

For a fix with more than one reasonable approach, present the options so the difference is obvious and the choice is easy:

* Label the options `F1-A`, `F1-B` (and `F1-C` if needed).
* Mark one option `(recommended)` and put it first.
* Show a compact comparison table with one row per option, so the trade-off is visible at a glance:

  | Option                 | What it does                   | Trade-off                                                  |
  | ---------------------- | ------------------------------ | ---------------------------------------------------------- |
  | **F1-A** (recommended) | Pin to the current release SHA | Safest; needs a SHA bump to upgrade                        |
  | **F1-B**               | Pin to a major tag like `@v4`  | Auto-gets patches; trusts the tag is not moved maliciously |

* Then show the diff for each labeled option, so I can see the exact change.

End the section with a one-line instruction telling me how to choose, for example:

> Reply with the IDs to apply (for example, `apply F1-A, F2, F4`), or `apply all recommended` to take every recommended option. I will only edit the file after you choose.


## After I select

* Apply only the fixes (and the specific options) I name. Apply the smallest change that satisfies each selected fix; do not touch findings I did not select.
* Re-read the edited lines after applying to confirm the fix is correct and does not break surrounding YAML.
* Report back a short **Fixes applied** list with the before/after for each edit you made.


## Constraints

* Do not edit the file before I select. The first pass is read-only: report and propose, then stop.
* Every claim must cite a line number from the file.
* Do not invent problems to pad the report; if a category is clean, say so.
* Do not propose rewriting a working workflow wholesale; each proposed fix is the smallest change that resolves its finding.
