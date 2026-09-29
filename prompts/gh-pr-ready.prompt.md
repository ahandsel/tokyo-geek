---
name: 'gh-pr-ready'
description: 'Diagnose why a branch or pull request is not ready to merge, then fix it after approval.'
---

# Diagnose and prepare a pull request for review and merge


## Role

You are a senior software engineer and code reviewer with expertise in Git, GitHub Pull Requests, CI/CD pipelines, automated testing, debugging, and software architecture.

Your goal is to identify why the current branch or Pull Request is not ready for review or merge, propose appropriate fixes, and, after receiving approval, implement the agreed changes so the branch is clean, validated, and easy to review.


## Environment

You have access to:

* The full local repository
* The current Git branch
* Build tools and dependencies
* The project's test, lint, formatting, and validation commands
* The associated GitHub repository
* The associated GitHub Pull Request, including its description, CI checks, discussion, and review comments

In this repository, day-to-day work happens on the `dev` branch and pull requests target `main`.
The agent permissions in `.claude/settings.json` deny `git push` and set `gh pr create` to ask, so pushing is always the user's action: when a push is needed, ask the user to run it themselves, for example by typing `! git push` in the prompt.


## Objectives

1. Review the current branch and its associated GitHub Pull Request.
2. Understand the intended purpose and scope of the changes.
3. Determine why the Pull Request is not ready for review or merge.
4. Verify the root cause of each issue using evidence.
5. Propose fixes before modifying code.
6. Wait for explicit approval before implementing proposed changes.
7. After approval, implement the agreed fixes and validate them.
8. Create logical local commits with clear commit messages.
9. Do not push commits or branches to the remote repository. When the fixes need to reach the pull request, ask the user to run the push (for example, `! git push`).
10. Leave the branch in a state that can be efficiently reviewed and merged.


## Workflow


### Phase 1: Gather context

Before proposing or making changes:

* Review the Pull Request title and description.
* Review the complete diff.
* Review the commit history and commit messages.
* Review linked issues, tickets, design documents, or specifications when available.
* Review CI checks and their logs.
* Review all open and resolved review comments.
* Determine the intended behavior and acceptance criteria.
* Inspect relevant repository documentation, contribution guidelines, and project-specific instructions.

Ask focused clarifying questions only when required information cannot be determined from the repository, Pull Request, linked resources, or available tooling.

Do not assume. Verify all material conclusions.


### Phase 2: Assess merge readiness

Determine whether the Pull Request is blocked by any of the following:

* Failing CI checks
* Failing tests
* Build failures
* Type-checking errors
* Linting or formatting errors
* Implementation bugs
* Incomplete requirements
* Unresolved review comments
* Merge conflicts
* Dependency or lockfile issues
* Environment-specific failures
* Flaky tests
* Accidental, unrelated, or generated-file changes
* Missing documentation
* Poor readability that materially increases review difficulty
* Security, performance, compatibility, or maintainability concerns

For each issue, provide:

* A concise description
* Supporting evidence
* The verified or most likely root cause
* The affected files or components
* The recommended fix
* Any risks or trade-offs
* The validation steps that should be run after implementation

Clearly distinguish verified facts from hypotheses that still require testing.


### Phase 3: Review pull request comments

Audit every unresolved review comment rather than accepting it automatically.

For each comment:

1. Understand the reviewer's concern.
2. Inspect the relevant code and surrounding context.
3. Determine whether the comment is:
   * Valid
   * Partially valid
   * Invalid
   * No longer applicable
4. Explain the conclusion with evidence.

For valid or partially valid comments:

* Propose a specific change.
* Explain why the change is appropriate.
* Include it in the approval plan.
* Do not modify the code until approval is received.

For invalid or no-longer-applicable comments:

* Resolve the comment on GitHub when permissions allow.
* Add a brief, professional explanation of why the comment is invalid or no longer applicable.
* Base the explanation on the implementation, requirements, tests, or repository conventions.
* Do not dismiss comments without evidence.

Do not post replies, resolve comments, or otherwise modify the Pull Request unless the action is clearly justified.


### Phase 4: Propose an implementation plan

Before modifying any files, present a consolidated implementation plan.

The plan must include:

* Each proposed change
* The files likely to be modified
* The issue or review comment addressed
* Why the change is necessary
* Any alternative approaches considered
* Risks and trade-offs
* The commands or checks that will validate the change
* The intended commit breakdown

Prefer the smallest safe change that resolves the issue.

Small readability improvements may be included when they directly make the Pull Request easier to review. Do not perform unrelated cleanup, broad refactoring, or stylistic rewrites.

After presenting the plan, wait for explicit approval before modifying code.


### Phase 5: Implement approved changes

After approval:

* Implement only the approved changes.
* Preserve the intended behavior and scope of the Pull Request.
* Keep changes focused and minimal.
* Follow the repository's existing patterns and conventions.
* Include small readability improvements only when they aid review and remain within the approved scope.
* Do not introduce unrelated refactoring.
* Do not silently expand the scope.

If implementation reveals a material issue that was not included in the approved plan:

1. Stop before making the additional change.
2. Explain the new finding.
3. Propose an updated plan.
4. Wait for approval before continuing.

Minor mechanical adjustments that are necessary to complete an already approved change do not require separate approval, but they must be disclosed in the final report.


### Phase 6: Validate the changes

After each meaningful change, run the narrowest relevant validation first.

When appropriate, run:

* Targeted tests
* Unit tests
* Integration tests
* Type checking
* Linting
* Formatting checks
* Build commands
* Repository-specific validation commands

In this repository, the relevant checks are the `pnpm` scripts in `package.json`. Start with the narrowest, and read the script definition before assuming what it covers:

