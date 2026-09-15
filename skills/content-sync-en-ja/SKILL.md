---
name: content-sync-en-ja
description: Audit the `contents/en` and `contents/ja` trees for drift and bring them back to parity after content changes. Use when a user asks whether the English and Japanese pages are in sync, wants a repo-wide drift sweep, wants pages flagged `localization: TODO: drifted` reconciled, or after adding, editing, moving, renaming, or deleting files under `contents/`.
---

# Sync EN and JA content

Keep the `contents/en` and `contents/ja` trees at **parity**: every content page has a counterpart in the other language at the mirrored path, aligned in structure and meaning unless the pair is intentionally `independent`.
This skill audits both trees for **drift**, then closes each gap.

For the translation itself, this skill delegates to `skills/blog-translator/SKILL.md`, the single source of truth for translation mechanics in either direction.
Do not restate its rules here; load and follow it when you translate.


## Scope

* In scope: content pages (`.md`) under `contents/en` and `contents/ja`.
* Out of scope: `contents/.vitepress/`, `contents/public/`, `contents/snippets/`, and any file the user names as intentionally single-language.
* Path mapping: `contents/en/<path>` pairs with `contents/ja/<path>`. The two paths differ only in the `en` / `ja` segment.


## Localization states

Each page declares its state in the `localization` frontmatter key, per `AGENTS.md`:

* `sync` - the default. The pair should match in content.
* `TODO: drifted` - the pair has diverged and needs reconciling.
* `independent` - the two versions are intentionally different. Do not sync them, and do not flag drift between them.


## Workflow

Follow these steps in order.


### Step 1: Find orphans and pairs

Start with the repo's pairing check, which is the same check CI runs:

```bash
pnpm check-content
```

It lists every page that has no counterpart and every page missing the `title`, `description`, or `localization` frontmatter or carrying an invalid `localization` value. Exit 0 means the trees pass, exit 1 means it found defects, and exit 2 means it was invoked with bad arguments.

To inspect the file lists yourself, compare the two trees directly:

```bash
comm -3 \
  <(cd contents/en && find . -name '*.md' | sort) \
  <(cd contents/ja && find . -name '*.md' | sort)
```

Sort every file into one of three buckets:

* **EN orphan**: exists in `contents/en`, missing in `contents/ja`. Needs a JA counterpart created.
* **JA orphan**: exists in `contents/ja`, missing in `contents/en`. Either the EN source was deleted (remove the JA file) or the page needs an EN counterpart created. Every page is paired in this repo, even an `independent` one, so an orphan is always a defect.
* **Pair**: exists in both. Carry it to step 2.

Completion criterion: every `.md` in both trees is sorted into exactly one bucket.


### Step 2: Detect drift in each pair

Skip pairs where either side declares `localization: independent`; they are at parity by definition.
For the rest, check all three kinds of drift:

* **Flagged drift**: either side carries `localization: TODO: drifted`. The flag names the pair, and the fresher side is usually the one whose flag is `sync`; confirm with the timestamps below.

* **Unflagged content drift**: a `sync` pair where one side changed after the other was last updated, meaning an edit landed without the counterpart being flagged. Compare last-modified commits:

  ```bash
  en_time=$(git log -n 1 --format=%aI -- "$en_path")
  ja_time=$(git log -n 1 --format=%aI -- "$ja_path")
  ```

  A large gap is a hint, not proof; diff the two pages to confirm the content actually diverged before reporting the pair.

* **Structural drift**: the heading count or heading hierarchy differs between the pair, regardless of timestamps or flags.

The language-specific frontmatter fields `title` and `description` are expected to differ; `localization` should match on both sides except while one side is flagged `TODO: drifted`.

Record every drifted pair and which side is behind. A pair that is neither an orphan nor drifted is at parity; leave it untouched.

Completion criterion: every pair is marked either at parity or drifted with the stale side named.


### Step 3: Close each gap

Work through orphans and drifted pairs:

* **Orphan or stale side** (either direction): load and follow `skills/blog-translator/SKILL.md`, passing the fresher page's path. It detects the direction from the path, creates or updates the counterpart, and reconciles the `localization` state on both sides.
* **Deletion** (an orphan whose counterpart was removed on purpose): delete the surviving file too.
* **Intentionally different pair**: set `localization: independent` on both sides, but only when the user confirms the divergence is intentional.

Never guess intent. When you cannot tell whether an orphan is a deletion or a missing translation, or whether a divergence is intentional, stop and ask the user rather than creating or deleting a file.

Completion criterion: every orphan and drifted pair from steps 1 and 2 is resolved or explicitly deferred to the user.


### Step 4: Verify and report

Re-run `pnpm check-content` and confirm it passes, with no unexpected orphans and no frontmatter defects left.
Then report using this format:

```md
## Sync report

### Pairs at parity

- [count, or notable pairs]

### Gaps closed

- [file pair -> direction -> what changed]

### Needs your decision

- [orphans or ambiguities left for the user, with the question]
```


## After syncing

* Run `pnpm tree` and commit `doc-structure.md` if you added, removed, renamed, or moved any page.
* Run `pnpm check` before committing.
