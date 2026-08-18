---
title: Repo audit - 2026-08-18
description: Repository audit of Tokyo Geek focused on the files changed in the past 24 hours, covering the check-skill-allowlist.mjs v2.0 change, the settings.json sync, and the AGENTS.md script-notes rule.
excludeFromSidebar: true
---

# Repo audit: 2026-08-18

Audit date: 2026-08-18. Scope: the whole repo, with emphasis on the three commits from the past 24 hours and the files they touched.

Commits in scope:

* `f059175` - `✨ check-skill-allowlist.mjs v2.0: sync scripts` - `skills/skill-allowlist-syncer/scripts/check-skill-allowlist.mjs`, `skills/skill-allowlist-syncer/SKILL.md`, `skills/README.md`.
* `e37252d` - `🔧 settings.json: sync skill and script entries` - `.claude/settings.json`.
* `a04e113` - `📝 Require a version history in script notes` - `AGENTS.md`, `skills/script-auditor/SKILL.md`.

**Verdict: the 24-hour changes are sound and the repo builds clean.** The v2.0 syncer works as documented, the reconciled allowlist is in sync, and every automated check passes. What the audit found, and what the Resolution section below records as fixed, is a set of gaps that the new rules exposed rather than caused: one broken `pnpm` script referenced throughout a skill, one duplicated skill, three scripts that fail the repo's own script auditor, and a version-history format that is mandated but unenforceable as written.


## What passes

Everything below was run, not assumed:

| Check                                                                | Result                                                        |
| -------------------------------------------------------------------- | ------------------------------------------------------------- |
| `pnpm build`                                                         | ✅ build complete in 7.53s                                    |
| `pnpm tree`                                                          | ✅ regenerated, no diff (`docs/contents-structure.md` current) |
| `pnpm audit`                                                         | ✅ no known vulnerabilities                                   |
| `prettier --check` on all changed files                               | ✅ clean                                                      |
| `markdownlint-cli2` on all changed Markdown                          | ✅ clean                                                      |
| `lint-names.mjs` (whole repo)                                        | ✅ no violations                                              |
| `check-skill-allowlist.mjs`                                          | ✅ `result:ok`, 14 skills and 5 scripts in sync               |
| Commit style vs [`docs/repo-commit-style-guide.md`](../docs/repo-commit-style-guide.md) | ✅ titles 43, 46, and 46 characters; 1 valid emoji each; bullet bodies; no hard-wrapped sentences |
| `Co-Authored-By` trailers                                            | ✅ none in the last 10 commits                                |

The v2.0 syncer itself scores 4 of 4 on `script-auditor`, and the `AGENTS.md` links to `docs/` all resolve.


## Findings

Severity: 🔴 broken, 🟡 should fix, 🟢 nit.


### 🔴 1. `pnpm lint-naming` does not exist

`skills/file-folder-name-linter/SKILL.md` documents the linter entirely through `pnpm lint-naming` (quick start, workflow steps 1, 2, 4, and 5), and `skills/README.md` repeats it. There is no `lint-naming` entry in `package.json`, so every one of those commands fails. Only the "direct invocation" line works.

Fix: add the script to `package.json`.

```json
"lint-naming": "node skills/file-folder-name-linter/scripts/lint-names.mjs"
```

This is also the pattern the other skill scripts lack, so consider whether `script-auditor` and `skill-allowlist-syncer` deserve `pnpm` aliases too. It is worth noting the allowlist grants the direct `node skills/.../lint-names.mjs:*` invocation, so the skill still runs; only the documented interface is wrong.


### 🔴 2. `readme-maintainer` and `folder-readme-maintainer` are the same skill

The two `SKILL.md` files are byte-identical apart from the `name:` field and the `#` heading:

```text
$ diff skills/readme-maintainer/SKILL.md skills/folder-readme-maintainer/SKILL.md
2c2
< name: readme-maintainer
---
> name: folder-readme-maintainer
6c6
< # README maintainer
---
> # Folder README maintainer
```

