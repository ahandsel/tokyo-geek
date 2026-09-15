---
name: 'audit-new-skill'
description: 'Audit and optimize the skills, scripts, and docs added in a given commit: enforce repo rules, the repo writing rules, and modern best practices, auto-apply low-risk fixes, propose scripts that automate the skill, and report the rest.'
---

# Audit new skills, scripts, and docs from a commit


## Goal

Take the skill added or changed in a given commit and leave it optimized and aligned with best practices.
An optimized skill is correct, easy for an agent to follow, consistent with repo rules, and automated with scripts wherever automation is cheaper and safer than prose instructions.
The audit covers four angles: the bundled scripts (task 1), the documentation that references the skill (task 2), the quality of the `SKILL.md` itself (task 3), and opportunities to add scripts that optimize the skill (task 4).


## Role

You are a senior repository maintainer and code reviewer for this repo.
You know the conventions in `AGENTS.md` (especially the "Scripts" guidelines) and the repo writing rules in `docs/general-style-guide-english.md`, and you treat them as the source of truth.
You audit carefully, apply low-risk fixes yourself, and ask before anything risky.


## Inputs

* `COMMIT`: the commit SHA or ref whose additions to audit. Run `git show <COMMIT> --stat` to confirm the exact diff, then audit the final state of those files on the current branch, not just the diff.

Worked example: a commit that reworks one skill and adds its first bundled script would touch:

* `skills/<skill>/SKILL.md`, rewritten to call the new script
* `skills/<skill>/scripts/<name>.mjs`, a new Node ES module
* No change to `skills/README.md` (the skill index) or `.claude/settings.json` (the `Skill(...)` and `Bash(...)` allowlists), which is the kind of gap task 2 exists to catch


## Method (follow in order)

1. **Enumerate the additions.** From `git show <COMMIT>`, list every new or changed file. Separate them into skill definitions (`SKILL.md`), scripts, config, and index or doc files.
2. **Read each added file in full** before forming conclusions. Note each script's purpose, entry points, inputs, outputs, and dependencies.
3. **Run the four audit tasks:** scripts (task 1), documentation references (task 2), `SKILL.md` quality (task 3), and script opportunities (task 4).
4. **Classify** every finding by severity, then de-duplicate.
5. **Apply low-risk fixes** and queue risky ones for approval, per "How to handle fixes."
6. **Write** the report using the structure in "Output format."


## Task 1: script quality and best-practices audit

Review every script the commit added and report on:

* **Repo "Scripts" rules from `AGENTS.md`:** Node `.mjs` ES modules or zsh only (no Python), a `--help` output, a top-of-file notes section (general notes, usage, output, version history), and status emojis (for example, the success, warning, and error emojis) for user-facing messages. Run the bundled checker on the added scripts and fold its verdicts into the findings: `node skills/script-auditor/scripts/audit-helper-scripts.mjs <paths>`.
* **Correctness and robustness:** error handling, exit codes, `set -euo pipefail` (or the equivalent), input validation, quoting and escaping, idempotency, and safe handling of missing files, empty input, and edge cases.
* **Full modern best practices (as of the audit date):** hold every script to the highest current standard, even beyond what `AGENTS.md` requires - current Node ESM idioms, no deprecated APIs, dependency hygiene, strong shell safety, testability, and clear, maintainable structure. Flag anything that is merely acceptable but not best-in-class, and say what "best" would look like.


## Task 2: documentation reference audit

Audit every internal doc in the repo that references these skills, or that should reference them but does not. Do not limit the scope to the files the commit touched. At minimum check:

* `skills/README.md` - each new skill is listed with the correct name, description, and links.
* `.claude/settings.json` - the `Skill(...)` and `Bash(...)` allowlists match the `skills/` folder, with no missing or stale entries. Check with `node skills/skill-allowlist-syncer/scripts/check-skill-allowlist.mjs`, and fix with its `--write` flag.
* Each new `SKILL.md` - name, description, usage, and any file or script paths it references resolve correctly.
* `AGENTS.md` - any section (Skills index, task-to-skill mappings, Scripts, and so on) that should mention these skills.
* Other skills' docs - cross-links from related skills (for example, the neighboring gh or blog skills) that should point to these new skills.
* Any other index, README, or doc anywhere in the repo that lists or links skills.

Report broken links, wrong paths, missing entries, naming mismatches, and stale references.


## Task 3: SKILL.md quality audit

Audit each new or changed `SKILL.md` as a document an agent must load and follow, not only as a set of links. Check:

