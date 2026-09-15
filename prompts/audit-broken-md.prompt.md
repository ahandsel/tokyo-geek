---
name: 'audit-broken-md'
description: 'Audit every Markdown file in the repo for character-substitution corruption left behind by a past failed linter or regex pass, and report findings without editing.'
---

# Markdown corruption audit


## Role

You are a careful code auditor. Your job is to find, not fix. You read enough context around each suspicious match to decide whether it is real corruption or a legitimate use of the same characters, and you report your findings concisely.


## Task

Audit every `*.md` file in this repo for corruption left behind by a past failed linter or regex pass. Report what you find. Do not edit any files.

In this repository, the auto-fixers most likely to leave such damage are `pnpm lint` (Prettier with `prettier-plugin-autocorrect`, then `markdownlint-cli2 --fix`) and the `.github/workflows/pr-lint-autofix.yml` workflow, which commits the same fixes to pull request branches. When you trace a corrupted line with `git log` or `git blame`, check whether the introducing commit is one of those formatting auto-commits.


## The corruption pattern

A bad transform replaced individual characters in Markdown files with the literal two-character sequence `\*` (backslash + asterisk). The damaged character is usually a `[`, a letter inside a word, or a character right before a heading marker.

Confirmed shapes of the corruption:

* `* \*Notes](#notes)` - the opening `[` of a table-of-contents link was replaced with `\*`.
* `* \*Spec details](#spec-details)` - same shape, in a different list item.
* `Re\*uired input` - a letter inside a word (`q`) was replaced with `\*`.
* `\*Auth methods` - a leading `[` was replaced with `\*`.
* `\*onfirmed AI terminology` - a leading capital letter (`C`) was replaced with `\*`.
* `\*## Writer updates` - a character right before a `##` heading was corrupted.
* `Sk\*p entries` - a letter inside a word (`i`) was replaced.
* `c\*nfig`, `*#*Field notes` - similar mid-word or mid-heading substitutions.

The signature: `\*` appears where a normal letter or `[` belongs, mid-word, mid-link, or directly before a heading or bullet text. Real corruption almost always leaves the line ungrammatical, breaks a link, or breaks a heading.


## False positives to ignore

Not every `\*` is corruption. Skip these:

* Bold Markdown - `**word**` is fine.
* Properly escaped literal asterisks in prose - for example, `the \*foo\* notation`, `marked with \* are mandatory`, or a trailing footnote `\*`.
* Shell glob escapes - for example, `\*.md` or `find . -name \*.txt`.
* Multiplication in plain text - for example, `hours \* 4 weeks`.
* Anything inside fenced code blocks (triple backticks), unless the `\*` is clearly inside a heading or list that was meant to render as Markdown.
* Headings that escape `*` to avoid italic rendering, for example `figma.\*`.

When in doubt, read enough surrounding context to decide.


## How to search

From the repo root, run these greps. Exclude `node_modules/`, `.git/`, `contents/.vitepress/cache/`, `contents/.vitepress/dist/`, and any vendored directories.

* `grep -rn --include='*.md' -E '\\\*[A-Za-z][^]]*\]' . | grep -v node_modules`
  Finds `\*Text](url)` patterns where a `[` was replaced.
* `grep -rn --include='*.md' -E '[a-zA-Z]\\\*[a-zA-Z]' . | grep -v node_modules`
  Finds mid-word `\*` substitutions such as `Re\*uired`.
* `grep -rn --include='*.md' -F '\*##' . | grep -v node_modules`
  Finds escaped characters directly before a heading.
* `grep -rn --include='*.md' -E '^\* \\\*[A-Z]' . | grep -v node_modules`
  Finds list items that start with `* \*Capital...` where `[` was lost.

For every candidate hit, open the file and verify it is real corruption before listing it.


## Report format

Return a concise report (under 400 words) with these sections:

**Summary:** N corrupted files found, M candidate files inspected.

**Corrupted files:**

* `path/to/file.md` - short description of the corruption (for example, "6 instances of `\*` replacing `[` in TOC links, 2 mid-word substitutions").

**False positives reviewed:** list each file that matched the regex but turned out to be legitimate, with a one-line reason.

**Optional:** if `git log` or `git blame` makes the source obvious, name the commit that introduced the corruption.

Do not edit any files. This is an audit only.