Both carry the same `description`, both are listed in `skills/README.md` with the same summary, and the 24-hour sync dutifully granted both a `Skill(...)` allowlist entry. The agent now sees two indistinguishable skills and has no basis for choosing between them.

Fix: delete one folder (`readme-maintainer` looks like the superseded name, given `folder-readme-maintainer` has the later date in `skills/README.md`), drop its README row, and rerun the syncer with `--write` to retire the stale entry.


### 🟡 3. Three scripts fail the repo's own script auditor

`node skills/script-auditor/scripts/audit-helper-scripts.mjs` exits 1 with 3 failures out of 9 scripts:

| Script                            | Failure                                                              |
| --------------------------------- | -------------------------------------------------------------------- |
| `scripts/generate-doc-structure.mjs` | ❌ no `--help` handling; ⚠️ no status emojis                        |
| `scripts/index.sh`                | ❌ notes section missing `Output`; ⚠️ no status emojis              |
| `scripts/targeted-linting.sh`     | ❌ notes section missing `Output`                                    |

All three predate the 24-hour window, but `a04e113` just tightened the same `AGENTS.md` section they violate, so the gap is now louder. `generate-doc-structure.mjs` is the one users actually invoke (`pnpm tree`), and it is the only script in the repo with no `--help` at all.


### 🟡 4. The new version-history format is mandated but unenforceable

`a04e113` added this line to `AGENTS.md`:

> Version history - a reverse-chronological list of versions, each in the form `vX.Y - YYYY-MM-DD - summary of the change`.

Four of the nine scripts in the repo use a different form:

| Script                              | Actual format                        |
| ----------------------------------- | ------------------------------------ |
| `scripts/cleanup-temp-files.sh`     | `- v5.3, 2026-04-08; Fix: ...`       |
| `scripts/index.sh`                  | `- v1.3, 2026-03-24; Robust ...`     |
| `scripts/targeted-linting.sh`       | `- v1.0, 2026-06-12; Initial ...`    |
| `scripts/generate-doc-structure.mjs` | `v2.0.1 (2026-03-23): Enabled ...`   |

The five skill scripts all use the mandated `* vX.Y - YYYY-MM-DD - summary` form, so the split falls exactly along the `scripts/` versus `skills/` line. `script-auditor` cannot catch the difference: `NOTES_VERSION_RE` is `/\bversion history\b/i`, which only checks that the phrase is present, so all four non-conforming files pass that check today.

Fix, choose one: normalize the four `scripts/` headers to the mandated form, or relax `AGENTS.md` to present the format as a preference. If the format is meant to be a rule, `script-auditor` needs a second regex that actually validates a version line, and its own version history should be bumped for the change.


### 🟡 5. The v2.0 runner map misses `.sh`, the extension this repo actually uses

`RUNNER_BY_EXT` in `check-skill-allowlist.mjs:51` maps `.mjs` to `node` and `.zsh` to `zsh`. Every zsh script in this repo is named `.sh`, not `.zsh` (`cleanup-temp-files.sh`, `index.sh`, `targeted-linting.sh`, all three with a `#!/usr/bin/env zsh` shebang), and `script-auditor` treats `.sh`, `.zsh`, and `.bash` alike in its `SCRIPT_EXTS` set.

Verified with a scratch repo: a `helper.sh` placed inside a skill folder receives no allow entry and no warning, so a future zsh skill script named the way this repo names zsh scripts will silently be left out of the allowlist.

Fix: add `'.sh': 'zsh'` to the runner map (and probably `.bash`), or state in `SKILL.md` that skill scripts must use the `.zsh` extension, which would then contradict `scripts/`.


### 🟡 6. `SCRIPT_ENTRY_RE` hardcodes the runner list