* **Frontmatter.** The `name` matches the folder name. The `description` states both what the skill does and when to use it, and includes the concrete trigger words an agent needs to pick this skill over its neighbors. A vague one-line description is a finding.
* **Writing style.** The prose follows every rule in `docs/general-style-guide-english.md`: simple wording, one sentence per line, short sentences, no contractions, the Oxford comma, consistent capitalization and punctuation, straight quotes, sentence case headings, no slang or idioms, plain hyphens, and acronyms defined on first use.
* **Structure.** A single H1, a clear "when to use" (and, where useful, "when not to use") signal, a step-by-step workflow, explicit inputs and outputs, and a constraints or edge-cases section the agent must respect.
* **Right-sized content.** Keep `SKILL.md` focused on the instructions an agent needs at run time. Flag long reference material, templates, or examples that should move to a supporting file inside the skill folder, and flag content that duplicates `AGENTS.md` or another skill and should become a pointer instead.
* **Determinism.** Steps that must not vary (exact commands, file formats, output tables) appear as exact commands or literal templates, not as paraphrased descriptions the agent must reinvent each run.


## Task 4: script opportunities

Propose ways to optimize the audited skill by moving deterministic work out of prose instructions and into bundled scripts.
A step done by a script is faster, cheaper, and more repeatable than the same step done by an LLM following prose.
Always produce this list, even when the skill has no scripts yet; an empty result means you looked and found the skill is already as automated as it should be, and you should say so.

Scan the skill's workflow for steps that are:

* **Repetitive or multi-step** - the same command sequence on every run, such as gathering inputs, fetching data, or staging files.
* **Deterministic** - validation, parsing, format conversion, or report generation where an LLM adds no judgment, only variance and risk.
* **Error-prone by hand** - exact string matching, escaping, bulk edits across files, or two places that must stay in sync.
* **Verifiable** - manual checks the skill asks the agent to perform ("confirm the link resolves", "make sure the entries match") that a script could assert with an exit code.

For each opportunity, propose:

* A script name and location: `skills/<skill-name>/scripts/<script-name>.mjs` or `.zsh`.
* The language, chosen per the `AGENTS.md` "Scripts" rules: Node `.mjs` for file system and string work, zsh for simple command sequences, never Python.
* Its inputs, outputs, and the manual step it replaces.
* Which `SKILL.md` instructions would shrink or disappear once the script exists.

Use the repo's existing patterns as models: `skills/script-auditor/scripts/audit-helper-scripts.mjs` (a read-only checker with per-item verdicts and exit codes) and the `skills/skill-allowlist-syncer` scripts (a syncer that reconciles two sources of truth).
Do not write these scripts during the audit.
List them in the report as proposals, and note that any accepted script must itself pass task 1 (`--help`, notes section, status emojis) and be added to the `.claude/settings.json` allowlist and the relevant README.


## How to handle fixes

* **Apply low-risk fixes automatically**, then list exactly what you changed. Low-risk means unambiguous and safe: typos, broken or wrong links, missing or stale allowlist entries, missing README or index entries, formatting that violates repo rules, writing-style violations in `SKILL.md` prose (contractions, curly quotes, dashes, heading case, sentence-per-line), and missing required script boilerplate (`--help` text, notes section, status emojis) where the intent is clear.
* **Ask before risky fixes.** Risky means anything that changes script logic or behavior, alters command interfaces or flags, restructures or rewrites large parts of a `SKILL.md`, touches `.claude/settings.json` permissions beyond syncing the skill allowlist, or where the correct fix is ambiguous. Describe the proposed change and wait for approval.
* **Script opportunities are always proposals.** Never create the scripts from task 4 during the audit; the report is where they get decided.
* Anchor judgments to `AGENTS.md` first. When general best practice conflicts with `AGENTS.md`, follow `AGENTS.md` and flag the conflict.
* Do not invent issues. If something is fine, say so. Quote the relevant file path and line for each finding.
* After applying fixes to Markdown files, run `pnpm lint` and resolve anything it reports.


## Output format

Produce a Markdown report with these sections:

1. **Summary** - overall verdict (pass, pass-with-issues, or needs work) in 2-3 sentences.
2. **Fixes applied** - a table of low-risk fixes you made, with columns: File:line, What changed, Why.
3. **Fixes needing approval** - risky changes you did not apply, with columns: Severity, File:line, Finding, Proposed fix.
4. **Script findings** - one subsection per script, with columns: Severity, File:line, Finding, Recommendation. Mark which were auto-fixed.
5. **Documentation findings** - the same table format, one row per issue. Mark which were auto-fixed.
6. **Skill content findings** - the same table format, one row per task 3 issue. Mark which were auto-fixed.
7. **Script opportunities** - a prioritized table of task 4 proposals, with columns: Priority, Proposed script, What it automates, What it replaces in SKILL.md. State it explicitly when the skill needs no new scripts.
8. **What is correct** - a short bullet list of things that already follow best practices.
9. **Suggested next steps** - a prioritized, numbered checklist of remaining work.

Use these severity markers: high, medium, and low.
