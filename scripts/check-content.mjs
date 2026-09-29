// check-content.mjs notes
//
// General notes:
// * Purpose: Enforce bilingual pairing, required frontmatter, and locale-folder
//   filename rules for Markdown under contents/en/ and contents/ja/.
// * Home pages, paired articles, and index files are all in scope. Snippets and
//   other trees outside the locale folders are ignored.
//
// Usage:
//   pnpm check-content
//   node scripts/check-content.mjs
//   node scripts/check-content.mjs --help
//
// Output:
// * Prints one ❌ line per defect, then a summary. Exit 0 when clean, 1 when
//   anything fails, 2 on bad arguments.
//
// Version history:
// * v1.3 - 2026-09-29 - Validate the raw localization value instead of a trimmed copy, so a padded value is reported rather than accepted.
// * v1.2 - 2026-09-29 - Parse frontmatter with js-yaml, report YAML errors, and reject blank or non-string values.
// * v1.1 - 2026-08-22 - Ban -en/-ja suffixes inside locale folders.
// * v1.0 - 2026-08-22 - Initial release.

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load as parseYaml } from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');
const REQUIRED_KEYS = ['title', 'description', 'localization'];
const LOCALIZATION_VALUES = new Set(['sync', 'TODO: drifted', 'independent']);
const LOCALE_SUFFIX = /-(en|ja)\.md$/;

function printUsage() {
  console.log(
    [
      'Usage: node scripts/check-content.mjs [--help]',
      '',
      'Checks contents/en and contents/ja for 1-to-1 Markdown pairing, required',
      'frontmatter (title, description, localization), valid localization values,',
      'and -en/-ja filename suffixes inside a locale folder.',
      '',
      'Also available as `pnpm check-content`.',
      '',
      'Options:',
      '  -h, --help   Show this message.',
      '',
      'Exit codes: 0 = clean, 1 = defects found, 2 = bad arguments.',
    ].join('\n'),
  );
}

const argv = process.argv.slice(2);
if (argv.includes('-h') || argv.includes('--help')) {
  printUsage();
  process.exit(0);
}
if (argv.length > 0) {
  console.error(`❌ Unrecognized argument: ${argv[0]}`);
  printUsage();
  process.exit(2);
}

function walkMarkdown(dir, base = dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkMarkdown(full, base));
    } else if (entry.name.endsWith('.md') && entry.name !== 'temp.md') {
      out.push(relative(base, full).replaceAll('\\', '/'));
    }
  }
  return out;
}

// Returns { data, error }. A YAML error is reported as a defect rather than
// swallowed, because VitePress parses the same block and would fail the build.
function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { data: {}, error: null };
  try {
    const data = parseYaml(match[1]);
    return { data: data && typeof data === 'object' ? data : {}, error: null };
  } catch (err) {
    return { data: {}, error: err.reason || err.message };
  }
}

function isNonBlankString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

const enDir = join(repoRoot, 'contents/en');
const jaDir = join(repoRoot, 'contents/ja');
const enFiles = new Set(walkMarkdown(enDir));
const jaFiles = new Set(walkMarkdown(jaDir));
const errors = [];

for (const rel of [...enFiles].sort()) {
  if (!jaFiles.has(rel)) {
    errors.push(`Missing JA counterpart: contents/ja/${rel}`);
  }
}
for (const rel of [...jaFiles].sort()) {
  if (!enFiles.has(rel)) {
    errors.push(`Missing EN counterpart: contents/en/${rel}`);
  }
}

const paired = [...enFiles].filter((rel) => jaFiles.has(rel)).sort();
for (const rel of paired) {
  for (const [locale, dir] of [
    ['en', enDir],
    ['ja', jaDir],
  ]) {
    const path = join(dir, rel);
    const { data: fm, error } = parseFrontmatter(readFileSync(path, 'utf8'));
    if (error) {
      errors.push(
        `Invalid frontmatter YAML (${error}): contents/${locale}/${rel}`,
      );
      continue;
    }
    for (const key of REQUIRED_KEYS) {
      if (!isNonBlankString(fm[key])) {
        errors.push(`Missing ${key}: contents/${locale}/${rel}`);
      }
    }
    // Compare the raw string: the documented states are exact values, and the
    // other localization workflows match them literally.
    if (
      isNonBlankString(fm.localization) &&
      !LOCALIZATION_VALUES.has(fm.localization)
    ) {
      errors.push(
        `Invalid localization "${fm.localization}": contents/${locale}/${rel}`,
      );
    }
  }
}

for (const [locale, files] of [
  ['en', enFiles],
  ['ja', jaFiles],
]) {
  for (const rel of [...files].sort()) {
    if (LOCALE_SUFFIX.test(rel)) {
      errors.push(
        `Locale-suffix filename is not allowed inside a locale folder: contents/${locale}/${rel}`,
      );
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`❌ ${error}`);
  }
  console.error(`❌ ${errors.length} content check(s) failed.`);
  process.exit(1);
}

console.log(
  `✅ Content check passed (${enFiles.size} EN files, ${jaFiles.size} JA files).`,
);