`check-skill-allowlist.mjs:46` is `/^Bash\((node|zsh) (\S.*):\*\)$/`, duplicating knowledge that already lives in `RUNNER_BY_EXT` on line 51. Adding any runner whose command is not `node` or `zsh` (say `.bash` to `bash`) breaks the reconcile loop: the generated entry is not recognized as managed, so `bucketGroup` reports it as "to add" on every run while `reconcileAllowlist` preserves the copy it wrote last time. The result is a duplicated entry per write and a check mode that never returns `result:ok`.

Fix: build the alternation from `RUNNER_BY_EXT` at module load instead of repeating it, so the regex and the map can never disagree:

```js
const RUNNERS = [...new Set(Object.values(RUNNER_BY_EXT))].join("|");
const SCRIPT_ENTRY_RE = new RegExp(
  '^Bash\\((' + RUNNERS + ') (\\S.*):\\*\\)$',
);
```


### 🟢 7. Duplicate managed entries are invisible in check mode

`bucketGroup` puts every managed entry it sees into `inSync` when the entry is in the desired set, so a settings file containing `Skill(ai-commit)` twice, with nothing else wrong, reports `result:ok` and exits 0. Verified in a scratch repo. Running `--write` on that same file silently collapses the pair to one entry, because `desired` is a `Set`, so check mode and write mode disagree about whether the file is in sync.

Fix: track counts in `bucketGroup` and treat a repeat as drift, listing the extra copy under "to remove".


### 🟢 8. `--repo-root=<dir>` is undocumented

`parseArgs` accepts both `--repo-root <dir>` and `--repo-root=<dir>` (`check-skill-allowlist.mjs:99`), but only the space-separated form appears in `--help`, in the notes `Usage` block, and in `SKILL.md`. Same gap in `audit-helper-scripts.mjs`. Cheap to document, and worth doing since these help texts are the only interface an agent sees.


### 🟢 9. `skills/README.md` is missing `blog-translator`

Fourteen skill folders exist; thirteen rows are listed. `blog-translator` has a `SKILL.md`, is granted `Skill(blog-translator)` in `.claude/settings.json`, and is a substantial skill (paired EN and JA sync, the `localization` frontmatter reconciliation), but it appears in no table. It belongs in "Daily utility skills" next to `blog-md-linter` and `blog-content-auditor`.


### 🟢 10. Smaller items in `skills/README.md`

* The opening line reads "This folder contains local Codex skills used by this repository", while the table directly below documents Claude, Codex, and GitHub Copilot. Drop "Codex".
* The `Last updated (UTC)` column carries `00:00` on 6 of 13 rows, including the new `skill-allowlist-syncer` row. The actual commit was 2026-08-18 07:37 UTC. Either fill in real times or drop the time component from the column.


### 🟢 11. `pnpm lint-target` is undocumented

`package.json` defines `lint-target` (`zsh scripts/targeted-linting.sh`), but the "Common commands" table in `AGENTS.md` does not list it, and nothing else in the repo mentions it. It is the useful lint-one-file path, so it deserves a row next to `pnpm lint`.


## Not a problem

Checked and cleared, recorded so the next audit does not re-litigate them:

* **`.js` files excluded from the runner map.** Deliberate and correctly documented in both the script notes and `SKILL.md`: in this repo `.js` under `skills/` means a Figma Plugin API snippet passed to a tool, not a Bash command. There are no `.js` files under `skills/` today, so the rule is currently theoretical but harmless.
* **`scripts/generate-yaml.sh` reference removed from `script-auditor/SKILL.md`.** The file does not exist in this repo, so `a04e113` was right to redirect the pointer at `check-skill-allowlist.mjs`.
* **`notes/` subfolders absent from `notes/README.md`.** `branch-chart/` and `branch-feat-ai-search/` are not in the README index, but both are linked from their parent notes, and `.namelintignore` documents why their `.vue`, `.css`, `.patch`, and `.tsv` files sit outside the `notes/` naming rule. The current structure is intentional.
* **`docs/README.md` line 57 trailing whitespace.** Cosmetic, and both Prettier and markdownlint-cli2 pass the file as-is, so it is not lint debt.
* **Chunk-size warning during `pnpm build`.** Standard VitePress output, not a regression.


