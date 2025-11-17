---
mode: agent
model: GPT-5 mini
tools:
  - changes
  - fetch
  - search
  - edit
description: Link Checker for VitePress Documentation Sites
---

# Link Checker for VitePress Documentation Sites


## Task

Scan all Markdown files in this VitePress repository, validate every link, and report any broken links with file paths and line numbers.


## Context

* The repository is a VitePress documentation site with multiple `.md` files.
* Typical content roots are `docs/` or the project root. Detect the correct root by checking `.vitepress/config.(ts|js)` for `srcDir`, or default to `docs/` when absent.
* VitePress link behavior:
  * Relative links usually target other Markdown files that will be rendered to HTML. A link may omit the `.md` extension.
  * Heading anchors use GitHub-style slugs.
  * Assets may live under `docs/public` or `docs/.vitepress/public` and are served at the site root.


## Requirements

1. Traverse all Markdown files under the docs root, excluding `node_modules`, `.git`, `dist`, `.vitepress/cache`, and any configured ignore patterns.
2. Extract links from Markdown AST:
   * Include `[text](href)` and autolink URLs.
   * Exclude code blocks and inline code.
3. Validate links:
   * `http` and `https`: attempt `HEAD`, fall back to `GET` on `405` or if `HEAD` fails. Follow redirects. Treat 200-399 as valid. Retry transient network errors with exponential backoff.
   * Relative file links:
     * Resolve against the current file path and docs root.
     * Accept links with or without `.md`. If missing, check `target.md`, `target/index.md`, and `target/README.md`.
     * For assets (for example, `.png`, `.jpg`, `.svg`, `.pdf`), check file existence.
   * Fragment anchors:
     * For same-file anchors, parse the current file headings and verify the slug exists.
     * For cross-file anchors, parse the target file and verify the slug exists.
     * Use `github-slugger` for slug generation to match VitePress.
   * Ignore `mailto:`, `tel:`, bare `#`, `javascript:`, `vscode:`, localhost (`http://localhost`, `http://127.0.0.1`), and links containing template delimiters like `{` or `}`.
4. Output a machine-readable report and a human-readable summary:
   * For each broken link, print: file path, line number, link text, URL, and reason or status.
   * Provide `--format` options: `text` (default), `json`, and `github` (emit GitHub Actions error annotations).
   * Exit with nonzero status if any broken links are found.
5. Performance:
   * Use concurrency with a limit (for example, 15) for network checks.
   * Cache results per URL during a run to avoid duplicate requests.
6. Configuration:
   * Support an optional `link-check.config.json` at the repo root:
     * `ignorePaths`: array of glob patterns to exclude.
     * `ignoreLinks`: array of string patterns or regex strings to skip.
     * `timeoutMs`: request timeout.
     * `concurrency`: override for concurrency.
     * `rootDir`: override for docs root if detection is wrong.


## Deliverables

1. `scripts/check-links.mjs`: Node.js script that implements all requirements.
2. `link-check.config.json`: Sample config with sensible defaults and comments.
3. `package.json` updates:
   * Add `check:links` and `check:links:ci` scripts.
   * Add required dependencies as `devDependencies`.
4. `.github/workflows/link-check.yml`: GitHub Actions workflow to run link checks on push and pull requests.


## Implementation details

* Language: modern Node.js with ES modules.
* Packages:
  * `glob` for file discovery.
  * `unified`, `remark-parse`, and `unist-util-visit` for Markdown parsing.
  * `github-slugger` for anchor validation.
  * `undici` (preferred) or `node:https` for HTTP requests with redirects and timeouts.
  * `picomatch` for ignore pattern checks.
  * `chalk` for colored CLI output.
  * `yargs` or `commander` for CLI flags.
* Compute line numbers by reading the Markdown source and using positional data from the AST nodes.
* Implement a small URL resolver that respects current file directory, docs root, and VitePress conventions.
* Treat 403, 429, and known bot-blocking responses as warnings when `--tolerant` is set, otherwise as failures.
* CLI flags:
  * `--format text|json|github`
  * `--tolerant`
  * `--rootDir <path>`
  * `--concurrency <n>`
  * `--timeoutMs <ms>`
  * `--pattern "<glob>"`
* Output examples:

```text
Broken link: docs/guide/getting-started.md:42 -> ./advanced/setup (file not found)
Broken link: docs/guide/intro.md:18 -> https://example.com/api (HTTP 404)
Broken link: docs/guide/faq.md:77 -> ./usage#wrong-anchor (anchor not found)
```


## Acceptance criteria

* Running `npm run check:links` scans all Markdown files, validates links, prints a clear summary, and exits with status 1 when any broken links are detected.
* The JSON output contains an array of broken link objects with `file`, `line`, `text`, `url`, and `reason`.
* The GitHub Actions workflow annotates PRs with inline errors at the correct file and line.
* Anchor checks match VitePress slug generation.


## Please produce

1. The full source for `scripts/check-links.mjs`.
2. The sample `link-check.config.json`.
3. The `package.json` snippet to merge.
4. The full `.github/workflows/link-check.yml`.
