// generate-doc-structure.mjs notes
//
// General notes:
// * Purpose: Generates a snapshot of the contents/ folder in a tree view and saves it as a Markdown file.
// * Goal: Visualize the structure of the VitePress site source to help contributors understand the layout.
// * Files and folders listed in .gitignore are excluded automatically via tree-extended's -gitignore flag.
// * Add files or folders to foldersToScan to include them in the output. Each entry can specify extra tree-extended filter args for customization.
// * Add files to filesToIgnore to exclude them from the output.
// * Requires the tree-extended binary, which ships as a dev dependency; run `pnpm install` first.
//
// Usage:
//   pnpm tree
//   node scripts/generate-doc-structure.mjs
//   node scripts/generate-doc-structure.mjs --help
//
// Output:
// * Writes docs/contents-structure.md, overwriting whatever was there.
// * Exit codes: 0 = written (or nothing to write), 1 = tree-extended missing or failed.
//
// Version history:
// * v2.1 - 2026-08-18 - Add --help handling and status emojis, and restate the notes block in the
//                       order AGENTS.md requires (general notes, usage, output, version history).
// * v2.0.1 - 2026-03-23 - Enabled multiple folder scanning with section headings, added filtering of ignored files, and improved error handling for missing folders. Updated output formatting for cleaner Markdown presentation.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve repository root from this script location.
const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

function printUsage() {
  console.log(
    [
      'Usage: node scripts/generate-doc-structure.mjs [--help]',
      '',
      'Regenerates docs/contents-structure.md: a tree-view snapshot of the contents/',
      'folder, with .gitignore entries filtered out. Takes no other arguments; edit',
      'foldersToScan and filesToIgnore in this file to change what is scanned.',
      '',
      'Also available as `pnpm tree`.',
      '',
      'Options:',
      '  -h, --help   Show this message.',
      '',
      'Exit codes: 0 = written or nothing to write, 1 = tree-extended missing or failed.',
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
  process.exit(1);
}

// Folders to scan. Each entry can specify extra tree-extended args.
const foldersToScan = [{ path: 'contents' }];

// Extract literal folder/file names from .gitignore so tree-extended can
// honor them via -ignore=. tree-extended's own -gitignore flag does not
// expand globstar patterns like `**/.vitepress/dist/` when scanning a
// subfolder, so we feed the names in directly. Wildcard patterns are skipped.
function namesFromGitignore() {
  const gitignorePath = resolve(repoRoot, '.gitignore');
  if (!existsSync(gitignorePath)) return [];
  const names = new Set();
  for (const raw of readFileSync(gitignorePath, 'utf8').split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#') || line.startsWith('!')) continue;
    const cleaned = line
      .replace(/^\*\*\//, '')
      .replace(/^\//, '')
      .replace(/\/$/, '');
    if (/[*?[]/.test(cleaned)) continue;
    const name = cleaned.split('/').pop();
    if (name) names.add(name);
  }
  return [...names];
}

// Entries to ignore in the generated doc structure (post-filter on output
// lines). Seeded from .gitignore so the script honors gitignore even for
// patterns tree-extended cannot match natively.
const filesToIgnore = new Set([
  'temp.md',
  '.DS_Store',
  ...namesFromGitignore(),
]);

// Write a generated tree snapshot of contents/ into docs/.
const outputPath = resolve(repoRoot, 'docs/contents-structure.md');

// Remove trailing empty lines from a string.
function trimTrailingEmptyLines(str) {
  return str.replace(/\n+$/, '');
}

// Filter lines that contain any ignored file name.
function filterIgnored(raw) {
  if (!raw) return '';
  const lines = raw.split('\n');
  const kept = lines.filter(
    (line) => ![...filesToIgnore].some((entry) => line.includes(entry)),
  );
  return kept.join('\n');
}

const sections = [];

for (const folder of foldersToScan) {
  const folderPath = resolve(repoRoot, folder.path);
  if (!existsSync(folderPath)) {
    console.warn(
      '⚠️  %s not found at %s - skipping.',
      folder.path,
      folderPath,
    );
    continue;
  }

  const ignoreNames = [...filesToIgnore];
  const args = [
    folder.path,
    '-gitignore',
    ...(ignoreNames.length ? [`-ignore=${ignoreNames.join(',')}`] : []),
    ...(folder.args || []),
    '-charset=utf8-icons',
  ];

  try {
    const raw = execFileSync('tree-extended', args, {
      cwd: repoRoot,
      encoding: 'utf8',
    });
    const filtered = filterIgnored(raw);
    if (filtered) {
      const codeBlock = `\`\`\`txt\n${trimTrailingEmptyLines(filtered)}\n\`\`\``;
      const section =
        foldersToScan.length > 1
          ? `\n## ${folder.path}\n\n${codeBlock}`
          : codeBlock;
      sections.push(section);
    }
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      console.error(
        '❌ Missing dependency: tree-extended not found. Please install all dependencies or add tree-extended to dependencies.\n\nPotential solutions:\npnpm install\nor\npnpm add -D tree-extended\n',
      );
      process.exit(1);
    }
    console.error(
      '❌ Failed to run tree-extended for %s. Install dependencies with "pnpm install" and ensure tree-extended is available in PATH.',
      folder.path,
    );
    if (error instanceof Error) {
      console.error(error.message);
    }
    process.exit(1);
  }
}

const output = sections.join('\n\n');

if (sections.length === 0) {
  console.warn('⚠️  No folder output was generated. Skipping file write.');
  process.exit(0);
}

// Save the tree output as a Markdown file.
writeFileSync(outputPath, `# Contents structure\n\n${output}\n`, 'utf8');
console.log('✅ Wrote %s (%d sections).', outputPath, sections.length);