## Resolution

All 11 findings were fixed on 2026-08-18, in the order suggested below. What changed:

| Finding                              | Fix                                                                                                                                                                              |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. `pnpm lint-naming` missing         | Added the script to `package.json`, so every command documented in `skills/file-folder-name-linter/SKILL.md` now runs.                                                             |
| 2. Duplicate README maintainer       | Deleted `skills/readme-maintainer/`, keeping `folder-readme-maintainer`, and reran the syncer with `--write` to retire `Skill(readme-maintainer)`.                                 |
| 3. Three scripts failing the auditor | `generate-doc-structure.mjs` gained `--help` (plus argument rejection) and status emojis; `index.sh` and `targeted-linting.sh` gained real Output sections. All 9 scripts now pass. |
| 4. Version-history format            | Normalized the four non-conforming headers to `vX.Y - YYYY-MM-DD - summary`, and added a Version format check to `script-auditor` v1.2 so the rule is enforced, not just stated.  |
| 5. `.sh` missing from the runner map | `check-skill-allowlist.mjs` v2.1 maps `.sh` to `zsh`. `AGENTS.md` now states the `.sh` + zsh shebang pairing the tooling assumes.                                                 |
| 6. Hardcoded runner alternation      | The managed-entry pattern is now built from `RUNNER_BY_EXT` at load time, so adding a runner cannot desynchronize the two.                                                         |
| 7. Invisible duplicate entries       | `bucketGroup` reports repeats under `To remove (duplicate entry)` and counts them as drift, so check mode and write mode now agree.                                                |
| 8. Undocumented `--repo-root=`       | Documented in the script `--help`, the notes block, and `SKILL.md`.                                                                                                               |
| 9. Missing `blog-translator` row     | Added to the Daily utility table; `skills/README.md` now lists all 13 skills.                                                                                                     |
| 10. `skills/README.md` nits          | Dropped "Codex" from the opening line, and replaced the `Last updated (UTC)` column with a date-only `Last updated`, which removes the 6 placeholder `00:00` times.                |
| 11. `pnpm lint-target` undocumented  | Added to the `AGENTS.md` commands table alongside the new `pnpm lint-naming`.                                                                                                      |

Version bumps: `check-skill-allowlist.mjs` v2.1, `audit-helper-scripts.mjs` v1.2, `generate-doc-structure.mjs` v2.1, `cleanup-temp-files.sh` v5.4, `index.sh` v1.4, `targeted-linting.sh` v1.1.

Verified after the changes: `script-auditor` reports 9 of 9 ✅, the allowlist syncer reports `result:ok`, `pnpm build` succeeds, `pnpm tree` is a no-op, the name linter is clean, and Prettier and markdownlint pass the whole repo. The two syncer bug fixes were each confirmed against a scratch repo: a `helper.sh` inside a skill folder now receives `Bash(zsh ...)`, and a duplicate-only settings file now reports drift instead of `result:ok`.

The two items below that were cleared as "not a problem" stayed as they were, except for the `docs/README.md` trailing whitespace, which was stripped while it was in hand.


## Suggested order of work

1. Add `lint-naming` to `package.json` (finding 1) - one line, unblocks a documented skill.
2. Delete the duplicate README-maintainer skill and rerun the syncer with `--write` (finding 2).
3. Fix `.sh` in the runner map and derive `SCRIPT_ENTRY_RE` from it, then bump the script to v2.1 with a version-history entry (findings 5 and 6).
4. Decide whether the version-history format is a rule or a preference, and make `script-auditor` match that decision (finding 4).
5. Bring the three failing scripts up to the `AGENTS.md` notes and `--help` requirements (finding 3).
6. Sweep the `skills/README.md` and `AGENTS.md` documentation gaps (findings 8 through 11).


## Version history

* v1.1 - 2026-08-18 - Record the resolution of all 11 findings.
* v1.0 - 2026-08-18 - Initial audit.