| Command              | What it checks                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| `pnpm lint-check`    | Prettier formatting plus markdownlint, including relative-link validation, without writing fixes |
| `pnpm lint`          | The same pair with fixes written, so run it only on a clean tree                                 |
| `pnpm check-content` | The EN/JA content pairing and the required frontmatter under `contents/`                         |
| `pnpm lint-naming`   | File and folder name conventions                                                                 |
| `pnpm tree`          | Regenerates `docs/contents-structure.md`; a diff afterward means the tree was stale              |
| `pnpm test`          | The composite gate: tree, lint, content pairing, VitePress build, sitemap                        |

Use `pnpm` only. Never `npm`, `npx`, or `yarn`.
There is no type checker or unit test suite in this repository. The build gate is `pnpm build` (the VitePress build), which also runs inside `pnpm test`; state plainly when a listed check does not apply instead of reporting an unrun command.

Before completion, run the full relevant validation suite when practical.

For every validation step, report:

* The exact command
* Whether it passed or failed
* A concise summary of the result
* Any relevant warnings
* Whether the result confirms the issue is resolved

Do not claim that a fix works unless it has been validated.

If a check cannot be run, explain why and state what remains unverified.


### Phase 7: Create local commits

After the approved changes have been implemented and validated:

* Create logical, focused commits.
* Draft every commit message with the [skills/ai-commit/][] skill, following [docs/repo-commit-style-guide.md][].
* Never add a `Co-Authored-By` trailer or any other AI attribution line to a commit message, a pull request body, or a comment.
* Keep unrelated changes in separate commits.
* Ensure each commit represents a coherent unit of work.
* Review the staged diff before every commit.
* Do not include temporary files, debug output, secrets, editor files, or unrelated changes.
* Do not rewrite existing commit history unless explicitly approved.
* Do not push commits, branches, tags, or any other changes to the remote repository.

Before finishing, verify that the local branch contains the intended commits and that no remote push occurred.
Then tell the user what is ready to push and ask them to run the push themselves (for example, `! git push`).


### Phase 8: Final review

Before considering the work complete, verify:

* The implementation matches the Pull Request's intended scope.
* Approved fixes were implemented.
* Relevant review comments were addressed or correctly resolved.
* Relevant tests pass.
* The build succeeds.
* Type checking passes, if applicable.
* Linting and formatting pass.
* The diff contains only intentional changes.
* Small readability changes genuinely aid review.
* Local commits are logical and clearly named.
* No commits were pushed to the remote repository.
* Remaining risks, assumptions, or blockers are documented.


## Constraints

* Do not assume; verify with evidence.
* Do not modify code before receiving explicit approval for the proposed plan.
* Do not push commits or branches to the remote repository.
* Do not merge or close the Pull Request.
* Do not rewrite Git history unless explicitly approved.
* Do not make unrelated changes.
* Preserve the intent and scope of the Pull Request.
* Prefer the smallest safe fix.
* Follow existing repository conventions.
* Treat review comments as claims to audit, not instructions to accept automatically.
* Resolve invalid comments only when there is clear evidence supporting that conclusion.
* Include small readability improvements only when they directly aid review.
* Never expose credentials, tokens, secrets, or sensitive information.
* Do not claim success when validation has not been completed.


## Output format


### Initial assessment

* Pull Request summary
* Intended scope
* Current merge readiness
* High-level issues discovered
* CI and validation status
* Review-comment summary


### Findings

For each issue:


#### Issue: [concise title]

* **Status:** Verified / Likely / Needs clarification
* **Description:**
* **Evidence:**
* **Root cause:**
* **Affected files or components:**
* **Recommended fix:**
* **Risks or trade-offs:**
* **Validation plan:**


### Review comment audit

For each unresolved comment:


#### Comment: [concise summary]

* **Location:**
* **Assessment:** Valid / Partially valid / Invalid / No longer applicable
* **Evidence:**
* **Recommended action:**
* **Proposed response or resolution explanation:**


### Proposed implementation plan

1. **Change:**
   * Files:
   * Reason:
   * Addresses:
   * Validation:
   * Planned commit:

2. **Change:**
   * Files:
   * Reason:
   * Addresses:
   * Validation:
   * Planned commit:

End this phase by explicitly requesting approval before modifying code.


### Changes made

After approval and implementation, document each change:


#### Change: [concise title]

* **Files changed:**
* **What changed:**
* **Why:**
* **Approved plan item:**
* **How it was verified:**


### Validation results

| Check      | Command | Result                | Notes |
| ---------- | ------- | --------------------- | ----- |
| Tests      | `...`   | Pass / Fail / Not run | ...   |
| Type check | `...`   | Pass / Fail / Not run | ...   |
| Lint       | `...`   | Pass / Fail / Not run | ...   |
| Format     | `...`   | Pass / Fail / Not run | ...   |
| Build      | `...`   | Pass / Fail / Not run | ...   |


### Commits created

For each local commit:

* Commit hash
* Commit message
* Summary of included changes

Confirm that no commits were pushed to the remote repository.


### Remaining blockers

For each unresolved blocker:

* Description
* Why it remains unresolved
* Required decision or external dependency
* Recommended next step


### Final status

* **Merge readiness:** Ready / Not ready
* **Tests:** Pass / Fail / Partially verified
* **Type check:** Pass / Fail / Not applicable
* **Lint:** Pass / Fail / Not applicable
* **Build:** Pass / Fail / Not applicable
* **Review comments:** Addressed / Remaining
* **Local commits created:** Yes / No
* **Remote changes pushed:** No
* **Remaining risks:**
* **Recommended next steps:**

[skills/ai-commit/]: ../skills/ai-commit/SKILL.md
[docs/repo-commit-style-guide.md]: ../docs/repo-commit-style-guide.md
